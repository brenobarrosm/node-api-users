var knex = require("../database/connection");
var bctypt = require("bcrypt");
const PasswordToken = require("./PasswordToken");

class User {

    async findAll() {
        try {
            var res = await knex.select(["id", "email", "name", "role"]).table("users");
            return res;
        } catch(err) {
            console.log(err);
            return [];
        }
    }

    async findById(id) {
        try {
            var res = await knex.select(["id", "email", "name", "role"]).where({id: id}).table("users");

            if(res.length > 0) {
                return res[0];
            } else {
                return undefined;
            }
        } catch(err) {
            console.log(err);
            return undefined;
        }
    }

    async create(email, password, name) {
        try {
            var hash = await bctypt.hash(password, 10);

            await knex.insert({
                email, 
                password: hash, 
                name, 
                role: 0
            }).table("users");
        } catch(err) {
            console.log(err);
        }
    }

    async findByEmail(email) {
        try {
            var result = await knex.select(["id", "email", "role", "name"]).where({email: email}).table("users");

            if(result.length > 0) {
                return result[0]
            } else {
                return undefined;
            }
        } catch(err) {
            return undefined;
        }
    }

    async findEmail(email) {
        try {
            var res = await knex.select("*").from("users").where({email: email});

            if(res.length > 0) {
                return true;
            } else {
                return false;
            }
        } catch(err) {
            console.log(err);
            return false;
        }
    }

    async update(id, email, name, role) {
        var user = await this.findById(id);
        if(user != undefined) {
            var editUser = {};

            if(email != undefined) {
                if(email != user.email) {
                    var result = await this.findEmail(email);
                    if(!result) {
                        editUser.email = email;
                    } else {
                        return {status: false, err: "O email informado já existe na base de dados."}
                    }
                }
            }

            if(name != undefined) {
                editUser.name = name;
            }

            if(role != undefined) {
                editUser.role = role;
            }

            try {
                await knex.update(editUser).where({id: id}).table("users");
                return {status: true};
            } catch(err) {
                return {status: false, err: err}
            }
            
        } else {
            return {status: false, err: "O usuário não existe."};
        }
    }

    async delete(id) {
        var user = await this.findById(id);
        if(user != undefined) {
            try {
                await knex.delete().where({id: id}).table("users");
                return {status: true};
            } catch(err) {
                return {status: false, err: err}
            }
            
        } else {
            return {status: false, err: "Usuário não encontrado."}
        }
    }

    async changePassword(newPassword, id, token) {
        var hash = await bctypt.hash(newPassword, 10);
        await knex.update({password: hash}).where({id: id}).table("users");
        await PasswordToken.setUsed(token);
    }
}

module.exports = new User();
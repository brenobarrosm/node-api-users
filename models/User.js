var knex = require("../database/connection");
var bctypt = require("bcrypt");

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

    async new(email, password, name) {
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
}

module.exports = new User();
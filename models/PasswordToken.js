var knex = require("../database/connection");
var User = require("./User");
var uuid = require("uuid");

class PasswordToken {

    async create(email) {
        var user = await User.findByEmail(email);
        if(user != undefined) {
            try {
                var token = uuid.v4();

                await knex.insert({
                    user_id: user.id,
                    used: 0,
                    token: token
                }).table("passwordtokens");

                return {status: true, token: token};
            } catch(err) {
                return {status: false, err: "Algum erro aconteceu."}
                
            }
            
        } else {
            return {status: false, err: "O email informado não está cadastrado."}
        }
    }

    async validate(token) {
        try {
            var result = await knex.select().where({token: token}).table("passwordtokens");
            if(result.length > 0) {
                var tk = result[0];

                if(tk.used == 0) {
                    return {status: true, token: tk};
                } else {
                    return {status: false, err: "Já utilizado."};
                }
                
            } else {
                return {status: false, err: "Não existe na base de dados"};
            }
        } catch(err) {
            return {status: false, err: "Problema interno."};
        }
        
    }

    async setUsed(token) {
        await knex.update({used: 1}).where({token: token}).table("passwordtokens");
        return 
    }
    
}

module.exports = new PasswordToken();
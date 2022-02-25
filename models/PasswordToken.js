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
    
}

module.exports = new PasswordToken();
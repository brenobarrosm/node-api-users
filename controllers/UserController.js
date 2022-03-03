var User = require("../models/User");
var PasswordToken = require("../models/PasswordToken");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

var JWTSecret = "p$O*o4ET2fA3rUsap8Lza@rUs#idRi";

class UserController {
    
    //List all users
    async index(req, res) {
        var users = await User.findAll();
        res.json(users);
    }

    //Find a specific user
    async findUser(req, res) {
        var id = req.params.id;
        var user = await User.findById(id);

        if(user != undefined) {
            res.status(200);
            res.json(user);
        } else {
            res.status(404);
            res.json({ err: "Usuário não encontrado" })
        }
    }

    //Create user
    async create(req, res) {
        var { name, email, password } = req.body;

        if(email == undefined || email == ' ') {
            res.status(400);
            res.json({ err: "Email inválido." });
            return;
        }
        if(password == undefined || password == ' ') {
            res.status(400);
            res.json({ err: "Senha inválida." });
            return;
        }

        var emailExists = await User.findEmail(email);
        if(emailExists) {
            res.status(406);
            res.json({ err: "Email já existente." });
            return;
        }

        await User.create(email, password, name);

        res.status(200);
        res.send("OK");
    }

    //Edit user
    async edit(req, res) {
        var { id, name, email, role } = req.body;
        var result = await User.update(id, email, name, role);

        if(result != undefined) { 
            if(result.status) {
                res.status(200);
                res.send("OK");
            } else {
                res.status(406);
                res.json(result.err);
            }
        } else {
            res.status(406);
            res.json({ err: "Erro no servidor." });
        }
    }

    //Delete user
    async remove(req, res) {
        var id = req.params.id;
        
        var result = await User.delete(id);
        if(result.status) {
            res.status(200);
            res.send("OK");
        } else {
            res.status(406);
            res.json(result.err);
        }
    }

    //Get Token
    async recoverPassword(req, res) {
        var email = req.body.email;

        var result = await PasswordToken.create(email);
        if(result.status) {
            res.status(200);
            res.json({token: result.token});
            //SendMail
        } else {
            res.status(406);
            res.json(result.err);
        }
    }

    //Change Password
    async changePassword(req, res) {
        var token = req.body.token;
        var password = req.body.password;

        var isTokenValid = await PasswordToken.validate(token);

        if(isTokenValid.status == true) {
            await User.changePassword(password, isTokenValid.token.user_id, isTokenValid.token.token);
            res.status(200);
            res.send("Senha alterada");
        } else {
            res.status(406);
            res.json({ err: "Token inválido. "+isTokenValid.err  })
        }
    }

    //Login
    async login(req, res) {
        var { email, password } = req.body;

        var user = await User.findByEmail(email);

        if(user != undefined) {
            var result = await bcrypt.compare(password, user.password);
            
            if(result) {
                var token = jwt.sign({email: user.email, role: user.role}, JWTSecret);
                res.status(200);
                res.json({token: token});
            } else {
                res.status(406);
                res.json({err: "Senha incorreta"})
            }
        } else {
            res.json({status: false});
        }
    }
}

module.exports = new UserController();
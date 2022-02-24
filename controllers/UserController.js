var User = require("../models/User");

class UserController {
    
    async index(req, res) {
        var users = await User.findAll();
        res.json(users);
    }

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

        await User.new(email, password, name);

        res.status(200);
        res.send("OK");
    }

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
}

module.exports = new UserController();
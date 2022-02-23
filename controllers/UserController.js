var User = require("../models/User");

class UserController {
    async index(req, res) { }

    async create(req, res) {
        var { name, email, password } = req.body;
        if(email == undefined || email == ' ') {
            res.status(400);
            res.json({ err: "Email inválido" });
            return;
        }
        if(password == undefined || password == ' ') {
            res.status(400);
            res.json({ err: "Senha inválido" });
            return;
        }

        await User.new(email, password, name);

        res.status(200);
        res.send("OK");
    }
}

module.exports = new UserController();
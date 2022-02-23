class UserController {
    async index(req, res) { }

    async create(req, res) {
        var { name, email, password } = req.body;
        if(email == undefined) {
            res.status(400);
            res.json({ err: "Email inválido" });
        }
        res.status(200);
        res.send("OK");
    }
}

module.exports = new UserController();
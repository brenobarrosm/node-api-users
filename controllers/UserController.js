class UserController {
    async index(req, res) { }

    async create(req, res) {
        res.send('/create - UserController');
    }
}

module.exports = new UserController();
class HomeController{

    async index(req, res){
        res.send("/ - HomeController");
    }

}

module.exports = new HomeController();
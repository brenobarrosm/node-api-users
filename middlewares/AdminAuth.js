var jwt = require("jsonwebtoken");
var JWTSecret = "p$O*o4ET2fA3rUsap8Lza@rUs#idRi";

module.exports = function(req, res, next) {
     const authToken = req.headers['authorization'];

     if(authToken != undefined) {
         const bearer = authToken.split(' ');
         var token = bearer[1];

         try{
            var decoded = jwt.verify(token ,JWTSecret);

            if(decoded.role == 1) {
                next();
            } else {
                res.status(403);
                res.json({err: "Você não tem permissao."});
                return;
            }
         } catch(err) {
            res.status(403);
            res.json({err: "Usuário não autenticado."});
            return;
         }

         
     } else {
         res.status(403);
         res.json({err: "Usuário não autenticado."});
         return;
     }
}
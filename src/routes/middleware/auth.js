const jwt = require("jsonwebtoken");

const verifyToken = (req,res,next)=>{
    const token = req.query.token || req.body.token || req.headers["x-access-token"] || req.headers["authorization"];
    if(!token){
        res.status(403).send({ message: "Token is required for athentication",statusCode: 403})
    } else {
        jwt.verify(token, process.env.SECRET_KEY,function(err,tokenRes) {
            if(err && err.name ==="TokenExpiredError") {
                res.status(419).send( {
                    message: 'TokenExpiredError',
                    statusCode: 419
                    })
            } else if(err && err.name ==="JsonWebTokenError"){
                res.status(401).send( {
                    message: 'JsonWebTokenError',
                    statusCode: 401
                    })
            } else if(err ){
                res.status(401).send( {
                    message: 'JsonWebTokenError',
                    statusCode: 401
                    })
            } else if(res){
                next()
            }
        })
    }
    

}
module.exports = verifyToken;
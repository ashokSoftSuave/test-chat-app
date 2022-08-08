const userService = require('../services/user.service')


exports.logIn = async (req,res) => {
    try {
        if( !(req.body && req.body.email && req.body.password) ) {
            res.status(400).send({message:"email or password missing"})
        } else {
            let userData =  await userService.logIn(req.body)
            if(userData) 
                res.status(200).send(userData);
            else 
                res.send({message: "You have entered an invalid username or password",statusCode: 403})    
        }
    } catch(err){
        res.status(400).send({message:"Something went on our end. please check sometime later",error:err})
    }
    
}

exports.signUp = async (req,res) => {
    try {
        if( !(req.body && req.body.email && req.body.password) ) {
            res.status(400).send({message:"email or password missing"})
        } else {
            let userData = await userService.signUp(req.body)
            res.send(userData);
        }
    } catch(err){
        res.status(400).send({message:"Something went on our end. please check sometime later",error: JSON.stringify(err)})
    }
 }

 exports.refreshToken = async (req,res) => {
    try {
        if( !(req.body && req.body.email) ) {
            res.status(400).send({message:"email or password missing"})
        } else {
            let userData = await userService.refreshtoken(req.body)
            res.send(userData);
        }
    } catch(err){
        res.status(400).send({message:"Something went on our end. please check sometime later",error: JSON.stringify(err)})
    }
 }



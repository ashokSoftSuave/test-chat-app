const chatService = require('../services/chat.service')


exports.getMessage = async (req,res) => {
    if(!(req.query && req.query.groupId)) {
       res.status(400).send({
        message: 'Required data missing'
       })
    }
    let userData =  await chatService.getMessage(req.query.groupId)
    if(userData&& userData.length){
      res.send({data: userData, statusCode: 200});
    } else {
      res.send({data: [] ,statusCode: 400});
    }
}

exports.createMessage = async (req,res) => {
    let userData = await chatService.createMessage(req.body);
    if(userData&& userData._id){
      res.send({data: userData,statusCode: 201});
    } else {
      res.send({data: {},statusCode: 400});
    }
   
 }

 exports.getGroup = async (req,res) => {
    if(!(req.query && req.query._id)) {
       res.status(400).send({
        message: 'Required data missing'
       })
    }
    let userData =  await chatService.getGroup(req.query._id)
    res.send(userData);
}

exports.createGroup = async (req,res) => {
    let userData = await chatService.createGroup(req.body)
    res.send(userData);
 }



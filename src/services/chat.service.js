const model = require('../models/index')
const messageModel = model.messageSchema;
const groupModel = model.groupSchema;
const mongoose = require('mongoose');


const getMessage =  async (_id) => {
    return  await messageModel.find({groupId :  _id   });
 }
const getAllMessages =  async (_id) => {
   return  await messageModel.find({groupId:  _id });
}

const createMessage =  async (data) => {
   data['_id'] = mongoose.Types.ObjectId().toString();
   data['date'] = new Date();
   return  await messageModel.create(data);
}

const getGroup =  async (_id) => {
    return  await groupModel.find({ groupMember: {$elemMatch:{_id: _id}   } });
}
 
const  createGroup =  async (data) => {
    data['_id'] = mongoose.Types.ObjectId().toString();
    return  await groupModel.create(data);
 }
 

module.exports= {
    getMessage,createMessage,getAllMessages,getGroup,createGroup
}

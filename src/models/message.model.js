const mongoose = require('mongoose');
const messageSchema = mongoose.Schema({ 
    _id: String,
    mesasge: String,
    groupId:  String,
    sender: String,
    receiver: String,
    date: Date,
    isMessage: Boolean,
    isFromGroup: Boolean,
})

module.exports = mongoose.model('messages',messageSchema)
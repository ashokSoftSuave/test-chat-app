const mongoose = require('mongoose');
const groupSchema = mongoose.Schema({
    _id: String,
    groupMember: Array,
    isPrivateChat: Boolean,
    lastMsg: String,
    groupName:String,
})

module.exports = mongoose.model('groups',groupSchema);
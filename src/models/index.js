const dbConfig = require('../config/db.config');
const mongoose = require('mongoose');


const db ={};
db.url = dbConfig.url;
db.mongoose = mongoose;
db.userSchema = require('./user.model');
db.messageSchema = require('./message.model');
db.groupSchema = require('./group.model');
module.exports= db;
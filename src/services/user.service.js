const model = require('../models/index')
const userModel = model.userSchema;
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const socket = require('./socket.io.service');

const logIn =  async (data) => {
   const userData =   await userModel.findOne({ email:data.email }).select("email password phoneNumber name");
   if(userData && await bcrypt.compare(data.password,userData.password)) {
   //   await socket.addRooms(userData._id)
      return await getjwtToken(userData)
   } else {
      return null;
   }
}

const signUp =  async (data) => {
   data['_id'] = mongoose.Types.ObjectId().toString();
   data['password'] = await bcrypt.hash(data.password,10);
   const userData = new userModel(data)
   let res =   await userData.save();
   return await  getjwtToken(res);
}

const refreshtoken =  async (data) => {
   const userData =   await userModel.findOne({ email:data.email }).select("email  phoneNumber name");
   return await  getjwtToken(userData);
}

const getjwtToken = async (userData) => {
   const payload = {
      email: userData.email,
      phoneNumber: userData.phoneNumber,
      _id:userData._id,
   }
   const token =   jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: 60});
   delete userData['_doc'].password;
   userData['_doc']['token']= token;
   return {data: userData, statusCode:200 };
}

module.exports = {
   logIn,signUp,getjwtToken,refreshtoken
};


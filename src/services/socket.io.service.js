const socket = require('./socket.io.service');
const chatService = require('./chat.service');


const socketIO = require('socket.io');
let userSocketInfo = '';


exports.initialize =    async (http) => {
  const io =socketIO(http, {cors: {origin: '*'}}) 
   io.on('connection', (socket) => {
    // get users data
    socket.on('subscribe', async (data) =>{
        let groups = await chatService.getGroup(data._id);
        groups.forEach(group=>{
            socket.join(group._id);
        })
    });
    // send new message
    socket.on('new-message', (message) => {
        io.to(message.groupId).emit('new-message', message);
    });
})
} 


exports.userSocketInfo;
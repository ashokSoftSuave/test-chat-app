const express = require('express');
var cors = require("cors");
require('dotenv').config();
const app = express();
app.use(cors({credentials: false, origin: true}));
app.use(express.json());

const port =3002;
let server=app.listen(port,() => {
    console.log("server is listening on ",port)
})
// const http = require('http').createServer(server);
const userRoutes = require('./routes/user.routes');
const chatRouter = require('./routes/chat.routes');
const auth  = require('../src/routes/middleware/auth')
const db = require('../src/models/index');
app.use('/api/user',userRoutes);
app.use('/api/chat',auth,chatRouter);

// db connection
db.mongoose.connect(db.url)
.then(() => {
    console.log("data base connected", )
})
.catch(e => {
    console.log(" database mot connected",e);
})




// socket connection
const socketIO = require('socket.io');
const io = socketIO(server, {cors: {origin: '*'}});

// io connecttion check 
io.on('connection', (socket) => {
    console.log('a user connected',socket.id);
    // socket.on('disconnect', () => {
    //     console.log('user disconnected');
    // });
    socket.on('read',(data)=>{
        console.log("socket connected: ",data);
    })
io.emit('create','hello')
});


app.get('/',(req,res) => {
    res.json({message: 'hello world'})
});


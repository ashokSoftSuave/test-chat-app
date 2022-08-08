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
// const http = require('http').createServer(app);
const userRoutes = require('./routes/user.routes');
const chatRouter = require('./routes/chat.routes');
const commonRouter = require('./routes/common-routes');
const auth  = require('../src/routes/middleware/auth')
const db = require('../src/models/index');



app.use('/api/chat',auth,chatRouter);
app.use('/api/user',userRoutes);

// socket connection
require('../src/services/socket.io.service').initialize(server);

// db connection
db.mongoose.connect(db.url)
.then(() => {
    console.log("data base connected", )
})
.catch(e => {
    console.log(" database mot connected",e);
})

///////////////////////////////////////////////////////////////////////////////////////////////////
// without 
// const express = require('express');
// const router = express.Router();
// const app = express();

// router.get('/api', (req,res) => {
//     for( let i=0; i<5000000; i++ ){

//  }
//     console.log(`PORT, ${process.env.PORT}`);
//     res.send(`couurent process using this port now, ${process.env.PORT}`);
// });

// app.use('/', router);
// console.log(`PORT, ${process.env.PORT}`);

// app.listen(process.argv[2] || process.env.PORT || 3001, () => {
//     console.log(`App is listening at ${process.argv[2] || process.env.PORT || 3001}`);
// });



//////////////////////////////////////////////

// const express = require("express");
// const port = 3002;
// const cluster = require("cluster");
// const totalCPUs = require("os").cpus().length;
 
// if (cluster.isMaster) {
//   console.log(`Number of CPUs is ${totalCPUs}`);
//   console.log(`Master ${process.pid} is running`);
 
//   // Fork workers.
//   for (let i = 0; i < totalCPUs; i++) {
//     cluster.fork();
//   }
 
//   cluster.on("exit", (worker, code, signal) => {
//     console.log(`worker ${worker.process.pid} died`);
//     console.log("Let's fork another worker!");
//     cluster.fork();
//   });
// } else {
//   const app = express();
//   console.log(`Worker ${process.pid} started`);
 
//   app.get("/", (req, res) => {
//     res.send("Hello World!");
//   });
 
//   app.get("/api/", function (req, res) {
//     let n = 5000000;
//     let count = 0;
 
//     if (n > 5000000000) n = 5000000000;
 
//     for (let i = 0; i <= n; i++) {
//       count += i;
//     }
 
//     res.send(`Final count is ${count}`);
//   });
 
//   app.listen(port, () => {
//     console.log(`App listening on port ${port}`);
//   });
// }
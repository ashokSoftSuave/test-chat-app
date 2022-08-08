var chatRouter = require('express').Router();
const chatController = require('../controller/chat.controller');


chatRouter.get('/', chatController.getMessage);
chatRouter.post('/', chatController.createMessage);
chatRouter.get('/group', chatController.getGroup);
chatRouter.post('/group', chatController.createGroup);

module.exports =  chatRouter;

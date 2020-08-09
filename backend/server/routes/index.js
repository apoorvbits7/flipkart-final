const fileUpload = require('../controllers').fileUpload;
const chatbot = require('../controllers').chatbot;

module.exports = (app) => {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to the Todos API!',
    }));

    app.post('/api/upload', fileUpload.upload);
    app.post('/api/getAllUploads', fileUpload.getAllUploads);
    app.post('/api/chatbot', chatbot.sendMessage);
    app.post('/api/getSupportMessages', chatbot.getSupportMessages);
    app.post('/api/sendMessageTo', chatbot.sendMessageTo);
};
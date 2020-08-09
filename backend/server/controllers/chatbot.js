// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure
const accountSid = 'AC4d82f1839e59f6008ec55f3ee1fa2f79';
const authToken = 'a91c12efcedfd8eb34a5ddc902c313a1';
const client = require('twilio')(accountSid, authToken);
const Chatbot = require('../models').Chatbot;

module.exports = {
    async sendMessage(req, res) {
        console.log(req.body);
        if (req.body.MediaUrl0) {
            console.log(req.body.MediaUrl0);
            client.messages
                .create({
                    from: 'whatsapp:+14155238886',
                    body: 'We just processed your invoice! Here are some suggestions:\n' +
                        '1. Please mention the HSN number\n' +
                        '\n\n_Message *\'SUPPORT\'* if you wish your invoice to be processed by a human_',
                    to: req.body.From
                })
                .then(message => console.log(message.sid));
            let result = await Chatbot.update({
                lastFile: req.body.MediaUrl0,
                support: false
            }, {
                where: {
                    phoneNumber: req.body.From.replace('whatsapp:', '')
                }
            })
            if (result[0] == 0) {
                await Chatbot.create({
                    phoneNumber: req.body.From.replace('whatsapp:', ''),
                    lastFile: req.body.MediaUrl0,
                    support: false
                });
            }
        } else if (req.body.Body.toUpperCase() == 'SUPPORT') {
            client.messages
                .create({
                    from: 'whatsapp:+14155238886',
                    body: 'We will get back to you shortly!',
                    to: req.body.From
                })
                .then(message => console.log(message.sid));
            let result = await Chatbot.update({
                support: true
            }, {
                where: {
                    phoneNumber: req.body.From.replace('whatsapp:', '')
                }
            })
        } else {
            client.messages
                .create({
                    from: 'whatsapp:+14155238886',
                    body: 'Hi!\nNice to meet you. Welcome to *Bitskrieg2.0*. This is your one stop platform to validate your invoices to check for any flaws and errors.\n\n*Simply upload your invoice to find you how it\'s performing!*',
                    to: req.body.From
                })
                .then(message => console.log(message.sid))
                .catch(err => console.error(err));
        }
    },
    async getSupportMessages(req, res) {
        let allMessages = await Chatbot.findAll({
            where: {
                support: true
            },
            order: [['updatedAt', 'DESC']]
        });
        allMessages = allMessages.map((message) => {
            return message.dataValues
        })
        res.send(allMessages);
    },
    async sendMessageTo(req, res) {
        client.messages
            .create({
                from: 'whatsapp:+14155238886',
                body: req.body.message,
                to: 'whatsapp:' + req.body.to
            })
            .then(message => console.log(message.sid));
        res.send({
            success: true
        });
    }

}

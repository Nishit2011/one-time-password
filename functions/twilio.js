const twilio = require('twilio');

const accountSid = 'AC6a539001c1f364eb083b5e60260f54d7';
const authToken = '7eab97db033d835cef470ffa1bc1549e';

module.exports = new twilio.Twilio(accountSid,authToken);

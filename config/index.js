var Pusher = require('pusher');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

var pusher = new Pusher({
  appId: '717181',
  key: '1f6698e9d674dfa90527',
  secret: 'fa2508eca5960346acf0',
  cluster: 'mt1',
  encrypted: true
});

var isDevelopment = process.env.NODE_ENV === 'development';
var URL = 'https://dev.voicestory.com/'
if (isDevelopment) {
  URL = 'http://localhost:3002/'
}

module.exports = {
  secret: process.env.NODE_ENV === 'production' ? process.env.SECRET : 'secret',
  pusher : pusher,
  sgMail : sgMail,
  URL : URL
};

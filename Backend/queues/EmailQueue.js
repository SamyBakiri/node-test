const {Queue} = require('bullmq');
const connection =  require('../config/redis');



const EmailQueue = new Queue('EmailQueue', { connection });

module.exports = EmailQueue;

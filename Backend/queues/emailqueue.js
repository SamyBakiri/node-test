const {Queue} = require('bullmq');
const IORedis = require('ioredis')

// sets up redis connection (MAKE SURE REDIS IS CONNECTED AND INSTALLED!!!)
// this is how to set up redis : https://redis.io/docs/latest/develop/tools/cli/#install-redis-cli
const connection = new IORedis({ 
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
  maxRetriesPerRequest: null,
});


const emailQueue = new Queue('emailqueue', { connection });

module.exports = emailQueue;

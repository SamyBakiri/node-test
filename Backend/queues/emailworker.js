const {Worker} = require('bullmq');
const {Email} = require('../models');
const nodemailer = require('nodemailer');
const IORedis = require('ioredis')

// ====IMPORTANT====
// RUN THIS TASK SEPERATLY! That's the job a worker, they are seperate from the backend process
// tsma dir node queues/emailworker.js and keep it on


// sets up redis connection (MAKE SURE REDIS IS CONNECTED AND INSTALLED!!!)
const connection = new IORedis({ 
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
  maxRetriesPerRequest: null,
});

// a worker is tasked with processing their job
// whats their job? sending emails obv 
const emailWorker = new Worker(
  'emailqueue',
  async (job) => {
    const { toEmail, title, body, id } = job.data;

    // node mailer stuff 
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    // this sends the email (lets go)
    await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: toEmail,
        subject: title,
        text: body,
    });

    // updates email status, date in db 
    await Email.update({ status: 'sent', sentAt: new Date() }, { where: { id } });

    console.log(`EMAILWORKER : Email sent to ${toEmail}`);
  },
  { connection }
);

emailWorker.on('completed', job => {
  console.log(`Job ${job.id} completed`);
});

emailWorker.on('failed', (job, err) => {
  console.error(`Job ${job?.id} failed`, err);
});

console.log("EMAILWORKER : not jobless like you")
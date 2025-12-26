require('dotenv').config();
const {Worker, QueueEvents, Queue} = require('bullmq');
const emailController = require('../controllers/emailsController');
const authMiddleware = require('../middleware/auth');
const nodemailer = require('nodemailer');
const IORedis = require('ioredis')
// ====IMPORTANT====
// RUN THIS TASK SEPERATLY! That's the job a worker, they are seperate from the backend process
// tsma dir node queues/emailworker.js and keep it on
// if you test a post request on email, just put scheduleAt to null, cuz u gon wait a LONG time
// unless u wanna test scheduling


// sets up redis connection (MAKE SURE REDIS IS CONNECTED AND INSTALLED!!!)
const connection = new IORedis({ 
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
  maxRetriesPerRequest: null,
});

// if u dont see pong, redis is not set up right
connection.ping().then(console.log).catch(console.error);

// a worker is tasked with processing their job
// whats their job? sending emails obv 
const emailWorker = new Worker('emailqueue', async (job) => {
    console.log("EMAILWORKER : Worker received a JOB!")
    const { toEmail, title, body, id } = job.data;

    // Create Ethereal test account
    let testAccount = await nodemailer.createTestAccount();

    // Create transporter
    let transporter = nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    });

    // Send the email
    let info = await transporter.sendMail({
      from: '"Test Email" <test@example.com>',
      to: toEmail,
      subject: title,
      text: body,
    });

    console.log(`EMAILWORKER : Email sent to ${toEmail}`);
    console.log("Preview URL:", nodemailer.getTestMessageUrl(info));

    // updates email status and date in db  (dont work for now)
    await emailController.update({
      id: id,
      status: 'sent',
      sentAt: new Date()
    });
  },
  { connection }
);


// DEBUG LOGS
const queueEvents = new QueueEvents("emailqueue");

queueEvents.on('waiting', ({ jobId }) => {
  console.log(`A job with ID ${jobId} is waiting`);
});

queueEvents.on('active', ({ jobId, prev }) => {
  console.log(`Job ${jobId} is now active; previous status was ${prev}`);
});

queueEvents.on('completed', ({ jobId, returnvalue }) => {
  console.log(`${jobId} has completed and returned ${returnvalue}`);
});

queueEvents.on('failed', ({ jobId, failedReason }) => {
  console.log(`${jobId} has failed with reason ${failedReason}`);
});

// to check if queue is has jobs
const q = new Queue('emailqueue', { connection });
q.getWaiting().then(console.log);
q.getDelayed().then(console.log); 

console.log("EMAILWORKER : up to work, awaiting jobs...")
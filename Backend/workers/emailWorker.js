require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const { Worker } = require('bullmq');

    const connection = require('../config/redis');
    const nodemailer = require('nodemailer');
    const { updateEmailStatus } = require('../controllers/emailsController');
const { error } = require('console');
    const emailWorker = new Worker(
    'EmailQueue',
    async job => {
    console.log("EMAILWORKER : Worker received a JOB!");
    try {
        

        const { toEmail, title, body, id } = job.data;
        console.log("EMAILWORKER : Job data:", job.data);

        if (!toEmail || !title || !body) {
            throw new Error("Job data is missing required fields");
        }
        // tesing a failled job                 !!! UNCOMMENT TO TEST THE FAILLED JOB HANDLING !!!
       // if(toEmail === "fail@gmail.com"){
         //   throw new Error("intentional failled job for testing");
        //}

        let testAccount = await nodemailer.createTestAccount();

        let transporter = nodemailer.createTransport({
            host: testAccount.smtp.host,
            port: testAccount.smtp.port,
            secure: testAccount.smtp.secure,
            auth: {
                user: testAccount.user,
            pass: testAccount.pass
            }
        });

        let info = await transporter.sendMail({
            from: '"Test Email" <test@example.com>',
            to: toEmail,
            subject: title,
            text: body
        });

        console.log(`EMAILWORKER : Email sent to ${toEmail}`);
        console.log("Preview URL:", nodemailer.getTestMessageUrl(info));

        await updateEmailStatus(id, { status: 'sent', sentAt: new Date()});
        } catch (err) {
            console.error("EMAILWORKER : Error sending email:", err);
            throw err; 
        }
    },
    { connection }
);
emailWorker.on('failed', (job, err) => {
    console.log(`Job ${job.id} failed:`, err.message);
});

emailWorker.on('completed', job => {
    console.log(`Job ${job.id} completed!`);
});

emailWorker.on('stalled', job => {
    console.log(`Job ${job.id} stalled`);
});

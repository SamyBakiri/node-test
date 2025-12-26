require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const { Worker } = require('bullmq');

    const connection = require('../config/redis');
    const nodemailer = require('nodemailer');
    const { updateEmailStatus } = require('../controllers/emailsController');
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
            throw err; // lets BullMQ retry
        }
    },
    { connection }
);

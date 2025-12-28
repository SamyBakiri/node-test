require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const { Worker } = require('bullmq');
const fs = require('fs');
const connection = require('../config/redis');
const nodemailer = require('nodemailer');
const { updateEmailStatus } = require('../controllers/emailsController');
const { error } = require('console');
const getTransporter = require('../config/emailTransporter');


    const emailWorker = new Worker(
    'EmailQueue',
    async job => {
    console.log("EMAILWORKER : Worker received a JOB!");
    try {
        

        const { toEmail, title, body, id, attachments } = job.data;
        console.log("EMAILWORKER : Job data:", job.data);

        if (!toEmail || !title || !body) {
            throw new Error("Job data is missing required fields");
        }
        // tesing a failled job                 !!! UNCOMMENT TO TEST THE FAILLED JOB HANDLING !!!
       // if(toEmail === "fail@gmail.com"){
         //   throw new Error("intentional failled job for testing");
        //}


        //let testAccount = await nodemailer.createTestAccount();
        
        let transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: process.env.SMTP_SECURE,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });
        let attachmentsArray = [];
        if(attachments){
                attachmentsArray = attachments.map(file =>({
                filename: file.originalname,
                path: file.path
            }))
        }
        let info = await transporter.sendMail({
            from: '"Test Email" <test@example.com>',
            to: toEmail,
            subject: title,
            text: body,
            attachments: attachmentsArray
        });

        console.log(`EMAILWORKER : Email sent to ${toEmail}`);
        //console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
        console.log(Array.isArray(attachments));
        if (Array.isArray(attachments)) {
            for (const file of attachments) {
                const remaining = await connection.decr(`file:${file.path}`); // decrement counter
                if (remaining === 0) {
                    // last job using this file => delete it
                    await fs.promises.unlink(file.path)
                    .then(() => console.log(`Deleted file: ${file.path}`))
                    .catch(err => console.error('Error deleting file:', err));
                    await connection.del(`file:${file.path}`); // clean up redis
                } else {
                    console.log(`File ${file.path} still needed by ${remaining} jobs`);
                    }
}
    
        };
        await updateEmailStatus(id, { status: 'sent', sentAt: new Date()});
        } catch (err) {
            console.error("EMAILWORKER : Error sending email:", err);
            throw err; //to let the worker try again  
        }
    },
    { connection,
        concurrency: 5
    }
    
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

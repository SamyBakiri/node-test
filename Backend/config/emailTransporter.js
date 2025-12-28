const nodemailer = require('nodemailer');


let transporter;

async function getTransporter() {
    if(!transporter){
        const testAccount =await nodemailer.createTestAccount();

        transporter = nodemailer.createTransport({
            host: testAccount.smtp.host,
            port: testAccount.smtp.port,
            secure: testAccount.smtp.secure,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass
            }
        })
        console.log("nodemailer transport created successfully");
    }
    return transporter;
}

module.exports = getTransporter;
const  {Email}= require('../models');
const EmailQueue = require('../queues/EmailQueue');
// id userId toEmail title body status scheduleAt sentAt


exports.all = async (req, res) => {
    try{
        const gottenEmails = await Email.findAll({
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
        where: {
            userId : req.user.id
        }
        });
        res.json(gottenEmails);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "failed "});
    }
};

exports.one = async (req, res) => {
    try{
        const { id } = req.params;
        const email = await Email.findOne({
        attributes: {
            exclude: ['createdAt', 'updatedAt']
            },
            where:{
                userId: req.user.id,
                id
            }
        });
        res.json(email);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "failed "});
        }
    
};

/*{
  "toEmail": "receiver@example.com",
  "title": "tessst!",
  "body": "Hello, this is a test email.",
  "scheduledAt": "2025-12-26T20:21:00Z"  
}
 */ 
exports.create = async (req, res) => {
    try {
        const { toEmail, title, body, status, scheduledAt, sentAt } = req.body;
        const userId = req.user.id;
        const newEmail = await Email.create({
            userId: userId,
            toEmail,
            title,
            body,
            status,
            scheduledAt,
            sentAt,
        });
          // calcs the delay if scheduled
        let delay = 0;
        if (newEmail.scheduledAt) {
            const scheduledDate = new Date(newEmail.scheduledAt);
            delay = scheduledDate.getTime() - Date.now();
            if (delay < 0) delay = 0;
        }

        // add to email queue
        
        await EmailQueue.add('sendEmail', 
            { ...newEmail.dataValues },
            { delay });

        res.json({ message: 'Email queued successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({error: "failed "}); 
    }
    
};

exports.update = async (req, res) => {
    try {
        const { toEmail, title, body, status, scheduledAt, sentAt } = req.body;
        const userId = req.user.id;
        const { id } = req.params;
        const newEmail = await Email.update({
            userId: userId,
            toEmail,
            title,
            body,
            status,
            scheduledAt,
            sentAt,
        },
    {where: {
            userId: req.user.id ,
            id
            }
    });
    res.json({message : "done"});
    } catch (err) {
        console.log(err);
        res.status(500).json({error: "failed "}); 
    }
    
};

exports.delete = async (req, res) => {
    try {
        const { id } = req.params //email id 
        await Email.destroy({
            where: {
                userId : req.user.id, //to ensure that user can only delete their own email req 
                id
            }
        })
    } catch (err) {
        
    }
}


// updates just the status attribute 
exports.updateEmailStatus = async (id, fields) => {
    return await Email.update(fields, { where: { id } });
};
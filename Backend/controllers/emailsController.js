const  {Email}= require('../models');
// id userId toEmail title body status scheduleAt sentAt


exports.all = async (req, res) => {
    console.log("DEATHMATIO - GET request gotten");
    try{
        const gottenEmails = await Email.findAll();
        res.json(gottenEmails);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "failed "});
    }
};

exports.create = async (req, res) => {
    console.log("DEATHMATIO - New email inserted")
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
        emailQueue.add( // now email gets queued + it even has a delay which means SCHEDULING
        'sendEmail',
        { ...newEmail.dataValues },
        { delay: scheduledAt ? new Date(scheduledAt) - new Date() : 0 } 
        );

        res.json({ message: 'Email queued successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({error: "failed "}); 
    }
    
};

const emails = require('../models/emails');
// id userId toEmail title body status scheduleAt sentAt


exports.all = async (req, res) => {
    console.log("DEATHMATIO - GET request gotten");
    try{
        const gottenEmails = await emails.findAll();
        res.json(gottenEmails);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "failed "});
        }
    
};

exports.create = async (req, res) => {
    console.log("DEATHMATIO - New email inserted")
    try {
        const { userId, toEmail, title, body, status, scheduledAt, sentAt } = req.body;
        const newEmail = await emails.create({
            userId,
            toEmail,
            title,
            body,
            status,
            scheduledAt,
            sentAt
        });
    res.json({message : "done"});
    } catch (err) {
        console.log(err);
        res.status(500).json({error: "failed "}); 
    }
    
};

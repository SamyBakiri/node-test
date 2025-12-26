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
    res.json({message : "done"});
    } catch (err) {
        console.log(err);
        res.status(500).json({error: "failed "}); 
    }
    
};

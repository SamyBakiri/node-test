const  {Email}= require('../models');
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

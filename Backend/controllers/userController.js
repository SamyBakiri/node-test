const { User } = require("../models");

exports.all = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: "failled"});
    }
}

exports.create = async (req, res) => {
    try {
        const { name, email, password } =req.body || {};
        const user = await User.create({name, email, password});
        res.json({message : "done"});    
        
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "failed"});
    }
}
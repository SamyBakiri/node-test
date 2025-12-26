const { where } = require("sequelize");
const { User } = require("../models");
const bcrypt = require('bcryptjs');

exports.one = async (req, res) => {
    try {
        const id = req.user.id;
        const user = await User.findOne({
            where: {
                id
            }
        });
        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: "failled"});
    }
}

exports.update = async (req, res) => {
    try {
        const { name, email, password } =req.body || {};
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = await User.update({name, email, password: hashedPassword},
            {where: {
                id: req.user.id
                }
            }
        );
        res.json({message : "done"});    
        
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "failed"});
    }
}

exports.delete = async (req, res) => {
    try{
        await User.destroy({
            where:{
                id: req.user.id
            }
        });
    }catch(err){
        console.log(err),
        res.status(500).json({message:"failed"})
    }
}
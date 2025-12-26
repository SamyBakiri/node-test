const { Habit } = require("../models");

exports.all = async (req, res) => {
    console.log("controller work");
    try{
        const habits = await Habit.findAll();
        res.json(habits);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "failed "});
        }
    
};

exports.create = async (req, res) => {
    try {
        const { name, description } =req.body || {};
        const userId = req.user.id; // i got that from the jwt token in the middleware
        const habit = await Habit.create({name , description, userid: userId}) // cuz i named it in the db  id
        res.json({message : "done"});
    } catch (err) {
        console.log(err);
        res.status(500).json({error: "failed "}); 
    }
    
};

const habit = require('../models/habit');

exports.all = async (req, res) => {
    console.log("controller work");
    try{
        const habits = await habit.findAll();
        res.json(habits);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "failed "});
        }
    
};

exports.create = async (req, res) => {
    try {
        const { name, description } = req.body || {};
        const userHabit = await habit.create({name, description})
    res.json({message : "done"});
    } catch (err) {
        console.log(err);
        res.status(500).json({error: "Habit controller failed : "}); 
    }
    
};

const habit = require('../models/habit');

exports.all = async (req, res) => {
    console.log("controller work");
    try{
        const habits = await habit.findAll();
        res.json(habits.map(h => h.name));
    }catch(err){
        console.log(err);
        res.status(500).json({error: "failed "});
        }
    
};

exports.create = async (req, res) => {
    try {
        const { name, description } =req.body || {};
        const habit = await habit.create({
        name: 'habit1',
        description: 'bal bal bal'
    })
    res.json({message : "done"});
    } catch (err) {
        console.log(err);
        res.status(500).json({error: "failed "}); 
    }
    
};

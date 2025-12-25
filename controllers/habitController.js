const habit = require('../models/habit');

exports.all = async (req, res) => {
    console.log("controller work");
    const habits = await habit.findAll();
    res.json(habits.map(h => h.name));
};

exports.create = async (req, res) => {
    const { name, description } =req.body;
    const habit = await habit.create({
        name: 'habit1',
        description: 'bal bal bal'
    })
    res.json({message : "done"});
};

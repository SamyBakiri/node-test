const { User } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');



exports.register = async(req, res) => {
    try{
        const { name, email, password } = req.body || {}
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({name, email, password: hashedPassword});
        res.json({message: "done"})
    }catch(err){
        console.log(err);
        res.status(500).json({error: "failed"});
    }
}


exports.login = async (req, res) => {
    try{
    const { email, password } = req.body || {}
    const user = await User.findOne({
        where: {
            email: email
        }
    });
    
    if(!user){
        return res.status(401).json({message: "invalid info"});
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(401).json({message: "invalid info"});
    }
    const payload = {
        id: user.id,
        email: user.email
    }

    const token = jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {expiresIn: '1h'}
    ); // 1 hour expiration 

    res.json({jwtToken: token});

    }catch(err) {
        console.log(err);
        res.status(500).json({error : "failed"});
    }


}
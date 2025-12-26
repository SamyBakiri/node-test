const jwt = require('jsonwebtoken');



module.exports = (req, res, next ) => {
    const header = req.headers['authorization'];
    
    if(!header) {
        return res.status(403).json({message: "token missing"});
    }

    const token = header.split(' ')[1]; // cuz thats how the token is send :   Bearer token
    jwt.verify(token, 
        process.env.JWT_SECRET,
        (err, payload) => {
            if(err){
                return res.status(403).json({
                    message: "invalid token"
                });
            }
            req.user = payload;
            next(); // execute the controller
        }
    );
};
const jwt = require("jsonwebtoken");
const AppError = require("./AppError");

const tokenAuth = (req, res, next) => {
    const token = req.headers.authorization;
    // console.log(token);
    if(!token) {next(new AppError("Missing Token",404));}
    const {id} = jwt.verify(token,process.env.JWT_SECRET_KEY);
    if(!id){next(new AppError('Invalid Token: user isn\'t authorized',401));}
    // console.log('id:',id);
    req.body.owner = id;
    next();
}

module.exports = {tokenAuth};
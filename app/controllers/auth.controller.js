const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");




async function signup (req, res){
  // Save User to Database
  try{
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8)
    })
    return res.status(200).json({
      status : 'success',
      message : 'user created'
    })
  }
  catch(err){
    console.log(err);
    return res.status(400).json({
      status : 'error',
      message : err
    })
  }
  
};




async function signin(req, res){
  try{
    const user = await User.findOne({
      where: {
        username: req.body.username
      }
    })
    if(!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    const  passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if(!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!"
       });
     }
    const  token = jwt.sign({ id: user.id }, config.secret, {
       expiresIn: 86400 // 24 hours
     });
     return res.status(200).json({
        id: user.id,
         username: user.username,
         email: user.email,
         accessToken: token
     });
   }
  catch(err){
    console.log(err);
    return res.status(200).json({
      status : 'error',
      message : err
   });
  }
   
};


module.exports = {signin , signup}
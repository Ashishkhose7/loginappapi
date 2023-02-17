let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
let jwt  = require('jsonwebtoken');
let bcrypt = require('bcryptjs');
let config = require('../config');
let user = require('../model/userModel');

router.use(bodyParser.json()); 
router.use(bodyParser.urlencoded({ extended: true }));

//Get all User
router.get('/users',(req, res) => {
   user.find({}, (err, data)=>{
    if(err) throw err
    res.send(data);
   })
})

//Register User
router.post('/register', (req, res)=>{
   let encryptpass = bcrypt.hashSync(req.body.password, 8);

   user.create({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: encryptpass,
      role: req.body.role?req.body.role:'user'
   },(err, data)=>{
    if(err) res.send("error while registration");
    res.send('Registration Successfull..')
   })
})


//Login User
router.post('/login', (req, res)=>{
   user.findOne({email: req.body.email}, (err, user)=>{
      if(err) res.send({auth:false, token:'error while login'})
      if(!user) {
         res.send({auth:false, token:'No user found'})
      }
      else{
         let passvalidation = bcrypt.compareSync(req.body.password, user.password)
         if(!passvalidation){
            res.send({auth:false, token:'Invalid Password'})
         }else{
            //In case pass and email valid and generate token
            let token = jwt.sign({id:user._id}, config.secret,{expiresIn: 86400})//24hr
            res.send({auth:true, token:token})
         }
      }
   })
})

//User Information
router.get('/userinfo', (req, res)=>{
   let token = req.headers['x-access-token'];
   if(!token) res.send({auth:false, token: 'Token not provided'})
   //jwt verify
   jwt.verify(token,config.secret,(err, result)=>{
      if(err) res.send({auth:false, token: 'Invalid token'})
      user.findById(result.id,(err, result)=>{
         res.send(result)
      })
   })
})

module.exports = router;
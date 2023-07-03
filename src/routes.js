const express = require("express")
const router = express.Router()
require('dotenv').config()
const bcrybt = require('bcrypt')
const base64 = require('base-64')
const signin = require("./middleware/signin")
const bearerChecker = require("./middleware/bearerChecker")
const { User } = require("./moduls/user.model")



router.get('/' , (req,res) =>{
     res.status(200).json({
          message : 'Home page'
     })
})

router.get('/order' ,bearerChecker, (req , res) =>{
     if(!req.data){
          res.status(200).json({
               message : 'you dont have the access to this page'
          })
     }
     res.status(200).json({
          message : 'you have the access to this page'
     })
})

router.post('/signup' , async (req,res) =>{
     const {username , password} = req.body
     const encrybt = await bcrybt.hash(password , 5)
     
     const signup = await User.create({
          username: username,
          password: encrybt
     })
     res.status(201).json({
          message : signup
     })
})
router.post('/signin' , signin , (req,res) =>{

     if(req.data) {
          res.status(200).json({
               user : req.data,
               message :'This user is Authorized!!!'
          })
        } else {
          res.status(500).json({
            message: 'This user is not Authorized!!!'
          })}
})



module.exports = router
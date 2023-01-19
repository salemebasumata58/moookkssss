const express = require("express");
const User = require("./user.model");
const app = express.Router();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");


app.post("/signup", async(req, res)=>{
    const {email, password} = req.body;
    const hash = await argon2.hash(password);
    console.log(email, password)
    try{
        let existingUser = await User.findOne({email})
        if(existingUser){
            res.status(404).send(`cannot create a user with existing email id`)
        }else{
        let user = await User.create({
            email, 
            password: hash
        })
        res.send({ message: "SignUp Success" })
        }
    }catch(e){
        res.status(404).send(e.message);
    }
})

app.post("/login", async(req, res)=>{
    const {email, password} = req.body;
   
   try{
   
    let user = await User.findOne({email});
    if(user){
    if (await argon2.verify(user.password, password)) {
        console.log("yes")
        let token = jwt.sign(
            { id: user._id, name: user.email},
            "SECRET12345",
            { expiresIn: "1 hour" }
          );
          return res.send({ message: "Login Success", token });
    } 
    else{
        return  res.status(401).send(`Authentication failed, incorrect password`)
       }
 }
 else{
    return res.status(401).send(`User with email: ${email} not found`);
   } // User is from model;
 //    console.log(user)
    // if(user){
    //     if(password === user.password){
    //      res.send({
    //          token: `${email}_#_${password}`,
    //          user,
    //      })
    //     }else{
    //      res.status(401).send(`Authentication failed, incorrect password`)
    //     }
    // }else{
    //  res.status(401).send(`User with email: ${email} not found`);
    // }
 }catch(e){
    return   res.status(404).send(e.message);
 }
 })

module.exports = app;
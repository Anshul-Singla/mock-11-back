const express = require("express");
const User = require("./user.model.js");
const jwt = require("jsonwebtoken");
const argon2 = require('argon2')

const app = express.Router();


app.get('/' , (req , res) => {
    res.send("LIFE IS AWESOME... && welcome to users")
});
app.post("/signup", async (req, res) => {
  const { email, password,} = req.body;

  const oldUser = await User.findOne({ email });
  if (oldUser) {
    return res.send({ status: false, message: "User already exist!" });
  }
  // --------------------------
  try {
    const hashed = await argon2.hash(password);
    const user = await User.create({
      email,
      password : hashed,
    });
    return res.send({ status: true, message: "You have signup Successfully" });
    
  } catch (error) {
    res.send(error)
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email});
  if (!user) {
    return res.send({ Token: "", message: "Wrong Credential!" });
  }else{

    if(await argon2.verify(user.password , password)){
      const Token = jwt.sign(
        {
          id: user._id,
          email: user.email,
        },
        "SECRETKEY",
        { expiresIn: "2 days" }
      );
    
      return res.send({
        Token: Token,
        message: "You have signIn Successfully",
      });
    }else{
      res.send({message :"Wrong cridentials" });
    }
  }

  // const refreshToken = jwt.sign({}, "REFRESH");
});

module.exports = app;

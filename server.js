const express = require("express");
const dbconnect = require("./config/db.connect");
const cors = require("cors");
const userRouter = require('./users/user.router.js')

let port = process.env.PORT ||  8080;


const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("<h1>LIFE IS AWESOME...</h1>");
});
 
// :::::::::::user Route:::::::::::::::::::
app.use('/user' , userRouter)






app.listen(port, async () => {
  await dbconnect;
  console.log(`Listening on http://localhost:${port}`);
});

const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const connect = require("./config/db");
const userRoute = require("./features/user.route")
const app = express()

app.use(express.json());
app.use(cors());
app.use("/users", userRoute);

app.get("/dashboard",async (req, res)=>{
    const token = req.headers["authorization"];
    if (!token) {
        return res.send("Unauthorized");
      }
      try {
        const verification = jwt.verify(token, "SECRET12345");
        console.log("verificetion", verification);
        if (verification) {
          const products = await UserModel.find();
          return res.send(user);
        }
      } catch (e) {
        return res.send("Invalid Token");
      }
})

app.listen(8080, async()=>{
    await connect();
    console.log(`listening to 8080`);
})
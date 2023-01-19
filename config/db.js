const mongoose = require("mongoose");
const connect =async()=>{
  return mongoose.connect("mongodb+srv://salemes:salemes@cluster0.8hhyd86.mongodb.net/Mocks?retryWrites=true&w=majority");
}

module.exports= connect;
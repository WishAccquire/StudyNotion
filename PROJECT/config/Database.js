require("dotenv").config();
const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("MongoDb is connected");
  } catch (error) {
    console.log("MongoDb Connection is Failed");
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = connectDb;

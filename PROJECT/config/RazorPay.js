const Razorpay=require("razorpay")
exports.instance = new Razorpay({
    key_id: process.env.KEY,
    key_secret:process.env.KEY_SECRET,
  });
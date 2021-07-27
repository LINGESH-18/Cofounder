const mongoose = require("mongoose");
const config = require("config");
const dbUrl = config.get("mongoUrl");

const connectDb = async () => {
  try {
    mongoose.connect(dbUrl, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log("Mongodb Atlas cloud Database Connected successfuly");
  } catch (err) {
    console.log("Error from Path:/config/db");
    res.status(400).send(err.msg);
    process.exit(1); //make project failuare
  }
};
module.exports = connectDb;

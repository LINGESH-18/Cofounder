const express = require("express");
const app = express();
const connectDb = require("./config/db");

//getting objects from the body

app.use(express.json({ extended: false }));

//Database connection

connectDb();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Working on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("API Running");
});

// app routes
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profiles", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/users", require("./routes/api/user"));
app.use("/api/report", require("./routes/api/report"));
app.use("/api/feedback", require("./routes/api/feedback"));
app.use("/api/adminregistration", require("./routes/api/Adminreg"));
app.use("/api/dashboard", require("./routes/api/dashboard"));

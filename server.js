const exp = require("express");
const app = exp();
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on port ${port}`));
app.get("/", (req, res) => {
  res.send("Api running");
});

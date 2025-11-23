const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/cdac2025")
  .then(() => console.log("Connected!"));

const Schema = mongoose.Schema;
const BlogPost = new Schema({
  name: String,
  email: String,
  password: Number,
});

const MyModel = mongoose.model("users", BlogPost);
const express = require("express");
const app = express();
//to accept data in form type and not in json format
app.use(express.urlencoded());
app.get("/register", (req, res) => {
  res.render("register.ejs");
});
app.get("/login", (req, res) => {
  res.render("login.ejs");
});
app.get("/users", async (req, res) => {
  try {
    const result = await MyModel.find();
    res.render("users.ejs", { "data": result });
  } catch (err) {
    res.send("ERROR : " + err);
  }
  //  res.render("users.ejs");
});
app.post("/registerAction", async (req, res) => {
  //Here data will be submitted
  try {
    let record = new MyModel(req.body);
    await record.save();
    res.redirect("/users");
  } catch (err) {
    res.send("ERROR : " + err);
  }
});
app.listen(3000);

//module imports
require("dotenv").config();
const express = require("express");
const app = express();
const Grid = require("gridfs-stream");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

// file imports
const connection = require("./db");
const imageSend = require("./routes/imageSend");
var imgModel = require("./model");

app.use(
  cors({
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

//configurations to read Image Data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let gfs;
//Connection to the Database
connection();

const conn = mongoose.connection;
conn.once("open", function () {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("photos");
});

// Routes to use to Send and Receive Data
app.use("/file", imageSend);

// media routes
app.get("/file/upload", async (req, res) => {
  if (req.query.tag !== "") {
    let tag = req.query.tag;
    const allData = await imgModel.find({ tag: tag });
    res.json(allData);
  } else if (req.query.tag == "") {
    const allData = await imgModel.find();
    res.json(allData);
  }
});

app.delete("/file/upload", async (req, res) => {
  if (req.query.name !== "" && req.query.uploadDate !== "") {
    let name = req.query.name;
    let fileToDel = req.query.filename;
    let uploadDate = req.query.uploadDate;
    const imagePath = path.join(__dirname, "uploads", fileToDel);
    // const imagePath = fs.existsSync({"originalname":fileToDel});
    fs.unlinkSync(imagePath);
    await imgModel.deleteOne({ name: name, uploadDate: uploadDate });
    res.send("Success");
  }
});

//listen to which port to use
const port = process.env.PORT || 5000;
app.listen(port, console.log(`Listening on port ${port}...`));

// app.listen(5000);

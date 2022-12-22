const express = require("express");
const app = express();
const cors = require("cors");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const filecreater = require("./models/file");

require("dotenv").config();

const link = `mongodb+srv://${process.env.PASSWORD}:mongodb2002@cluster0.8et7m.mongodb.net/${process.env.DATABASENAME}`;
mongoose.set("strictQuery", false);
mongoose
  .connect(`${link}`, { useNewUrlParser: true, useUnifiedTopology: true }) // to avoid warning
  .then(() => {
    console.log("success");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // listen for request
  })
  .catch((err) => console.log(err));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    console.log(file);
    const fileExtension = file.originalname.split(".")[1];
    const uniqueName = uuidv4() + "." + fileExtension;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage: storage });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 4004;

app.get("/", (req, res) => {
  res.json("ha");
});

app.post("/form", upload.single("file_upload"), async (req, res) => {
  console.log(req.file);
  console.log(req.body);
  var salt = bcrypt.genSaltSync(10);
  const password = req.body.password;
  const pass = bcrypt.hashSync(password, salt);
  const data = await filecreater.insertMany([
    {
      filename: req.file.filename,
      filepath: req.file.path,
      mimetype: req.file.mimetype,
      password: pass,
    },
  ]);
  res.json({ data: data[0]._id });
});

app.post("/download", async (req, res, next) => {
  const data = await filecreater.find({ _id: req.body.fileId });
  if (data.length == 0) res.status(404).json("failed"), next();
  const chk = bcrypt.compareSync(req.body.password, data[0].password);
  if (!chk) res.status(404).json("failed");
  else {
    res.setHeader("Content-Type", data[0].mimetype);
    res.sendFile(`${__dirname}/${data[0].filepath}`, (err) => {
      if (err) {
        console.log(err);
        res.status(404).json("failed");
      } else {
        console.log("success download");
      }
    });
  }
});

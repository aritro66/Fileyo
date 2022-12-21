const express = require("express");
const app = express();
const cors = require("cors");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

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

app.post("/form", upload.single("file_upload"), (req, res) => {
  console.log(req.file);
  console.log(req.body);
  res.json({ data: "success" });
});

app.post("/download", (req, res, next) => {
  res.sendFile(`${__dirname}/uploads/${req.body.filename}`, (err) => {
    if (err) {
      console.log(err);
      res.status(404).json("fail");
    } else {
      console.log("success");
    }
  });
});

app.listen(PORT, () => {
  console.log(`running at port ${PORT}`);
});

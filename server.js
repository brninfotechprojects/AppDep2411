const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const bcrypt = require("bcrypt");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use("/profilePics", express.static("profilePics"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "profilePics");
  },
  filename: (req, file, cb) => {
    console.log(file);

    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  age: Number,
  email: String,
  password: String,
  mobileNo: String,
  profilePic: String,
});

let User = new mongoose.model("users", userSchema, "users");

app.post("/signup", upload.single("profilePic"), async (req, res) => {
  console.log(req.body);

  console.log(req.file);
  console.log(req.files);

  let hashedPassword = await bcrypt.hash(req.body.password, 10);

  try {
    let newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
      email: req.body.email,
      password: hashedPassword,
      mobileNo: req.body.mobileNo,
      profilePic: req.file.path,
    });

    await newUser.save();

    res.json({ status: "success", msg: "User created successfully" });
  } catch (err) {
    res.json({ status: "failure", msg: "Unable to create account.", err: err });
  }
});

app.post("/login", upload.none(), async (req, res) => {
  console.log(req.body);

  let userDetails = await User.find().and({ email: req.body.email });

  if (userDetails.length > 0) {
    let isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      userDetails[0].password
    );
    if (isPasswordCorrect == true) {
      let userDetailsToSend = {
        firstName: userDetails[0].firstName,
        lastName: userDetails[0].lastName,
        age: userDetails[0].age,
        email: userDetails[0].email,
        mobileNo: userDetails[0].mobileNo,
        profilePic: userDetails[0].profilePic,
      };

      res.json({
        status: "success",
        msg: "all are correct.",
        userData: userDetailsToSend,
      });
    } else {
      res.json({ status: "failure", msg: "Invalid password." });
    }
  } else {
    res.json({ status: "failure", msg: "User doesnot exist." });
  }
  console.log(userDetails);
});

app.listen(4567, () => {
  console.log("Listening to port 4567");
});

let connectToMDB = async () => {
  try {
    mongoose.connect(
      "mongodb+srv://manjunadhb:manjunadhb@batc2411cluster.0rl2c.mongodb.net/MERN2411?retryWrites=true&w=majority&appName=Batc2411Cluster"
    );

    console.log("Successfully connected to MDB");
  } catch (err) {
    console.log("Unable to connect to MDB");
  }
};

connectToMDB();

const express = require("express");
const session = require("express-session");
const hbs = require("express-handlebars");
const mongoose = require("mongoose");
const passport = require("passport");
// const localStrategy		= require('passport-local').Strategy;
const cors = require("cors");
const bcrypt = require("bcrypt");
const passportStrategy = require("./passportConfig.js");
const app = express();
const User = require("./models/User.js");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const sendMail = require("./mail/mail.js");
// app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({ origin: "http://127.0.0.1:5500", credentials: true }));

mongoose.connect("mongodb://localhost:27017/studentRegistrationSystem", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// const UserSchema = new mongoose.Schema({
// 	username: {
// 		type: String,
// 		required: true
// 	},
// 	password: {
// 		type: String,
// 		required: true
// 	}
// });

// const User = mongoose.model('User', UserSchema);

// Middleware
// console.log(hbs);
// app.engine('hbs', hbs.engine({ extname: '.hbs' }));
// app.set('view engine', 'hbs');
// app.engine('handlebars', exphbs({defaultLayout: 'main'}));
// app.set('view engine', 'handlebars');
// app.use(express.static(__dirname + '/public'));
app.use(
  session({
    secret: "verygoodsecret",
    resave: false,
    saveUninitialized: true,
    // cookie: {sameSite: "lax"}
  })
);

// Passport.js
app.use(passport.initialize());
app.use(passport.session());
passportStrategy(passport);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}

function isLoggedOut(req, res, next) {
  if (!req.isAuthenticated()) return next();
  res.redirect("/");
}

// ROUTES
app.get("/", isLoggedIn, (req, res) => {
  res.render("index", { title: "Home" });
});

app.get("/about", (req, res) => {
  res.render("index", { title: "About" });
});

app.get("/login", isLoggedOut, (req, res) => {
  const response = {
    title: "Login",
    error: req.query.error,
  };

  res.render("login", response);
});

app.post("/login", (req, res, next) => {
  // console.log("login");
  // console.log(req.body.uname, req.body.pword);
  try {
    passport.authenticate("local", { session: true }, (err, user) => {
      if (err) throw err;
      if (!user) res.status(404).json({ message: "no such user exists" });
      else {
        req.login(user, (err) => {
          if (err) throw err;
          res.status(200).json({
            loggedInUser: req.user,
            message: "user authenticated successfully",
          });
          //  console.log("authenti. user is: ", req.user);
        });
      }
    })(req, res, next);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

// Setup our admin user
app.get("/setup", async (req, res) => {
  const exists = await User.exists({ username: "admin" });

  if (exists) {
    res.redirect("/login");
    return;
  }

  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash("pass", salt, function (err, hash) {
      if (err) return next(err);

      const newAdmin = new User({
        username: "admin",
        password: hash,
      });

      newAdmin.save();

      res.redirect("/login");
    });
  });
});

app.get("/authenticatedUser", (req, res) => {
  console.log(req.user)
  if (req.user) {
    res.status(200).json({ authenticatedUser: req.user });
  } else {
    res.status(404).json({ authenticatedUser: null });
  }
});

app.patch("/register_student", async (req, res) => {
  console.log("req.user=" + req.user.name);
  if (req.user) {
    const doc = await User.findOne({ name: req.user.name });
    const update = { registration: "YES" };
    await doc.updateOne(update);
    console.log("hello");
    res.status(200).json({ authenticatedUser: req.user });
    // console.log("hello in backend")
    // req.user.registration = "YES";
  } else {
    // console.log("hello in backend")
    res.status(404).json({ authenticatedUser: null });
  }
});

app.patch("/partial_payment", async (req, res) => {
  console.log("req.user=" + req.user.name);
  if (req.user) {
    const doc = await User.findOne({ name: req.user.name });
    const update = { fee_payment: "PARTIAL PAY" };
    await doc.updateOne(update);
    console.log("hello");
    res.status(200).json({ authenticatedUser: req.user });
    // console.log("hello in backend")
    // req.user.registration = "YES";
  } else {
    // console.log("hello in backend")
    res.status(404).json({ authenticatedUser: null });
  }
});


app.patch("/full_payment", async (req, res) => {
  console.log("req.user=" + req.user.name);
  if (req.user) {
    const doc = await User.findOne({ name: req.user.name });
    const update = { fee_payment: "FULL PAY" };
    await doc.updateOne(update);
    console.log("hello");
    res.status(200).json({ authenticatedUser: req.user });
    // console.log("hello in backend")
    // req.user.registration = "YES";
  } else {
    // console.log("hello in backend")
    res.status(404).json({ authenticatedUser: null });
  }
});

// console.log(process.env.EMAIL_PASSWORD);

app.post("/send", async (req, res) => {
  console.log(req.body);
  sendMail(
    req.user.email_id,
    "OTP",
    "wow",
    `<p>your otp is ${req.body.otp}</p>`
  )
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

  res.status(200).json({ message: "email sent" });
});


app.post("/semester_branch", async (req, res) => {
  console.log(req.body);

  if (req.body.semester && req.body.branch) {
    const docs = await User.find();

	const requiredUsers = docs.filter(doc=> doc.semester == req.body.semester && doc.branch == req.body.branch)

    console.log("hello");
	console.log(requiredUsers);
    res.status(200).json({ users: requiredUsers });
  } else {
    res.status(404).json({ authenticatedUser: null });
  }
});

app.get("/logout", (req, res) => {
  req.logOut();
});

//

app.listen(4009, () => {
  console.log("Listening on port 4009");
});


app.post("/verificationUser", async (req, res) => 
{
	console.log(req.body.roll_no);

  if (req.body.roll_no) {
    const doc = await User.findOne({ roll_no: req.body.roll_no})
	// const requiredUsers = doc.filter(doc=> doc.roll_no === req.body.roll_no)
    console.log(doc);
	// console.log(requiredUsers);
    res.status(200).json({ users: doc });
  } else {
    res.status(404).json({ authenticatedUser: null });
  }
})

app.get("/users/:rollNo", async (req, res)=>{
  console.log("Debug:"+req.params.rollNo)
  var rno = req.params.rollNo;
  try {
    const user = await User.find({roll_no:  "BT20CSE101"})
    console.log(user);
    res.status(200).json({user: user})
  } catch (error) {
    res.status(400).json(error)
  }
})

app.post("/verify_student", async(req,res)=>{
  console.log(req.body);
  if (req.body) {
    const doc = await User.findOne({ roll_no: req.body.roll_no});
    const update = { verification: "YES" };
    await doc.updateOne(update);
    res.status(200).json({ verifiedUser: doc });
  } else {
    res.status(404).json({ authenticatedUser: null });
  }
});
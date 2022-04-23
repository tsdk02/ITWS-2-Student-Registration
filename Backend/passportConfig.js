const User = require("./models/User.js")
const bcrypt = require("bcryptjs")
const passportLocal = require("passport-local")

const localStrategy = passportLocal.Strategy

const passportStrategy = (passport)=>{
    
  passport.use(
    new localStrategy(
      { usernameField: "uname", passwordField: "pword" },
      async (username, password, done) => {
        // console.log("x", "y", username, password)
          // console.log("hi")
        // try {
        //   await User.findOne({email_id: "bt20cse019@iiitn.ac.in"}, (err, user)=>{
        //     console.log(user)
        //   }).clone()
        // } catch (error) {
        //   console.log(error)
        // }
       try {
        await User.findOne({ email_id: username }, (err, user) => {
          if (err) throw err;
          if (!user) return done(null, false);
          // console.log(user)
          // bcrypt.compare(password, user.password, (err, result) => {
          //   if (err) throw err;
          //   if (result === true) {
          //     return done(null, user);
          //   } else {
          //     return done(null, false);
          //   }
          // });
          // console.log("password is: ", password, "user password is: ", user[0].password);
          if(password === user.password){
            // console.log("yes")
            return done(null, user)
          }
          else{
            // console.log("no")
            return done(null, false)
          }

        }).clone();
       } catch (error) {
         console.log(error)
       }
      }
    )
  );

  // save userid in session cookie
  passport.serializeUser((user, done) => {
    // console.log("serialze func", user)
    done(null, user.id);
  });

  // retrieve the whole object stored in session
  passport.deserializeUser((id, done) => {
    User.findOne({ _id: id }, (err, user) => {
      done(err, user);
    });
  });
}

module.exports = passportStrategy
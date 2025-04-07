const express = require("express")
const app = express();
const dbConnect = require("./dbConfig/dbConnect")
const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes")
const cartRoutes = require("./routes/cartRoutes")
const productRoute = require("./routes/productRoute")
const favoriteRoutes = require("./routes/favoriteRoutes")
const adminRoutes = require("./routes/adminRoutes")
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const OAuth2Strategy = require("passport-google-oauth20").Strategy;
const Usermodel = require("./models/UserModel");


const clientId =
  "889302706488-e4t4u2vfa7rh48s7hokbk2admd38r53l.apps.googleusercontent.com";
const clientSecret = "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";

require("dotenv").config();
dbConnect()

app.use(express.json());
app.use(cors({
    origin:["http://localhost:5173"],
    method:['GET','POST','PUT','DELETE'],
    credentials:true
}))

app.get("/dashboard", async (req, res) => {
    try {
        const users = await Usermodel.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.use("/api/auth",authRoutes)
app.use("/api/cart", cartRoutes);
app.use("/api/users",userRoutes)
app.use("/api/products", productRoute);
app.use("/api/favorites", favoriteRoutes);

const PORT = 5000;


app.use(
    cors({
      origin: ["http://localhost:5173"],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );
  
  app.use(express.json());
  
  // Setup Session
  app.use(
    session({
      secret: "123456789",
      resave: false,
      saveUninitialized: true,
    })
  );
  
  //Setup Passport
  app.use(passport.initialize());
  app.use(passport.session());
  
  passport.use(
    new OAuth2Strategy(
      {
        clientID: clientId,
        clientSecret: clientSecret,
        callbackURL: "http://localhost:5000/auth/google/callback",
        scope: ["profile", "email"],
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        try {
          let user = await Usermodel.findOne({ googleId: profile.id });
          if (!user) {
            user = new Usermodel({
              googleId: profile.id,
              displayName: profile.displayName,
              image: profile.photos[0].value,
              email: profile.emails[0].value,
            });
            await user.save();
          }
          return done(null, user);
        } catch (error) {
          return done(error, null);
        }
      }
    )
  );
  
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
  
  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );
  
  app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      successRedirect: "http://localhost:5173/products",
      failureRedirect: "http://localhost:5173/login",
    })
  );
  
  app.get("/login/success", async (req, res) => {
    console.log("request" + req.user);
    return res.json({ message: req.user });
  });
  

  // logout the user 
  app.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ message: "Logout failed", error: err });
        }
        req.session.destroy(() => {
            res.clearCookie("connect.sid"); // Clear session cookie
            res.status(200).json({ message: "Logged out successfully" });
        });
    });
});


app.listen(PORT, () => {
    console.log("server running on port", PORT);
});
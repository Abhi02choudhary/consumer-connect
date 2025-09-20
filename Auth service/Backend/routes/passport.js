const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: "http://localhost:8080/auth/google/callback", 
        },
        async (accessToken, refreshToken, profile, done) => {
            console.log("🔹 Google Profile:", profile);  // <--- Add this line
            done(null, profile);
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user); // Fixed typo (null instead of "nill")
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

module.exports = passport;
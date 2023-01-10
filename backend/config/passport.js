const passport = require('passport');
require("dotenv").config();
const GoogleStrategy = require('passport-google-one-tap').GoogleOneTapStrategy;
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      verifyCsrfToken: false,
    },
    async (profile, done) => {
      try {
        if (!Boolean(profile)) {
          done(null, null);
          return;
        }

        const { displayName, emails } = profile;
        done(null, {
            name: displayName,
            email: emails[0]?.value,
        });
        } catch (error) {
        done(error, null);
        return;
        }
    },
));
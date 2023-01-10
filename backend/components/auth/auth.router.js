const express = require('express');
const verifyToken = require('../../middlewares/auth');
const passport = require('passport');
require('../../config/passport');

const router = express.Router();

const authController = require("./auth.controller");

router.get("/", verifyToken, authController.checkLogged);

router.get("/verify/:token", authController.verifySuccess);

router.post("/verify/resendmail", authController.resendMail);

router.post("/resetpassword/sendmail", authController.sendResetPassMail);

router.post("/resetpassword/:token", authController.resetPassword);

router.get("/finduser/:userID", authController.findUser);

router.post("/register", authController.register);

router.post("/login", authController.login);

router.post("/logout", verifyToken, authController.logout);

router.post("/refresh", authController.requestRefreshToken);

router.post('/login/google', passport.authenticate('google-one-tap', 
    {
        scope: ['profile', 'email'],
        session: false,
    }
), authController.googleLogin);
 


module.exports = router;
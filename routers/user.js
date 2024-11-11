const express = require("express");
const router = express.Router();
const wrapAsyc = require("../util/wrapAsyc");
const passport = require("passport");
const { saveRedirectUrl} = require("../middleware.js");
const usercontroller = require("../controllers/user.js");


router
.route("/signup")
.get((req,res) =>{
    res.render("users/signup.ejs");
})
.post(wrapAsyc(usercontroller.signup ));


router
.route("/login")
.get((req,res) =>{
    res.render("users/login.ejs")
})
.post(saveRedirectUrl, passport.authenticate("local",
    {failureRedirect: "/login", failureFlash: true,}),usercontroller.redirectUrl);


router.get("/logout",usercontroller.logout);

module.exports = router;
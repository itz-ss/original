const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsyc = require("../util/wrapAsyc.js");
const ExpressError = require("../util/ExpressError.js");
const { validateReview, isLoggedIn,isreviewAuthor} = require("../middleware.js");
const reviewcontroller = require("../controllers/review.js");


//reviews
//POST review
router.post("/",isLoggedIn, validateReview ,wrapAsyc(reviewcontroller.createreviews));

//delete review
router.delete("/:reviewId",isreviewAuthor, wrapAsyc(reviewcontroller.deleteReview));

module.exports = router;
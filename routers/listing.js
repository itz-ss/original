const express = require("express");
const router = express.Router();
const wrapAsyc = require("../util/wrapAsyc.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingcontroller = require("../controllers/listing.js");
const multer  = require('multer')
const {storage} =  require("../cloudconfig.js");
const upload = multer({storage})

router
.route("/")
.get( wrapAsyc(listingcontroller.index))
.post(isLoggedIn, upload.single(`listing[image]`), wrapAsyc(listingcontroller.createListing));


 //new route
 router.get("/new", isLoggedIn, listingcontroller.renderNewForm);
 
router
.route("/:id")
.get( wrapAsyc(listingcontroller.showListings))
.put(isLoggedIn,isOwner, upload.single(`listing[image]`), validateListing, wrapAsyc(listingcontroller.updateListing))
.delete(isLoggedIn, isOwner, wrapAsyc(listingcontroller.deleteListing));
 
 //edit route
 router.get("/:id/edit",isLoggedIn,isOwner, wrapAsyc(listingcontroller.editListing ));
 

module.exports = router;


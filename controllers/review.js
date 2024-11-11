const Review = require("../models/review.js");
const listing = require("../models/listing.js");

module.exports.createreviews = async(req,res) =>{
    let Listing = await listing.findById(req.params.id);
    let  newreview = new Review(req.body.review);
    newreview.author = req.user._id
    Listing.reviews.push(newreview);

    await newreview.save();
    await Listing.save();

    // console.log(Listing);
    let {id} = req.params;
    req.flash("success", "new review created");
    res.redirect(`/Listings/${id}`);
//    res.redirect(`/listing/${listings.id}`);
};

module.exports.deleteReview = async(req,res)=>{
    let {id, reviewId} = req.params;
    await listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
     req.flash("success", "review deleted");
     res.redirect(`/Listings/${id}`);
};
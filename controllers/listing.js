const listing = require("../models/listing.js");

module.exports.index =async (req,res) =>{
    const allListing = await listing.find({});
     res.render("./listings/index.ejs", { allListing });
};

module.exports.renderNewForm =(req,res) =>{
    console.log(req.user);
     res.render("./listings/new.ejs");
};

 module.exports.showListings = async (req,res) =>{
    let {id} = req.params;
    const listings = await listing.findById(id).populate({path: "reviews", populate:{path: "author"},}).populate("owner");
    if(!listings){
       req.flash("error", "requested listing does not exist");
      return res.redirect("/listings");
    }
       console.log(listings);
       res.render("./listings/show.ejs", {listings});
};

module.exports.createListing = async (req,res,next)=>{
     let url = req.file.path;
     let filename = req.file.filename;
   //   console.log(url , "..", filename);
    const newListing = new listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url, filename};
    await newListing.save();
    req.flash("success", "new listing created");
    res.redirect("./listings");
};

module.exports.editListing = async (req, res)=>{
        let {id} = req.params;
        let listings = await listing.findById(id);
        if(!listings){
           req.flash("error", "requested listing does not exist");
           return res.redirect("./listings");
        }
           let originalImageUrl = listings.image.url;
           originalImageUrl = originalImageUrl.replace("/upload","/upload/w_250");

           res.render("./listings/edit.ejs", {listings, originalImageUrl});
};

module.exports.updateListing = async(req,res) =>{
        let {id} = req.params;
        let Listing = await listing.findByIdAndUpdate(id, {...req.body.listing});
         if(typeof req.file !== "undefined"){
            let url = req.file.path;
        let filename = req.file.filename;
        Listing.image = {url, filename};    
        await Listing.save();   
         };
     

        req.flash("success", "listing updated");
        res.redirect(`/listings/${id}`);
        
};

module.exports.deleteListing = async (req,res) =>{
    let {id} = req.params;
   let deletelist = await  listing.findByIdAndDelete(id);
    console.log(deletelist);
    req.flash("success", "listing deleted");
    res.redirect("/listings");
};
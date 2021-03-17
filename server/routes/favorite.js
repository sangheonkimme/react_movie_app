const express = require('express');
const router = express.Router();
const { Favorite } = require("../models/Favorite");


router.post("/favoriteNumber", (req, res) => {
    
    // req : movieID, userFrom
    // Favorite DB에 movieID 에 해당하는 갯수 찾아서 리턴 

    Favorite.find({ "movieId" : req.body.movieId })
        .exec((err, favorite) => {
            if(err) return res.status(400).send(err)
            return res.status(200).json({ success: true, favoriteNumber: favorite.length })
        })

})


module.exports = router;

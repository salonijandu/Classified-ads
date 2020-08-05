var express = require('express');
var router = express.Router();

var Ad = require("../models/Advertisement")

router.get("/", async (req, res) => {
    const _ad = await Ad.find({})
    if (!_ad) res.render("error", {
      message: "No Advertisements",
    });
    res.render('index', {
      ads: _ad
    });
  })


module.exports = router;

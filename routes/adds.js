var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Advertisement = require('../models/Advertisement');
var login = require('./login');

router.get("/add", (req, res) => {
  res.render("ads/add")
})


router.post("/add", login, async (req, res) => {
  const { Title, Description, Price } = req.body;

  const add = new Advertisement({ Title, Description, Price });
  try {
    await add.save();
    res.redirect("/");
  } catch (err) {
    res.render("error", {
      message: "Error while adding",
    });
  }
});


router.get("/view/:id", async (req, res) => {
  const add = await Advertisement.findById(req.params.id);

    if (!add) {
      res.render("error", {
        message: "Error advertisement is removed"
      })
    }
    res.render("ads/view", {
      ad: add
    })
  
})

router.get("/edit/:id", login, async (req, res) => {
  const add = await Advertisement.findById(req.params.id);

  try {
    if (!add) {
      res.render("error", {
        message: "Error advertisement is removed"
      })
    }
    res.render("ads/edit", {
      ad: add
    })
  } catch (err) {
    res.render("error", {
      message: "Error editing advertisement"
    })
  }
})

router.get("/delete/:id", login, async (req, res) => {
  try {
    const add = await Advertisement.findByIdAndDelete(req.params.id)
    if (!add) res.render("error", {
      message: "Error advertisement is already removed",
    });
    res.redirect("/");
  } catch (err) {
    res.render("error", {
      message: "Error Removing advertisement",
    });
  }
})

router.post('/update/:id', login, async (req, res) => {
  try {
    const add = await Advertisement.findByIdAndUpdate(req.params.id, req.body)
    await add.save()
    res.redirect("/");
  } catch (err) {
    res.render("error", {
      message: "Error...",
    });
  }
})

module.exports = router;
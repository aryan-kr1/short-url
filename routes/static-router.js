const express = require("express");
const router = express.Router();
const URL = require("../models/url");
const { restrictTo } = require("../middlewares/auth");


router.get('/admin/urls', restrictTo(['ADMIN']) , async (req, res) => {

    const allurls = await URL.find({});

    return res.render("home", {
        urls: allurls,
    });
});

router.get('/', restrictTo(['NORMAL' , 'ADMIN']) , async (req, res) => {

    const allurls = await URL.find({ createdBy: req.user._id });

    return res.render("home", {
        urls: allurls,
        id: req.query.id
    });
});

router.get('/signup', (req, res) => {
    if (req.user) return res.redirect('/');
    return res.render("signup");
});

router.get('/login', (req, res) => {
    if (req.user) return res.redirect('/');
    return res.render("login");
});


module.exports = router; 
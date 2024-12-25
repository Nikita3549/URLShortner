"use strict";
const express_1 = require("express");
const URLController_class_1 = require("../controllers/url/URLController.class");
const router = (0, express_1.Router)();
router
    .get('/shortenUrl/get/:fullUrl', (req, res, next) => {
    new URLController_class_1.URLController().getShortenURlByFull(req, res, next);
})
    .get('/shortenUrl/redirect/:shortenUrl', (req, res, next) => {
    new URLController_class_1.URLController().redirectToFullURLByShorten(req, res, next);
})
    .post('/shortenUrl/create', (req, res, next) => {
    new URLController_class_1.URLController().createAndSaveShortenURL(req, res, next);
});
module.exports = router;

const express = require("express");

const router = express.Router();
router.get("/getallmanager", (req, res, next) => {
    res.send("hi")
});

module.exports = router;
const express = require("express");
const router = express.Router();

router.route("/").get((req, res, next) => {
  return res.status(200).send("Get request working");
});

module.exports = router;

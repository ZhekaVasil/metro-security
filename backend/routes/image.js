const express = require("express");
const path = require('path');

const router = express.Router();
const IMAGES_PATH = path.normalize(__dirname + '/../../../images/');
// const IMAGES_PATH = path.normalize(__dirname + '/../../public/images/');

router.get("/:image", (req, res) => {
  try {
    const image = req.params.image;
    return res.sendFile(`${IMAGES_PATH}${image}`)
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;

const { addVideo, getAllVideos } = require("../controllers/video");
const { videoUpload } = require("../middlewares/videoUpload");

const router = require("express").Router();

router
  .post("/upload", videoUpload.single("video"), addVideo)
  .get("/videos", getAllVideos);
module.exports = router;

// const express = require("express");
// const router = express.Router();
// const videoController = require("../controllers/video"); // Correct the import path as necessary

// // Setup routes
// router.get("/", videoController.getAllVideos); // this matches /videos if app.use('/videos', videoRoutes) is used in app.js

// module.exports = router;

import YoutubeController from "../app/controller/youtube";

const express = require("express");
const router = express.Router();

router.get(
  "/data",
  YoutubeController.getYoutubeData
);


module.exports = router;

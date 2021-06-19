const express = require("express");
const path = require("path");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const cron = require('node-cron');
const shell = require('shelljs');
const apiRoutes = require("../routes");
import VideoScheduler from "../script/videoScheduler";
import QueueRunner from "../script/queue.js";
import Mongo from "../libs/mongo";
import { QueManager } from "../queue";


const app = express();
const worker = new QueManager(false);

// worker reciever
QueueRunner();

(async function() {
  try {
      const connection = await Mongo.getConnection();
  } catch (err) {
      console.log(err);
  }
})();

// data collector scheduler every 10 seconds

cron.schedule('*/10 * * * * *', () => {
    VideoScheduler(worker);
});

app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({
    extended: true,
    limit: "50mb",
  })
);
app.use(cookieParser());
app.use(cors());

app.use(express.static(path.join(__dirname, "../public")));

app.use("/api", apiRoutes);


app.get("/", (req, res) => {
    res.send({ title: 'Welcome to fampay' }); 
});

app.get("/fampay", (req, res) => {
    res.send({ title: 'Fampay home page' });
});


module.exports = app;

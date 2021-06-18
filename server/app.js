const express = require("express");
const path = require("path");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const cron = require('node-cron');
const shell = require('shelljs');
const apiRoutes = require("../routes");
//import VideoScheduler from "../script/videoScheduler";
import Mongo from "../libs/mongo";
import { QueManager } from "../queue";


const app = express();
const worker = new QueManager(true);

(async function() {
  try {
      const connection = await Mongo.getConnection();
  } catch (err) {
      console.log(err);
  }
})();

// data collector scheduler every one minute

cron.schedule('*/10 * * * * *', () => {
    console.log('running a task every 10 sec');
    //VideoScheduler(worker);
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

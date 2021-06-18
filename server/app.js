const express = require("express");
const path = require("path");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const schedule = require("node-schedule");
const apiRoutes = require("../routes");
import VideoScheduler from "../script/videoScheduler";
import Database from "../libs/mysql";

Database.init();

const app = express();


// data collector scheduler every one minute

schedule.scheduleJob("*/1 * * * *", () => {
    console.log("every one min");
    //VideoScheduler();
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

const express = require("express");
const path = require("path");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

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


app.get("/", (req, res) => {
    res.send({ title: 'Welcome to fampay' }); 
});

app.get("/fampay", (req, res) => {
    res.send({ title: 'Fampay home page' });
});


module.exports = app;

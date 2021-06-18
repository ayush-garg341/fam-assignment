const mongoose = require("mongoose");
const dotEnv = require("dotenv");
dotEnv.config();

class Mongo {
  constructor(configUrl) {
    if (!configUrl) {
      this.configUrl = `${process.env.DB_CONNECTION}://${
        process.env.DB_USER
      }:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${
        process.env.DB_PORT
      }/${process.env.DB_DATABASE}`;
    } else {
      this.configUrl = configUrl;
    }
    console.log("this.configUrl", this.configUrl);

    this.db = mongoose.connect(this.configUrl, { useNewUrlParser: true });
    mongoose.connection
      .on("error", err => {
        console.log(`Couldn't connect MongoDb`);
        console.log(1000, "Mongo Constructor", err);
      })
      .on("open", () => {
        console.log("Connection Established!!");
      });
  }

  getConnection() {
    return this.db;
  }

  disconnectConnection() {
    mongoose.connection.close();
  }
}

module.exports = Mongo;

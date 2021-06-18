import { Sequelize } from "sequelize";
import * as YoutubeVideoData from "../models/youtubevideodata";
const dotenv = require("dotenv");

dotenv.config();

const models = [
    YoutubeVideoData
];

class Database {
  static connection = null;

  static getDatabase = async () => {
    if (Database.connection === null) {
      Database.connection = await new Sequelize(
        process.env.MYSQL_DATABASE,
        process.env.MYSQL_USER,
        process.env.MYSQL_PASSWORD,
        {
          host: process.env.DB_HOST,
            port: process.env.DB_PORT,
          dialect: process.env.DB_DIALECT,
          pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000
          },
          logging: function(str) {
            console.log("query", str);
          }
        }
      );
    }

    return Database.connection;
  };

  static getModel = dbName => Database.connection.models[dbName];

  static initTransaction = () => Database.connection.transaction();


    static performRawQuery = async(query, options = {}) => {
	const {type = ""} = options;
	const database = await Database.getDatabase();
	if(type==="select"){
	    return await database.queryInterface.sequelize.query(query, {type: database.queryInterface.sequelize.QueryTypes.SELECT});
	}
	return await database.queryInterface.sequelize.query(query, options);
  };

  static init = async () => {
    try {
      const database = await Database.getDatabase();
      await database.authenticate();

      for (const model of models) {
        model.db(database);
      }

      for (const model of models) {
        model.associate(database);
      }
	console.log("Db and tables have been created...");
    } catch (err) {
      console.log(1000, "Db connect error is: ", err);
    }
  };
}

export default Database;

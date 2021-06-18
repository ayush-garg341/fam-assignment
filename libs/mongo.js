const mongoose = require("mongoose");
const dotEnv = require("dotenv");
dotEnv.config();

class Mongo {

    static connection = null;
    static configUrl = null;
    static db = null;
    
    static getDatabase = async () => {
	if(Mongo.db === null){
	    Mongo.configUrl = `${process.env.DB_CONNECTION}://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;
	console.log("this.configUrl", Mongo.configUrl);
	
	Mongo.db = mongoose.connect(Mongo.configUrl, { useNewUrlParser: true });
	mongoose.connection
	    .on("error", err => {
		console.log(`Couldn't connect MongoDb`);
		console.log(1000, "Mongo Constructor", err);
	    })
	    .on("open", () => {
		console.log("Connection Established!!");
	    });
	}

	return Mongo.db;
	
    }

    static getConnection = async() => {
	const db = await Mongo.getDatabase();
	return db;
    }

    static disconnectConnection() {
	mongoose.connection.close();
	Mongo.db = null;
    }
}

//module.exports = Mongo;

export default Mongo;

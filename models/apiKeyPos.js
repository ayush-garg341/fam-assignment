const mongoose = require("mongoose");
const collectionName = "ApiKeyPos";

const ApiKeySchema = new mongoose.Schema(
    {
	position: {type: Number}
    },
    {
	collection: collectionName,
	timestamps: true
    }
);



module.exports = mongoose.model("ApiKeyPos", ApiKeySchema);

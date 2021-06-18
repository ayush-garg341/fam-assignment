const mongoose = require("mongoose");
const collectionName = "YoutubeVideoData";

const YoutubeVideoDataSchema = new mongoose.Schema(
    {
	thumbnails: {
	    type: Object
	},
	title: { type: String },
	description: { type: String },
	channelTitle: {type: String},
	publishTime: {type: Date},
	publishedAt: {type: Date}
	
    },
    {
	collection: collectionName,
	timestamps: true
    }
);


YoutubeVideoDataSchema.index({
    title: "text",
    description: "text"
});

YoutubeVideoDataSchema.index({
    publishTime: 1
});

module.exports = mongoose.model("YoutubeVideoData", YoutubeVideoDataSchema);

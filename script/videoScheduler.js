const axios = require("axios");
const dotenv = require("dotenv");
const moment = require("moment");
const youtubeVideoModel = require("../models/youtubeVideoData");
const Mongo = require("../libs/mongo");
const mongo = new Mongo();

dotenv.config();

const fetchVideos = async() => {

    try{
	
	const connection = await mongo.getConnection();
	
	const type="video";
	const maxResult = 2;
	const query = "football";
	const key = process.env.YOUTUBE_API_KEY;
	const baseURL = process.env.YOUTUBE_VIDEO_BASE_URL;
	const URL = `${baseURL}?key=${key}&type=${type}&part=snippet&maxResults=${maxResult}&q=${query}`;
	
	const response = await axios({
	    url: URL,
	    method: 'get',
	});

	for(const result of response.data.items){
	    
	    const {snippet:{publishedAt, title, description, channelTitle, publishTime, thumbnails={}}={}} = result || {};

	    const response = await youtubeVideoModel.create({
		publishedAt,
		title,
		description,
		channelTitle,
		publishTime,
		thumbnails
	    });
	}

	
	
    }
    catch(err){
	console.log(err);
    }
};

fetchVideos();

// export default fetchVideos;

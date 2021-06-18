// import YoutubeService from "../app/services/youtube";
// import Mongo from "../libs/mongo";
const axios = require("axios");
const dotenv = require("dotenv");
const moment = require("moment");

dotenv.config();

const fetchVideos = async(worker) => {

    try{
	
	const type="video";
	const maxResult = 2;
	const query = "football";
	const key = process.env.YOUTUBE_API_KEY;
	const baseURL = process.env.YOUTUBE_VIDEO_BASE_URL;
	const URL = `${baseURL}?key=${key}&type=${type}&part=snippet&maxResults=${maxResult}&q=${query}`;
	
	const response = await axios({
	    url: URL,
	    method: 'get'
	});

	if(response.data.items){   
	    let items = [];
	    for(const result of response.data.items){
	    const {snippet:{publishedAt, title, description, channelTitle, publishTime, thumbnails={}}={}} = result || {};
		items.push({
		    publishedAt,
		    title,
		    description,
		    channelTitle,
		    publishTime,
		    thumbnails
		});
	    }
	    worker.push({message:items});
	}
	else{
	    console.log(response.data.error);
	}
	
    }
    catch(err){
	console.log(err);
    }
};

//fetchVideos();

export default fetchVideos;

import YoutubeService from "../app/services/youtube";
// import Mongo from "../libs/mongo";
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const fetchVideos = async(worker) => {

    try{

	let publishedAfter;
	const latestRecord = await YoutubeService.getLatestRecord();
	if(latestRecord[0]){
	    publishedAfter = latestRecord[0].publishTime;
	}
	else{
	    const date = new Date();
	    publishedAfter = date.toISOString();
	}
	
	const type="video";
	const maxResult = 2;
	const query = "cricket";
	const key = process.env.YOUTUBE_API_KEY;
	const baseURL = process.env.YOUTUBE_VIDEO_BASE_URL;
	const URL = `${baseURL}?key=${key}&type=${type}&order=date&part=snippet&maxResults=${maxResult}&q=${query}&publishedAfter=${publishedAfter}`;
	
	const response = await axios({
	    url: URL,
	    method: 'get'
	});

	if(response.data.items.length > 0){   
	    let items = [];
	    const arr = response.data.items;
	    for (var i = arr.length - 1; i >= 0; i--){
		const {snippet:{publishedAt, title, description, channelTitle, publishTime, thumbnails={}}={}} = arr[i] || {};
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

	
    }
    catch(err){
	console.log(err);
	const {response:{data:{errors={}}={}}={}} = err;
	console.log(err.response);
	const {error:{errors:nestedErrors=[]}={}}  = errors;
	if(nestedErrors.length>0){
	    const {reason=""} = nestedErrors[0];
	    console.log("reason == > >", reason);
	}
	
    }
};

//fetchVideos();

export default fetchVideos;

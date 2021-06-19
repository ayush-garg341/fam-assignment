import YoutubeService from "../app/services/youtube";
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();


const fetchVideos = async(worker) => {

    try{

	let publishedAfter;
	const latestRecord = await YoutubeService.getLatestRecord();
	if(latestRecord[0]){
	    publishedAfter = latestRecord[0].publishTime.toISOString();
	}
	else{
	    const date = new Date("Jun 15 2021");
	    publishedAfter = date.toISOString();
	}

	let apiKeyPos;
	const pos = await YoutubeService.getApiKeyPos();
	if(pos[0]){
	    apiKeyPos = pos[0].position;
	}
	else{
	    apiKeyPos = 0;
	    await YoutubeService.insertApiKeyPos(apiKeyPos);
	}

	const key =  process.env.YOUTUBE_API_KEY.split(",")[apiKeyPos];
	
	const type="video";
	const maxResult = 2;
	const query = "cricket";
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
	const {response:{data:{errors={}}={}}={}} = err;
	console.log(err.response);
	const {error:{errors:nestedErrors=[]}={}}  = errors;
	if(nestedErrors.length>0){
	    const {reason=""} = nestedErrors[0];
	    console.log("reason == > >", reason);
	    if(reason==="quotaExceeded"){
		const pos = await YoutubeService.getApiKeyPos();
		const prevPos = pos[0].position;
		const nextPos = prevPos + 1;
		if(nextPos < process.env.YOUTUBE_API_KEY.split(",").length){
		    const res = await YoutubeService.updateApiKeyPos(prevPos, nextPos);
		}
		else{
		    // send mail to the devs about quota exhausted
		}
	    }
	}
	
    }
};


export default fetchVideos;

const axios = require("axios");
const dotenv = require("dotenv");
const moment = require("moment");
import Database from "../libs/mysql";

dotenv.config();

const fetchVideos = async() => {

    try{
	const type="video";
	const maxResult = 50;
	const query = "football";
	const key = process.env.YOUTUBE_API_KEY;
	const baseURL = process.env.YOUTUBE_VIDEO_BASE_URL;
	const URL = `${baseURL}?key=${key}&type=${type}&part=snippet&maxResults=${maxResult}&q=${query}`;
	
	const response = await axios({
	    url: URL,
	    method: 'get',
	});

	for(const result of response.data.items){

	    const {snippet:{publishedAt, title, description, channelTitle, publishTime, thumbnails:{medium:{url=""}}={}}={}} = result || {};

	    const newPublishedDate = moment(publishedAt, "YYYY-MM-DD HH:mm Z").format("DD-MMMM-YYYY HH:mm:ss");
	    const newPublishedTime = moment(publishTime, "YYYY-MM-DD HH:mm Z").format("DD-MMMM-YYYY HH:mm:ss");

	    const sanitizedTitle = title.replace(/"/g, "'");
	    const sanitizedDesc = description.replace(/"/g, "'");
	    const sanitizedChannelTitle = channelTitle.replace(/"/g, "'");
	    

	    const sql = `INSERT INTO YoutubeVideoData (title, description, publishedAt, publishedTime, channelTitle,  thunbnailUrl, createdAt, updatedAt) VALUES ("${sanitizedTitle}", "${sanitizedDesc}", STR_TO_DATE("${newPublishedDate}", "%d-%M-%Y %H:%i:%s"), STR_TO_DATE("${newPublishedTime}", "%d-%M-%Y %H:%i:%s"), "${sanitizedChannelTitle}", "${url}", now(), now())`;
	    
	    await Database.performRawQuery(
		sql
	    );
	}
	
    }
    catch(err){
	console.log(err);
    }
};

// fetchVideos();

export default fetchVideos;

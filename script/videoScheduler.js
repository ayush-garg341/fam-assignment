const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const fetchVideos = async() => {

    try{
	const type="video";
	const maxResult = 10;
	const query = "football";
	const key = process.env.YOUTUBE_API_KEY;
	const baseURL = process.env.YOUTUBE_VIDEO_BASE_URL;
	const URL = `${baseURL}?key=${key}&type=${type}&part=snippet&maxResults=${maxResult}&q=${query}`;
	
	// const response = await axios({
	//     url: URL,
	//     method: 'get',
	// });

	// console.log("response => ", response.data.items.length);

	// for(const result of response.data.items){
	//     console.log("result => ", result);
	// }
	
    }
    catch(err){
	console.log(err);
    }
};

// fetchVideos();

export default fetchVideos;

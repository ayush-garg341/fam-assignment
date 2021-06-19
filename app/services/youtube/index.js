const youtubeVideoModel = require("../../../models/youtubeVideoData");
const apiKeyModel = require("../../../models/apiKeyPos");

class YoutubeService{

    createVidoeData = async(data) => {
	try{

	    const response = await youtubeVideoModel.create({...data});
	    return response;
	}
	catch(err){
	    console.log("err => ", err);
	    return 0;
	}
    };


    createBulkVidoeData = async(data) => {
	try{
	    const response = await youtubeVideoModel.insertMany(data.message);
	    return response;
	}
	catch(err){
	    console.log("err => ", err);
	    return 0;
	}
    };
    
    getVideoData = async(params) => {
	const {search, intCountPerPage, intPageNo} = params;
	try{
	    
	    const offset = intCountPerPage * (intPageNo-1);
	    const limit = intCountPerPage;

	    let query;
	    
	    if(search){
		const searches = search.split(" ");
		let searchQ = "";
		for(const search of searches){
		    searchQ += ` \"${search}\" `;
		}
		query = { $text: { $search: searchQ }};
	    }

	    else{
		query = {};
	    }

	    const data = youtubeVideoModel.find(query).sort({publishTime: -1}).skip(offset).limit(limit);
	    
	    return data;
	}
	catch(err){
	    console.log("err ----- >>> ", err);
	    return {};
	}
    };


    getLatestRecord = async() => {
	try{
	    const data = youtubeVideoModel.find({}).limit(1).sort({$natural:-1});
	    return data;
	}
	catch(err){
	    console.log("err ----- >>>>> ", err);
	    return 0;
	}
    };


    getApiKeyPos = async() => {
	try{
	    const data = apiKeyModel.find({});
	    return data;
	}
	catch(err){
	    console.log("err ----- >>>>> ", err);
	    return 0;
	}
    }


    insertApiKeyPos = async(apiKeyPos) => {
	try{
	    const data = apiKeyModel.create({position:apiKeyPos});
	    return data;
	}
	catch(err){
	    console.log("err ----- >>>>> ", err);
	    return 0;
	}
    }


    updateApiKeyPos = async(prevPos, nextPos) => {
	try{
	    const data = apiKeyModel.findOneAndUpdate({position: prevPos}, {position:nextPos});
	    return 1;
	}
	catch(err){
	    console.log("err ----- >>>>> ", err);
	    return 0;
	}
     }
    
    
}


export default new YoutubeService();

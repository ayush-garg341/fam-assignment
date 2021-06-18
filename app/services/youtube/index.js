const youtubeVideoModel = require("../../../models/youtubeVideoData");

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
    
}


export default new YoutubeService();

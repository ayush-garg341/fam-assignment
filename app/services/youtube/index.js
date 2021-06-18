
class YoutubeService{

    getVideoData = async(params) => {
	const {search, intCountPerPage, intPageNo} = params;
	try{
	    
	    const offset = intCountPerPage * (intPageNo-1);
	    const limit = intCountPerPage;

	    let sql;
	    
	    if(search){
		const searches = search.split(" ");
		let searchQuery = "";
	    }

	    else{
		
	    }


	    const data = {};
	    
	    return data;
	}
	catch(err){
	    console.log("err ----- >>> ", err);
	    return {};
	}
    };
    
}


export default new YoutubeService();

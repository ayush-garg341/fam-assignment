import * as YoutubeVideoData from "../../../models/youtubevideodata";
import Database from "../../../libs/mysql";

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
		for(const search of searches){
		    if(searchQuery===""){
			searchQuery += `+${search}`;
		    }
		    else{
			searchQuery += ` +${search}`;
		    }
		}
		
		// if title and description both contains search keyword
		sql = `SELECT id, title, description, thunbnailUrl, publishedTime FROM YoutubeVideoData WHERE  ( MATCH(title) AGAINST('${searchQuery}' in BOOLEAN MODE) AND MATCH(description) AGAINST('${searchQuery}' in BOOLEAN MODE) ) ORDER BY publishedTime DESC  LIMIT ${offset},${limit} `;
		
	    }

	    else{
		sql = `SELECT id, title, description, thunbnailUrl, publishedTime FROM YoutubeVideoData ORDER BY publishedTime DESC  LIMIT ${offset},${limit}`;
	    }


	    const data = await Database.performRawQuery(sql, {type:"select"});
	    
	    return data;
	}
	catch(err){
	    console.log("err ----- >>> ", err);
	    return {};
	}
    };
    
}


export default new YoutubeService();

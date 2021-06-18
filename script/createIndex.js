import Database from "../libs/mysql";

const createIndex = async() => {
    try{
	const res = await Database.performRawQuery(
	    "ALTER TABLE `YoutubeVideoData` ADD FULLTEXT(title, description)"
	);
	
	console.log("res === >> ", res);
    }
    catch(err){
	console.log("err");
    }
};


createIndex();

import Database from "../libs/mysql";

const createIndex = async() => {
    try{
	await Database.performRawQuery(
	    `CREATE FULLTEXT INDEX title_idx ON YoutubeVideoData(title)`
	);

	await Database.performRawQuery(
	    `CREATE FULLTEXT INDEX description_idx ON YoutubeVideoData(description)`
	);

	// await Database.performRawQuery(
	//     `CREATE  INDEX publish_time_idx ON YoutubeVideoData(publishedTime)`
	// );

	await Database.performRawQuery(
	    `CREATE FULLTEXT INDEX title_desc_idx ON YoutubeVideoData(title, description)`
	);
	
    }
    catch(err){
	console.log("err");
    }
};


createIndex();

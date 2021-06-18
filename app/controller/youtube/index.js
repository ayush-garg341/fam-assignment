import YoutubeService from "../../services/youtube";

class YoutubeController {
    
    getYoutubeData = async(req, res) => {
	const { query } = req;
	try{
	    const {search="", countPerPage="", pageNo=""} = query;

	    let intCountPerPage = 10;
	    let intPageNo = 1;

	    if(countPerPage){
		intCountPerPage=parseInt(countPerPage);
	    }
	    if(pageNo){
		intPageNo=parseInt(pageNo);
	    }

	    const data = await YoutubeService.getVideoData({search, intCountPerPage , intPageNo});
	    
	    
	    const response =  {
		status: true,
		payload:{data: data},
		statusCode: 200
	    };
	    return res.status(200).json(response);
	}
	catch(err){
	    console.log(err);
	    return res.status(500).json({});
	}
    }

}

export default new YoutubeController();

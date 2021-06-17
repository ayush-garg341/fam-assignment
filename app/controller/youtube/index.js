class YoutubeController {
    
    getYoutubeData = async(req, res) => {
	const { query } = req;
	try{
	    console.log(query);
	    const response =  {
		status: true,
		payload:{},
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

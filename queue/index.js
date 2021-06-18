import YoutubeService from "../app/services/youtube";
const Queue = require("bee-queue");
const dotenv = require("dotenv");
import Mongo from "../libs/mongo";
dotenv.config();

export class QueManager {
  constructor(isWorker = false) {
    this.videoDataQueue = new Queue(`${process.env.QUEUE_VIDEO}`, {
      redis: {
        host: `${process.env.QUEUE_HOST}`,
        port: `${process.env.QUEUE_PORT}`,
        db: 0,
        options: {},
      },
      isWorker,
    });
    this.videoDataQueue.on("ready", function() {
      console.log("queue now ready to start doing things");
    });
  }

  push = (message) => {
    console.log("message for pushing ", message);
    this.videoDataQueue.createJob({ message }).save();
  };

    recieve = async () => {
	const connection = await Mongo.getConnection();
    this.videoDataQueue.process(async (job) => {
	console.log("Processing job " + job.data.message, job.data.message[0]);
	const res = await YoutubeService.createBulkVidoeData(job.data.message);
      console.log("res from dispensation handler", res);
      if (res) {
        await this.videoDataQueue.removeJob(job.id, function(err) {
          console.log("job for removal", job.id);
          if (err) {
            console.log("error in removing job");
          }
          console.log(`${job.id} was removed`);
        });
      }
    });
  };
}

export default new QueManager();

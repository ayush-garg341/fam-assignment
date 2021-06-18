import { QueManager } from "../queue";

const queueRunner = () => {
  const worker = new QueManager(true);
  worker.recieve();

};
queueRunner();

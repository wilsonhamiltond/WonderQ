import express, { Express } from 'express';
import QueueService from '../services/queue.service';

class Server {
  private app: Express;
  private port: number;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.port = 3000;
    this.routers();
  }
  private routers() {
    const queueService = new QueueService();
    this.app.post('/api/v1/queue/send', (req, res)=> queueService.send(req, res) );
    this.app.get('/api/v1/queue/receive', (req, res) => queueService.receive(req, res));
  }

  public init() {
    this.app.listen(this.port, () => {
      return console.log(`Express is listening at http://localhost:${this.port}`);
    });
  }
}

export default Server;
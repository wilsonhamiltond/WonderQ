import QueueBadReqeustError from "../errors/queue.bad.reqeust.error";
import QueueNotFoundError from "../errors/queue.not.found.error";
import IItem from "../interfaces/item.interface";
import Queue from "../models/queue.model";

class QueueService {
    private queue: Queue;
    constructor(){
        this.queue = new Queue();
    }

    public async send(req, res) {
        try {
            const data: any = req.body.data;
            const response: IItem = this.queue.send(data);
            res.send(response);
        } catch (error) {
            if (error instanceof QueueBadReqeustError) {
                res.status(400).send(error.message);
            } else {
                res.status(500).send(error.message);
            }
        }
    }
    public async receive(req, res) {
        try {
            console.debug(req.params);
            const response: IItem = this.queue.receive();
            res.send(response);
        } catch (error) {
            if (error instanceof QueueNotFoundError) {
                res.status(400).send(error.message);
            } else {
                res.status(500).send(error.message);
            }
        }
    }
}

export default QueueService;
import IItem from '../interfaces/item.interface';
import QueueBadReqeustError from '../errors/queue.bad.reqeust.error';
import QueueNotFoundError from '../errors/queue.not.found.error';

class Queue {
    private queueStore: IItem[];
    constructor() {
        this.queueStore = [];
    }

    public send(data:any) {
        if(!data){
            throw new QueueBadReqeustError('WonderQError: param data is required.');
        }
        const name = String.fromCharCode(65 + Math.random() * 26).repeat(1 + Math.random() * 10);
        const item = <IItem>{
            name: name,
            date: new Date(),
            data: data
        };
        this.queueStore.push(item);
        return item;
    }

    public receive() {
        if(this.queueStore.length <= 0){
            throw new QueueNotFoundError('WonderQError: not item in queue.');
        }
        return this.queueStore.shift();
    }
    public count(){
        return this.queueStore.length;
    }
}

export default Queue;
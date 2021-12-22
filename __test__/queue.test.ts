import QueueBadReqeustError from '../src/errors/queue.bad.reqeust.error';
import Queue from '../src/models/queue.model';

const SIMPLE_MESSAGE = 'Save in queue';
const SIMPLE_MESSAGE2 = 'Save in queue #2';

describe('Queue send', () =>{
    test('Send empty messenge', () => {
        try{
            const queue = new Queue();
            queue.send('');
            fail('Queue not support send without message');
        }catch(error){
            expect(error.name).toBe('QueueBadReqeustError');
        }
    });
    test('Sending simple message', () => {
        const queue = new Queue();
        const response = queue.send(SIMPLE_MESSAGE);
        expect(response.data).toBe(SIMPLE_MESSAGE);
    });
    test('Sending multiple message', () => {
        const queue = new Queue();
        queue.send(SIMPLE_MESSAGE);
        queue.send(SIMPLE_MESSAGE2);
        expect(queue.count()).toBeGreaterThan(1);
    });
})

describe('Queue receive', () =>{
    test('Not item in queue', () => {
        try{
            const queue = new Queue();
            queue.receive();
            fail('Queue has item without saved.');
        }catch(error){
            expect(error.name).toBe('QueueNotFoundError');
        }
    });
    test('Receive simple message', () => {
        const queue = new Queue();
        queue.send(SIMPLE_MESSAGE);
        const response = queue.receive();
        expect(response.data).toBe(SIMPLE_MESSAGE);
        expect(queue.count()).toBe(0);
    });
    test('Receive multiple message', () => {
        const queue = new Queue();
        queue.send(SIMPLE_MESSAGE);
        expect(queue.count()).toBe(1);
        queue.send(SIMPLE_MESSAGE2);
        expect(queue.count()).toBe(2);
        queue.receive();
        expect(queue.count()).toBe(1);
        queue.receive();
        expect(queue.count()).toBe(0);
    });
})
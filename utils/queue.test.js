const Queue = require('queue-fifo');
const q = new Queue();

describe('queue', () => {

    beforeEach(() => {
        q.clear();
    });
    it('should add items', () => {
        q.enqueue('data item 1');
        q.enqueue('data item 2');
        q.enqueue('data item 3');
        q.enqueue('data item 4');
        expect(q.size()).toEqual(4);
    });
    it('should get items', ()=> {
        expect(q.size()).toEqual(0);
        q.enqueue('foo');
        expect(q.size()).toEqual(1);
        var item = q.dequeue();
        expect(q.size()).toEqual(0);
        expect(item).toEqual('foo');
      });
});
class _Node {
    constructor(value) {
      this.value = value;
      this.next = null;
    }
  }
  
  class Queue {
    constructor() {
      this.first = null;
      this.last = null;
    }
  
    enqueue(data) {
      const newNode = new _Node(data);
      if (this.first === null) this.first = newNode;
      if (this.last) this.last.next = newNode;
      this.last = newNode;
    }
  
    dequeue() {
      if (!this.first) return null;
      const node = this.first.value;
      if (this.first.next === null) this.last = null;
      this.first = this.first.next;
      return node;
    }
  }
  
  module.exports = Queue;
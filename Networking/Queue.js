class Queue {
    QUEUE_FREE = 0
    QUEUE_BUSY = 1
    QUEUE_OVERFILLED = 2
    QUEUE_PUSHED_MORE_THAN_EXPECTED = 3

    constructor (maxQueueSize) {
        this.data = Buffer.alloc(0)
        this.maxQueueSize = maxQueueSize
        this.state = this.QUEUE_FREE
    }

    push (bytes) {
        this.data = Buffer.concat([this.data, bytes])

        this.state = this.QUEUE_BUSY

        if (this.size() > this.maxQueueSize && this.maxQueueSize > 0) {
            this.state = this.QUEUE_OVERFILLED
        }

        if (this.size() - 7 > this.getQueueExpectedSize()) {
            this.state = this.QUEUE_PUSHED_MORE_THAN_EXPECTED
        }
    }

    release () {
        const returnableData = this.data 

        this.data = Buffer.alloc(0)
        this.state = this.QUEUE_FREE

        return returnableData
    }

    isBusy () {
        if (this.size() === 0) return false;
        return this.getQueueExpectedSize() > this.size() - 7
    }

    getQueueExpectedSize () {
        return this.data.readUIntBE(2, 3)
    }

    size () {
        return this.data.length
    }
}

module.exports = Queue
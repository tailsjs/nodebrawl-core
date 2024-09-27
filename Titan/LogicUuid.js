class LogicUuid {
    low = 0
    high = 0

    constructor (high, low) {
        this.high = high
        this.low = low
    }

    copyFrom (high, low) {
        this.high = high
        this.low = low
    }

    decode (stream) {
        this.high = stream.readVInt()
        this.low = stream.readVInt()
    }

    encode (stream) {
        this.high = stream.readVInt()
        this.low = stream.readVInt()
    }
}

module.exports = LogicUuid
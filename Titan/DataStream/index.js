const ByteStream = require('./ByteStream')
const BitStream = require('./BitStream')
const ByteStreamHelper = require('./ByteStream/Helper')

class DataStream {
    static getByteStream (bytes) {
        return new ByteStream(bytes)
    }

    static getByteStreamHelper (bytestream) {
        return new ByteStreamHelper(bytestream)
    }

    static getBitStream (bytes) {
        return new BitStream(bytes)
    }
}

module.exports = DataStream
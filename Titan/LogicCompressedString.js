const zlib = require('node:zlib')

/**
 * LogicCompressedString
 * 
 * Class for working with CompressedString
 * 
 * @param { String } string Your string
 */
class LogicCompressedString {
    string = ""

    constructor (string) {
        this.string = string
    }

    /**
     * Compress and encode string to ByteStream
     * 
     * @param { ByteStream } stream ByteStream class instance. In case, if instance is invalid, throws error
     */
    encode (stream) {
        if (!(stream instanceof ByteStream)) {
            throw new Error("Stream must be instance of ByteStream!")
        }

        const compressedString = zlib.deflateSync(this.string);

        stream.writeInt(compressedString.length + 4)
        stream.writeIntLE(this.string.length)
        stream.writeBytesWithoutLength(compressedString)
    }

    /**
     * Decodes and decompress string from ByteStream
     * 
     * @param { ByteStream } stream ByteStream class instance. In case, if instance is invalid, throws error
     */
    decode (stream) {
        if (!(stream instanceof ByteStream)) {
            throw new Error("Stream must be instance of ByteStream!")
        }

        const length = stream.readInt()
        const stringLength = stream.readIntLE()
        const compressedString = stream.readBytes(length)
        this.string = zlib.inflateSync(compressedString).slice(0, stringLength)
    }
}

module.exports = LogicCompressedString
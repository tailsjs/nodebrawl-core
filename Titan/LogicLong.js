const ByteStream = require("./DataStream/ByteStream");

/**
 * LogicLong
 * 
 * Class for working with LogicLong.
 * 
 * @param { Number } high - High Int
 * @param { Number } low - Low Int
 * @example
 *   const logicLong = new LogicLong(1, 234567)
 */
class LogicLong {
    constructor (high = 0, low = 0) {
        this.high = high;
        this.low = low;
    }

    /**
     * Decoding LogicLong from ByteStream
     * @param { ByteStream } stream ByteStream class instance. In case, if instance is invalid, throws error
     */
    decode (stream) {
        if (!(stream instanceof ByteStream)) {
            throw new Error("Stream must be instance of ByteStream!")
        }

        this.high = stream.readInt();
        this.low = stream.readInt();
    }

    /**
     * Encoding LogicLong to ByteStream
     * @param { ByteStream } stream ByteStream class instance. In case, if instance is invalid, throws error
     */
    encode (stream) {
        if (!(stream instanceof ByteStream)) {
            throw new Error("Stream must be instance of ByteStream!")
        }

        stream.writeInt(this.high);
        stream.writeInt(this.low);
    }

    /**
     * Clones LogicLong class instance
     * 
     * @param { LogicLong } logicLong LogicLong class instance
     * @returns { LogicLong } Cloned LogicLong class instance
     * @static
     * @example
     *   const logicLong = new LogicLong(1, 234567)
     *   const clonedLogicLong = LogicLong.clone(logicLong)
     *   
     *   logicLong.equals(clonedLogicLong) // true
     */
    static clone (logicLong) {
        if (!(logicLong instanceof LogicLong)) {
            throw new Error("logicLong must be instance of LogicLong class!")
        }
        const clonedLogicLong = new LogicLong();
        clonedLogicLong.high = logicLong.high;
        clonedLogicLong.low = logicLong.low;
        return clonedLogicLong;
    }

    /**
     * Compares LogicLong with given LogicLong
     * @param { LogicLong } logicLong LogicLong class instance
     * @returns { Boolean } If LogicLong equals to given LogicLong
     * @example
     *   const logicLong = new LogicLong(1, 234567)
     *   const logicLongExample = new LogicLong(1, 234567)
     * 
     *   logicLong.equals(logicLongExample) // true
     */
    equals (logicLong) {
        if (logicLong instanceof LogicLong) {
            return logicLong.high === this.high && logicLong.low === this.low;
        }

        return false;
    }

    /**
     * Get Higher Int
     * @param { Number? } LongLong LongLong number (optional)
     * @returns { Number } Higher Int
     * @example
     *   const logicLong = new LogicLong(33, 234567)
     *   logicLong.getHigherInt() // 33
     * 
     *   const Long = LogicLong.toLong(33, 234567)
     *   logicLong.getHigherInt(Long) // 234599 (idk lul)
     */
    getHigherInt (LongLong) {
        return arguments.length != 0 ? LongLong >> 32 : this.high;
    }

    /**
     * Get Higher Int
     * @param { Number? } LongLong LongLong number (optional)
     * @returns { Number } Higher Int
     * @static
     * @example
     *   const logicLong = new LogicLong(33, 234567)
     *   logicLong.getHigherInt() // 33
     * 
     *   const Long = LogicLong.toLong(33, 234567)
     *   logicLong.getHigherInt(Long) // 234599 (idk lul)
     */
    static getHigherInt (LongLong) {
        return LongLong ? LongLong >> 32 : 0
    }

    /**
     * Get Lower Int
     * @param { Number? } LongLong LongLong number (optional)
     * @returns { Number } Lower Int
     * @example
     *   const logicLong = new LogicLong(33, 234567)
     *   logicLong.getLowerInt() // 33
     * 
     *   const Long = LogicLong.toLong(33, 234567)
     *   logicLong.getHigherInt(Long) // 234599 (idk lul)
     */
    getLowerInt (LongLong) {
        return arguments.length != 0 ? (LongLong < 0 ? LongLong | 0x80000000 : LongLong & 0x7FFFFFFF) : this.low;
    }

    /**
     * Get Lower Int
     * @param { Number? } LongLong LongLong number (optional)
     * @returns { Number } Lower Int
     * @example
     *   const logicLong = new LogicLong(33, 234567)
     *   logicLong.getLowerInt() // 234567
     * 
     *   const Long = LogicLong.toLong(33, 234567)
     *   logicLong.getLowerInt(Long) // 234599 (idk lul)
     */
    static getLowerInt (LongLong) {
        return LongLong ? (LongLong < 0 ? LongLong | 0x80000000 : LongLong & 0x7FFFFFFF) : 0
    }

    /**
     * Check if LogicLong is greater than given LogicLong
     * @param { LogicLong } logicLong 
     * @returns { Boolean } If LogicLong is greater than given LogicLong
     * @example
     *   const logicLong = new LogicLong(1, 234567)
     *   const lowerLogicLong = new LogicLong(1, 234566)
     * 
     *   logicLong.greaterThan(lowerLogicLong) // true
     */
    greaterThan (logicLong) {
        if (logicLong instanceof LogicLong) {
            return this.high > logicLong.high || (this.high === logicLong.high && this.low > logicLong.low);
        }

        return false;
    }

    /**
     * Check if LogicLong is zero
     * @returns { Boolean } If LogicLong is zero
     * @example
     *   const logicLong = new LogicLong(0, 0)
     *   logicLong.isZero() // true
     */
    isZero () {
        return this.high === 0 && this.low === 0;
    }

    /**
     * Hashes LogicLong (i guess?)
     * @returns { Number } Hash code
     * @example
     *   const logicLong = new LogicLong(1, 234567)
     *   logicLong.hashCode() // 234598
     */
    hashCode () {
        return 31 * this.high + this.low;
    }

    /**
     * Set LogicLong integers
     * @param { Number } high Higher Int
     * @param { Number } low Lower Int
     * @example
     *   const logicLong = new LogicLong(0, 0)
     *   logicLong.set(33, 234567)
     */
    set (high, low) {
        this.high = high >> 32;
        this.low = low < 0 ? low | 0x80000000 : low & 0x7FFFFFFF;
    }

    /**
     * Converts High/Low Integers to Long
     * @param { Number } high Higher Int
     * @param { Number } low Lower Int
     * @returns { Number } Long
     * @static
     * @example
     * LogicLong.toLong(33, 234567) // 234599
     */
    static toLong (high, low) {
        return (high << 32) | (low < 0 ? low | 0x80000000 : low & 0x7FFFFFFF)
    }

    toLong = LogicLong.toLong

    /**
     * Just returns "LogicLong(int, int)"
     * @param { LogicLong ? } logicLong LogicLong class instance (optional)
     * @returns { String }
     * @example
     *   const logicLong = new LogicLong(1, 234567)
     *   logicLong.toString() // LogicLong(1, 234567)
     */
    toString (logicLong) {
        if (!logicLong) {
            logicLong = this
        }

        return `LogicLong(${this.high}, ${this.low})`
    }
}

module.exports = LogicLong
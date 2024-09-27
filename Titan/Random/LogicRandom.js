const ByteStream = require("../DataStream/ByteStream");

class LogicRandom {
    seed = 0;

    constructor (seed) {
        this.seed = seed;
    }

    getIteratedRandomSeed () {
        return this.seed;
    }

    setIteratedRandomSeed (seed) {
        this.seed = seed;
    }

    rand (max) {
        if (max > 0) {
            const seed = this.seed === 0 ? -1 : this.seed;

            const tmp = seed ^ (seed << 13) ^ ((seed ^ (seed << 13)) >> 17);
            let tmp2 = tmp ^ (32 * tmp);
            this.setIteratedRandomSeed(tmp2) ;

            if (tmp2 < 0) tmp2 = -tmp2;

            return tmp2 % max;
        }

        return 0;
    }

    iterateRandomSeed () {
        const seed = this.seed === 0 ? -1 : this.seed;

        const tmp = seed ^ (seed << 13) ^ ((seed ^ (seed << 13)) >> 17);
        const tmp2 = tmp ^ (32 * tmp);

        return tmp2;
    }

    decode (stream) {
        if (!(stream instanceof ByteStream)) {
            throw new Error("Stream must be instance of ByteStream!");
        }

        this.seed = stream.readInt()
    }

    encode (stream) {
        if (!(stream instanceof ByteStream)) {
            throw new Error("Stream must be instance of ByteStream!");
        }

        stream.writeInt(this.seed)
    }
}

module.exports = LogicRandom
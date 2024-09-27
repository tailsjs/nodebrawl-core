const ByteStreamHelper = require("../../ByteStream/Helper")
const GlobalID = require("../../Titan/GlobalID")

class LogicGemOffer {
    type = 0;
    count = 0;
    hero = [16, 0];
    extraData = 0;

    constructor () { }

    decode (stream) {
        const helper = new ByteStreamHelper(stream);

        this.type = stream.readVInt();
        this.count = stream.readVInt();
        this.hero = helper.readDataReference();
        this.extraData = stream.readVInt();
    }

    encode (stream) {
        const helper = new ByteStreamHelper(stream);

        stream.writeVInt(this.type);
        stream.writeVInt(this.count);
        helper.writeDataReference(this.hero);
        stream.writeVInt(this.extraData);
    }

    toString() {
        return `LogicGemOffer{type=${this.type}, count=${this.count}, hero=${GlobalID.composeGlobalID(this.hero)}, extraData=${this.extraData}}`
    }
}

module.exports = LogicGemOffer
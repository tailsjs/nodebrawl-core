const ByteStreamHelper = require('../Titan/DataStream/ByteStream/Helper.js');
const LogicCompressedString = require('../Titan/LogicCompressedString.js');
const LogicLong = require('../Titan/LogicLong.js');

class LogicBattlePlayerMap {
    mapId = new LogicLong(0, 0)
    state = 0
    mapName = ""
    mapEnvironment = [] 
    gameModeVariation = 0
    compressedMapData = ""
    avatarName = ""
    accountId = new LogicLong(0, 0)
    friendlySignoffAccountIds = []

    constructor () { }

    encode (stream) {
        const helper = new ByteStreamHelper(stream);
        helper.encodeLogicLong(this.mapId)
        stream.writeString(this.mapName);
        stream.writeVInt(this.gameModeVariation);
        helper.writeDataReference(this.mapEnvironment);
        const compressedString = new LogicCompressedString(this.compressedMapData);
        compressedString.encode(stream);

        helper.encodeLogicLong(this.accountId)
        stream.writeString(this.avatarName);
        stream.writeVInt(this.state);
        stream.writeVInt(this.friendlySignoffAccountIds.length);
        for (const accountId of this.friendlySignoffAccountIds) {
            helper.encodeLogicLong(accountId);
        }
    }

    decode (stream) {
        const helper = new ByteStreamHelper(stream);
        const compressedString = new LogicCompressedString();

        this.mapId = helper.decodeLogicLong()
        this.mapName = stream.readString();
        this.gameModeVariation = stream.readVInt();
        this.mapEnvironment = helper.readDataReference();
        compressedString.decode(stream); // compressedString.string
        this.compressedMapData = compressedString.string;

        this.accountId = helper.decodeLogicLong()
        this.avatarName = stream.readString();
        this.state = stream.readVInt();
        const length = stream.readVInt();

        for (let index = 0; index < length; index++) {
            this.friendlySignoffAccountIds.push(helper.decodeLogicLong());
        }
    }
}

module.exports = LogicBattlePlayerMap
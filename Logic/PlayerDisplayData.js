const GlobalID = require('../Titan/GlobalID');

class PlayerDisplayData {
    name = "";
    exp = 0;
    thumbnail = GlobalID.composeGlobalID(28, 0);
    namecolor = GlobalID.composeGlobalID(43, 0);
    isBrawlPassPurchased = false;

    constructor (stream) {
        this.decode(stream);
    }

    decode (stream) {
        this.name = stream.readString();
        this.exp = stream.readVInt();
        this.thumbnail = stream.readVInt();
        this.namecolor = stream.readVInt();
        this.isBrawlPassPurchased = stream.readBoolean();
    }

    encode (stream) {
        stream.writeString(this.name);
        stream.writeVInt(this.exp);
        stream.writeVInt(this.thumbnail);
        stream.writeVInt(this.namecolor);
        stream.writeBoolean(this.isBrawlPassPurchased);
    }

    getNameColor () {
        return GlobalID.decomposeGlobalID(this.namecolor)[1];
    }

    getThumbnail () {
        return GlobalID.decomposeGlobalID(this.thumbnail)[1];
    }

    setNameColor (ColorID) {
        this.namecolor = GlobalID.composeGlobalID(28, ColorID);
    }

    setThumbnail (ThumbnailID) {
        this.thumbnail = GlobalID.composeGlobalID(43, ThumbnailID);
    }
}

module.exports = PlayerDisplayData
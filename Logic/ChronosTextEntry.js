class ChronosTextEntry {
    text = "";
    chronosType = 0;

    constructor (stream) {
        this.decode(stream);
    }

    decode (stream) {
        this.text = stream.readStringReference(900000);
        this.chronosType = stream.readVInt();
    }

    encode (stream) {
        stream.writeStringReference(this.text);
        stream.writeVInt(this.chronosType);
    }
}

module.exports = ChronosTextEntry
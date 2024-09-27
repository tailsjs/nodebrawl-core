class ChronosFileEntry {
    filePath = "";
    filaSha = "";

    constructor (filePath, sha) {
        this.filePath = filePath
        this.filaSha = sha
    }

    decode (stream) {
        this.filePath = stream.readStringReference(900000);
        this.filaSha = stream.readStringReference(900000);
    }

    encode (stream) {
        stream.writeStringReference(this.filePath);
        stream.writeStringReference(this.filaSha);
    }
}

module.exports = ChronosFileEntry
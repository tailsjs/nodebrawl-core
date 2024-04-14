class ProLeagueSeasonData {
    season = 0;
    trophies = 0;

    constructor (stream) {
        this.decode(stream);
    }

    decode (stream) {
        this.season = stream.readVInt();
        this.trophies = stream.readVInt();
    }

    encode (stream) {
        stream.writeVInt(this.season);
        stream.writeVInt(this.trophies);
    }
}

module.exports = ProLeagueSeasonData
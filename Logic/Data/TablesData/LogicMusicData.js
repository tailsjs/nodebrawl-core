const LogicData = require('../LogicData')

class LogicMusicData extends LogicData {
    name = null
    fileName = [] // todo:fill array
    backgroundFile = []
    volume = []
    loop = []
    playCount = null
    fadeOutTimeSec = null
    durationSec = []

    constructor (row, table) {
        super(row, table)
    }

    createReferences() {
        super.createReferences()

        this.name = this.getStringValue("Name")
        this.playCount = this.getIntValue("PlayCount")
        this.fadeOutTimeSec = this.getIntValue("FadeOutTimeSec")

        const arraySize = this.row.getBiggestArraySize()

        for (let i = 0; i < arraySize; i++) {
            this.fileName.push(this.getStringArrayValue("FileName", i))
            this.backgroundFile.push(this.getBoolArrayValue("BackgroundFile", i))
            this.volume.push(this.getIntArrayValue("Volume", i))
            this.loop.push(this.getBoolArrayValue("Loop", i))
            this.durationSec.push(this.getIntArrayValue("DurationSec", i))
        }
    }

    getStringValue (name) {
        return this.getValue(name, 0)
    }

    getIntValue (name) {
        return this.getIntegerValue(name, 0)
    }

    getBoolValue (name) {
        return this.getBooleanValue(name, 0)
    }

    getStringArrayValue (name, index) {
        return this.getValue(name, index)
    }

    getIntArrayValue (name, index) {
        return this.getIntegerValue(name, index)
    }

    getBoolArrayValue (name, index) {
        return this.getBooleanValue(name, index)
    }
}

module.exports = LogicMusicData
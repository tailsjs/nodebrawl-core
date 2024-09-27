const LogicData = require("../LogicData")

class LogicSoundData extends LogicData {
    name = null
    fileNames = null
    minVolume = null
    maxVolume = null
    minPitch = null
    maxPitch = null
    priority = null
    maximumByType = null
    maxRepeatMs = null
    loop = null
    playVariationsInSequence = null // todo: fill arrays
    playVariationsInSequenceManualReset = null
    startDelayMinMs = null
    startDelayMaxMs = null
    playOnlyWhenInView = null
    maxVolumeScaleLimit = null
    noSoundScaleLimit = null
    padEmpyToEndMs = null

    constructor (row, table) {
        super(row, table)
    }

    createReferences () {
        super.createReferences()

        this.name = this.getStringValue("Name")
        this.fileNames = this.getStringValue("FileNames")
        this.minVolume = this.getIntValue("MinVolume")
        this.maxVolume = this.getIntValue("MaxVolume")
        this.minPitch = this.getIntValue("MinPitch")
        this.maxPitch = this.getIntValue("MaxPitch")
        this.priority = this.getIntValue("Priority")
        this.maximumByType = this.getIntValue("MaximumByType")
        this.maxRepeatMs = this.getIntValue("MaxRepeatMs")
        this.loop = this.getBoolValue("Loop")
        this.playVariationsInSequence = this.getBoolValue("PlayVariationsInSequence")
        this.playVariationsInSequenceManualReset = this.getBoolValue("PlayVariationsInSequenceManualReset")
        this.startDelayMinMs = this.getIntValue("StartDelayMinMs")
        this.startDelayMaxMs = this.getIntValue("StartDelayMaxMs")
        this.playOnlyWhenInView = this.getBoolValue("PlayOnlyWhenInView")
        this.maxVolumeScaleLimit = this.getIntValue("MaxVolumeScaleLimit")
        this.noSoundScaleLimit = this.getIntValue("NoSoundScaleLimit")
        this.padEmpyToEndMs = this.getIntValue("PadEmpyToEndMs")
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
}

module.exports = LogicSoundData
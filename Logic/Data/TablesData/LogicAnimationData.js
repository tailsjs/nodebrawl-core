const LogicData = require("../LogicData")

class LogicAnimationData extends LogicData {
    name = null
    fileName = null
    startFrame = null
    endFrame = null
    faceFreezeFrame = null
    speed = null
    transitionInMs = null
    transitionOutMs = null
    autoFadeMs = null
    looping = null
    priority = null

    constructor (row, table) {
        super(row, table)
    }

    createReferences () {
        super.createReferences()

        this.name = this.getStringValue("Name")
        this.fileName = this.getStringValue("FileName")
        this.startFrame = this.getIntValue("StartFrame")
        this.endFrame = this.getIntValue("EndFrame")
        this.faceFreezeFrame = this.getIntValue("FaceFreezeFrame")
        this.speed = this.getIntValue("Speed")
        this.transitionInMs = this.getIntValue("TransitionInMs")
        this.transitionOutMs = this.getIntValue("TransitionOutMs")
        this.autoFadeMs = this.getIntValue("AutoFadeMs")
        this.looping = this.getBoolValue("Looping")
        this.priority = this.getStringValue("Priority")
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

module.exports = LogicAnimationData
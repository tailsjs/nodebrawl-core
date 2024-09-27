const LogicData = require('../LogicData')

class LogicEffectData extends LogicData {
    name = null
    loop = null
    followParent = null
    followParentAngle = null
    followBone = null
    ownScreenShake = null
    othersScreenShake = null
    time = null
    sound = null
    type = [] // array
    fileName = []
    exportName = []
    particleEmitterName = [] // array
    effect = null
    layer = [] // array
    groundBasis = [] // array
    flashColor = null
    scale = [] // array
    flashDuration = null
    textInstanceName = null
    textParentInstanceName = null
    enemyVersion = null
    chinaReplacement = null
    flashWidth = null
    effectZ = null


    constructor (row, table) {
        super(row, table)
    }

    createReferences () {
        super.createReferences()

        this.name = this.getStringValue("Name")
        this.loop = this.getBoolValue("Loop")
        this.followParent = this.getBoolValue("FollowParent")
        this.followParentAngle = this.getBoolValue("FollowParentAngle")
        this.followBone = this.getStringValue("FollowBone")
        this.ownScreenShake = this.getIntValue("OwnScreenShake")
        this.othersScreenShake = this.getIntValue("OthersScreenShake")
        this.time = this.getIntValue("Time")
        this.sound = this.getStringValue("Sound")

        const arraySize = this.row.getBiggestArraySize()

        for (let i = 0; i < arraySize; i++) {
            this.type.push(this.getStringArrayValue("Type", i))
            this.fileName.push(this.getStringArrayValue("FileName", i))
            this.exportName.push(this.getStringArrayValue("ExportName", i))
            this.particleEmitterName.push(this.getStringArrayValue("ParticleEmitterName", i))
            this.layer.push(this.getStringArrayValue("Layer", i))
            this.groundBasis.push(this.getBoolArrayValue("GroundBasis", i))
            this.scale.push(this.getIntArrayValue("Scale", i))
        }

        this.effect = this.getStringValue("Effect")
        this.flashColor = this.getIntValue("FlashColor")
        this.flashDuration = this.getIntValue("FlashDuration")
        this.textInstanceName = this.getStringValue("TextInstanceName")
        this.textParentInstanceName = this.getStringValue("TextParentInstanceName")
        this.enemyVersion = this.getStringValue("EnemyVersion")
        this.chinaReplacement = this.getStringValue("ChinaReplacement")
        this.flashWidth = this.getIntValue("FlashWidth")
        this.effectZ = this.getIntValue("EffectZ")
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

module.exports = LogicEffectData
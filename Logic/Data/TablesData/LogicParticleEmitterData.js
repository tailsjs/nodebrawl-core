const LogicData = require('../LogicData')

class LogicParticleEmitterData extends LogicData {
    name = null
    maxParticleCount = null
    minLife = null
    maxLife = null
    particleMinInterval = null
    particleMaxInterval = null
    particleMinLife = null
    particleMaxLife = null
    particleMinAngle = null
    particleMaxAngle = null
    particleAngleRelativeToParent = null
    particleRandomAngle = null
    particleMinRadius = null
    particleMaxRadius = null
    particleMinSpeed = null
    particleMaxSpeed = null
    particleStartZ = null
    particleMinVelocityZ = null
    particleMaxVelocityZ = null
    particleGravity = null
    particleMinTailLength = null
    particleMaxTailLength = null
    particleResource = null
    particleExportName = null
    rotateToDirection = null
    loopParticleClip = null
    startScale = null
    endScale = null
    fadeOutDuration = null
    inertia = null
    enemyVersion = null // todo: fill arrays

    constructor (row, table) {
        super(row, table)
    }

    createReferences () {
        super.createReferences()

        this.name = this.getStringValue("Name")
        this.maxParticleCount = this.getIntValue("MaxParticleCount")
        this.minLife = this.getIntValue("MinLife")
        this.maxLife = this.getIntValue("MaxLife")
        this.particleMinInterval = this.getIntValue("ParticleMinInterval")
        this.particleMaxInterval = this.getIntValue("ParticleMaxInterval")
        this.particleMinLife = this.getIntValue("ParticleMinLife")
        this.particleMaxLife = this.getIntValue("ParticleMaxLife")
        this.particleMinAngle = this.getIntValue("ParticleMinAngle")
        this.particleMaxAngle = this.getIntValue("ParticleMaxAngle")
        this.particleAngleRelativeToParent = this.getBoolValue("ParticleAngleRelativeToParent")
        this.particleRandomAngle = this.getBoolValue("ParticleRandomAngle")
        this.particleMaxRadius = this.getIntValue("ParticleMaxRadius")
        this.particleMinSpeed = this.getIntValue("ParticleMinSpeed")
        this.particleMaxSpeed = this.getIntValue("ParticleMaxSpeed")
        this.particleStartZ = this.getIntValue("ParticleStartZ")
        this.particleMinVelocityZ = this.getIntValue("ParticleMinVelocityZ")
        this.particleMaxVelocityZ = this.getIntValue("ParticleMaxVelocityZ")
        this.particleGravity = this.getIntValue("ParticleGravity")
        this.particleMinTailLength = this.getIntValue("ParticleMinTailLength")
        this.particleMaxTailLength = this.getIntValue("ParticleMaxTailLength")
        this.particleResource = this.getStringValue("ParticleResource")
        this.particleExportName = this.getStringValue("ParticleExportName")
        this.rotateToDirection = this.getBoolValue("RotateToDirection")
        this.loopParticleClip = this.getBoolValue("LoopParticleClip")
        this.startScale = this.getIntValue("StartScale")
        this.endScale = this.getIntValue("EndScale")
        this.fadeOutDuration = this.getIntValue("FadeOutDuration")
        this.inertia = this.getIntValue("Inertia")
        this.enemyVersion = this.getStringValue("EnemyVersion")
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

module.exports = LogicParticleEmitterData
const LogicData = require("../LogicData")

class LogicAreaEffectData extends LogicData {
    name = null
    parentAreaEffectForSkin = null
    fileName = null
    ownExportName = null
    blueExportName = null
    redExportName = null
    neutralExportName = null
    layer = null
    exportNameTop = null
    exportNameTopRed = null
    exportNameObject = null
    effect = null
    loopingEffect = null
    allowEffectInterrupt = null
    serverControlsFrame = null
    scale = null
    timeMs = null
    radius = null
    damage = null
    customValue = null
    type = null
    isPersonal = null
    bulletExplosionBullet = null
    bulletExplosionBulletDistance = null
    bulletExplosionItem = null
    destroysEnvironment = null
    pushbackStrength = null
    pushbackStrengthSelf = null
    pushbackDeadzone = null
    canStopGrapple = null
    freezeStrength = null
    freezeTicks = null
    shouldShowEvenIfOutsideScreen = null
    sameAreaEffectCanNotDamageMs = null
    dontShowToEnemy = null
    requireLineOfSight = null
    chainAreaEffect = null
    skinnedCustomValue = null

    constructor (row, table) {
        super(row, table)
    }

    createReferences () {
        super.createReferences()

        this.name = this.getStringValue("Name")
        this.parentAreaEffectForSkin = this.getStringValue("ParentAreaEffectForSkin")
        this.fileName = this.getStringValue("FileName")
        this.ownExportName = this.getStringValue("OwnExportName")
        this.blueExportName = this.getStringValue("BlueExportName")
        this.redExportName = this.getStringValue("RedExportName")
        this.neutralExportName = this.getStringValue("NeutralExportName")
        this.layer = this.getStringValue("Layer")
        this.exportNameTop = this.getStringValue("ExportNameTop")
        this.exportNameTopRed = this.getStringValue("ExportNameTopRed")
        this.exportNameObject = this.getStringValue("ExportNameObject")
        this.effect = this.getStringValue("Effect")
        this.loopingEffect = this.getStringValue("LoopingEffect")
        this.allowEffectInterrupt = this.getBoolValue("AllowEffectInterrupt")
        this.serverControlsFrame = this.getBoolValue("ServerControlsFrame")
        this.scale = this.getIntValue("Scale")
        this.timeMs = this.getIntValue("TimeMs")
        this.radius = this.getIntValue("Radius")
        this.damage = this.getIntValue("Damage")
        this.type = this.getStringValue("Type")
        this.isPersonal = this.getBoolValue("IsPersonal")
        this.bulletExplosionBullet = this.getStringValue("BulletExplosionBullet")
        this.bulletExplosionBulletDistance = this.getIntValue("BulletExplosionBulletDistance")
        this.bulletExplosionItem = this.getStringValue("BulletExplosionItem")
        this.destroysEnvironment = this.getBoolValue("DestroysEnvironment")
        this.pushbackStrength = this.getIntValue("PushbackStrength")
        this.pushbackStrengthSelf = this.getIntValue("PushbackStrengthSelf")
        this.pushbackDeadzone = this.getIntValue("PushbackDeadzone")
        this.canStopGrapple = this.getBoolValue("CanStopGrapple")
        this.freezeStrength = this.getIntValue("FreezeStrength")
        this.freezeTicks = this.getIntValue("FreezeTicks")
        this.shouldShowEvenIfOutsideScreen = this.getBoolValue("ShouldShowEvenIfOutsideScreen")
        this.sameAreaEffectCanNotDamageMs = this.getIntValue("SameAreaEffectCanNotDamageMs")
        this.dontShowToEnemy = this.getBoolValue("DontShowToEnemy")
        this.requireLineOfSight = this.getBoolValue("RequireLineOfSight")
        this.chainAreaEffect = this.getStringValue("ChainAreaEffect")
        this.skinnedCustomValue = this.getIntValue("SkinnedCustomValue")
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

module.exports = LogicAreaEffectData
const LogicData = require("../LogicData")

class LogicTileData extends LogicData {
    name = null
    tileCode = null
    dynamicCode = null
    blocksMovement = null
    blocksProjectiles = null
    isDestructible = null
    isDestructibleNormalWeapon = null
    hidesHero = null
    restroreAfterDynamicOverlap = null
    respawnSeconds = null
    collisionMargin = null
    baseExportName = null
    baseExplosionEffect = null
    baseHitEffect = null
    baseWindEffect = null
    baseBulletHole1 = null
    baseBulletHole2 = null
    baseCrack1 = null
    baseCrack2 = null
    sortOffset = null
    hasHitAnim = null
    hasWindAnim = null
    shadowScaleX = null
    shadowScaleY = null
    shadowX = null
    shadowY = null
    shadowSkew = null
    lifetime = null
    customSCW = null
    customMesh = null
    customAngleStep = null

    constructor (row, table) {
        super(row, table)
    }

    createReferences () {
        super.createReferences()

        this.name = this.getStringValue("Name")
        this.tileCode = this.getStringValue("TileCode")
        this.dynamicCode = this.getIntValue("DynamicCode")
        this.blocksMovement = this.getBoolValue("BlocksMovement")
        this.blocksProjectiles = this.getBoolValue("BlocksProjectiles")
        this.isDestructible = this.getBoolValue("IsDestructible")
        this.isDestructibleNormalWeapon = this.getBoolValue("IsDestructibleNormalWeapon")
        this.hidesHero = this.getBoolValue("HidesHero")
        this.restroreAfterDynamicOverlap = this.getBoolValue("RestroreAfterDynamicOverlap")
        this.respawnSeconds = this.getIntValue("RespawnSeconds")
        this.collisionMargin = this.getIntValue("CollisionMargin")
        this.baseExportName = this.getStringValue("BaseExportName")
        this.baseExplosionEffect = this.getStringValue("BaseExplosionEffect")
        this.baseHitEffect = this.getStringValue("BaseHitEffect")
        this.baseWindEffect = this.getStringValue("BaseWindEffect")
        this.baseBulletHole1 = this.getStringValue("BaseBulletHole1")
        this.baseBulletHole2 = this.getStringValue("BaseBulletHole2")
        this.baseCrack1 = this.getStringValue("BaseCrack1")
        this.baseCrack2 = this.getStringValue("BaseCrack2")
        this.sortOffset = this.getIntValue("SortOffset")
        this.hasHitAnim = this.getBoolValue("HasHitAnim")
        this.hasWindAnim = this.getBoolValue("HasWindAnim")
        this.shadowScaleX = this.getIntValue("ShadowScaleX")
        this.shadowScaleY = this.getIntValue("ShadowScaleY")
        this.shadowX = this.getIntValue("ShadowX")
        this.shadowY = this.getIntValue("ShadowY")
        this.shadowSkew = this.getIntValue("ShadowSkew")
        this.lifetime = this.getIntValue("Lifetime")
        this.customSCW = this.getStringValue("CustomSCW")
        this.customMesh = this.getStringValue("CustomMesh")
        this.customAngleStep = this.getIntValue("CustomAngleStep")
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

module.exports = LogicTileData
const LogicData = require('../LogicData')

class LogicProjectileData extends LogicData {
    name = null
    parentProjectileForSkin = null
    speed = null
    fileName = null
    blueSCW = null
    redSCW = null
    blueExportName = null
    redExportName = null
    shadowExportName = null
    blueGroundGlowExportName = null
    redGroundGlowExportName = null
    preExplosionBlueExportName = null
    preExplosionRedExportName = null
    preExplosionTimeMs = null
    hitEffectEnv = null
    hitEffectChar = null
    maxRangeReachedEffect = null
    cancelEffect = null
    radius = null
    indirect = null
    constantFlyTime = null
    triggerWithDelayMs = null
    bouncePercent = null
    gravity = null
    earlyTicks = null
    hideTime = null
    scale = null
    randomStartFrame = null
    spawnAreaEffectObject = null
    spawnAreaEffectObject2 = null
    spawnCharacter = null
    spawnItem = null
    trailEffect = null
    shotByHero = null
    isBeam = null
    isBouncing = null
    distanceAddFromBounce = null
    rendering = null
    piercesCharacters = null
    piercesEnvironment = null
    piercesEnvironmentLikeButter = null
    pushbackStrength = null
    variablePushback = null
    directionAlignedPushback = null
    chainsToEnemies = null
    chainBullets = null
    chainSpread = null
    chainTravelDistance = null
    chainBullet = null
    executeChainSpecialCase = null
    damagePercentStart = null
    damagePercentEnd = null
    damagesConstantlyTickDelay = null
    freezeStrength = null
    freezeDurationMS = null
    stunLengthMS = null
    scaleStart = null
    scaleEnd = null
    attractsPet = null
    lifeStealPercent = null
    passesEnvironment = null
    poisonDamagePercent = null
    damageOnlyWithOneProj = null
    healOwnPercent = null
    canGrowStronger = null
    hideFaster = null
    grapplesEnemy = null
    kickBack = null
    useColorMod = null
    redAdd = null
    greenAdd = null
    blueAdd = null
    redMul = null
    greenMul = null
    blueMul = null
    groundBasis = null
    minDistanceForSpread = null
    isFriendlyHomingMissile = null
    isBoomerang = null
    canHitAgainAfterBounce = null
    isHomingMissile = null
    blockUltiCharge = null
    poisonType = null
    travelType = null
    steerStrength = null
    steerIgnoreTicks = null
    homeDistance = null
    steerLifeTime = null


    constructor (row, table) {
        super(row, table)
    }

    createReferences () {
        super.createReferences()

        this.name = this.getStringValue("Name")
        this.parentProjectileForSkin = this.getStringValue("ParentProjectileForSkin")
        this.speed = this.getIntValue("Speed")
        this.fileName = this.getStringValue("FileName")
        this.blueSCW = this.getStringValue("BlueSCW")
        this.redSCW = this.getStringValue("RedSCW")
        this.blueExportName = this.getStringValue("BlueExportName")
        this.redExportName = this.getStringValue("RedExportName")
        this.shadowExportName = this.getStringValue("ShadowExportName")
        this.blueGroundGlowExportName = this.getStringValue("BlueGroundGlowExportName")
        this.redGroundGlowExportName = this.getStringValue("RedGroundGlowExportName")
        this.preExplosionBlueExportName = this.getStringValue("PreExplosionBlueExportName")
        this.preExplosionRedExportName = this.getStringValue("PreExplosionRedExportName")
        this.preExplosionTimeMs = this.getIntValue("PreExplosionTimeMs")
        this.hitEffectEnv = this.getStringValue("HitEffectEnv")
        this.hitEffectChar = this.getStringValue("HitEffectChar")
        this.maxRangeReachedEffect = this.getStringValue("MaxRangeReachedEffect")
        this.cancelEffect = this.getStringValue("CancelEffect")
        this.radius = this.getIntValue("Radius")
        this.indirect = this.getBoolValue("Indirect")
        this.constantFlyTime = this.getBoolValue("ConstantFlyTime")
        this.triggerWithDelayMs = this.getIntValue("TriggerWithDelayMs")
        this.bouncePercent = this.getIntValue("BouncePercent")
        this.gravity = this.getIntValue("Gravity")
        this.earlyTicks = this.getIntValue("EarlyTicks")
        this.hideTime = this.getIntValue("HideTime")
        this.scale = this.getIntValue("Scale")
        this.randomStartFrame = this.getIntValue("RandomStartFrame")
        this.spawnAreaEffectObject = this.getStringValue("SpawnAreaEffectObject")
        this.spawnAreaEffectObject2 = this.getStringValue("SpawnAreaEffectObject2")
        this.spawnCharacter = this.getStringValue("SpawnCharacter")
        this.spawnItem = this.getStringValue("SpawnItem")
        this.trailEffect = this.getStringValue("TrailEffect")
        this.shotByHero = this.getBoolValue("ShotByHero")
        this.isBeam = this.getBoolValue("IsBeam")
        this.isBouncing = this.getBoolValue("IsBouncing")
        this.distanceAddFromBounce = this.getIntValue("DistanceAddFromBounce")
        this.rendering = this.getStringValue("Rendering")
        this.piercesCharacters = this.getBoolValue("PiercesCharacters")
        this.piercesEnvironment = this.getBoolValue("PiercesEnvironment")
        this.piercesEnvironmentLikeButter = this.getBoolValue("PiercesEnvironmentLikeButter")
        this.pushbackStrength = this.getIntValue("PushbackStrength")
        this.variablePushback = this.getBoolValue("VariablePushback")
        this.directionAlignedPushback = this.getBoolValue("DirectionAlignedPushback")
        this.chainsToEnemies = this.getIntValue("ChainsToEnemies")
        this.chainBullets = this.getIntValue("ChainBullets")
        this.chainSpread = this.getIntValue("ChainSpread")
        this.chainTravelDistance = this.getIntValue("ChainTravelDistance")
        this.chainBullet = this.getStringValue("ChainBullet")
        this.executeChainSpecialCase = this.getIntValue("ExecuteChainSpecialCase")
        this.damagePercentStart = this.getIntValue("DamagePercentStart")
        this.damagePercentEnd = this.getIntValue("DamagePercentEnd")
        this.damagesConstantlyTickDelay = this.getIntValue("DamagesConstantlyTickDelay")
        this.freezeStrength = this.getIntValue("FreezeStrength")
        this.freezeDurationMS = this.getIntValue("FreezeDurationMS")
        this.stunLengthMS = this.getIntValue("StunLengthMS")
        this.scaleStart = this.getIntValue("ScaleStart")
        this.scaleEnd = this.getIntValue("ScaleEnd")
        this.attractsPet = this.getBoolValue("AttractsPet")
        this.lifeStealPercent = this.getIntValue("LifeStealPercent")
        this.passesEnvironment = this.getBoolValue("PassesEnvironment")
        this.poisonDamagePercent = this.getIntValue("PoisonDamagePercent")
        this.damageOnlyWithOneProj = this.getBoolValue("DamageOnlyWithOneProj")
        this.healOwnPercent = this.getIntValue("HealOwnPercent")
        this.canGrowStronger = this.getBoolValue("CanGrowStronger")
        this.hideFaster = this.getBoolValue("HideFaster")
        this.grapplesEnemy = this.getBoolValue("GrapplesEnemy")
        this.kickBack = this.getIntValue("KickBack")
        this.useColorMod = this.getBoolValue("UseColorMod")
        this.redAdd = this.getIntValue("RedAdd")
        this.greenAdd = this.getIntValue("GreenAdd")
        this.blueAdd = this.getIntValue("BlueAdd")
        this.redMul = this.getIntValue("RedMul")
        this.greenMul = this.getIntValue("GreenMul")
        this.blueMul = this.getIntValue("BlueMul")
        this.groundBasis = this.getBoolValue("GroundBasis")
        this.minDistanceForSpread = this.getIntValue("MinDistanceForSpread")
        this.isFriendlyHomingMissile = this.getBoolValue("IsFriendlyHomingMissile")
        this.isBoomerang = this.getBoolValue("IsBoomerang")
        this.canHitAgainAfterBounce = this.getBoolValue("CanHitAgainAfterBounce")
        this.isHomingMissile = this.getBoolValue("IsHomingMissile")
        this.blockUltiCharge = this.getBoolValue("BlockUltiCharge")
        this.poisonType = this.getIntValue("PoisonType")
        this.travelType = this.getIntValue("TravelType")
        this.steerStrength = this.getIntValue("SteerStrength")
        this.steerIgnoreTicks = this.getIntValue("SteerIgnoreTicks")
        this.homeDistance = this.getIntValue("HomeDistance")
        this.steerLifeTime = this.getIntValue("SteerLifeTime")
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

module.exports = LogicProjectileData
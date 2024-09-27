const LogicData = require("../LogicData")

class LogicSkillData extends LogicData {
    name = null
    behaviorType = null
    canMoveAtSameTime = null
    targeted = null
    canAutoShoot = null
    faceMovement = null
    cooldown = null
    activeTime = null
    castingTime = null
    castingRange = null
    rangeVisual = null
    rangeInputScale = null
    maxCastingRange = null
    forceValidTile = null
    rechargeTime = null
    maxCharge = null
    damage = null
    percentDamage = null
    msBetweenAttacks = null
    spread = null
    attackPattern = null
    numBulletsInOneAttack = null
    twoGuns = null
    executeFirstAttackImmediately = null
    chargePushback = null
    chargeSpeed = null
    chargeType = null
    numSpawns = null
    maxSpawns = null
    breakInvisibilityOnAttack = null
    seeInvisibilityDistance = null
    alwaysCastAtMaxRange = null
    projectile = null
    summonedCharacter = null
    areaEffectObject = null
    areaEffectObject2 = null
    spawnedItem = null
    iconSWF = null
    iconExportName = null
    largeIconSWF = null
    largeIconExportName = null
    buttonSWF = null
    buttonExportName = null
    attackEffect = null
    useEffect = null
    endEffect = null
    loopEffect = null
    loopEffect2 = null
    chargeMoveSound = null
    multiShot = null
    skillCanChange = null
    showTimerBar = null
    secondaryProjectile = null
    chargedShotCount = null
    damageModifier = null
    holdToShoot = null

    constructor (row, table) {
        super(row, table)
    }

    createReferences () {
        super.createReferences()

        this.name = this.getStringValue("Name")
        this.behaviorType = this.getStringValue("BehaviorType")
        this.canMoveAtSameTime = this.getBoolValue("CanMoveAtSameTime")
        this.targeted = this.getBoolValue("Targeted")
        this.canAutoShoot = this.getBoolValue("CanAutoShoot")
        this.faceMovement = this.getBoolValue("FaceMovement")
        this.cooldown = this.getIntValue("Cooldown")
        this.activeTime = this.getIntValue("ActiveTime")
        this.castingTime = this.getIntValue("CastingTime")
        this.castingRange = this.getIntValue("CastingRange")
        this.rangeVisual = this.getIntValue("RangeVisual")
        this.rangeInputScale = this.getIntValue("RangeInputScale")
        this.maxCastingRange = this.getIntValue("MaxCastingRange")
        this.forceValidTile = this.getIntValue("ForceValidTile")
        this.rechargeTime = this.getIntValue("RechargeTime")
        this.maxCharge = this.getIntValue("MaxCharge")
        this.damage = this.getIntValue("Damage")
        this.percentDamage = this.getIntValue("PercentDamage")
        this.msBetweenAttacks = this.getIntValue("MsBetweenAttacks")
        this.spread = this.getIntValue("Spread")
        this.attackPattern = this.getIntValue("AttackPattern")
        this.numBulletsInOneAttack = this.getIntValue("NumBulletsInOneAttack")
        this.twoGuns = this.getBoolValue("TwoGuns")
        this.executeFirstAttackImmediately = this.getBoolValue("ExecuteFirstAttackImmediately")
        this.chargePushback = this.getIntValue("ChargePushback")
        this.chargeSpeed = this.getIntValue("ChargeSpeed")
        this.chargeType = this.getIntValue("ChargeType")
        this.numSpawns = this.getIntValue("NumSpawns")
        this.maxSpawns = this.getIntValue("MaxSpawns")
        this.breakInvisibilityOnAttack = this.getBoolValue("BreakInvisibilityOnAttack")
        this.seeInvisibilityDistance = this.getIntValue("SeeInvisibilityDistance")
        this.alwaysCastAtMaxRange = this.getBoolValue("AlwaysCastAtMaxRange")
        this.projectile = this.getStringValue("Projectile")
        this.summonedCharacter = this.getStringValue("SummonedCharacter")
        this.areaEffectObject = this.getStringValue("AreaEffectObject")
        this.areaEffectObject2 = this.getStringValue("AreaEffectObject2")
        this.spawnedItem = this.getStringValue("SpawnedItem")
        this.iconExportName = this.getStringValue("IconExportName")
        this.largeIconSWF = this.getStringValue("LargeIconSWF")
        this.largeIconExportName = this.getStringValue("LargeIconExportName")
        this.buttonSWF = this.getStringValue("ButtonSWF")
        this.buttonExportName = this.getStringValue("ButtonExportName")
        this.attackEffect = this.getStringValue("AttackEffect")
        this.useEffect = this.getStringValue("UseEffect")
        this.endEffect = this.getStringValue("EndEffect")
        this.loopEffect = this.getStringValue("LoopEffect")
        this.loopEffect2 = this.getStringValue("LoopEffect2")
        this.chargeMoveSound = this.getStringValue("ChargeMoveSound")
        this.multiShot = this.getBoolValue("MultiShot")
        this.skillCanChange = this.getBoolValue("SkillCanChange")
        this.showTimerBar = this.getBoolValue("ShowTimerBar")
        this.secondaryProjectile = this.getStringValue("SecondaryProjectile")
        this.chargedShotCount = this.getIntValue("ChargedShotCount")
        this.damageModifier = this.getIntValue("DamageModifier")
        this.holdToShoot = this.getBoolValue("HoldToShoot")
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

module.exports = LogicSkillData
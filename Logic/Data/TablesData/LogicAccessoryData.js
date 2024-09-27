const LogicData = require("../LogicData")

class LogicAccessoryData extends LogicData {
    name = null
    type = null
    subType = null
    chargeCount = null
    cooldown = null
    useEffect = null
    loopingEffect = null
    loopingEffectPet = null
    activationDelay = null
    activeTicks = null
    stopMovement = null
    stopPetForDelay = null
    animationIndex = null
    setAttackAngle = null
    aimGuideType = null
    consumesAmmo = null
    areaEffect = null
    petAreaEffect = null
    interruptsAction = null
    allowStunActivation = null
    requirePetDistance = null
    destroyPet = null
    range = null
    requireEnemyInRange = null
    targetFriends = null
    targetIndirect = null
    shieldPercent = null
    shieldTicks = null
    speedBoost = null
    speedBoostTicks = null
    skipTypeCondition = null
    customObject = null
    customValue1 = null
    customValue2 = null
    customValue3 = null
    customValue4 = null
    customValue5 = null
    customValue6 = null
    missingTargetText = null
    targetTooFarText = null
    targetAlreadyActiveText = null

    constructor (row, table) {
        super(row, table)
    }

    createReferences () {
        super.createReferences()

        this.name = this.getStringValue("Name")
        this.type = this.getStringValue("Type")
        this.subType = this.getIntValue("SubType")
        this.chargeCount = this.getIntValue("ChargeCount")
        this.cooldown = this.getIntValue("Cooldown")
        this.useEffect = this.getStringValue("UseEffect")
        this.loopingEffect = this.getStringValue("LoopingEffect")
        this.loopingEffectPet = this.getStringValue("LoopingEffectPet")
        this.activationDelay = this.getIntValue("ActivationDelay")
        this.activeTicks = this.getIntValue("ActiveTicks")
        this.stopMovement = this.getBoolValue("StopMovement")
        this.stopPetForDelay = this.getBoolValue("StopPetForDelay")
        this.animationIndex = this.getIntValue("AnimationIndex")
        this.setAttackAngle = this.getBoolValue("SetAttackAngle")
        this.aimGuideType = this.getIntValue("AimGuideType")
        this.consumesAmmo = this.getBoolValue("ConsumesAmmo")
        this.areaEffect = this.getStringValue("AreaEffect")
        this.petAreaEffect = this.getStringValue("PetAreaEffect")
        this.interruptsAction = this.getBoolValue("InterruptsAction")
        this.allowStunActivation = this.getBoolValue("AllowStunActivation")
        this.requirePetDistance = this.getIntValue("RequirePetDistance")
        this.destroyPet = this.getBoolValue("DestroyPet")
        this.requireEnemyInRange = this.getBoolValue("RequireEnemyInRange")
        this.targetFriends = this.getBoolValue("TargetFriends")
        this.targetIndirect = this.getBoolValue("TargetIndirect")
        this.shieldPercent = this.getIntValue("ShieldPercent")
        this.shieldTicks = this.getIntValue("ShieldTicks")
        this.speedBoost = this.getIntValue("SpeedBoost")
        this.speedBoostTicks = this.getIntValue("SpeedBoostTicks")
        this.skipTypeCondition = this.getBoolValue("SkipTypeCondition")
        this.customObject = this.getStringValue("CustomObject")
        this.customValue1 = this.getIntValue("CustomValue1")
        this.customValue2 = this.getIntValue("CustomValue2")
        this.customValue3 = this.getIntValue("CustomValue3")
        this.customValue4 = this.getIntValue("CustomValue4")
        this.customValue5 = this.getIntValue("CustomValue5")
        this.customValue6 = this.getIntValue("CustomValue6")
        this.missingTargetText = this.getStringValue("MissingTargetText")
        this.targetTooFarText = this.getStringValue("TargetTooFarText")
        this.targetAlreadyActiveText = this.getStringValue("TargetAlreadyActiveText")
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

module.exports = LogicAccessoryData
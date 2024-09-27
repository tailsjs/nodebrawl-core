const LogicData = require("../LogicData")

class LogicTutorialStepData extends LogicData {
    name = null
    stepName = null
    startDelayMS = null
    endDelayMS = null
    forceSpeechBubbleCloseMS = null
    startCondition = null
    startLocationX = null
    startLocationY = null
    startLocationRadius = null
    animationX = null
    animationY = null
    animationX2 = null
    animationY2 = null
    completeCondition = null
    shouldUseAutoShoot = null
    completeLocationX = null
    completeLocationY = null
    completeLocationRadius = null
    useUltiX = null
    useUltiY = null
    animationClipSWF = null
    animationMovieClip = null
    animationClipSWF2 = null
    animationMovieClip2 = null
    speechBubbleCharacterSWF = null
    speechBubbleCharacterMovieClip = null
    speechBubbleTIDs = null
    startSound = null
    spawnCharacter = null
    spawnLocationX = null
    spawnLocationY = null
    customData = null
    blockingSpeechBubble = null
    showUlti = null
    showShootStick = null
    leftSpeechBubble = null

    constructor (row, table) {
        super(row, table)
    }

    createReferences () {
        super.createReferences()

        this.name = this.getStringValue("Name")
        this.stepName = this.getStringValue("StepName")
        this.startDelayMS = this.getIntValue("StartDelayMS")
        this.endDelayMS = this.getIntValue("EndDelayMS")
        this.forceSpeechBubbleCloseMS = this.getIntValue("ForceSpeechBubbleCloseMS")
        this.startCondition = this.getStringValue("StartCondition")
        this.startLocationX = this.getIntValue("StartLocationX")
        this.startLocationY = this.getIntValue("StartLocationY")
        this.startLocationRadius = this.getIntValue("StartLocationRadius")
        this.animationX = this.getIntValue("AnimationX")
        this.animationY = this.getIntValue("AnimationY")
        this.animationX2 = this.getIntValue("AnimationX2")
        this.animationY2 = this.getIntValue("AnimationY2")
        this.completeCondition = this.getStringValue("CompleteCondition")
        this.shouldUseAutoShoot = this.getBoolValue("ShouldUseAutoShoot")
        this.completeLocationX = this.getIntValue("CompleteLocationX")
        this.completeLocationY = this.getIntValue("CompleteLocationY")
        this.completeLocationRadius = this.getIntValue("CompleteLocationRadius")
        this.useUltiX = this.getIntValue("UseUltiX")
        this.useUltiY = this.getIntValue("UseUltiY")
        this.animationClipSWF = this.getStringValue("AnimationClipSWF")
        this.animationMovieClip = this.getStringValue("AnimationMovieClip")
        this.animationClipSWF2 = this.getStringValue("AnimationClipSWF2")
        this.animationMovieClip2 = this.getStringValue("AnimationMovieClip2")
        this.speechBubbleCharacterSWF = this.getStringValue("SpeechBubbleCharacterSWF")
        this.speechBubbleCharacterMovieClip = this.getStringValue("SpeechBubbleCharacterMovieClip")
        this.speechBubbleTIDs = this.getStringValue("SpeechBubbleTIDs")
        this.startSound = this.getStringValue("StartSound")
        this.spawnCharacter = this.getStringValue("SpawnCharacter")
        this.spawnLocationX = this.getIntValue("SpawnLocationX")
        this.spawnLocationY = this.getIntValue("SpawnLocationY")
        this.customData = this.getIntValue("CustomData")
        this.blockingSpeechBubble = this.getBoolValue("BlockingSpeechBubble")
        this.showUlti = this.getBoolValue("ShowUlti")
        this.showShootStick = this.getBoolValue("ShowShootStick")
        this.leftSpeechBubble = this.getBoolValue("LeftSpeechBubble")
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

module.exports = LogicTutorialStepData
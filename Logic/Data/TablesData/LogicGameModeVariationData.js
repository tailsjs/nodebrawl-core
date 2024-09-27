const LogicData = require("../LogicData")

class LogicGameModeVariationData extends LogicData {
    name = null
    variation = null
    disabled = null
    TID = null
    chatSuggestionItemName = null
    gameModeRoomIconName = null
    gameModeIconName = null
    scoreSfx = null
    opponentScoreSfx = null
    scoreText = null
    scoreTextEnd = null
    friendlyMenuOrder = null
    introText = null
    introDescText = null
    introDescText2 = null
    startNotification = null
    endNotification = null
    color = null

    constructor (row, table) {
        super(row, table)
    }

    createReferences () {
        super.createReferences()

        this.name = this.getStringValue("Name")
        this.variation = this.getIntValue("Variation")
        this.disabled = this.getBoolValue("Disabled")
        this.TID = this.getStringValue("TID")
        this.chatSuggestionItemName = this.getStringValue("ChatSuggestionItemName")
        this.gameModeRoomIconName = this.getStringValue("GameModeRoomIconName")
        this.gameModeIconName = this.getStringValue("GameModeIconName")
        this.scoreSfx = this.getStringValue("ScoreSfx")
        this.opponentScoreSfx = this.getStringValue("OpponentScoreSfx")
        this.scoreText = this.getStringValue("ScoreText")
        this.scoreTextEnd = this.getStringValue("ScoreTextEnd")
        this.friendlyMenuOrder = this.getIntValue("FriendlyMenuOrder")
        this.introText = this.getStringValue("IntroText")
        this.introDescText = this.getStringValue("IntroDescText")
        this.introDescText2 = this.getStringValue("IntroDescText2")
        this.startNotification = this.getStringValue("StartNotification")
        this.endNotification = this.getStringValue("EndNotification")
        this.color = this.getStringValue("Color")
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

module.exports = LogicGameModeVariationData
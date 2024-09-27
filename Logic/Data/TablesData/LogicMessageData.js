const LogicData = require("../LogicData")

class LogicMessageData extends LogicData {
    name = null
    TID = null
    bubbleOverrideTID = null
    disabled = null
    messageType = null
    fileName = null
    exportName = null
    quickEmojiType = null
    sortPriority = null
    ageGated = null

    constructor (row, table) {
        super(row, table)
    }

    createReferences () {
        super.createReferences()

        this.name = this.getStringValue("Name")
        this.TID = this.getStringValue("TID")
        this.bubbleOverrideTID = this.getStringValue("BubbleOverrideTID")
        this.disabled = this.getBoolValue("Disabled")
        this.messageType = this.getIntValue("MessageType")
        this.fileName = this.getStringValue("FileName")
        this.exportName = this.getStringValue("ExportName")
        this.quickEmojiType = this.getIntValue("QuickEmojiType")
        this.sortPriority = this.getIntValue("SortPriority")
        this.ageGated = this.getBoolValue("AgeGated")
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

module.exports = LogicMessageData
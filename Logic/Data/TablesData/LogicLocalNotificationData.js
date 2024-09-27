const LogicData = require("../LogicData")

class LogicLocalNotificationData extends LogicData {
    name = null
    priority = null
    notificationText = null // array
    isRegularEventRefresh = null
    dontCompare = null
    autoAdd = null
    timeOffsetMins = null
    maxRandomTimeOffsetMins = null
    checkRangeMins = null

    constructor (row, table) {
        super(row, table)
    }

    createReferences () {
        super.createReferences()

        this.name = this.getStringValue("Name")
        this.priority = this.getIntValue("Priority")
        this.notificationText = this.getStringValue("NotificationText")
        this.isRegularEventRefresh = this.getBoolValue("IsRegularEventRefresh")
        this.dontCompare = this.getBoolValue("DontCompare")
        this.autoAdd = this.getBoolValue("AutoAdd")
        this.timeOffsetMins = this.getIntValue("TimeOffsetMins")
        this.maxRandomTimeOffsetMins = this.getIntValue("MaxRandomTimeOffsetMins")
        this.checkRangeMins = this.getIntValue("CheckRangeMins")
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

module.exports = LogicLocalNotificationData
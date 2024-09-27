const LogicData = require("../LogicData")

class LogicAllianceRoleData extends LogicData {
    name = null
    level = null
    TID = null
    canInvite = null
    canSendMail = null
    canChangeAllianceSettings = null
    canAcceptJoinRequest = null
    canKick = null
    canBePromotedToLeader = null
    promoteSkill = null

    constructor (row, table) {
        super(row, table)
    }

    createReferences () {
        super.createReferences()

        this.name = this.getStringValue("Name")
        this.level = this.getIntValue("Level")
        this.TID = this.getStringValue("TID")
        this.canInvite = this.getBoolValue("CanInvite")
        this.canSendMail = this.getBoolValue("CanSendMail")
        this.canChangeAllianceSettings = this.getBoolValue("CanChangeAllianceSettings")
        this.canAcceptJoinRequest = this.getBoolValue("CanAcceptJoinRequest")
        this.canKick = this.getBoolValue("CanKick")
        this.canBePromotedToLeader = this.getBoolValue("CanBePromotedToLeader")
        this.promoteSkill = this.getIntValue("PromoteSkill")
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

module.exports = LogicAllianceRoleData
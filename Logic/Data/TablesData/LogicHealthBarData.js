const LogicData = require("../LogicData")

class LogicHealthBarData extends LogicData {
    name = null
    fileName = null
    playerExportNameTop = null
    playerExportNameBot = null
    enemyExportNameTop = null
    enemyExportNameBot = null
    yourTeamExportNameTop = null
    yourTeamExportNameBot = null

    constructor (row, table) {
        super(row, table)
    }

    createReferences() {
        super.createReferences()

        this.name = this.getStringValue("Name")
        this.fileName = this.getStringValue("FileName")
        this.playerExportNameTop = this.getStringValue("PlayerExportNameTop")
        this.playerExportNameBot = this.getStringValue("PlayerExportNameBot")
        this.enemyExportNameTop = this.getStringValue("EnemyExportNameTop")
        this.enemyExportNameBot = this.getStringValue("EnemyExportNameBot")
        this.yourTeamExportNameTop = this.getStringValue("YourTeamExportNameTop")
        this.yourTeamExportNameBot = this.getStringValue("YourTeamExportNameBot")
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

module.exports = LogicHealthBarData
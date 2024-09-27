const LogicData = require('../LogicData')

class LogicLocationData extends LogicData {
    name = null
    disabled = [] // array
    TID = null
    bgPrefix = null
    locationTheme = null
    groundSCW = null
    campaignGroundSCW = null
    environmentSCW = [] // array
    iconSWF = null
    iconExportName = null 
    gameMode = null
    allowedMaps = null
    music = null
    communityCredit = null

    constructor (row, table) {
        super(row, table)
    }

    createReferences() {
        super.createReferences()

        this.name = this.getStringValue("Name")
        
        const arraySize = this.row.getBiggestArraySize()

        for (let i = 0; i < arraySize; i++) {
            this.disabled.push(this.getBoolArrayValue("Disabled", i))
            this.environmentSCW.push(this.getStringArrayValue("EnvironmentSCW", i))
        }

        this.TID = this.getStringValue("TID")
        this.bgPrefix = this.getStringValue("BgPrefix")
        this.locationTheme = this.getStringValue("LocationTheme")
        this.groundSCW = this.getStringValue("GroundSCW")
        this.campaignGroundSCW = this.getStringValue("CampaignGroundSCW")
        this.iconSWF = this.getStringValue("IconSWF")
        this.iconExportName = this.getStringValue("IconExportName")
        this.gameMode = this.getStringValue("GameMode")
        this.allowedMaps = this.getStringValue("AllowedMaps")
        this.music = this.getStringValue("Music")
        this.communityCredit = this.getStringValue("CommunityCredit")
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

    getStringArrayValue (name, index) {
        return this.getValue(name, index)
    }

    getBoolArrayValue (name, index) {
        return this.getBooleanValue(name, index)
    }
}

module.exports = LogicLocationData
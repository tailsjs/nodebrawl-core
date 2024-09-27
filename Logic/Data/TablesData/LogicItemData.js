const LogicData = require("../LogicData")

class LogicItemData extends LogicData {
    name = null
    parentItemForSkin = null
    fileName = null
    exportName = null
    exportNameEnemy = null
    shadowExportName = null
    groundGlowExportName = null
    loopingEffect = null
    value = null
    value2 = null
    triggerRangeSubTiles = null
    triggerAreaEffect = null
    canBePickedUp = null
    spawnEffect = null
    activateEffect = null
    SCW = null
    SCWEnemy = null
    layer = null

    constructor(row, table) {
        super(row, table)
    }

    createReferences () {
        super.createReferences()

        this.name = this.getStringValue("Name")
        this.parentItemForSkin = this.getStringValue("ParentItemForSkin")
        this.exportName = this.getStringValue("ExportName")
        this.exportNameEnemy = this.getStringValue("ExportNameEnemy")
        this.shadowExportName = this.getStringValue("ShadowExportName")
        this.groundGlowExportName = this.getStringValue("GroundGlowExportName")
        this.loopingEffect = this.getStringValue("LoopingEffect")
        this.value = this.getIntValue("Value")
        this.value2 = this.getIntValue("Value2")
        this.triggerRangeSubTiles = this.getIntValue("TriggerRangeSubTiles")
        this.triggerAreaEffect = this.getStringValue("TriggerAreaEffect")
        this.canBePickedUp = this.getBoolValue("CanBePickedUp")
        this.spawnEffect = this.getStringValue("SpawnEffect")
        this.activateEffect = this.getStringValue("ActivateEffect")
        this.SCW = this.getStringValue("SCW")
        this.SCWEnemy = this.getStringValue("SCWEnemy")
        this.layer = this.getStringValue("Layer")
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

module.exports = LogicItemData
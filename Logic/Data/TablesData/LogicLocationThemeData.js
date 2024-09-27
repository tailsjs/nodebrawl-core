const LogicData = require("../LogicData")

class LogicLocationThemeData extends LogicData {
    name = null
    tileSetPrefix = null
    maskedEnvironmentSCW = null
    blocking1SCW = null
    blocking1Mesh = null
    blocking1AngleStep = null
    blocking2SCW = null
    blocking2Mesh = null
    blocking2AngleStep = null
    blocking3SCW = null
    blocking3Mesh = null
    blocking3AngleStep = null
    blocking4SCW = null
    blocking4Mesh = null
    blocking4AngleStep = null
    respawningWallSCW = [] // TODO: Fill arrays
    respawningWallMesh = []
    respawningWallAngleStep = []
    respawningForestSCW = null
    forestSCW = null
    destructableSCW = []
    destructableMesh = []
    destructableAngleStep = []
    destructableSCW_CN = null
    destructableMesh_CN = null
    destructableAngleStep_CN = null
    fragileSCW = null
    fragileMesh = null
    fragileAngleStep = null
    fragileSCW_CN = null
    fragileMesh_CN = null
    fragileAngleStep_CN = null
    waterTileSCW = null
    fenceSCW = null
    ropeFenceSCW = null
    roadSCW = null
    indestructibleSCW = null
    indestructibleMesh = null
    benchSCW = null
    groundFillerSCW = null
    laserBallSkinOverride = null
    mineGemSpawnSCWOverride = null
    lootBoxSkinOverride = null
    safeSkinOverride = null
    showdownBoostSCWOverride = null
    mapPreviewBGColorRed = null
    mapPreviewBGColorGreen = null
    mapPreviewBGColorBlue = null
    mapPreviewGemGrabSpawnHoleExportName = null
    mapPreviewBallExportName = null
    mapPreviewGoal1ExportName = null
    mapPreviewGoal2ExportName = null
    mapPreviewSafeExportName = null
    mapPreviewCNOverrides = null

    constructor (row, table) {
        super(row, table)
    }

    createReferences () {
        super.createReferences()

        this.name = this.getStringValue("Name")
        this.tileSetPrefix = this.getStringValue("TileSetPrefix")
        this.maskedEnvironmentSCW = this.getStringValue("MaskedEnvironmentSCW")
        this.blocking1SCW = this.getStringValue("Blocking1SCW")
        this.blocking1Mesh = this.getStringValue("Blocking1Mesh")
        this.blocking1AngleStep = this.getIntValue("Blocking1AngleStep")
        this.blocking2SCW = this.getStringValue("Blocking2SCW")
        this.blocking2Mesh = this.getStringValue("Blocking2Mesh")
        this.blocking2AngleStep = this.getIntValue("Blocking2AngleStep")
        this.blocking3SCW = this.getStringValue("Blocking3SCW")
        this.blocking3Mesh = this.getStringValue("Blocking3Mesh")
        this.blocking3AngleStep = this.getIntValue("Blocking3AngleStep")
        this.blocking4SCW = this.getStringValue("Blocking4SCW")
        this.blocking4Mesh = this.getStringValue("Blocking4Mesh")
        this.blocking4AngleStep = this.getIntValue("Blocking4AngleStep")
        this.respawningWallSCW = this.getStringValue("RespawningWallSCW")
        this.respawningWallMesh = this.getStringValue("RespawningWallMesh")
        this.respawningWallAngleStep = this.getIntValue("RespawningWallAngleStep")
        this.respawningForestSCW = this.getStringValue("RespawningForestSCW")
        this.forestSCW = this.getStringValue("ForestSCW")
        this.destructableSCW = this.getStringValue("DestructableSCW")
        this.destructableMesh = this.getStringValue("DestructableMesh")
        this.destructableAngleStep = this.getIntValue("DestructableAngleStep")
        this.destructableSCW_CN = this.getStringValue("DestructableSCW_CN")
        this.destructableMesh_CN = this.getStringValue("DestructableMesh_CN")
        this.destructableAngleStep_CN = this.getIntValue("DestructableAngleStep_CN")
        this.fragileSCW = this.getStringValue("FragileSCW")
        this.fragileMesh = this.getStringValue("FragileMesh")
        this.fragileAngleStep = this.getIntValue("FragileAngleStep")
        this.fragileSCW_CN = this.getStringValue("FragileSCW_CN")
        this.fragileMesh_CN = this.getStringValue("FragileMesh_CN")
        this.fragileAngleStep_CN = this.getIntValue("FragileAngleStep_CN")
        this.waterTileSCW = this.getStringValue("WaterTileSCW")
        this.fenceSCW = this.getStringValue("FenceSCW")
        this.ropeFenceSCW = this.getStringValue("RopeFenceSCW")
        this.roadSCW = this.getStringValue("RoadSCW")
        this.indestructibleSCW = this.getStringValue("IndestructibleSCW")
        this.indestructibleMesh = this.getStringValue("IndestructibleMesh")
        this.benchSCW = this.getStringValue("BenchSCW")
        this.groundFillerSCW = this.getStringValue("GroundFillerSCW")
        this.laserBallSkinOverride = this.getStringValue("LaserBallSkinOverride")
        this.mineGemSpawnSCWOverride = this.getStringValue("MineGemSpawnSCWOverride")
        this.lootBoxSkinOverride = this.getStringValue("LootBoxSkinOverride")
        this.safeSkinOverride = this.getStringValue("SafeSkinOverride")
        this.showdownBoostSCWOverride = this.getStringValue("ShowdownBoostSCWOverride")
        this.mapPreviewBGColorRed = this.getIntValue("MapPreviewBGColorRed")
        this.mapPreviewBGColorGreen = this.getIntValue("MapPreviewBGColorGreen")
        this.mapPreviewBGColorBlue = this.getIntValue("MapPreviewBGColorBlue")
        this.mapPreviewGemGrabSpawnHoleExportName = this.getStringValue("MapPreviewGemGrabSpawnHoleExportName")
        this.mapPreviewBallExportName = this.getStringValue("MapPreviewBallExportName")
        this.mapPreviewGoal1ExportName = this.getStringValue("MapPreviewGoal1ExportName")
        this.mapPreviewGoal2ExportName = this.getStringValue("MapPreviewGoal2ExportName")
        this.mapPreviewSafeExportName = this.getStringValue("MapPreviewSafeExportName")
        this.mapPreviewCNOverrides = this.getStringValue("MapPreviewCNOverrides")
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

module.exports = LogicLocationThemeData
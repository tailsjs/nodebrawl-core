const LogicData = require("../LogicData")

class LogicThemeData extends LogicData {
    name = null
    fileName = null
    exportName = null
    particleFileName = null
    particleExportName = null
    particleStyle = null
    particleVariations = null
    themeMusic = null
    useInLevelSelection = null

    constructor (row, table) {
        super(row, table)
    }

    createReferences () {
        super.createReferences()

        this.name = this.getStringValue("Name")
        this.fileName = this.getStringValue("FileName")
        this.exportName = this.getStringValue("ExportName")
        this.particleFileName = this.getStringValue("ParticleFileName")
        this.particleExportName = this.getStringValue("ParticleExportName")
        this.particleStyle = this.getStringValue("ParticleStyle")
        this.particleVariations = this.getIntValue("ParticleVariations")
        this.themeMusic = this.getStringValue("ThemeMusic")
        this.useInLevelSelection = this.getBoolValue("UseInLevelSelection")
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

module.exports = LogicThemeData
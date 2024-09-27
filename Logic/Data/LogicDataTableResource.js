class LogicDataTableResource {
    fileName = ""
    tableIndex = 0
    type = 0
    
    constructor (fileName, tableIndex, type) {
        this.fileName = fileName
        this.tableIndex = tableIndex
        this.type = type
    }

    getFileName () {
        return this.fileName
    }

    getTableType () {
        return this.type
    }

    getTableIndex () {
        return this.tableIndex
    }
}

module.exports = LogicDataTableResource
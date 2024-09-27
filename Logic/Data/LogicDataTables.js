const LogicData = require('./LogicData')
const LogicDataTable = require('./LogicDataTable')

const LogicDataType = LogicData.LogicDataType

class LogicDataTables {
    static TABLE_COUNT = 52

    static tables = []

    static initDataTables (node, index) {
        if (index <= this.TABLE_COUNT) {
            const table = node.getTable()

            if (!table) {
                const fileName = node.getFileName()
                Err(`Unable to find table from ${fileName}`)
            }

            if (LogicDataTables.tables[index]) {
                LogicDataTables.tables[index].setTable(table)
            } else {
                switch (index) {
                    case LogicDataType.GLOBALS:
                        const LogicGlobals = require('./Tables/LogicGlobals')

                        LogicDataTables.tables[index] = new LogicGlobals(table, index)
                    break;
                    case LogicDataType.CLIENT_GLOBALS:
                        const LogicClientGlobals = require('./Tables/LogicClientGlobals')

                        LogicDataTables.tables[index] = new LogicClientGlobals(table, index)
                    default:
                        LogicDataTables.tables[index] = new LogicDataTable(table, index)
                }
            }
        }

    }

    static createReferences () {
        for (let i = 0; i < this.tables.length; i++) {
            if (LogicDataTables.tables[i]) {
                LogicDataTables.tables[i].createReferences()
            }
        }

        for (let i = 0; i < this.tables.length; i++) {
            if (LogicDataTables.tables[i]) {
                LogicDataTables.tables[i].createReferences2()
            }
        }
    }

    static getDataByName (name, tableId) {
        if (LogicDataTables.tables[tableId]) {
            return LogicDataTables.tables[tableId].getDataByName(name)
        }

        return null
    }

    static getGlobalByName (name) {
        return this.getDataByName(name, LogicDataType.GLOBALS)
    }

    static getClientGlobalByName (name) {
        return this.getDataByName(name, LogicDataType.CLIENT_GLOBALS)
    }

    static getGlobals () {
        return LogicDataTables.tables[LogicDataType.GLOBALS]
    }

    static getCharactersData () {
        return LogicDataTables.tables[LogicDataType.CHARACTERS]
    }

    static getCharacterDataByIndex (index) {
        return LogicDataTables.getCharactersData().items[index]
    }

    static getLocaleData () {
        return LogicDataTables.tables[LogicDataType.LOCALES]
    }
      
    static getLocaleDataByIndex (index) {
      return LogicDataTables.getLocaleData().items[index]
    }
}

module.exports = LogicDataTables
const CSVTable = require("./CSVTable.js")

class CSVNode {
    fileName = ""
    table = null;

    constructor (lines, fileName) {
        this.fileName = fileName
        this.load(lines)
    }

    load (lines) {
        this.table = new CSVTable(this, lines.length)

        if (lines.length > 2) {
            const columnNames = this.parseLine(lines[0])
            const columnTypes = this.parseLine(lines[1])

            for (let i = 0; i < columnNames.length; i++) {
                this.table.addColumn(columnNames[i])
            }

            for (let i = 0; i < columnTypes.length; i++) {
                const type = columnTypes[i].toLowerCase()
                let columnType = -1

                if (type !== null && type.length > 0) {
                    switch (type) {
                        case "string":
                        case "stringarray":
                            columnType = 0
                            break
                        case "number":
                        case "int":
                        case "intarray":
                            columnType = 1
                            break
                        case "boolean":
                            columnType = 2
                            break
                        default:
                            Err(`CSVNode.load: Invalid column type '${type}', column name ${columnNames[i]}, file ${this.fileName}. Expecting: int/string/boolean. Got: '${type}'`)
                    }
                }

                this.table.addColumnType(columnType)
            }

            this.table.validateColumnTypes()

            if (lines.length > 2) {
                for (let i = 2; i < lines.length; i++) {
                    const values = this.parseLine(lines[i])

                    if (values.length > 0) {
                        if (values[0] !== null && values[0].length > 0) {
                            this.table.createRow()
                        }

                        for (let j = 0; j < values.length; j++) {
                            this.table.addAndConvertValue(values[j], j)
                        }
                    }
                }
            } 
        }
    }

    parseLine (line) {
        let inQuote = false
        let readField = ""

        let fields = []

        for (let i = 0; i < line.length; i++) {
            const currentChar = line[i];

            if (currentChar === '"') {
                if (inQuote) {
                    if (i + 1 < line.length && line[i + 1] === '"') {
                        readField += '"'
                    } else {
                        inQuote = false
                    }
                } else {
                    inQuote = true
                }
            } else if (currentChar === ',' && !inQuote) {
                fields.push(readField)
                readField = ""
            } else {
                readField += currentChar
            }
        }

        fields.push(readField.replace("\r", ""))

        return fields
    }

    getFileName () {
        return this.fileName
    }

    getTable () {
        return this.table
    }
}

module.exports = CSVNode
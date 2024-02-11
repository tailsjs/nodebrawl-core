const { parse } = require('csv-parse/sync')
const fs = require('fs')

/**
 * Parse CSV file
 * 
 * Y'know, it's easy. Don't need to write some complicated parsers. Right, Lwitchy?
 * 
 * @param { String } filename Your path to CSV file.
 * @returns { Object } Object with parsed data
 * @example
 * ```js
 * parse("../../GameAssets/csv_logic/example.csv") // Object with parsed CSV data.
 * ```
 */
function parse(filename){
    const input = fs.readFileSync(filename);

    const records = parse(input, {
        columns: true,
        skip_empty_lines: true
    });

    return records.slice(1);
}

module.exports = parse
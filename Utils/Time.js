const timeDefinitions = {
    "w": [ "weeks", "week", "w" ],
    "d": [ "days", "day", "d" ],
    "h": [ "hours", "hour", "hrs", "hr", "h" ],
    "m": [ "minutes", "minute", 'mins', 'min', "m" ],
    "s": [ "seconds", "second", "secs", "sec", "s" ],
    "ms": [ "milliseconds", "millisecond", "ms" ]
}

/**
 * Parse time from string periods
 * 
 * @param { String } stringTime Time in string 
 * @returns Timestamp
 * @example
 * ```js
 * parseTime("1 week, 2d, 3hours, 4 minutes, 5sec") // 788645000
 * ```
 */
function parseTime(stringTime) {
    const time = stringTime.split(", ");
    let result = 0;

    for(let period of time) {
        const numbers = period.match(/\d+/g);
        let unit = period.replace(/\d+/g, "").trim().toLowerCase();

        if (!unit) unit = "s";

        if(!numbers) continue;

        let parsedDef = "";

        for(let key in timeDefinitions) {
            if(timeDefinitions[key].includes(unit)) {
                parsedDef = key;
                break;
            }
        }

        const number = parseInt(numbers[0]);

        switch(parsedDef) {
            case "w":
                result += number * 604800;
                break;
            case "d":
                result += number * 86400;
                break;
            case "h":
                result += number * 3600;
                break;
            case "m":
                result += number * 60;
                break;
            case "s":
                result += number;
                break;
            case "ms":
                result += number / 1000;
                break;
        }
    }

    return result * 1000;
}

/**
 * Checks if time passed
 * 
 * @param { Number } time Timestamp
 * @param { Number | String } unit Timestamp or Period
 * @returns If time passed
 * @example
 * ```js
 * hasBeenPassed(Date.now() - 6000, "5s") // true
 * hasBeenPassed(Date.now() + 10000, 15000) // false
 * ```
 */
function hasBeenPassed(time, unit) {
    if (typeof unit === "string") {
        unit = parseTime(unit);
    }

    return difference(Date.now(), time) > unit
}

/**
 * Add to your time some time.
 * @param { Number } time Your time
 * @param { Number | String } unit Timestamp or Period
 * @returns Your time + time to add
 * @example
 * ```js
 * addToTime(60000, "5s") // 65000
 * ```
 */
function addToTime(time, unit) {
    if (typeof unit === "string") { // In case we got period
        unit = parseTime(unit);
    }

    return time + unit
}

/**
 * Add to Date.now() some time.
 * @param { Number | String } unit Timestamp or Period
 * @returns Date.now() + time
 * @example
 * ```js
 * addToNowTime("5s") // Date.now() + 5000
 * ```
 */
function addToNowTime(unit) {
    if (typeof unit === "string") {
        unit = parseTime(unit);
    }

    return Date.now() + unit
}

/**
 * Difference between two timestamps
 * @param { Number } time Timestamp 1
 * @param { Number } diffTime Timestamp 2
 * @returns timestamp 1 - timestamp 2
 * @example
 * ```js
 * difference(Date.now(), Date.now() - 6000) // 6000 (or 5999, if you lucky enough.)
 * ```
 */
function difference(time, diffTime) {
    return time - diffTime
}

module.exports = {
    parseTime,
    hasBeenPassed,
    addToTime,
    addToNowTime,
    difference
}
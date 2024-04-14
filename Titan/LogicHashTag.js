const LogicLong = require("./LogicLong")

/**
 * LogicHashTag
 * 
 * Class for working with hash tags (#2PP)
 */
class LogicHashTag {
    /* Hash tag chars */
    static chars = ["0", "2", "8", "9", "P", "Y", "L", "Q", "G", "R", "J", "C", "U", "V"]
    static clanChars = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z', 'C', 'V', 'B', 'N', 'M', '2', '3', '4', '5', '6', '7', '8', '9']

    /**
     * Turning user hash tag into LogicLong
     * @param { String } tag User hash tag
     * @returns { LogicLong } LogicLong class instance with filled high/low ints
     */
    static getId (tag) {
        const selectedChars = tag.startsWith("X") ? this.clanChars : this.chars

        if(tag.startsWith("X") || tag.startsWith("#")) {
            tag = tag.slice(1)
        }

        tag = tag.toUpperCase().split("")
        let id = 0

        for (const symb of tag) {
            let charIndex = selectedChars.indexOf(symb)

            if (charIndex == -1) {
                console.error(`Invalid Tag! Tags can only contain the following characters: ${selectedChars.join(", ")}`);
                return new LogicLong(-1, -1)
            }

            id *= selectedChars.length
            id += charIndex
        }

        const highId = id % 256
        const lowId = ((id - highId) / 256) // huh?

        return new LogicLong(highId, lowId)
    }

    /**
     * Turning LogicLong into user hash tag
     * @param { LogicLong } logicLong LogicLong class instance
     * @param { Boolean } isClanSymbols Use clan symbols instead of default
     * @returns { String } User hash tag
     */
    static getTag (logicLong, isClanSymbols = false) {
        const selectedChars = isClanSymbols ? this.clanChars : this.chars
        let id = logicLong.high + logicLong.low * 256;
        let tag = "";
    
        while (id > 0) {
            const remainder = id % selectedChars.length;
            tag = selectedChars[remainder] + tag;
            id = (id - remainder) / selectedChars.length;
        }
    
        return `#${tag}`;
    }
}

module.exports = LogicHashTag
const JSRandom = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

const generateRandomArray = (length) => {
    const array = []

    for (let i = 0; i < length; i++) {
        array.push(JSRandom(0, 255))
    }

    return array
}

const LETTERS = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890"

const generateRandomString = (length) => generateRandomArray(length).map(e => LETTERS[JSRandom(0, LETTERS.length - 1)]).join("")

const generateRandomBytes = (length) => Buffer.alloc(length).map(() => JSRandom(0, 255))

const getRandomElementFromArray = (array) => array[JSRandom(0, array.length - 1)]

module.exports = {
    JSRandom,
    generateRandomArray,
    generateRandomString,
    generateRandomBytes,
    getRandomElementFromArray
}
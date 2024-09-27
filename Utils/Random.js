const JSRandom = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

const generateRandomArray = (length) => {
    const array = []

    for (let i = 0; i < length; i++) {
        array.push(JSRandom(0, 255))
    }

    return array
}

const generateRandomBytes = (length) => Buffer.alloc(length).map(() => JSRandom(0, 255))

module.exports = {
    JSRandom,
    generateRandomArray,
    generateRandomBytes
}
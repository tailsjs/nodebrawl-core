const LogicMersenneTwisterRandom = require("./Titan/Random/LogicMersenneTwisterRandom")
const seed = 1488
const random = new LogicMersenneTwisterRandom(seed)
console.log(random.rand(98))
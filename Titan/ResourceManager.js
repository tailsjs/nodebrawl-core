const LogicResources = require("../Logic/Data/LogicResources")
const CSVNode = require("./CSV/CSVNode")
const fs = require("node:fs")
const path = require("node:path")

class ResourceManager {
    static init () {
        ResourceManager.loadResources()
    }

    static loadResources () {
        const resources = LogicResources.createDataTableResourcesArray()

        for (let i = 0; i < resources.length; i++) {
            const resource = resources[i]

            const fileName = resource.getFileName()

            const content = ResourceManager.loadResourceContent(fileName)

            if (content !== null) {
                const node = new CSVNode(content.split("\n"), fileName)
                LogicResources.load(resources, i, node)
            } else {
                Err(`ResourceManager.loadResources: file ${fileName} not exist.`)
            }
        }
    }

    static loadResourceContent (file) {
        try {
            const content = fs.readFileSync(path.join(__dirname.replace("/Titan", ""), "GameAssets", file))

            return content.toString()
        } catch (e) {
            return null
        }
    }
}

module.exports = ResourceManager
const Koa = require("koa")
const KoaRange = require("koa-range")
const path = require("node:path")
const glob = require("glob")
const fs = require("fs")
const sha1 = require("js-sha1")
const LogicVersion = require("../Logic/LogicVersion")
const { patcher } = require("../config.json")

const getDirectories = (src, callback) => glob(src + '/**/*', callback)
const app = new Koa()

app.use(KoaRange)

class Patcher {
    constructor () {
        this.files = {}
        this.fingerprint = {
            files: [],
            sha: "",
            version: LogicVersion.getVersionString()
        }
    }

    async start() {
        this.cacheFiles()

        app.use(async (ctx) => {
            const filePath = ctx.path
            const filePathSplit = filePath.split("/")

            filePathSplit.shift()

            if (filePathSplit[0] != this.fingerprint.sha) return ctx.body = "Invalid fingerprint"

            if (filePathSplit[1] == "fingerprint.json") return ctx.body = JSON.stringify(this.fingerprint)

            let requestedFile = filePathSplit
            requestedFile.shift()
            requestedFile = requestedFile.join("/")

            if (!this.files[requestedFile]) return ctx.body = "File not found"

            ctx.body = this.files[requestedFile]
        })

        ServerLog(`Patcher started on ${patcher.port} port!`)
        app.listen(patcher.port)
    }

    cacheFiles () {
        const dirName = __dirname.replace("\\Patcher", "")
        getDirectories(path.join(dirName, "GameAssets"), (err, res) => {
            if (err) return console.log(err)
            
            for (const file of res) {
                if (file.includes("fingerprint") || this.isDirectory(file)) continue;

                const data = fs.readFileSync(file)
                const hash = sha1(data)
                const filePath = path.relative(dirName, file).replace("GameAssets\\", "").replaceAll("\\", "/")

                this.files[filePath] = data.toString()
                this.fingerprint.files.push({
                    file: filePath.replaceAll("/", "\\/"),
                    sha: hash
                })
            }
            
            this.fingerprint.sha = sha1(JSON.stringify(this.fingerprint.files) + patcher.version)

            fs.writeFileSync(path.join(__dirname, "fingerprint.json"), JSON.stringify(this.fingerprint))
        })
    }

    isDirectory (file) {
        return fs.statSync(file).isDirectory()
    }
}

module.exports = Patcher
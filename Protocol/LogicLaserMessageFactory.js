const path = require("node:path")
const glob = require("glob")

const getDirectories = (src, callback) => glob(src + '/**/*', callback);

class LogicLaserMessageFactory {
    static messages = {}
    static messagesList = []

    static loadMessages () {
        getDirectories(path.join(__dirname, "Messages", "Client"), (err, res) => {
            if (err) Err(err) // err
            const files = res.filter(e => e.endsWith(".js"))
      
            for (const file of files) {
              try{
                const Message = require("./" + path.relative(__dirname, file).replaceAll("\\", "/"))
                const MessageInstance = new Message()
      
                this.messages[MessageInstance.id] = Message
              }catch(err){
                Err(`A wild error while initializing "${file.split("/").slice(-1)}" message!`)
                console.log(err)
              }
            }

            this.messagesList = Object.keys(this.messages).map(e => Number(e))
        })
    }

    /**
     * Get message class
     * @param { Number } id Message ID
     * @returns { Class } Message class
     * @example
     *   const NonExistMessage = MessageFactory.getMessage(1) // null
     *   const ClientHelloMessage = MessageFactory.getMessage(10100) // ClientHelloMessage class
     */
    static createMessageByType (id) {
        return this.messages[id] ? this.messages[id] : null
    }
}

module.exports = LogicLaserMessageFactory
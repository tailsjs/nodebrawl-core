const path = require("node:path")
const glob = require("glob")

const getDirectories = (src, callback) => glob(src + '/**/*', callback);

class MessageFactory {
  constructor () {
    this.messages = {}
    this.messagesList = []

    getDirectories(path.join(__dirname, "Messages", "Client"), (err, res) => {
      if (err) Err(err) // err
      const files = res.filter(e => e.endsWith(".js"))

      for (const file of files) {
        try{
          const Message = require("./" + path.relative(__dirname, file).replaceAll("\\", "/"))
          const MessageInstance = new Message()

          this.messages[MessageInstance.id] = Message
          this.messagesList.push(MessageInstance.id)
        }catch(err){
          Err(`A wild error while initializing "${file.split("/").slice(-1)}" message!`)
          console.log(err)
        }
      }
    })
  }
  /**
   * Get all packets
   * @returns { Object } Packets object
   */
  getAllMessages () {
    return this.packets
  }

  /**
   * Get message class
   * @param { Number } id Message ID
   * @returns { Class } Message class
   * @example
   *   const NonExistMessage = MessageFactory.getMessage(1) // null
   *   const ClientHelloMessage = MessageFactory.getMessage(10100) // ClientHelloMessage class
   */
  getMessage (id) {
    return this.messagesList.includes(id) ? this.messages[id] : null
  }
}

module.exports = MessageFactory

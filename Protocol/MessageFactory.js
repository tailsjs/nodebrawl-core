const fs = require('fs')
const path = require("node:path")

class MessageFactory {
  constructor () {
    this.packets = {}

    fs.readdir(path.join(__dirname, "Messages", "Client"), (err, files) => {
      if (err)console.log(err)
      files.forEach(e => {
        try{
          const Packet = require(`./Messages/Client/${e.replace('.js', '')}`)
          const packetClass = new Packet()

          this.packets[packetClass.id] = Packet
        }catch(err){
          Err(`A wild error while initializing "${e.replace(".js", "")}" packet!`)
          console.log(err)
        }
      })
    })
  }
  /**
   * Get all packets
   * @returns { Object } Packets object
   */
  getAllPackets () {
    return this.packets
  }
}

module.exports = MessageFactory

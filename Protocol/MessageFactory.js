const fs = require('fs')

class MessageFactory {
  constructor () {
    this.packets = {}

    fs.readdir('./Protocol/Messages/Client', (err, files) => {
      if (err)console.log(err)
      files.forEach(e => {
        const Packet = require(`./Messages/Client/${e.replace('.js', '')}`)
        const packetClass = new Packet()

        this.packets[packetClass.id] = Packet
      })
    })
  }

  handle (id) {
    return this.packets[id]
  };

  getPackets () {
    return Object.keys(this.packets)
  }
}

module.exports = MessageFactory

const PiranhaMessage = require('../../PiranhaMessage')

class ServerHelloMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 20100
    this.client = client
    this.version = 0
  }

  async encode () {
    this.writeInt(24)
    for (let i = 0; i < 24; i++)
    { this.writeByte(1) }
  }
}

module.exports = ServerHelloMessage

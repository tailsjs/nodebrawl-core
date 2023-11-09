const PiranhaMessage = require('../../../PiranhaMessage')
const ByteStream = require("../../../../ByteStream")

class ServerHelloMessage extends PiranhaMessage {
  constructor (session) {
    super(session)
    this.id = 20100
    this.session = session
    this.version = 0
    this.stream = new ByteStream()
  }

  async encode () {
    this.stream.writeInt(24)
    for (let i = 0; i < 24; i++)
    { this.stream.writeByte(1) }
  }
}

module.exports = ServerHelloMessage

const PiranhaMessage = require('../../../PiranhaMessage')

class ServerHelloMessage extends PiranhaMessage {
  constructor (session) {
    super(session)
    this.id = 20100
    this.version = 0
    this.stream = this.DataStream.getByteStream();
  }

  async encode () {
    this.stream.writeInt(24)
    for (let i = 0; i < 24; i++)
    { this.stream.writeByte(1) }
  }
}

module.exports = ServerHelloMessage

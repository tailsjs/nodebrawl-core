const PiranhaMessage = require('../../../PiranhaMessage') // You should change it if you transfer this file in another subdirectory
const ServerHelloMessage = require('../../Server/Auth/ServerHelloMessage')

class ClientHelloMessage extends PiranhaMessage {
  constructor (bytes, session) {
    super(session)
    this.id = 10100
    this.version = 0
    this.stream = this.DataStream.getByteStream(bytes);
  }

  async decode () {
    this.stream.readInt()
  }

  async process () {
    await new ServerHelloMessage(this.session).send()
  }
}

module.exports = ClientHelloMessage

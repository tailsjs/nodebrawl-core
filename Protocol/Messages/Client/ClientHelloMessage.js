const PiranhaMessage = require('../../PiranhaMessage')
const ServerHelloMessage = require('../Server/ServerHelloMessage')

class ClientHelloMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 10100
    this.version = 0
  }

  async decode () {
    // this.readInt()
  }

  async process () {
    await new ServerHelloMessage(this.client).send()
  }
}

module.exports = ClientHelloMessage

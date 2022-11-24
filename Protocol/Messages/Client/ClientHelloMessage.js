const PiranhaMessage = require('../../PiranhaMessage')
const ServerHelloMessage = require('../Server/ServerHelloMessage')

class ClientHelloMessage extends PiranhaMessage {
  constructor (client, bytes) {
    super(bytes)
    this.client = client
    this.id = 10100
    this.version = 0
  }

  decode () {
    // this.readInt()
  }

  process () {
    new ServerHelloMessage(this.client).send()
  }
}

module.exports = ClientHelloMessage

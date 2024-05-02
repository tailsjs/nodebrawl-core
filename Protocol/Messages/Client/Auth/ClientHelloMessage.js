const PiranhaMessage = require('../../../PiranhaMessage') // You should change it if you transfer this file in another subdirectory
const ServerHelloMessage = require('../../Server/Auth/ServerHelloMessage')

class ClientHelloMessage extends PiranhaMessage {
  constructor (bytes, session) {
    super(session)
    this.id = 10100
    this.version = 0
    this.stream = this.DataStream.getByteStream(bytes)
  }

  async decode () {
    this.protocol = this.stream.readInt()
    this.keyVersion = this.stream.readInt()
    this.major = this.stream.readInt()
    this.minor = this.stream.readInt()
    this.build = this.stream.readInt()
    this.fingerprint = this.stream.readString()
    this.deviceType = this.stream.readInt()
    this.appStore = this.stream.readInt()
  }

  async process () {
    await new ServerHelloMessage(this.session).send()
  }
}

module.exports = ClientHelloMessage

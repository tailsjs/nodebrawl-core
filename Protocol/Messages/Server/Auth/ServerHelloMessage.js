const CRYPTO_TYPES = require('../../../../Titan/Enums/CryptoTypes')
const PiranhaMessage = require('../../../PiranhaMessage')

class ServerHelloMessage extends PiranhaMessage {
  constructor (session) {
    super(session)
    this.id = 20100
    this.version = 0
    this.stream = this.DataStream.getByteStream()
  }

  async encode () {
    if (this.session.crypto === null || this.session.crypto.cryptoType !== CRYPTO_TYPES.PEPPER) {
      this.stream.writeBytes(Buffer.from([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]))
      return
    }

    const nonce = Buffer.from(this.session.crypto.crypto.client_nonce.bytes())
    this.stream.writeBytes(nonce)
  }
}

module.exports = ServerHelloMessage

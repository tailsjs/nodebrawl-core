const CRYPTO_TYPES = require('../../../../Titan/Enums/CryptoTypes')
const PiranhaMessage = require('../../../PiranhaMessage')
const { generateRandomBytes } = require('../../../../Utils/Random')

class ServerHelloMessage extends PiranhaMessage {
  constructor (session) {
    super(session)
    this.id = 20100
    this.version = 0
    this.stream = this.DataStream.getByteStream()
  }

  async encode () {
    if (this.session.crypto === null || this.session.crypto.cryptoType !== CRYPTO_TYPES.PEPPER) {
      this.stream.writeBytes(Buffer.alloc(24).map(() => 0x00))
      return
    }

    const randomBytes = generateRandomBytes(24)

    this.stream.writeBytes(randomBytes)
  }
}

module.exports = ServerHelloMessage

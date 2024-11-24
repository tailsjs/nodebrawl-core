const PiranhaMessage = require('../../../PiranhaMessage') // You should change it if you transfer this file in another subdirectory
const ServerHelloMessage = require('../../Server/Auth/ServerHelloMessage')
const LoginFailedMessage = require('../../Server/Auth/LoginFailedMessage')
const fingerprint = require("../../../../Patcher/fingerprint.json")
const { patcher } = require("../../../../Logic/Server/LogicConfig")
const LOGIN_FAILED_REASON = require("../../../../Titan/Enums/LoginFailedReason")
const LogicVersion = require("../../../../Logic/LogicVersion")

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
    this.fingerprintSha = this.stream.readString()
    this.deviceType = this.stream.readInt()
    this.appStore = this.stream.readInt()
  }

  async execute () {
    if (patcher.enabled && this.fingerprintSha != fingerprint.sha) {
      const LoginFailed = new LoginFailedMessage(this.session)
      LoginFailed.errorCode = LOGIN_FAILED_REASON.PATCH
      LoginFailed.contentUri = patcher.uri + (patcher.port != 80 ? ":" + patcher.port : "")
      LoginFailed.fingerprint = JSON.stringify(fingerprint)
      return LoginFailed.send(true)
    }

    if (this.major != LogicVersion.major) {
      const LoginFailed = new LoginFailedMessage(this.session)
      LoginFailed.errorCode = LOGIN_FAILED_REASON.UPDATE
      LoginFailed.updateUri = "https://github.com/tailsjs/nodebrawl-core"
      LoginFailed.reason = "Update required to continue playing."
      return LoginFailed.send(true)
    }

    await new ServerHelloMessage(this.session).send()
  }
}

module.exports = ClientHelloMessage

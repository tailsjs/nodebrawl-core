const PiranhaMessage = require('../../../PiranhaMessage')
const LOGIN_FAILED_REASON = require("../../../../Titan/Enums/LoginFailedReason")

class LoginFailedMessage extends PiranhaMessage {
  errorCode = LOGIN_FAILED_REASON.CUSTOM
  redirectUri = ""
  contentUri = ""
  updateUri = ""
  reason = ""
  maintenanceTime = 0

  constructor (session) {
    super(session)
    this.id = 20103
    this.version = 0
    this.stream = this.DataStream.getByteStream()
  }

  async encode () {
    this.stream.writeInt(this.errorCode)
    this.stream.writeString() // Finger
    this.stream.writeString(this.redirectUri)
    this.stream.writeString(this.contentUri)
    this.stream.writeString(this.updateUri)
    this.stream.writeString(this.reason)
    this.stream.writeVInt(this.maintenanceTime)
  }
}

module.exports = LoginFailedMessage

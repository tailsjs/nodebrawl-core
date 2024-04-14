const Messaging = require("../Networking/Messaging")
const DataStream = require("../Titan/DataStream")

/**
  * PiranhaMessage
  * 
  * A main class for packets.
 */
class PiranhaMessage extends Messaging {
  /**
   * PiranhaMessage
   * 
   * A main class for packets.
   * 
   * @param { Session } session User session (`this.session`)
   */
  constructor (session) {
    super(session)
    this.DataStream = DataStream
    /**
     * Message ID.
     * @type { Number } Message ID
     */
    this.id = 0
    /**
     * Session variable.
     * @type { Session } User session
     */
    this.session = session
    /**
     * Message version.
     * @type { Number } Message version
     */
    this.version = 0
    /**
     * ByteStream class instance.
     * @type { ByteStream } ByteStream class instance
     */
    this.stream = DataStream.getByteStream()
  }

  /**
   * Encode function for server messages.
   * 
   * Need to use `write` functions
   */
  encode () {

  };

  /**
   * Decode function for client messages.
   * 
   * Need to use `read` functions
   */
  decode () {

  };

  /**
   * Process function for client messages.
   * 
   * Your code here.
   */
  process () {

  }
}

module.exports = PiranhaMessage

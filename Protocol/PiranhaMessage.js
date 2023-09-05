const Messaging = require("../Networking/Messaging")

/**
  * PiranhaMessage
  * 
  * A main handler of packets.
 */
class PiranhaMessage extends Messaging {
  /**
   * PiranhaMessage
   * 
   * A main handler of packets.
   * 
   * @param { Session } session User session (this.session)
   */
  constructor (session) {
    super(session)
    /**
     * Packet ID.
     */
    this.id = 0
    /**
     * Client variable.
     */
    this.client = null
    /**
     * Packet version.
     */
    this.version = 0
    /**
     * ByteStream class.
     */
    this.stream = null
  }

  /**
   * Encode function for server packets.
   * 
   * Need to use `write` functions
   */
  encode () {

  };

  /**
   * Decode function for client packets.
   * 
   * Need to use `read` functions
   */
  decode () {

  };

  /**
   * Process function for client packets.
   * 
   * Your code here.
   */
  process () {

  }
}

module.exports = PiranhaMessage

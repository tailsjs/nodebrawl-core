const ByteStream = require('../ByteStream')

/**
  * PiranhaMessage
  * 
  * A main handler of packets.
 */
class PiranhaMessage extends ByteStream {
  /**
   * PiranhaMessage
   * 
   * A main handler of packets.
   * 
   * @param { Buffer } bytes Bytes
   */
  constructor (bytes) {
    super(bytes)
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

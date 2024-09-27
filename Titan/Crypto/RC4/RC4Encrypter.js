const RC4 = require('simple-rc4');
const LogicConfig = require('../../../Logic/Server/LogicConfig');

/**
 * RC4Encrypter.
 * 
 * Decoding and encoding packets with RC4 crypto.
 */
class RC4Encrypter {
  constructor () {
      this.key = Buffer.from(LogicConfig.crypto.rc4.key);
      this.nonce = Buffer.from(LogicConfig.crypto.rc4.nonce);
      this.encryptStream = new RC4(Buffer.concat([this.key, this.nonce]));
      this.encryptStream.update(Buffer.concat([this.key, this.nonce]));
      this.decryptStream =  new RC4(Buffer.concat([this.key, this.nonce]));
      this.decryptStream.update(Buffer.concat([this.key, this.nonce]));
  }

  /**
   * Decrypting packet bytes
   * @param { Buffer } bytes Encrypted packet bytes
   * @returns { Buffer } Decrypted packet bytes
   */
  decrypt (bytes) {
      const decryptedData = this.decryptStream.update(bytes);
      return decryptedData;
  }

  /**
   * Encrypting packet bytes
   * @param { Buffer } bytes Decrypted packet bytes
   * @returns { Buffer } Encrypted packet bytes
   */
  encrypt (bytes) {
      const encryptedData = this.encryptStream.update(bytes);
      return encryptedData;
  }
}

module.exports = RC4Encrypter
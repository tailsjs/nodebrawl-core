const RC4 = require('simple-rc4');

class CryptoRC4 {
  constructor(key, nonce) {
      this.key = Buffer.from(key);
      this.nonce = Buffer.from(nonce);
      this.encryptStream = new RC4(Buffer.concat([this.key, this.nonce]));
      this.encryptStream.update(Buffer.concat([this.key, this.nonce]));
      this.decryptStream =  new RC4(Buffer.concat([this.key, this.nonce]));
      this.decryptStream.update(Buffer.concat([this.key, this.nonce]));
  }

  decrypt(data) {
      const decryptedData = this.decryptStream.update(data);
      return decryptedData;
  }

  encrypt(data) {
      const encryptedData = this.encryptStream.update(data);
      return encryptedData;
  }
}

module.exports = CryptoRC4
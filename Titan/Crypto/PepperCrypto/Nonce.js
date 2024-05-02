const Blake2b = require("./blake2b"),
crypto = require("crypto");

module.exports = class {
    constructor(input) {
        if (!input) {
            this.nonce = new Uint8Array(crypto.randomBytes(24));
            return;
        }
        
        if (input.Keys) {
            let b2b = Blake2b.blake2bInit(24);
            if (input.nonce) {
                Blake2b.blake2bUpdate(b2b, input.nonce);
            }
            input.Keys.forEach(key => {
                Blake2b.blake2bUpdate(b2b, key);
            })
            this.nonce = Blake2b.blake2bFinal(b2b);
        } else if (input.nonce) {
            this.nonce = input.nonce;
        }
    }

    bytes() {
        return this.nonce;
    }
    
    increment() {
        let v8 = 2;
        let v10;
        for (var idx = 0; idx < 24; idx++) {
            v10 = v8 + (this.nonce[idx] & 0xFF);
            this.nonce[idx] = (v10 & 0xFF);
            v8 = parseInt(v10 / 0x100);
            if (v8 == 0) break;
        }
    }
}

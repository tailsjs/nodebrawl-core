class ByteArray {
    static bytesToString(arr) {
        let str = '';
        arr = new Uint8Array(arr);
        for (let i in arr) {
            str += String.fromCharCode(arr[i]);
        }
        return str;
    }

    static stringToBytes(str) {
        let ch, st, re = [];
        for (let i = 0; i < str.length; i++) {
            ch = str.charCodeAt(i);
            st = [];
            do {
                st.push(ch & 0xFF);
                ch = ch >> 8;
            }
            while (ch);
            re = re.concat(st.reverse());
        }
        return re;
    }
    
    static bytesToHex(arr) {
        let str = '';
        let k, j;
        for (let i = 0; i < arr.length; i++) {
            k = arr[i];
            j = k;
            if (k < 0) 
                j = k + 256;
            if (j < 16) 
                str += "0";
            str += j.toString(16);
        }
        return str;
    }

    static hexToBytes(str) {
        let pos = 0;
        let len = str.length;
        if (len % 2 != 0) 
            return null;
        len /= 2;
        let hexA = new Array();
        for (let i = 0; i < len; i++) {
            let s = str.substr(pos, 2);
            let v = parseInt(s, 16);
            hexA.push(v);
            pos += 2;
        }
        return hexA;
    }

    static arrayToBytes(arr) {
        let result = new Buffer.alloc(arr.length);

        for (let i = 0; i < data.length; i++) 
            result[i] = data[i];
        return result;
    }

    
    static intToBytes = function(x) {
        let bytes = new Buffer.alloc(4);
        bytes[0] = x;
        bytes[1] = x >> 8;
        bytes[2] = x >> 16;
        bytes[3] = x >> 24;
        return bytes;
    };

    static getInt(bytes) {

        if (bytes.length == 1) {
            return bytes[0];
        }

        if (bytes.length == 2) {
            return bytes[1] >> 8 | bytes[0];
        }

        if (bytes.length == 3) {
            return bytes[2] << 16 | bytes[1] << 8 | bytes[0];
        }

        if (bytes.length == 4) {
            return bytes[3] >> 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
        }
        else {
            return -1;
        }
    }
}

module.exports = ByteArray;
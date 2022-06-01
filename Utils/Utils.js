class Utils {
    static bytesToString(arr) {
        var str = '';
        arr = new Uint8Array(arr);
        for (var i in arr) {
            str += String.fromCharCode(arr[i]);
        }
        return str;
    }
    static stringToBytes(str) {
        var ch, st, re = [];
        for (var i = 0; i < str.length; i++) {
            ch = str.charCodeAt(i);
            st = [];
            do {
                st.push(ch & 0xFF);
                ch = ch >> 8;
            }
            while (ch);
            re = re.concat(st.reverse());
        }
        console.log(this.bytesToHex(re));
        return re;
    }
    static bytesToHex(arr) {
        var str = '';
        var k, j;
        for (var i = 0; i < arr.length; i++) {
            k = arr[i];
            j = k;
            if (k < 0) {
                j = k + 256;
            }
            if (j < 16) {
                str += "0";
            }
            str += j.toString(16);
        }
        return str;
    }
    static hexToBytes(str) {
        var pos = 0;
        var len = str.length;
        if (len % 2 != 0) {
            return null;
        }
        len /= 2;
        var hexA = new Array();
        for (var i = 0; i < len; i++) {
            var s = str.substr(pos, 2);
            var v = parseInt(s, 16);
            hexA.push(v);
            pos += 2;
        }
        return hexA;
    }
    static arrayToBytes(arr) {
        var result = new Buffer.alloc(arr.length);

        for (var i = 0; i < arr.length; i++) {
            result[i] = arr[i];
        }
        return result;
    }

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

    static getBytes(value) {
        var buffer = ByteBu
    }

    static intToBytes = function(x) {
        var bytes = new Buffer.alloc(4);
        bytes[0] = x;
        bytes[1] = x >> 8;
        bytes[2] = x >> 16;
        bytes[3] = x >> 24;
        return bytes;
    };
}

module.exports = Utils;
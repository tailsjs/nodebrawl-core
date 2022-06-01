class ByteArray {
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

    static arrayToBytes(arr) {
        result = new Buffer.alloc(arr.length);

        for (var i = 0; i < data.length; i++) {
            result[i] = data[i];
        }
        return result;
    }
}

module.exports = ByteArray;
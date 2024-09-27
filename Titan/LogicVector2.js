const LogicMath = require("./LogicMath")

class LogicVector2 {
    x = 0
    y = 0

    constructor (x, y) {
        this.x = x
        this.y = y
    }

    destruct () {
        this.x = 0
        this.y = 0
    }

    add (x, y) {
        this.x += x
        this.y += y
    }

    clone () {
        return new LogicVector2(this.x, this.y)
    }

    dot (vector) {
        return this.x * vector.x + this.y * vector.y
    }

    getAngle () {
        return LogicMath.getAngle(this.x, this.y)
    }

    getAngleBetween (x, y) {
        return LogicMath.getAngleBetween(LogicMath.getAngle(this.x, this.y), LogicMath.getAngle(x, y))
    }

    getDistanceSquared (vector) {
        const x = this.x - vector.x
        let distance = -1

        if (x + 46340 > 92680) return distance

        const y = this.y - vector.y

        if (y + 46340 > 92680) return distance

        const distanceX = x * x
        const distanceY = y * y

        if (distanceY < (distanceX ^ -1)) {
            distance = distanceX + distanceY
        } 

        return distance
    }

    getDistanceSquaredTo (x, y) {
        let distance = -1

        x -= this.x

        if (x + 46340 > 92680) return distance

        y -= this.y

        if (y + 46340 > 92680) return distance

        const distanceX = x * x
        const distanceY = y * y

        if (distanceY < (distanceX ^ -1)) {
            distance = distanceX + distanceY
        } 

        return distance
    }

    getLength () {
        let length = -1

        if (46340 - this.x > 92680 || 46340 - this.y > 92680) return LogicMath.sqrt(length)

        const lengthX = this.x * this.x
        const lengthY = this.y * this.y

        if (lengthY < (lengthX ^ -1)) {
            length = lengthX + lengthY
        }

        return length
    }

    getLengthSquared () {
        let length = -1

        if (46340 - this.x > 92680 || 46340 - this.y > 92680) return length

        const lengthX = this.x * this.x
        const lengthY = this.y * this.y

        if (lengthY < (lengthX ^ -1)) {
            length = lengthX + lengthY
        }

        return length
    }

    isEqual (vector) {
        return this.x === vector.x && this.y === vector.y
    }

    isInArea (minX, minY, maxX, maxY) {
        if (this.x >= minX && this.y >= minY) {
            return this.x < minX + maxX && this.y < maxY + minY
        }

        return false
    }

    multiply (vector) {
        this.x *= vector.x
        this.y *= vector.y
    }

    normalize (value) {
        const length = this.getLength()

        if (LogicMath.abs(length) === 0) return length

        this.x = this.x * value / length
        this.y = this.y * value / length

        return length
    }

    rotate (degrees) {
        this.x = LogicMath.getRotatedX(this.x, this.y, degrees)
        this.y = LogicMath.getRotatedY(this.x, this.y, degrees)
    }

    getX () {
        return this.x
    }

    getY () {
        return this.y
    }

    set (x, y) {
        if (x instanceof LogicVector2) {
            this.x = x.x
            this.y = x.y
        } else {
            this.x = x
            this.y = y
        }
    }

    substract (vector) {
        this.x -= vector.x
        this.y -= vector.y
    }

    encode (stream) {
        stream.writeInt(this.x)
        stream.writeInt(this.y)
    }

    decode (stream) {
        this.x = stream.readInt()
        this.y = stream.readInt()
    }

    toString () {
        return `LogicVector2(${this.x}, ${this.y})`
    }
}

module.exports = LogicVector2
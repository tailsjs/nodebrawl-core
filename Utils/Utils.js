Object.prototype.getEnumName = (type) => { // later
    return Object.keys(this).find(key => this[key] === type)
}
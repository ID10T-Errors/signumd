module.exports[404] = function (message) {
  this.message = message
  this.toString = function () {
    return '404: ' + message
  }
}
module.exports[400] = function (message) {
  this.message = message
  this.toString = function () {
    return '400: ' + message
  }
}

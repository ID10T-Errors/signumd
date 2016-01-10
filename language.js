module.exports = function (run) {
  this._run = run
  this.run = function (environment, code, out, onErr) {
    return this._run.apply(this, [environment, code, out, onErr])
  }
}

const Language = require('../language')
const spawn = require('child_process').spawn

module.exports = new Language(function (environment, container, out) {
  var args = ['run']
  for (var variable in environment) {
    if (environment.hasOwnProperty(variable)) {
      args.push('-e')
      args.push(variable + '=' + environment[variable])
    }
  }
  args.push('signumc/signumd-runner:java')
  var child = spawn('docker', args)
  child.stdout.pipe(out)
  child.stderr.pipe(out)
})

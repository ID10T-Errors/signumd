const Language = require('../language')
const exec = require('child_process').exec
const spawn = require('child_process').spawn

module.exports = new Language(function (environment, container, out) {
  var args = 'docker run -d'
  for (var variable in environment) {
    if (environment.hasOwnProperty(variable)) {
      args += ' -e "' + variable + '=' + environment[variable] + '"'
    }
  }
  console.log(args)
  args += (' signumc/signumd-runner:java')
  exec(args, function (err, stdout, stderr) {
    if (err != null) return out.end(err.toString())
    if (stderr !== '') return out.end(stderr)
    var container = stdout
    var child = spawn('docker', ['logs', '-f', container])
    child.stdout.pipe(out)
    child.stderr.pipe(out)
    setTimeout(function () {
      exec('docker kill ' + container, function (err, stdout, stderr) {
        if (err != null) return out.end(err)
        if (stderr !== '') return out.end(stderr)
      })
    }, 5000)
  })
})

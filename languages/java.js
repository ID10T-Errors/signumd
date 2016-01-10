const Language = require('../language')

const Dockerode = require('dockerode')
const docker = new Dockerode()

module.exports = new Language(function (environment, container, out, onErr) {
  var env = []
  for (var variable in environment) {
    if (environment.hasOwnProperty(variable)) {
      env.push(variable + '=' + environment[variable].replace('\\', '\\\\').replace('\n', '\\n'))
    }
  }
  docker.pull('signumc/signumd-runner:java', function (err, stream) {
    if (err != null) return onErr(err)
    docker.createContainer({
      Image: 'signumc/signumd-runner:java',
      Cmd: '/app/run.sh',
      Tty: false,
      Env: env,
      HostConfig: {
        Memory: 50 * 1024 * 1024,
          MemorySwap: -1
      }
    }, function (err, container) {
      if (err != null) return onErr(err)
      container.start(function (err, data) {
        if (err != null) return onErr(err)
      })
      container.attach({stream: true, stdout: true, stderr: true}, function (err, stream) {
        if (err != null) return onErr(err)
        container.modem.demuxStream(stream, out, out);
      })
      setTimeout(function () {
        container.kill({}, function (err) {
          if (err != null) return onErr(err)
        })
      }, 5000)
    })
  })
})

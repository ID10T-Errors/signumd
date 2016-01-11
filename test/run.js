require('../')

const assert = require('better-assert')
const request = require('request')

describe('/run', function () {
  describe('/java', function () {
    it('should run a Java file correctly', function () {
      request({
        uri: 'http://localhost:8080/run/java',
        method: 'POST',
        json: true,
        body: {
          environment: {
            'SIGNUM_CLASSNAME': 'HelloWorld',
            'SIGNUM_CODE': 'class HelloWorld{public static void main(String[] args){System.out.println("Hello, world!");}}'
          },
          code: 'class HelloWorld{public static void main(String[] args){System.out.println("Hello, world!");}}'
        }
      }, function (err, res, body) {
        assert(body === 'Hello, world!\n')
      })
    })
    it('should not return extraneous characters', function () {
      request({
        uri: 'http://localhost:8080/run/java',
        method: 'POST',
        json: true,
        body: {
          environment: {
            'SIGNUM_CLASSNAME': 'HelloWorld',
            'SIGNUM_CODE': 'class HelloWorld{public static void main(String[] args){System.out.println("Hello, world!Hello, world!Hello, world!Hello, world!Hello, world!Hello, world!Hello, world!Hello, world!Hello, world!Hello, world!Hello, world!");}}'
          },
          code: 'class HelloWorld{public static void main(String[] args){System.out.println("Hello, world!Hello, world!Hello, world!Hello, world!Hello, world!Hello, world!Hello, world!Hello, world!Hello, world!Hello, world!Hello, world!");}}'
        }
      }, function (err, res, body) {
        assert(body === 'Hello, world!Hello, world!Hello, world!Hello, world!Hello, world!Hello, world!Hello, world!Hello, world!Hello, world!Hello, world!Hello, world!\n')
      })
    })
  })
})

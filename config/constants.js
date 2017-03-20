const constants = {
  dev: {
    token: 'token',
    cantina: 3,
    exploration: 12,
    senate: 3,
    database: {
      username: 'root',
      password: 'root',
      dbname: 'expansyon',
      host: 'localhost',
      dialect: 'mariadb',
      logging: false
    },
    paypal: {
      username: 'username',
      password: 'password',
      signature: 'signature',
      return: '/',
      cancel: '/',
      debug: true
    },
    sync: true,
    fixtures: true
  },
  production: {
    token: 'token',
    cantina: 3,
    exploration: 12,
    senate: 3,
    database: {
      username: '',
      password: '',
      dbname: '',
      host: '',
      dialect: '',
      logging: false
    },
    paypal: {
      username: '',
      password: '',
      signature: '',
      return: '',
      cancel: '',
      debug: false
    },
    sync: true,
    fixtures: true
  }
}

var env = process.env.NODE_ENV || 'dev'

module.exports = constants[env]

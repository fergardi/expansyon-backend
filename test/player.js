let server = require('../app').server
let request = require('supertest')

global.token = null

// general player test
describe('Players', () => {
  // register a new player
  describe('POST /player/register', () => {
    it('should CREATE a new player', () => {
      request(server)
      .post('/api/player/register')
      .send({
        name: 'Mocha',
        email: 'mocha@mocha.com',
        password: 'mocha'
      })
      .expect(201)
      .end((res) => {
        res.body.should.be.json
        res.body.should.be.a('array')
        res.body.length.should.be.eql(2)
      })
    })
  })
  // register a new player with repeated email and / or name
  describe('POST /player/register', () => {
    it('should FAIL to CREATE the same player TWICE', () => {
      request(server)
      .post('/api/player/register')
      .send({
        name: 'Mocha',
        email: 'mocha@mocha.com',
        password: 'mocha'
      })
      .expect(409)
      .end()
    })
  })
  // login
  describe('POST /player/login', () => {
    it('should FAIL to LOGIN due to INVALID CREDENTIALS', () => {
      request(server)
      .post('/api/player/login')
      .send({
        email: 'mocha@mocha.com',
        password: 'WRONG_PASSWORD'
      })
      .expect(403)
      .end()
    })
  })
  // login
  describe('POST /player/login', () => {
    it('should LOGIN and get JWT TOKEN', () => {
      request(server)
      .post('/api/player/login')
      .send({
        email: 'mocha@mocha.com',
        password: 'mocha'
      })
      .expect(200)
      .end((res) => {
        res.body.should.be.json
        res.body.should.be.a('array')
        res.body.length.should.be.eql(2)
        global.token = res.body.token
      })
    })
  })
  // get all players
  describe('GET /player', () => {
    it('should FAIL to GET all the players without JWT header', () => {
      request(server)
      .get('/api/player')
      .expect(403)
      .end()
    })
  })
  // get all players
  describe('GET /player', () => {
    it('should FAIL to GET all the players with expired JWT', () => {
      request(server)
      .get('/api/player')
      .set('Authorization', 'Bearer EXPIRED_TOKEN')
      .expect(403)
      .end()
    })
  })
  // get all players
  describe('GET /player', () => {
    it('should GET all the players with JWT', () => {
      request(server)
      .get('/api/player')
      .set('Authorization', 'Bearer ' + global.token)
      .expect(200)
      .end((res) => {
        res.body.should.be.json
        res.body.should.be.a('array')
        res.body.length.should.be.gt(0)
      })
    })
  })
})

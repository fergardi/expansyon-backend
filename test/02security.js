let server = require('../app').server
let request = require('supertest')
let expect = require('chai').expect

// global JWT token
global.token = null

// security
describe('SECURITY', () => {
  let name = 'Mocha' + Math.floor(Math.random() * 9999)
  let email = name + '@mocha.com'
  let password = 'mocha'
  describe('POST /api/player/register', () => {
    it('should CREATE a new player', (done) => {
      request(server)
      .post('/api/player/register')
      .send({
        name: name,
        email: email,
        password: password
      })
      .expect(201)
      .end((err, res) => {
        expect(res.body).to.have.property('id')
        expect(res.body).to.have.property('token')
        done(err)
      })
    })
  })
  describe('POST /api/player/register', () => {
    it('should FAIL to CREATE the same player TWICE', (done) => {
      request(server)
      .post('/api/player/register')
      .send({
        name: name,
        email: email,
        password: password
      })
      .expect(409)
      .end((err, res) => {
        done(err)
      })
    })
  })
  describe('POST /api/player/login', () => {
    it('should FAIL to LOGIN due to INVALID CREDENTIALS', (done) => {
      request(server)
      .post('/api/player/login')
      .send({
        email: email,
        password: 'WRONG_PASSWORD'
      })
      .expect(401)
      .end((err, res) => {
        done(err)
      })
    })
  })
  describe('POST /api/player/login', () => {
    it('should LOGIN and obtain JWT', (done) => {
      request(server)
      .post('/api/player/login')
      .send({
        email: email,
        password: password
      })
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.have.property('id')
        expect(res.body).to.have.property('token')
        global.token = res.body.token
        done(err)
      })
    })
  })
})

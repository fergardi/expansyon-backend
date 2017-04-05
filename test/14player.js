let server = require('../app').server
let request = require('supertest')
let expect = require('chai').expect

// player
describe('PLAYER', () => {
  describe('GET /api/player', () => {
    it('should FAIL to GET all the players with no JWT', (done) => {
      request(server)
      .get('/api/player')
      .expect(403)
      .end((err, res) => {
        done(err)
      })
    })
  })
  describe('GET /api/player', () => {
    it('should FAIL to GET all the players with bad JWT', (done) => {
      request(server)
      .get('/api/player')
      .set('Authorization', 'Bearer ' + 'BAD_TOKEN')
      .expect(401)
      .end((err, res) => {
        done(err)
      })
    })
  })
  describe('GET /api/player', () => {
    it('should GET all the players with good JWT', (done) => {
      request(server)
      .get('/api/player')
      .set('Authorization', 'Bearer ' + global.token)
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.have.length.above(0)
        done(err)
      })
    })
  })
  describe('GET /api/player/id', () => {
    it('should GET one player with good JWT', (done) => {
      request(server)
      .get('/api/player/1')
      .set('Authorization', 'Bearer ' + global.token)
      .expect(200)
      .end((err, res) => {
        // TODO
        done(err)
      })
    })
  })
})

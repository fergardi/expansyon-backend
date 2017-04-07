let server = require('../app').server
let request = require('supertest')
let expect = require('chai').expect

// battle
describe('BATTLE', () => {
  describe('GET /api/battle', () => {
    it('should FAIL to GET all the battles with no JWT', (done) => {
      request(server)
      .get('/api/battle')
      .expect(403)
      .end((err, res) => {
        done(err)
      })
    })
  })
  describe('GET /api/battle', () => {
    it('should FAIL to GET all the battles with bad JWT', (done) => {
      request(server)
      .get('/api/battle')
      .set('Authorization', 'Bearer ' + 'BAD_TOKEN')
      .expect(401)
      .end((err, res) => {
        done(err)
      })
    })
  })
  describe('GET /api/battle', () => {
    it('should GET all the battles with good JWT', (done) => {
      request(server)
      .get('/api/battle')
      .set('Authorization', 'Bearer ' + global.token)
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.have.length.be(0)
        done(err)
      })
    })
  })
})

let server = require('../app').server
let request = require('supertest')
let expect = require('chai').expect

// relic
describe('RELIC', () => {
  describe('GET /api/relic', () => {
    it('should FAIL to LIST all the relics with no JWT', (done) => {
      request(server)
      .get('/api/relic')
      .expect(403)
      .end((err, res) => {
        done(err)
      })
    })
  })
  describe('GET /api/relic', () => {
    it('should FAIL to LIST all the relics with bad JWT', (done) => {
      request(server)
      .get('/api/relic')
      .set('Authorization', 'Bearer ' + 'BAD_TOKEN')
      .expect(401)
      .end((err, res) => {
        done(err)
      })
    })
  })
  describe('GET /api/relic', () => {
    it('should LIST all the relics with good JWT', (done) => {
      request(server)
      .get('/api/relic')
      .set('Authorization', 'Bearer ' + global.token)
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.have.length.be(6)
        done(err)
      })
    })
  })
})

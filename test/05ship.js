let server = require('../app').server
let request = require('supertest')
let expect = require('chai').expect

// ship
describe('SHIP', () => {
  describe('GET /api/ship', () => {
    it('should FAIL to LIST all the ships with no JWT', (done) => {
      request(server)
      .get('/api/ship')
      .expect(403)
      .end((err, res) => {
        done(err)
      })
    })
  })
  describe('GET /api/ship', () => {
    it('should FAIL to LIST all the ships with bad JWT', (done) => {
      request(server)
      .get('/api/ship')
      .set('Authorization', 'Bearer ' + 'BAD_TOKEN')
      .expect(401)
      .end((err, res) => {
        done(err)
      })
    })
  })
  describe('GET /api/ship', () => {
    it('should LIST all the ships with good JWT', (done) => {
      request(server)
      .get('/api/ship')
      .set('Authorization', 'Bearer ' + global.token)
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.have.length.be(6)
        done(err)
      })
    })
  })
})

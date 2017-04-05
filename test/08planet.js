let server = require('../app').server
let request = require('supertest')
let expect = require('chai').expect

// planet
describe('PLANET', () => {
  describe('GET /api/planet', () => {
    it('should FAIL to LIST all the planets with no JWT', (done) => {
      request(server)
      .get('/api/planet')
      .expect(403)
      .end((err, res) => {
        done(err)
      })
    })
  })
  describe('GET /api/planet', () => {
    it('should FAIL to LIST all the planets with bad JWT', (done) => {
      request(server)
      .get('/api/planet')
      .set('Authorization', 'Bearer ' + 'BAD_TOKEN')
      .expect(401)
      .end((err, res) => {
        done(err)
      })
    })
  })
  describe('GET /api/planet', () => {
    it('should LIST all the planets with good JWT', (done) => {
      request(server)
      .get('/api/planet')
      .set('Authorization', 'Bearer ' + global.token)
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.have.length.above(0)
        done(err)
      })
    })
  })
})

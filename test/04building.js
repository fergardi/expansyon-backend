let server = require('../app').server
let request = require('supertest')
let expect = require('chai').expect

// building
describe('BUILDING', () => {
  describe('GET /api/building', () => {
    it('should FAIL to LIST all the buildings with no JWT', (done) => {
      request(server)
      .get('/api/building')
      .expect(403)
      .end((err, res) => {
        done(err)
      })
    })
  })
  describe('GET /api/building', () => {
    it('should FAIL to LIST all the buildings with bad JWT', (done) => {
      request(server)
      .get('/api/building')
      .set('Authorization', 'Bearer ' + 'BAD_TOKEN')
      .expect(401)
      .end((err, res) => {
        done(err)
      })
    })
  })
  describe('GET /api/building', () => {
    it('should LIST all the buildings with good JWT', (done) => {
      request(server)
      .get('/api/building')
      .set('Authorization', 'Bearer ' + global.token)
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.have.length.be(6)
        done(err)
      })
    })
  })
})

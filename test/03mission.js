let server = require('../app').server
let request = require('supertest')
let expect = require('chai').expect

// mission
describe('MISSION', () => {
  describe('GET /api/mission', () => {
    it('should FAIL to LIST all the missions with no JWT', (done) => {
      request(server)
      .get('/api/mission')
      .expect(403)
      .end((err, res) => {
        done(err)
      })
    })
  })
  describe('GET /api/mission', () => {
    it('should FAIL to LIST all the missions with bad JWT', (done) => {
      request(server)
      .get('/api/mission')
      .set('Authorization', 'Bearer ' + 'BAD_TOKEN')
      .expect(401)
      .end((err, res) => {
        done(err)
      })
    })
  })
  describe('GET /api/mission', () => {
    it('should LIST all the missions with good JWT', (done) => {
      request(server)
      .get('/api/mission')
      .set('Authorization', 'Bearer ' + global.token)
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.have.length.above(0)
        done(err)
      })
    })
  })
})

let server = require('../app').server
let request = require('supertest')
let expect = require('chai').expect

// achievement
describe('ACHIEVEMENT', () => {
  describe('GET /api/achievement', () => {
    it('should FAIL to LIST all the achievements with no JWT', (done) => {
      request(server)
      .get('/api/achievement')
      .expect(403)
      .end((err, res) => {
        done(err)
      })
    })
  })
  describe('GET /api/achievement', () => {
    it('should FAIL to LIST all the achievements with bad JWT', (done) => {
      request(server)
      .get('/api/achievement')
      .set('Authorization', 'Bearer ' + 'BAD_TOKEN')
      .expect(401)
      .end((err, res) => {
        done(err)
      })
    })
  })
  describe('GET /api/achievement', () => {
    it('should LIST all the achievements with good JWT', (done) => {
      request(server)
      .get('/api/achievement')
      .set('Authorization', 'Bearer ' + global.token)
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.have.length.be(9)
        done(err)
      })
    })
  })
})

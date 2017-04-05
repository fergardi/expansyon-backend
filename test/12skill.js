let server = require('../app').server
let request = require('supertest')
let expect = require('chai').expect

// skill
describe('SKILL', () => {
  describe('GET /api/skill', () => {
    it('should FAIL to LIST all the skills with no JWT', (done) => {
      request(server)
      .get('/api/skill')
      .expect(403)
      .end((err, res) => {
        done(err)
      })
    })
  })
  describe('GET /api/skill', () => {
    it('should FAIL to LIST all the skills with bad JWT', (done) => {
      request(server)
      .get('/api/skill')
      .set('Authorization', 'Bearer ' + 'BAD_TOKEN')
      .expect(401)
      .end((err, res) => {
        done(err)
      })
    })
  })
  describe('GET /api/skill', () => {
    it('should LIST all the skills with good JWT', (done) => {
      request(server)
      .get('/api/skill')
      .set('Authorization', 'Bearer ' + global.token)
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.have.length.be(30)
        done(err)
      })
    })
  })
})

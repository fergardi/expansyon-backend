let server = require('../app').server
let request = require('supertest')
let expect = require('chai').expect

// faction
describe('FACTION', () => {
  describe('GET /api/faction', () => {
    it('should FAIL to LIST all the factions with no JWT', (done) => {
      request(server)
      .get('/api/faction')
      .expect(403)
      .end((err, res) => {
        done(err)
      })
    })
  })
  describe('GET /api/faction', () => {
    it('should FAIL to LIST all the factions with bad JWT', (done) => {
      request(server)
      .get('/api/faction')
      .set('Authorization', 'Bearer ' + 'BAD_TOKEN')
      .expect(401)
      .end((err, res) => {
        done(err)
      })
    })
  })
  describe('GET /api/faction', () => {
    it('should LIST all the factions with good JWT', (done) => {
      request(server)
      .get('/api/faction')
      .set('Authorization', 'Bearer ' + global.token)
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.have.length.be(6)
        done(err)
      })
    })
  })
})

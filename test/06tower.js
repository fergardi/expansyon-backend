let server = require('../app').server
let request = require('supertest')
let expect = require('chai').expect

// tower
describe('TOWER', () => {
  describe('GET /api/tower', () => {
    it('should FAIL to LIST all the towers with no JWT', (done) => {
      request(server)
      .get('/api/tower')
      .expect(403)
      .end((err, res) => {
        done(err)
      })
    })
  })
  describe('GET /api/tower', () => {
    it('should FAIL to LIST all the towers with bad JWT', (done) => {
      request(server)
      .get('/api/tower')
      .set('Authorization', 'Bearer ' + 'BAD_TOKEN')
      .expect(401)
      .end((err, res) => {
        done(err)
      })
    })
  })
  describe('GET /api/tower', () => {
    it('should LIST all the towers with good JWT', (done) => {
      request(server)
      .get('/api/tower')
      .set('Authorization', 'Bearer ' + global.token)
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.have.length.be(3)
        done(err)
      })
    })
  })
})

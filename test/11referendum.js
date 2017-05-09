let server = require('../app').server
let request = require('supertest')
let expect = require('chai').expect

// referendum
describe('REFERENDUM', () => {
  describe('GET /api/referendum', () => {
    it('should FAIL to LIST all the referendums with no JWT', (done) => {
      request(server)
      .get('/api/referendum')
      .expect(403)
      .end((err, res) => {
        done(err)
      })
    })
  })
  describe('GET /api/referendum', () => {
    it('should FAIL to LIST all the referendums with bad JWT', (done) => {
      request(server)
      .get('/api/referendum')
      .set('Authorization', 'Bearer ' + 'BAD_TOKEN')
      .expect(401)
      .end((err, res) => {
        done(err)
      })
    })
  })
})

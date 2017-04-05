let server = require('../app').server
let request = require('supertest')
let expect = require('chai').expect

// tree
describe('TREE', () => {
  describe('GET /api/tree', () => {
    it('should FAIL to LIST all the trees with no JWT', (done) => {
      request(server)
      .get('/api/tree')
      .expect(403)
      .end((err, res) => {
        done(err)
      })
    })
  })
  describe('GET /api/tree', () => {
    it('should FAIL to LIST all the trees with bad JWT', (done) => {
      request(server)
      .get('/api/tree')
      .set('Authorization', 'Bearer ' + 'BAD_TOKEN')
      .expect(401)
      .end((err, res) => {
        done(err)
      })
    })
  })
  describe('GET /api/tree', () => {
    it('should LIST all the trees with good JWT', (done) => {
      request(server)
      .get('/api/tree')
      .set('Authorization', 'Bearer ' + global.token)
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.have.length.be(3)
        done(err)
      })
    })
  })
})

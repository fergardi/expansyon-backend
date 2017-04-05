let server = require('../app').server
let request = require('supertest')

// api
describe('STATUS', () => {
  describe('GET /api', () => {
    it('should return 418 if API is online', (done) => {
      request(server)
      .get('/api')
      .expect(418)
      .end((err, res) => {
        done(err)
      })
    })
  })
})

let chai = require('chai')
let server = require('../app').server
let request = require('supertest')

// general API test
describe('Online', () => {
  // is online
  describe('GET /', () => {
    it('should return 418 if API is online', () => {
      request(server)
      .get('/')
      .expect(418)
      .end()
    })
  })
})

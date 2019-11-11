// routes.test.js
const request = require('supertest')
const app = require('../app')

describe('GET /', function() {
  it('responds with json', function(done) {
    request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);

  });
});

describe('GET /scrap', function() {
  it('responds with json', function(done) {
    request(app)
      .get('/scrap?url=https://bola.kompas.com/read/2019/11/10/20554698/timnas-u-19-indonesia-vs-korea-utara-seri-garuda-muda-ke-piala-asia')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done)
  });
});

afterAll(done => {
  done()
});
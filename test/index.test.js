import { expect, server } from './setup';

describe('app page test', () => {
  it('should return status code 200', done => {
    server
      .get('/')
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('should return a message', done => {
    server
      .get('/')
      .expect(200)
      .end((err, res) => {
        expect(res.body.message).to.equal(
          'Welcome to Express Ilaro'
        );
        done();
      });
  });
});
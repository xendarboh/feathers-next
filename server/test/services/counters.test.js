const app = require('../../src/app');

describe('\'counters\' service', () => {
  it('registered the service', () => {
    const service = app.service('counters');
    expect(service).toBeTruthy();
  });
});

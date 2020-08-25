const app = require('../index.js');
const axios = require('axios');

describe('Server Requests', () => {
  test('server retrieves documents from db', () => {
    const callback = (data) => {
      try {
        expect(data.length).not.toBe(0);
        done();
      } catch (error) {
        done(error);
      }
    };
    axios({
      type: 'GET',
      url: `/api/moreplacestostay`,
      success: (data) => {
        callback(data);
      }
    });
  });
});
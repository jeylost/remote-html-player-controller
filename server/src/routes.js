'use strict';
const { actionResolver } = require('./desktop-controller');

module.exports = {
  'post:/action_request': function (request) {
    const { query } = request;

    const { action, value } = query;
    actionResolver(action, value);
  
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'plain/text',
      },
      body: 'OK',
    };
  },
};
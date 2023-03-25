'use strict';

const connections = require('./connections.js');

module.exports = {
  'post:/action_request': function (request) {
    const { query } = request;

    const { action, value } = query;
    
    connections.forEach((connection) => {
      connection.send(JSON.stringify({ site: 'AnimeGo', action, value }));
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'plain/text',
      },
      body: 'OK',
    };
  },
};
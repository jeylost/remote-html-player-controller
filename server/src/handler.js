'use strict';

const routes = require('./routes.js');

module.exports = function (request) {
  const routeHandler = routes[`${request.method.toLowerCase()}:${request.path}`];

  if (!routeHandler) {
    return {
      statusCode: 404,
      headers: {
        'Content-Type': 'plain/text',
      },
      body: 'Not Found',
    };
  }

  return routeHandler({ headers: request.headers, query: request.query });
};
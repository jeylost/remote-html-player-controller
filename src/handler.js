'use strict';

const actionResolver = require('./desktop-controller');
const errors = require('./desktop-controller/errors.js');

module.exports = async function ({ query }) {
  const { action, value } = query;
  let response = 200;

  try {
    await actionResolver(action, value);
  } catch(err) {
    switch(err) {
      case errors.action_not_found:
        response = 404;
        break;
      case errors.internal_error:
        response = 500;
        break;  
    }
  }
  
  return response;
};

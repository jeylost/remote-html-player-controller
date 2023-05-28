'use strict';

const { execFile, execSync } = require('node:child_process');
const { join } = require('node:path');
const { access } = require('node:fs/promises');

const errors = require('./errors.js');

let pythonIndetifier;
const pythonIdentifiers = ['python', 'python3'];

for (const identifier of pythonIdentifiers) {
  try {
    execSync(`${identifier} -v`, { stdio: 'ignore' });
    pythonIndetifier = identifier;
    break;
  } catch (err) {

  }
}

if (!pythonIndetifier) {
  console.log('[ERROR]: Python isn\'t found. It is either not installed or not added to PATH yet. Possibly it can be available by alternative name.');
  console.log(`[ERROR]: list of checked identifiers: ${pythonIdentifiers.join(', ')}`);
  console.log('[ERROR]: make python available before starting the server.');
  process.exit(1);
}

module.exports = async function actionResolver(action, value) {
    const pythonFile = join(__dirname, 'actions', `${action}.py`);

    try {
      await access(pythonFile);
    } catch(err) {
      console.error(`[Error]: action ${action} doesn't exist`);
      throw(errors.action_not_found);
    } 

    const args = [pythonFile];
    if (value) {
      args.push(value);
    } 

    try {
      const std = await new Promise((resolve, reject) => {
        execFile(pythonIndetifier, args, { cwd: join(__dirname, 'actions')  }, (err, ...std) => {
          if (err) {
            reject(err);
          }
          
          resolve(std);
        });
      });

      console.log(`[INFO]: action ${action} ${value ? 'with value ' + value + ' ': ''}dispatched`);
  
      std.forEach((data) => {
        if(data) {
          console.log(`[INFO]: Python ${data}`);
        }
      });
    } catch(err) {
      console.log(`[ERROR]: ${err}`);
      throw(errors.internal_error);
    }
};

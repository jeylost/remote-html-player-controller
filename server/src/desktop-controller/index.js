const { spawn } = require('node:child_process');
const { join } = require('node:path');

const actions = [
  { type: 'button', text: 'Enter Fullscreen', action: 'enterFullscreen' },
  { type: 'button', text: 'Play', action: 'play' },
  {type: 'button', text: 'Pause', action: 'pause' },
  { type: 'button', text: 'Leave Fullscreen', action: 'leaveFullscreen' },
  { type: 'input', text: 'Select Episode', action: 'selectEpisode'},
  { type: 'input', text: 'Select Quality', action: 'selectQuality'},
];

module.exports = {
  actionResolver(maybeAction, value) {
    const knownAction = actions.find(({ action }) => maybeAction === action);

    if (!knownAction) {
      console.error(`[Error]: ${maybeAction} action doesn't exist`);
      return;
    }


    const pythonFile = join(__dirname, 'action-resolvers', `${knownAction.action}.py`);
    const args = [pythonFile];
    if (value) {
      args.push(value);
    } 
    
    const pythonProcess = spawn('python3', args);

    pythonProcess.stderr.on('data', (err) => console.log(`[Error]: action ${knownAction.action} ended with error: ${err}`));
    pythonProcess.on('error', (err) => console.log(`[Error]: action ${knownAction.action} ended with error: ${err}`));
  },
};
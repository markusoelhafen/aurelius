var exec = require('child_process').exec;

function playAudioFile(filename) {
  console.log("Playing Audio filename: " + filename);
  var cmd = 'omxplayer -o local "' + filename + '"';

  exec(cmd, function(error, stdout, stderr) {
    // command output is in stdout
  });
}

module.exports = { playAudioFile:playAudioFile };

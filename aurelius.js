// Get all the node modules
var cmp = require('gm').compare;
var i2c = require('i2c-bus');
var mpu = require('i2c-mpu6050');
var gpio = require('pi-gpio');
var cam = require('raspicam');
var audio = require('modules/audio.js');
var camera = require('modules/camera.js')
var compare = require('modules/compare.js');
var readmpu = require('modules/readmpu.js');
var readGpio = require('modules/readgpio.js');

var img1 = '/home/pi/src/compareImg.jpg';
var img2 = '/home/pi/src/originalImg.jpg';

// ==================
// SETUP I2C - MPU650 (get address from raspberry using 'sudo i2cdetect -y 1')
var i2cAdress = 0x68;
var i2c1 = i2c.openSync(1);
readmpu.setup(i2c1, i2cAdress);

// SETUP GPIO - IR SENSOR
var gpioPin = 12;

function readGpio(callback) {
  // open connection to the gpio pin
  gpio.open(gpioPin, "input", function(err) {
    // read the value of the pin
    gpio.read(gpioPin, function(err, value) {
      // close pin again
      gpio.close(gpioPin);
      callback(value === 1);
    });
  });
};

// ==============
// SETUP RASPICAM

var camOptions = {
  mode: "photo",
  encoding: "jpg",
  quality: 10,
  output: "compareImg.jpg"
};
camera.setup(camOptions);

// ==============
// RUN SCRIPT
function runAurelius() {
  readGpio(function(value) {
    if (!value)
      setTimeout(runAurelius, 20);
      return

    camera.takeSnapshot(camOptions) {
      compare.compareFiles(img1, img2, function(equal) {
        if (!equal) return
        audio.playAudioFile('audio.wav');
      });
    }
  });
};

// runAurelius on Startup
runAurelius();

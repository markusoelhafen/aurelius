// Get all the node modules
var gm = require('gm');
var i2c = require('i2c-bus');
var mpu = require('i2c-mpu6050');
var gpio = require('pi-gpio');
var cam = require('raspicam');
var audio = require('modules/audio.js');
var camera = require('modules/camera.js')
var compare = require('modules/compare.js');

var img1 = '/home/pi/src/compareImg.jpg';
var img2 = '/home/pi/src/originalImg.jpg';

// ==================
// SETUP I2C - MPU650

// get address from raspberry using 'sudo i2cdetect -y 1'
var address = 0x68;
var i2c1 = i2c.openSync(1);

var mpuSensor = new mpu(i2c1, address);

var readMpu = function() {
  mpuData = mpuSensor.readSync();
  console.log(mpuData);
}


// ======================
// SETUP GPIO - IR SENSOR

var pin = 12;
var returnValue;
//var i = 0;
//var size = 1000;
//var gpioData = new Array(size);

function readGpio(callback) {
  // open connection to the gpio pin
  gpio.open(pin, "input", function(err) {
    // read the value of the pin
    gpio.read(pin, function(err, value) {
      // if the value is 1, set returnValue as true and log in console
      gpio.close(pin);
      callback(value === 1);
      //console.log(returnValue);

      //close pin connection
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

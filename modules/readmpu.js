var mpuSensor;

function setup(i2c1, i2cAdress) {
  mpuSensor = new mpu(i2c1, i2cAdress);
}

function data(mpuSensor, callback) {
  var mpuData = mpuSensor.readSync();
  console.log(mpuData);
}

module.exports = { data:data };
module.exports = { setup:setup };

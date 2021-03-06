function setup(options) {
  var camera = new cam(options);
}

function takeSnapshot(options, callback) {
   console.log("taking snapshot")
   camera.start(options);
   camera.on("read", function(err, filename){
      console.log("Camera: " + filename + " saved.")
      if(callback){
        callback();
      }
   });
}

module.exports = { takeSnapshot:takeSnapshot };
module.exports = { setup:setup };

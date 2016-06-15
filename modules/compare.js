var gm = require('gm');

function compareFiles(img1, img2){
	gm.compare(img1, img2, function(err, isEqual, raw) {
		if (err) return console.log(err);
		console.log('comparing ' + img1 + ' with ' + img2);
		console.log('equality: ' + isEqual);
		console.log('raw: ' + raw);
	});
};

module.exports = { compareFiles:compareFiles };

var tough = require('tough-cookie');
var crypto = require('crypto');


var times = 1000000;
var cookieLength = 100;
var testFinished = false;


var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var cookie;
var cookieJar = new tough.CookieJar();
crypto.randomBytes(cookieLength, function (e, cookieContents) {
  cookie = 'sid='+cookieContents.toString('hex')+'; Domain=example.com';
  cookieJar.setCookie(cookie, 'http://example.com/index.html', {}, function () {});
});

function runTest(){
  console.log('Running ',  times, ' times with a cookie of length: ', cookie.length);

  for(var counter=0; counter < times; counter++){
    if(counter % (times/1000) === 0) {
      process.stdout.cursorTo(0);
      process.stdout.write((counter/times*100).toFixed(1) + "%");
      process.stdout.clearLine(1);
    }
    cookieJar.setCookie(cookie, 'http://example.com/index.html', {}, function () {});
  }
  console.log('');
  console.log('Finished!');

  rl.question("Hit enter to finish", function() {
    testFinished = true;

    rl.close();
  });
}

rl.question("Hit enter to run tests.", function() {
  runTest();
});

(function wait () {
  if (!testFinished) setTimeout(wait, 1000);
})();
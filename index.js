var tough = require('tough-cookie');


var cookieJar = new tough.CookieJar();
var memwatch = require('memwatch');
var hd = new memwatch.HeapDiff();
var times = 10000000;

var start = new Date();

console.log('Running ' + times);
for(var counter=0; counter<=times; counter++){
  if(counter % (times/1000) === 0) {
    console.log('Testing: ' + (counter/times * 100).toFixed(1) + '% (' + counter + ')');
  }
  if (counter === times) {
    console.log('Finished running ' + counter + ' times. Phew. That took ' + ((new Date()-start)/1000/60).toFixed(2) + ' Minutes');
    var diff = hd.end();
    console.log(diff);
    console.log('Top offenders in order:');
    for(var i=0;i<4;i++){
      console.log(diff.change.details[i]);
    }

    return;
  }

  cookieJar.setCookie('a=b; Domain=example.com', 'http://example.com/index.html', {}, function () {});
}
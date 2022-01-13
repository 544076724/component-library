var tow = function tow(n) {
  return n >= 0 && n < 10 ? '0' + n : '' + n;
};

var getCountdownTime = function getCountdownTime(timestamp) {
  if (!timestamp) {
    return {
      day: '00',
      hour: '00',
      minute: '00',
      second: '00'
    };
  }

  var day = tow(Math.floor(timestamp / 86400)); //整数部分代表的是天；一天有24*60*60=86400秒 ；

  timestamp = timestamp % 86400; //余数代表剩下的秒数；

  var hour = tow(Math.floor(timestamp / 3600)); //整数部分代表小时；

  timestamp %= 3600; //余数代表 剩下的秒数；

  var minute = tow(Math.floor(timestamp / 60));
  timestamp %= 60;
  return {
    day: day,
    hour: hour,
    minute: minute,
    second: tow(timestamp)
  };
};

export { getCountdownTime };
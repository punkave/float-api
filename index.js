var FloatAPI = require('./lib/FloatAPI.js');

module.exports = function(apiKey, options) {
  return new FloatAPI(apiKey, options);
}
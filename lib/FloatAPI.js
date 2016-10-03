var http = require('http'),
    request = require('request'),
    helpers = require('./helpers');

/**
 * Float API wrapper.
 *
 * @param apiKey The API key to access the Float API with
 * @param options Configuration options
 * @return Instance of {@link FloatAPI}
 */
function FloatAPI = (apiKey, options) {

  if (!options) {
    var options = {};
  }

  this.apiKey = apiKey;
  this.version = 'v1';
  this.httpUri = 'https://api.float.com/api';
  this.userAgent = options.userAgent;
  this.packageInfo = options.packageInfo;

}

/**
 * Sends a given request as a JSON object to the Float API and finally
 * calls the given callback function with the resulting JSON object. This
 * method should not be called directly but will be used internally by all API
 * methods defined.
 *
 * @param method Float API method to call
 * @param availableParams Parameters available for the specified API method
 * @param givenParams Parameters to call the Float API with
 * @param callback Callback function to call on success
 */
FloatAPI.prototype.execute = function(method, availableParams, givenParams, callback) {

  var finalParams = { apikey : this.apiKey };
	var currentParam;

	for (var i = 0; i < availableParams.length; i++) {
		currentParam = availableParams[i];

		if (typeof givenParams[currentParam] !== 'undefined') {
      finalParams[currentParam] = givenParams[currentParam];
    }
	}

	request({
		uri : this.httpUri+'/'+this.version+'/'+method,
		method: 'POST',
		headers : { 'User-Agent' : this.userAgent+'float-api/'+this.packageInfo['version'] },
		body : encodeURIComponent(JSON.stringify(finalParams))
	}, function (error, response, body) {
		helpers.handleFloatResponse(error, response, body, callback);
	});

}

/**
 * Get all of the Float project milestones.
 *
 * @see https://github.com/floatschedule/api/blob/master/Sections/milestones.md
 */
FloatAPI.prototype.milestones = function(params, callback) {

	this.execute('milestones', [], params, callback);

}

/**
 * Get all of the Float projects.
 *
 * @see https://github.com/floatschedule/api/blob/master/Sections/projects.md#get-projects
 */
FloatAPI.prototype.projects = function(params, callback) {

  this.execute('projects', [], params, callback);

}

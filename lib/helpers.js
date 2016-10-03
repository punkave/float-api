/**
 * Creates an Error with information received from Float. In addition to an
 * error message it also includes an error code. A detailed list of known error
 * messages and codes can be found at the url below for version 1.3 of the API.
 *
 * @param message The error message
 * @param code The error code
 * @return Instance of {@link Error}
 */
var createFloatError = module.exports.createFloatError = function (message, code) {

	var error = new Error(message || (message = ''));

	if (code)
		error.code = code;

	return error;

}

/**
 * handleFloatResponse
 * Handles a response from Float. This handles errors in a unified way or
 * parses the JSON response as appropriate.
 *
 * @param error
 * @param response
 * @param body
 * @param {function(error, parsedResponse)} callback
 */
var handleFloatResponse = module.exports.handleFloatResponse = function (error, response, body, callback) {
  var parsedResponse;
  if (error) {
    return callback(new Error('Unable to connect to the Float API endpoint because ' + error.message));
  }

  try {
    parsedResponse = JSON.parse(body);
  } catch (error) {
    return callback(new Error('Error parsing JSON answer from Float API: ' + body));
  }

  if (response.statusCode != 200 || parsedResponse.status == 'error') {
    return callback(createFloatError(parsedResponse.error, parsedResponse.code));
  }

  callback(null, parsedResponse);
}

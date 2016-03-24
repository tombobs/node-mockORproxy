var path = require('path');

module.exports = function (config) {

  var mockDirectory = path.join(__dirname, '..', config.mockDirectory);

  return function (req, res, next) {

    var routes = require('./get-routes')(mockDirectory);
    var urlParts = req.originalUrl.split('/').reverse();
    var part;

    while (urlParts.length) {
      part = urlParts.pop();
      if (!part) continue; // when the url ends with "/" - just ignore the empty bit
      part = part.split('?')[0]; // strip off any GET params. just to find the file
      if (routes[part]) {
        routes = routes[part];
      }
      else {
        break;
      }
    }
    if (typeof routes === 'function') {
      // found a route
      routes(req, res, next); // pass the raw express req and res objects to the mock
    }
    else {
      next();
    }
  }
};
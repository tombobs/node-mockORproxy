var request = require('request');

module.exports = function (config) {

  function proxy(req, cb) {
    console.log(req.originalUrl);
    request(config.serverUrl + req.originalUrl, {
      method: req.method,
      headers: req.headers,
      body: JSON.stringify(req.body)
    }, cb);
  }

  return function (req, res) {
    proxy(req, function (err, proxyResp, body) {
      if (err) {
        res.send(500, 'Error while proxying');
        if (err.code === 'ECONNREFUSED') {
          throw new Error('Server not running on ' + config.serverUrl);
        }
        else {
          console.log(err);
        }
      }
      else {
        // copy the headers from the target back-end
        for (var i in proxyResp.headers) {
          res.header(i, proxyResp.headers[i]);
        }
        // copy the status code from the target back-end
        res.status(proxyResp.statusCode);
        res.send(body);
      }
    });
  }

};
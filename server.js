var config = require('./config');

var findRoute = require('./lib/find-route')(config);
var proxyRequest = require('./lib/proxy-request')(config);
var getRoutes = require('./lib/get-routes');

var routes = getRoutes(__dirname + '/api');

var bodyParser = require('body-parser');
var server = require('express')();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

if (config.useCORS) {
  server.use(setCORSHeaders);
}

server.use(findRoute);
server.use(proxyRequest);

server.listen(config.port, function (err) {
  if (err) {
    throw err;
  }
  console.log('Server running on localhost:' + config.port);
});


function setCORSHeaders (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, HEAD, OPTIONS");
  next();
}

# node-mockORproxy

NodeJS HTTP server to proxy requests and allow for easy mocking of end-points

### Install
* install nodejs and npm
* `npm install` in the directory to generate the node_modules directory containing the projects dependencies.

### Run
* `npm start`

### Config
```config.json``` contains four items
* `port`: the port to run this server on
* `serverUrl`: the target back-end to proxy requests to
* `mockDirectory`: a relative path to a folder containing mock end-points. These take precedence over real end-points
* `useCORS`: attach CORS headers to all responses 

Nest files/folders as deeply as needed in the `mockDirectory` folder to create a nested url structure. e.g..

```
-api
  |
   - route1
     |
      -sub-route1
        |
         -end-point1.js
```

would map to ```route1/sub-route1/end-point1```

```end-point1.js``` should export a handler function for the request.

e.g.
```
module.exports = function (req, res) {
  res.send(200);
}
```

If required, different HTTP methods can be handled seperately by switching on `req.method`.
More on the `req` and `res` objects [here](http://expressjs.com/en/api.html#req)
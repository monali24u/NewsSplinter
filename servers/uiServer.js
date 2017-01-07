

var http = require('http');
var host = 'localhost';
var port = process.argv[2] || 1340

http.createServer((req, res) => {

  if(req.url === '/'){
      res.end("I am alive!!")
  }

}).listen(port, host, () => {
  console.log('uiServer is up!! listening to port ', port)
});

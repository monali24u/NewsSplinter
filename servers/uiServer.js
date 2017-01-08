

var http = require('http');
var path = require('path');
var fs = require('fs');
var host = 'localhost';
var port = process.argv[2] || 1340
var result = "InitiAL";

http.createServer((req, res) => {

  if(req.url === '/'){
    var filePath = path.join(__dirname, '../') + 'index.html';
    console.log("file path is "+ filePath);
      fs.readFile(filePath, (err, contents) =>{
              if(err){
                res.writeHead(404, {'Content-Type':'text/html'})
                res.end('Page not found!')
              }
              else{
                res.writeHead(200, {'Content-Type':'text/html'})
                res.end(contents);
              }
        })

  }
  else if(req.url === '/main.css'){
    var filePath = path.join(__dirname, '../') + 'main.css';
        console.log("file path is "+ filePath);
      fs.readFile(filePath, (err, contents) =>{
              if(err){
                res.writeHead(404, {'Content-Type':'text/css'})
                res.end('Page not found!')
              }
              else{
                res.writeHead(200, {'Content-Type':'text/css'})
                res.end(contents);
              }
        })

  }
  else if(req.url === '/testing'){
    //passing data to angular module
    //console.log("came in testing");
    res.end(result);
  }
  else if(req.pathname === 'images/footer.jpg'){
    var filePath = path.join(__dirname, '../') + 'images/footer.jpg';
        console.log("file path is "+ filePath);
      fs.readFile(filePath, (err, contents) =>{
              if(err){
                res.writeHead(404, {'Content-Type':'image/jpeg'})
                res.end('image not found!')
              }
              else{
                res.writeHead(200, {'Content-Type':'image/jpeg'})
                res.end(contents);
              }
        })

  }
  else if(req.url === '/dataParser.js'){
    var filePath = path.join(__dirname, '../') + 'dataParser.js';
      fs.readFile(filePath, (err, contents) =>{
            if(err){
              res.writeHead(404, {'Content-Type':'text/javascript'})
              res.end('Page not found!')
            }
            else{
              res.writeHead(200, {'Content-Type':'text/javascript'})
              res.end(contents);
            }
        })
    }
    else if(req.url === '/angularq.js'){
      var filePath = path.join(__dirname, '../') + 'angularq.js';
        fs.readFile(filePath, (err, contents) =>{
              if(err){
                res.writeHead(404, {'Content-Type':'text/javascript'})
                res.end('Page not found!')
              }
              else{
                res.writeHead(200, {'Content-Type':'text/javascript'})
                res.end(contents);
              }
        })
    }

}).listen(port, host, () => {
  console.log('uiServer is up!! listening to port ', port)
});

function UpdateNewsData(newsData)
{
  // console.log("Updated data" + JSON.stringify(newsData));
  result = JSON.stringify(newsData);
  // result = newsData;
}

exports.UpdateNewsData = UpdateNewsData;

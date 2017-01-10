
//this server grabs processed data from 'newsServer' also requesting data from sentiments api and will process available content
//and handover final result to client.

//import settings
 var dataParser = require('./dataParser.js');

//server settings
var unirest = require('unirest');
var fs = require('fs');
console.log('sentimentServer is up!!');

//data variables
var array;
var newsDescriptionFile = './database/newsDescription.txt';
var newsSentimentFile   = './database/newsSentiment.txt';
var newsSentimentArray  = [];

//stream for writing sentiment data


// fs.watchFile(newsDescriptionFile, (curr, prev) => {
//    getSentimentData();
// });

//getSentimentData();

function getSentimentData(){
  fs.access(newsDescriptionFile, (err) => {
  if (!err) {

    //Remove if files already exist
    fs.access(newsSentimentFile, (err) => {
    if (!err) {
          fs.unlink(newsSentimentFile, (err) => {
            if (err)
              console.log("WARNING : "+ err +" "+ newsSentimentFile + " not found.\n");
            else
              console.log('successfully deleted ' + newsSentimentFile);
          });
        }
        else{
          console.log("WARNING : "+ err +" "+ newsSentimentFile + " not found.\n");
        }
    });

    var file = fs.createWriteStream(newsSentimentFile);
    newsSentimentArray  = [];
    array = fs.readFileSync(newsDescriptionFile).toString().split(/@/);
    var myJson = JSON.stringify(array); // "[1,2,3]"
    unirest.post("https://community-sentiment.p.mashape.com/batch/")
            .header("X-Mashape-Key", "HVDEIORzr7mshxcS5tYJyLfzkBiDp1wJQ56jsnxPbteT9Sgdpy")
            .header("Content-Type", "application/x-www-form-urlencoded")
            .header("Accept", "application/json")
            .send(myJson)
            .end(function(result){
                newsSentimentArray = result.body;
                for(var i=0; i<newsSentimentArray.length; i++){
                  file.write(JSON.stringify(newsSentimentArray[i])+ "\n");
                }
               console.log(newsSentimentFile +" writing success.");

              dataParser.ProcessNewsAndSentiment();

            });

        }
        else{
          console.log("WARNING : "+ err +" "+ newsDescriptionFile + " not found.\n");
        }
      });
  }


  exports.getSentimentData = getSentimentData;

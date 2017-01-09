
//parser for database files
class news {
  constructor() {
    this.author = "";
    this.title = "";
    this.description = "";
    this.url = "";
    this.urlToImage = "";
    this.publishedAt = "";
    this.sentimentConfidence = "";
    this.sentimentReaction = "";
  }
}

var uiServer = require('./uiServer.js');
var newsWholeData = './database/newsWholeData.txt';
var fs = require("fs");
var newsObjectArray = [];
var newsObjectPositiveArray = [];
var newsObjectNegativeArray = [];
var newsObjectNeutralArray  = [];
var newsSentimentPecentage  = [];
var contentLength = 6;
var content;

//fs.watchFile(newsWholeData, (curr, prev) => {
var ProcessNewsAndSentiment = function ProcessNewsAndSentiment(){
  fs.readFile(newsWholeData, function read(err, data) {
      if (err) {
          throw err;
      }
      content = data;
      processNewsFile();
  });
}
//});

function processNewsFile() {
  // console.log("come in dataParser");
    var stringData = content.toString();
    var textByLine = stringData.split("\n");
    var loopLimit = (textByLine.length - 2) / contentLength;
    var ii = 0;
    for(var j = 0; j < loopLimit; j++){
        var objCreate = new news();

        for(var k = 0; k < contentLength; k++){

          var textByProperty = textByLine[ii].split("@#");

          if(textByProperty[0] === 'author'){
                objCreate.author = textByProperty[1];
          }
          else if(textByProperty[0] === 'title'){
                  objCreate.title = textByProperty[1];
          }
          else if(textByProperty[0] === 'description'){
                objCreate.description = textByProperty[1];
          }
          else if(textByProperty[0] === 'url'){
                objCreate.url = textByProperty[1];
          }
          else if(textByProperty[0] === 'urlToImage'){
                objCreate.urlToImage = textByProperty[1];
          }
          else if(textByProperty[0] === 'publishedAt'){
                objCreate.publishedAt = textByProperty[1];
          }
          else{
                console.log("ERROR : "+ newsWholeData + " Parsing failed for index "+ ii);
          }
          ii = ii + 1;
        }

        newsObjectArray.push(objCreate);

    }
    if(newsObjectArray.length > 0)
       ReadprocessSentimentFile();

}

//parser for newsSentiment file
var newsSentiment = './database/newsSentiment.txt';
var sentimentContent;

function ReadprocessSentimentFile(){
//fs.watchFile(newsWholeData, (curr, prev) => {
fs.readFile(newsSentiment, function read(err, data) {
      if (err) {
          throw err;
      }
      sentimentContent = data;
      processSentimentFile();
  });
//});
}

function processSentimentFile() {
    var stringData1 = sentimentContent.toString();
    var textByLine1 = stringData1.split("\n");
    var loopLimit1 = (textByLine1.length - 2);

    for(var j = 0; j < loopLimit1; j++){

          var textSentiment = textByLine1[j].split(",");
          //console.log(textSentiment);
          var textSentimentConfidence = textSentiment[0].split(":");
          var textSentimentReaction = textSentiment[1].split(":");

          var textSentimentConfidenceValue = textSentimentConfidence[1].split(",");
          var textSentimentReactionValue = textSentimentReaction[1].split(",");

          newsObjectArray[j].sentimentConfidence = textSentimentConfidenceValue;
          newsObjectArray[j].sentimentReaction   = textSentimentReactionValue;

          var tocompare = newsObjectArray[j].sentimentReaction.toString();
          if( tocompare == "\"Positive\"}")
          {
            newsObjectPositiveArray.push(newsObjectArray[j]);
          }
          else if(tocompare == "\"Negative\"}")
          {
            newsObjectNegativeArray.push(newsObjectArray[j]);
          }
          else
          {
            newsObjectNeutralArray.push(newsObjectArray[j]);
          }
    }

    uiServer.UpdateNewsPositiveData(newsObjectPositiveArray);
    uiServer.UpdateNewsNegativeData(newsObjectNegativeArray);
    uiServer.UpdateNewsNeutralData(newsObjectNeutralArray);


    // console.log(newsObjectArray);
  //  $(document).ready(function (){
      //otherFile.something(newsObjectArray);
  //  }
}

exports.ProcessNewsAndSentiment = ProcessNewsAndSentiment;

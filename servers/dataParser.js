
//parser for database files
class news {
  constructor() {
    this.author = "";
    this.title = "";
    this.description = "";
    this.url = "";
    this.urlToImage = "";
    this.publishedAt = "";
    this.sentimentConfidence = "100";
    this.sentimentReaction = "Neutral";
  }
}

var uiServer = require('./uiServer.js');
var newsWholeData = './database/newsWholeData.txt';
var fs = require("fs");
var newsObjectArray = [];
var newsObjectPositiveArray = [];
var newsObjectNegativeArray = [];
var newsObjectNeutralArray  = [];
// var newsSentimentPecentage  = [];
var contentLength = 6;
var content;

//fs.watchFile(newsWholeData, (curr, prev) => {
var ProcessNewsAndSentiment = function ProcessNewsAndSentiment(){
  fs.access(newsWholeData, (err) => {
    if (!err) {
        fs.readFile(newsWholeData, function read(err, data) {
            if (err) {
                throw err;
            }
            content = data;
            console.log("content " + content.length);
            processNewsFile();
        });
      }
      else{
        console.log("WARNING : "+ err +" "+ newsWholeData + " not found. Will try again soon.\n");
      }
    });
}
//});

function processNewsFile() {
  newsObjectArray = [];
  // console.log("come in dataParser");
  console.log("content inside func  " + content.length);
    var stringData = content.toString();
    // console.log(stringData.length)
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
    if(newsObjectArray.length > 0){
      ReadprocessSentimentFile();
    }

    // console.log(newsObjectArray)
}

//parser for newsSentiment file
var newsSentiment = './database/newsSentiment.txt';
var sentimentContent;

function ReadprocessSentimentFile(){
  fs.access(newsSentiment, (err) => {
        if (!err) {
          fs.readFile(newsSentiment, function read(err, data) {
                if (err) {
                    throw err;
                }
                sentimentContent = data;
                console.log("sentimentContent" + sentimentContent.length);
                processSentimentFile();
            });
      }
      else{
        console.log("WARNING : "+ err +" "+ newsSentiment + " not found. Will try again soon.\n");
      }
    });
}

function processSentimentFile() {

    newsObjectPositiveArray = [];
    newsObjectNegativeArray = [];
    newsObjectNeutralArray  = [];
    var stringData1 = sentimentContent.toString();
    var textByLine1 = stringData1.split("\n");
    console.log("textByLine1.length" + textByLine1.length);
    var loopLimit1 = (textByLine1.length - 2);
    console.log("loopLimit1:- " + loopLimit1);

if(textByLine1.length >= 12){

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
}
else{

  // console.log("content inside sentiment else loop " + content.length);
    var stringData = content.toString();
    var textByLine = stringData.split("\n");
    var loopLimitForSentiment = (textByLine.length) / contentLength;
    console.log("loopLimitForSentiment else loop "+ loopLimitForSentiment);
    var eachArrayLength =  loopLimitForSentiment/3;
    console.log("eachArrayLength  " + eachArrayLength);

    for(var p = 0; p < eachArrayLength; p++){
      newsObjectArray[p].sentimentConfidence = "100";
      newsObjectArray[p].sentimentReaction   = "Positive"
      newsObjectPositiveArray.push(newsObjectArray[p]);
    }

    var lengthq = eachArrayLength + eachArrayLength;
    for(var q = p; q < lengthq; q++){
      newsObjectArray[q].sentimentConfidence = "100";
      newsObjectArray[q].sentimentReaction   = "Negative"
      newsObjectNegativeArray.push(newsObjectArray[q]);
    }

    for(var r = q; r < loopLimitForSentiment-1; r++){
      newsObjectArray[r].sentimentConfidence = "100";
      newsObjectArray[r].sentimentReaction   = "Neutral"
      newsObjectNeutralArray.push(newsObjectArray[r]);
    }
    uiServer.UpdateNewsPositiveData(newsObjectPositiveArray);
    uiServer.UpdateNewsNegativeData(newsObjectNegativeArray);
    uiServer.UpdateNewsNeutralData(newsObjectNeutralArray);

}

    // console.log(newsObjectArray);
  //  $(document).ready(function (){
      //otherFile.something(newsObjectArray);
  //  }
}

exports.ProcessNewsAndSentiment = ProcessNewsAndSentiment;

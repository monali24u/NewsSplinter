
//this server grabs data from different news api's, after that using javascript will process the data
//and handover to 'sentimentServer' for process it further.

//server configuration
var unirest = require('unirest');
var newsDescriptionArray  = [];  //to store the news discription data extracted from 'response.body'
var fs = require('fs');

//data variables
var newsDescription = './database/newsDescription.txt';
var newsWholeData = './database/newsWholeData.txt';

//stream for writing news data

console.log('newsServer is up!!');

//setup sentimentServer
var sentimentServer = require('./sentimentServer.js')

//calling news api url to fetch data and storing it into an 'newsDiscriptionArray'

var timer = setInterval(function getNewsArticles(){
  var newsWhole = fs.createWriteStream(newsWholeData);
  var newsDescrip = fs.createWriteStream(newsDescription);

  var urlWithTopArticles ="https://newsapi.org/v1/articles?source=cnn&sortBy=top&apiKey=10d1f2ab6ef24520b871e560d4def54f";
  var urlwithSource = "http://newsapi.org/v1/sources?language=en&source=cnn&sortBy=latest&apiKey=10d1f2ab6ef24520b871e560d4def54f";
  unirest.get(urlWithTopArticles)
         .end(function(response, err){
            if(err){
              console.log("ERROR : newsServer", err);
              //setTimeout(getNewsArticles, 5000);
            }
            else{
              //console.log(response.body);
                newsDescriptionArray = response.body.articles;
                for(var i=0; i<newsDescriptionArray.length; i++){
                    newsWhole.write("author@#"+ (JSON.stringify(newsDescriptionArray[i].author)).replace('\\n','') + "\n")
                    newsWhole.write("title@#"+ newsDescriptionArray[i].title + "\n")
                    newsWhole.write("description@#"+ newsDescriptionArray[i].description + "\n")
                    newsWhole.write("url@#"+ newsDescriptionArray[i].url + "\n")
                    newsWhole.write("urlToImage@#"+ newsDescriptionArray[i].urlToImage + "\n")
                    newsWhole.write("publishedAt@#"+ newsDescriptionArray[i].publishedAt + "\n")
                    // newsWhole.write("video@#" + newsDescriptionArray[i]+"\n")
                    newsDescrip.write(newsDescriptionArray[i].description+"@"+"\n");
                }
                newsWhole.end(function() { console.log(newsWholeData +" writing success."); });
                newsDescrip.end(function() { console.log(newsDescription +" writing success."); });

                //We have required news file. Tell sentiments to do its job
                sentimentServer.getSentimentData();
            }
  });

}, 10000);
//20 mins 1200000
//getNewsArticles();

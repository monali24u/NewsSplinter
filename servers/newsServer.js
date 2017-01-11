
//this server grabs data from different news api's, after that using javascript will process the data
//and handover to 'sentimentServer' for process it further.

//server configuration
var unirest = require('unirest');
var newsDescriptionArray  = [];  //to store the news discription data extracted from 'response.body'
var newsDescriptionArrayTOI  = [];  //to store the news discription data extracted from 'response.body'
var newsDescriptionArrayABCnews  = [];
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

  //Remove if files already exist
  // fs.access(newsDescription, (err) => {
  //     if (!err) {
  //         fs.unlink(newsDescription, (err) => {
  //           if (err)
  //             console.log("WARNING : "+ err +" "+ newsDescription + " not found.\n");
  //           else
  //             console.log('successfully deleted ' + newsDescription);
  //         });
  //       }
  //       else{
  //         console.log("WARNING : "+ err +" "+ newsDescription + " not found.\n");
  //       }
  // });
  //
  // fs.access(newsWholeData, (err) => {
  //     if (!err) {
  //         fs.unlink(newsWholeData, (err) => {
  //           if (err)
  //             console.log("WARNING : "+ err +" "+ newsWholeData + " not found.\n");
  //           else
  //             console.log('successfully deleted ' + newsWholeData);
  //         });
  //       }
  //       else{
  //         console.log("WARNING : "+ err +" "+ newsWholeData + " not found.\n");
  //       }
  //   });

  var newsWhole = fs.createWriteStream(newsWholeData);
  var newsDescrip = fs.createWriteStream(newsDescription);

  newsDescriptionArray  = [];
  newsDescriptionArrayTOI  = [];
  newsDescriptionArrayABCnews  = [];

  var urlWithTopArticles ="https://newsapi.org/v1/articles?source=cnn&sortBy=top&apiKey=10d1f2ab6ef24520b871e560d4def54f";

  console.log("Getting CNN data");
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
                // newsWhole.end(function() { console.log(newsWholeData +" writing success."); });
                // newsDescrip.end(function() { console.log(newsDescription +" writing success."); });

              //  We have required news file. Tell sentiments to do its job
                // sentimentServer.getSentimentData();
            }
  });

  // Get TOI data
  console.log("Getting TOI data");
  var urlWithTopArticlesTOI ="https://newsapi.org/v1/articles?source=the-times-of-india&sortBy=top&apiKey=10d1f2ab6ef24520b871e560d4def54f";
  unirest.get(urlWithTopArticlesTOI)
         .end(function(response, err){
            if(err){
              console.log("ERROR : newsServer", err);
              //setTimeout(getNewsArticles, 5000);
            }
            else{
              //console.log(response.body);
                newsDescriptionArrayTOI = response.body.articles;
                for(var i=0; i<newsDescriptionArrayTOI.length; i++){
                    newsWhole.write("author@#"+ (JSON.stringify(newsDescriptionArrayTOI[i].author)).replace('\\n','') + "\n")
                    newsWhole.write("title@#"+ newsDescriptionArrayTOI[i].title + "\n")
                    newsWhole.write("description@#"+ newsDescriptionArrayTOI[i].description + "\n")
                    newsWhole.write("url@#"+ newsDescriptionArrayTOI[i].url + "\n")
                    newsWhole.write("urlToImage@#"+ newsDescriptionArrayTOI[i].urlToImage + "\n")
                    newsWhole.write("publishedAt@#"+ newsDescriptionArrayTOI[i].publishedAt + "\n")
                    // newsWhole.write("video@#" + newsDescriptionArray[i]+"\n")
                    newsDescrip.write(newsDescriptionArrayTOI[i].description+"@"+"\n");
                }

            }
  });


  https://newsapi.org/v1/articles?source=abc-news-au&sortBy=top&apiKey={API_KEY}

  console.log("Getting ABC news Australia data");
  var urlWithTopArticlesABCnews ="https://newsapi.org/v1/articles?source=abc-news-au&sortBy=top&apiKey=10d1f2ab6ef24520b871e560d4def54f";
  unirest.get(urlWithTopArticlesABCnews)
         .end(function(response, err){
            if(err){
              console.log("ERROR : newsServer", err);
              //setTimeout(getNewsArticles, 5000);
            }
            else{
              //console.log(response.body);
                newsDescriptionArrayABCnews = response.body.articles;
                for(var i=0; i<newsDescriptionArrayABCnews.length; i++){
                    newsWhole.write("author@#"+ (JSON.stringify(newsDescriptionArrayABCnews[i].author)).replace('\\n','') + "\n")
                    newsWhole.write("title@#"+ newsDescriptionArrayABCnews[i].title + "\n")
                    newsWhole.write("description@#"+ newsDescriptionArrayABCnews[i].description + "\n")
                    newsWhole.write("url@#"+ newsDescriptionArrayABCnews[i].url + "\n")
                    newsWhole.write("urlToImage@#"+ newsDescriptionArrayABCnews[i].urlToImage + "\n")
                    newsWhole.write("publishedAt@#"+ newsDescriptionArrayABCnews[i].publishedAt + "\n")
                    // newsWhole.write("video@#" + newsDescriptionArray[i]+"\n")
                    newsDescrip.write(newsDescriptionArrayABCnews[i].description+"@"+"\n");
                }

            }
  });

  // newsWhole.end(function() { console.log(newsWholeData +" writing success."); });
  // newsDescrip.end(function() { console.log(newsDescription +" writing success."); });

  //We have required news file. Tell sentiments to do its job
    sentimentServer.getSentimentData();

}, 60000);
//20 mins 1200000
//getNewsArticles();

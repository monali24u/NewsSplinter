
//this server grabs data from different news api's, after that using javascript will process the data
//and handover to 'sentimentServer' for process it further.

//server configuration
var unirest = require('unirest');
var newsDescriptionArray  = [];  //to store the news discription data extracted from 'response.body'
var fs = require('fs');

//data variables
var newsDescription = './newsDescription.txt';

var file = fs.createWriteStream(newsDescription);
console.log('newsServer is up!!');


//calling news api url to fetch data and storing it into an 'newsDiscriptionArray'

var timer = setTimeout(function getNewsArticles(){

  var urlWithTopArticles ="https://newsapi.org/v1/articles?source=cnn&sortBy=top&apiKey=10d1f2ab6ef24520b871e560d4def54f";
  var urlwithSource = "http://newsapi.org/v1/sources?language=en&source=cnn&sortBy=latest&apiKey=10d1f2ab6ef24520b871e560d4def54f";
  unirest.get(urlWithTopArticles)
         .end(function(response, err){
            if(err){
              console.log("ERROR : newsServer", err);
            }
            else{
              //console.log(response.body);
                newsDescriptionArray = response.body.articles;
                for(var i=0; i<newsDescriptionArray.length; i++){
                    file.write(newsDescriptionArray[i].description+"@"+"\n");
                }
                file.end(function() { console.log(newsDescription +" writing success."); });
            }
  });

}, 2000);


//getNewsArticles();

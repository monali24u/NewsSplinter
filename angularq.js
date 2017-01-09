
//Angular module to show above parsed data dynamically.

var app = angular.module('newsApp', []);

app.controller('newsArticlesCntl', function($scope, $http){

 //Get positive news
  $http.get("/positive").success(function (data){

    // $scope.newsPositiveDataArray = [];
        console.log(data);
    $scope.newsPositiveDataArray = angular.fromJson(data);

  }).error(function(){
      console.log("Failure");
  });

  //Get negative news
   $http.get("/negative").success(function (data){
      //  $scope.newsNegativeDataArray = [];
     console.log(data);
     $scope.newsNegativeDataArray = angular.fromJson(data);

   }).error(function(){
       console.log("Failure");
   });

   //Get neutral news
    $http.get("/neutral").success(function (data){
      // $scope.newsNeutralDataArray  = [];
      console.log(data);
      $scope.newsNeutralDataArray = angular.fromJson(data);

    }).error(function(){
        console.log("Failure");
    });

});

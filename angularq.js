
//Angular module to show above parsed data dynamically.

var app = angular.module('newsApp', []);

app.controller('newsArticlesCntl', function($scope, $http){

  $http.get("/testing").success(function (data){
    $scope.newsDataArray = angular.fromJson(data);

  }).error(function(){
      console.log("Failure");
  });

});

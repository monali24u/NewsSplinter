
//Angular module to show above parsed data dynamically.

var app = angular.module('newsApp', []);

app.controller('newsArticlesCntl', function($scope, $http){

  $scope.positivePercent = 0;
  $scope.negativePercent = 0;
  $scope.neutralPercent = 0;
  $scope.positiveClass = 'p0';
  $scope.negativeClass = 'p0';
  $scope.neutralClass = 'p0';

 //Get positive news
  $http.get("/positive").success(function (data){
    $scope.newsPositiveDataArray = angular.fromJson(data);
    $scope.positivePercent = Math.round($scope.newsPositiveDataArray.length/($scope.newsPositiveDataArray.length + $scope.newsNegativeDataArray.length + $scope.newsNeutralDataArray.length)*100);
    $scope.negativePercent = Math.round($scope.newsNegativeDataArray.length/($scope.newsPositiveDataArray.length + $scope.newsNegativeDataArray.length + $scope.newsNeutralDataArray.length)*100);
    $scope.neutralPercent = Math.round($scope.newsNeutralDataArray.length/($scope.newsPositiveDataArray.length + $scope.newsNegativeDataArray.length + $scope.newsNeutralDataArray.length)*100);
    console.log("$scope.positivePercent " + $scope.positivePercent + " $scope.negativePercent "+ $scope.negativePercent + " $scope.neutralPercent " + $scope.neutralPercent);
    $scope.positiveClass = 'p'+$scope.positivePercent;
    $scope.negativeClass = 'p'+$scope.negativePercent;
    $scope.neutralClass = 'p'+ $scope.neutralPercent;
  }).error(function(){
      console.log("Failure");
  });

  //Get negative news
   $http.get("/negative").success(function (data){
     $scope.newsNegativeDataArray = angular.fromJson(data);
     $scope.positivePercent = Math.round($scope.newsPositiveDataArray.length/($scope.newsPositiveDataArray.length + $scope.newsNegativeDataArray.length + $scope.newsNeutralDataArray.length)*100);
     $scope.negativePercent = Math.round($scope.newsNegativeDataArray.length/($scope.newsPositiveDataArray.length + $scope.newsNegativeDataArray.length + $scope.newsNeutralDataArray.length)*100);
     $scope.neutralPercent = Math.round($scope.newsNeutralDataArray.length/($scope.newsPositiveDataArray.length + $scope.newsNegativeDataArray.length + $scope.newsNeutralDataArray.length)*100);
     console.log("$scope.positivePercent " + $scope.positivePercent + " $scope.negativePercent "+ $scope.negativePercent + " $scope.neutralPercent " + $scope.neutralPercent);
     $scope.positiveClass = 'p'+$scope.positivePercent;
     $scope.negativeClass = 'p'+$scope.negativePercent;
     $scope.neutralClass = 'p'+ $scope.neutralPercent;

   }).error(function(){
       console.log("Failure");
   });

   //Get neutral news
    $http.get("/neutral").success(function (data){
      $scope.newsNeutralDataArray = angular.fromJson(data);
      $scope.positivePercent = Math.round($scope.newsPositiveDataArray.length/($scope.newsPositiveDataArray.length + $scope.newsNegativeDataArray.length + $scope.newsNeutralDataArray.length)*100);
      $scope.negativePercent = Math.round($scope.newsNegativeDataArray.length/($scope.newsPositiveDataArray.length + $scope.newsNegativeDataArray.length + $scope.newsNeutralDataArray.length)*100);
      $scope.neutralPercent = Math.round($scope.newsNeutralDataArray.length/($scope.newsPositiveDataArray.length + $scope.newsNegativeDataArray.length + $scope.newsNeutralDataArray.length)*100);
      console.log("$scope.positivePercent " + $scope.positivePercent + " $scope.negativePercent "+ $scope.negativePercent + " $scope.neutralPercent " + $scope.neutralPercent);
      $scope.positiveClass = 'p'+$scope.positivePercent;
      $scope.negativeClass = 'p'+$scope.negativePercent;
      $scope.neutralClass = 'p'+ $scope.neutralPercent;

    }).error(function(){
        console.log("Failure");
    });


    //mathemathical calculations

});

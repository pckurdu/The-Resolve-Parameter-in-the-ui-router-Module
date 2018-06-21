var app=angular.module('myApp',['ui.router']);

app.config(['$stateProvider',function($stateProvider){

  $stateProvider
  .state('converter',{
    url:'/converter',
    templateUrl:'converter.html',
    controller:'converterCtrl'
  })
  .state('result',{
    url:'/result/:steem',
    templateUrl:'result.html',
    controller:'resultCtrl',
    resolve:{
      ethResult:function($stateParams){
        var s=$stateParams.steem;
        return s;
      }
    },
    data:{
      ethConstant:500
    }
  })

}]);

app.controller('resultCtrl',['$scope','$state','ethResult',function($scope,$state,ethResult){

$scope.steem=ethResult
$scope.ethdolar=$state.current.data.ethConstant;
$scope.eth=$scope.steem/$scope.ethdolar;

}]);


app.controller('converterCtrl',['$scope','$state',function($scope,$state){


$scope.convert=function(){
  $state.go('result',{
    steem: $scope.s
  })
}

}]);


app.run(['$rootScope',function($rootScope){

  $rootScope.$on('$stateChangeStart',function(e,toState,toParams,fromState,fromParams,option){
    console.log(toState.resolve);
  })

}])

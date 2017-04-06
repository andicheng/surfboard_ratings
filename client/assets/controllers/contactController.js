app.controller('contactController', ['$scope','surfboardsFactory', '$location','$routeParams', function($scope, surfboardsFactory, $location, $routeParams) {

   $scope.sendcontact = function(contact){
      surfboardsFactory.contact($scope.contact, function(data){
         if(data.data.errors){
            $scope.contact = {};
            alert(data.data.errors.login.message)
         }else{
            $scope.contact = {};
         }
      }, function(err){
         console.log("I am an error", err);
      })
   }
}]);

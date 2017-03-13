app.controller('contactController', ['$scope','tripsFactory', '$location','$routeParams', function($scope, tripsFactory, $location, $routeParams) {

   $scope.sendcontact = function(contact){
      tripsFactory.contact($scope.contact, function(data){
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

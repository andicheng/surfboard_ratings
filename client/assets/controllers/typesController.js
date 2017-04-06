app.controller('typesController', ['$scope','usersFactory','surfboardsFactory', '$location','$routeParams', function($scope, usersFactory, surfboardsFactory, $location, $routeParams) {

   usersFactory.getUser(function(user){
      $scope.user = user;
   });
   surfboardsFactory.getTypeDescriptions(function(typedescrips){
      $scope.typedescrips = typedescrips;
   });
   var getSurfboards = function(){
   surfboardsFactory.getSurfboards(function(returned_data){
      $scope.surfboards = returned_data;
      var surfboards = $scope.surfboards
      var names=[];
      for(var i=0; i<$scope.surfboards.length; i++){
         var sum=0;
         var sumspeedrating=0;
         var summaneuverabilityrating=0;
         var sumstabilityrating=0;
         var sumpaddlerating=0;
         var count=0;
         var manufacturer = $scope.surfboards[i].manufacturer;
         var name = $scope.surfboards[i].name;
         for(var j=i; j<$scope.surfboards.length; j++){
            if($scope.surfboards[j].name == name && $scope.surfboards[j].manufacturer == manufacturer){
               sum+=$scope.surfboards[j].rating;
               sumspeedrating+=$scope.surfboards[j].speedrating;
               summaneuverabilityrating+=$scope.surfboards[j].maneuverabilityrating;
               sumstabilityrating+=$scope.surfboards[j].stabilityrating;
               sumpaddlerating+=$scope.surfboards[j].paddlerating;
               count++
            }
         }
         var found = names.some(function (names) {
            return (names.name == name && names.manufacturer == manufacturer);
         });
         if (!found) {
            names.push({manufacturer: manufacturer, name: name, count: count, averageRating: Math.round(sum/count*10)/10,averagespeedRating: Math.round(sumspeedrating/count*10)/10,averagemaneuverabilityRating: Math.round(summaneuverabilityrating/count*10)/10,averagestabilityRating: Math.round(sumstabilityrating/count*10)/10,averagepaddleRating: Math.round(sumpaddlerating/count*10)/10})
         }
      };
      $scope.names = names;
      $scope.url = $location.absUrl();
   })};
   getSurfboards();
   $scope.logout = function(){
      console.log("logout clicked");
      usersFactory.logout(function(data){
      });
      $location.url('/login')
   };
}]);

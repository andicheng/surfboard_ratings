app.controller('dashboardController', ['$scope','usersFactory','surfboardsFactory', '$location','$routeParams', '$route', function($scope, usersFactory, surfboardsFactory,$location, $routeParams, $route) {

   usersFactory.getUser(function(user){
      $scope.user = user;
   });
   var getSurfboards = function(){
   surfboardsFactory.getSurfboards(function(returned_data){
      $scope.surfboards = returned_data;
      $scope.url = $location.absUrl();
      for(var i=0; i<$scope.surfboards.length; i++){
         $scope.surfboards[i].boardlength = Math.floor($scope.surfboards[i].boardlength/12)+"'"+($scope.surfboards[i].boardlength%12)+'"'
         $scope.surfboards[i].user[0].weight = $scope.surfboards[i].user[0].weight+" lbs or "+Math.round($scope.surfboards[i].user[0].weight/2.20462*10)/10+" kgs"
         $scope.surfboards[i].user[0].height = Math.floor($scope.surfboards[i].user[0].height/12)+"'"+($scope.surfboards[i].user[0].height%12)+'" or '+Math.round($scope.surfboards[i].user[0].height*2.54)+" cm"
         if(!$scope.surfboards[i].user[0].birthdate){
            $scope.surfboards[i].user[0].age = "Not Provided"
         }else{
         $scope.surfboards[i].user[0].age = Math.floor(Math.abs(new Date() - new Date($scope.surfboards[i].user[0].birthdate))/(1000 * 3600 * 24 * 365));
         }
      }
      var types=[];
      for(var i=0; i<$scope.surfboards.length; i++){
         var sum=0;
         var sumspeedrating=0;
         var summaneuverabilityrating=0;
         var sumstabilityrating=0;
         var sumpaddlerating=0;
         var count=0;
         var type = $scope.surfboards[i].type;
         for(var j=i; j<$scope.surfboards.length; j++){
            if($scope.surfboards[j].type == type){
               sum+=$scope.surfboards[j].rating;
               sumspeedrating+=$scope.surfboards[j].speedrating;
               summaneuverabilityrating+=$scope.surfboards[j].maneuverabilityrating;
               sumstabilityrating+=$scope.surfboards[j].stabilityrating;
               sumpaddlerating+=$scope.surfboards[j].paddlerating;
               count++
            }
         }
         var found = types.some(function (el) {
            return el.type == type;
         });
         if (!found) {
            types.push({type: type, count: count, averageRating: Math.round(sum/count*10)/10,averagespeedRating: Math.round(sumspeedrating/count*10)/10,averagemaneuverabilityRating: Math.round(summaneuverabilityrating/count*10)/10,averagestabilityRating: Math.round(sumstabilityrating/count*10)/10,averagepaddleRating: Math.round(sumpaddlerating/count*10)/10})
         }
      }
      var manufacturers=[];
      for(var i=0; i<$scope.surfboards.length; i++){
         var sum2=0;
         var sum2speedrating=0;
         var sum2maneuverabilityrating=0;
         var sum2stabilityrating=0;
         var sum2paddlerating=0;
         var count2=0;
         var manufacturer = $scope.surfboards[i].manufacturer;
         for(var j=i; j<$scope.surfboards.length; j++){
            if($scope.surfboards[j].manufacturer == manufacturer){
               sum2+=$scope.surfboards[j].rating;
               sum2speedrating+=$scope.surfboards[j].speedrating;
               sum2maneuverabilityrating+=$scope.surfboards[j].maneuverabilityrating;
               sum2stabilityrating+=$scope.surfboards[j].stabilityrating;
               sum2paddlerating+=$scope.surfboards[j].paddlerating;
               count2++;
            }
         }
         var found = manufacturers.some(function (el) {
            return el.manufacturer == manufacturer;
         });
         if (!found) {
            manufacturers.push({manufacturer: manufacturer, count: count2, averageRating: Math.round(sum2/count2*10)/10,averagespeedRating: Math.round(sum2speedrating/count2*10)/10,averagemaneuverabilityRating: Math.round(sum2maneuverabilityrating/count2*10)/10,averagestabilityRating: Math.round(sum2stabilityrating/count2*10)/10,averagepaddleRating: Math.round(sum2paddlerating/count2*10)/10})
         }
      }
      var names=[];
      for(var i=0; i<$scope.surfboards.length; i++){
         var sum3=0;
         var sum3speedrating=0;
         var sum3maneuverabilityrating=0;
         var sum3stabilityrating=0;
         var sum3paddlerating=0;
         var count3=0;
         var name = $scope.surfboards[i].name;
         for(var j=i; j<$scope.surfboards.length; j++){
            if($scope.surfboards[j].name == name){
               sum3+=$scope.surfboards[j].rating;
               sum3speedrating+=$scope.surfboards[j].speedrating;
               sum3maneuverabilityrating+=$scope.surfboards[j].maneuverabilityrating;
               sum3stabilityrating+=$scope.surfboards[j].stabilityrating;
               sum3paddlerating+=$scope.surfboards[j].paddlerating;
               count3++;
            }
         }
         var found = names.some(function (el) {
            return el.name == name;
         });
         if (!found) {
            names.push({name: name, count: count3, averageRating: Math.round(sum3/count3*10)/10,averagespeedRating: Math.round(sum3speedrating/count3*10)/10,averagemaneuverabilityRating: Math.round(sum3maneuverabilityrating/count3*10)/10,averagestabilityRating: Math.round(sum3stabilityrating/count3*10)/10,averagepaddleRating: Math.round(sum3paddlerating/count3*10)/10})
         }
      }
      $scope.names = names;
      $scope.manufacturers = manufacturers;
      $scope.types = types;
   })};
   getSurfboards();
   var getArticles = function(){
      surfboardsFactory.getArticles(function(returned_data){
         if(returned_data.data.errors){
            // $scope.errors = data.data.errors;
            alert(returned_data.data.errors);
         }else{
            $scope.articles = returned_data.data;
         }
      })
   }
   getArticles();
   $scope.logout = function(){
      console.log("logout clicked");
      usersFactory.logout(function(data){
      });
      $location.url('/login')
   }
   // $scope.newSurfboard = function(){
   //    var day = '01';
   //    var month = $scope.mySurfboard.surfboardmonth;
   //    var year = $scope.mySurfboard.surfboardyear;
   //    var date = day+' '+month+' '+year;
   //    var mydate = new Date(date);
   //    if(mydate <= new Date()){
   //       surfboardsFactory.newSurfboard($scope.mySurfboard, function(data){
   //          console.log($scope.mySurfboard);
   //          if(data.data.errors){
   //             alert(data.data.errors.message);
   //          }else{
   //             $scope.mySurfboard = {};
   //             var id = data.data._user;
   //             console.log(data);
   //             $location.path('/user/'+id)
   //          }
   //       })
   //    }else{
   //       alert('Surfboard date cannot be in the future')
   //    }
   // }
   $scope.newSurfboard = function(){
      console.log($scope.mySurfboard)
      surfboardsFactory.newSurfboard($scope.mySurfboard, function(data){
         console.log(data);
         if(data.data.errors){
            alert(data.data.errors.message);
         }else{
            $scope.mySurfboard = {};
            var id = data.data.user[0]._id;
            $location.path('/user/'+id)
         }
      })
   }
   $scope.show = function(){
      usersFactory.show($routeParams.user, function(data){
         $scope.user = data;
      });
   }
   $scope.reportcomments = function(comment, report){
      var req = Object.assign({}, comment, report);
      surfboardsFactory.reportcomments(req, function(data){
         if(data.data.errors){
            $scope.report = {};
            $scope.errors = data.data.errors;
            alert(data.data.errors.login.message);
            $route.reload();
         }else{
            $scope.report = {};
         }
      }, function(err){
         console.log("Please try again later.", err);
      })
   }
   $scope.surfboardthumbsup = function(surfboard){
      surfboardsFactory.surfboardthumbsup(surfboard, function(data){
         if(data.data.errors){
            alert(data.data.errors.message);
            $route.reload();
         }else{
            console.log('successfully liked');
            getSurfboards();
         }
      }, function(err){
         console.log("Please try again later.", err);
      })
   }
   $scope.surfboardthumbsdown = function(surfboard){
      surfboardsFactory.surfboardthumbsdown(surfboard, function(data){
         if(data.data.errors){
            alert(data.data.errors.message);
            $route.reload();
         }else{
            console.log('successfully unliked');
            getSurfboards();
         }
      }, function(err){
         console.log("Please try again later.", err);
      })
   }
   $scope.reportsurfboard = false;
}]);

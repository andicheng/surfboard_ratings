app.controller('log_regController', ['$scope','usersFactory', '$location','$routeParams', function($scope, usersFactory, $location, $routeParams) {

   usersFactory.getUser(function(user){
      $scope.user = user;
      $scope.newUser = {level: user.level,
                        fitness: user.fitness,
                        height: user.height,
                        weight: user.weight}
   });
   $scope.register = function(user){
      if($scope.newUser && $scope.newUser.password == $scope.newUser.confpass){
         if(!$scope.newUser.weight){
            $scope.newUser.weight = $scope.newUser.weightalt*2.20462;
         }
         if(!$scope.newUser.height){
            $scope.newUser.height = $scope.newUser.heightalt/2.54;
         }
         usersFactory.register($scope.newUser, function(data){
            if(data.data.errors){
               $scope.errors = data.data.errors;
               // alert(data.data.errors.message)
            }else{
               $scope.user = data.data;
               $location.url('/dashboard')
            }
         }, function(err){
            console.log("I am an error",err);
         })
      }else{
         $scope.errors = {confirm: "Password not confirmed"}
      }
   }
   $scope.login = function(user){
      usersFactory.login($scope.user, function(data){
         if(data.data.errors){
            $scope.errors = data.data.errors;
         }else{
            $location.url('/dashboard')
         }
      }, function(err){
         console.log("I am an error", err);
      })
   }
   $scope.adminlogin = function(admin){
      usersFactory.adminlogin($scope.admin, function(data){
         if(data.data.errors){
            $scope.errors = data.data.errors;
         }else{
            $scope.admin = data;
            $location.url('/admin');
         }
      }, function(err){
         console.log("I am an error", err);
      })
   }
   $scope.forgot = function(user){
      usersFactory.forgot($scope.user, function(data){
         if(data.data.errors){
            $scope.errors = data.data.errors;
            $scope.user = {};
         }else{
            $location.url('/forgot')
            $scope.user = {};
         }
      }, function(err){
         console.log("I am an error", err);
      })
   }
   $scope.reset = function(user){
      if($scope.user.password == $scope.user.confirm){
         usersFactory.reset($routeParams.id, $scope.user, function(data){
            if(data.data.errors){
               $scope.errors = data.data.errors;
               $scope.user = {};
            }else{
               $location.url('/login')
            }
         }, function(err){
            console.log("I am an error", err);
         })
      }else{
         $scope.errors = {confirm: "Password not confirmed"}
      }
   }
   $scope.updateuser = function(user){
      if(!$scope.newUser.weight){
         $scope.newUser.weight = $scope.newUser.weightalt*2.20462;
      }
      if(!$scope.newUser.height){
         $scope.newUser.height = $scope.newUser.heightalt/2.54;
      }
      usersFactory.updateuser($scope.newUser, function(data){
         if(data.data.errors){
            $scope.errors = data.data.errors;
            // alert(data.data.errors.message)
         }else{
            $scope.user = data.data;
            $location.url('/dashboard')
         }
      }, function(err){
         console.log("I am an error",err);
      })
   }
}]);

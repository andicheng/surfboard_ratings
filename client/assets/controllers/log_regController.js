app.controller('log_regController', ['$scope','usersFactory', '$location','$routeParams', function($scope, usersFactory, $location, $routeParams) {

   $scope.register = function(user){
      console.log($scope.newUser)
      if($scope.newUser && $scope.newUser.password == $scope.newUser.confpass){
         usersFactory.register($scope.newUser, function(data){
            console.log(data)
            if(data.data.errors){
               // $scope.errors = data.data.errors;
               alert(data.data.errors.message)
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
         console.log(data)
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
            console.log(data)
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

}]);

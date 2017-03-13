app.factory('usersFactory', ['$http','$location', function($http, $location) {
   var factory = {};
   factory.index = function(callback){
      $http.get('/users').then(function(returned_data){
         users = returned_data.data;
         callback(users);
      })
   };
   factory.username = function(user, callback){
      $http.post('/users/username', user).then(function(res){
         callback(res);
      })
   };
   factory.register = function(user, callback, errback){
      $http.post('/users/registration', user).then(function(res){
         callback(res);
      })
   };
   factory.login = function(user, callback, errback){
      $http.post('/users/login', user).then(function(res){
         callback(res);
      })
   };
   factory.adminlogin = function(admin, callback, errback){
      $http.post('/users/adminlogin', admin).then(function(res){
         callback(res);
      })
   };
   factory.forgot = function(user, callback, errback){
      $http.post('/users/forgot', user).then(function(res){
         callback(res);
      })
   };
   factory.reset = function(id, user, callback){
      $http.post('/users/reset/'+id, user).then(function(res){
         callback(res);
      })
   };
   factory.getUser = function(callback){
      $http.get('/currentUser').then(function(returned_data){
         callback(returned_data.data);
      })
   };
   factory.logout = function(callback){
      $http.get('/logout').then(function(res){
         callback(res);
      })
   };
   factory.delete = function(user){
      $http.delete('/users/'+user).then(function(){
         console.log("user deleted")
      });
   }
   return factory;
}]);

// factory.update = function(id, newuser, callback){
//   $http.put('/users/'+id, newuser).then(function(){
//      console.log("updated user")
//      callback();
//   })
// };

      // factory.show = function(user, callback){// what parameters do we need?
      //    $http.get('/users/'+user).then(function(returned_data){
      //       user = returned_data.data;
      //       callback(user);
      //    });
      // };
      // Sometimes you might not want to make a DB call, and just get the information stored in the factory.
      //
      // factory.getusers = function(callback){
      //    callback(users);
      // };
      // factory.getuser = function(callback){
      //    callback(user);
      // };

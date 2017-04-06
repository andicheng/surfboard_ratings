var app = angular.module('myApp',['updateMeta','720kb.socialshare','ui.filters','angular.filter','ngRoute','ngCookies']);

app.factory('loginInterceptor', ['$q','$location', function($q, $location) {
   return{
      'responseError': function(rejection){
         if(rejection.status == 401){
            $location.url('/login');
         }
         return $q.reject(rejection);
      }
   }
}])

app.config(function($routeProvider, $httpProvider){
   $httpProvider.interceptors.push('loginInterceptor');
   $routeProvider
      .when('/',{
         templateUrl: 'partials/welcome.html',
      })
      .when('/login',{
         templateUrl: 'partials/login.html',
      })
      .when('/forgot',{
         templateUrl: 'partials/forgot.html',
      })
      .when('/reset/:id',{
         templateUrl: 'partials/reset.html',
      })
      .when('/register',{
         templateUrl: 'partials/registration.html',
      })
      .when('/dashboard',{
         templateUrl: 'partials/dashboard.html',
      })
      .when('/postsurfboard',{
         templateUrl: 'partials/postsurfboard.html',
      })
      .when('/contact',{
         templateUrl: 'partials/contact.html',
      })
      .when('/legal',{
         templateUrl: 'partials/legal.html',
      })
      .when('/dmca',{
         templateUrl: 'partials/dmca.html',
      })
      .when('/dmcanotice',{
         templateUrl: 'partials/dcmacontact.html',
      })
      .when('/about',{
         templateUrl: 'partials/about.html',
      })
      .when('/type/:id',{
         templateUrl: 'partials/type.html',
      })
      .when('/typeName/:type/:name',{
         templateUrl: 'partials/typeName.html',
      })
      .when('/types',{
         templateUrl: 'partials/types.html',
      })
      .when('/name/:id',{
         templateUrl: 'partials/name.html',
      })
      .when('/manufacturer/:id',{
         templateUrl: 'partials/manufacturer.html',
      })
      .when('/manufacturerName/:manufacturer/:name',{
         templateUrl: 'partials/manufacturerName.html',
      })
      .when('/manufacturers',{
         templateUrl: 'partials/manufacturers.html',
      })
      .when('/review/:id',{
         templateUrl: 'partials/review.html',
      })
      .when('/user/:id',{
         templateUrl: 'partials/user.html',
      })
      .when('/updateuser',{
         templateUrl: 'partials/updateuser.html',
      })
      .when('/articles',{
         templateUrl: 'partials/articles.html',
      })
      .when('/article/:id',{
         templateUrl: 'partials/article.html',
      })
      .when('/adminlogin',{
         templateUrl: 'partials/adminlogin.html',
      })
      .when('/admin',{
         templateUrl: 'partials/admin.html',
      })
      .otherwise({
         redirectTo: '/dashboard'
      })
});

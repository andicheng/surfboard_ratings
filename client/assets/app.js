var app = angular.module('myApp',['720kb.socialshare','ui.filters','angular.filter','ngRoute','ngCookies']);

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
      .when('/posttrip',{
         templateUrl: 'partials/posttrip.html',
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
      .when('/country/:id',{
         templateUrl: 'partials/country.html',
      })
      .when('/area/:id',{
         templateUrl: 'partials/area.html',
      })
      .when('/region/:id',{
         templateUrl: 'partials/region.html',
      })
      .when('/regionCountry/:region/:country',{
         templateUrl: 'partials/regionCountry.html',
      })
      .when('/trip/:id',{
         templateUrl: 'partials/trip.html',
      })
      .when('/regions',{
         templateUrl: 'partials/regions.html',
      })
      .when('/user/:id',{
         templateUrl: 'partials/user.html',
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

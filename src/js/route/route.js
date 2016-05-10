angular.module('myKU-register')
.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /home
  $urlRouterProvider.otherwise("/login");
  //
  // Now set up the states
  $stateProvider
    .state('enrollment', {
      url: "/enrollment",
      templateUrl: "src/view/enrollPage.tmpl"
    })
    .state('information', {
      url: "/information",
      templateUrl: "src/view/infoPage.tmpl"
    })
    .state('login', {
      url: "/login",
      templateUrl: "src/view/login.tmpl"
    })
});

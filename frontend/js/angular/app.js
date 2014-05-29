var app = angular.module('JsonToGO', ['ngRoute', 'angular-growl']);

app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.withCredentials = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);
//
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/', {controller: MainController, templateUrl: 'templates/main.html'}).
        otherwise({redirectTo: "/"});
}]);
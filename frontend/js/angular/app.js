var app = angular.module('JsonToGO', ['ngRoute', 'angular-growl']);

app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.withCredentials = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);

app.config(['growlProvider', function(growlProvider) {
    growlProvider.globalTimeToLive(5000);
}]);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/', {controller: MainController, templateUrl: 'templates/main.html'}).
        otherwise({redirectTo: "/"});
}]);
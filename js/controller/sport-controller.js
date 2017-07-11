var app = angular.module('MyApp', ['ngResource']);
app.controller('mycontroller', ['$scope', function($scope) {
    $scope.name = "Manu Jha";
}]);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', { templateurl: '/main.html', controller: 'maincontroller' })
        .when('/sport', { templateurl: '/sport.html', controller: 'sportcontroller' })
        .when('/player', { templateurl: '/player.html', controller: 'playercontroller' })
        .otherwise({ redirectTo: '/' });

}]);

app.directive('header', function() {
    // Runs during compile
    return {
        // name: '',
        // priority: 1,
        // terminal: true,
        // scope: {}, // {} = isolate, true = child, false/undefined = no change
        controller: ['$scope', '$filter', function($scope, $filter) {
                // Your behaviour goes here :)
            }],
            // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
        restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
        // template: '',
        templateUrl: '/header.html',
        replace: true
        // transclude: true,
        // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
        //link: function($scope, iElm, iAttrs, controller) {

    }

});

app.directive('footer', function() {
    // Runs during compile
    return {
        // name: '',
        // priority: 1,
        // terminal: true,
        // scope: {}, // {} = isolate, true = child, false/undefined = no change
        controller: ['$scope', '$filter', function($scope, $filter) {
                // Your behaviour goes here :)
            }],
            // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
        restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
        // template: '',
        templateUrl: '/footer.html',
        replace: true
        // transclude: true,
        // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
        //link: function($scope, iElm, iAttrs, controller) {

    }

});

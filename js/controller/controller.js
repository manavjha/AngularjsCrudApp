// manually start/bootstrap your application using below code
//start
//angular.module('MyFirstApp', []);
//angular.element(function() {
 //           angular.bootstrap(document, ['MyFirstApp']);
//stop

var app = angular.module('MyFirstApp', []);

app.controller('mycontroller', ['$scope', '$http', function($scope, $http) {

    $scope.tasks = ['Task One', 'Task Two', 'Task Three', 'Task Four', 'Task Five'];
    $scope.msg = "demo text";


    $http({
        method: 'GET',
        url: 'https://jsonplaceholder.typicode.com/posts'
            //url: 'https://www.dalmiamedicare.com/checkUser.php'
    }).then(function successCallback(response) {
            $scope.posts = response.data;

        },
        function errorCallback(response) {

        });

}]);

// controller function for show less/more

  app.controller('myController1', function($scope, $timeout) {
      $scope.longText = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmodtempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est ";

  });

// Custom Directive 

app.directive('myDomDirective', function() {
    return {
        link: function($scope, element, attrs) {
            element.bind('click', function() {
                element.html('You clicked me!');
            });
            element.bind('mouseenter', function() {
                element.css('background-color', 'yellow');
            });
            element.bind('mouseleave', function() {
                element.css('background-color', 'white');
            });
        }
    };
});

// Another custom Directive for show-less/more component in AngularJS

app.directive('ddTextCollapse', ['$compile', function($compile) {

    return {
        restrict: 'A',
        scope: true,
        link: function(scope, element, attrs) {

            /* start collapsed */
            scope.collapsed = false;

            /* create the function to toggle the collapse */
            scope.toggle = function() {
                scope.collapsed = !scope.collapsed;
            };

            /* wait for changes on the text */
            attrs.$observe('ddTextCollapseText', function(text) {

                /* get the length from the attributes */
                var maxLength = scope.$eval(attrs.ddTextCollapseMaxLength);

                if (text.length > maxLength) {
                    /* split the text in two parts, the first always showing */
                    var firstPart = String(text).substring(0, maxLength);
                    var secondPart = String(text).substring(maxLength, text.length);

                    /* create some new html elements to hold the separate info */
                    var firstSpan = $compile('<span>' + firstPart + '</span>')(scope);
                    var secondSpan = $compile('<span ng-if="collapsed">' + secondPart + '</span>')(scope);
                    var moreIndicatorSpan = $compile('<span ng-if="!collapsed">... </span>')(scope);
                    var lineBreak = $compile('<br ng-if="collapsed">')(scope);
                    var toggleButton = $compile('<span class="collapse-text-toggle" ng-click="toggle()">{{collapsed ? "(less)" : "(more)"}}</span>')(scope);

                    /* remove the current contents of the element
                     and add the new ones we created */
                    element.empty();
                    element.append(firstSpan);
                    element.append(secondSpan);
                    element.append(moreIndicatorSpan);
                    element.append(lineBreak);
                    element.append(toggleButton);
                } else {
                    element.empty();
                    element.append(text);
                }
            });
        }
    };
}]);


//NOTE BLOCK

//* @returns {boolean} True if `value` is an `Object` but not `null`.
// */
//function isObject(value) {
  // http://jsperf.com/isobject4
 // return value !== null && typeof value === 'object';
//}

//REFERENCE LINK: https://github.com/angular/angular.js/blob/master/src/Angular.js#L630
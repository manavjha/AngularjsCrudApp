// Example of controller function with property and method
var app = angular.module('myapp', []);

app.controller('mycontroller', ['$scope', '$location', '$timeout','$interval','hexafy', function($scope, $location, $timeout,$interval,hexafy) {
    $scope.myurl = $location.absUrl();
    $scope.fname = "Manu";
    $scope.lname = "jha";
    $scope.arr = [];
    $scope.something = '';
    $scope.fullname = function() {

        return $scope.fname + " " + $scope.lname;

    };
    $scope.myHeader = "";
    $timeout(function() {
        $scope.myHeader = "How are you today?";
    }, 2000);

    $scope.theTime = new Date().toLocaleTimeString();
    $interval(function() {
        $scope.theTime = new Date().toLocaleTimeString();
    }, 1000);

    $scope.hex = hexafy.myFunc();

}]);


app.service('hexafy', function() {
    //this.myFunc = function (x) {
    //    return x.toString(16);
   // }
   this.myFunc = function(){
   console.log('hiiiiiiiiiii');
   }
});

/* app.controller('myCtrl', function($scope, $http) {
    $http.get("welcome.html")
        .then(function(response) {
            $scope.myWelcome = response.data;
        });
}); */

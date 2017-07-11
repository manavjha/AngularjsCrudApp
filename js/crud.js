var app = angular.module('MyApp',['ui.router']);

app.controller('MyCntrl', ['$scope', function($scope){
   //console.log('hi this is test.....for controller function');
   $scope.message='';
    $scope.newuser ={};
     $scope.clickeduser ={};
	    $scope.saveuser = function(){
    	//console.log($scope.newuser);
        $scope.users.push($scope.newuser);
        $scope.message='New User Added successfully !!';
			console.log($scope.newuser);
			console.log($scope.users);
    };
 $scope.selectuser =function(user){
 	console.log(user);
 	$scope.clickeduser = user;
 };
 $scope.updateuser = function(){
       $scope.message='User updated successfully !!';

 };
	
 $scope.deleteuser =function(){
 	$scope.users.splice($scope.users.indexOf($scope.clickeduser),1);
           $scope.message='User deleted successfully !!';
 };

  $scope.clearmsg =function(){
 	 $scope.message='';

 };
	$scope.users =[
       {username:"manu" , fullname:"manu jha" , email:"manu.jha@gmail.com"},
       {username:"keshav" , fullname:"keshav jha" , email:"keshav.jha@gmail.com"},
       {username:"uddhav" , fullname:"uddhav jha" , email:"uddhav.jha@gmail.com"}
	];

$scope.showPopup = [];
	
}]);

app.directive('mycustomdir',function(){
  return {
    restrict:'E',
    
   // template: '<h1>This is my first custom directive</h1>'
   templateUrl: 'header.html'
  }

});

app.directive('myDirective', function(){
	return{
		restrict: 'EA',
		 scope: {
                 showHidden: '=?'
                },
		template:'<h3 >Click me  {{a}}</h3> ',
		link:function(scope,element,attrs){
			///element.bind('mouseenter',function(){
				
				//console.log('this is my first custom directive !!');
				
			//})
			scope.a=0;
			element.on('click',function(){
				
				console.log('this is my first custom directive !!');
				scope.a=10;
				scope.$digest();
				
			})
		}
	}
	
});


app.directive('showNavPopup', function () {
   return {
     restrict: 'EA',
     link: function(scope, el, attrs) {
      el.on('click', function(){
        scope.$apply(function() {
          var id = attrs.showNavPopup;
          scope.showPopup[id] = !scope.showPopup[id];
        });
      });
     }
   };
 });

app.config(function($stateProvider){
    var helloState ={
        name: 'hello',
        url: '/hello',
        template: '<h3>hello world!</h3>'
    }
    var aboutState = {
        name: 'about',
        url: '/about',
        template: '<h3>Its the UI-Router hello world app!</h3>'
    }
    
    $stateProvider.state(helloState);
    $stateProvider.state(aboutState);
 
});

/*
function Person(fname,lname){
    this.fname = fname;
    this.lname = lname;
    this.getfullname = function(){
        return this.fname + this.lname;
    }
}

var person1 = new Person("manu "," jha");
var person2 = new Person("Keshav "," jha");
var person3 = new Person("uddhav "," jha");

console.log(person1.getfullname());
console.log(person2.getfullname());
console.log(person3.getfullname());

*/



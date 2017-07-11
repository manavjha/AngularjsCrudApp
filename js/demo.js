function someFunction() {
  console.log(this);
}
// You can pass on object to apply to bind the function's context to that object:
var a=20;
var obj ={ a:10};

function abc(){
	console.log(this.a)
}

//someFunction();
console.log(abc.call(obj));	

var object = {
    someMethod: function() {
        console.log(this);
    }
};
console.log(object.someMethod());

//When functions change scope: this becomes the new scope:

var object = {
    someMethod: function() {
        console.log(this)
    }
};

var someMethod = object.someMethod;
someMethod(); // logs window

var xx = function(a,b){
  return a+b;
};

console.log(xx(6,10));


function init() {
    window.addEventListener('scroll', function(e){
        var distanceY = window.pageYOffset || document.documentElement.scrollTop,
            shrinkOn = 300,
            header = document.querySelector("header");
        if (distanceY > shrinkOn) {
            classie.add(header,"smaller");
        } else {
            if (classie.has(header,"smaller")) {
                classie.remove(header,"smaller");
            }
        }
    });
}
window.onload = init();
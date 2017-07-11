
//alert('welcome manu');
jQuery(document).ready(function() {

var callback = function(){
  $('.item-skills').each(function(){
    newWidth = $(this).parent().width() * $(this).data('percent');
    $(this).width(0);
    $(this).animate({
        width: newWidth,
    }, 1000);
  });
  $('.icons-red').each(function(){
    height = $(this).height();
    $(this).animate({
        height: 14,
    }, 2000);
  });
};
$(document).ready(callback);

var resize;
window.onresize = function() {
  clearTimeout(resize);
  resize = setTimeout(function(){
    callback();
  }, 100);
};






  

//$('button').click(function(event) {
	//console.log('welcome manu !')

//});

/*$('button').on('click', function(event) {
//	event.preventDefault();
	//console.log('welcome manu !')

  $.getJSON('getData.json', function(json) {
			/*optional stuff to do after success */
	//		$.each(json, function(key, value) {
	//			$('ul').append('<li>' +value.name+ '</li>');
				
	//		});
	//});
//ajax call
 //$("button").on('click', function(){
 //   $.ajax({url: "demo_test.txt", success: function(response){
        
 //   	console.log(response);
   
  //  	alert(response);
      
 //       $("#div1").innerHTML=response;
  //  }});
//});



//$('#chessboard').delegate('div','click',function () {
 //   console.log('hi manu');
 //   $(this).css("background-color","#f00");
//    alert('I am ' + $(this).text());
    
//});


 // $('li').click(function(event) {
  	
    //$(this).remove(); working fine :-)
  //});
	/* Act on the event */
//});

	
});

// javascript calculator script

var op,num1,num2,answer;
function mul()
{
op=3;
num1=eval(calc.answer.value);
calc.answer.value="";
}
function add()
{
op=1;
num1=eval(calc.answer.value);
calc.answer.value="";
}
function minus()
{
op=2;
num1=eval(calc.answer.value);
calc.answer.value="";
}
function divide()
{
op=4;
num1=eval(calc.answer.value);
calc.answer.value="";
}
function calculate()
{
num2=eval(calc.answer.value);
if(op==1)
{
calc.answer.value=num1+num2;
}
else if (op==2)
{
calc.answer.value=num1-num2;
}
else if (op==3)
{
calc.answer.value=num1*num2;
}
else if (op==4)
{
calc.answer.value=num1/num2;
}
}
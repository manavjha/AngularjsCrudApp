//alert('welcome manu');
jQuery(document).ready(function() {

    $('#chessboard').delegate('div', 'click', function() {
        alert('I am ' + $(this).text());

    });

});




// javascript calculator script

var op, num1, num2, answer;

function mul() {
    op = 3;
    num1 = eval(calc.answer.value);
    calc.answer.value = "";
    
}

function add() {
    op = 1;
    num1 = eval(calc.answer.value);
    calc.answer.value = "";
}

function minus() {
    op = 2;
    num1 = eval(calc.answer.value);
    calc.answer.value = "";
}

function divide() {
    op = 4;
    num1 = eval(calc.answer.value);
    calc.answer.value = "";
}

function calculate() {
    num2 = eval(calc.answer.value);
    if (op == 1) {
        calc.answer.value = num1 + num2;
    } else if (op == 2) {
        calc.answer.value = num1 - num2;
    } else if (op == 3) {
        calc.answer.value = num1 * num2;
    } else if (op == 4) {
        calc.answer.value = num1 / num2;
    }
}

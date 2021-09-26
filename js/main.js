
const screen = document.querySelector('.screen');
var pressed_num = ' ', previous_operand = '', current_operand = '', operator = ' ';
var result_on = false, pressed_btn = false;
const key_number = document.querySelectorAll('.key-number'),
    key_delete = document.querySelector('.key-delete'),
    key_operators = document.querySelectorAll('.key-operator'),
    key_equal = document.querySelector('.key-equal'),
    key_reset = document.querySelector('.key-reset');
//====================MY FUNCTIONS=================
const displayScreen = (item)=>{
    pressed_btn = false;
    pressed_num = item.textContent;
    var current_number = screen.textContent;
    if (current_number.length > 13){
        screen.style.fontSize = '22px';
    }else {
        screen.style.fontSize = '32px';
    }
    if (current_number === '0' && pressed_num != '.' || result_on){
        screen.innerHTML = pressed_num;
        key_delete.disabled = false;
        result_on = false;
    } else{
        if (!current_number.includes('.') || pressed_num !== '.'){
            current_number += pressed_num;
            current_number = myFormat(current_number);
            if (pressed_num === '.'){
                current_number += pressed_num;
            }
            screen.innerHTML = current_number;
        }
    }
}

function toNumber(formated_num) {
    formated_num = String(formated_num);
    let aux = '';
    for (let i = 0; i < formated_num.length; i++){
        if (formated_num.charAt(i) !== ','){
            aux += formated_num.charAt(i);
        }
    }
    return aux;
}

const myFormat = (number)=>{
    number = toNumber(number);
    let [int_num, decimal_num] = number.split('.');
    let formated_num = [];
    arr_num = int_num.split('').reverse();
    for (let i = 0; i < arr_num.length;i++){
        formated_num.push(arr_num[i]);
        if((i+1)%3 === 0 && i !== arr_num.length - 1){
            formated_num.push(',')
        }
    }

    if(decimal_num){
        formated_num.reverse().push('.', ...decimal_num);
        return formated_num.join('');
    }
    return formated_num.reverse().join('');
}

function makeOperation() {
    let result = 0;
    current_operand = parseFloat(toNumber(current_operand));
    previous_operand = parseFloat(toNumber(previous_operand));
    switch(operator){
        case "x": result =  previous_operand * current_operand;
            break;
        case "/": result = previous_operand / current_operand;
            break;
        case "+": result = previous_operand + current_operand;
            break;
        case "-": result = previous_operand - current_operand;
            break;
        default: return;
    }
    result = Math.round(result*1000)/1000;
    let aux_result = myFormat(result);
    if (aux_result.length > 13){
        screen.style.fontSize = '22px';
    }else{
        screen.style.fontSize = '32px';
    }
    screen.innerHTML = aux_result;
    previous_operand = result;
    key_delete.disabled = true;
    result_on = true;
    operator = ' ';
}

//=================NUMBER BUTTONS EVENT============
key_number.forEach(n => {n.addEventListener('click', ()=>{displayScreen(n);})})
//=================OPERATORS BUTTONS EVENT============
key_operators.forEach(n=>{
    n.addEventListener('click', ()=>{
        
        if(operator !== ' '){
            if (!pressed_btn){
                current_operand = screen.textContent;
                makeOperation();
            }
            operator = n.textContent;
        } else{
            previous_operand = screen.textContent;
            operator = n.textContent;
            result_on = true;
        }
        pressed_btn = true;
    })
});
//=================DELETE button EVENT============
key_delete.addEventListener('click', ()=>{
    let current_number = screen.textContent;
    current_number = current_number.slice(0,-1);
    if(current_number === ''){
        screen.innerHTML = '0';
    } else {
        current_number = myFormat(current_number);
        screen.innerHTML = current_number;
    }
})
//=================EQUAL button EVENT============
key_equal.addEventListener('click', ()=>{
    if(!pressed_btn){
        current_operand = screen.textContent;
        makeOperation();
        operator = ' ';
        pressed_btn = false;
    }
});
//=================RESET button EVENT============
key_reset.addEventListener('click', ()=>{
    pressed_btn = false;
    result_on = false;
    previous_operand = '';
    current_operand = '';
    operator = ' ';
    screen.innerHTML = "0";
    screen.style.fontSize = '32px';
});

//=================THEME BUTTONS EVENT============
const theme_one = document.querySelector('.theme-one'),
    theme_two = document.querySelector('.theme-two'),
    theme_three = document.querySelector('.theme-three');

theme_one.addEventListener('click', ()=>{
    document.body.className = '';
    theme_one.style.opacity = 1;
    theme_two.style.opacity = 0;
    theme_three.style.opacity = 0;
});

theme_two.addEventListener('click', ()=>{
    document.body.className = '';
    document.body.className = 'theme-2';
    theme_two.style.opacity = 1;
    theme_one.style.opacity = 0;
    theme_three.style.opacity = 0;
});

theme_three.addEventListener('click', ()=>{
    document.body.className = '';
    document.body.className = 'theme-3';
    theme_three.style.opacity = 1;
    theme_two.style.opacity = 0;
    theme_one.style.opacity = 0;
});
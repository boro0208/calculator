function calcPercent(num, percentage){
    return num * (percentage / 100);
}

function disableAll(){
    document.querySelectorAll('.item').forEach(item => {
        if (item.id !== "reset") document.getElementById(item.id).style.pointerEvents = 'none';
    });
}

function enableAll(){
    document.querySelectorAll('.item').forEach(item => {
        if (item.id !== "reset") document.getElementById(item.id).style.pointerEvents = 'auto';
    });
}

function enableOperators(){
    document.querySelectorAll('.colored').forEach(item => {
        if (item.id !== "reset" && item.id !== "delete") document.getElementById(item.id).style.pointerEvents = 'auto';
    });
}

function disableOperators(){
    document.querySelectorAll('.colored').forEach(item => {
        if (item.id !== "reset" && item.id !== "delete")  document.getElementById(item.id).style.pointerEvents = 'none';
    });
}

function operate(operation){
    let result = document.getElementById("result").textContent;
    let value = document.getElementById("value").textContent;
    let val = 0;
    if (result) {
        let regex = /(?:\-|\%|\+|\/|\*)(?=[^\-\+\%\/\*]*$)/ ;
        let parts = value.match(regex);       
        let answer = value.split(regex).pop();

        (parts[0] === '%') ? val = calcPercent(parseFloat(result), parseFloat(answer)) : val = eval(parseFloat(result) + parts[0] + parseFloat(answer)); 

        (typeof val == 'number' && !isNaN(val)) ? (Number.isInteger(val)) ? val = val : val = val.toFixed(2) : val = "Error occurred! Press AC!";
        
        document.getElementById("result").textContent = val;
    }else{
        document.getElementById("result").textContent = value;
    }
}

function writeAndDelete(event){
    if(event.target.dataset.value === 'AC'){
        document.getElementById("value").innerHTML = "";
        document.getElementById("result").innerHTML = "";
        enableAll();
        enableOperators();
    }else if(event.target.dataset.value === 'C'){
        document.getElementById("value").innerHTML = document.getElementById('value').textContent.slice(0, -1);
    }else if(event.target.dataset.value === '-' || event.target.dataset.value === '+' || event.target.dataset.value === '/' || event.target.dataset.value === '*' || event.target.dataset.value === '%'){  
        operate();
        document.getElementById("value").innerHTML = document.getElementById('value').textContent.concat(event.target.dataset.value);
        document.getElementById("dot").style.pointerEvents = 'auto';
        disableOperators();
    }else if(event.target.dataset.value === '='){
        operate();
        disableAll();
    }else if(event.target.dataset.value === '.'){
        document.getElementById("value").innerHTML = document.getElementById('value').textContent.concat(event.target.dataset.value);
        document.getElementById(event.target.id).style.pointerEvents = 'none';
        disableOperators();
    }else{
        document.getElementById("value").innerHTML = document.getElementById('value').textContent.concat(event.target.dataset.value);
        enableOperators();
    }
}

document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', event => {
        writeAndDelete(event);
    });
});

window.addEventListener('keydown',function(e){  
    const key = this.document.querySelector(`p[data-key="${e.keyCode}"]`);
    if (!key) return;
    document.getElementById(key.id).click();
});
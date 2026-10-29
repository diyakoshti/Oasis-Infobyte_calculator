//========================================
// Get Elements
//========================================

const expression = document.getElementById("expression");
const result = document.getElementById("result");

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");

const clearButton = document.querySelector(".clear");
const deleteButton = document.querySelector(".delete");
const equalButton = document.querySelector(".equal");

let currentInput = "";

//========================================
// Display
//========================================

function updateDisplay()
{
    if(currentInput=="")
    {
        expression.innerHTML="0";
    }
    else
    {
        expression.innerHTML=currentInput;
    }
}

//========================================
// Number Buttons
//========================================

numberButtons.forEach(function(button)
{

    button.addEventListener("click",function()
    {

        currentInput += this.innerText;

        updateDisplay();

    });

});

//========================================
// Operator Buttons
//========================================

operatorButtons.forEach(function(button)
{

    button.addEventListener("click",function()
    {

        let op=this.innerText;

        if(currentInput=="")
        {
            return;
        }

        let last=currentInput[currentInput.length-1];

        if(last=="+" || last=="-" || last=="×" || last=="÷" || last=="%")
        {
            currentInput=currentInput.slice(0,-1);
        }

        currentInput+=op;

        updateDisplay();

    });

});

//========================================
// Clear
//========================================

clearButton.addEventListener("click",function()
{

    currentInput="";

    expression.innerHTML="0";

    result.innerHTML="0";

});

//========================================
// Delete
//========================================

deleteButton.addEventListener("click",function()
{

    currentInput=currentInput.slice(0,-1);

    updateDisplay();

});

//========================================
// Equal Button
//========================================

equalButton.addEventListener("click", function ()
{

    if(currentInput=="")
    {
        return;
    }

    let exp=currentInput;

    exp=exp.replace(/×/g,"*");

    exp=exp.replace(/÷/g,"/");

    let numbers=[];

    let operators=[];

    let num="";

    //=============================
    // Separate Numbers & Operators
    //=============================

    for(let i=0;i<exp.length;i++)
    {

        let ch=exp[i];

        if((ch>='0' && ch<='9') || ch=='.')
        {

            num+=ch;

        }

        else
        {

            numbers.push(parseFloat(num));

            operators.push(ch);

            num="";

        }

    }

    numbers.push(parseFloat(num));

    //=============================
    // Percentage
    //=============================

    for(let i=0;i<operators.length;i++)
    {

        if(operators[i]=="%")
        {

            numbers[i]=numbers[i]/100;

            numbers.splice(i+1,1);

            operators.splice(i,1);

            i--;

        }

    }

    //=============================
    // Multiplication & Division
    //=============================

    for(let i=0;i<operators.length;i++)
    {

        if(operators[i]=="*")
        {

            numbers[i]=numbers[i]*numbers[i+1];

            numbers.splice(i+1,1);

            operators.splice(i,1);

            i--;

        }

        else if(operators[i]=="/")
        {

            if(numbers[i+1]==0)
            {

                result.innerHTML="Cannot Divide by Zero";

                return;

            }

            numbers[i]=numbers[i]/numbers[i+1];

            numbers.splice(i+1,1);

            operators.splice(i,1);

            i--;

        }

    }

    //=============================
    // Addition & Subtraction
    //=============================

    let answer=numbers[0];

    for(let i=0;i<operators.length;i++)
    {

        if(operators[i]=="+")
        {

            answer+=numbers[i+1];

        }

        else if(operators[i]=="-")
        {

            answer-=numbers[i+1];

        }

    }

    //=============================
    // Show Result
    //=============================

    result.innerHTML=answer;

    currentInput=answer.toString();

});

//========================================
// Keyboard Support
//========================================

document.addEventListener("keydown",function(e)
{

    if(e.key>='0' && e.key<='9')
    {

        currentInput+=e.key;

        updateDisplay();

    }

    else if(e.key==".")
    {

        currentInput+=".";

        updateDisplay();

    }

    else if(e.key=="+" || e.key=="-")
    {

        currentInput+=e.key;

        updateDisplay();

    }

    else if(e.key=="*")
    {

        currentInput+="×";

        updateDisplay();

    }

    else if(e.key=="/")
    {

        currentInput+="÷";

        updateDisplay();

    }

    else if(e.key=="Enter")
    {

        equalButton.click();

    }

    else if(e.key=="Backspace")
    {

        deleteButton.click();

    }

});
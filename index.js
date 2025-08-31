
const baseURL = `https://latest.currency-api.pages.dev/v1/currencies/`;

console.log(baseURL);

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const swapBtn = document.querySelector("i");

for(let select of dropdowns){
    for(let cCode in conList){
        newOpt = document.createElement("option");
        newOpt.innerText = cCode;
        newOpt.value = cCode;
        select.append(newOpt);
    }

    select.addEventListener("change",(eve)=>{
        updateFlag(eve.target);
    })
}

function updateFlag(element){
    let sel = element.value;
    let currCode = conList[sel];
    let flagLink =`https://flagsapi.com/${currCode}/flat/64.png`;
    let newCon = element.parentElement.querySelector("img");
    newCon.src = flagLink;
}


async function updateCurrency(){
    let amount = document.querySelector(".amount input");
    let amtValue = amount.value;
    if(amtValue ==="" || amtValue<=0){
        alert("Enter the proper value");
        return;
    }
    let URL = `${baseURL}${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let apiKey = await response.json();
    msg.style.display = "block";
    let currVal = apiKey[fromCurr.value.toLowerCase()];
    let newRates = currVal[toCurr.value.toLowerCase()];
    let newValue = (amtValue * newRates);
    msg.classList.add("show");
    msg.innerText = `${amtValue} ${fromCurr.value} = ${newValue.toFixed(5)} ${toCurr.value}`; 
}

function interChange(){
    //interchanging countrucodes
    let tempVal = fromCurr.value;
    fromCurr.value = toCurr.value;
    toCurr.value = tempVal;

    //interchangeing flags
    let fromSrc = document.querySelector(".from div img");
    let toSrc = document.querySelector(".to div img");
    let tempSrc = fromSrc.src;
    fromSrc.src = toSrc.src;
    toSrc.src = tempSrc;
}


btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateCurrency();
});

swapBtn.addEventListener("click",()=>{
    interChange();
});

const baseURL = `https://latest.currency-api.pages.dev/v1/currencies/`;

console.log(baseURL);

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

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



function updateFlag(event){
    let sel = event.value;
    let currCode = conList[sel];
    let flagLink =`https://flagsapi.com/${currCode}/flat/64.png`;
    let newCon = event.parentElement.querySelector("img")
    newCon.src = flagLink;
}


async function updateCurrency(){
    let amount = document.querySelector(".amount input");
    let amtValue = amount.value;
    if(amtValue ==="" || amtValue<=0)
        alert("Enter the proper value");
    let URL = `${baseURL}${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let apiKey = await response.json();
    let currVal = apiKey[fromCurr.value.toLowerCase()];
    let newRates = currVal[toCurr.value.toLowerCase()];
    newValue = (amtValue * newRates);
    msg.style.display = "block";
    msg.innerText = `${amtValue} ${fromCurr.value} = ${newValue} ${toCurr.value}`; 
    
}

btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateCurrency();
});

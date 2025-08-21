let d = new Date();
let newDate = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

const baseURL = `https://${newDate}.currency-api.pages.dev/v1/currencies/`;

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



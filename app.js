const base_url="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json";
const dropdowns=document.getElementsByTagName("select");
let btn=document.querySelector("form button");
let fromsel=document.querySelector(".from select");
let tosel=document.querySelector(".to select");
let toCur=tosel.value;
let msg=document.querySelector(".msg");

for(let select of dropdowns){
    for(code in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=code;
        newOption.value=code;
        if(select.name==="from" && code==="USD"){
            newOption.selected="selected";
        }
        if(select.name==="to" && code==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target)
    })
}
const updateFlag=(element)=>{
    let curcode=element.value;
    let countCode=countryList[curcode];
    let newSrc=`https://flagsapi.com/${countCode}/flat/64.png` ;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
}
btn.addEventListener("click",async(evt)=>{
    evt.preventDefault();
    let input=document.querySelector("form input");
    let amount=input.value;
    if(amount==="" || amount<1){
        amount=1;
        input.value=1;
    }
    
    let response= await fetch(base_url);
    let exData= await response.json();
    let data=exData.eur;
   
    let fromCur=fromsel.value.toLowerCase();
    let toCur=tosel.value.toLowerCase();
    
    let exc=data[toCur]/data[fromCur];
    excValue=amount*exc;
    let result=Math.floor(excValue*100)/100;
    
    msg.innerText=` ${amount} ${fromsel.value} = ${result} ${tosel.value}`;
    
})

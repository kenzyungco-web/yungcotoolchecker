// PAGE NAVIGATION
function showPage(pageId){

  document.querySelectorAll(".page").forEach(page=>{
    page.classList.remove("active");
  });

  document.getElementById(pageId).classList.add("active");
}

// DARK MODE
const darkToggle = document.getElementById("darkToggle");

darkToggle.addEventListener("click", ()=>{

  document.body.classList.toggle("dark");

  darkToggle.innerHTML =
  document.body.classList.contains("dark")
  ? "☀️"
  : "🌙";

});

// AUTO TODAY DATE
document.getElementById("todayDate").value =
new Date().toISOString().split("T")[0];

// GUARANTEE CHECKER
function checkGuarantee(){

  const orderDate =
  new Date(document.getElementById("orderDate").value);

  const guaranteeDays =
  parseInt(document.getElementById("guaranteeDays").value);

  const today =
  new Date(document.getElementById("todayDate").value);

  if(!guaranteeDays){
    alert("Complete all fields");
    return;
  }

  const expiration =
  new Date(orderDate);

  expiration.setDate(
    expiration.getDate() + guaranteeDays
  );

  const used =
  Math.floor(
    (today - orderDate) /
    (1000*60*60*24)
  );

  const remaining =
  Math.floor(
    (expiration - today) /
    (1000*60*60*24)
  );

  let status = "";

  if(remaining >= 0){

    status = `
✅ REFUND ELIGIBLE

Days Remaining:
${remaining}
`;

  }else{

    status = `
❌ GUARANTEE EXPIRED

Expired By:
${Math.abs(remaining)} Days
`;

  }

  document.getElementById("guaranteeResult").innerText = `
Order Date:
${format(orderDate)}

Guarantee Days:
${guaranteeDays}

Days Used:
${used}

Expiration Date:
${format(expiration)}

${status}
`;

}

// DISCOUNT
function calculateDiscount(){

  const amount =
  parseFloat(document.getElementById("amount").value);

  const discounts = [10,35,50,70,75];

  let result = "";

  discounts.forEach(d=>{

    const discountAmount =
    amount * (d/100);

    const finalPrice =
    amount - discountAmount;

    result += `
${d}% Discount

Discount Amount:
$${discountAmount.toFixed(2)}

Final Price:
$${finalPrice.toFixed(2)}

-------------------------
`;

  });

  document.getElementById("discountResult").innerText = result;

}

// BUSINESS DAYS
function addBusinessDays(date,days){

  let result = new Date(date);

  let added = 0;

  while(added < days){

    result.setDate(result.getDate()+1);

    if(
      result.getDay() !== 0 &&
      result.getDay() !== 6
    ){
      added++;
    }

  }

  return result;

}

// REFUND TRACKER
function calculateRefund(){

  const refundDate =
  new Date(document.getElementById("refundDate").value);

  const range =
  document.getElementById("refundRange").value;

  const [min,max] =
  range.split("-").map(Number);

  const fromDate =
  addBusinessDays(refundDate,min);

  const toDate =
  addBusinessDays(refundDate,max);

  document.getElementById("refundResult").innerText = `
Expected Processing Window

FROM:
${format(fromDate)}

TO:
${format(toDate)}
`;

}

// AHT
function convertAHT(){

  const total =
  parseInt(document.getElementById("seconds").value);

  const hours =
  Math.floor(total/3600);

  const minutes =
  Math.floor((total%3600)/60);

  const seconds =
  total%60;

  document.getElementById("ahtResult").innerText = `
Hours:
${hours}

Minutes:
${minutes}

Seconds:
${seconds}
`;

}

// NOTATIONS
function loadTemplate(type){

  const textarea =
  document.getElementById("notationText");

  if(type===1){

    textarea.value = `Agent Name: 
REASON FOR CALLING: 
OFFER SAVE: 
THREAT: 
RESOLUTION: 
ACCOUNT STATUS:`;

  }

  if(type===2){

    textarea.value = `AGENT:
REASON FOR CALLING:
THREAT: 
SAVE OFFER:
RESOLUTION:
STATUS:

campaign:
name: 
phone number: 
email address: 
order id: 
product name:`;

  }

  if(type===3){

    textarea.value = `FOR NO ACCOUNT FOUND
Campaign: 
Order Date: 
Email: 
Name: 
Phone Number: 
Product Name: 
Tracking Number: 
Order ID:`;

  }

}

// COPY
function copyText(){

  const text =
  document.getElementById("notationText");

  navigator.clipboard.writeText(text.value);

  alert("Copied!");

}

// DATE FORMAT
function format(date){

  return date.toLocaleDateString(
    "en-US",
    {
      year:"numeric",
      month:"long",
      day:"numeric"
    }
  );

}

// NAV
function openPage(id){
  document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// CLOCK
setInterval(()=>{
  document.getElementById("clock").textContent =
    new Date().toLocaleTimeString();
},1000);

// THEME
document.getElementById("themeBtn").onclick = () =>{
  document.body.classList.toggle("light");
};

// -------------------- GUARANTEE --------------------
function checkGuarantee(){
  const order = new Date(orderDate.value);
  const days = parseInt(guaranteeDays.value);
  const today = new Date(todayDate.value);

  if(!order || !today || isNaN(days)) return;

  let expiry = new Date(order);
  expiry.setDate(expiry.getDate() + days);

  let diff = Math.floor((today - order)/(1000*60*60*24));
  let remaining = Math.floor((expiry - today)/(1000*60*60*24));

  guaranteeOut.innerHTML = `
    <p>Expiry: ${expiry.toDateString()}</p>
    <p>Used: ${diff} days</p>
    <p>${remaining >= 0 ? "Remaining" : "Expired"}: ${Math.abs(remaining)} days</p>
    <p>Status: ${today <= expiry ? "Eligible" : "Not Eligible"}</p>
  `;
}

// -------------------- DISCOUNT --------------------
function calcDiscount(){
  const a = parseFloat(amount.value);
  if(isNaN(a)) return;

  const rates = [10,35,50,70,75];
  discountOut.innerHTML = rates.map(r=>{
    let d = (a*r)/100;
    return `${r}% → Discount: ${d.toFixed(2)} | Final: ${(a-d).toFixed(2)}`;
  }).join("<br>");
}

// -------------------- REFUND --------------------
function addBD(date,days){
  let d = new Date(date);
  let count=0;

  while(count<days){
    d.setDate(d.getDate()+1);
    if(d.getDay()!=0 && d.getDay()!=6) count++;
  }
  return d;
}

function calcRefund(){
  const start = new Date(refundDate.value);
  const [min,max] = refundRange.value.split("-").map(Number);

  if(!start) return;

  let from = addBD(start,min);
  let to = addBD(start,max);

  refundOut.innerHTML = `
    From: ${from.toDateString()}<br>
    To: ${to.toDateString()}
  `;
}

// -------------------- AHT --------------------
function convert(){
  let s = parseInt(seconds.value);
  if(isNaN(s)) return;

  let h = Math.floor(s/3600);
  s%=3600;
  let m = Math.floor(s/60);
  let sec = s%60;

  ahtOut.innerHTML = `${h}h ${m}m ${sec}s`;
}

// -------------------- NOTATION --------------------
function template(t){
  if(t==1){
    noteBox.value =
`Agent Name:
REASON FOR CALLING:
OFFER SAVE:
THREAT:
RESOLUTION:
ACCOUNT STATUS:`;
  }

  if(t==2){
    noteBox.value =
`AGENT:
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

  if(t==3){
    noteBox.value =
`FOR NO ACCOUNT FOUND
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

function copyText(){
  navigator.clipboard.writeText(noteBox.value);
}

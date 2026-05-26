// ---------------- CLOCK ----------------
setInterval(()=>{
  document.getElementById("clock").textContent =
    new Date().toLocaleTimeString();
},1000);

// ---------------- THEME ----------------
document.getElementById("themeBtn").onclick = () =>{
  document.body.classList.toggle("light");
};

// ---------------- MINI SPA ROUTER ----------------
const app = document.getElementById("app");

const views = {
  home: () => `
    <div class="page">
      <h1>Utility Tool SPA</h1>

      <div class="grid">
        <button class="nav-btn" onclick="navigate('guarantee')">Money Back Checker</button>
        <button class="nav-btn" onclick="navigate('discount')">Discount Calculator</button>
        <button class="nav-btn" onclick="navigate('refund')">Refund Tracker</button>
        <button class="nav-btn" onclick="navigate('aht')">AHT Converter</button>
        <button class="nav-btn" onclick="navigate('notation')">Notations</button>
      </div>
    </div>
  `,

  guarantee: () => `
    <div class="page">
      <h2>Money Back Checker</h2>
      <div class="card">
        <input type="date" id="order">
        <input type="number" id="days" placeholder="Guarantee Days">
        <input type="date" id="today">

        <button onclick="checkGuarantee()">Calculate</button>
        <div id="out"></div>

        <button class="back" onclick="navigate('home')">Back</button>
      </div>
    </div>
  `,

  discount: () => `
    <div class="page">
      <h2>Discount Calculator</h2>
      <div class="card">
        <input type="number" id="amt" placeholder="Amount">
        <button onclick="calcDiscount()">Calculate</button>
        <div id="out"></div>
        <button class="back" onclick="navigate('home')">Back</button>
      </div>
    </div>
  `,

  refund: () => `
    <div class="page">
      <h2>Refund Tracker</h2>
      <div class="card">
        <input type="date" id="rdate">
        <select id="range">
          <option value="3-5">3-5 Days</option>
          <option value="7-14">7-14 Days</option>
        </select>

        <button onclick="calcRefund()">Calculate</button>
        <div id="out"></div>
        <button class="back" onclick="navigate('home')">Back</button>
      </div>
    </div>
  `,

  aht: () => `
    <div class="page">
      <h2>AHT Converter</h2>
      <div class="card">
        <input type="number" id="sec" placeholder="Seconds">
        <button onclick="convert()">Convert</button>
        <div id="out"></div>
        <button class="back" onclick="navigate('home')">Back</button>
      </div>
    </div>
  `,

  notation: () => `
    <div class="page">
      <h2>Notations</h2>

      <div class="card">
        <div style="display:flex;gap:10px;flex-wrap:wrap">
          <button onclick="tpl(1)">Type 1</button>
          <button onclick="tpl(2)">Type 2</button>
          <button onclick="tpl(3)">Type 3</button>
          <button onclick="copy()">Copy</button>
        </div>

        <textarea id="box"></textarea>
        <button class="back" onclick="navigate('home')">Back</button>
      </div>
    </div>
  `
};

// ---------------- NAVIGATION WITH ANIMATION ----------------
function navigate(page){
  app.style.opacity = 0;
  app.style.transform = "translateY(10px)";

  setTimeout(()=>{
    location.hash = page;
    render(page);

    app.style.opacity = 1;
    app.style.transform = "translateY(0)";
  },150);
}

function render(page){
  app.innerHTML = views[page] ? views[page]() : views.home();
}

// default route
window.addEventListener("load",()=>{
  const page = location.hash.replace("#","") || "home";
  render(page);
});

// ---------------- FUNCTIONS ----------------

// Guarantee
function checkGuarantee(){
  const o = new Date(order.value);
  const d = +days.value;
  const t = new Date(today.value);

  let exp = new Date(o);
  exp.setDate(exp.getDate()+d);

  let diff = Math.floor((t-o)/86400000);
  let rem = Math.floor((exp-t)/86400000);

  out.innerHTML = `
    <div class="result">
      Expiry: ${exp.toDateString()}<br>
      Used: ${diff} days<br>
      ${rem>=0?"Remaining":"Expired"}: ${Math.abs(rem)} days
    </div>
  `;
}

// Discount
function calcDiscount(){
  let a = +amt.value;
  const r = [10,35,50,70,75];

  out.innerHTML = r.map(x=>{
    let d = a*x/100;
    return `${x}% → ${d.toFixed(2)} (Final ${(a-d).toFixed(2)})`;
  }).join("<br>");
}

// Refund
function addBD(d,n){
  let x = new Date(d);
  let c=0;
  while(c<n){
    x.setDate(x.getDate()+1);
    if(x.getDay()!=0 && x.getDay()!=6) c++;
  }
  return x;
}

function calcRefund(){
  const [min,max]=range.value.split("-").map(Number);

  let from = addBD(rdate.value,min);
  let to = addBD(rdate.value,max);

  out.innerHTML = `
    <div class="result">
      From: ${from.toDateString()}<br>
      To: ${to.toDateString()}
    </div>
  `;
}

// AHT
function convert(){
  let s = +sec.value;
  let h=Math.floor(s/3600);
  s%=3600;
  let m=Math.floor(s/60);
  let sec2=s%60;

  out.innerHTML = `<div class="result">${h}h ${m}m ${sec2}s</div>`;
}

// Notation
function tpl(t){
  const box=document.getElementById("box");

  if(t==1){
    box.value=`Agent Name:
REASON FOR CALLING:
OFFER SAVE:
THREAT:
RESOLUTION:
ACCOUNT STATUS:`;
  }

  if(t==2){
    box.value=`AGENT:
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
    box.value=`FOR NO ACCOUNT FOUND
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

function copy(){
  navigator.clipboard.writeText(document.getElementById("box").value);
}

const API = "https://YOUR-RENDER-URL/api";

// SLIDER
let slides = document.querySelectorAll(".slide");
let i = 0;

setInterval(() => {
  slides[i].classList.remove("active");
  i = (i + 1) % slides.length;
  slides[i].classList.add("active");
}, 2000);

// MODAL
function openModal() {
  document.getElementById("modal").style.display = "block";
}

// ELIGIBILITY
function checkEligibility() {
  const age = document.getElementById("age").value;
  const gender = document.getElementById("gender").value;
  const caste = document.getElementById("caste").value;
  const state = document.getElementById("state").value;

  fetch(API + "/eligibility", {
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body: JSON.stringify({ age, gender, caste, state })
  })
  .then(res=>res.json())
  .then(data=>{
    let html="";
    data.forEach(s=>{
      html+=`
      <div class="scheme-card">
        <h3>${s.title}</h3>
        <p>${s.benefit}</p>
        <button onclick="window.open('${s.apply_link}')">Apply</button>
      </div>`;
    });

    document.getElementById("result-container").innerHTML=html;
  });
}

let step = 1;

let userData = {
  age: "",
  gender: "",
  caste: "",
  state: ""
};

function openModal() {
  document.getElementById("modal").style.display = "block";
  step = 1;
  updateStep();
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

function nextStep() {
  let input = document.getElementById("input").value;

  if (step === 1) userData.age = input;
  if (step === 2) userData.gender = input;
  if (step === 3) userData.caste = input;
  if (step === 4) userData.state = input;

  step++;

  if (step > 4) {
    checkEligibilityFinal();
    return;
  }

  updateStep();
}

function prevStep() {
  if (step > 1) {
    step--;
    updateStep();
  }
}

function updateStep() {
  const question = document.getElementById("question");
  const inputBox = document.getElementById("input-box");

  document.querySelectorAll(".step-box").forEach(e => e.classList.remove("active"));
  document.getElementById("s"+step).classList.add("active");

  if (step === 1) {
    question.innerText = "What is your age?";
    inputBox.innerHTML = `<input id="input" placeholder="Enter age">`;
  }

  if (step === 2) {
    question.innerText = "Select your gender";
    inputBox.innerHTML = `
      <select id="input">
        <option>All</option>
        <option>Male</option>
        <option>Female</option>
      </select>`;
  }

  if (step === 3) {
    question.innerText = "Select your caste";
    inputBox.innerHTML = `
      <select id="input">
        <option>All</option>
        <option>General</option>
        <option>OBC</option>
        <option>SC</option>
        <option>ST</option>
      </select>`;
  }

  if (step === 4) {
    question.innerText = "Select your state";
    inputBox.innerHTML = `
      <select id="input">
        <option>All</option>
        <option>Maharashtra</option>
        <option>Gujarat</option>
      </select>`;
  }
}

function checkEligibilityFinal() {
  fetch(API + "/eligibility", {
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body: JSON.stringify(userData)
  })
  .then(res=>res.json())
  .then(data=>{
    closeModal();

    let html="";
    data.forEach(s=>{
      html+=`
      <div class="scheme-card">
        <h3>${s.title}</h3>
        <p>${s.benefit}</p>
        <button onclick="window.open('${s.apply_link}')">Apply</button>
      </div>`;
    });

    document.getElementById("result-container").innerHTML=html;
  });
}

function signup() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch(API + "/signup", {
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body: JSON.stringify({ name, email, password })
  })
  .then(res=>res.text())
  .then(msg=>{
    alert(msg);
    window.location.href = "login.html";
  });
}

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch(API + "/login", {
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body: JSON.stringify({ email, password })
  })
  .then(res=>res.text())
  .then(msg=>{
    alert(msg);
    if(msg.includes("successful")){
      window.location.href = "index.html";
    }
  });
}

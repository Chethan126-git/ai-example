// ---------------- GLOBAL STATE ----------------
let tasks = [];
let lastActiveTime = Date.now();
let completedTasks = 0;
let mood = "Neutral";

// ---------------- INDEPENDENCE ----------------
function addTask() {
  let input = document.getElementById("taskInput").value;
  tasks.push({ name: input, done: false });
  renderTasks();
}

function renderTasks() {
  let list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    let li = document.createElement("li");
    li.innerHTML = `
      ${task.name}
      <button onclick="completeTask(${index})">Done</button>
    `;
    list.appendChild(li);
  });
}

function completeTask(index) {
  tasks[index].done = true;
  completedTasks++;
  renderTasks();
  updateIndependenceScore();
}

function updateIndependenceScore() {
  let score = (completedTasks / tasks.length) * 100 || 0;
  document.getElementById("indScore").innerText =
    "Independence Score: " + score.toFixed(1) + "%";
}

function selfCheck() {
  let response = confirm("Did you eat?");
  document.getElementById("memory").innerText =
    "Last Meal: " + new Date().toLocaleTimeString();
}

// ---------------- SAFETY ----------------
function updateActivity() {
  lastActiveTime = Date.now();
}

function checkInactivity() {
  let now = Date.now();
  let diff = (now - lastActiveTime) / 1000;

  if (diff > 10) {
    document.getElementById("safetyStatus").innerText =
      "WARNING: No activity!";
  }
}

setInterval(checkInactivity, 5000);

function triggerSOS() {
  alert("🚨 Emergency Alert Sent!");
}

function simulateFall() {
  alert("⚠️ Fall Detected!");
  document.getElementById("safetyStatus").innerText =
    "HIGH RISK";
}

// ---------------- WELL-BEING ----------------
function saveMood() {
  mood = document.getElementById("mood").value;
  updateWellBeing();
}

function chat() {
  let input = document.getElementById("chatInput").value;
  let response = "";

  if (input.includes("sad")) {
    response = "I'm here for you. Talk to me.";
  } else if (input.includes("medicine")) {
    response = "Please take your medicine on time.";
  } else {
    response = "Stay active and healthy!";
  }

  document.getElementById("chatOutput").innerText = response;
}

function updateWellBeing() {
  let score = 0;

  if (mood === "Happy") score += 50;
  if (completedTasks > 0) score += 50;

  document.getElementById("wellScore").innerText =
    "Well-being Score: " + score;

  suggestActivity();
}

function suggestActivity() {
  let suggestion = "Go for a walk";
  document.getElementById("suggestion").innerText = suggestion;
}

// ---------------- RISK ENGINE ----------------
function riskEngine() {
  let now = Date.now();
  let inactive = (now - lastActiveTime) > 15000;

  let missed = tasks.some(t => !t.done);

  let status = "SAFE";

  if (inactive && missed) {
    status = "HIGH RISK";
  } else if (inactive || missed) {
    status = "WARNING";
  }

  document.getElementById("safetyStatus").innerText = status;
}

setInterval(riskEngine, 5000);
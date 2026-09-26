const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const toast = (message) => {
  const el = $("#toast");
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => el.classList.remove("show"), 2600);
};

const loginModal = $("#loginModal");
const openLogin = () => {
  loginModal.classList.add("show");
  loginModal.setAttribute("aria-hidden", "false");
};
const closeLogin = () => {
  loginModal.classList.remove("show");
  loginModal.setAttribute("aria-hidden", "true");
};

$("#loginBtn").addEventListener("click", openLogin);
$("#modalClose").addEventListener("click", closeLogin);
loginModal.addEventListener("click", e => { if (e.target === loginModal) closeLogin(); });

$("#loginForm").addEventListener("submit", e => {
  e.preventDefault();
  $("#formMessage").textContent = "Demo login successful — welcome to TaskFlow!";
  toast("You are logged in (demo)");
  setTimeout(closeLogin, 900);
});

["#heroCta", "#navCta", "#bottomCta", "#dashboardCta"].forEach(id => {
  $(id).addEventListener("click", () => {
    if (id === "#dashboardCta") {
      document.querySelector("#dashboard").scrollIntoView({behavior:"smooth"});
      toast("Dashboard preview opened");
    } else {
      openLogin();
    }
  });
});

$("#demoBtn").addEventListener("click", () => {
  document.querySelector("#dashboard").scrollIntoView({behavior:"smooth"});
  toast("Here is the TaskFlow dashboard demo");
});

$$(".plan-btn").forEach(btn => btn.addEventListener("click", () => {
  const action = btn.textContent.trim();
  if (action.includes("Contact")) {
    toast("Sales request started — this is a demo");
  } else {
    openLogin();
  }
}));

$$(".faq-item").forEach(item => item.addEventListener("click", () => {
  item.classList.toggle("open");
}));

$("#themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  $("#themeToggle").textContent = document.body.classList.contains("dark") ? "☀" : "☾";
  localStorage.setItem("taskflow-theme", document.body.classList.contains("dark") ? "dark" : "light");
});

if (localStorage.getItem("taskflow-theme") === "dark") {
  document.body.classList.add("dark");
  $("#themeToggle").textContent = "☀";
}

$("#menuBtn").addEventListener("click", () => {
  $("#navMenu").classList.toggle("open");
});

$$(".navbar nav a").forEach(a => a.addEventListener("click", () => $("#navMenu").classList.remove("open")));

document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeLogin();
});

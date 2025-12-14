const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const themeToggle = document.getElementById("theme-toggle");

let currentInput = "";
let resultDisplayed = false;

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.documentElement.classList.add("dark");
  themeToggle.innerText = "☀ Light Mode";
} else {
  document.documentElement.classList.remove("dark");
  themeToggle.innerText = "🌙 Dark Mode";
}

const buttonColors = {
  "clear": { light: "bg-red-500 hover:bg-red-600", dark: "bg-red-600 hover:bg-red-700" },
  "delete": { light: "bg-yellow-500 hover:bg-yellow-600", dark: "bg-yellow-600 hover:bg-yellow-700" },
  "operator": { light: "bg-orange-500 hover:bg-orange-600", dark: "bg-orange-600 hover:bg-orange-700" },
  "equal": { light: "bg-green-500 hover:bg-green-600", dark: "bg-green-600 hover:bg-green-700" },
  "number": { light: "bg-gray-300 hover:bg-gray-400 text-gray-900", dark: "bg-gray-700 hover:bg-gray-600 text-white" }
};

themeToggle.addEventListener("click", () => {
  const isDark = document.documentElement.classList.toggle("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  themeToggle.innerText = isDark ? "☀ Light Mode" : "🌙 Dark Mode";

  buttons.forEach(btn => {
    btn.classList.remove(
      "bg-red-500", "bg-red-600",
      "bg-yellow-500", "bg-yellow-600",
      "bg-orange-500", "bg-orange-600",
      "bg-green-500", "bg-green-600",
      "bg-gray-300", "bg-gray-700",
      "hover:bg-red-600", "hover:bg-red-700",
      "hover:bg-yellow-600", "hover:bg-yellow-700",
      "hover:bg-orange-600", "hover:bg-orange-700",
      "hover:bg-green-600", "hover:bg-green-700",
      "hover:bg-gray-400", "hover:bg-gray-600",
      "text-gray-900", "text-white"
    );

    const action = btn.dataset.action;
    if (action === "clear") btn.classList.add(...buttonColors.clear[isDark ? "dark" : "light"].split(" "));
    else if (action === "delete") btn.classList.add(...buttonColors.delete[isDark ? "dark" : "light"].split(" "));
    else if (action === "=") btn.classList.add(...buttonColors.equal[isDark ? "dark" : "light"].split(" "));
    else if (["+", "-", "*", "/", "%", "^"].includes(action)) btn.classList.add(...buttonColors.operator[isDark ? "dark" : "light"].split(" "));
    else btn.classList.add(...buttonColors.number[isDark ? "dark" : "light"].split(" "));
  });
});

buttons.forEach(btn => {
  btn.addEventListener("click", () => handleInput(btn.dataset.action));
});



function executeEquals() {
  try {
    currentInput = eval(
      currentInput
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/\^/g, "**")
    );
    display.innerText = currentInput;
    resultDisplayed = true;
  } catch {
    display.innerText = "Error";
    currentInput = "";
    resultDisplayed = false;
  }
}



function handleInput(action) {


  if (action === "=") {
    executeEquals();
    return;
  }


  if (action === "clear") {
    currentInput = "";
    display.innerText = "0";
    resultDisplayed = false;
  } else if (action === "delete") {
    if (!resultDisplayed) {
      currentInput = currentInput.slice(0, -1);
      display.innerText = currentInput || "0";
    }
  } 

  else if (action === "=") {
    try {
      currentInput = eval(currentInput.replace(/×/g, "*").replace(/÷/g, "/").replace(/\^/g, "**"));
      display.innerText = currentInput;
      resultDisplayed = true;
    } catch {
      display.innerText = "Error";
      currentInput = "";
    }
  }

  else {
    if (resultDisplayed) {
      if (!isNaN(action) || action === ".") {
        currentInput = action;
      } else {
        currentInput += action;
      }
      resultDisplayed = false;
    } else {
      currentInput += action;
    }
    display.innerText = currentInput;
  }
}

document.addEventListener("keydown", (e) => {

  
  if (e.key === "Enter") {
    e.preventDefault();
    executeEquals();
    return;
  }
 

  if (e.key >= "0" && e.key <= "9") handleInput(e.key);
  else if (e.key === ".") handleInput(".");
  else if (e.key === "Enter") handleInput("="); 
  else if (e.key === "Backspace") handleInput("delete");
  else if (e.key === "Escape") handleInput("clear");
  else if (["+", "-", "*", "/", "%", "^"].includes(e.key)) handleInput(e.key);
});

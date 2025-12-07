const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const themeToggle = document.getElementById("theme-toggle");

let currentInput = "";
let resultDisplayed = false;

// Button color classes mapping
const buttonColors = {
  "clear": { light: "bg-red-500 hover:bg-red-600", dark: "bg-red-600 hover:bg-red-700" },
  "delete": { light: "bg-yellow-500 hover:bg-yellow-600", dark: "bg-yellow-600 hover:bg-yellow-700" },
  "operator": { light: "bg-orange-500 hover:bg-orange-600", dark: "bg-orange-600 hover:bg-orange-700" },
  "equal": { light: "bg-green-500 hover:bg-green-600", dark: "bg-green-600 hover:bg-green-700" },
  "number": { light: "bg-gray-300 hover:bg-gray-400 text-gray-900", dark: "bg-gray-700 hover:bg-gray-600 text-white" }
};

// Dark Mode Toggle
themeToggle.addEventListener("click", () => {
  const isDark = document.documentElement.classList.toggle("dark");
  themeToggle.innerText = isDark ? "☀ Light Mode" : "🌙 Dark Mode";

  // Update button colors dynamically
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

// Button click functionality
buttons.forEach(btn => {
  btn.addEventListener("click", () => handleInput(btn.dataset.action));
});

// Main function to handle calculator input
function handleInput(action) {
  if (action === "clear") {
    currentInput = "";
    display.innerText = "0";
    resultDisplayed = false;
  } else if (action === "delete") {
    if (!resultDisplayed) {
      currentInput = currentInput.slice(0, -1);
      display.innerText = currentInput || "0";
    }
  } else if (action === "=") {
    try {
      currentInput = eval(currentInput.replace(/×/g, "*").replace(/÷/g, "/").replace(/\^/g, "**"));
      display.innerText = currentInput;
      resultDisplayed = true;
    } catch {
      display.innerText = "Error";
      currentInput = "";
    }
  } else {
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

// Keyboard support
document.addEventListener("keydown", (e) => {
  if (e.key >= "0" && e.key <= "9") handleInput(e.key);
  else if (e.key === ".") handleInput(".");
  else if (e.key === "Enter") handleInput("=");
  else if (e.key === "Backspace") handleInput("delete");
  else if (e.key === "Escape") handleInput("clear");
  else if (["+", "-", "*", "/", "%", "^"].includes(e.key)) handleInput(e.key);
});

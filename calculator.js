
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




themeToggle.onclick = function () {
  if (document.documentElement.classList.contains("dark")) {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
    themeToggle.innerText = "🌙 Dark Mode";
  } else {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
    themeToggle.innerText = "☀ Light Mode";
  }
};



for (let i = 0; i < buttons.length; i++) {
  buttons[i].onclick = function () {

    let action = buttons[i].innerText;
56

    if (action === "÷") action = "/";
    if (action === "×") action = "*";
    if (action === "xʸ") action = "^";

    handleInput(action);

   
    buttons[i].blur();
  };
}




function executeEquals() {
  try {
    let expression = currentInput.replace("^", "**");
    let evalResult = eval(expression); 
    currentInput = evalResult.toString(); 
    display.innerText = currentInput;
    resultDisplayed = true; 
  } catch (e) {
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

 
  if (action === "AC") {
    currentInput = "";
    display.innerText = "0";
    resultDisplayed = false;
    return;
  }

 
  if (action === "DEL") {
    if (resultDisplayed === false) {
      currentInput = currentInput.slice(0, currentInput.length - 1);
      display.innerText = currentInput === "" ? "0" : currentInput;
    }
    return;
  }


  if (
    action === "0" || action === "1" || action === "2" ||
    action === "3" || action === "4" || action === "5" ||
    action === "6" || action === "7" || action === "8" ||
    action === "9"
  ) {
    if (resultDisplayed === true) {
      currentInput = action;
      resultDisplayed = false;
    } else {
      currentInput = currentInput + action;
    }
    display.innerText = currentInput;
    return;
  }


  if (action === ".") {
    if (resultDisplayed === true) {
      currentInput = ".";
      resultDisplayed = false;
    } else {
      currentInput = currentInput + ".";
    }
    display.innerText = currentInput;
    return;
  }

 
  if (
    action === "+" || action === "-" ||
    action === "*" || action === "/" ||
    action === "%" || action === "^"
  ) {
    resultDisplayed = false;
    currentInput = currentInput + action;
    display.innerText = currentInput;
  }
}




document.onkeydown = function (e) {

  if (e.key === "Enter") executeEquals();
  if (e.key === "Backspace") handleInput("DEL");
  if (e.key === "Escape") handleInput("AC");

  if (e.key === "0") handleInput("0");
  if (e.key === "1") handleInput("1");
  if (e.key === "2") handleInput("2");
  if (e.key === "3") handleInput("3");
  if (e.key === "4") handleInput("4");
  if (e.key === "5") handleInput("5");
  if (e.key === "6") handleInput("6");
  if (e.key === "7") handleInput("7");
  if (e.key === "8") handleInput("8");
  if (e.key === "9") handleInput("9");

  if (e.key === ".") handleInput(".");
  if (e.key === "+") handleInput("+");
  if (e.key === "-") handleInput("-");
  if (e.key === "*") handleInput("*");
  if (e.key === "/") handleInput("/");
  if (e.key === "%") handleInput("%");
  if (e.key === "^") handleInput("^");
};

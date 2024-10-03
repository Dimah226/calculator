const buttons = document.querySelectorAll(".boutton");
const operation = document.querySelector(".operation");
const resultat = document.querySelector(".resultat");
let nombre1 = "";
let nombre2 = "";
let signe = "";
let isResultDisplayed = false;

// Handle button clicks
buttons.forEach(el => {
    el.addEventListener("click", () => {
        handleInput(el.textContent);
    });
});

// Handle input values
function handleInput(value) {
    // If it's a number
    if (!isNaN(value)) {
        if (resultat.textContent === "0" && value === "0") {
            return;
        }
        if (resultat.textContent === "0" || isResultDisplayed) {
            resultat.textContent = value;
            if (signe === "") {
                nombre1 = value;
            } else {
                nombre2 += value;
            }
            isResultDisplayed = false;
            operation.textContent = `${nombre1} ${signe}`;
        } else {
            if (signe === "") {
                nombre1 += value;
            } else {
                nombre2 += value;
            }
            operation.textContent = `${nombre1} ${signe} ${nombre2}`;
            if (nombre2 !== "") {
                resultat.textContent = nombre2;
            } else {
                resultat.textContent = nombre1;
            }
        }
    } 
    // If it's an operator
    else if (["+", "-", "x", "/"].includes(value)) {
        if (signe === "") {
            signe = value;
            operation.textContent = `${nombre1} ${signe}`;
            resultat.textContent = "";
        } else {
            calculate();
            signe = value;
            operation.textContent = `${nombre1} ${signe}`;
            nombre2 = "";
        }
    } 
    // If it's the equal sign "="
    else if (value === "=") {
        calculate();
    } 
    // If it's the "AC" (Clear) button
    else if (value === "AC") {
        resetCalculator();
    }
    // Handle "+/-"
    else if (value === "+/-") {
        toggleSign();
    } 
    // Handle percentage
    else if (value === "%") {
        togglePerc();
    } 
    // Handle decimal point
    else if (value === ".") {
        togglePoint();
    }

    else if (value === "Backspace") {
        toggleDel();
    }
}

// Reset the calculator
function resetCalculator() {
    operation.textContent = "";
    resultat.textContent = "0";
    nombre1 = "";
    nombre2 = "";
    signe = "";
}

// Toggle the sign of the current number
function toggleSign() {
    if (nombre2 !== "") {
        nombre2 = -nombre2;
        resultat.textContent = nombre2;
        operation.textContent = `${nombre1} ${signe} (${nombre2})`;
    } else if (signe !== "") {
        return;
    } else {
        nombre1 = -nombre1;
        resultat.textContent = nombre1;
        operation.textContent = `${nombre1}`;
    }
}

function toggleDel() {
    if (nombre2 !== "") {
        nombre2 = nombre2.slice(0, -1);
        resultat.textContent = nombre2;
        operation.textContent = `${nombre1} ${signe} (${nombre2})`;
    } else if (signe !== "") {
        signe = "";
        resultat.textContent = `${nombre1}`;
        operation.textContent = `${nombre1}`;
    } else if (nombre1 !== "") {
        nombre1 = nombre1.slice(0, -1);
        resultat.textContent = nombre1;
        if (nombre1===""){
            resultat.textContent = "0";
        }
        operation.textContent = `${nombre1}`;
    }
}


// Toggle percentage of the current number
function togglePerc() {
    if (nombre2 !== "") {
        nombre2 = nombre2 / 100;
        resultat.textContent = nombre2;
        operation.textContent = `${nombre1} ${signe} (${nombre2})`;
    } else if (signe !== "") {
        return;
    } else {
        nombre1 = nombre1 / 100;
        resultat.textContent = nombre1;
        operation.textContent = `${nombre1}`;
    }
}

// Handle decimal point input
function togglePoint() {
    if (signe !== "" && nombre2 === "") {
        return;
    }

    if (nombre2 !== "" && !nombre2.includes(".")) {
        nombre2 += ".";
        resultat.textContent = nombre2;
        operation.textContent = `${nombre1} ${signe} (${nombre2})`;
    } else if (nombre1 === "") {
        nombre1 += "0.";
        resultat.textContent = nombre1;
        operation.textContent = nombre1;
    } else if (nombre1 !== "" && !nombre1.includes(".")) {
        nombre1 += ".";
        resultat.textContent = nombre1;
        operation.textContent = `${nombre1}`;
    }
}

// Perform the calculation
function calculate() {
    let result;
    if (nombre1 === "" || nombre2 === "") {
        return;
    }
    const num1 = parseFloat(nombre1);
    const num2 = parseFloat(nombre2);

    if (signe === "+") {
        result = num1 + num2;
    } else if (signe === "-") {
        result = num1 - num2;
    } else if (signe === "/") {
        result = num2 !== 0 ? num1 / num2 : "Error";
    } else if (signe === "x") {
        result = num1 * num2;
    }

    resultat.textContent = result;
    isResultDisplayed = true;
    nombre1 = result.toString();
    nombre2 = "";
    signe = "";
    operation.textContent = `${nombre1}`;
}

// Event listener for keyboard input
document.addEventListener("keydown", (event) => {
    
    const key = event.key;
    if ("0123456789".includes(key)) {
        handleInput(key);
    } else if (key === "=" || key === "Enter") {
        handleInput("=");
    } else if (key === "Escape") {
        handleInput("AC");
    } else if (["+", "-", "*", "/"].includes(key)) {
        handleInput(key === "*" ? "x" : key);
    }else if (key==="Backspace") {
        handleInput("Backspace");
    }
});

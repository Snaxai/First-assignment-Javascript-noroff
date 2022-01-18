const salaryEl = document.getElementById("salary");
const loanEl = document.getElementById("loan");
const moneyInBankEl = document.getElementById("moneyInBank");
const laptopsEl = document.getElementById("laptops");
const bankButtonEl = document.getElementById("bankButton");
const loanButtonEl = document.getElementById("loanButton");
const workButtonEl = document.getElementById("workButton");
const repayLoanEl = document.getElementById("bankButtons");
const priceEl = document.getElementById("price");
const descriptionEl = document.getElementById("description");
const laptopImgEl = document.getElementById("laptopImg");
const buyButton = document.getElementById("buyButton");
const laptopTitleEl = document.getElementById("laptopTitle");
const repayLoanButton = document.getElementById("repayLoan");
const laptopInfoEl = document.getElementById("laptopInfo");
const loanContainerEl = document.getElementById("loanContainer");

// Global variables
const payPerClick = 100;
let laptops = [];
let selectedLaptop = {};
let salary = 0;
let bank = 0;
let loan = 0;

// Fetches the laptops used in the project
fetch("https://noroff-komputer-store-api.herokuapp.com/computers")
  .then((response) => response.json())
  .then((data) => (laptops = data))
  .then((laptops) => addLaptopsToSelect(laptops));

/**
 * Adds laptops to the select element
 * and also renders default values to the screen (laptop 0 info)
 * @param {array} laptops - Array of laptops
 */
const addLaptopsToSelect = (laptops) => {
  laptops.forEach((laptop) => addLaptopToSelect(laptop));
  priceEl.innerText = laptops[0].price + " NOK";
  descriptionEl.innerText = laptops[0].description;
  selectedLaptop = laptops[0];
  laptopTitleEl.innerText = laptops[0].title;
  updateSalaryHTML();
  updateBank();
  updateLaptopFeatures(laptops[0].specs);
  laptopImgEl.src =
    "https://noroff-komputer-store-api.herokuapp.com/assets/images/1.png";
};

/**
 * Adds specific laptop to the select element
 * @param {object} laptop - A specific laptop
 */
const addLaptopToSelect = (laptop) => {
  const laptopElement = document.createElement("option");
  laptopElement.value = laptop.id;
  laptopElement.appendChild(document.createTextNode(laptop.title));
  laptopsEl.appendChild(laptopElement);
};

/**
 * Renders the information about a laptop when laptop select changes
 * @param {*} e
 */
const handleLaptopChange = (e) => {
  laptopInfoEl.innerHTML = "";
  selectedLaptop = laptops[e.target.selectedIndex];
  priceEl.innerText = selectedLaptop.price + " NOK";
  descriptionEl.innerText = selectedLaptop.description;
  updateLaptopFeatures(selectedLaptop.specs);
  laptopImgEl.src =
    "https://noroff-komputer-store-api.herokuapp.com/" + selectedLaptop.image;
};

/**
 * Renders out the specs for a laptop
 * @param {object} specs - The specs of the laptop
 */
const updateLaptopFeatures = (specs) => {
  specs.forEach((feature) => {
    const laptopSpecElement = document.createElement("div");
    laptopSpecElement.appendChild(document.createTextNode(feature));
    laptopInfoEl.appendChild(laptopSpecElement);
  });
};

/**
 * Simulates work. Adds salary
 */
const doWork = () => {
  salary += payPerClick;
  updateSalaryHTML();
};

/**
 * Updates the html for salary
 */
const updateSalaryHTML = () => {
  salaryEl.innerHTML = salary + " Kr";
};

/**
 * Deposit salary to bank.
 */
const depositToBank = () => {
  // Checks for loan and calculates the amount
  bank += calculateLoanPayment(salary);

  salary = 0;
  updateSalaryHTML();
  updateLoan();
  updateBank();
};

/**
 * Checks for loan and calculates the amount
 * @param {number} salary
 * @returns The salary that are available for deposit
 */
const calculateLoanPayment = (salary) => {
  if (loan) {
    const loanDownPayment = 0.1 * salary;
    console.log("Amount to pay for the loan this time: " + loanDownPayment);
    loan -= loanDownPayment;
    return salary - loanDownPayment;
  } else {
    return salary;
  }
};

/**
 * Updates the loan html. Removes the repay info if there is no loan
 */
const updateLoan = () => {
  loanEl.innerHTML = loan;
  if (loan > 0) {
    loanContainerEl.style.display = "inline";
    repayLoanButton.style.display = "inline";
  } else {
    loanContainerEl.style.display = "none";
    repayLoanButton.style.display = "none";
  }
};

/**
 * Updates the bank html
 */
const updateBank = () => {
  moneyInBankEl.innerHTML = bank + " Kr";
};

/**
 * Prompts the user for the loan amount they wish for and then updates html
 */
const loanPrompt = () => {
  if (loan < 0 || loan == 0) {
    let loanMessage = prompt(
      "Please enter the amount you want to loan. You can maximum loan " +
        bank * 2
    );
    let loanInput = parseInt(loanMessage);
    requestLoan(loanInput);

    if (loan > 0) {
      updateLoan();
      updateBank();
    }
  } else {
    window.alert("Pay back your current loan before taking a new loan");
  }
};

/**
 * Repays the loan with available salary and then updates the html
 */
const repayLoan = () => {
  let loanToBePayed = loan;
  let currentSalary = salary;

  if (currentSalary - loan < 0) {
    loan = loan - salary;
    salary = 0;
  } else if (loanToBePayed - currentSalary < 0) {
    salary = salary - loan;
    loan = 0;
  } else {
    loan = loan - salary;
    salary = loanToBePayed - currentSalary;
  }

  updateLoan();
  updateSalaryHTML();
};

/**
 * Updates the bank and loan variable and some error handling
 * @param {number} loanAmount - The amount you wish to loan
 * @returns the loan amount entered
 */
const requestLoan = (loanAmount) => {
  if (loanAmount && loanAmount < bank * 2) {
    bank += loanAmount;
    loan += loanAmount;
  } else if (bank <= 0) {
    alert(
      "You dont have any money and therefore can not make a loan. Go work first"
    );
  } else {
    alert("Not a valid value");
  }

  return loanAmount;
};

/**
 * Buy laptop alert and updates the bank
 */
const handleBuyLaptop = () => {
  if (bank < selectedLaptop.price) {
    alert("Insufficient funds");
  } else {
    bank -= selectedLaptop.price;
    updateBank();
    alert(`Congratulations! You now own a ${selectedLaptop.title}!`);
  }
};

// All eventlisteners
workButtonEl.addEventListener("click", doWork);
bankButtonEl.addEventListener("click", depositToBank);
loanButtonEl.addEventListener("click", loanPrompt);
laptopsEl.addEventListener("change", handleLaptopChange);
buyButton.addEventListener("click", handleBuyLaptop);
repayLoanButton.addEventListener("click", repayLoan);

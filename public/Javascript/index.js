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

let laptops = [];
let selectedLaptop = {};
let salary = 0;
let bank = 0;
let loan = 0;

fetch("https://noroff-komputer-store-api.herokuapp.com/computers")
  .then((response) => response.json())
  .then((data) => (laptops = data))
  .then((laptops) => addLaptopsToSelect(laptops));

const addLaptopsToSelect = (laptops) => {
  laptops.forEach((laptop) => addLaptopToSelect(laptop));
  priceEl.innerText = laptops[0].price;
  descriptionEl.innerText = laptops[0].description;
  selectedLaptop = laptops[0];
  laptopTitleEl.innerText = laptops[0].title;
  laptopImgEl.src =
    "https://noroff-komputer-store-api.herokuapp.com/assets/images/1.png";
};

const addLaptopToSelect = (laptop) => {
  const laptopElement = document.createElement("option");
  laptopElement.value = laptop.id;
  laptopElement.appendChild(document.createTextNode(laptop.title));
  laptopsEl.appendChild(laptopElement);
};

const handleLaptopChange = (e) => {
  laptopInfoEl.innerHTML = ""
  selectedLaptop = laptops[e.target.selectedIndex];
  priceEl.innerText = selectedLaptop.price;
  descriptionEl.innerText = selectedLaptop.description;
  updateLaptopFeatures(selectedLaptop.specs);
  laptopImgEl.src =
    "https://noroff-komputer-store-api.herokuapp.com/" + selectedLaptop.image;
};

const updateLaptopFeatures = (specs) => {
  console.log(specs)
  specs.forEach((feature) => {
    const laptopSpecElement = document.createElement("div");
    laptopSpecElement.appendChild(document.createTextNode(feature));
    laptopInfoEl.appendChild(laptopSpecElement);
  });
};

const doWork = () => {
  salary += 100;
  console.log("Work Work and salary is now: " + salary);
  updateSalaryHTML();
};

const updateSalaryHTML = () => {
  salaryEl.innerHTML = salary;
};

const depositToBank = () => {
  // need to do some calculations if there is a loan

  bank += calculateLoanPayment(salary);

  console.log("salary moved to bank");
  salary = 0;
  updateSalaryHTML();
  updateLoan();
  updateBank();
};

// subtracts an amount for down payment for the loan
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

const updateLoan = () => {
  loanEl.innerHTML = loan;
  if (loan > 0) {
    repayLoanButton.style.display = "inline";
  } else {
    repayLoanButton.style.display = "none";
  }
};

const updateBank = () => {
  moneyInBankEl.innerHTML = bank;
};

const loanPrompt = () => {
  if (loan < 0 || loan == 0) {
    let loanMessage = prompt(
      "Please enter the amount you want to loan. You can maximum loan " +
        bank * 2
    );
    let loanInput = parseInt(loanMessage);
    requestLoan(loanInput);

    updateLoan();
    updateBank();
    if (loan > 0) {
      createRepayLoanButton();
    }
  } else {
    window.alert("Pay back your current loan before taking a new loan");
  }
};

const removeRepayLoanButton = () => {
  console.log("Remove button");
};

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

const requestLoan = (loanAmount) => {
  if (loanAmount && loanAmount < bank * 2) {
    bank += loanAmount;
    loan += loanAmount;

    console.log("You entered: " + loanAmount);
  } else if (bank <= 0) {
    alert(
      "You dont have any money and therefore can not make a loan. Go work first"
    );
  } else {
    alert("Not a valid value");
  }

  return loanAmount;
};

const handleBuyLaptop = () => {
  if (bank < selectedLaptop.price) {
    alert("Insufficient funds");
  } else {
    bank -= selectedLaptop.price;
    updateBank();
    alert(`Congratulations! You now own a ${selectedLaptop.title}!`);
  }
};

workButtonEl.addEventListener("click", doWork);
bankButtonEl.addEventListener("click", depositToBank);
loanButtonEl.addEventListener("click", loanPrompt);
laptopsEl.addEventListener("change", handleLaptopChange);
buyButton.addEventListener("click", handleBuyLaptop);
repayLoanButton.addEventListener("click", repayLoan);

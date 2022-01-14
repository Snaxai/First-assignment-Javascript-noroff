const salaryEl = document.getElementById("salary");
const moneyInBankEl = document.getElementById("moneyInBank");
const laptopsEl = document.getElementById("laptops");
const bankButtonEl = document.getElementById("bankButton");
const loanButtonEl = document.getElementById("loanButton");
const workButtonEl = document.getElementById("workButton");

let laptops = [];
let salary = 0;
let bank = 0;
let loan = 0;

const doWork = () => {
  salary += 500;
  console.log("Work Work and salary is now: " + salary);
  updateSalary();
};

const updateSalary = () => {
  salaryEl.innerHTML = salary;
};

const depositToBank = () => {
  // need to do some calculations if there is a loan
  bank += salary;
  salary = 0;
  console.log("salary moved to bank");
  updateSalary();
  updateBank();
};

const calculateFOO = () => {
    // Calculate something
}

const updateBank = () => {
  moneyInBankEl.innerHTML = bank;
};

const loanPrompt = () => {
    let loanAmount = prompt("Please enter the amount you want to loan. You can maximum loan: " + salary*2)
    console.log(loanAmount)
}

workButtonEl.addEventListener("click", doWork);
bankButtonEl.addEventListener("click", depositToBank);
loanButtonEl.addEventListener("click", loanPrompt)

const salaryEl = document.getElementById("salary");
const loanEl = document.getElementById("loan");
const moneyInBankEl = document.getElementById("moneyInBank");
const laptopsEl = document.getElementById("laptops");
const bankButtonEl = document.getElementById("bankButton");
const loanButtonEl = document.getElementById("loanButton");
const workButtonEl = document.getElementById("workButton");
const repayLoanEl = document.getElementById("repayLoan");

let laptops = [];
let salary = 0;
let bank = 0;
let loan = 0;

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
    let loan = parseInt(loanMessage);
    requestLoan(loan);

    updateLoan();
    updateBank();
    createRepayLoanButton();
  } else {
    window.alert("Pay back your current loan before taking a new loan");
  }
};

const createRepayLoanButton = () => {
  let repayBtn = document.createElement("button");
  repayBtn.innerHTML = "Repay Loan";

  repayBtn.onclick = () => alert("Button is clicked. Mabye loan repayed?");

  repayLoanEl.append(repayBtn);
};

const requestLoan = (loanAmount) => {
  if (loanAmount && loanAmount < bank * 2) {
    bank += loanAmount;
    loan += loanAmount;

    console.log("You entered: " + loanAmount);
  } else {
    console.log("No number entered or you can not loan that much");
  }

  return loanAmount;
};

workButtonEl.addEventListener("click", doWork);
bankButtonEl.addEventListener("click", depositToBank);
loanButtonEl.addEventListener("click", loanPrompt);

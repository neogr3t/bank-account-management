// Bank account class
class BankAccount {
    constructor(holder, type) {
        this.holder = holder;
        this.type = type;
        this.balance = 0;
        this.transactions = [];
    }

    deposit(amount) {
        if (amount <= 0) {
            throw new Error("Amount must be greater than 0.");
        }
        this.balance += amount;
        this.transactions.push({ type: "Deposit", amount: amount, date: new Date() });
    }

    withdraw(amount) {
        if (amount <= 0) {
            throw new Error("Amount must be greater than 0.");
        }
        if (amount > this.balance) {
            throw new Error("Insufficient funds.");
        }
        this.balance -= amount;
        this.transactions.push({ type: "Withdrawal", amount: amount, date: new Date() });
    }
}

// Initialize variables
const createAccountForm = document.getElementById("create-account-form");
const accountHolderInput = document.getElementById("account-holder");
const accountTypeInput = document.getElementById("account-type");
const accountCreationMessage = document.getElementById("account-creation-message");
const accountHolderName = document.getElementById("account-holder-name");
const accountTypeName = document.getElementById("account-type-name");
const accountBalance = document.getElementById("account-balance");

const depositForm = document.getElementById("deposit-form");
const depositAmountInput = document.getElementById("deposit-amount");

const withdrawalForm = document.getElementById("withdrawal-form");
const withdrawalAmountInput = document.getElementById("withdrawal-amount");

const transactionResult = document.getElementById("transaction-result");

const transactionTable = document.getElementById("transaction-table");
const transactionList = document.getElementById("transaction-list");

const clearHistoryButton = document.getElementById("clear-history-button");

let currentAccount = null;

// Create account form submission
createAccountForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const holder = accountHolderInput.value.trim();
    const type = accountTypeInput.value;

    if (!holder) {
        accountCreationMessage.textContent = "Please enter the account holder's name.";
        return;
    }

    currentAccount = new BankAccount(holder, type);
    updateAccountDetails();
    updateTransactionHistory();
    accountCreationMessage.textContent = `Account for ${holder} (${type}) created.`;
    createAccountForm.reset();
});

// Deposit form submission
depositForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const amount = parseFloat(depositAmountInput.value);

    try {
        currentAccount.deposit(amount);
        updateAccountDetails();
        updateTransactionHistory();
        transactionResult.textContent = `Successfully deposited $${amount}.`;
        depositForm.reset();
    } catch (error) {
        transactionResult.textContent = error.message;
    }
});

// Withdrawal form submission
withdrawalForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const amount = parseFloat(withdrawalAmountInput.value);

    try {
        currentAccount.withdraw(amount);
        updateAccountDetails();
        updateTransactionHistory();
        transactionResult.textContent = `Successfully withdrew $${amount}.`;
        withdrawalForm.reset();
    } catch (error) {
        transactionResult.textContent = error.message;
    }
});

// Clear transaction history
clearHistoryButton.addEventListener("click", function () {
    currentAccount.transactions = [];
    updateTransactionHistory();
});

// Update account details
function updateAccountDetails() {
    if (currentAccount) {
        accountHolderName.textContent = currentAccount.holder;
        accountTypeName.textContent = currentAccount.type;
        accountBalance.textContent = currentAccount.balance.toFixed(2);
    } else {
        accountHolderName.textContent = "";
        accountTypeName.textContent = "";
        accountBalance.textContent = "";
    }
}

// Update transaction history
function updateTransactionHistory() {
    const tbody = document.getElementById("transaction-list");
    tbody.innerHTML = "";

    if (!currentAccount) {
        // Account not created, hide the "Clear History" button
        document.getElementById("clear-history-button").style.display = "none";

        // Display the "No transactions available" message
        const row = document.createElement("tr");
        row.innerHTML = `
            <td colspan="3">No transactions available</td>
        `;
        tbody.appendChild(row);

        return; // Exit the function early
    }

    if (currentAccount.transactions.length > 0) {
        currentAccount.transactions.forEach((transaction) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${transaction.date.toLocaleString()}</td>
                <td>${transaction.type}</td>
                <td>$${transaction.amount.toFixed(2)}</td>
            `;
            tbody.appendChild(row);
        });

        // Show the "Clear History" button when there are transactions
        document.getElementById("clear-history-button").style.display = "block";
    } else {
        // No transactions available, hide the "Clear History" button
        document.getElementById("clear-history-button").style.display = "none";

        // Display the "No transactions available" message
        const row = document.createElement("tr");
        row.innerHTML = `
            <td colspan="3">No transactions available</td>
        `;
        tbody.appendChild(row);
    }
}




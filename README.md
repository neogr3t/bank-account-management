
# Bank Account Management Website

## Table of Contents
- [Introduction](#introduction)
- [How to Use the Website](#how-to-use-the-website)
- [Implementation Details](#implementation-details)
    - [Classes](#classes)
    - [Switch Statements](#switch-statements)
    - [Try-Catch-Finally Statements](#try-catch-finally-statements)
- [Conclusion](#conclusion)

## Introduction

The Bank Account Management website is a simple web application that allows users to create bank accounts, make deposits and withdrawals, check their account balance, and view transaction history. This website demonstrates the use of classes, switch statements, and try-catch-finally statements in JavaScript.

## How to Use the Website

1. **Create an Account**
    - Enter the account holder's name and select an account type (Savings or Checking).
    - Click the "Create Account" button to create the account.

2. **Deposit Funds**
    - In the "Transactions" section, enter the amount you want to deposit in the "Deposit Amount" field.
    - Click the "Deposit" button to add funds to your account.

3. **Withdraw Funds**
    - In the "Transactions" section, enter the amount you want to withdraw in the "Withdrawal Amount" field.
    - Click the "Withdrawal" button to withdraw funds from your account.

4. **View Account Details**
    - Your account details, including the account holder's name, account type, and account balance, will be displayed in the "Account Details" section.

5. **View Transaction History**
    - The "Transaction History" section displays a table with columns for date, transaction type, and transaction amount.
    - You can view all your transactions in this table.

6. **Clear Transaction History**
    - Click the "Clear History" button to clear your transaction history.


### Implementation Details

#### Classes

The website utilizes a `BankAccount` class to represent bank accounts. This class includes properties for the account holder's name, account type, balance, and transactions. Below is the code for the `BankAccount` class:

```javascript
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
```

#### Switch Statements

The website employs a switch statement to determine the selected account type (Savings or Checking) when creating an account. This ensures that the user's choice is processed correctly. Here's the code snippet for the switch statement:

```javascript
const typeInput = document.getElementById("account-type");
let accountType;

switch (typeInput.value) {
    case "Savings":
        accountType = "Savings Account";
        break;
    case "Checking":
        accountType = "Checking Account";
        break;
    default:
        accountType = "Unknown";
}
```

#### Try-Catch-Finally Statements

Try-catch-finally statements are used to handle exceptions, such as invalid inputs or insufficient funds, when making deposits and withdrawals. Users receive appropriate error messages when issues arise, enhancing the user experience. Here's a code snippet for handling exceptions during deposits:

```javascript
depositForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const amount = parseFloat(depositAmountInput.value);

    try {
        currentAccount.deposit(amount);
        // ... (code for success)
    } catch (error) {
        transactionResult.textContent = error.message;
    } finally {
        depositForm.reset();
    }
});
```

These code snippets demonstrate how classes, switch statements, and try-catch-finally statements are used in the website's implementation to enhance functionality and user interaction.

## Conclusion

The Bank Account Management website provides a user-friendly interface for managing bank accounts and transactions. By incorporating classes, switch statements, and try-catch-finally statements, the website demonstrates essential programming concepts while ensuring a seamless user experience. Users can create accounts, perform transactions, and view their financial history with ease.

const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");
const addBtn = document.getElementById("addBtn");

const balanceElement = document.getElementById("balance");
const incomeElement = document.getElementById("income");
const expenseElement = document.getElementById("expense");
const transactionList = document.getElementById("transactionList");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function saveTransactions() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

function addTransaction() {

    const description = descriptionInput.value.trim();
    const amount = Number(amountInput.value);
    const type = typeInput.value;

    if (description === "" || amount <= 0) {
        alert("Please enter valid information.");
        return;
    }

    const transaction = {
        id: Date.now(),
        description: description,
        amount: amount,
        type: type
    };

    transactions.push(transaction);

    saveTransactions();

    descriptionInput.value = "";
    amountInput.value = "";

    displayTransactions();
}

function deleteTransaction(id) {

    transactions = transactions.filter(function(transaction) {
        return transaction.id !== id;
    });

    saveTransactions();

    displayTransactions();
}

function displayTransactions() {

    transactionList.innerHTML = "";

    let income = 0;
    let expense = 0;

    transactions.forEach(function(transaction) {

        if (transaction.type === "income") {
            income += transaction.amount;
        } else {
            expense += transaction.amount;
        }

        const li = document.createElement("li");

        li.className = `transaction ${transaction.type}`;

        li.innerHTML = `
            <div class="transaction-info">
                <strong>${transaction.description}</strong>
                <span>${transaction.type === "income" ? "+" : "-"}$${transaction.amount.toFixed(2)}</span>
            </div>

            <button class="delete-btn" onclick="deleteTransaction(${transaction.id})">
                Delete
            </button>
        `;

        transactionList.appendChild(li);
    });

    const balance = income - expense;

    incomeElement.textContent = `$${income.toFixed(2)}`;
    expenseElement.textContent = `$${expense.toFixed(2)}`;
    balanceElement.textContent = `$${balance.toFixed(2)}`;
}

addBtn.addEventListener("click", addTransaction);

displayTransactions();
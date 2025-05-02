// DOM Elements
const balanceEl = document.getElementById('balance');
const incomeEl = document.getElementById('income-total');
const expenseEl = document.getElementById('expense-total');
const transactionFormEl = document.getElementById('transaction-form');
const transactionTypeEl = document.getElementById('transaction-type');
const descriptionEl = document.getElementById('description');
const amountEl = document.getElementById('amount');
const categoryEl = document.getElementById('category');
const dateEl = document.getElementById('date');
const transactionListEl = document.getElementById('transaction-list');
const filterEl = document.getElementById('filter');
const notificationEl = document.getElementById('notification');
const notificationMessageEl = document.getElementById('notification-message');

// Set default date to today
dateEl.valueAsDate = new Date();

// Initialize transactions from localStorage or empty array
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

// Initialize the app
function init() {
    updateCategoryOptions();
    updateTransactionList();
    updateSummary();
}

// Update category options based on transaction type
function updateCategoryOptions() {
    const transactionType = transactionTypeEl.value;
    const categories = categoryEl.options;
    
    for (let i = 0; i < categories.length; i++) {
        const option = categories[i];
        if (option.value === '') continue; // Skip the placeholder option
        
        if (transactionType === 'income') {
            option.style.display = option.classList.contains('income-category') ? 'block' : 'none';
        } else {
            option.style.display = option.classList.contains('expense-category') ? 'block' : 'none';
        }
    }
    
    // Reset selection
    categoryEl.value = '';
}

// Add new transaction
function addTransaction(e) {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) return;
    
    // Create transaction object
    const transaction = {
        id: generateID(),
        type: transactionTypeEl.value,
        description: descriptionEl.value.trim(),
        amount: parseFloat(amountEl.value),
        category: categoryEl.value,
        date: dateEl.value,
        timestamp: new Date().getTime()
    };
    
    // Add to transactions array
    transactions.push(transaction);
    
    // Update UI
    addTransactionToDOM(transaction);
    updateSummary();
    
    // Save to localStorage
    updateLocalStorage();
    
    // Reset form
    resetForm();
    
    // Show notification
    showNotification('Transaction added successfully!');
}

// Validate form inputs
function validateForm() {
    const description = descriptionEl.value.trim();
    const amount = amountEl.value.trim();
    const category = categoryEl.value;
    const date = dateEl.value;
    
    if (description === '') {
        showNotification('Please enter a description', 'error');
        return false;
    }
    
    if (amount === '' || parseFloat(amount) <= 0) {
        showNotification('Please enter a valid amount', 'error');
        return false;
    }
    
    if (category === '') {
        showNotification('Please select a category', 'error');
        return false;
    }
    
    if (date === '') {
        showNotification('Please select a date', 'error');
        return false;
    }
    
    return true;
}

// Generate random ID
function generateID() {
    return Math.floor(Math.random() * 1000000000);
}

// Add transaction to DOM
function addTransactionToDOM(transaction) {
    const { id, type, description, amount, category, date } = transaction;
    
    const formattedDate = formatDate(date);
    const formattedAmount = formatAmount(amount);
    
    const listItem = document.createElement('li');
    listItem.classList.add(type);
    listItem.setAttribute('data-id', id);
    
    listItem.innerHTML = `
        <div class="transaction-details">
            <span class="transaction-description">${description}</span>
            <div class="transaction-meta">
                <span>${formattedDate}</span>
                <span class="category-tag">${category}</span>
            </div>
        </div>
        <span class="transaction-amount">${formattedAmount}</span>
        <button class="delete-btn" onclick="removeTransaction(${id})">
            <i class="fas fa-trash"></i>
        </button>
    `;
    
    transactionListEl.appendChild(listItem);
}

// Format date to readable format
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// Format amount with currency symbol
function formatAmount(amount) {
    return `₹${amount.toFixed(2)}`;
}

// Update transaction list based on filter
function updateTransactionList() {
    transactionListEl.innerHTML = '';
    
    const filterValue = filterEl.value;
    
    const filteredTransactions = transactions.filter(transaction => {
        if (filterValue === 'all') return true;
        return transaction.type === filterValue;
    });
    
    // Sort transactions by date (newest first)
    filteredTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    if (filteredTransactions.length === 0) {
        transactionListEl.innerHTML = '<p class="empty-message">No transactions found</p>';
        return;
    }
    
    filteredTransactions.forEach(addTransactionToDOM);
}

// Update income, expense, and balance summary
function updateSummary() {
    // Calculate income
    const income = transactions
        .filter(transaction => transaction.type === 'income')
        .reduce((total, transaction) => total + transaction.amount, 0);
    
    // Calculate expense
    const expense = transactions
        .filter(transaction => transaction.type === 'expense')
        .reduce((total, transaction) => total + transaction.amount, 0);
    
    // Calculate balance
    const balance = income - expense;
    
    // Update UI
    balanceEl.textContent = formatAmount(balance);
    incomeEl.textContent = formatAmount(income);
    expenseEl.textContent = formatAmount(expense);
    
    // Add color class to balance
    balanceEl.className = 'balance';
    if (balance > 0) {
        balanceEl.classList.add('money', 'plus');
    } else if (balance < 0) {
        balanceEl.classList.add('money', 'minus');
    }
}

// Remove transaction
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    
    updateLocalStorage();
    init();
    
    showNotification('Transaction removed successfully!');
}

// Update localStorage
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Reset form after submission
function resetForm() {
    transactionFormEl.reset();
    dateEl.valueAsDate = new Date();
    updateCategoryOptions();
}

// Show notification
function showNotification(message, type = 'success') {
    notificationMessageEl.textContent = message;
    notificationEl.className = 'notification show';
    
    if (type === 'error') {
        notificationEl.style.borderLeft = '5px solid var(--expense-color)';
    } else {
        notificationEl.style.borderLeft = '5px solid var(--income-color)';
    }
    
    setTimeout(() => {
        notificationEl.className = 'notification';
    }, 3000);
}

// Event Listeners
transactionTypeEl.addEventListener('change', updateCategoryOptions);
transactionFormEl.addEventListener('submit', addTransaction);
filterEl.addEventListener('change', updateTransactionList);

// Initialize app
init();
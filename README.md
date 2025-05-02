# Expense Tracker

A simple, elegant web application to track your income and expenses with a modern UI.

![Expense Tracker Screenshot](assets/screenshot.png)

## Features

- Track both income and expenses
- Categorize transactions
- Filter transactions by type (income/expense)
- Responsive design for all devices
- Data persistence using local storage
- Real-time balance calculation

## How to Use

1. **Add a Transaction**
   - Select transaction type (Income/Expense)
   - Enter a description
   - Enter the amount
   - Select a category
   - Choose a date
   - Click "Add Transaction"

2. **View Transactions**
   - All transactions appear in the Transaction History section
   - Use the filter dropdown to view only income or expenses

3. **Delete Transactions**
   - Click the trash icon next to any transaction to remove it

4. **View Summary**
   - Your current balance is displayed at the top
   - Income and expense totals are shown in separate cards

## Code Structure

The application follows a simple structure:

- `index.html` - Main structure of the application
- `styles.css` - Styling with responsive design
- `script.js` - JavaScript functionality

### HTML Structure

The app is divided into two main sections:
- Sidebar: Contains balance information and summary
- Main content: Contains the transaction form and history

### CSS Features

- Modern glass-morphism UI with blur effects
- Responsive design with media queries
- CSS variables for consistent theming
- Smooth animations and transitions

### JavaScript Functionality

The app uses vanilla JavaScript with the following key functions:

- `init()`: Initializes the app and loads data from localStorage
- `addTransaction()`: Adds new transactions to the list
- `updateSummary()`: Recalculates and displays income, expense, and balance
- `removeTransaction()`: Deletes transactions
- `updateTransactionList()`: Updates the UI based on filter selection
- `updateLocalStorage()`: Persists data to browser storage

## Screenshots

![Dashboard View](assets/dashboard.png)
*Main dashboard with transaction history*

![Mobile View](assets/mobile.png)
*Responsive mobile interface*

## Getting Started

1. Clone this repository
2. Open `index.html` in your browser
3. Start tracking your expenses!

No build process or dependencies required - this is a pure HTML, CSS, and JavaScript application.
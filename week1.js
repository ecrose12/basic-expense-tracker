const expense1 = {
    description: "Coffee",
    amount: 4.50,
    category: "Food",
    date: "2024-01-14"
};
console.log('expense1', expense1);

const expenseOneDate = document.getElementById("expense-one-date");
console.log('expenseOneDate', expenseOneDate);
expenseOneDate.innerText = expense1.date;

const expenseOneDescription = document.getElementById("expense-one-description");
console.log('expenseOneDescription', expenseOneDescription);
expenseOneDescription.innerText = expense1.description;

const expenseOneAmount = document.getElementById("expense-one-amount");
console.log('expenseOneAmount', expenseOneAmount);
    expenseOneAmount.innerText = `$${expense1.amount.toFixed(2)}`; 

const expenseOneCategory = document.getElementById("expense-one-category");
console.log('expenseOneCategory', expenseOneCategory);
expenseOneCategory.innerText = expense1.category;  

const expense2 = {
    description: "Gas",
    amount: 45.00,
    category: "Transportation",
    date: "2024-01-15"
};
console.log('expense2', expense2);

const expenseTwoDate = document.getElementById("expense-two-date");
console.log('expenseTwoDate', expenseTwoDate);
expenseTwoDate.innerText = expense2.date;

const expenseTwoDescription = document.getElementById("expense-two-description");
console.log('expenseTwoDescription', expenseTwoDescription);
expenseTwoDescription.innerText = expense2.description;

const expenseTwoAmount = document.getElementById("expense-two-amount");
console.log('expenseTwoAmount', expenseTwoAmount);
expenseTwoAmount.innerText = `$${expense2.amount.toFixed(2)}`;

const expenseTwoCategory = document.getElementById("expense-two-category");
console.log('expenseTwoCategory', expenseTwoCategory);
expenseTwoCategory.innerText = expense2.category;


const expense3 = {
    description: "Netflix",
    amount: 15.99,
    category: "Entertainment",
    date: "2024-01-16"
};
console.log('expense3', expense3);

const expenseThreeDate = document.getElementById("expense-three-date");
console.log('expenseThreeDate', expense3.dateate);
expenseThreeDate.innerText = expense3.date;

const expenseThreeDescription = document.getElementById("expense-three-description");
console.log('expenseThreeDescription', expenseThreeDescription);
expenseThreeDescription.innerText = expense3.description;

const expenseThreeAmount = document.getElementById("expense-three-amount");
console.log('expenseThreeAmount', expenseThreeAmount);
expenseThreeAmount.innerText = `$${expense3.amount.toFixed(2)}`;

const expenseThreeCategory = document.getElementById("expense-three-category");
console.log('expenseThreeCategory', expenseThreeCategory);
expenseThreeCategory.innerText = expense3.category;

const expense4 = {
    description: "Electric Bill",
    amount: 120.00,
    category: "Utilities",
    date: "2024-01-17"
};
console.log('expense4', expense4);

const expenseFourDate = document.getElementById("expense-four-date");
console.log('expenseFourDate', expenseFourDate);
expenseFourDate.innerText = expense4.date;

const expenseFourDescription = document.getElementById("expense-four-description");
console.log('expenseFourDescription', expenseFourDescription);
expenseFourDescription.innerText = expense4.description;

const expenseFourAmount = document.getElementById("expense-four-amount");
console.log('expenseFourAmount', expenseFourAmount);
expenseFourAmount.innerText = `$${expense4.amount.toFixed(2)}`;

const expenseFourCategory = document.getElementById("expense-four-category");
console.log('expenseFourCategory', expenseFourCategory);
expenseFourCategory.innerText = expense4.category; 

const expense5 = {
    description: " ",
    amount: " ",
    category: " ",
    date: " "
};
console.log('expense5', expense5);

const TotalAmount = document.getElementById("total-amount");  
TotalAmount.innerText = `$${(expense1.amount + expense2.amount + expense3.amount + expense4.amount).toFixed(2)}`;  



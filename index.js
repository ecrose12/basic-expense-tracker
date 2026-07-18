let editingID = null;
let allExpenses = [];
 
const user = {"id": 1, "name": "Rodrigo"};
let currentUser;
 
 
/****** ON PAGE LOAD ********************/
document.addEventListener('DOMContentLoaded', () => {
  setUserInLocalStorage();
  setTimeout(() => {
    console.log('loading...');
  }, 2000)
  getUserFromLocalStorage();
  loadCategories();
  loadExpenses();
});
 
function setUserInLocalStorage(){
   localStorage.setItem("user", JSON.stringify(user))
}
 
function getUserFromLocalStorage(){
  const user = localStorage.getItem("user")
  
  if(!user || user === '{}'){
    console.error('could not find user object in local storage')
  }
  currentUser = JSON.parse(user)
}
 
/*************************************/
 
 
 
 
/****** CRUD - expenses ********************/
const form = document.querySelector("#expense-form");
 
// listen for form submission event
form.addEventListener("submit", function(event){
  event.preventDefault();
 
  const description = document.querySelector("#description").value;
  console.log('description', description)
  const amount = document.querySelector("#amount").value;
  console.log('amount', amount);
  const category = document.querySelector("#category").value;
  console.log('category', category)
 
  //edit
  if(editingID !== null){
    console.log('editingID in submit', editingID);
    console.log(validateExpenses(description, amount, category))
    editExpense(description, amount, category)
  }
  //add
  else{
    console.log(validateExpenses(description, amount, category))
    addExpense(description, amount, category);
  }
 
})
 
 
// CREATE/POST
async function addExpense(description, amount, category){
  const expense = {
    description: description,
    amount: amount,
    category_id: category,
    date: dateFormating(new Date()),
    user_id: currentUser.id
  }
 
  try {
    const response = await fetch(`http://localhost:3002/expenses`, {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(expense)
    });
    if (!response.ok) {
        throw new Error("Failed to fetch expenses");
    }
 
    const returnExpenses = await response.json();
    loadExpenses();
    clearForm();
   
  } catch (error) {
    console.error(error)
  }
 
}
 
// READ/GET
async function loadExpenses(){
  try {
    console.log('currentUser in loadExpenses', currentUser)
    const response = await fetch(`http://localhost:3002/expenses/${currentUser.id}`);
    if (!response.ok) {
        throw new Error("Failed to fetch expenses");
    }
    const expenses = await response.json();
    allExpenses = expenses;
    renderExpenses(); 
    
  } catch (error) {
    console.error(error)
  }

  clearForm();

}
 
// UPDATE/PUT
async function editExpense(description, amount, category){ 
  console.log('editingID', editingID)
  console.log('description', description)
  console.log('amount', amount);
  console.log('category', category)
 
  const expenseDate = allExpenses.find(expense => expense.id === editingID).date;
  console.log('expenseDate', expenseDate)
 
  const expenseForDB = {
    id: editingID,
    description: description,
    amount: amount,
    date: expenseDate ? expenseDate : new Date(), 
    category_id: category
  }
 
  console.log('expenseForDB', expenseForDB)
 
  try {
    const response = await fetch(`http://localhost:3002/expenses/${editingID}`, {
      method: 'PUT',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(expenseForDB)
    });
    if (!response.ok) {
        throw new Error("Failed to fetch expenses");
    }
 
    const returnExpenses = await response.json();
    console.log('returnExpense in edit expense', returnExpenses)
 
    loadExpenses();
   
  } catch (error) {
    console.error(error)
  }
 
  clearForm();
}
 
// DELETE
async function deleteExpense(expenseID){
  console.log('delete function expense ID', expenseID)
 
  try {
    const response = await fetch(`http://localhost:3002/expenses/${expenseID}`,{
      method: 'DELETE',
      headers: {"Content-Type": "application/json"},
    })
    if (!response.ok) {
        throw new Error("Failed to delete expenses");
    }
    const jsonResponse = await response.json();
    console.log('jsonResponse', jsonResponse)
 
  } catch (error) {
    console.error(error)
  }
 
  loadExpenses();
}
 
/*************************************/
 
 
 
/****** CRUD - categories ********************/
 
// READ/GET
async function loadCategories(){
 
  let categoriesArray;
 
  try {
    const response = await fetch(`http://localhost:3002/categories/${currentUser.id}`);
    if (!response.ok) {
        throw new Error("Failed to fetch categories");
    }
    categoriesArray = await response.json();
 
  } catch (error) {
    console.error(error)
  }
 
  const selectElement = document.querySelector('#category');
 
  selectElement.innerHTML = '<option value="" disabled selected>Select a category</option>';
 
  for(let i=0; i < categoriesArray.length; i++){
    const optionElement = document.createElement('option');
    optionElement.textContent = categoriesArray[i].name;
    optionElement.value = categoriesArray[i].id;
    selectElement.appendChild(optionElement);
  }
}
 
/*************************************/
 
 
 
 
/************** HELPER FUNCTIONS *********/
 
// validation
function validateExpenses(description, amount, category){
  if(!description || description.trim() === ""){
    return 'Description is required';
  }
 
  if(!amount || amount <= 0){
    return 'Amount must be greater than 0';
  }
 
  if(!category){
    return 'Category is required';
  }
 
  return 'Valid';
}
 
// format date
function dateFormating(date){
  const dateObj = new Date(date)
  return dateObj.toLocaleDateString();
}
 
// render expenses on page
function renderExpenses(){
 
  const tbody = document.querySelector("#expense-tbody");
  tbody.innerHTML = "";
 
  if(allExpenses.length === 0){
    console.log('no more expenses')
    tbody.innerHTML = '<tr><td colspan="6" class="text-center text-muted py-5">No expenses yet!</td></tr>';
    document.querySelector("#total").textContent = `$0.00`;
  }
  else {
    for(let i = 0; i < allExpenses.length; i++){
      const currentExpense = allExpenses[i];
 
      console.log('currentExpense', currentExpense)
 
      const tr = document.createElement('tr');
 
      tr.innerHTML = `
        <th scope="row">${currentExpense.id}</th>
        <td>${currentExpense.date}</td>
        <td>${currentExpense.description}</td>
        <td>${currentExpense.categories.name}</td>
        <td>$${parseFloat(currentExpense.amount).toFixed(2)}</td>
        <td>
          <button class="btn btn-warning btn-sm" onclick="updateForm('${currentExpense.id}')"> 
            Edit
          </button>
          <button class="btn btn-danger btn-sm" onclick="deleteExpense('${currentExpense.id}')">
            Delete
          </button>
        </td>
      `;
 
      tbody.appendChild(tr);
    }
 
    getTotalWithAsync(); 
  }
}
 
function updateForm(expenseID){
  document.querySelector("#expense-form button[type='submit']").textContent = 'Update Expense';
 
  console.log('editExpense id ', expenseID)
 
  let expenseToEdit = null;
  
  for(let i=0; i < allExpenses.length; i++){
    if(allExpenses[i].id === expenseID){
      expenseToEdit = allExpenses[i];
    }
  }
 
  console.log('expenseToEdit', expenseToEdit)
 
  if(expenseToEdit === null){
    console.log('no expense found')
    return;
  }
 
  document.querySelector('#description').value = expenseToEdit.description;
  document.querySelector('#amount').value = expenseToEdit.amount;
  document.querySelector('#category').value = expenseToEdit.categories.id;
 
  editingID = expenseToEdit.id;
}

//CLEAR FORM
function clearForm(){
  document.querySelector('#description').value = '';
  document.querySelector('#amount').value = '';
  document.querySelector('#category').value = '';
  document.querySelector("#expense-form button[type='submit']").textContent = 'Add Expense';
  editingID = null;
}
 
/*****************************************/
 
 
 
 
//GET TOTAL
async function getTotalWithAsync() {
  let sum = 0;
 
  try {
    const response = await fetch(`http://localhost:3002/expenses/${currentUser.id}/total`, {
      method: 'GET',
      headers: { "Content-Type": "application/json" }
    });
 
    if (!response.ok) {
      throw new Error("Failed to total expenses");
    }
 
    const { total } = await response.json();
    sum = total;
    document.querySelector("#total").textContent = `$${parseFloat(sum).toFixed(2)}`;
 
  } catch (error) {
    console.error(error);
  }
 
  return sum;
}
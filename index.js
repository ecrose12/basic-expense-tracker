// all expenses go in this array
let expenses = [];

let editingID = null;

// {
//   id: 1
//   description: 'taco',
//   amount: 1.25,
//   category: food
// }

//pretend you got this data from the database
const categoriesArray = [
    'Food',
    'Transportation',
    'Entertainment',
    'Utilities',
    'Other', 
    'School Supplies',
    'Clothing',
    'Medical Care',
    'Gifts',
    'Travel'
];

const form = document.querySelector("#expense-form");

// listen for form submission event
form.addEventListener("submit", function(event){
  event.preventDefault();  // prevents page refresh

  const description = document.querySelector("#description").value;
  console.log('description', description)
  const amount = document.querySelector("#amount").value;
  console.log('amount', amount);
  const category = document.querySelector("#category").value;
  console.log('category', category)
//edit
  if (editingID !== null) {
    console.log('editingID in submit', editingID);

    for(let i = 0; i < expenses.length; i++){
        if(expenses[i].id === editingID){
            console.log('found correct expense to edit', expenses[i])
            expenses[i].description = description;
            expenses[i].amount = amount;
            expenses[i].category = category;
            break;
        }
    }
    document.querySelector("#expense-form button[type='submit']").textContent = "Add Expense";
    editingID = null; //reset editingID to null after editing is done
  }
//add
  else {
    //validate expense
    console.log(validateExpenses(description, amount, category))

    // add data to expense
    addExpense(description, amount, category);
  }
    // render to page
  renderExpenses()
})




// HELPER FUNCTIONS

   // validation
   function validateExpenses(description, amount, category){
    console.log('inside validate', description.trim())
      if(!description || description.trim() === ""){
        return 'Description is requred';
      }

      if(!amount || amount <= 0){
        return 'Amount must be greater than 0';
      }

      if(!category){
        return 'Category is required';
      }

      return 'Valid';
   }

   //build expense object and add to expenses array
   function addExpense(description, amount, category){
      console.log(`incoming expense => description: ${description}, amount: ${amount}, category: ${category}`)
      
      const lastId = expenses.length > 0 ? expenses[expenses.length - 1].id : 0;

      const expense = {
        id: lastId + 1,
        description: description,
        amount: amount,
        category: category,
        date: dateFormating(new Date())
      }
      console.log('created expense', expense)

      expenses.push(expense)

      console.log('expenses array', expenses)
  
    }

    // format date
    function dateFormating(date){
      const dateObj = new Date(date) //create a date object so we have access to Date methods
      return dateObj.toLocaleDateString(); //format like 1/16/2025
    }
    // delete expense
    function deleteExpense(expenseID){
        console.log('deleteExpense id', expenseID)

        let indexToDelete = -1; //initialize to -1 to indicate not found
       
        for(let i = 0; i < expenses.length; i++){
            if(expenses[i].id === expenseID){
                console.log('found correct expense to delete', expenses[i])
                indexToDelete = i;
                break;
            }
        }

        //remove the expense from the expenses array
        if(indexToDelete !== -1){
          expenses.splice(indexToDelete, 1);
          console.log('expense deleted', expenses)
            renderExpenses();
        }
    }
    //edit expense
    function editExpense(expenseID){
        console.log('editExpense id', expenseID)

        let expenseToEdit = null;
       
        for(let i = 0; i < expenses.length; i++){
            if(expenses[i].id === expenseID){
                expenseToEdit = expenses[i];
                break
            }
        }

        if(expenseToEdit === null){
            console.log('expense not found', expenseID)
            return;
        }

    //loop through to get index of expense we want to edit
        for(let i = 0; i < expenses.length; i++){
          if(expenses[i].id === expenseID){
            console.log('found correct expense to edit', expenses[i])
            indexToDelete = i;
            break;
        }
    }


        document.querySelector("#description").value = expenseToEdit.description;
        document.querySelector("#amount").value = expenseToEdit.amount;
        document.querySelector("#category").value = expenseToEdit.category;
        document.querySelector("#expense-form button[type='submit']").textContent = "Save Changes";

        editingID = expenseID;
    }

    // render expenses on page
    function renderExpenses(){

      const tbody = document.querySelector("#expense-tbody");
      tbody.innerHTML = "";

      if(expenses.length === 0){
        tbody.innerHTML = '<tr><td colspan="6" class="text-center text-muted py-5">No expenses yet!</td></tr>';
        const totalElement = document.querySelector("#total");
        totalElement.textContent = `$0.00`;
      }
      else {
        // loop through expenses and build table

        for(let i = 0; i < expenses.length; i++){
          const currentExpense = expenses[i];

          const tr = document.createElement('tr');

          tr.innerHTML = `
            <th scope="row">${currentExpense.id}</th>
            <td>${currentExpense.date}</td>
            <td>${currentExpense.description}</td>
            <td>${currentExpense.category}</td>
            <td>$${parseFloat(currentExpense.amount).toFixed(2)}</td>
            <td><button class="btn btn-warning btn-sm" onclick="editExpense(${currentExpense.id})">Edit</button></td>
            <td><button class="btn btn-danger btn-sm" onclick="deleteExpense(${currentExpense.id})">Delete</button></td>
          `;

          tbody.appendChild(tr)


        }
      }


       // Ensure getTotal() returns a number, defaulting to 0 if undefined
        const total = getTotal() || 0; 

        // Display total on page
        const totalElement = document.querySelector("#total");
        totalElement.textContent = `$${total.toFixed(2)}`;
        form.reset();
    }
    

     function getTotal(){
        let sum = 0;
        for(let index = 0; index < expenses.length; index++){
        sum += parseFloat(expenses[index].amount);
        }
        return sum;
}
    

    // [
    //   {
    //     id: 1,
    //     description: 'taco',
    //     amount: 1.25,
    //     category: food
    //   },
    //   {
    //     id: 2,
    //     description: 'taco',
    //     amount: 1.25,
    //     category: food
    //   },
    //   {
    //     id: 3,
    //     description: 'taco',
    //     amount: 1.25,
    //     category: food
    //   },

    // ]



// just for fun
// function assignRandomColors(){
//   let color;
//   const colorsArray = ['red', 'green', 'blue'];
//   let randomNumber = Math.floor(Math.random() * 3)
//   console.log('randomNumber', randomNumber)
//   color = colorsArray[randomNumber];
//   return color;
// }


// document.getElementById('description').addEventListener('input', colorChange)

// function colorChange(event){
//   console.log('event', event)
//   const body = document.getElementById('body');
//   body.style.backgroundColor = assignRandomColors();
// }

function loadCategories(){
    //get categories from database
    const catagoriesArray = [
    'Food',
    'Transportation',
    'Entertainment',
    'Utilities',
    'Other', 
    'School Supplies',
    'Clothing',
    'Medical Care',
    'Gifts',
    'Travel'
    ];

    const selectElement = document.querySelector("#category");

    selectElement.innerHTML = "<option value=''disabled selected>Select a category</option>";

    for(let i = 0; i < categoriesArray.length; i++){
        console.log('current category item', categoriesArray[i])
        const optionElement = document.createElement('option');
        optionElement.value = categoriesArray[i];
        optionElement.textContent = categoriesArray[i];
        selectElement.appendChild(optionElement);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('page loaded');
    loadCategories();
});
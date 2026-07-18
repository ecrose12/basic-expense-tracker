const express = require("express");
const supabase = require('./db/supabase')
require('dotenv').config();
const cors = require("cors");
const app = express();
 
// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());
 
 
app.get('/addTwoPlusTwo', (req, res) => {
  let sum = 0;
  sum = 2 + 2;
  res.send(sum);
})
 
 
app.get("/expenses/:id/total", async (req, res) => {
  console.log('req.params.id', req.params.id)
  const { data, error } = await supabase
    .from('expenses')
    .select('amount')
    .eq('user_id', req.params.id);
 
  if (error) return res.status(500).json({ error: error.message });
 
  console.log('data', data)
 
  const total = data.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
 
  res.json({ total });
});
 
 
/*** cURL for GET - all
    curl -X GET http://localhost:3002/expenses
 **/
 
// read expenses (GET) - get all expenses for a user ordered by date descending
app.get("/expenses/:id", async (req,res) => {
  console.log('query param for id', req.params.id)
  const { data, error } = await supabase
    .from('expenses')
    .select(`
      id,
      description,
      amount,
      date,
      user_id,
      categories (id, name)`)
    .eq('user_id', req.params.id)
    .order('date', { ascending: false });
 
  if(error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data);
})
 
// get all records with category = 'Utilities'
app.get("/utility_expenses", async (req,res) => {
  const { data, error } = await supabase
    .from('expenses')
    .select('*')
    .eq('category', 'Utilities')
    if(error){
      return res.status(500).json({ error: error.message})
    }
    res.json(data)
})
 
/*** cURL for POST
    curl -X POST http://localhost:3002/expenses \
  -H "Content-Type: application/json" \
  -d '{"description":"Old Coffee","amount":4.50,"category_id":"fab850dc-2528-4a1d-9bad-6c04384f0365","date":"2025-04-18"}'
 **/
 
// create expense (POST)
app.post('/expenses', async (req, res) => {
  console.log('req.body', req.body)
  const { description, amount, category_id, date, user_id } = req.body;
  const { data, error } = await supabase
    .from('expenses')
    .insert([{ description, amount, category_id, date, user_id }])
    .select()
    .single();
 
  if (error) return res.status(500).json({ error: error.message });
 
  res.status(201).json(data);
});
 
/*** cURL for PUT
    curl -X PUT http://localhost:3002/expenses/e7a182fc-ff89-46d6-afa3-78280b0d2b88 \
    -H "Content-Type: application/json" \
    -d '{"description":"HULU Subscription","amount":14.50,"category_id":"c3032af4-5840-4091-b5d0-4fe51174f20b","date":"2025-04-18"}'
 **/
 
// update expense (PUT)
app.put("/expenses/:id", async (req, res) => {     
  console.log('req.body', req.body)
  const { description, amount, category_id, date } = req.body;
  const { data, error } = await supabase
    .from('expenses')
    .update({ description, amount, category_id, date })   
    .eq('id', req.params.id)
    .select()
    .single();
 
  console.log('data', data)
 
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});
 
// delete expense (DELETE)
app.delete("/expenses/:id", async (req,res) => {
  const { data, error } = await supabase
    .from('expenses')
    .delete()
    .eq('id', req.params.id)
    if(error){
      return res.status(500).json({ error: error.message})
    }
    res.status(200).json({message: "successfully deleted"});
})
 
 
//---(will need to add functionality to frontend) ---//
 
/*** cURL for POST
    curl -X POST http://localhost:3002/categories \
  -H "Content-Type: application/json" \
  -d '{"name":"Other two", "date":"2025-04-18"}'
 **/
 
// create category (POST)
app.post('/categories', async (req, res) => {
  const { name, date } = req.body;
  const { data, error } = await supabase
    .from('categories')
    .insert([{ name, date }])
    .select()
    .single();
 
  if (error) return res.status(500).json({ error: error.message });
 
  res.status(201).json(data);
});
 
/*** cURL for GET - all
    curl -X GET http://localhost:3002/categories
 **/
 
// read categories (GET)
app.get("/categories/:id", async (req,res) => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('user_id', req.params.id)
    .order('date', { ascending: false });
 
  if(error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data);
})
 
/*** cURL for PUT
    curl -X PUT http://localhost:3002/categories/7ff7fd06-4ff8-4c10-8a75-e1425205b365 \
    -H "Content-Type: application/json" \
    -d '{"name":"Misc", "date":"2025-04-18"}'
 **/
 
// update category (PUT)
app.put("/categories/:id", async (req, res) => {     
  console.log('req.body', req.body)
  const { name, date } = req.body;
  const { data, error } = await supabase
    .from('categories')
    .update({ name, date })   
    .eq('id', req.params.id)
    .select()
    .single();
                                                                                                                                                                         
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});
 
//  curl -X DELETE http://localhost:3002/categories/7ff7fd06-4ff8-4c10-8a75-e1425205b365
 
// delete category (DELETE)
app.delete("/categories/:id", async (req,res) => {
  console.log('reg.params.id', req.params.id)
  const { data, error } = await supabase
    .from('categories')
    .delete()
    .eq('id', req.params.id)
    
  console.log('data', data)
 
  if(error){
    return res.status(500).json({ error: error.message})
  }
  res.status(200).json({message:"successfully deleted"});
})
 
 
// Start server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
  console.log('hey i am a cool server running. ')
});
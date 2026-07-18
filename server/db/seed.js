const supabase = require('./supabase');

const expenses = [
  { description: 'Starbucks coffee',      amount: 5.75,   category: 'Food',           date: '2025-04-01' },
  { description: 'Grocery run at Target', amount: 87.42,  category: 'Food',           date: '2025-04-03' },
  { description: 'Gas fill-up',           amount: 42.18,  category: 'Transportation', date: '2025-04-05' },
  { description: 'Netflix subscription',  amount: 15.99,  category: 'Entertainment',  date: '2025-04-06' },
  { description: 'Electric bill',         amount: 112.34, category: 'Utilities',      date: '2025-04-08' },
  { description: 'Lunch with coworkers',  amount: 18.50,  category: 'Food',           date: '2025-04-10' },
  { description: 'Uber to airport',       amount: 32.75,  category: 'Transportation', date: '2025-04-12' },
  { description: 'Movie tickets',         amount: 28.00,  category: 'Entertainment',  date: '2025-04-13' },
  { description: 'Coffee beans',          amount: 14.99,  category: 'Food',           date: '2025-04-14' },
  { description: 'Internet bill',         amount: 79.99,  category: 'Utilities',      date: '2025-04-15' },
];

async function seed() {
  console.log('Clearing existing expenses...');
  const { error: deleteError } = await supabase
    .from('expenses')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000'); // delete all

  if (deleteError) {
    console.error('Delete failed:', deleteError.message);
    process.exit(1);
  }

  console.log(`Inserting ${expenses.length} expenses...`);
  const { data, error } = await supabase
    .from('expenses')
    .insert(expenses)
    .select();

  if (error) {
    console.error('Seed failed:', error.message);
    process.exit(1);
  }

  console.log(`✅ Seeded ${data.length} expenses`);
  process.exit(0);
}

seed();
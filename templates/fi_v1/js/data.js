/* ============================================
   Finance Dashboard v1 — Sample Data
   ============================================
   Change values below to use your own data.
   Save and refresh — the entire dashboard updates.
   ============================================ */

var FIN_DATA = {

  kpi: [
    { label: 'Total Balance',    value: '$84,254',  trend: '+3.2%',  dir: 'up' },
    { label: 'Monthly Income',   value: '$12,580',  trend: '+8.1%',  dir: 'up' },
    { label: 'Monthly Expenses', value: '$7,320',   trend: '+2.4%',  dir: 'up' },
    { label: 'Savings Rate',     value: '41.8%',    trend: '+1.5%',  dir: 'up' }
  ],

  incomeExpenseChart: {
    labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    income:   [9800,10200,10500,11200,11800,12100,11900,12400,12200,12800,13100,12580],
    expenses: [6200,6500,6800,7100,6900,7200,7400,7100,7300,7500,7200,7320]
  },

  recentTransactions: [
    { desc: 'Salary Deposit',      amount: '+$8,500.00', type: 'income',  cat: 'Salary',     date: 'Apr 15', icon: '\uD83D\uDCB0' },
    { desc: 'Rent Payment',        amount: '-$2,200.00', type: 'expense', cat: 'Housing',    date: 'Apr 14', icon: '\uD83C\uDFE0' },
    { desc: 'Freelance Project',   amount: '+$3,200.00', type: 'income',  cat: 'Freelance',  date: 'Apr 12', icon: '\uD83D\uDCBB' },
    { desc: 'Grocery Shopping',    amount: '-$185.40',   type: 'expense', cat: 'Food',       date: 'Apr 11', icon: '\uD83D\uDED2' },
    { desc: 'Investment Dividend', amount: '+$420.00',   type: 'income',  cat: 'Investment', date: 'Apr 10', icon: '\uD83D\uDCC8' }
  ],

  budgetOverview: [
    { cat: 'Housing',       spent: 2200, budget: 2500, color: '#00B894' },
    { cat: 'Food & Dining', spent: 680,  budget: 800,  color: '#FDCB6E' },
    { cat: 'Transportation',spent: 320,  budget: 400,  color: '#74B9FF' },
    { cat: 'Entertainment', spent: 280,  budget: 300,  color: '#A29BFE' }
  ],

  transactions: [
    { desc: 'Salary Deposit',       amount: '+$8,500.00', type: 'income',  cat: 'Salary',        date: 'Apr 15, 2026', icon: '\uD83D\uDCB0' },
    { desc: 'Rent Payment',         amount: '-$2,200.00', type: 'expense', cat: 'Housing',       date: 'Apr 14, 2026', icon: '\uD83C\uDFE0' },
    { desc: 'Freelance Project',    amount: '+$3,200.00', type: 'income',  cat: 'Freelance',     date: 'Apr 12, 2026', icon: '\uD83D\uDCBB' },
    { desc: 'Grocery Shopping',     amount: '-$185.40',   type: 'expense', cat: 'Food',          date: 'Apr 11, 2026', icon: '\uD83D\uDED2' },
    { desc: 'Investment Dividend',  amount: '+$420.00',   type: 'income',  cat: 'Investment',    date: 'Apr 10, 2026', icon: '\uD83D\uDCC8' },
    { desc: 'Electric Bill',        amount: '-$142.50',   type: 'expense', cat: 'Utilities',     date: 'Apr 9, 2026',  icon: '\u26A1' },
    { desc: 'Gym Membership',       amount: '-$49.99',    type: 'expense', cat: 'Health',        date: 'Apr 8, 2026',  icon: '\uD83C\uDFCB\uFE0F' },
    { desc: 'Online Course',        amount: '-$29.99',    type: 'expense', cat: 'Education',     date: 'Apr 7, 2026',  icon: '\uD83D\uDCDA' },
    { desc: 'Consulting Fee',       amount: '+$1,500.00', type: 'income',  cat: 'Freelance',     date: 'Apr 5, 2026',  icon: '\uD83D\uDCBC' },
    { desc: 'Restaurant Dinner',    amount: '-$86.30',    type: 'expense', cat: 'Food',          date: 'Apr 4, 2026',  icon: '\uD83C\uDF7D\uFE0F' },
    { desc: 'Gas Station',          amount: '-$55.20',    type: 'expense', cat: 'Transportation',date: 'Apr 3, 2026',  icon: '\u26FD' },
    { desc: 'Netflix Subscription', amount: '-$15.99',    type: 'expense', cat: 'Entertainment', date: 'Apr 2, 2026',  icon: '\uD83C\uDFAC' },
    { desc: 'Insurance Premium',    amount: '-$350.00',   type: 'expense', cat: 'Insurance',     date: 'Apr 1, 2026',  icon: '\uD83D\uDEE1\uFE0F' },
    { desc: 'Stock Sale Proceeds',  amount: '+$2,840.00', type: 'income',  cat: 'Investment',    date: 'Mar 30, 2026', icon: '\uD83D\uDCCA' },
    { desc: 'Coffee Shop',          amount: '-$12.50',    type: 'expense', cat: 'Food',          date: 'Mar 29, 2026', icon: '\u2615' }
  ],

  allocation: {
    labels: ['Stocks', 'Bonds', 'Real Estate', 'Cash'],
    data:   [45, 25, 20, 10],
    colors: ['#00B894', '#FDCB6E', '#E17055', '#74B9FF']
  },

  holdings: [
    { name: 'S&P 500 Index Fund',   ticker: 'VOO',  amount: '$22,450', change: '+12.4%', dir: 'up' },
    { name: 'Total Bond Market',    ticker: 'BND',  amount: '$14,800', change: '+3.2%',  dir: 'up' },
    { name: 'Real Estate Trust',    ticker: 'VNQ',  amount: '$11,200', change: '-1.8%',  dir: 'down' },
    { name: 'Growth Tech Fund',     ticker: 'QQQ',  amount: '$9,650',  change: '+18.7%', dir: 'up' },
    { name: 'International Stocks', ticker: 'VXUS', amount: '$5,420',  change: '+5.1%',  dir: 'up' },
    { name: 'High-Yield Savings',   ticker: 'CASH', amount: '$8,400',  change: '+4.5%',  dir: 'up' }
  ],

  portfolioPerformance: {
    labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    data: [68200,70100,69800,72400,74200,75800,74900,77200,78600,80100,82400,84254]
  },

  budget: [
    { cat: 'Housing',        icon: '\uD83C\uDFE0', spent: 2200, budget: 2500, color: '#00B894' },
    { cat: 'Food & Dining',  icon: '\uD83C\uDF7D\uFE0F', spent: 680,  budget: 800,  color: '#FDCB6E' },
    { cat: 'Transportation', icon: '\uD83D\uDE97', spent: 320,  budget: 400,  color: '#74B9FF' },
    { cat: 'Healthcare',     icon: '\uD83C\uDFE5', spent: 150,  budget: 300,  color: '#E17055' },
    { cat: 'Education',      icon: '\uD83D\uDCDA', spent: 180,  budget: 200,  color: '#A29BFE' },
    { cat: 'Entertainment',  icon: '\uD83C\uDFAC', spent: 280,  budget: 300,  color: '#00CEC9' },
    { cat: 'Shopping',       icon: '\uD83D\uDECD\uFE0F', spent: 420,  budget: 500,  color: '#FD79A8' },
    { cat: 'Savings',        icon: '\uD83D\uDC8E', spent: 2000, budget: 2000, color: '#636E72' }
  ],

  budgetMonthly: {
    labels: ['Jan','Feb','Mar','Apr','May','Jun'],
    budget: [7000,7000,7000,7000,7000,7000],
    actual: [6200,6500,6800,7100,6900,7320]
  },

  monthlyTrend: {
    labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    income:   [9800,10200,10500,11200,11800,12100,11900,12400,12200,12800,13100,12580],
    expenses: [6200,6500,6800,7100,6900,7200,7400,7100,7300,7500,7200,7320],
    savings:  [3600,3700,3700,4100,4900,4900,4500,5300,4900,5300,5900,5260]
  },

  categoryBreakdown: {
    labels: ['Housing','Food','Transport','Health','Education','Entertainment','Shopping','Savings'],
    data:   [2200,680,320,150,180,280,420,2000],
    colors: ['#00B894','#FDCB6E','#74B9FF','#E17055','#A29BFE','#00CEC9','#FD79A8','#636E72']
  },

  annualSummary: {
    totalIncome: 140580,
    totalExpenses: 85520,
    totalSavings: 55060,
    avgMonthlyIncome: 11715,
    avgMonthlyExpense: 7127,
    savingsRate: 39.2
  }
};

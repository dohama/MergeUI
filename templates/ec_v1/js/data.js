/* ============================================
   E-Commerce Admin v1 - Dummy Data
   데이터 변경: 이 파일의 객체를 수정하면 모든 페이지에 반영됩니다.
   ============================================ */

const EC_DATA = {
  /* KPI */
  kpi: {
    totalRevenue: { value: "$128,430", change: "+12.5%", direction: "up" },
    orders: { value: "1,284", change: "+8.2%", direction: "up" },
    avgOrderValue: { value: "$99.87", change: "-2.1%", direction: "down" },
    customers: { value: "3,847", change: "+15.3%", direction: "up" }
  },

  /* Monthly Revenue (for line/bar charts) */
  monthlyRevenue: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    data: [8200, 9100, 10400, 9800, 11200, 12800, 13500, 14200, 12900, 15100, 16800, 18430]
  },

  /* Orders */
  orders: [
    { id: "ORD-7291", customer: "Sarah Kim", email: "sarah@email.com", amount: "$234.50", status: "Delivered", date: "2026-04-17" },
    { id: "ORD-7290", customer: "James Park", email: "james@email.com", amount: "$89.00", status: "Shipped", date: "2026-04-17" },
    { id: "ORD-7289", customer: "Emily Chen", email: "emily@email.com", amount: "$456.20", status: "Processing", date: "2026-04-16" },
    { id: "ORD-7288", customer: "Mike Johnson", email: "mike@email.com", amount: "$120.00", status: "Delivered", date: "2026-04-16" },
    { id: "ORD-7287", customer: "Lisa Wang", email: "lisa@email.com", amount: "$67.30", status: "Cancelled", date: "2026-04-15" },
    { id: "ORD-7286", customer: "David Lee", email: "david@email.com", amount: "$345.80", status: "Delivered", date: "2026-04-15" },
    { id: "ORD-7285", customer: "Anna Brown", email: "anna@email.com", amount: "$198.50", status: "Shipped", date: "2026-04-14" },
    { id: "ORD-7284", customer: "Tom Wilson", email: "tom@email.com", amount: "$78.90", status: "Processing", date: "2026-04-14" },
    { id: "ORD-7283", customer: "Grace Liu", email: "grace@email.com", amount: "$512.00", status: "Delivered", date: "2026-04-13" },
    { id: "ORD-7282", customer: "Chris Yang", email: "chris@email.com", amount: "$145.60", status: "Shipped", date: "2026-04-13" }
  ],

  /* Products */
  products: [
    { name: "Wireless Headphones", category: "Electronics", price: "$129.99", stock: 234, sold: 1820, emoji: "🎧" },
    { name: "Leather Backpack", category: "Fashion", price: "$89.50", stock: 156, sold: 943, emoji: "🎒" },
    { name: "Smart Watch Pro", category: "Electronics", price: "$299.00", stock: 78, sold: 2105, emoji: "⌚" },
    { name: "Organic Coffee Beans", category: "Food", price: "$24.99", stock: 520, sold: 3240, emoji: "☕" },
    { name: "Yoga Mat Premium", category: "Sports", price: "$45.00", stock: 312, sold: 876, emoji: "🧘" },
    { name: "Desk Lamp LED", category: "Home", price: "$67.80", stock: 189, sold: 1456, emoji: "💡" },
    { name: "Running Shoes", category: "Sports", price: "$159.00", stock: 95, sold: 2340, emoji: "👟" },
    { name: "Ceramic Mug Set", category: "Home", price: "$34.50", stock: 445, sold: 1678, emoji: "☕" }
  ],

  /* Customers */
  customers: [
    { name: "Sarah Kim", email: "sarah@email.com", orders: 12, spent: "$2,845.00", joined: "2025-08-14" },
    { name: "James Park", email: "james@email.com", orders: 8, spent: "$1,234.50", joined: "2025-09-22" },
    { name: "Emily Chen", email: "emily@email.com", orders: 23, spent: "$5,678.90", joined: "2025-03-10" },
    { name: "Mike Johnson", email: "mike@email.com", orders: 5, spent: "$567.00", joined: "2026-01-05" },
    { name: "Lisa Wang", email: "lisa@email.com", orders: 17, spent: "$3,456.20", joined: "2025-06-18" },
    { name: "David Lee", email: "david@email.com", orders: 31, spent: "$8,901.30", joined: "2025-01-03" },
    { name: "Anna Brown", email: "anna@email.com", orders: 9, spent: "$1,890.00", joined: "2025-11-27" },
    { name: "Tom Wilson", email: "tom@email.com", orders: 14, spent: "$2,345.60", joined: "2025-07-09" },
    { name: "Grace Liu", email: "grace@email.com", orders: 26, spent: "$6,789.40", joined: "2025-02-14" },
    { name: "Chris Yang", email: "chris@email.com", orders: 7, spent: "$987.50", joined: "2026-02-20" }
  ],

  /* Category Revenue */
  categoryRevenue: {
    labels: ["Electronics", "Fashion", "Food", "Sports", "Home"],
    data: [42300, 18900, 12400, 28600, 26230]
  },

  /* Regional Data */
  regionalData: {
    labels: ["North America", "Europe", "Asia Pacific", "Latin America", "Middle East"],
    data: [45200, 32100, 28400, 12800, 9930]
  },

  /* Top Products (for rank list) */
  topProducts: [
    { name: "Running Shoes", sales: "2,340" },
    { name: "Smart Watch Pro", sales: "2,105" },
    { name: "Wireless Headphones", sales: "1,820" },
    { name: "Ceramic Mug Set", sales: "1,678" },
    { name: "Desk Lamp LED", sales: "1,456" }
  ],

  /* Weekly Orders (for bar chart) */
  weeklyOrders: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    data: [42, 38, 55, 47, 62, 71, 58]
  }
};

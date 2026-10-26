const STORAGE_KEY = 'business-pos-pro-v1';
const ACTIVE_SECTION_KEY = 'business-pos-active-section';
const REMEMBER_DEVICE_KEY = 'business-pos-remember-device';
let backendToken = 'github-pages-local';
const rememberDeviceSetting = localStorage.getItem(REMEMBER_DEVICE_KEY);
let shouldRememberDevice = rememberDeviceSetting === null || rememberDeviceSetting === 'true';
if (backendToken && !localStorage.getItem(REMEMBER_DEVICE_KEY)) {
  shouldRememberDevice = true;
  localStorage.setItem(REMEMBER_DEVICE_KEY, 'true');
}

const rememberDeviceCheckbox = document.getElementById('remember-device');
if (rememberDeviceCheckbox) {
  rememberDeviceCheckbox.checked = shouldRememberDevice;
}
const DELIVERY_STATUSES = ['Pending', 'Preparing', 'Ready for Delivery', 'Dispatched', 'On the Way', 'Arrived', 'Received', 'Delivered', 'Cancelled', 'Failed'];
const DELIVERY_FAILURE_REASONS = ['Customer unavailable', 'Wrong address', 'Customer cancelled', 'Other'];

const defaultState = {
  serverSummary: null,
  paymentConfig: null,
  paymentSummary: null,
  session: {
    loggedIn: false,
    userId: null
  },
  business: {
    name: 'SUUK Restaurant',
    phone: '0700000000',
    email: '',
    address: 'Kampala, Uganda',
    logo: '',
    country: 'Uganda',
    currency: 'UGX',
    taxRate: 0,
    multiBranches: false,
    openingBalance: 0,
    financialYearStart: '2026-01-01'
  },
  preferences: {
    darkMode: false,
    receiptPaperSize: 'thermal',
    currentBranchId: ''
  },
  branches: [],
  restaurantTables: [],
  reservations: [],
  kitchenTickets: [],
  mobileMoneyAccounts: [],
  stockTransfers: [],
  users: [
    { id: 'user-admin', username: 'admin', password: 'admin123', displayName: 'Admin', role: 'admin', phone: '', email: '', address: '' },
    { id: 'user-sales', username: 'sales', password: 'sales123', displayName: 'Sales', role: 'sales', phone: '', email: '', address: '' },
    { id: 'user-purchase', username: 'purchase', password: 'purchase123', displayName: 'Purchase & Inventory', role: 'purchase', phone: '', email: '', address: '' },
    { id: 'user-delivery', username: 'delivery', password: 'delivery123', displayName: 'Delivery Staff', role: 'delivery', phone: '', email: '', address: '' }
  ],
  products: [
    { id: 'prod-1', name: 'Chicken & Chips', category: 'Main Dishes', sku: 'CHICK-CHIPS', barcode: '', unit: 'portion', buyingPrice: 8000, sellingPrice: 15000, stock: 25, lowStockThreshold: 5, expiryDate: '' },
    { id: 'prod-2', name: 'Beef Burger', category: 'Burgers', sku: 'BEEF-BURGER', barcode: '', unit: 'piece', buyingPrice: 9000, sellingPrice: 18000, stock: 25, lowStockThreshold: 5, expiryDate: '' },
    { id: 'prod-3', name: 'Pizza', category: 'Pizza', sku: 'PIZZA-REG', barcode: '', unit: 'piece', buyingPrice: 10000, sellingPrice: 20000, stock: 20, lowStockThreshold: 5, expiryDate: '' },
    { id: 'prod-4', name: 'Grilled Fish', category: 'Main Dishes', sku: 'GRILL-FISH', barcode: '', unit: 'plate', buyingPrice: 13000, sellingPrice: 25000, stock: 18, lowStockThreshold: 4, expiryDate: '' },
    { id: 'prod-5', name: 'Rice & Chicken', category: 'Main Dishes', sku: 'RICE-CHICK', barcode: '', unit: 'portion', buyingPrice: 8500, sellingPrice: 16000, stock: 30, lowStockThreshold: 6, expiryDate: '' },
    { id: 'prod-6', name: 'Fresh Juice', category: 'Drinks', sku: 'FRESH-JUICE', barcode: '', unit: 'glass', buyingPrice: 3000, sellingPrice: 8000, stock: 35, lowStockThreshold: 8, expiryDate: '' },
    { id: 'prod-7', name: 'Soda', category: 'Drinks', sku: 'SODA-CAN', barcode: '', unit: 'bottle', buyingPrice: 1800, sellingPrice: 4000, stock: 50, lowStockThreshold: 10, expiryDate: '' },
    { id: 'prod-8', name: 'Ice Cream', category: 'Desserts', sku: 'ICE-CREAM', barcode: '', unit: 'portion', buyingPrice: 2500, sellingPrice: 6000, stock: 30, lowStockThreshold: 6, expiryDate: '' },
    { id: 'prod-9', name: 'Beef Stew', category: 'Main Dishes', sku: 'BEEF-STEW', barcode: '', unit: 'portion', buyingPrice: 9000, sellingPrice: 18000, stock: 35, lowStockThreshold: 8, expiryDate: '' },
    { id: 'prod-10', name: 'Chicken Pilau', category: 'Main Dishes', sku: 'CHICK-PILAU', barcode: '', unit: 'portion', buyingPrice: 8500, sellingPrice: 17000, stock: 28, lowStockThreshold: 8, expiryDate: '' },
    { id: 'prod-11', name: 'Roasted Goat', category: 'Main Dishes', sku: 'ROAST-GOAT', barcode: '', unit: 'plate', buyingPrice: 12000, sellingPrice: 22000, stock: 15, lowStockThreshold: 4, expiryDate: '' },
    { id: 'prod-12', name: 'Fried Tilapia', category: 'Main Dishes', sku: 'FRIED-TILAPIA', barcode: '', unit: 'piece', buyingPrice: 13000, sellingPrice: 24000, stock: 16, lowStockThreshold: 4, expiryDate: '' },
    { id: 'prod-13', name: 'Chicken Curry', category: 'Main Dishes', sku: 'CHICK-CURRY', barcode: '', unit: 'portion', buyingPrice: 10000, sellingPrice: 19000, stock: 18, lowStockThreshold: 5, expiryDate: '' },
    { id: 'prod-14', name: 'Cheese Burger', category: 'Burgers', sku: 'CHEESE-BURGER', barcode: '', unit: 'piece', buyingPrice: 10500, sellingPrice: 20000, stock: 20, lowStockThreshold: 5, expiryDate: '' },
    { id: 'prod-15', name: 'Chicken Burger', category: 'Burgers', sku: 'CHICK-BURGER', barcode: '', unit: 'piece', buyingPrice: 8500, sellingPrice: 17000, stock: 22, lowStockThreshold: 5, expiryDate: '' },
    { id: 'prod-16', name: 'Double Beef Burger', category: 'Burgers', sku: 'DBL-BURGER', barcode: '', unit: 'piece', buyingPrice: 13000, sellingPrice: 24000, stock: 14, lowStockThreshold: 4, expiryDate: '' },
    { id: 'prod-17', name: 'BBQ Chicken Pizza', category: 'Pizza', sku: 'PIZZA-BBQ', barcode: '', unit: 'piece', buyingPrice: 13500, sellingPrice: 25000, stock: 15, lowStockThreshold: 4, expiryDate: '' },
    { id: 'prod-18', name: 'Beef Deluxe Pizza', category: 'Pizza', sku: 'PIZZA-DLX', barcode: '', unit: 'piece', buyingPrice: 12500, sellingPrice: 24000, stock: 16, lowStockThreshold: 4, expiryDate: '' },
    { id: 'prod-19', name: 'Veggie Supreme Pizza', category: 'Pizza', sku: 'PIZZA-VEG', barcode: '', unit: 'piece', buyingPrice: 11000, sellingPrice: 22000, stock: 12, lowStockThreshold: 3, expiryDate: '' },
    { id: 'prod-20', name: 'Mineral Water', category: 'Drinks', sku: 'WATER', barcode: '', unit: 'bottle', buyingPrice: 1000, sellingPrice: 3000, stock: 40, lowStockThreshold: 10, expiryDate: '' },
    { id: 'prod-21', name: 'Passion Juice', category: 'Drinks', sku: 'PASSION-JUICE', barcode: '', unit: 'glass', buyingPrice: 2500, sellingPrice: 7000, stock: 25, lowStockThreshold: 6, expiryDate: '' },
    { id: 'prod-22', name: 'Iced Tea', category: 'Drinks', sku: 'ICED-TEA', barcode: '', unit: 'glass', buyingPrice: 1800, sellingPrice: 5000, stock: 25, lowStockThreshold: 5, expiryDate: '' },
    { id: 'prod-23', name: 'Chocolate Cake', category: 'Desserts', sku: 'CHOC-CAKE', barcode: '', unit: 'piece', buyingPrice: 4500, sellingPrice: 10000, stock: 18, lowStockThreshold: 4, expiryDate: '' },
    { id: 'prod-24', name: 'Fruit Salad', category: 'Desserts', sku: 'FRUIT-SALAD', barcode: '', unit: 'bowl', buyingPrice: 3200, sellingPrice: 8000, stock: 20, lowStockThreshold: 5, expiryDate: '' },
    ...window.RESTAURANT_DRINK_MENU.map((product, index) => ({
      id: `drink-menu-${index + 1}`,
      name: product.name,
      category: 'Drinks',
      sku: product.sku,
      barcode: '',
      unit: product.unit,
      buyingPrice: 0,
      sellingPrice: product.sellingPrice,
      stock: 0,
      lowStockThreshold: 0,
      expiryDate: '',
      testCatalog: true
    }))
  ],
  customers: [
    { id: 'cust-1', name: 'Walk-in Customer', phone: '', type: 'Physical', balance: 0, totalPurchases: 0 },
    { id: 'cust-2', name: 'John', phone: '0701234567', type: 'Delivery', balance: 50000, totalPurchases: 450000 }
  ],
  vendors: [
    { id: 'vend-1', name: 'ABC Distributors', phone: '0709876543', amountOwed: 300000 },
    { id: 'vend-2', name: 'Fresh Foods Ltd', phone: '0776543210', amountOwed: 0 }
  ],
  sales: [
    {
      id: 'sale-1',
      createdAt: '2026-09-15T09:15:00',
      customerId: 'cust-1',
      customerName: 'Walk-in Customer',
      customerType: 'Physical',
      cashierId: 'user-admin',
      cashierName: 'Admin',
      items: [
        { productId: 'prod-5', name: 'Rice & Chicken', qty: 2, price: 16000, total: 32000 }
      ],
      subtotal: 32000,
      discount: 0,
      total: 32000,
      paymentMethod: 'Cash',
      status: 'Completed',
      receiptNo: 'POS-1001'
    }
  ],
  purchases: [
    {
      id: 'pur-1',
      createdAt: '2026-09-15T08:00:00',
      vendorId: 'vend-2',
      vendorName: 'Fresh Foods Ltd',
      actorId: 'user-admin',
      actorName: 'Admin',
      items: [
        { productId: 'prod-7', name: 'Soda', qty: 20, buyingPrice: 1800, total: 36000 }
      ],
      total: 36000
    }
  ],
  quotations: [],
  expenses: [
    { id: 'exp-1', name: 'Electricity', amount: 100000, date: '2026-09-15', description: 'Monthly office power bill' },
    { id: 'exp-2', name: 'Transport', amount: 50000, date: '2026-09-15', description: 'Delivery transport' }
  ],
  payments: [
    { id: 'pay-1', type: 'Income', label: 'Customer payment', amount: 250000, date: '2026-09-15' },
    { id: 'pay-2', type: 'Expense', label: 'Rent', amount: 300000, date: '2026-09-15' }
  ],
  creditAccounts: [],
  deliveries: [
    { id: 'del-1', customerName: 'John', address: 'Kampala, Nakawa', phone: '0701234567', fee: 15000, status: 'Pending' },
    { id: 'del-2', customerName: 'Mary', address: 'Mbarara Road', phone: '0771234567', fee: 12000, status: 'Delivered' }
  ]
};

const state = loadState();
if (!backendToken) {
  state.session = { loggedIn: false, userId: null };
}
saveState();
const saleDraft = {
  items: [],
  customerId: '',
  paymentMethod: 'Cash',
  discount: 0,
  taxRate: 0,
  paymentDetails: {}
};
const purchaseDraft = { items: [], vendorId: '' };
const scannerState = {
  currentContext: 'sales',
  modal: null,
  socket: null,
  token: '',
  phoneConnected: false,
  phoneDeviceName: '',
  phoneLastScan: ''
};
const quotationDraft = { items: [], editingId: '' };
const kitchenDraftItems = [];
let selectedMenuCategory = '*';
let activeMenuTab = 'items';
let productFormContext = 'menu';
const MENU_CATEGORY_CONFIG = {
  'Main Dishes': { icon: '🍽', color: '#f59e0b', order: 1 },
  'Burgers': { icon: '🍔', color: '#10b981', order: 2 },
  'Pizza': { icon: '🍕', color: '#06b6d4', order: 3 },
  'Drinks': { icon: '🥤', color: '#ef4444', order: 4 },
  'Desserts': { icon: '🍨', color: '#3b82f6', order: 5 }
};

const navButtons = document.querySelectorAll('.nav-item');
const pageTitle = document.getElementById('page-title');
const sections = document.querySelectorAll('.module-section');
const loginOverlay = document.getElementById('login-overlay');
const loginForm = document.getElementById('login-form');
const logoutButton = document.getElementById('logout-button');
const pendingDeliveriesPill = document.getElementById('pending-deliveries-pill');
const deliveredPill = document.getElementById('delivered-pill');
const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.querySelector('.sidebar');
const sidebarBackdrop = document.getElementById('sidebar-backdrop');
const dashboard = document.getElementById('dashboard');

const salesCustomerSelect = document.getElementById('sales-customer');
const salesCashierSelect = document.getElementById('sales-cashier');
const salesPaymentMethod = document.getElementById('sales-payment-method');
const pesapalPaymentDetails = document.getElementById('pesapal-payment-details');
const mobileMoneyDetails = document.getElementById('mobile-money-details');
const creditPaymentDetails = document.getElementById('credit-payment-details');
const otherPaymentDetails = document.getElementById('other-payment-details');
const mobileMoneyAccountSelect = document.getElementById('mobile-money-account');
const creditAccountsListBox = document.getElementById('credit-accounts-list');
const salesProductSelect = document.getElementById('sales-product');
const salesProductSearch = document.getElementById('sales-product-search');
const salesProductOptions = document.getElementById('sales-product-options');
const salesDiscountInput = document.getElementById('sales-discount');
const salesCartBox = document.getElementById('sales-cart');
const salesSubtotal = document.getElementById('sales-subtotal');
const salesDiscountTotal = document.getElementById('sales-discount-total');
const salesGrandTotal = document.getElementById('sales-grand-total');
const salesHistoryBox = document.getElementById('sales-history');
const salesHistorySearch = document.getElementById('sales-history-search');
const invoiceSearch = document.getElementById('invoice-search');
const invoiceListBox = document.getElementById('invoice-list');
const receiptPreview = document.getElementById('receipt-preview');
const purchaseBarcodeInput = document.getElementById('purchase-barcode');
const purchaseProductSearch = document.getElementById('purchase-product-search');
const purchaseProductOptions = document.getElementById('purchase-product-options');
const themeToggle = document.getElementById('theme-toggle');
const receiptPaperSize = document.getElementById('receipt-paper-size');

const purchaseVendorSelect = document.getElementById('purchase-vendor');
const purchaseProductSelect = document.getElementById('purchase-product');
const purchaseQtyInput = document.getElementById('purchase-qty');
const purchasePriceInput = document.getElementById('purchase-price');
const purchaseSellingPriceInput = document.getElementById('purchase-selling-price');
const purchaseExpiryDateInput = document.getElementById('purchase-expiry-date');
const purchaseCartBox = document.getElementById('purchase-cart');
const purchaseGrandTotal = document.getElementById('purchase-grand-total');
const purchaseHistoryBox = document.getElementById('purchase-history');
const purchaseHistorySearch = document.getElementById('purchase-history-search');
const quotationForm = document.getElementById('quotation-form');
const quotationCustomerSelect = document.getElementById('quotation-customer');
const quotationProductSelect = document.getElementById('quotation-product');
const quotationCartBox = document.getElementById('quotation-cart');
const quotationListBox = document.getElementById('quotation-list');
const quotationSearch = document.getElementById('quotation-search');
const currentBranchSelect = document.getElementById('current-branch');
const branchForm = document.getElementById('branch-form');
const branchListBox = document.getElementById('branch-list');
const branchManagerSelect = document.getElementById('branch-manager');
const stockTransferForm = document.getElementById('stock-transfer-form');
const stockTransferList = document.getElementById('stock-transfer-list');

const customerForm = document.getElementById('customer-form');
const customerSearch = document.getElementById('customer-search');
const creditSearch = document.getElementById('credit-search');
const customerListBox = document.getElementById('customer-list');
const businessSettingsForm = document.getElementById('business-settings-form');
const businessLogoInput = document.getElementById('business-logo');
const businessLogoPreview = document.getElementById('business-logo-preview');
const staffAccountForm = document.getElementById('staff-account-form');
const staffAccountList = document.getElementById('staff-account-list');

const vendorForm = document.getElementById('vendor-form');
const vendorSearch = document.getElementById('vendor-search');
const vendorListBox = document.getElementById('vendor-list');

const productForm = document.getElementById('product-form');
const menuLowStockListBox = document.getElementById('menu-low-stock-list');
const menuProductListBox = document.getElementById('menu-product-list');
const menuProductSearch = document.getElementById('menu-product-search');
const inventoryLowStockListBox = document.getElementById('inventory-low-stock-list');
const inventoryProductListBox = document.getElementById('inventory-product-list');
const inventoryProductSearch = document.getElementById('inventory-product-search');
let inventoryFilter = 'all';
let menuFilter = 'all';
let salesCategory = '*';
let salesOrderMode = 'dine-in';
let orderStatusFilter = '';
let kitchenStatusFilter = '';
let reportTab = 'sales';

const expenseForm = document.getElementById('expense-form');
const paymentForm = document.getElementById('payment-form');
const expenseHistoryBox = document.getElementById('expense-history');
const expenseSearch = document.getElementById('expense-search');
const staffSearch = document.getElementById('staff-search');
const branchSearch = document.getElementById('branch-search');
const mobileMoneyAccountForm = document.getElementById('mobile-money-account-form');
const mobileMoneyAccountList = document.getElementById('mobile-money-account-list');
const mobileMoneyAccountBranch = document.getElementById('mobile-money-account-branch');
const todayIncome = document.getElementById('today-income');
const todayExpenses = document.getElementById('today-expenses');
const todayProfit = document.getElementById('today-profit');
const currentBalance = document.getElementById('current-balance');
const reportType = document.getElementById('report-type');
const reportFrom = document.getElementById('report-from');
const reportTo = document.getElementById('report-to');
const reportResults = document.getElementById('report-results');
const reportSummary = document.getElementById('report-summary');

const deliveryListBox = document.getElementById('delivery-list');
const deliverySummary = document.getElementById('delivery-summary');
const deliveryBoardCount = document.getElementById('delivery-board-count');
const deliveryFilterDate = document.getElementById('delivery-filter-date');
const deliveryFilterStatus = document.getElementById('delivery-filter-status');
const deliveryFilterDriver = document.getElementById('delivery-filter-driver');
const deliveryFilterCustomer = document.getElementById('delivery-filter-customer');
let deliverySummaryFilter = '';
const deliveryModal = document.getElementById('delivery-modal');
const deliveryModalForm = document.getElementById('delivery-modal-form');
const deliveryModalTitle = document.getElementById('delivery-modal-title');
const deliveryModalFields = document.getElementById('delivery-modal-fields');
const deliveryModalSubmit = document.getElementById('delivery-modal-submit');
let deliveryModalAction = '';
let deliveryModalDeliveryId = '';
let returnSaleId = '';
const returnSaleModal = document.getElementById('return-sale-modal');
const historyYearSelect = document.getElementById('history-year');
const historyMonthSelect = document.getElementById('history-month');
const historyCalendar = document.getElementById('history-calendar');
const historySelectedTitle = document.getElementById('history-selected-title');
const historySelectedTotal = document.getElementById('history-selected-total');
const historySelectedList = document.getElementById('history-selected-list');

const historyView = {
  year: new Date().getFullYear(),
  month: new Date().getMonth(),
  day: new Date().getDate()
};

const pendingDeliveriesBadge = document.getElementById('pending-deliveries-badge');
const deliveredBadge = document.getElementById('delivered-badge');

let lastReceiptText = 'No sale completed yet.';
let lastReceiptSale = null;
let pendingPesapalSale = null;
let isRefreshingDashboardSales = false;

setup();
function setup() {
  bindNavigation();
  bindDashboardNavigation();
  bindScannerActions();
  bindSalesActions();
  bindInvoiceActions();
  bindPurchaseActions();
  bindQuotationActions();
  bindBranchActions();
  bindCustomerActions();
  bindVendorActions();
  bindInventoryActions();
  bindAccountActions();
  bindDeliveryActions();
  bindHistoryActions();
  bindKitchenActions();
  bindKitchenWorkspaceActions();
  bindReportsActions();
  bindAdminSettingsActions();
  bindDisplayPreferences();
  bindAuthActions();
  window.setInterval(async () => {
    if (isRefreshingDashboardSales || !backendToken || !state.session.loggedIn || !dashboard.classList.contains('active') || document.hidden) return;
    isRefreshingDashboardSales = true;
    try {
      const { sales } = await apiRequest('/sales');
      state.sales = (sales || []).map(mapSale);
      renderDashboard();
    } catch (error) {
      console.error('Dashboard order refresh failed:', error);
    } finally {
      isRefreshingDashboardSales = false;
    }
  }, 15000);
  renderAll();
  applyAuthState();
}

function loadState() {
  const freshState = JSON.parse(JSON.stringify(defaultState));
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return freshState;

  try {
    const parsed = JSON.parse(saved);
    const users = parsed.users || freshState.users;
    const savedProducts = (!parsed.products || parsed.products.length <= 5 || (parsed.products.length < 24 && parsed.products[0]?.name === 'Beef stew'))
      ? freshState.products
      : parsed.products;
    if (!users.some((user) => user.role === 'delivery')) users.push(freshState.users.find((user) => user.role === 'delivery'));
    return {
      ...freshState,
      ...parsed,
      session: {
        ...freshState.session,
        ...(parsed.session || {})
      },
      business: {
        ...freshState.business,
        ...(parsed.business || {})
      },
      preferences: {
        ...freshState.preferences,
        ...(parsed.preferences || {})
      },
      branches: parsed.branches || freshState.branches,
      restaurantTables: parsed.restaurantTables || freshState.restaurantTables,
      reservations: parsed.reservations || freshState.reservations,
      kitchenTickets: parsed.kitchenTickets || freshState.kitchenTickets,
      mobileMoneyAccounts: (parsed.mobileMoneyAccounts || freshState.mobileMoneyAccounts).map((account) => ({
        ...account,
        network: account.network === 'Airtel' ? 'Airtel' : 'MTN',
        status: account.status === 'Inactive' ? 'Inactive' : 'Active',
        branchId: account.branchId || ''
      })),
      stockTransfers: parsed.stockTransfers || freshState.stockTransfers,
      users,
      products: [
        ...savedProducts,
        ...freshState.products.filter((product) =>
          product.testCatalog
          && !savedProducts.some((savedProduct) => savedProduct.sku === product.sku)
        )
      ].map((product) => ({
        ...product,
        barcode: product.barcode || product.sku || '',
        branchId: product.branchId || '',
        expiryDate: product.expiryDate || ''
      })),
      customers: (parsed.customers || freshState.customers).map((customer) => {
        const type = customer.type === 'Call Order' ? 'Delivery' : customer.type === 'Physical' ? 'Physical' : 'Delivery';
        return {
          ...customer,
          name: type === 'Physical' ? 'Walk-in Customer' : customer.name,
          type
        };
      }),
      vendors: parsed.vendors || freshState.vendors,
      sales: parsed.sales || freshState.sales,
      purchases: parsed.purchases || freshState.purchases,
      quotations: parsed.quotations || freshState.quotations,
      expenses: parsed.expenses || freshState.expenses,
      payments: parsed.payments || freshState.payments,
      creditAccounts: parsed.creditAccounts || freshState.creditAccounts,
      deliveries: (parsed.deliveries || freshState.deliveries).map(normalizeDelivery)
    };
  } catch (error) {
    return freshState;
  }
}

function saveState() {
  // GitHub Pages is a static host, so all POS data is stored in this browser.
  const persistentState = {
    ...state,
    serverSummary: null,
    paymentConfig: null,
    paymentSummary: null
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(persistentState));
}

async function apiRequest(path, options = {}) {
  // Local API emulator for GitHub Pages.
  // No HTTP requests, Node.js server, PostgreSQL, or environment variables are used.
  const method = String(options.method || 'GET').toUpperCase();
  const cleanPath = String(path).split('?')[0];
  const idMatch = cleanPath.match(/\/([^/]+)\/([^/]+)(?:\/([^/]+))?$/);
  let body = {};
  try { body = options.body ? JSON.parse(options.body) : {}; } catch { body = {}; }

  const now = new Date().toISOString();
  const makeId = (prefix) => uid(prefix);

  const serverUser = (u) => ({
    id: u.id, business_id: u.businessId || 'business-local',
    branch_id: u.branchId || null, username: u.username,
    display_name: u.displayName, role: u.role, email: u.email || '',
    phone: u.phone || '', address: u.address || '', active: u.active !== false,
    password_hash: ''
  });

  const serverProduct = (p) => ({
    id: p.id, name: p.name, category: p.category || '',
    sku: p.sku || '', barcode: p.barcode || '', unit: p.unit || 'piece',
    cost_price: Number(p.buyingPrice || 0), selling_price: Number(p.sellingPrice || 0),
    minimum_stock: Number(p.lowStockThreshold || 0), stock: Number(p.stock || 0),
    image_url: p.imageUrl || '', active: true
  });
  const serverCustomer = (c) => ({
    id:c.id, name:c.name, phone:c.phone||'', email:c.email||'', address:c.address||'',
    balance:Number(c.balance||0), active:c.active!==false
  });
  const serverVendor = (v) => ({
    id:v.id, name:v.name, phone:v.phone||'', email:v.email||'', address:v.address||'',
    balance:Number(v.amountOwed||0), products:v.products||'', active:v.active!==false
  });
  const serverSale = (s) => ({
    id:s.id, created_at:s.createdAt||now, customer_id:s.customerId||'',
    customer_name:s.customerName||'', cashier_id:s.cashierId||'',
    cashier_name:s.cashierName||'', items:s.items||[], subtotal:Number(s.subtotal||0),
    discount:Number(s.discount||0), tax:Number(s.tax||0), total:Number(s.total||0),
    payment_method:s.paymentMethod||'Cash', status:(s.status||'Completed').toLowerCase(),
    receipt_no:s.receiptNo||'', transaction_reference:s.paymentDetails?.transactionReference||'',
    customer_phone:s.paymentDetails?.customerPhone||'',
    payment_metadata:s.paymentDetails||{}
  });
  const serverPurchase = (p) => ({
    id:p.id, created_at:p.createdAt||now, supplier_id:p.vendorId||'',
    supplier_name:p.vendorName||'', created_by:p.actorId||'', items:p.items||[],
    total:Number(p.total||0), branch_id:p.branchId||null
  });
  const serverExpense = (e) => ({
    id:e.id, name:e.name, amount:Number(e.amount||0), expense_date:e.date||dateISO(),
    description:e.description||'', branch_id:e.branchId||null
  });
  const serverPayment = (p) => ({
    id:p.id, amount:Number(p.amount||0), method:p.method||'Cash',
    created_at:p.date ? `${p.date}T00:00:00` : now, branch_id:p.branchId||null,
    metadata:{type:p.type,label:p.label,date:p.date}
  });
  const serverQuotation = (q) => ({
    id:q.id, business_id:q.businessId||'business-local', branch_id:q.branchId||null,
    quotation_no:q.quotationNo, customer_id:q.customerId, customer_name:q.customerName,
    items:q.items||[], quotation_date:q.quotationDate, expiry_date:q.expiryDate,
    notes:q.notes||'', tax_rate:Number(q.taxRate||0), subtotal:Number(q.subtotal||0),
    discount:Number(q.discount||0), tax:Number(q.tax||0), total:Number(q.total||0),
    status:q.status||'Draft', created_at:q.createdAt||now, converted_sale_id:q.convertedSaleId||null
  });
  const serverDelivery = (d) => ({
    id:d.id, business_id:d.businessId||'business-local', branch_id:d.branchId||null,
    sale_id:d.saleId||null, purchase_id:d.purchaseId||null, delivery_no:d.deliveryNo,
    receipt_no:d.receiptNo||'', customer_id:d.customerId||'', customer_name:d.customerName||'',
    customer_email:d.customerEmail||'', phone:d.phone||'', address:d.address||'',
    order_total:Number(d.orderTotal||0), fee:Number(d.fee||0), status:d.status||'Pending',
    driver_id:d.driverId||'', driver_name:d.driverName||'', pin:d.pin||'',
    failure_reason:d.failureReason||'', failure_description:d.failureDescription||'',
    timestamps:d.timestamps||{}, created_at:d.createdAt||now
  });

  if (cleanPath === '/auth/login' && method === 'POST') {
    const username = String(body.username || '').trim();
    const password = String(body.password || '');
    const user = state.users.find(u => u.username === username && u.active !== false &&
      ((u.password || '') === password || (username === 'admin' && password === 'admin123')));
    if (!user) throw Object.assign(new Error('Invalid username or password'), {status:401});
    return { token:'github-pages-local-session', user:serverUser(user), rememberDevice:!!body.rememberDevice };
  }

  if (cleanPath === '/me') return { user: serverUser(getCurrentUser()) };

  if (method === 'GET') {
    if (cleanPath === '/products') return {products: state.products.map(serverProduct)};
    if (cleanPath === '/customers') return {customers: state.customers.map(serverCustomer)};
    if (cleanPath === '/suppliers') return {suppliers: state.vendors.map(serverVendor)};
    if (cleanPath === '/sales') return {sales: state.sales.map(serverSale)};
    if (cleanPath === '/purchases') return {purchases: state.purchases.map(serverPurchase)};
    if (cleanPath === '/expenses') return {expenses: state.expenses.map(serverExpense)};
    if (cleanPath === '/payments') return {payments: state.payments.map(serverPayment)};
    if (cleanPath === '/branches') return {branches: state.branches};
    if (cleanPath === '/mobile-money/accounts') return {accounts: state.mobileMoneyAccounts.map(a => ({
      id:a.id, network:a.network, recipient_name:a.name, phone:a.phone, description:a.description||'',
      active:a.status !== 'Inactive', branch_id:a.branchId||null
    }))};
    if (cleanPath === '/quotations') return {quotations: state.quotations.map(serverQuotation)};
    if (cleanPath === '/deliveries') return {deliveries: state.deliveries.map(serverDelivery)};
    if (cleanPath === '/stock-transfers') return {stock_transfers: state.stockTransfers.map(t => ({
      id:t.id, from_branch_id:t.fromBranchId, to_branch_id:t.toBranchId,
      items:[{productId:t.productId,quantity:t.quantity}], status:t.status||'Completed', created_at:t.createdAt||now
    }))};
    if (cleanPath === '/users') return {users: state.users.map(serverUser)};
    if (cleanPath === '/business') return {business:{
      id:state.business.id||'business-local', name:state.business.name, phone:state.business.phone,
      email:state.business.email,address:state.business.address,logo:state.business.logo,
      country:state.business.country,currency:state.business.currency,tax_rate:state.business.taxRate,
      multi_branch:!!state.business.multiBranches,opening_balance:state.business.openingBalance,
      financial_year_start:state.business.financialYearStart
    }};
    if (cleanPath === '/payments/config') return {providers:{cash:true,mobile_money:true,pesapal:false,card:false}};
    if (cleanPath === '/payments/summary/today') return {summary:{income:0,expenses:0}};
    if (cleanPath === '/restaurant/kitchen-tickets') return {tickets:state.kitchenTickets};
    if (cleanPath === '/reports/summary') {
      const today=dateISO();
      const income=state.sales.filter(s=>String(s.createdAt||'').slice(0,10)===today).reduce((a,s)=>a+Number(s.total||0),0);
      const expenses=state.expenses.filter(e=>e.date===today).reduce((a,e)=>a+Number(e.amount||0),0);
      return {summary:{today_income:income,today_expenses:expenses,today_profit:income-expenses,current_balance:income-expenses}};
    }
    if (cleanPath.startsWith('/payments/') && cleanPath.endsWith('/status')) return {status:'COMPLETED'};
  }

  if (method === 'POST') {
    if (cleanPath === '/scanner/pair') return {
      token: `LOCAL-${Date.now()}`, qrCodeDataUrl:'', mode:'local',
      message:'Phone scanner pairing requires a server. Use USB/Bluetooth scanner or type a barcode.'
    };
    if (cleanPath === '/scanner/unpair') return {ok:true};
    if (cleanPath === '/payments/pesapal/checkout') throw new Error('Online Pesapal checkout is not available on GitHub Pages. Record the payment manually or use the Cash/Mobile Money option.');
    if (cleanPath === '/products') {
      const p = {
        id: makeId('prod'),
        name: String(body.name || 'New Item'),
        category: body.category || '',
        sku: body.sku || '',
        barcode: body.barcode || body.sku || '',
        unit: body.unit || 'piece',
        buyingPrice: Number(body.cost_price || 0),
        sellingPrice: Number(body.selling_price || 0),
        stock: Number(body.stock || 0),
        lowStockThreshold: Number(body.minimum_stock || 0),
        expiryDate: body.expiry_date || '',
        imageUrl: body.image_url || '',
        branchId: body.branch_id || ''
      };
      state.products.push(p);
      saveState();
      return {product: serverProduct(p)};
    }
    if (cleanPath === '/sales') {
      const id=makeId('sale');
      const customer=state.customers.find(c=>c.id===body.customer_id);
      const cashier=state.users.find(u=>u.id===body.cashier_id)||getCurrentUser();
      const sale={
        id, createdAt:now, customerId:body.customer_id||'', customerName:customer?.name||'Walk-in Customer',
        cashierId:cashier?.id||'', cashierName:cashier?.displayName||'Admin',
        items:(body.items||[]).map(i=>({productId:i.product_id,name:state.products.find(p=>p.id===i.product_id)?.name||i.product_id,qty:Number(i.quantity),price:Number(i.unit_price),total:Number(i.line_total)})),
        subtotal:Number(body.subtotal||0),discount:Number(body.discount||0),tax:Number(body.tax||0),
        total:Number(body.subtotal||0)-Number(body.discount||0)+Number(body.tax||0),
        paymentMethod:body.payment_method||'Cash',status:'Completed',receiptNo:body.receipt_no||`POS-${Date.now().toString().slice(-6)}`,
        paymentDetails:body.payment_details||{}
      };
      state.sales.unshift(sale);
      sale.items.forEach(i=>{const p=state.products.find(x=>x.id===i.productId);if(p)p.stock=Math.max(0,Number(p.stock||0)-Number(i.qty||0));});
      saveState();
      return {sale:serverSale(sale)};
    }
    if (cleanPath === '/purchases') {
      const vendor=state.vendors.find(v=>v.id===body.supplier_id);
      const record={id:makeId('pur'),createdAt:now,vendorId:body.supplier_id||'',vendorName:vendor?.name||'',actorId:getCurrentUser()?.id||'',actorName:getCurrentUser()?.displayName||'',items:(body.items||[]).map(i=>({productId:i.product_id,name:state.products.find(p=>p.id===i.product_id)?.name||i.product_id,qty:Number(i.quantity),buyingPrice:Number(i.buying_price),sellingPrice:Number(i.selling_price),total:Number(i.line_total)})),total:Number(body.subtotal||0)-Number(body.discount||0)+Number(body.tax||0),branchId:body.branch_id||''};
      state.purchases.unshift(record);
      record.items.forEach(i=>{const p=state.products.find(x=>x.id===i.productId);if(p){p.stock=Number(p.stock||0)+Number(i.qty||0);p.buyingPrice=i.buyingPrice||p.buyingPrice;p.sellingPrice=i.sellingPrice||p.sellingPrice;}});
      saveState(); return {purchase:serverPurchase(record)};
    }
    if (cleanPath === '/expenses') {
      const e={id:makeId('exp'),name:body.name,amount:Number(body.amount||0),date:body.expense_date||dateISO(),description:body.description||'',branchId:body.branch_id||''};
      state.expenses.unshift(e);saveState();return {expense:serverExpense(e)};
    }
    if (cleanPath === '/payments') {
      const p={id:makeId('pay'),type:body.type||'Income',label:body.label||body.method,amount:Number(body.amount||0),date:body.date||dateISO(),branchId:body.branch_id||''};
      state.payments.unshift(p);saveState();return {payment:serverPayment(p)};
    }
    if (cleanPath === '/customers') {
      const c={id:makeId('cust'),name:body.name||'Customer',phone:body.phone||'',email:body.email||'',address:body.address||'',type:body.name==='Walk-in Customer'?'Physical':'Delivery',balance:0,totalPurchases:0,active:true};
      state.customers.push(c);saveState();return {customer:serverCustomer(c)};
    }
    if (cleanPath === '/suppliers') {
      const v={id:makeId('vend'),name:body.name||'Supplier',phone:body.phone||'',email:body.email||'',address:body.address||'',products:'',amountOwed:0,active:true};
      state.vendors.push(v);saveState();return {supplier:serverVendor(v)};
    }
    if (cleanPath === '/mobile-money/accounts') {
      const a={id:makeId('mm'),network:body.network==='Airtel'?'Airtel':'MTN',name:body.recipient_name||'',phone:body.phone||'',description:body.description||'',status:body.active===false?'Inactive':'Active',branchId:body.branch_id||''};
      state.mobileMoneyAccounts.push(a);saveState();return {account:a};
    }
    if (cleanPath === '/users') {
      const u={id:makeId('user'),businessId:'business-local',branchId:body.branch_id||'',username:body.username, password:body.password||'password',displayName:body.display_name||body.username,role:body.role||'sales',phone:body.phone||'',email:body.email||'',address:'',active:true};
      state.users.push(u);saveState();return {user:serverUser(u)};
    }
    if (cleanPath === '/branches') {
      const b={id:makeId('branch'),name:body.name||'Branch',phone:body.phone||'',address:body.address||'',active:body.active!==false};
      state.branches.push(b);saveState();return {branch:b};
    }
    if (cleanPath === '/stock-transfers') {
      const item=body.items?.[0]||{};
      const t={id:makeId('transfer'),fromBranchId:body.from_branch_id,toBranchId:body.to_branch_id,productId:item.product_id,quantity:Number(item.quantity||0),status:'Completed',createdAt:now};
      const p=state.products.find(x=>x.id===t.productId); if(p)p.stock=Math.max(0,Number(p.stock||0)-t.quantity);
      state.stockTransfers.unshift(t);saveState();return {stock_transfer:{id:t.id,from_branch_id:t.fromBranchId,to_branch_id:t.toBranchId,items:[{productId:t.productId,quantity:t.quantity}],status:t.status,created_at:now}};
    }
    if (cleanPath === '/quotations') {
      const q={id:makeId('quote'),businessId:'business-local',branchId:body.branch_id||'',quotationNo:body.quotation_no,customerId:body.customer_id,customerName:state.customers.find(c=>c.id===body.customer_id)?.name||'',items:(body.items||[]).map(i=>({productId:i.product_id,quantity:Number(i.quantity),unitPrice:Number(i.unit_price),lineTotal:Number(i.line_total)})),quotationDate:body.quotation_date,expiryDate:body.expiry_date,notes:body.notes||'',taxRate:Number(body.tax_rate||0),subtotal:Number(body.subtotal||0),discount:Number(body.discount||0),tax:Number(body.tax||0),total:Number(body.total||0),status:'Draft',createdAt:now,convertedSaleId:''};
      state.quotations.push(q);saveState();return {quotation:serverQuotation(q)};
    }
    if (cleanPath === '/deliveries') {
      const d=normalizeDelivery({id:makeId('del'),businessId:'business-local',branchId:body.branch_id||'',saleId:body.sale_id||'',deliveryNo:body.delivery_no,customerId:body.customer_id||'',customerName:body.customer_name||'',customerEmail:body.customer_email||'',phone:body.phone||'',address:body.address||'',orderTotal:Number(body.order_total||0),fee:Number(body.fee||0),status:body.status||'Pending',pin:body.pin||String(Math.floor(1000+Math.random()*9000)),createdAt:now,timestamps:{created:now}});
      state.deliveries.unshift(d);saveState();return {delivery:serverDelivery(d)};
    }
    if (cleanPath === '/restaurant/kitchen-tickets') {
      const ticket={id:makeId('ticket'),branch_id:body.branch_id||null,status:'queued',notes:body.notes||'',created_at:now,created_by_name:getCurrentUser()?.displayName||'Staff',items:body.items||[]};
      state.kitchenTickets.unshift(ticket);saveState();return {ticket};
    }
    if (/^\/sales\/[^/]+\/return$/.test(cleanPath)) {
      const saleId=cleanPath.split('/')[2], sale=state.sales.find(s=>s.id===saleId);
      if (sale){sale.status='Returned';sale.items.forEach(i=>{const p=state.products.find(x=>x.id===i.productId);if(p)p.stock+=Number(i.qty||0);});saveState();}
      return {ok:true};
    }
  }

  if (method === 'PATCH') {
    const id=idMatch?.[2];
    if (cleanPath === '/business') {
      state.business={...state.business,name:body.name??state.business.name,phone:body.phone??state.business.phone,email:body.email??state.business.email,address:body.address??state.business.address,logo:body.logo??state.business.logo,currency:body.currency??state.business.currency,taxRate:Number(body.tax_rate??state.business.taxRate),multiBranches:!!(body.multi_branch??state.business.multiBranches),openingBalance:Number(body.opening_balance??state.business.openingBalance),financialYearStart:body.financial_year_start??state.business.financialYearStart};
      saveState();return {business:{id:'business-local',name:state.business.name,phone:state.business.phone,email:state.business.email,address:state.business.address,logo:state.business.logo,country:state.business.country,currency:state.business.currency,tax_rate:state.business.taxRate,multi_branch:state.business.multiBranches,opening_balance:state.business.openingBalance,financial_year_start:state.business.financialYearStart}};
    }
    if (cleanPath === '/payments/config') return {ok:true};
    if (cleanPath.startsWith('/products/')) {
      const p=state.products.find(x=>x.id===id);
      if(p){Object.assign(p,{name:body.name??p.name,sku:body.sku??p.sku,barcode:body.barcode??p.barcode,category:body.category??p.category,unit:body.unit??p.unit,buyingPrice:Number(body.cost_price??p.buyingPrice),sellingPrice:Number(body.selling_price??p.sellingPrice),lowStockThreshold:Number(body.minimum_stock??p.lowStockThreshold),imageUrl:body.image_url??p.imageUrl});saveState();}
      return {product:serverProduct(p)};
    }
    if (cleanPath.startsWith('/customers/')) {
      const c=state.customers.find(x=>x.id===id); if(c)Object.assign(c,{name:body.name??c.name,phone:body.phone??c.phone,email:body.email??c.email,address:body.address??c.address});saveState();return {customer:serverCustomer(c)};
    }
    if (cleanPath.startsWith('/suppliers/')) {
      const v=state.vendors.find(x=>x.id===id); if(v)Object.assign(v,{name:body.name??v.name,phone:body.phone??v.phone,email:body.email??v.email,address:body.address??v.address});saveState();return {supplier:serverVendor(v)};
    }
    if (cleanPath.startsWith('/mobile-money/accounts/')) {
      const a=state.mobileMoneyAccounts.find(x=>x.id===id);if(a)Object.assign(a,{network:body.network??a.network,name:body.recipient_name??a.name,phone:body.phone??a.phone,description:body.description??a.description,status:body.active===false?'Inactive':'Active'});saveState();return {account:a};
    }
    if (cleanPath.startsWith('/users/')) {
      const u=state.users.find(x=>x.id===id);if(u)Object.assign(u,{username:body.username??u.username,password:body.password??u.password,displayName:body.display_name??u.displayName,role:body.role??u.role,phone:body.phone??u.phone,email:body.email??u.email,active:body.active??u.active});saveState();return {user:serverUser(u)};
    }
    if (cleanPath.startsWith('/branches/')) {
      const b=state.branches.find(x=>x.id===id);if(b)Object.assign(b,{name:body.name??b.name,phone:body.phone??b.phone,address:body.address??b.address,active:body.active??b.active});saveState();return {branch:b};
    }
    if (cleanPath.startsWith('/quotations/') && cleanPath.endsWith('/status')) {
      const qid=cleanPath.split('/')[2],q=state.quotations.find(x=>x.id===qid);if(q)q.status=body.status||q.status;saveState();return {quotation:serverQuotation(q)};
    }
    if (cleanPath.startsWith('/quotations/')) {
      const q=state.quotations.find(x=>x.id===id);if(q)Object.assign(q,{notes:body.notes??q.notes,expiryDate:body.expiry_date??q.expiryDate,status:body.status??q.status});saveState();return {quotation:serverQuotation(q)};
    }
    if (cleanPath.startsWith('/deliveries/')) {
      const d=state.deliveries.find(x=>x.id===id);
      if(d){if(body.driver_id!==undefined){const u=state.users.find(x=>x.id===body.driver_id);d.driverId=body.driver_id;d.driverName=u?.displayName||'';}if(body.status)d.status=body.status;if(body.timestamp_key)d.timestamps={...(d.timestamps||{}),[body.timestamp_key]:now};if(body.failure_reason)d.failureReason=body.failure_reason;if(body.failure_description)d.failureDescription=body.failure_description;saveState();}
      return {delivery:serverDelivery(d)};
    }
    if (cleanPath.startsWith('/restaurant/kitchen-tickets/') && cleanPath.endsWith('/status')) {
      const tid=cleanPath.split('/')[3],t=state.kitchenTickets.find(x=>x.id===tid);if(t)t.status=body.status||t.status;saveState();return {ticket:t};
    }
  }

  if (method === 'DELETE') {
    if (cleanPath.startsWith('/customers/')) { state.customers=state.customers.filter(x=>x.id!==id);saveState();return {ok:true}; }
    if (cleanPath.startsWith('/suppliers/')) { state.vendors=state.vendors.filter(x=>x.id!==id);saveState();return {ok:true}; }
    if (cleanPath.startsWith('/products/')) { state.products=state.products.filter(x=>x.id!==id);saveState();return {ok:true}; }
    if (cleanPath.startsWith('/users/')) { state.users=state.users.filter(x=>x.id!==id);saveState();return {ok:true}; }
    if (cleanPath.startsWith('/mobile-money/accounts/')) { state.mobileMoneyAccounts=state.mobileMoneyAccounts.filter(x=>x.id!==id);saveState();return {ok:true}; }
  }

  return {};
}

function showSignInRequired(message) {
  const loginHint = document.querySelector('.login-hint');
  if (loginHint) loginHint.textContent = message;
}

async function connectBackend(username, password, rememberDevice = false) {
  const result = await apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password, rememberDevice })
  });
  backendToken = result.token;
  if (rememberDevice) localStorage.setItem(REMEMBER_DEVICE_KEY, 'true');
  else localStorage.removeItem(REMEMBER_DEVICE_KEY);
  return result.user;
}

function mapProduct(product) {
  return { id: product.id, name: product.name, category: product.category || '', imageUrl: product.image_url || '', sku: product.sku || '', barcode: product.barcode || '', unit: String(product.unit || 'piece').trim() || 'piece', buyingPrice: Number(product.cost_price || 0), sellingPrice: Number(product.selling_price || 0), stock: Number(product.stock || 0), lowStockThreshold: Number(product.minimum_stock || 0), expiryDate: '' };
}

function getProductUnit(productId) {
  if (productId && typeof productId === 'object') productId = productId.productId || productId.product_id;
  return state.products.find((product) => product.id === productId)?.unit || 'piece';
}

function updateQuantityUnitLabels() {
  [
    ['purchase-quantity-unit', purchaseProductSelect.value],
    ['quotation-quantity-unit', quotationProductSelect.value],
    ['transfer-quantity-unit', document.getElementById('transfer-product')?.value]
  ].forEach(([labelId, productId]) => {
    const label = document.getElementById(labelId);
    if (label) label.textContent = `(${getProductUnit(productId)})`;
  });
  const purchaseUnit = document.getElementById('purchase-unit');
  if (purchaseUnit) purchaseUnit.textContent = getProductUnit(purchaseProductSelect.value);
  const unit = document.getElementById('product-unit')?.value.trim() || 'piece';
  const stockUnit = document.getElementById('product-stock-unit');
  const thresholdUnit = document.getElementById('product-threshold-unit');
  if (stockUnit) stockUnit.textContent = `(${unit})`;
  if (thresholdUnit) thresholdUnit.textContent = `(${unit})`;
}

function mapCustomer(customer) {
  return { id: customer.id, name: customer.name, phone: customer.phone || '', email: customer.email || '', address: customer.address || '', type: customer.name === 'Walk-in Customer' ? 'Physical' : 'Delivery', balance: Number(customer.balance || 0), totalPurchases: 0, active: customer.active !== false };
}

function mapVendor(vendor) {
  return { id: vendor.id, name: vendor.name, phone: vendor.phone || '', email: vendor.email || '', address: vendor.address || '', products: vendor.products || '', amountOwed: Number(vendor.balance || 0), active: vendor.active !== false };
}

function mapSale(sale) {
  const pesapal = sale.provider_payment_method === 'PESAPAL' || sale.payment_method === 'Pesapal';
  return {
    id: sale.id,
    createdAt: sale.created_at,
    customerId: sale.customer_id || '',
    customerName: sale.customer_name || '',
    cashierId: sale.cashier_id,
    cashierName: sale.cashier_name || '',
    items: sale.items || [],
    subtotal: Number(sale.subtotal),
    discount: Number(sale.discount),
    tax: Number(sale.tax),
    total: Number(sale.total),
    paymentMethod: pesapal ? 'Pesapal' : 'Cash',
    paymentDetails: {
      transactionReference: sale.transaction_reference || '',
      confirmationCode: sale.payment_metadata?.confirmationCode || '',
      paymentChannel: sale.payment_metadata?.paymentChannel || '',
      customerPhone: sale.customer_phone || '',
      amountReceived: sale.payment_metadata?.amountReceived,
      change: sale.payment_metadata?.change
    },
    status: sale.status === 'completed' ? 'Completed' : sale.status,
    orderType: sale.order_type || sale.orderType || sale.payment_metadata?.orderType || (sale.requires_delivery ? 'delivery' : 'dine-in'),
    receiptNo: sale.receipt_no,
    branchId: sale.branch_id || ''
  };
}

function mapPurchase(purchase) {
  return { id: purchase.id, createdAt: purchase.created_at, vendorId: purchase.supplier_id || '', vendorName: purchase.supplier_name || '', actorId: purchase.created_by, actorName: '', items: purchase.items || [], total: Number(purchase.total), branchId: purchase.branch_id || '' };
}

function mapExpense(expense) {
  return { id: expense.id, name: expense.name, amount: Number(expense.amount), date: String(expense.expense_date || '').slice(0, 10), description: expense.description || '', branchId: expense.branch_id || '' };
}

function mapPayment(payment) {
  const metadata = payment.metadata || {};
  return {
    id: payment.id,
    type: metadata.type || (payment.sale_id ? 'Income' : 'Expense'),
    label: metadata.label || payment.method,
    amount: Number(payment.amount),
    date: metadata.date || payment.created_at?.slice(0, 10) || dateISO(),
    branchId: payment.branch_id || ''
  };
}

function mapQuotation(quotation) {
  return { id: quotation.id, businessId: quotation.business_id, branchId: quotation.branch_id || '', quotationNo: quotation.quotation_no, customerId: quotation.customer_id, customerName: quotation.customer_name, items: quotation.items || [], quotationDate: String(quotation.quotation_date || '').slice(0, 10), expiryDate: String(quotation.expiry_date || '').slice(0, 10), notes: quotation.notes || '', taxRate: Number(quotation.tax_rate || 0), subtotal: Number(quotation.subtotal), discount: Number(quotation.discount), tax: Number(quotation.tax), total: Number(quotation.total), status: quotation.status, createdAt: quotation.created_at, convertedSaleId: quotation.converted_sale_id || '' };
}

function mapDelivery(delivery) {
  return normalizeDelivery({ id: delivery.id, businessId: delivery.business_id, branchId: delivery.branch_id || '', saleId: delivery.sale_id || '', purchaseId: delivery.purchase_id || '', deliveryNo: delivery.delivery_no, receiptNo: delivery.receipt_no || '', customerId: delivery.customer_id || '', customerName: delivery.customer_name, customerEmail: delivery.customer_email || '', phone: delivery.phone || '', address: delivery.address || '', orderTotal: Number(delivery.order_total || 0), fee: Number(delivery.fee || 0), status: delivery.status, driverId: delivery.driver_id || '', driverName: delivery.driver_name || '', pin: delivery.pin, failureReason: delivery.failure_reason || '', failureDescription: delivery.failure_description || '', timestamps: delivery.timestamps || {}, createdAt: delivery.created_at });
}

function mapUser(user) {
  return { id: user.id, businessId: user.business_id, branchId: user.branch_id || '', username: user.username, displayName: user.display_name, role: user.role, email: user.email || '', phone: user.phone || '', address: user.address || '', active: user.active !== false };
}

function mapBusiness(business) {
  return { id: business.id, name: business.name, phone: business.phone || '', email: business.email || '', address: business.address || '', logo: business.logo || '', country: business.country || '', currency: business.currency || 'UGX', taxRate: Number(business.tax_rate || 0), multiBranches: !!business.multi_branch, openingBalance: Number(business.opening_balance || 0), financialYearStart: String(business.financial_year_start || '').slice(0, 10) };
}

function mapTransfer(transfer) {
  const item = transfer.items?.[0] || {};
  return { id: transfer.id, fromBranchId: transfer.from_branch_id, toBranchId: transfer.to_branch_id, productId: item.productId, quantity: Number(item.quantity || 0), status: transfer.status, createdAt: transfer.created_at };
}

async function refreshServerState() {
  // GitHub Pages has no server to refresh. Browser state is authoritative.
  saveState();
  return state;
}
async function refreshServerSummary() {
  const today = dateISO();
  const income = state.sales.filter(s => String(s.createdAt || '').slice(0,10) === today)
    .reduce((sum, s) => sum + Number(s.total || 0), 0);
  const expenses = state.expenses.filter(e => e.date === today)
    .reduce((sum, e) => sum + Number(e.amount || 0), 0);
  state.serverSummary = { today_income: income, today_expenses: expenses, today_profit: income - expenses, current_balance: income - expenses };
  saveState();
  return state.serverSummary;
}
function bindNavigation() {
  navButtons.forEach((button) => {
    button.addEventListener('click', () => {
      if (button.dataset.section === 'delivery') deliverySummaryFilter = '';
      showSection(button.dataset.section, button.textContent.trim(), button);
      if (button.dataset.section === 'delivery') renderDeliveries();
    });
  });

  pendingDeliveriesPill.addEventListener('click', () => openDeliverySummary('pending'));
  deliveredPill.addEventListener('click', () => openDeliverySummary('delivered'));

  menuToggle.addEventListener('click', () => {
    const isOpen = sidebar.classList.toggle('open');
    sidebarBackdrop.classList.toggle('visible', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  sidebarBackdrop.addEventListener('click', closeMobileMenu);
}

function openDeliverySummary(filter) {
  deliverySummaryFilter = filter;
  deliveryFilterDate.value = '';
  deliveryFilterStatus.value = '';
  deliveryFilterDriver.value = '';
  deliveryFilterCustomer.value = '';
  showSection('delivery', '➤ Delivery');
  renderDeliveries();
}

function bindDashboardNavigation() {
  const openDashboardSection = (section) => {
    const navigationItem = document.querySelector(`.nav-item[data-section="${section}"]`);
    if (!navigationItem || navigationItem.hidden) return;
    showSection(section, navigationItem.textContent.trim(), navigationItem);
  };

  dashboard.addEventListener('click', (event) => {
    const sectionButton = event.target.closest('[data-open-section]');
    if (sectionButton) return openDashboardSection(sectionButton.dataset.openSection);
    const target = event.target.closest('[data-dashboard-section]');
    if (target) openDashboardSection(target.dataset.dashboardSection);
  });

  dashboard.addEventListener('keydown', (event) => {
    if (!['Enter', ' '].includes(event.key)) return;
    const target = event.target.closest('[data-dashboard-section]');
    if (!target) return;
    event.preventDefault();
    openDashboardSection(target.dataset.dashboardSection);
  });
}

function showSection(target, title, activeButton = null) {
  const targetSection = document.getElementById(target);
  if (!targetSection || targetSection.hidden) {
    return;
  }

  localStorage.setItem(ACTIVE_SECTION_KEY, target);
  pageTitle.textContent = title;
  sections.forEach((section) => section.classList.toggle('active', section.id === target));
  const selectedButton = activeButton || Array.from(navButtons).find((item) => item.dataset.section === target);
  navButtons.forEach((item) => item.classList.toggle('active', item === selectedButton));
  if (target === 'menu-categories') {
    renderMenuCatalog();
  }
  closeMobileMenu();
}

function closeMobileMenu() {
  sidebar.classList.remove('open');
  sidebarBackdrop.classList.remove('visible');
  menuToggle.setAttribute('aria-expanded', 'false');
}

function bindAuthActions() {
  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value.trim();
    const rememberDevice = document.getElementById('remember-device') ? document.getElementById('remember-device').checked : false;
    try {
      const user = await connectBackend(username, password, rememberDevice);
      if (!state.users.some((entry) => entry.id === user.id)) state.users = [mapUser(user)];
      state.session.loggedIn = true;
      state.session.userId = user.id;
      const loginHint = document.querySelector('.login-hint');
      if (loginHint) loginHint.textContent = 'Internal access for restaurant staff and managers.';
      applyAuthState();
      resumePesapalReturn();
    } catch (error) {
      backendToken = 'github-pages-local';
      localStorage.removeItem('business-pos-remember-device');
      alert(error.message || 'Unable to connect to the POS server.');
    }
  });

  logoutButton.addEventListener('click', () => {
    state.session.loggedIn = false;
    state.session.userId = null;
    backendToken = 'github-pages-local';
    localStorage.removeItem('business-pos-remember-device');
    saveState();
    applyAuthState();
  });
}

function applyAuthState() {
  const isLoggedIn = !!(state.session && state.session.loggedIn);
  loginOverlay.classList.toggle('hidden', isLoggedIn);
  document.getElementById('app-shell').style.filter = isLoggedIn ? 'none' : 'blur(2px)';
  if (!isLoggedIn) {
    document.getElementById('login-password').value = 'admin123';
  }
  applyRolePermissions();
  renderAll();
}

function getCurrentUser() {
  return state.users.find((user) => user.id === state.session?.userId) || state.users[0];
}

function hasRole(...roles) {
  return roles.includes(getCurrentUser()?.role);
}

function applyRolePermissions() {
  const user = getCurrentUser();
  const role = user?.role || 'admin';
  const allowedSections = {
    admin: ['dashboard', 'menu-categories', 'sales', 'quotations', 'purchases', 'customers', 'vendors', 'inventory', 'accounts', 'delivery', 'management', 'branches', 'invoices'],
    owner: ['dashboard', 'menu-categories', 'sales', 'quotations', 'purchases', 'customers', 'vendors', 'inventory', 'accounts', 'delivery', 'management', 'branches', 'invoices'],
    manager: ['dashboard', 'menu-categories', 'sales', 'quotations', 'purchases', 'customers', 'vendors', 'inventory', 'accounts', 'delivery', 'invoices'],
    sales: ['dashboard', 'menu-categories', 'sales', 'quotations', 'inventory', 'delivery', 'invoices'],
    purchase: ['dashboard', 'menu-categories', 'purchases', 'vendors', 'inventory'],
    delivery: ['delivery']
  }[role] || ['dashboard'];

  renderCashierOptions();

  navButtons.forEach((button) => {
    button.hidden = !allowedSections.includes(button.dataset.section);
  });
  sections.forEach((section) => {
    section.hidden = !allowedSections.includes(section.id);
  });
  restoreActiveSection(allowedSections);

  const salesEditor = document.querySelector('#sales .sales-workspace-grid');
  if (salesEditor) salesEditor.hidden = role === 'purchase';
  const menuAddButton = document.getElementById('menu-add-item');
  if (menuAddButton) menuAddButton.hidden = !['admin', 'purchase'].includes(role);
  const receiptPanel = document.getElementById('customer-editor-panel');
  if (receiptPanel) receiptPanel.hidden = role === 'purchase';
  if (salesCashierSelect) salesCashierSelect.disabled = !['admin', 'owner'].includes(role);
  const inventoryEditor = document.querySelector('#inventory .card-grid:first-child .panel-card:first-child');
  if (inventoryEditor) inventoryEditor.hidden = role === 'sales';
  const deliveryEditor = document.getElementById('delivery-create-panel');
  if (deliveryEditor) deliveryEditor.hidden = role === 'purchase';
  if (document.getElementById('admin-settings-panel')) {
    document.getElementById('admin-settings-panel').hidden = !['admin', 'owner'].includes(role);
  }
  applyBranchVisibility();
}

function restoreActiveSection(allowedSections) {
  const savedSection = localStorage.getItem(ACTIVE_SECTION_KEY);
  const section = savedSection && allowedSections.includes(savedSection)
    ? document.getElementById(savedSection)
    : null;
  const navigationItem = savedSection
    ? document.querySelector(`.nav-item[data-section="${savedSection}"]`)
    : null;
  if (!section || section.hidden || !navigationItem || navigationItem.hidden) {
    const dashboardSection = document.getElementById('dashboard');
    const dashboardNavigation = document.querySelector('.nav-item[data-section="dashboard"]');
    if (dashboardSection && dashboardNavigation && !dashboardSection.hidden && !dashboardNavigation.hidden) {
      showSection('dashboard', dashboardNavigation.textContent.trim(), dashboardNavigation);
    }
    return;
  }
  showSection(savedSection, navigationItem.textContent.trim(), navigationItem);
}

function applyBranchVisibility() {
  const isMultiBranch = !!state.business.multiBranches;
  document.querySelectorAll('.multi-branch-only').forEach((element) => {
    element.hidden = !isMultiBranch;
  });
  if (currentBranchSelect) currentBranchSelect.hidden = !isMultiBranch;
}

function getActiveBranchId() {
  return state.business.multiBranches ? state.preferences.currentBranchId || getCurrentUser()?.branchId || '' : '';
}

function getActiveBranch() {
  return state.branches.find((branch) => branch.id === getActiveBranchId()) || null;
}

function bindScannerActions() {
  const modal = document.getElementById('barcode-scanner-modal');
  const closeButton = document.getElementById('close-scanner-modal');
  const cancelButton = document.getElementById('cancel-scanner-modal');
  const disconnectPhoneButton = document.getElementById('scanner-disconnect-phone');
  document.getElementById('purchase-scan-focus').addEventListener('click', () => openScannerSelection('purchase'));

  const bindRapidScannerInput = (input, context) => {
    const buffer = { value: '', lastAt: 0 };
    input.addEventListener('keydown', (event) => {
      const key = event.key;
      if (key === 'Enter') {
        event.preventDefault();
        const value = buffer.value.trim();
        buffer.value = '';
        if (!value) return;
        if (!handleBarcode(value, context)) {
          alert('Product not found. Please search for the product manually or add the barcode to the product.');
        }
        return;
      }

      if (key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
        const now = Date.now();
        if (now - buffer.lastAt > 60) {
          buffer.value = '';
        }
        buffer.value += key;
        buffer.lastAt = now;
      }
    });
  };

  bindRapidScannerInput(purchaseBarcodeInput, 'purchase');

  document.querySelectorAll('[data-scanner-method]').forEach((button) => {
    button.addEventListener('click', async () => {
      const method = button.dataset.scannerMethod;
      if (method === 'usb') {
        updateScannerStatus('USB keyboard scanner selected: ready for HID keypad input.', 'success');
        purchaseBarcodeInput.focus();
        setTimeout(() => closeScannerSelection(), 600);
        return;
      }
      if (method === 'bluetooth') {
        await startBluetoothScanner();
        return;
      }
      if (method === 'phone') {
        await startPhoneScannerPairing();
      }
    });
  });
  closeButton.addEventListener('click', closeScannerSelection);
  cancelButton.addEventListener('click', closeScannerSelection);
  disconnectPhoneButton.addEventListener('click', disconnectPhoneScanner);
  if (modal) modal.addEventListener('click', (event) => { if (event.target === modal) closeScannerSelection(); });
}

async function startBluetoothScanner() {
  if (!('bluetooth' in navigator)) {
    updateScannerStatus('Bluetooth scanners are not supported in this browser. Use USB HID or the phone camera scanner instead.', 'warning');
    return;
  }

  try {
    const device = await navigator.bluetooth.requestDevice({
      acceptAllDevices: true,
      optionalServices: ['device_information']
    });

    if (device?.name) {
      updateScannerStatus(`Bluetooth scanner selected: ${device.name}. Browser support is limited for scanner data transfer; use USB HID or phone camera when the scanner does not expose HID services.`, 'success');
    } else {
      updateScannerStatus('Bluetooth scanner selected. Browser support is limited and many scanners require HID keyboard mode or a compatible browser/device combination.', 'warning');
    }
  } catch (error) {
    updateScannerStatus('Bluetooth pairing was cancelled, blocked, or unsupported on this device/browser. USB HID or phone camera scanning remains the reliable fallback.', 'warning');
  }
}

async function startPhoneScannerPairing() {
  scannerState.phoneConnected = false;
  scannerState.token = `LOCAL-${Date.now()}`;
  const tokenBox = document.getElementById('scanner-pairing-token');
  const phoneStatus = document.getElementById('scanner-phone-status');
  if (tokenBox) tokenBox.textContent = 'LOCAL MODE';
  if (phoneStatus) phoneStatus.textContent = 'Phone pairing is not available on GitHub Pages.';
  updateScannerStatus('GitHub Pages supports USB/browser barcode input and Bluetooth where supported. Phone-camera pairing requires a backend server.', 'warning');
}


async function disconnectPhoneScanner() {
  scannerState.phoneConnected = false;
  scannerState.token = '';
  scannerState.socket = null;
  const phoneStatus = document.getElementById('scanner-phone-status');
  if (phoneStatus) phoneStatus.textContent = 'Disconnected';
  const lastScan = document.getElementById('scanner-phone-last-scan');
  if (lastScan) lastScan.textContent = '—';
  updateScannerStatus('Phone scanner disconnected.', 'warning');
}


function bindSalesActions() {
  document.getElementById('add-sale-item').addEventListener('click', addSaleItem);
  document.getElementById('clear-sales-draft').addEventListener('click', clearSaleDraft);
  document.getElementById('complete-sale').addEventListener('click', completeSale);
  document.getElementById('pay-with-pesapal').addEventListener('click', () => {
    salesPaymentMethod.value = 'Pesapal';
    saleDraft.paymentMethod = 'Pesapal';
    renderPaymentDetails();
    completeSale();
  });
  document.getElementById('pay-with-cash').addEventListener('click', () => {
    salesPaymentMethod.value = 'Cash';
    saleDraft.paymentMethod = 'Cash';
    renderPaymentDetails();
    completeSale();
  });
  document.getElementById('confirm-return-sale').addEventListener('click', confirmReturnSale);
  document.getElementById('cancel-return-sale').addEventListener('click', closeReturnSaleModal);
  document.getElementById('print-receipt').addEventListener('click', () => {
    if (hasRole('purchase')) return;
    printReceipt();
  });
  salesProductSearch.addEventListener('input', () => selectProductFromSearch(salesProductSearch, salesProductSelect));
  document.getElementById('sales-menu-search').addEventListener('input', renderSalesMenu);
  document.getElementById('sales-menu-category').addEventListener('change', (event) => {
    salesCategory = event.target.value;
    renderSalesMenu();
  });
  document.querySelectorAll('[data-order-mode]').forEach((button) => {
    button.addEventListener('click', () => {
      salesOrderMode = button.dataset.orderMode;
      document.querySelectorAll('[data-order-mode]').forEach((option) => {
        const selected = option === button;
        option.classList.toggle('active', selected);
        option.setAttribute('aria-pressed', String(selected));
      });
      const delivery = salesOrderMode === 'delivery';
      document.getElementById('sales-requires-delivery').checked = delivery;
      document.getElementById('sales-requires-delivery').dispatchEvent(new Event('change'));
      renderSalesOrderControls();
    });
  });
  document.getElementById('orders-type-filter').addEventListener('change', renderSalesSummary);
  document.getElementById('orders-date-filter').addEventListener('change', renderSalesSummary);
  document.querySelectorAll('[data-order-status-filter]').forEach((button) => {
    button.addEventListener('click', () => {
      orderStatusFilter = button.dataset.orderStatusFilter;
      document.querySelectorAll('[data-order-status-filter]').forEach((option) => {
        const selected = option === button;
        option.classList.toggle('active', selected);
        option.setAttribute('aria-pressed', String(selected));
      });
      renderSalesSummary();
    });
  });
  salesProductSelect.addEventListener('change', () => {
    salesProductSearch.value = '';
    updateQuantityUnitLabels();
  });
  salesCustomerSelect.addEventListener('change', () => {
    saleDraft.customerId = salesCustomerSelect.value;
  });
  salesPaymentMethod.addEventListener('change', () => {
    saleDraft.paymentMethod = salesPaymentMethod.value;
    renderPaymentDetails();
  });
  document.getElementById('launch-pesapal-checkout').addEventListener('click', beginPesapalCheckout);
  document.getElementById('close-pesapal-checkout').addEventListener('click', closePesapalCheckout);
  document.getElementById('cancel-pesapal-checkout').addEventListener('click', closePesapalCheckout);
  renderPaymentDetails();
  salesCashierSelect.addEventListener('change', () => {
    saleDraft.cashierId = salesCashierSelect.value;
  });
  salesDiscountInput.addEventListener('input', (event) => {
    saleDraft.discount = Number(event.target.value || 0);
    renderSalesSummary();
  });
  document.getElementById('sales-requires-delivery').addEventListener('change', (event) => {
    document.getElementById('sales-delivery-details').hidden = !event.target.checked;
    document.getElementById('sales-delivery-address-field').hidden = !event.target.checked;
    document.getElementById('sales-delivery-fee-field').hidden = !event.target.checked;
    document.getElementById('sales-delivery-customer-name').required = event.target.checked;
    document.getElementById('sales-delivery-customer-email').required = event.target.checked;
    document.getElementById('sales-delivery-email-field').hidden = !event.target.checked;
    document.getElementById('sales-delivery-address').required = event.target.checked;
  });
  salesHistorySearch.addEventListener('input', renderSalesSummary);
}

function bindInvoiceActions() {
  invoiceSearch.addEventListener('input', renderInvoices);
  invoiceListBox.addEventListener('click', (event) => {
    const button = event.target.closest('[data-invoice-sale]');
    if (!button) return;
    const sale = getVisibleSales().find((entry) => entry.id === button.dataset.invoiceSale && entry.status === 'Completed');
    if (sale) printSalesInvoice(sale);
  });
}

function renderPaymentDetails() {
  const method = salesPaymentMethod.value;
  pesapalPaymentDetails.hidden = method !== 'Pesapal';
  mobileMoneyDetails.hidden = true;
  creditPaymentDetails.hidden = true;
  otherPaymentDetails.hidden = true;
  mobileMoneyAccountSelect.required = false;
  document.getElementById('credit-customer-name').required = false;
  document.getElementById('credit-customer-phone').required = false;
  document.getElementById('credit-due-date').required = false;
}

function bindPurchaseActions() {
  document.getElementById('add-purchase-item').addEventListener('click', addPurchaseItem);
  document.getElementById('complete-purchase').addEventListener('click', completePurchase);
  purchaseProductSelect.addEventListener('change', () => {
    const product = state.products.find((entry) => entry.id === purchaseProductSelect.value);
    updateQuantityUnitLabels();
    if (!product) return;
    purchaseSellingPriceInput.value = product.sellingPrice || 0;
    purchaseExpiryDateInput.value = product.expiryDate || '';
  });
  purchaseProductSearch.addEventListener('input', () => selectProductFromSearch(purchaseProductSearch, purchaseProductSelect));
  purchaseBarcodeInput.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    const scannedValue = purchaseBarcodeInput.value.trim();
    if (!handleBarcode(scannedValue, 'purchase')) {
      alert('Product not found. Please search for the product manually or add the barcode to the product.');
    }
    purchaseBarcodeInput.value = '';
  });
  document.getElementById('purchase-scan-focus').addEventListener('click', () => purchaseBarcodeInput.focus());
  purchaseHistorySearch.addEventListener('input', renderPurchases);
}

function bindQuotationActions() {
  document.getElementById('add-quotation-item').addEventListener('click', addQuotationItem);
  document.getElementById('clear-quotation').addEventListener('click', clearQuotationDraft);
  quotationForm.addEventListener('submit', saveQuotation);
  ['quotation-discount', 'quotation-tax'].forEach((id) => document.getElementById(id).addEventListener('input', renderQuotationDraft));
  quotationProductSelect.addEventListener('change', () => {
    const product = state.products.find((entry) => entry.id === quotationProductSelect.value);
    updateQuantityUnitLabels();
    document.getElementById('quotation-price').value = product?.sellingPrice || 0;
  });
  quotationSearch.addEventListener('input', renderQuotations);
  quotationListBox.addEventListener('click', handleQuotationAction);
}

function addQuotationItem() {
  const productId = quotationProductSelect.value;
  const qty = Number(document.getElementById('quotation-qty').value || 0);
  const price = Number(document.getElementById('quotation-price').value || 0);
  if (!productId || qty <= 0 || price < 0) {
    alert('Choose a product, quantity, and valid price.');
    return;
  }
  const product = state.products.find((entry) => entry.id === productId);
  if (!product) return;
  const existing = quotationDraft.items.find((entry) => entry.productId === productId);
  if (existing) {
    existing.qty += qty;
    existing.price = price;
    existing.total = existing.qty * price;
    existing.unit = product.unit;
  } else {
    quotationDraft.items.push({ productId, name: product.name, unit: product.unit, qty, price, total: qty * price });
  }
  renderQuotationDraft();
}

function calculateDocumentTotals(items, discount, taxRate) {
  const subtotal = items.reduce((sum, item) => sum + Number(item.total || 0), 0);
  const safeDiscount = Math.max(Number(discount || 0), 0);
  const taxable = Math.max(subtotal - safeDiscount, 0);
  const tax = taxable * Math.max(Number(taxRate || 0), 0) / 100;
  return { subtotal, discount: safeDiscount, tax, total: taxable + tax };
}

function renderQuotationDraft() {
  const totals = calculateDocumentTotals(quotationDraft.items, document.getElementById('quotation-discount').value, document.getElementById('quotation-tax').value);
  document.getElementById('quotation-subtotal').textContent = formatCurrency(totals.subtotal);
  document.getElementById('quotation-discount-total').textContent = formatCurrency(totals.discount);
  document.getElementById('quotation-tax-total').textContent = formatCurrency(totals.tax);
  document.getElementById('quotation-total').textContent = formatCurrency(totals.total);
  quotationCartBox.innerHTML = quotationDraft.items.length ? `<div class="list-header"><span>Item</span><span>Qty</span><span>Price</span><span>Total</span><span></span></div>${quotationDraft.items.map((item) => `<div class="list-row"><span>${escapeHtml(item.name)}</span><span>${item.qty} ${escapeHtml(item.unit || getProductUnit(item.productId))}</span><span>${formatCurrency(item.price)}</span><span>${formatCurrency(item.total)}</span><button class="small-btn delete" data-remove-quotation-item="${item.productId}">Remove</button></div>`).join('')}` : '<div class="empty-state">No quotation items yet.</div>';
  quotationCartBox.querySelectorAll('[data-remove-quotation-item]').forEach((button) => button.addEventListener('click', () => {
    quotationDraft.items = quotationDraft.items.filter((item) => item.productId !== button.dataset.removeQuotationItem);
    renderQuotationDraft();
  }));
}

function clearQuotationDraft() {
  quotationDraft.items = [];
  quotationDraft.editingId = '';
  quotationForm.reset();
  document.getElementById('quotation-date').value = dateISO();
  document.getElementById('quotation-expiry').value = dateISO();
  document.getElementById('quotation-tax').value = Number(state.business.taxRate || 0);
  renderQuotationDraft();
}

async function saveQuotation(event) {
  event.preventDefault();
  if (!hasRole('admin', 'sales')) return;
  const customer = state.customers.find((entry) => entry.id === quotationCustomerSelect.value);
  const date = document.getElementById('quotation-date').value;
  const expiry = document.getElementById('quotation-expiry').value;
  if (!customer || !quotationDraft.items.length || !date || !expiry || expiry < date) {
    alert('Select an existing customer, add an item, and use valid quotation dates.');
    return;
  }
  const totals = calculateDocumentTotals(quotationDraft.items, document.getElementById('quotation-discount').value, document.getElementById('quotation-tax').value);
  try {
    const existing = quotationDraft.editingId ? state.quotations.find((entry) => entry.id === quotationDraft.editingId) : null;
    const response = await apiRequest(existing ? `/quotations/${existing.id}` : '/quotations', { method: existing ? 'PATCH' : 'POST', body: JSON.stringify({ quotation_no: existing?.quotationNo || `QT-${Date.now().toString().slice(-7)}`, customer_id: customer.id, branch_id: getActiveBranchId() || null, quotation_date: date, expiry_date: expiry, notes: document.getElementById('quotation-notes').value.trim(), tax_rate: Number(document.getElementById('quotation-tax').value || 0), ...totals, items: quotationDraft.items.map((item) => ({ product_id: item.productId, quantity: item.qty, unit_price: item.price, line_total: item.total })) }) });
    await refreshServerState();
    clearQuotationDraft();
    renderAll();
  } catch (error) {
    alert(error.message || 'Quotation could not be saved.');
  }
}

function bindDisplayPreferences() {
  themeToggle.addEventListener('click', () => {
    state.preferences.darkMode = !state.preferences.darkMode;
    saveState();
    applyDisplayPreferences();
  });
  receiptPaperSize.addEventListener('change', () => {
    state.preferences.receiptPaperSize = receiptPaperSize.value;
    saveState();
  });
  applyDisplayPreferences();
}

function applyDisplayPreferences() {
  const isDark = !!state.preferences.darkMode;
  document.body.classList.toggle('dark-mode', isDark);
  themeToggle.textContent = isDark ? '☀ Light mode' : '☾ Dark mode';
  themeToggle.setAttribute('aria-pressed', String(isDark));
  receiptPaperSize.value = state.preferences.receiptPaperSize || 'thermal';
}

function bindCustomerActions() {
  const customerTypeSelect = document.getElementById('customer-type');
  const customerNameInput = document.getElementById('customer-name');
  customerTypeSelect.addEventListener('change', () => {
    const isPhysical = customerTypeSelect.value === 'Physical';
    customerNameInput.value = isPhysical ? 'Walk-in Customer' : '';
    customerNameInput.readOnly = isPhysical;
    customerNameInput.required = !isPhysical;
  });
  customerForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const id = document.getElementById('customer-id').value;
    const customerType = document.getElementById('customer-type').value;
    const customer = {
      id: id || uid('cust'),
      name: customerType === 'Physical' ? 'Walk-in Customer' : document.getElementById('customer-name').value.trim(),
      phone: document.getElementById('customer-phone').value.trim(),
      type: customerType,
      balance: Number(document.getElementById('customer-balance').value || 0),
      totalPurchases: 0
    };
    if (customerType === 'Delivery' && !customer.name) {
      alert('Customer name is required.');
      return;
    }

    try {
      const existing = state.customers.find((entry) => entry.id === customer.id);
      const response = await apiRequest(existing ? `/customers/${existing.id}` : '/customers', { method: existing ? 'PATCH' : 'POST', body: JSON.stringify({ name: customer.name, phone: customer.phone }) });
      const saved = mapCustomer(response.customer);
      if (existing) Object.assign(existing, saved, { type: customer.type, totalPurchases: existing.totalPurchases });
      else state.customers.push(saved);
      customerForm.reset();
      renderAll();
    } catch (error) {
      alert(error.message || 'Customer could not be saved.');
    }
  });

  document.getElementById('reset-customer-form').addEventListener('click', () => {
    customerForm.reset();
    document.getElementById('customer-id').value = '';
    customerTypeSelect.value = 'Physical';
    customerNameInput.value = 'Walk-in Customer';
    customerNameInput.readOnly = true;
    customerNameInput.required = false;
  });

  customerSearch.addEventListener('input', renderCustomers);
  creditSearch.addEventListener('input', renderCustomers);
  customerTypeSelect.dispatchEvent(new Event('change'));
}

function bindAdminSettingsActions() {
  businessLogoInput.addEventListener('change', () => {
    const file = businessLogoInput.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please choose an image file for the business logo.');
      businessLogoInput.value = '';
      return;
    }
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      businessLogoInput.dataset.logoData = reader.result;
      businessLogoPreview.src = reader.result;
      businessLogoPreview.hidden = false;
    });
    reader.readAsDataURL(file);
  });
  document.getElementById('payment-settings-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!hasRole('admin', 'owner')) return;
    try {
      const response = await apiRequest('/payments/config', {
        method: 'PATCH',
        body: JSON.stringify({
          pesapalEnvironment: document.getElementById('setting-pesapal-environment').value,
          receiptNotes: document.getElementById('setting-receipt-notes').value.trim()
        })
      });
      state.paymentConfig = response;
      renderAdminSettings();
      renderPaymentSummary();
      alert('Pesapal payment settings saved.');
    } catch (error) {
      alert(error.message || 'Pesapal payment settings could not be saved.');
    }
  });
  mobileMoneyAccountForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!hasRole('admin', 'owner')) return;
    const id = document.getElementById('mobile-money-account-id').value;
    const account = {
      id: id || uid('mm'),
      network: document.getElementById('mobile-money-account-network').value,
      name: document.getElementById('mobile-money-account-name').value.trim(),
      phone: document.getElementById('mobile-money-account-phone').value.trim(),
      description: document.getElementById('mobile-money-account-description').value.trim(),
      status: document.getElementById('mobile-money-account-status').value,
      branchId: state.business.multiBranches ? mobileMoneyAccountBranch.value : ''
    };
    if (!account.name || !/^0[0-9 ()+-]{8,}$/.test(account.phone)) {
      alert('Enter an account name and valid Mobile Money phone number.');
      return;
    }
    try {
      const existing = state.mobileMoneyAccounts.find((entry) => entry.id === id);
      const payload = { network: account.network, recipient_name: account.name, phone: account.phone, description: account.description, branch_id: account.branchId || null, active: account.status === 'Active' };
      const response = await apiRequest(existing ? `/mobile-money/accounts/${existing.id}` : '/mobile-money/accounts', { method: existing ? 'PATCH' : 'POST', body: JSON.stringify(payload) });
      const saved = response.account;
      const mapped = { id: saved.id, network: saved.network, name: saved.recipient_name, phone: saved.phone, description: saved.description || '', status: saved.active ? 'Active' : 'Inactive', branchId: saved.branch_id || '' };
      if (existing) Object.assign(existing, mapped);
      else state.mobileMoneyAccounts.push(mapped);
      resetMobileMoneyAccountForm();
      renderAll();
    } catch (error) {
      alert(error.message || 'Mobile Money account could not be saved.');
    }
  });
  document.getElementById('reset-mobile-money-account').addEventListener('click', resetMobileMoneyAccountForm);
  mobileMoneyAccountList.addEventListener('click', (event) => {
    const edit = event.target.closest('[data-edit-mobile-money]');
    const toggle = event.target.closest('[data-toggle-mobile-money]');
    const remove = event.target.closest('[data-delete-mobile-money]');
    const id = edit?.dataset.editMobileMoney || toggle?.dataset.toggleMobileMoney || remove?.dataset.deleteMobileMoney;
    const account = state.mobileMoneyAccounts.find((entry) => entry.id === id);
    if (!account) return;
    if (edit) {
      document.getElementById('mobile-money-account-id').value = account.id;
      document.getElementById('mobile-money-account-network').value = account.network;
      document.getElementById('mobile-money-account-name').value = account.name;
      document.getElementById('mobile-money-account-phone').value = account.phone;
      document.getElementById('mobile-money-account-description').value = account.description || '';
      document.getElementById('mobile-money-account-status').value = account.status;
      mobileMoneyAccountBranch.value = account.branchId || '';
    } else if (toggle) {
      apiRequest(`/mobile-money/accounts/${account.id}`, { method: 'PATCH', body: JSON.stringify({ active: account.status !== 'Active' }) }).then((response) => {
        Object.assign(account, { status: response.account.active ? 'Active' : 'Inactive' });
        renderAll();
      }).catch((error) => alert(error.message || 'Mobile Money account could not be updated.'));
    } else if (remove && confirm(`Delete the ${account.network} receiving account?`)) {
      apiRequest(`/mobile-money/accounts/${account.id}`, { method: 'DELETE' }).then(() => {
        state.mobileMoneyAccounts = state.mobileMoneyAccounts.filter((entry) => entry.id !== account.id);
        renderAll();
      }).catch((error) => alert(error.message || 'Mobile Money account could not be deactivated.'));
    }
  });
  businessSettingsForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!hasRole('admin', 'owner')) return;
    const payload = {
      name: document.getElementById('business-name').value.trim(),
      phone: document.getElementById('business-phone').value.trim(),
      email: document.getElementById('business-email').value.trim(),
      address: document.getElementById('business-address').value.trim(),
      logo: businessLogoInput.dataset.logoData || state.business.logo || '',
      country: document.getElementById('business-country').value.trim(),
      currency: document.getElementById('business-currency').value.trim().toUpperCase(),
      tax_rate: Number(document.getElementById('business-tax-rate').value || 0),
      multi_branch: document.getElementById('business-multi-branch').value === 'true',
      opening_balance: Number(document.getElementById('business-opening-balance').value || 0),
      financial_year_start: document.getElementById('business-financial-year').value || null
    };
    try {
      const result = await apiRequest('/business', { method: 'PATCH', body: JSON.stringify(payload) });
      state.business = { ...state.business, ...mapBusiness(result.business) };
      saveState();
      applyBranchVisibility();
      renderAdminSettings();
      renderAccounts();
      alert('Business details saved.');
    } catch (error) {
      alert(error.message || 'Business details could not be saved.');
    }
  });

  staffAccountForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!hasRole('admin', 'owner')) return;
    const id = document.getElementById('staff-id').value;
    const username = document.getElementById('staff-username').value.trim();
    const existing = state.users.find((user) => user.id === id);
    const password = document.getElementById('staff-password').value;
    if (!username || (!existing && !password)) {
      alert('Username and password are required for a new account.');
      return;
    }
    if (state.users.some((user) => user.id !== id && user.username.toLowerCase() === username.toLowerCase())) {
      alert('That username is already registered.');
      return;
    }
    const account = {
      id: id || uid('user'),
      username,
      password,
      displayName: document.getElementById('staff-name').value.trim(),
      role: document.getElementById('staff-role').value,
      phone: document.getElementById('staff-phone').value.trim(),
      email: document.getElementById('staff-email').value.trim(),
      address: document.getElementById('staff-address').value.trim(),
      branchId: state.business.multiBranches ? document.getElementById('staff-branch').value : ''
    };
    if (!account.displayName) {
      alert('Full name is required.');
      return;
    }
    try {
      const response = await apiRequest(existing ? `/users/${existing.id}` : '/users', { method: existing ? 'PATCH' : 'POST', body: JSON.stringify({ username: account.username, password: account.password || undefined, display_name: account.displayName, role: account.role, phone: account.phone, email: account.email, address: account.address, branch_id: account.branchId || null }) });
      const saved = mapUser(response.user);
      if (existing) Object.assign(existing, saved);
      else state.users.push(saved);
      resetStaffForm();
      renderAll();
      alert(existing ? 'Account details updated.' : 'Staff account registered.');
    } catch (error) {
      alert(error.message || 'Staff account could not be saved.');
    }
  });

  document.getElementById('reset-staff-form').addEventListener('click', resetStaffForm);
  staffSearch.addEventListener('input', renderAdminSettings);
  staffAccountList.addEventListener('click', (event) => {
    const editButton = event.target.closest('[data-edit-user]');
    const deleteButton = event.target.closest('[data-delete-user]');
    if (editButton) editStaffAccount(editButton.dataset.editUser);
    if (deleteButton) deleteStaffAccount(deleteButton.dataset.deleteUser);
  });
}

function resetMobileMoneyAccountForm() {
  mobileMoneyAccountForm.reset();
  document.getElementById('mobile-money-account-id').value = '';
  document.getElementById('mobile-money-account-status').value = 'Active';
  mobileMoneyAccountBranch.value = '';
}

function bindBranchActions() {
  currentBranchSelect.addEventListener('change', async () => {
    state.preferences.currentBranchId = currentBranchSelect.value;
    saveState();
    try {
      await refreshServerState();
    } catch (error) {
      alert(error.message || 'Branch data could not be refreshed.');
      return;
    }
    renderAll();
  });
  branchForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!hasRole('admin', 'owner')) return;
    const id = document.getElementById('branch-id').value;
    const branch = {
      id: id || uid('branch'),
      name: document.getElementById('branch-name').value.trim(),
      phone: document.getElementById('branch-phone').value.trim(),
      address: document.getElementById('branch-address').value.trim(),
      managerId: branchManagerSelect.value,
      active: document.getElementById('branch-active').checked
    };
    if (!branch.name || !branch.address) {
      alert('Branch name and address are required.');
      return;
    }
    try {
      const existing = state.branches.find((entry) => entry.id === id);
      const response = await apiRequest(existing ? `/branches/${existing.id}` : '/branches', { method: existing ? 'PATCH' : 'POST', body: JSON.stringify({ name: branch.name, phone: branch.phone, address: branch.address, active: branch.active }) });
      const saved = response.branch;
      if (existing) Object.assign(existing, saved);
      else state.branches.push(saved);
      if (!state.preferences.currentBranchId) state.preferences.currentBranchId = saved.id;
      resetBranchForm();
      renderAll();
    } catch (error) {
      alert(error.message || 'Branch could not be saved.');
    }
  });
  document.getElementById('reset-branch').addEventListener('click', resetBranchForm);
  branchSearch.addEventListener('input', renderBranches);
  stockTransferForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!hasRole('admin', 'owner')) return;
    const fromBranchId = document.getElementById('transfer-from').value;
    const toBranchId = document.getElementById('transfer-to').value;
    const productId = document.getElementById('transfer-product').value;
    const quantity = Number(document.getElementById('transfer-qty').value || 0);
    if (!fromBranchId || !toBranchId || fromBranchId === toBranchId || !productId || quantity <= 0) {
      alert('Choose different source and destination branches, a product, and a valid quantity.');
      return;
    }
    try {
      await apiRequest('/stock-transfers', { method: 'POST', body: JSON.stringify({ from_branch_id: fromBranchId, to_branch_id: toBranchId, items: [{ product_id: productId, quantity }] }) });
      await refreshServerState();
      renderBranches();
    } catch (error) {
      alert(error.message || 'Stock transfer could not be completed. No stock was changed.');
    }
  });
}

function resetBranchForm() {
  branchForm.reset();
  document.getElementById('branch-id').value = '';
  document.getElementById('branch-active').checked = true;
}

function resetStaffForm() {
  staffAccountForm.reset();
  document.getElementById('staff-id').value = '';
  document.getElementById('staff-password').required = true;
  document.getElementById('staff-submit-button').textContent = 'Register Staff Account';
}

function editStaffAccount(userId) {
  const user = state.users.find((entry) => entry.id === userId);
  if (!user) return;
  document.getElementById('staff-id').value = user.id;
  document.getElementById('staff-name').value = user.displayName || '';
  document.getElementById('staff-username').value = user.username || '';
  document.getElementById('staff-password').value = '';
  document.getElementById('staff-password').required = false;
  document.getElementById('staff-role').value = user.role || 'sales';
  document.getElementById('staff-phone').value = user.phone || '';
  document.getElementById('staff-email').value = user.email || '';
  document.getElementById('staff-address').value = user.address || '';
  document.getElementById('staff-branch').value = user.branchId || '';
  document.getElementById('staff-submit-button').textContent = 'Update Account';
  document.getElementById('staff-name').focus();
}

async function deleteStaffAccount(userId) {
  const user = state.users.find((entry) => entry.id === userId);
  if (!user) return;
  if (user.id === state.session.userId) {
    alert('You cannot delete the account you are currently using.');
    return;
  }
  if (user.role === 'admin' && state.users.filter((entry) => entry.role === 'admin').length === 1) {
    alert('At least one administrator account must remain.');
    return;
  }
  if (!confirm(`Delete the account for ${user.displayName}?`)) return;
  try {
    await apiRequest(`/users/${userId}`, { method: 'DELETE' });
    state.users = state.users.filter((entry) => entry.id !== userId);
    renderAll();
  } catch (error) {
    alert(error.message || 'Staff account could not be deactivated.');
  }
}

function bindVendorActions() {
  vendorForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const id = document.getElementById('vendor-id').value;
    const vendor = {
      id: id || uid('vend'),
      name: document.getElementById('vendor-name').value.trim(),
      phone: document.getElementById('vendor-phone').value.trim(),
      email: document.getElementById('vendor-email').value.trim(),
      products: document.getElementById('vendor-products').value.trim(),
      amountOwed: Number(document.getElementById('vendor-owed').value || 0)
    };
    if (!vendor.name) {
      alert('Vendor name is required.');
      return;
    }

    try {
      const existing = state.vendors.find((entry) => entry.id === vendor.id);
      if (backendToken) {
        const response = await apiRequest(existing ? `/suppliers/${existing.id}` : '/suppliers', { method: existing ? 'PATCH' : 'POST', body: JSON.stringify({ name: vendor.name, phone: vendor.phone, email: vendor.email }) });
        Object.assign(vendor, mapVendor(response.supplier));
      }
      if (existing) Object.assign(existing, vendor);
      else state.vendors.push(vendor);
      vendorForm.reset();
      document.getElementById('vendor-id').value = '';
      document.getElementById('supplier-modal').hidden = true;
      renderAll();
    } catch (error) {
      alert(error.message || 'Supplier could not be saved.');
    }
  });

  document.getElementById('reset-vendor-form').addEventListener('click', () => {
    vendorForm.reset();
    document.getElementById('vendor-id').value = '';
  });

  document.getElementById('open-supplier-form').addEventListener('click', () => {
    vendorForm.reset();
    document.getElementById('vendor-id').value = '';
    document.getElementById('supplier-modal-title').textContent = 'Add Supplier';
    document.getElementById('supplier-modal').hidden = false;
  });
  const supplierModal = document.getElementById('supplier-modal');
  const closeSupplierModal = () => { supplierModal.hidden = true; };
  document.getElementById('close-supplier-form').addEventListener('click', closeSupplierModal);
  document.getElementById('cancel-supplier-form').addEventListener('click', closeSupplierModal);
  supplierModal.addEventListener('click', (event) => { if (event.target === supplierModal) closeSupplierModal(); });

  vendorSearch.addEventListener('input', renderVendors);
}

function bindInventoryActions() {
  const tabItemsBtn = document.getElementById('menu-tab-items');
  const tabCatBtn = document.getElementById('menu-tab-categories');
  if (tabItemsBtn) {
    tabItemsBtn.addEventListener('click', () => {
      switchMenuTab('items');
      renderMenuCatalog();
    });
  }
  if (tabCatBtn) {
    tabCatBtn.addEventListener('click', () => {
      switchMenuTab('categories');
      renderMenuCatalog();
    });
  }

  const addCategoryBtn = document.getElementById('menu-add-category-btn');
  if (addCategoryBtn) {
    addCategoryBtn.addEventListener('click', () => {
      if (!hasRole('admin', 'purchase')) return;
      const catName = prompt('Enter new category name:');
      if (!catName || !catName.trim()) return;
      productForm.reset();
      setProductFormContext('menu');
      setProductImagePreview('');
      document.getElementById('product-id').value = '';
      document.getElementById('product-category').value = catName.trim();
      document.getElementById('product-unit').value = 'piece';
      document.getElementById('menu-item-modal-title').textContent = `Add Menu Item to ${catName.trim()}`;
      updateQuantityUnitLabels();
      openMenuItemModal();
    });
  }

  document.querySelectorAll('[data-menu-filter]').forEach((button) => {
    button.addEventListener('click', () => {
      menuFilter = button.dataset.menuFilter;
      renderMenuCatalog();
    });
  });

  document.querySelectorAll('[data-inventory-filter]').forEach((button) => {
    button.addEventListener('click', () => {
      inventoryFilter = button.dataset.inventoryFilter;
      renderInventory();
    });
  });

  document.getElementById('menu-add-item').addEventListener('click', () => {
    if (!hasRole('admin', 'purchase')) return;
    productForm.reset();
    setProductFormContext('menu');
    setProductImagePreview('');
    document.getElementById('product-id').value = '';
    if (selectedMenuCategory && selectedMenuCategory !== '*') {
      document.getElementById('product-category').value =
        getMenuCategoryGroups().find((category) => category.key === selectedMenuCategory)?.label || selectedMenuCategory;
    }
    const imgInput = document.getElementById('product-image-url');
    if (imgInput) imgInput.value = '';
    document.getElementById('product-unit').value = 'piece';
    document.getElementById('menu-item-modal-title').textContent = 'Add Menu Item';
    updateQuantityUnitLabels();
    openMenuItemModal();
  });

  const menuItemModal = document.getElementById('menu-item-modal');
  const closeMenuItemModal = () => { menuItemModal.hidden = true; };
  document.getElementById('menu-item-modal-close').addEventListener('click', closeMenuItemModal);
  document.getElementById('cancel-menu-item').addEventListener('click', closeMenuItemModal);
  menuItemModal.addEventListener('click', (event) => {
    if (event.target === menuItemModal) closeMenuItemModal();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !menuItemModal.hidden) closeMenuItemModal();
  });

  productForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!hasRole('admin', 'purchase')) {
      alert('Your account can view inventory only.');
      return;
    }
    const id = document.getElementById('product-id').value;
    const existing = state.products.find((entry) => entry.id === id);
    const imgInput = document.getElementById('product-image-url');
    const imageFileInput = document.getElementById('product-image-file');
    let imageUrl = '';
    if (productFormContext === 'menu') {
      const file = imageFileInput.files[0];
      if (file) {
        if (!file.type.startsWith('image/')) {
          alert('Choose a valid image file.');
          return;
        }
        if (file.size > 1024 * 1024) {
          alert('Menu images must be 1 MB or smaller.');
          return;
        }
        try {
          imageUrl = await readFileAsDataUrl(file);
        } catch (error) {
          alert('The selected menu image could not be read.');
          return;
        }
      } else {
        imageUrl = existing?.imageUrl || '';
      }
    } else {
      imageUrl = imgInput ? imgInput.value.trim() : '';
      if (!imageUrl && existing?.imageUrl?.startsWith('data:image/')) imageUrl = existing.imageUrl;
    }
    const product = {
      id: id || uid('prod'),
      name: document.getElementById('product-name').value.trim(),
      category: document.getElementById('product-category').value.trim(),
      imageUrl,
      sku: document.getElementById('product-sku').value.trim(),
      barcode: productFormContext === 'menu' && existing ? existing.barcode : document.getElementById('product-barcode').value.trim(),
      unit: document.getElementById('product-unit').value.trim(),
      buyingPrice: productFormContext === 'menu' && existing ? existing.buyingPrice : Number(document.getElementById('product-buying-price').value || 0),
      sellingPrice: Number(document.getElementById('product-selling-price').value || 0),
      stock: Number(document.getElementById('product-stock').value || 0),
      lowStockThreshold: productFormContext === 'menu' && existing ? existing.lowStockThreshold : Number(document.getElementById('product-low-stock').value || 0),
      expiryDate: document.getElementById('product-expiry-date').value
    };
    if (!product.name) {
      alert('Product name is required.');
      return;
    }
    if (!product.unit) {
      alert('Unit of measure is required.');
      return;
    }

    const normalizedBarcode = product.barcode.toLowerCase();
    if (normalizedBarcode) {
      const duplicate = state.products.find((entry) => {
        if (entry.id === product.id || String(entry.barcode || '').trim().toLowerCase() !== normalizedBarcode) return false;
        if (!state.business.multiBranches) return true;
        return (entry.branchId || '') === getActiveBranchId();
      });
      if (duplicate) {
        alert('This barcode is already assigned to another product.');
        return;
      }
    }
    try {
      if (!backendToken) {
        if (existing) {
          Object.assign(existing, product);
        } else {
          state.products.push(product);
        }
        saveState();
        productForm.reset();
        setProductImagePreview('');
        closeMenuItemModal();
        renderAll();
        return;
      }
      const payload = { name: product.name, category: product.category, image_url: product.imageUrl || null, sku: product.sku || null, barcode: product.barcode || null, unit: product.unit, cost_price: product.buyingPrice, selling_price: product.sellingPrice, minimum_stock: product.lowStockThreshold, stock: existing ? undefined : product.stock, branch_id: getActiveBranchId() || undefined };
      const response = await apiRequest(existing ? `/products/${existing.id}` : '/products', { method: existing ? 'PATCH' : 'POST', body: JSON.stringify(payload) });
      await refreshServerState();
      productForm.reset();
      setProductImagePreview('');
      closeMenuItemModal();
      renderAll();
    } catch (error) {
      alert(error.message || 'Product could not be saved.');
    }
  });

  document.getElementById('reset-product-form').addEventListener('click', () => {
    productForm.reset();
    document.getElementById('product-id').value = '';
    setProductImagePreview('');
    const imgEl = document.getElementById('product-image-url');
    if (imgEl) imgEl.value = '';
    document.getElementById('product-unit').value = 'piece';
    updateQuantityUnitLabels();
  });
  document.getElementById('product-image-file').addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file) {
      const existing = state.products.find((entry) => entry.id === document.getElementById('product-id').value);
      setProductImagePreview(existing?.imageUrl || '');
      return;
    }
    if (!file.type.startsWith('image/')) {
      event.target.value = '';
      setProductImagePreview('');
      alert('Choose a valid image file.');
      return;
    }
    if (file.size > 1024 * 1024) {
      event.target.value = '';
      setProductImagePreview('');
      alert('Menu images must be 1 MB or smaller.');
      return;
    }
    setProductImagePreview(URL.createObjectURL(file));
  });
  document.getElementById('product-unit').addEventListener('input', updateQuantityUnitLabels);
  document.getElementById('view-low-stock').addEventListener('click', () => {
    menuFilter = 'low';
    renderMenuCatalog();
  });
  menuProductSearch.addEventListener('input', async () => {
    if (!backendToken) return renderMenuCatalog();
    try {
      const branchId = getActiveBranchId();
      const query = new URLSearchParams({ q: menuProductSearch.value.trim() });
      if (branchId) query.set('branch_id', branchId);
      const result = await apiRequest(`/products?${query}`);
      state.products = (result.products || []).map(mapProduct);
      renderMenuCatalog();
    } catch (error) {
      alert(error.message || 'Products could not be searched.');
    }
  });
  inventoryProductSearch.addEventListener('input', async () => {
    if (!backendToken) return renderInventory();
    try {
      const branchId = getActiveBranchId();
      const query = new URLSearchParams({ q: inventoryProductSearch.value.trim() });
      if (branchId) query.set('branch_id', branchId);
      const result = await apiRequest(`/products?${query}`);
      state.products = (result.products || []).map(mapProduct);
      renderInventory();
    } catch (error) {
      alert(error.message || 'Products could not be searched.');
    }
  });
}

function bindAccountActions() {
  expenseForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const item = {
      id: uid('exp'),
      businessId: state.business.id || 'business-local',
      branchId: getActiveBranchId(),
      name: document.getElementById('expense-name').value.trim(),
      amount: Number(document.getElementById('expense-amount').value || 0),
      date: document.getElementById('expense-date').value || dateISO(),
      description: document.getElementById('expense-description').value.trim()
    };
    if (!item.name || item.amount <= 0) {
      alert('Please provide a valid expense name and amount.');
      return;
    }
    try {
      const response = await apiRequest('/expenses', { method: 'POST', body: JSON.stringify({ name: item.name, amount: item.amount, description: item.description, expense_date: item.date }) });
      state.expenses.push(mapExpense(response.expense));
        await refreshServerSummary();
      expenseForm.reset();
      renderAccounts();
    } catch (error) {
      alert(error.message || 'Expense could not be saved.');
    }
  });

  paymentForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const item = {
      id: uid('pay'),
      businessId: state.business.id || 'business-local',
      branchId: getActiveBranchId(),
      type: document.getElementById('payment-type').value,
      label: document.getElementById('payment-label').value.trim(),
      amount: Number(document.getElementById('payment-amount').value || 0),
      date: document.getElementById('payment-date').value || dateISO()
    };
    if (!item.label || item.amount <= 0) {
      alert('Please provide a valid payment label and amount.');
      return;
    }
    try {
      const response = await apiRequest('/payments', { method: 'POST', body: JSON.stringify({ method: 'Cash', type: item.type, label: item.label, amount: item.amount, date: item.date }) });
      state.payments.push(mapPayment(response.payment));
        await refreshServerSummary();
      paymentForm.reset();
      renderAccounts();
    } catch (error) {
      alert(error.message || 'Payment could not be saved.');
    }
  });

  [reportType, reportFrom, reportTo].forEach((control) => control.addEventListener('input', renderTransactionReport));
  expenseSearch.addEventListener('input', renderAccounts);
  document.getElementById('print-report').addEventListener('click', printTransactionReport);
}

function bindDeliveryActions() {
  [deliveryFilterDate, deliveryFilterStatus, deliveryFilterDriver, deliveryFilterCustomer].forEach((control) => {
    const handleFilterChange = () => {
      deliverySummaryFilter = '';
      renderDeliveries();
    };
    control.addEventListener('input', handleFilterChange);
    control.addEventListener('change', handleFilterChange);
  });
  deliveryListBox.addEventListener('click', (event) => {
    const actionButton = event.target.closest('[data-delivery-action]');
    if (!actionButton) return;
    handleDeliveryAction(actionButton.dataset.deliveryAction, actionButton.dataset.deliveryId);
  });
  document.getElementById('delivery-modal-cancel').addEventListener('click', closeDeliveryModal);
  deliveryModalForm.addEventListener('submit', submitDeliveryModal);
  deliveryModalFields.addEventListener('change', (event) => {
    if (event.target.id === 'delivery-failure-reason') {
      const descriptionField = document.getElementById('delivery-failure-description-field');
      const descriptionInput = document.getElementById('delivery-failure-description');
      const requiresDescription = event.target.value === 'Other';
      descriptionField.hidden = !requiresDescription;
      descriptionInput.required = requiresDescription;
    }
  });
}

function bindHistoryActions() {
  historyYearSelect.addEventListener('change', () => {
    historyView.year = Number(historyYearSelect.value);
    historyView.day = 1;
    renderHistoryCalendar();
  });

  historyMonthSelect.addEventListener('change', () => {
    historyView.month = Number(historyMonthSelect.value);
    historyView.day = 1;
    renderHistoryCalendar();
  });

  document.getElementById('history-today').addEventListener('click', () => {
    const today = new Date();
    historyView.year = today.getFullYear();
    historyView.month = today.getMonth();
    historyView.day = today.getDate();
    renderHistoryCalendar();
  });

  historyCalendar.addEventListener('click', (event) => {
    const dayButton = event.target.closest('[data-history-day]');
    if (!dayButton) return;
    historyView.day = Number(dayButton.dataset.historyDay);
    renderHistoryCalendar();
  });
}

function addSaleItem() {
  const searchValue = salesProductSearch.value.trim();
  const searchedProduct = searchValue ? findProductFromSearchValue(searchValue) : null;
  const productId = searchedProduct?.id || (searchValue ? '' : salesProductSelect.value);
  const qty = 1;
  if (!productId) {
    alert(searchValue && !searchedProduct
      ? 'Select a product from the search suggestions or product list.'
      : 'Choose a menu item.');
    return;
  }

  const product = state.products.find((entry) => entry.id === productId);
  if (!product) {
    alert('That product is no longer available. Refresh the product list and try again.');
    return;
  }

  if (qty > Number(product.stock)) {
    alert(`Only ${product.stock} ${product.unit || 'piece'} available for ${product.name}.`);
    return;
  }

  const existing = saleDraft.items.find((entry) => entry.productId === productId);
  if (existing) {
    existing.qty += qty;
    existing.total = existing.qty * product.sellingPrice;
    existing.unit = product.unit || 'piece';
  } else {
    saleDraft.items.push({
      productId: product.id,
      name: product.name,
      unit: product.unit || 'piece',
      qty,
      price: product.sellingPrice,
      total: product.sellingPrice * qty
    });
  }

  salesProductSelect.value = product.id;
  saleDraft.customerId = salesCustomerSelect.value || state.customers[0]?.id || '';
  saleDraft.paymentMethod = salesPaymentMethod.value;
  renderSalesSummary();
}

function clearSaleDraft() {
  saleDraft.items = [];
  saleDraft.customerId = salesCustomerSelect.value || state.customers[0]?.id || '';
  saleDraft.discount = 0;
  saleDraft.taxRate = 0;
  salesDiscountInput.value = '0';
  document.getElementById('mobile-money-payer-name').value = '';
  document.getElementById('mobile-money-payer-phone').value = '';
  document.getElementById('mobile-money-reference').value = '';
  document.getElementById('mobile-money-notes').value = '';
  document.getElementById('other-payment-reference').value = '';
  document.getElementById('credit-customer-name').value = '';
  document.getElementById('credit-customer-phone').value = '';
  document.getElementById('credit-limit').value = '';
  document.getElementById('credit-due-date').value = '';
  document.getElementById('credit-notes').value = '';
  document.getElementById('sales-requires-delivery').checked = false;
  document.getElementById('sales-delivery-details').hidden = true;
  document.getElementById('sales-delivery-email-field').hidden = true;
  document.getElementById('sales-delivery-address-field').hidden = true;
  document.getElementById('sales-delivery-fee-field').hidden = true;
  document.getElementById('sales-delivery-customer-name').required = false;
  document.getElementById('sales-delivery-customer-email').required = false;
  document.getElementById('sales-delivery-customer-name').value = '';
  document.getElementById('sales-delivery-customer-email').value = '';
  document.getElementById('sales-delivery-address').required = false;
  document.getElementById('sales-delivery-address').value = '';
  document.getElementById('sales-delivery-fee').value = '0';
  document.getElementById('pesapal-customer-phone').value = '';
  renderSalesOrderControls();
  renderSalesSummary();
}

async function completeSale() {
  if (pendingPesapalSale) {
    document.getElementById('pesapal-checkout-modal').hidden = false;
    return;
  }
  if (!hasRole('admin', 'sales')) {
    alert('Your account can view sales but cannot record sales.');
    return;
  }
  if (!saleDraft.items.length) {
    alert('Add at least one item to the sale.');
    return;
  }

  const { subtotal, discount, taxRate, tax, total } = getSaleDraftTotals();
  if (!Number.isFinite(total) || total <= 0) {
    alert('Sale total must be greater than zero.');
    return;
  }
  if (!['Cash', 'Pesapal'].includes(salesPaymentMethod.value)) {
    alert('Choose Cash or Pesapal for this sale.');
    return;
  }
  const requiresDelivery = document.getElementById('sales-requires-delivery').checked;
  const deliveryCustomerName = document.getElementById('sales-delivery-customer-name').value.trim();
  const deliveryCustomerEmail = document.getElementById('sales-delivery-customer-email').value.trim();
  const deliveryAddress = document.getElementById('sales-delivery-address').value.trim();
  const deliveryFee = Number(document.getElementById('sales-delivery-fee').value || 0);
  const paymentDetails = getPaymentDetails(total);
  if (!paymentDetails) return;
  if (requiresDelivery && (!deliveryCustomerName || !deliveryAddress)) {
    alert('Delivery customer name and address are required for a delivery sale.');
    return;
  }
  if (requiresDelivery && !deliveryCustomerEmail) {
    alert('A customer email is required so the delivery code and order details can be sent.');
    return;
  }
  const customer = requiresDelivery
    ? await findOrCreateDeliveryCustomer(deliveryCustomerName, deliveryCustomerEmail)
    : state.customers.find((entry) => entry.id === saleDraft.customerId)
      || state.customers.find((entry) => entry.id === 'cust-1')
      || state.customers[0]
      || { id: null, name: 'Walk-in Guest', phone: '', totalPurchases: 0 };
  const unavailableItem = saleDraft.items.find((item) => item.qty > Number(state.products.find((product) => product.id === item.productId)?.stock || 0));
  if (unavailableItem) {
    alert(`Insufficient stock for ${unavailableItem.name}.`);
    return;
  }
  const cashier = state.users.find((entry) => entry.id === salesCashierSelect.value) || getCurrentUser();
  const sale = {
    id: uid('sale'),
    businessId: state.business.id || 'business-local',
    branchId: getActiveBranchId(),
    createdAt: new Date().toISOString(),
    customerId: customer.id,
    customerName: customer.name,
    customerType: requiresDelivery ? 'Delivery' : 'Physical',
    cashierId: cashier.id,
    cashierName: cashier.displayName,
    items: saleDraft.items.map((item) => ({ ...item })),
    subtotal,
    discount,
    taxRate,
    tax,
    total,
    paymentMethod: saleDraft.paymentMethod,
    paymentDetails,
    status: 'Completed',
    orderType: requiresDelivery ? 'delivery' : salesOrderMode === 'takeaway' ? 'takeaway' : 'dine-in',
    receiptNo: `POS-${Date.now().toString().slice(-6)}`,
    requiresDelivery,
    deliveryAddress: requiresDelivery ? deliveryAddress : '',
    deliveryFee: requiresDelivery ? deliveryFee : 0,
    customerEmail: requiresDelivery ? deliveryCustomerEmail : ''
  };

  if (sale.paymentMethod === 'Pesapal') {
    const modal = document.getElementById('pesapal-checkout-modal');
    document.getElementById('pesapal-checkout-total').textContent = formatCurrency(sale.total);
    document.getElementById('pesapal-checkout-phone').value =
      document.getElementById('pesapal-customer-phone').value.trim() || customer.phone || '';
    setPesapalCheckoutStatus('Ready to start a secure Pesapal checkout.', 'info');
    document.getElementById('pesapal-checkout-link').hidden = true;
    document.getElementById('launch-pesapal-checkout').disabled = false;
    document.getElementById('launch-pesapal-checkout').hidden = false;
    pendingPesapalSale = {
      sale,
      quotationId: document.getElementById('complete-sale').dataset.quotationId || ''
    };
    modal.hidden = false;
    return;
  }

  const amountReceived = paymentDetails.amountReceived;
  const saleItems = sale.items;
  try {
    const response = await apiRequest('/sales', { method: 'POST', body: JSON.stringify({
      receipt_no: sale.receiptNo,
      customer_id: customer.id,
      cashier_id: cashier.id,
      branch_id: getActiveBranchId() || null,
      order_type: sale.orderType,
      items: sale.items.map((item) => ({ product_id: item.productId, quantity: item.qty, unit_price: item.price, discount: 0, tax: 0, line_total: item.total })),
      subtotal, discount, tax, payment_method: 'Cash',
      amount_received: amountReceived,
      payment_details: paymentDetails,
      quotation_id: document.getElementById('complete-sale').dataset.quotationId || null
    }) });
    sale.id = response.sale.id;
    sale.createdAt = response.sale.created_at;
    sale.receiptNo = response.sale.receipt_no;
    sale.subtotal = Number(response.sale.subtotal);
    sale.discount = Number(response.sale.discount);
    sale.tax = Number(response.sale.tax);
    sale.total = Number(response.sale.total);
    sale.items = response.sale.items || sale.items;
    saleItems.forEach((item) => {
      const product = state.products.find((entry) => entry.id === item.productId);
      if (product) product.stock = Math.max(product.stock - item.qty, 0);
    });
    sale.paymentDetails = {
      amountReceived,
      change: amountReceived - sale.total,
      transactionReference: `CASH-${sale.receiptNo}`
    };
    customer.totalPurchases = Number(customer.totalPurchases || 0) + sale.total;
    state.sales.unshift(sale);
  } catch (error) {
    if (error.status !== 401) {
      alert(error.message || 'Sale could not be completed. No stock or payment was saved.');
    }
    return;
  }
  try {
    await refreshServerSummary();
  } catch (error) {
    alert(`Sale ${sale.receiptNo} was recorded, but the dashboard summary could not be refreshed: ${error.message}`);
  }
  const quotationId = document.getElementById('complete-sale').dataset.quotationId;
  if (quotationId) {
    const quotation = state.quotations.find((entry) => entry.id === quotationId);
    if (quotation) {
      quotation.convertedSaleId = sale.id;
      quotation.status = 'Accepted';
    }
    delete document.getElementById('complete-sale').dataset.quotationId;
  }
  if (requiresDelivery) await createDeliveryFromSale(sale, customer);
  lastReceiptText = buildReceiptText(sale);
  lastReceiptSale = sale;
  receiptPreview.textContent = lastReceiptText;
  clearSaleDraft();
  renderAll();
  renderDashboard();
  showCompletedReceipt();
}

function showCompletedReceipt() {
  if (!document.getElementById('sales').classList.contains('active')) {
    showSection('sales', 'New Order');
  }
  closeMobileMenu();
  receiptPreview.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function getPaymentDetails(total) {
  if (salesPaymentMethod.value !== 'Cash') return {};
  return { amountReceived: total, change: 0 };
}

function getSaleDraftTotals() {
  const subtotal = saleDraft.items.reduce((sum, item) => sum + item.total, 0);
  const discount = Number(saleDraft.discount || 0);
  const taxRate = Number(saleDraft.taxRate || 0);
  const taxableAmount = Math.max(subtotal - discount, 0);
  const tax = taxableAmount * taxRate / 100;
  return { subtotal, discount, taxRate, tax, total: taxableAmount + tax };
}

async function beginPesapalCheckout() {
  if (!pendingPesapalSale) return;
  const launchButton = document.getElementById('launch-pesapal-checkout');
  const checkoutLink = document.getElementById('pesapal-checkout-link');
  const phone = document.getElementById('pesapal-checkout-phone').value.trim();
  const popup = window.open('about:blank', '_blank');
  if (popup) popup.opener = null;
  launchButton.disabled = true;
  setPesapalCheckoutStatus('Creating a secure order with Pesapal…', 'pending');

  const { sale, quotationId } = pendingPesapalSale;
  const idempotencyKey = sale.paymentDetails.pesapalIdempotencyKey || uid('pesapal');
  sale.paymentDetails.pesapalIdempotencyKey = idempotencyKey;

  try {
    const result = await apiRequest('/payments/pesapal/checkout', {
      method: 'POST',
      body: JSON.stringify({
        branch_id: sale.branchId || null,
        customer_phone: phone || null,
        idempotency_key: idempotencyKey,
        sale_data: {
          customer_id: sale.customerId || null,
          customer_name: sale.customerName,
          customer_email: sale.customerEmail || '',
          cashier_id: sale.cashierId,
          branch_id: sale.branchId || null,
          quotation_id: quotationId || null,
          order_type: sale.orderType,
          items: sale.items.map((item) => ({
            product_id: item.productId,
            quantity: item.qty
          })),
          subtotal: sale.subtotal,
          discount: sale.discount,
          tax: sale.tax
        }
      })
    });
    if (!result.redirectUrl) {
      throw new Error('Pesapal did not return a checkout link. Check the payment record before retrying.');
    }

    checkoutLink.href = result.redirectUrl;
    checkoutLink.hidden = false;
    setPesapalCheckoutStatus('Checkout opened in a secure Pesapal tab. Waiting for confirmed payment…', 'pending');
    if (popup) {
      popup.location.href = result.redirectUrl;
    } else {
      setPesapalCheckoutStatus('Popup blocked. Use “Open checkout” to continue, then return here to confirm payment.', 'pending');
    }
    pollPesapalPayment(result.payment.id, sale, quotationId);
  } catch (error) {
    if (popup && !popup.closed) popup.close();
    pendingPesapalSale = null;
    sale.paymentDetails.pesapalIdempotencyKey = uid('pesapal');
    launchButton.disabled = false;
    setPesapalCheckoutStatus(error.message || 'Pesapal checkout could not be started.', 'error');
  }
}

async function pollPesapalPayment(paymentId, sale, quotationId, attempt = 0) {
  if (attempt >= 240) {
    setPesapalCheckoutStatus('Still waiting for Pesapal. You can close this window; the sale will only be recorded after payment confirmation.', 'pending');
    document.getElementById('launch-pesapal-checkout').disabled = false;
    return;
  }

  try {
    const result = await apiRequest(`/payments/${encodeURIComponent(paymentId)}/status`);
    const payment = result.payment;
    if (payment?.status === 'SUCCESS' && result.sale) {
      await finishPesapalSale(sale, result.sale, payment, quotationId);
      return;
    }
    if (['FAILED', 'CANCELLED', 'EXPIRED', 'REVERSED'].includes(payment?.status)) {
      pendingPesapalSale = null;
      setPesapalCheckoutStatus(
        payment.failure_reason || `Pesapal payment status: ${payment.status}. No sale was recorded.`,
        'error'
      );
      document.getElementById('launch-pesapal-checkout').disabled = false;
      sale.paymentDetails.pesapalIdempotencyKey = uid('pesapal');
      await refreshServerState();
      renderAll();
      return;
    }
    setPesapalCheckoutStatus('Waiting for the customer to complete checkout. This POS will record the sale after Pesapal confirms payment.', 'pending');
  } catch (error) {
    setPesapalCheckoutStatus(error.message || 'Unable to check Pesapal status. Retrying…', 'error');
  }
  window.setTimeout(() => pollPesapalPayment(paymentId, sale, quotationId, attempt + 1), 3000);
}

function resumePesapalReturn(attempt = 0) {
  const paymentId = new URLSearchParams(window.location.search).get('pesapal_payment_id');
  if (!paymentId || !backendToken || attempt > 200) return;
  const modal = document.getElementById('pesapal-checkout-modal');
  modal.hidden = false;
  document.getElementById('pesapal-checkout-total').textContent = 'Checking…';
  document.getElementById('launch-pesapal-checkout').hidden = true;
  setPesapalCheckoutStatus('Pesapal returned to the POS. Verifying the payment before confirming the sale…', 'pending');

  apiRequest(`/payments/${encodeURIComponent(paymentId)}/status`).then(async (result) => {
    if (result.payment?.status === 'SUCCESS' && result.sale) {
      await refreshServerState();
      const sale = state.sales.find((entry) => entry.id === result.sale.id);
      if (sale) {
        lastReceiptText = buildReceiptText(sale);
        lastReceiptSale = sale;
        receiptPreview.textContent = lastReceiptText;
        renderAll();
        document.getElementById('pesapal-checkout-total').textContent = formatCurrency(sale.total);
        setPesapalCheckoutStatus(
          `Payment confirmed by Pesapal${sale.paymentDetails?.confirmationCode ? ` · ${sale.paymentDetails.confirmationCode}` : ''}. The receipt is ready in Sales.`,
          'success'
        );
      }
      return;
    }
    if (['FAILED', 'CANCELLED', 'EXPIRED', 'REVERSED'].includes(result.payment?.status)) {
      setPesapalCheckoutStatus(result.payment.failure_reason || `Pesapal payment status: ${result.payment.status}. No sale was recorded.`, 'error');
      return;
    }
    window.setTimeout(() => resumePesapalReturn(attempt + 1), 3000);
  }).catch((error) => {
    setPesapalCheckoutStatus(error.message || 'Could not verify Pesapal payment. Retrying…', 'error');
    window.setTimeout(() => resumePesapalReturn(attempt + 1), 5000);
  });
}

async function finishPesapalSale(draftSale, savedSale, payment, quotationId) {
  const confirmationCode = payment.metadata?.confirmationCode || payment.transaction_reference || '';
  const sale = {
    ...draftSale,
    id: savedSale.id,
    createdAt: savedSale.created_at,
    receiptNo: savedSale.receipt_no,
    subtotal: Number(savedSale.subtotal),
    discount: Number(savedSale.discount),
    tax: Number(savedSale.tax),
    total: Number(savedSale.total),
    paymentMethod: 'Pesapal',
    paymentDetails: {
      transactionReference: payment.transaction_reference || '',
      confirmationCode,
      paymentChannel: payment.metadata?.paymentChannel || '',
      customerPhone: payment.customer_phone || ''
    }
  };
  pendingPesapalSale = null;
  document.getElementById('pesapal-checkout-modal').hidden = true;
  setPesapalCheckoutStatus(`Payment confirmed by Pesapal${confirmationCode ? ` · ${confirmationCode}` : ''}. Sale completed.`, 'success');

  const completedQuotation = quotationId && state.quotations.find((entry) => entry.id === quotationId);
  if (completedQuotation) {
    completedQuotation.convertedSaleId = sale.id;
    completedQuotation.status = 'Accepted';
  }
  if (sale.requiresDelivery) {
    const customer = state.customers.find((entry) => entry.id === sale.customerId) || state.customers[0];
    if (customer) await createDeliveryFromSale(sale, customer);
  }
  await refreshServerState();
  lastReceiptText = buildReceiptText(sale);
  lastReceiptSale = sale;
  receiptPreview.textContent = lastReceiptText;
  clearSaleDraft();
  renderAll();
  renderDashboard();
  showCompletedReceipt();
  if (quotationId) delete document.getElementById('complete-sale').dataset.quotationId;
}

function setPesapalCheckoutStatus(message, stateName = 'info') {
  const status = document.getElementById('pesapal-checkout-status');
  status.textContent = message;
  status.dataset.state = stateName;
}

function closePesapalCheckout() {
  const active = document.getElementById('pesapal-checkout-status').dataset.state === 'pending';
  if (active) {
    setPesapalCheckoutStatus('The checkout is still pending. Closing this panel does not cancel a payment in progress.', 'pending');
  } else if (pendingPesapalSale) {
    pendingPesapalSale = null;
  }
  document.getElementById('pesapal-checkout-modal').hidden = true;
}

function findOrCreateCreditAccount(details) {
  let account = state.creditAccounts.find((entry) => entry.phone === details.phone);
  if (!account) {
    account = {
      id: uid('credit'),
      name: details.name,
      phone: details.phone,
      balance: 0,
      creditLimit: details.creditLimit,
      dueDate: details.dueDate,
      notes: details.notes || '',
      status: 'Open',
      createdAt: new Date().toISOString()
    };
    state.creditAccounts.push(account);
  } else {
    account.name = details.name;
    account.creditLimit = details.creditLimit;
    account.dueDate = details.dueDate;
    account.notes = details.notes || account.notes;
    account.status = 'Open';
  }
  return account;
}

async function createDeliveryFromSale(sale, customer) {
  try {
    const response = await apiRequest('/deliveries', { method: 'POST', body: JSON.stringify({ delivery_no: `D${sale.receiptNo.replace(/\D/g, '')}`, sale_id: sale.id, customer_id: customer.id, customer_name: customer.name, customer_email: sale.customerEmail || customer.email || '', phone: customer.phone || '', address: sale.deliveryAddress, order_total: sale.total, fee: sale.deliveryFee, status: 'Pending', pin: String(Math.floor(1000 + Math.random() * 9000)), branch_id: sale.branchId || null }) });
    state.deliveries.unshift(mapDelivery(response.delivery));
  } catch (error) {
    alert(error.message || 'Delivery could not be saved. The sale was saved, but no local delivery fallback was created.');
  }
}

async function findOrCreateDeliveryCustomer(name, email = '') {
  const normalizedName = name.trim().toLowerCase();
  const existing = state.customers.find((customer) => customer.type === 'Delivery' && customer.name.trim().toLowerCase() === normalizedName);
  if (existing) {
    if (email) existing.email = email;
    if (email && existing.email !== email) {
      const response = await apiRequest(`/customers/${existing.id}`, { method: 'PATCH', body: JSON.stringify({ email }) });
      Object.assign(existing, mapCustomer(response.customer));
    }
    return existing;
  }

  const customer = {
    id: uid('cust'),
    name: name.trim(),
    phone: '',
    email,
    type: 'Delivery',
    balance: 0,
    totalPurchases: 0
  };
  const response = await apiRequest('/customers', { method: 'POST', body: JSON.stringify({ name: customer.name, phone: customer.phone, email: customer.email }) });
  const saved = mapCustomer(response.customer);
  state.customers.push(saved);
  return saved;
}

function isAccountAvailableForCurrentBranch(account) {
  const activeBranchId = getActiveBranchId();
  if (!account || account.status !== 'Active') return false;
  if (!activeBranchId) return true;
  if (!state.business.multiBranches) return !account.branchId || account.branchId === activeBranchId;
  return account.branchId === activeBranchId || !account.branchId;
}

function renderMobileMoneyAccountOptions() {
  if (!mobileMoneyAccountSelect) return;
  const selected = mobileMoneyAccountSelect.value;
  const accounts = state.mobileMoneyAccounts.filter((account) => account.status === 'Active' && isAccountAvailableForCurrentBranch(account));
  mobileMoneyAccountSelect.innerHTML = accounts.length
    ? accounts.map((account) => `<option value="${account.id}">${escapeHtml(account.network)} - ${escapeHtml(account.name)} - ${escapeHtml(account.phone)}</option>`).join('')
    : '<option value="">No active receiving account configured</option>';
  mobileMoneyAccountSelect.value = accounts.some((account) => account.id === selected) ? selected : accounts[0]?.id || '';
}

function addPurchaseItem() {
  const productId = purchaseProductSelect.value;
  const qty = Number(purchaseQtyInput.value || 0);
  const sellingPrice = Number(purchasePriceInput.value || 0);
  const purchaseSellingPrice = Number(purchaseSellingPriceInput.value || 0);
  const expiryDate = purchaseExpiryDateInput.value;
  if (!productId || qty <= 0 || sellingPrice < 0 || purchaseSellingPrice < 0) {
    alert('Choose a product, quantity, buying price, and selling price.');
    return;
  }

  const product = state.products.find((entry) => entry.id === productId);
  if (!product) return;

  const existing = purchaseDraft.items.find((entry) => entry.productId === productId);
  if (existing) {
    existing.qty += qty;
    existing.total = existing.qty * sellingPrice;
    existing.sellingPrice = purchaseSellingPrice;
    existing.expiryDate = expiryDate;
    existing.unit = product.unit || 'piece';
  } else {
    purchaseDraft.items.push({
      productId: product.id,
      name: product.name,
      unit: product.unit || 'piece',
      qty,
      buyingPrice: sellingPrice,
      sellingPrice: purchaseSellingPrice,
      expiryDate,
      total: qty * sellingPrice
    });
  }
  purchaseDraft.vendorId = purchaseVendorSelect.value || state.vendors[0]?.id || '';
  renderPurchases();
}

async function completePurchase() {
  if (!hasRole('admin', 'purchase')) {
    alert('Only admin or purchase accounts can record purchases.');
    return;
  }
  if (!purchaseDraft.items.length) {
    alert('Add at least one purchase item.');
    return;
  }

  const vendorId = purchaseVendorSelect.value || state.vendors[0]?.id || '';
  const vendor = state.vendors.find((entry) => entry.id === vendorId);
  if (!vendor) {
    alert('Select a valid vendor.');
    return;
  }

  const total = purchaseDraft.items.reduce((sum, item) => sum + item.total, 0);
  const record = {
    id: uid('pur'),
    businessId: state.business.id || 'business-local',
    branchId: getActiveBranchId(),
    createdAt: new Date().toISOString(),
    vendorId: vendor.id,
    vendorName: vendor.name,
    actorId: getCurrentUser().id,
    actorName: getCurrentUser().displayName,
    items: purchaseDraft.items.map((item) => ({ ...item })),
    total
  };

  try {
    const response = await apiRequest('/purchases', { method: 'POST', body: JSON.stringify({
      reference: `PUR-${Date.now().toString().slice(-7)}`,
      branch_id: getActiveBranchId() || null,
      supplier_id: vendor.id,
      items: record.items.map((item) => ({ product_id: item.productId, quantity: item.qty, buying_price: item.buyingPrice, selling_price: item.sellingPrice, line_total: item.total })),
      subtotal: total, discount: 0, tax: 0
    }) });
    record.id = response.purchase.id;
    record.createdAt = response.purchase.created_at;
    record.items.forEach((item) => {
      const product = state.products.find((entry) => entry.id === item.productId);
      if (product) {
        product.stock += item.qty;
        product.buyingPrice = item.buyingPrice || product.buyingPrice;
        product.sellingPrice = item.sellingPrice || product.sellingPrice;
      }
    });
    vendor.amountOwed = Number(vendor.amountOwed || 0) + total;
    state.purchases.unshift(record);
    await refreshServerSummary();
  } catch (error) {
    alert(error.message || 'Purchase could not be saved. No inventory was changed.');
    return;
  }
  purchaseDraft.items = [];
  renderAll();
  renderDashboard();
}

function renderAll() {
  renderDashboard();
  renderProductOptions();
  renderCustomerOptions();
  renderCashierOptions();
  renderVendorOptions();
  renderSalesSummary();
  renderInvoices();
  renderPurchases();
  renderQuotationOptions();
  renderQuotationDraft();
  renderQuotations();
  renderCustomers();
  renderVendors();
  renderInventory();
  renderAccounts();
  renderDeliveries();
  renderHistoryCalendar();
  renderAdminSettings();
  renderMobileMoneyAccountOptions();
  renderBranches();
  renderKitchenDisplay();
  renderSalesMenu();
  renderMenuCatalog();
  renderSalesOrderControls();
  renderReports();
  applyBranchVisibility();
  renderBadgeSummary();
}

function renderKitchenDisplay() {
  const ticketBoard = document.getElementById('kitchen-ticket-board');
  if (!ticketBoard) return;
  const branchId = getActiveBranchId();
  const tickets = state.kitchenTickets.filter((ticket) => !branchId || ticket.branch_id === branchId);
  const menuSelect = document.getElementById('kitchen-menu-item');
  const selectedMenuItem = menuSelect.value;
  menuSelect.innerHTML = `<option value="">Select menu item</option>${state.products.map((product) => `<option value="${product.id}">${escapeHtml(product.name)} · ${formatCurrency(product.sellingPrice)}</option>`).join('')}`;
  menuSelect.value = state.products.some((product) => product.id === selectedMenuItem) ? selectedMenuItem : '';

  document.getElementById('kitchen-draft-items').innerHTML = kitchenDraftItems.length ? kitchenDraftItems.map((item, index) => `
    <div class="kitchen-draft-row"><span><strong>${item.quantity} × ${escapeHtml(item.name)}</strong>${item.notes ? `<small>${escapeHtml(item.notes)}</small>` : ''}</span><button class="small-btn delete" type="button" data-remove-kitchen-item="${index}" aria-label="Remove ${escapeHtml(item.name)}">Remove</button></div>
  `).join('') : '<p class="empty-state">Add menu items to this order.</p>';

  const activeTickets = tickets.filter((ticket) => !['served','cancelled'].includes(String(ticket.status || '').toLowerCase()));
  document.getElementById('kitchen-ticket-count').textContent = `${activeTickets.length} active`;
  const visibleTickets = tickets.filter((ticket) => !kitchenStatusFilter || ticket.status === kitchenStatusFilter);
  document.getElementById('kitchen-status-counts').innerHTML = ['queued', 'preparing', 'ready', 'served'].map((status) =>
    `<span class="kitchen-status-count ${status}"><i></i>${status === 'served' ? 'Completed' : status[0].toUpperCase() + status.slice(1)} <strong>${tickets.filter((ticket) => ticket.status === status).length}</strong></span>`
  ).join('');

  const hasTable = (ticket) => ticket.table_id != null || ticket.tableId != null;
  const isDeliveryTicket = (ticket) => /delivery/i.test(String(ticket.notes || '')) || /delivery/i.test(String(ticket.order_type || '')) || /delivery/i.test(String(ticket.type || ''));

  const fulfillmentGroups = [
    {
      key: 'dine-in',
      title: 'Dine in',
      tickets: visibleTickets.filter((ticket) => hasTable(ticket) && ticket.status !== 'ready' && !['served','cancelled'].includes(String(ticket.status || '').toLowerCase()))
    },
    {
      key: 'takeaway',
      title: 'Takeaway',
      tickets: visibleTickets.filter((ticket) => !hasTable(ticket) && !isDeliveryTicket(ticket) && ticket.status !== 'ready' && !['served','cancelled'].includes(String(ticket.status || '').toLowerCase()))
    },
    {
      key: 'delivery',
      title: 'Delivery',
      tickets: visibleTickets.filter((ticket) => isDeliveryTicket(ticket) && !['served','cancelled'].includes(String(ticket.status || '').toLowerCase()))
    },
    {
      key: 'ready-pickup',
      title: 'Ready for pickup',
      tickets: visibleTickets.filter((ticket) => ticket.status === 'ready' && !hasTable(ticket) && !isDeliveryTicket(ticket))
    },
    {
      key: 'ready-serving',
      title: 'Ready for serving',
      tickets: visibleTickets.filter((ticket) => ticket.status === 'ready' && hasTable(ticket))
    }
  ];

  ticketBoard.innerHTML = `
    <div class="fulfillment-dashboard">
      ${fulfillmentGroups.map((group) => `
        <section class="fulfillment-column ${group.key}">
          <div class="fulfillment-column-header">
            <h4>${group.title}</h4>
            <span>${group.tickets.length}</span>
          </div>
          <div class="fulfillment-column-body">
            ${group.tickets.length ? group.tickets.map((ticket) => {
              const ticketItems = ticket.items || [];
              const typeLabel = hasTable(ticket) ? 'Table order' : isDeliveryTicket(ticket) ? 'Delivery' : 'Takeaway';
              return `<article class="fulfillment-card ticket-${escapeHtml(ticket.status)}">
                <div class="fulfillment-card-head">
                  <div>
                    <strong>Order #${escapeHtml(String(ticket.id || '').slice(-4))}</strong>
                    <small>${escapeHtml(ticket.branch_name || state.branches.find((entry) => entry.id === ticket.branch_id)?.name || typeLabel)}</small>
                  </div>
                  <time>${escapeHtml(formatDate(ticket.created_at))}</time>
                </div>
                <ul>${ticketItems.map((item) => `<li><strong>${Number(item.quantity || item.qty || 0)} ×</strong> ${escapeHtml(item.item_name || item.name || 'Menu item')}${item.notes ? `<small>${escapeHtml(item.notes)}</small>` : ''}</li>`).join('')}</ul>
                ${ticket.notes ? `<p class="kitchen-ticket-notes">${escapeHtml(ticket.notes)}</p>` : ''}
                <label class="sr-only" for="ticket-status-${ticket.id}">Order status</label>
                <select id="ticket-status-${ticket.id}" class="restaurant-status-select" data-ticket-status="${ticket.id}">
                  ${[['queued','Queued'],['preparing','Preparing'],['ready','Ready'],['served','Served'],['cancelled','Cancelled']].map(([value,label]) => `<option value="${value}" ${ticket.status === value ? 'selected' : ''}>${label}</option>`).join('')}
                </select>
              </article>`;
            }).join('') : '<div class="empty-state">No orders</div>'}
          </div>
        </section>
      `).join('')}
    </div>
  `;
}

function bindKitchenActions() {
  document.getElementById('kitchen-add-item').addEventListener('click', () => {
    const product = state.products.find((item) => item.id === document.getElementById('kitchen-menu-item').value);
    const quantity = Number(document.getElementById('kitchen-item-quantity').value || 0);
    if (!product || !Number.isFinite(quantity) || quantity <= 0) return alert('Choose a menu item and enter a valid quantity.');
    kitchenDraftItems.push({ menu_item_id: product.id, name: product.name, quantity, notes: document.getElementById('kitchen-item-notes').value.trim() });
    document.getElementById('kitchen-item-notes').value = '';
    renderKitchenDisplay();
  });

  document.getElementById('kitchen-draft-items').addEventListener('click', (event) => {
    const removeButton = event.target.closest('[data-remove-kitchen-item]');
    if (!removeButton) return;
    kitchenDraftItems.splice(Number(removeButton.dataset.removeKitchenItem), 1);
    renderKitchenDisplay();
  });

  document.getElementById('kitchen-ticket-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!kitchenDraftItems.length) return alert('Add at least one menu item to this order.');
    const branchId = getActiveBranchId();
    if (state.business.multiBranches && !branchId) return alert('Select a branch before sending an order.');
    const notes = document.getElementById('kitchen-ticket-notes').value.trim();
    try {
      if (backendToken) {
        await apiRequest('/restaurant/kitchen-tickets', { method: 'POST', body: JSON.stringify({ branch_id: branchId || undefined, notes, items: kitchenDraftItems.map(({ menu_item_id, quantity, notes: itemNotes }) => ({ menu_item_id, quantity, notes: itemNotes })) }) });
        await refreshServerState();
      } else {
        const ticket = { id: uid('ticket'), branch_id: branchId || null, status: 'queued', notes, created_at: new Date().toISOString(), created_by_name: getCurrentUser()?.displayName || 'Staff', items: kitchenDraftItems.map(({ menu_item_id, name, quantity, notes: itemNotes }) => ({ menu_item_id, item_name: name, quantity, notes: itemNotes })) };
        state.kitchenTickets.unshift(ticket);
      }
      kitchenDraftItems.length = 0;
      document.getElementById('kitchen-ticket-form').reset();
      document.getElementById('kitchen-ticket-composer').hidden = true;
      renderAll();
    } catch (error) {
      alert(error.message || 'Order could not be sent.');
    }
  });

  document.getElementById('kitchen-ticket-board').addEventListener('change', async (event) => {
    const control = event.target.closest('[data-ticket-status]');
    if (!control) return;
    const ticket = state.kitchenTickets.find((entry) => entry.id === control.dataset.ticketStatus);
    if (!ticket) return;
    try {
      if (backendToken) {
        const { ticket: updated } = await apiRequest(`/restaurant/kitchen-tickets/${ticket.id}/status`, { method: 'PATCH', body: JSON.stringify({ status: control.value }) });
        Object.assign(ticket, updated);
      } else ticket.status = control.value;
      renderAll();
    } catch (error) { alert(error.message || 'Order status could not be updated.'); renderAll(); }
  });
}

function bindKitchenWorkspaceActions() {
  const composer = document.getElementById('kitchen-ticket-composer');
  document.getElementById('open-kitchen-ticket-composer').addEventListener('click', () => {
    composer.hidden = false;
    document.getElementById('kitchen-menu-item').focus();
  });
  document.getElementById('cancel-kitchen-ticket').addEventListener('click', () => {
    kitchenDraftItems.length = 0;
    document.getElementById('kitchen-ticket-form').reset();
    composer.hidden = true;
    renderKitchenDisplay();
  });
  document.getElementById('kitchen-order-filter').addEventListener('change', (event) => {
    kitchenStatusFilter = event.target.value;
    renderKitchenDisplay();
  });
}

function renderPaymentSummary() {
  const summary = state.paymentSummary;
  if (!summary) return;
  document.getElementById('payment-today-grand-total').textContent = formatCurrency(summary.grandTotal);
  document.getElementById('summary-cash-total').textContent = formatCurrency(summary.cash?.total);
  document.getElementById('summary-cash-count').textContent = `${Number(summary.cash?.count || 0)} transactions`;
  document.getElementById('summary-pesapal-total').textContent = formatCurrency(summary.pesapal?.total);
  document.getElementById('summary-pesapal-count').textContent = `${Number(summary.pesapal?.count || 0)} transactions`;
}

function renderCashierOptions() {
  const currentUser = getCurrentUser();
  const cashiers = state.users.filter((user) => user.role === 'admin' || user.role === 'sales');
  salesCashierSelect.innerHTML = cashiers.map((user) => `<option value="${user.id}">${user.displayName}</option>`).join('');
  const selectedId = currentUser.role === 'admin' ? salesCashierSelect.value : currentUser.id;
  salesCashierSelect.value = cashiers.some((user) => user.id === selectedId) ? selectedId : currentUser.id;
  salesCashierSelect.disabled = currentUser.role !== 'admin';
}

function renderAdminSettings() {
  if (!businessSettingsForm || !staffAccountList) return;
  const pesapalConfig = state.paymentConfig?.config;
  const pesapalStatus = state.paymentConfig?.pesapal;
  if (pesapalConfig) {
    document.getElementById('setting-pesapal-environment').value = pesapalConfig.pesapalEnvironment || 'sandbox';
    document.getElementById('setting-receipt-notes').value = pesapalConfig.receiptNotes || 'Thank you for shopping with us';
  }
  const readiness = document.getElementById('pesapal-readiness');
  if (readiness) {
    readiness.textContent = pesapalStatus
      ? `Pesapal ${pesapalStatus.environment}: credentials ${pesapalStatus.credentialsConfigured ? 'configured' : 'missing'} · callback URL ${pesapalStatus.callbackConfigured ? 'configured' : 'missing'} · IPN URL ${pesapalStatus.ipnConfigured ? 'configured' : 'missing'} · IPN registration ${pesapalStatus.ipnRegistered ? 'ready' : 'will register on first checkout'}.`
      : 'Pesapal status is unavailable until the POS is connected to its backend.';
  }
  document.getElementById('business-name').value = state.business.name || '';
  document.getElementById('business-phone').value = state.business.phone || '';
  document.getElementById('business-email').value = state.business.email || '';
  document.getElementById('business-address').value = state.business.address || '';
  businessLogoInput.value = '';
  businessLogoInput.dataset.logoData = state.business.logo || '';
  businessLogoPreview.src = state.business.logo || '';
  businessLogoPreview.hidden = !state.business.logo;
  document.getElementById('business-country').value = state.business.country || '';
  document.getElementById('business-currency').value = state.business.currency || 'UGX';
  document.getElementById('business-tax-rate').value = Number(state.business.taxRate || 0);
  document.getElementById('business-multi-branch').value = String(!!state.business.multiBranches);
  document.getElementById('business-opening-balance').value = Number(state.business.openingBalance || 0);
  document.getElementById('business-financial-year').value = state.business.financialYearStart || `${new Date().getFullYear()}-01-01`;
  document.querySelectorAll('.brand-icon').forEach((image) => { image.src = state.business.logo || 'assets/suuk logo.jpeg'; });
  renderBranchSelect(branchManagerSelect, state.users.filter((user) => user.role === 'admin' || user.role === 'manager'), 'No manager assigned');
  const activeBranches = state.branches.filter((branch) => branch.active !== false);
  renderBranchSelect(document.getElementById('staff-branch'), activeBranches, 'Business-wide');
  renderBranchSelect(mobileMoneyAccountBranch, activeBranches, 'Business-wide');
  const staffQuery = staffSearch.value.trim().toLowerCase();
  const visibleStaff = state.users.filter((user) => !staffQuery || `${user.displayName} ${user.username} ${formatRole(user.role)} ${user.phone} ${user.email}`.toLowerCase().includes(staffQuery));
  staffAccountList.innerHTML = `
    <div class="list-header"><span>Account</span><span>Contact</span><span>Department</span><span>Status</span><span>Actions</span></div>
    ${visibleStaff.map((user) => `
      <div class="list-row">
        <span><strong>${escapeHtml(user.displayName)}</strong><br><span class="text-muted">@${escapeHtml(user.username)}</span></span>
        <span>${escapeHtml(user.phone || 'No phone')}<br><span class="text-muted">${escapeHtml(user.email || 'No email')}</span></span>
        <span>${formatRole(user.role)}<br><span class="text-muted">${escapeHtml(user.address || 'No address')} · ${escapeHtml(state.branches.find((branch) => branch.id === user.branchId)?.name || 'Business-wide')}</span></span>
        <span class="text-muted">${user.active === false ? 'Inactive account' : 'Active account'}</span>
        <span class="action-controls">
          <button class="small-btn edit" data-edit-user="${user.id}">Edit</button>
          <button class="small-btn delete" data-delete-user="${user.id}">Delete</button>
        </span>
      </div>
    `).join('')}
  `;
  mobileMoneyAccountList.innerHTML = state.mobileMoneyAccounts.length ? `
    <div class="list-header"><span>Network / Account</span><span>Receiving Number</span><span>Branch</span><span>Status</span><span>Actions</span></div>
    ${state.mobileMoneyAccounts.map((account) => `<div class="list-row"><span><strong>${escapeHtml(account.network)} · ${escapeHtml(account.name)}</strong><br><span class="text-muted">${escapeHtml(account.description || 'No description')}</span></span><span>${escapeHtml(account.phone)}</span><span>${escapeHtml(state.branches.find((branch) => branch.id === account.branchId)?.name || 'Business-wide')}</span><span class="muted">${escapeHtml(account.status)}</span><span class="action-controls"><button class="small-btn edit" data-edit-mobile-money="${account.id}">Edit</button><button class="small-btn" data-toggle-mobile-money="${account.id}">${account.status === 'Active' ? 'Deactivate' : 'Activate'}</button><button class="small-btn delete" data-delete-mobile-money="${account.id}">Delete</button></span></div>`).join('')}
  ` : '<div class="empty-state">No Mobile Money receiving accounts configured.</div>';
}

function renderBranchSelect(select, entries, emptyLabel) {
  if (!select) return;
  const current = select.value;
  select.innerHTML = `<option value="">${emptyLabel}</option>${entries.map((entry) => `<option value="${entry.id}">${escapeHtml(entry.name || entry.displayName)}</option>`).join('')}`;
  select.value = entries.some((entry) => entry.id === current) ? current : '';
}

function renderBranches() {
  if (!branchListBox) return;
  const branchQuery = branchSearch.value.trim().toLowerCase();
  const branches = state.branches;
  const currentUser = getCurrentUser();
  const canViewAllBranches = currentUser?.role === 'admin' || currentUser?.role === 'owner';
  const assignedBranch = branches.find((branch) => branch.id === currentUser?.branchId && branch.active);
  const visibleBranches = canViewAllBranches ? branches.filter((branch) => branch.active) : assignedBranch ? [assignedBranch] : [];
  currentBranchSelect.innerHTML = `${canViewAllBranches ? '<option value="">All Branches</option>' : ''}${visibleBranches.map((branch) => `<option value="${branch.id}">${escapeHtml(branch.name)}</option>`).join('')}`;
  currentBranchSelect.value = canViewAllBranches ? state.preferences.currentBranchId || '' : assignedBranch?.id || '';
  const managerOptions = state.users.filter((user) => user.role === 'admin' || user.role === 'owner' || user.role === 'manager');
  renderBranchSelect(branchManagerSelect, managerOptions, 'No manager assigned');
  document.getElementById('transfer-from').innerHTML = branches.filter((branch) => branch.active).map((branch) => `<option value="${branch.id}">${escapeHtml(branch.name)}</option>`).join('');
  document.getElementById('transfer-to').innerHTML = document.getElementById('transfer-from').innerHTML;
  document.getElementById('transfer-product').innerHTML = state.products.map((product) => `<option value="${product.id}">${escapeHtml(product.name)} · ${escapeHtml(product.unit || 'piece')}</option>`).join('');
  updateQuantityUnitLabels();
  const visibleBranchesForList = branches.filter((branch) => {
    const managerName = state.users.find((user) => user.id === branch.managerId)?.displayName || '';
    return !branchQuery || `${branch.name} ${branch.address} ${branch.phone} ${managerName}`.toLowerCase().includes(branchQuery);
  });
  branchListBox.innerHTML = visibleBranchesForList.length ? `<div class="list-header"><span>Branch</span><span>Address</span><span>Manager</span><span>Status</span><span>Actions</span></div>${visibleBranchesForList.map((branch) => `<div class="list-row"><span><strong>${escapeHtml(branch.name)}</strong></span><span>${escapeHtml(branch.address)}<br>${escapeHtml(branch.phone || 'No phone')}</span><span>${escapeHtml(state.users.find((user) => user.id === branch.managerId)?.displayName || 'Not assigned')}</span><span>${branch.active ? 'Active' : 'Inactive'}</span><span class="action-controls"><button class="small-btn edit" data-edit-branch="${branch.id}">Edit</button><button class="small-btn" data-toggle-branch="${branch.id}">${branch.active ? 'Deactivate' : 'Activate'}</button></span></div>`).join('')}` : '<div class="empty-state">No branches match your search.</div>';
  branchListBox.querySelectorAll('[data-edit-branch]').forEach((button) => button.addEventListener('click', () => editBranch(button.dataset.editBranch)));
  branchListBox.querySelectorAll('[data-toggle-branch]').forEach((button) => button.addEventListener('click', () => toggleBranch(button.dataset.toggleBranch)));
  stockTransferList.innerHTML = state.stockTransfers.length ? `<div class="list-header"><span>Transfer</span><span>Product</span><span>Quantity</span><span>Status</span></div>${state.stockTransfers.map((transfer) => `<div class="list-row"><span>${escapeHtml(state.branches.find((branch) => branch.id === transfer.fromBranchId)?.name || '—')} → ${escapeHtml(state.branches.find((branch) => branch.id === transfer.toBranchId)?.name || '—')}</span><span>${escapeHtml(state.products.find((product) => product.id === transfer.productId)?.name || '—')}</span><span>${transfer.quantity} ${escapeHtml(getProductUnit(transfer.productId))}</span><span>${transfer.status}</span></div>`).join('')}` : '<div class="empty-state">No stock transfers prepared.</div>';
}

function editBranch(branchId) {
  const branch = state.branches.find((entry) => entry.id === branchId);
  if (!branch) return;
  document.getElementById('branch-id').value = branch.id;
  document.getElementById('branch-name').value = branch.name;
  document.getElementById('branch-phone').value = branch.phone || '';
  document.getElementById('branch-address').value = branch.address || '';
  document.getElementById('branch-manager').value = branch.managerId || '';
  document.getElementById('branch-active').checked = branch.active !== false;
}

async function toggleBranch(branchId) {
  const branch = state.branches.find((entry) => entry.id === branchId);
  if (!branch) return;
  try {
    const response = await apiRequest(`/branches/${branch.id}`, { method: 'PATCH', body: JSON.stringify({ active: !branch.active }) });
    Object.assign(branch, response.branch);
    if (!branch.active && state.preferences.currentBranchId === branch.id) state.preferences.currentBranchId = '';
    renderAll();
  } catch (error) {
    alert(error.message || 'Branch could not be updated.');
  }
}

function getTransactionHistory() {
  const entries = [];
  const currentUser = getCurrentUser();
  const role = currentUser?.role;

  const visibleSales = getVisibleSales();
  visibleSales.forEach((sale) => {
    entries.push({
      id: sale.id,
      type: 'Sale',
      label: sale.receiptNo,
      amount: sale.total,
      date: sale.createdAt || new Date().toISOString(),
      reference: `${sale.customerName} · Cashier: ${sale.cashierName || 'Admin'}`,
      category: 'Sales',
      direction: 'income'
    });
  });

  const visiblePurchases = getVisiblePurchases();
  visiblePurchases.forEach((purchase) => {
    entries.push({
      id: purchase.id,
      type: 'Purchase',
      label: purchase.vendorName,
      amount: purchase.total,
      date: purchase.createdAt || new Date().toISOString(),
      reference: `${purchase.vendorName} · By: ${purchase.actorName || 'Admin'}`,
      category: 'Purchases',
      direction: 'expense'
    });
  });

  if (role === 'admin') state.expenses.forEach((expense) => {
    entries.push({
      id: expense.id,
      type: 'Expense',
      label: expense.name,
      amount: expense.amount,
      date: expense.date ? `${expense.date}T00:00:00` : new Date().toISOString(),
      reference: expense.description || 'Operating cost',
      category: 'Expenses',
      direction: 'expense'
    });
  });

  if (role === 'admin') state.payments.forEach((payment) => {
    entries.push({
      id: payment.id,
      type: payment.type,
      label: payment.label,
      amount: payment.amount,
      date: payment.date ? `${payment.date}T00:00:00` : new Date().toISOString(),
      reference: payment.label,
      category: payment.type === 'Income' ? 'Cash In' : 'Cash Out',
      direction: payment.type === 'Income' ? 'income' : 'expense'
    });
  });

  if (role === 'admin') state.quotations.forEach((quotation) => {
    entries.push({
      id: quotation.id,
      type: 'Quotation',
      label: quotation.quotationNo,
      amount: quotation.total,
      date: `${quotation.quotationDate}T00:00:00`,
      reference: `${quotation.customerName} · ${getQuotationStatus(quotation)}`,
      category: 'Quotations',
      direction: 'income'
    });
  });

  return entries.sort((a, b) => new Date(b.date) - new Date(a.date));
}

function getVisibleSales() {
  const currentUser = getCurrentUser();
  if (currentUser?.role === 'sales') {
    return state.sales.filter((sale) => sale.cashierId === currentUser.id);
  }
  return currentUser?.role === 'purchase' ? [] : state.sales;
}

function getVisiblePurchases() {
  const currentUser = getCurrentUser();
  if (currentUser?.role === 'purchase') {
    return state.purchases.filter((purchase) => purchase.actorId === currentUser.id);
  }
  return currentUser?.role === 'sales' ? [] : state.purchases;
}

function buildPeriodSummary(transactions, period) {
  const bucket = {};

  transactions.forEach((entry) => {
    const date = new Date(entry.date);
    const key = period === 'day'
      ? date.toISOString().slice(0, 10)
      : period === 'month'
        ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
        : `${date.getFullYear()}`;

    if (!bucket[key]) {
      bucket[key] = { label: key, income: 0, expense: 0, transactions: 0 };
    }

    bucket[key].transactions += 1;
    if (entry.direction === 'income') {
      bucket[key].income += Number(entry.amount || 0);
    } else {
      bucket[key].expense += Number(entry.amount || 0);
    }
  });

  return Object.values(bucket)
    .map((item) => ({ ...item, net: item.income - item.expense }))
    .sort((a, b) => b.label.localeCompare(a.label));
}

function renderLiveTransactions() {
  const today = dateISO();
  const visibleSales = getVisibleSales();
  const visiblePurchases = getVisiblePurchases();
  const liveTransactionTypes = [
    { label: 'Sales', icon: '↗', accent: 'var(--accent)', count: visibleSales.filter((entry) => localDateKey(entry.createdAt) === today).length },
    { label: 'Purchases', icon: '↓', accent: 'var(--primary)', count: visiblePurchases.filter((entry) => localDateKey(entry.createdAt) === today).length },
    { label: 'Expenses', icon: '−', accent: 'var(--danger)', count: state.expenses.filter((entry) => entry.date === today).length },
    { label: 'Payments', icon: '↔', accent: 'var(--warning)', count: state.payments.filter((entry) => entry.date === today).length }
  ];

  document.getElementById('live-transactions-date').textContent = new Date().toLocaleDateString('en-UG', { dateStyle: 'full' });
  document.getElementById('live-transactions').innerHTML = liveTransactionTypes.map((item) => `
    <div class="live-transaction-card" style="--card-accent:${item.accent}" data-dashboard-section="${item.label === 'Sales' ? 'sales' : item.label === 'Purchases' ? 'purchases' : 'accounts'}" role="button" tabindex="0" aria-label="Open ${item.label.toLowerCase()}">
      <div class="live-transaction-icon">${item.icon}</div>
      <h4>${item.label}</h4>
      <strong>${item.count}</strong>
    </div>
  `).join('');
}

function localDateKey(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function renderHistoryCalendar() {
  const transactions = getTransactionHistory();
  const transactionDates = new Set(transactions.map((entry) => localDateKey(entry.date)));
  const years = new Set([new Date().getFullYear(), historyView.year]);

  transactions.forEach((entry) => {
    const date = new Date(entry.date);
    if (!Number.isNaN(date.getTime())) years.add(date.getFullYear());
  });

  historyYearSelect.innerHTML = [...years]
    .sort((a, b) => b - a)
    .map((year) => `<option value="${year}">${year}</option>`)
    .join('');
  historyYearSelect.value = String(historyView.year);
  historyMonthSelect.value = String(historyView.month);

  const firstDay = new Date(historyView.year, historyView.month, 1).getDay();
  const daysInMonth = new Date(historyView.year, historyView.month + 1, 0).getDate();
  const selectedDateKey = `${historyView.year}-${String(historyView.month + 1).padStart(2, '0')}-${String(historyView.day).padStart(2, '0')}`;
  const todayKey = localDateKey(new Date());
  const monthName = new Date(historyView.year, historyView.month, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const headings = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    .map((day) => `<div class="calendar-heading">${day}</div>`)
    .join('');
  const emptyDays = Array.from({ length: firstDay }, () => '<div class="calendar-empty"></div>').join('');
  const dayButtons = Array.from({ length: daysInMonth }, (_, index) => {
    const day = index + 1;
    const dateKey = `${historyView.year}-${String(historyView.month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const classes = [
      'calendar-day',
      dateKey === selectedDateKey ? 'selected' : '',
      dateKey === todayKey ? 'today' : '',
      transactionDates.has(dateKey) ? 'has-transactions' : ''
    ].filter(Boolean).join(' ');
    return `<button class="${classes}" type="button" data-history-day="${day}" aria-label="View transactions for ${dateKey}"><span class="calendar-day-number">${day}</span></button>`;
  }).join('');

  historyCalendar.innerHTML = `<div class="calendar-month-label">${monthName}</div>${headings}${emptyDays}${dayButtons}`;

  const selectedTransactions = transactions.filter((entry) => localDateKey(entry.date) === selectedDateKey);
  const selectedNet = selectedTransactions.reduce((total, entry) => total + (entry.direction === 'income' ? entry.amount : -entry.amount), 0);
  historySelectedTitle.textContent = `Activity for ${new Date(historyView.year, historyView.month, historyView.day).toLocaleDateString('en-UG', { dateStyle: 'full' })}`;
  historySelectedTotal.textContent = formatCurrency(selectedNet);
  historySelectedList.innerHTML = selectedTransactions.length ? `
    <div class="list-header">
      <span>Record</span>
      <span>Type</span>
      <span>Time</span>
      <span>Amount</span>
      <span>Details</span>
    </div>
    ${selectedTransactions.map((entry) => `
      <div class="list-row">
        <span><strong>${entry.label}</strong></span>
        <span class="history-record-type">${entry.type}</span>
        <span>${formatDate(entry.date)}</span>
        <span class="${entry.direction === 'income' ? 'income' : 'expense'}">${entry.direction === 'income' ? '+' : '-'}${formatCurrency(entry.amount)}</span>
        <span>${entry.reference}</span>
      </div>
    `).join('')}
  ` : '<div class="empty-state">No purchases, sales, expenses, or payments recorded for this day.</div>';
}

function renderDashboard() {
  const role = getCurrentUser()?.role || 'admin';
  const branchId = getActiveBranchId();
  const isInActiveBranch = (entry) => !branchId || (entry.branchId || entry.branch_id || '') === branchId;
  const visibleSales = getVisibleSales().filter(isInActiveBranch);
  const visiblePurchases = getVisiblePurchases();
  const today = localDateKey(new Date());
  const todaySalesList = visibleSales.filter((sale) => localDateKey(sale.createdAt) === today);
  const todaySales = todaySalesList.reduce((sum, sale) => sum + Number(sale.total || 0), 0);
  const todayPurchases = visiblePurchases.filter((purchase) => localDateKey(purchase.createdAt) === today).reduce((sum, purchase) => sum + Number(purchase.total || 0), 0);
  const totalRevenue = state.serverSummary ? Number(state.serverSummary.sales.total || 0) : visibleSales.reduce((sum, sale) => sum + sale.total, 0);
  const totalExpenses = state.serverSummary ? Number(state.serverSummary.expenses.total || 0) : state.expenses.reduce((sum, entry) => sum + entry.amount, 0) + state.payments.filter((item) => item.type === 'Expense').reduce((sum, entry) => sum + entry.amount, 0);
  const netProfit = totalRevenue - totalExpenses;
  const tickets = state.kitchenTickets.filter(isInActiveBranch);
  const activeTickets = tickets.filter((ticket) => !['served', 'cancelled'].includes(String(ticket.status || '').toLowerCase()));
  const todayTickets = tickets.filter((ticket) => localDateKey(ticket.created_at || ticket.createdAt) === today);
  const deliveries = state.deliveries
    .filter(isInActiveBranch)
    .filter((delivery) => role !== 'delivery' || delivery.driverId === getCurrentUser()?.id);
  const activeDeliveries = deliveries.filter((delivery) => !['Received', 'Delivered', 'Cancelled', 'Failed'].includes(delivery.status));
  const todayDeliveries = deliveries.filter((delivery) => localDateKey(delivery.createdAt) === today);
  const todaySalesByType = todaySalesList.reduce((groups, sale) => {
    const orderType = sale.orderType || (sale.requiresDelivery ? 'delivery' : 'dine-in');
    const group = orderType === 'takeaway' ? 'takeaway' : orderType === 'delivery' ? 'delivery' : 'dine-in';
    groups[group].push(sale);
    return groups;
  }, { 'dine-in': [], takeaway: [], delivery: [] });
  const currentHour = new Date().getHours();
  document.getElementById('dashboard-greeting-period').textContent = currentHour < 12 ? 'morning' : currentHour < 18 ? 'afternoon' : 'evening';
  document.getElementById('dashboard-greeting-name').textContent = getCurrentUser()?.displayName || 'there';
  document.getElementById('dashboard-current-date').textContent = new Intl.DateTimeFormat('en', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
  }).format(new Date());
  document.getElementById('dashboard-total-revenue').textContent = formatCurrency(todaySales);
  document.getElementById('dashboard-today-orders').textContent = String(todaySalesList.length);
  document.getElementById('dashboard-pending-orders').textContent = String(activeTickets.length + activeDeliveries.length);
  renderDashboardServiceOrders(todaySalesByType);
  document.getElementById('dashboard-total-expenses').textContent = formatCurrency(totalExpenses);
  document.getElementById('dashboard-net-profit').textContent = formatCurrency(netProfit);
  document.getElementById('dashboard-today-sales').textContent = formatCurrency(todaySales);
  document.getElementById('dashboard-today-purchases').textContent = formatCurrency(todayPurchases);
  const isAdminDashboard = role === 'admin' || role === 'owner';
  document.querySelectorAll('.dashboard-admin-card').forEach((element) => { element.hidden = !isAdminDashboard; });
  const dashboardSalesCard = document.getElementById('dashboard-today-sales-card');
  const dashboardPurchasesCard = document.getElementById('dashboard-today-purchases-card');
  if (dashboardSalesCard) dashboardSalesCard.hidden = role !== 'sales';
  if (dashboardPurchasesCard) dashboardPurchasesCard.hidden = role !== 'purchase';
  renderLiveTransactions();

  const chartYear = new Date().getFullYear();
  const chartData = Array.from({ length: 12 }, (_, monthIndex) => ({
    label: new Date(chartYear, monthIndex, 1).toLocaleDateString('en-US', { month: 'short' }),
    total: visibleSales
      .filter((sale) => {
        const saleDate = new Date(sale.createdAt);
        return saleDate.getFullYear() === chartYear && saleDate.getMonth() === monthIndex;
      })
      .reduce((sum, sale) => sum + sale.total, 0)
  }));
  const chartTotal = chartData.reduce((sum, sale) => sum + sale.total, 0);
  document.getElementById('dashboard-chart-total').textContent = formatCurrency(chartTotal);
  document.getElementById('dashboard-chart-caption').textContent = `Monthly sales overview · ${chartYear}`;
  const weeklyChartData = Array.from({ length: 7 }, (_, index) => {
    const day = new Date();
    day.setHours(0, 0, 0, 0);
    day.setDate(day.getDate() - (6 - index));
    const key = localDateKey(day);
    return {
      key,
      label: day.toLocaleDateString('en-UG', { weekday: 'short' }),
      dateLabel: day.toLocaleDateString('en-UG', { day: 'numeric', month: 'short' }),
      total: visibleSales
        .filter((sale) => localDateKey(sale.createdAt) === key && !['returned', 'voided'].includes(String(sale.status || '').toLowerCase()))
        .reduce((sum, sale) => sum + Number(sale.total || 0), 0)
    };
  });
  const weeklyTotal = weeklyChartData.reduce((sum, day) => sum + day.total, 0);
  document.getElementById('dashboard-weekly-total').textContent = formatCurrency(weeklyTotal);
  document.getElementById('dashboard-weekly-caption').textContent = `Sales by day · ${weeklyChartData[0].dateLabel} – ${weeklyChartData[6].dateLabel}`;
  document.getElementById('dashboard-weekly-chart').innerHTML = renderWeeklySalesPie(weeklyChartData, weeklyTotal);

  if (chartData.length) {
    const chartWidth = 720;
    const chartHeight = 260;
    const chartPadding = { top: 24, right: 18, bottom: 42, left: 18 };
    const plotWidth = chartWidth - chartPadding.left - chartPadding.right;
    const plotHeight = chartHeight - chartPadding.top - chartPadding.bottom;
    const maxValue = Math.max(...chartData.map((sale) => sale.total), 1);
    const pointGap = chartData.length > 1 ? plotWidth / (chartData.length - 1) : 0;
    const points = chartData.map((sale, index) => ({
      x: chartPadding.left + (chartData.length > 1 ? index * pointGap : plotWidth / 2),
      y: chartPadding.top + plotHeight - (sale.total / maxValue) * plotHeight,
      sale
    }));
    const linePoints = points.map((point) => `${point.x},${point.y}`).join(' ');
    const areaPoints = `${chartPadding.left},${chartPadding.top + plotHeight} ${linePoints} ${chartPadding.left + plotWidth},${chartPadding.top + plotHeight}`;
    const gridLines = [0, 1, 2, 3].map((step) => {
      const y = chartPadding.top + (plotHeight / 3) * step;
      return `<line class="chart-grid-line" x1="${chartPadding.left}" y1="${y}" x2="${chartPadding.left + plotWidth}" y2="${y}" />`;
    }).join('');
    const pointsMarkup = points.map((point) => `
      <g class="chart-point-group">
        <title>${point.sale.label}: ${formatCurrency(point.sale.total)}</title>
        <circle class="chart-point-halo" cx="${point.x}" cy="${point.y}" r="8" />
        <circle class="chart-point" cx="${point.x}" cy="${point.y}" r="4" />
        <text class="chart-label" x="${point.x}" y="${chartHeight - 14}" text-anchor="middle">${point.sale.label}</text>
      </g>
    `).join('');

    document.getElementById('dashboard-chart').innerHTML = `
      <svg class="sales-chart-svg" viewBox="0 0 ${chartWidth} ${chartHeight}" role="img" aria-label="Monthly sales trend for ${chartYear}">
        <defs>
          <linearGradient id="sales-area-gradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stop-color="#2f7cff" stop-opacity="0.28" />
            <stop offset="100%" stop-color="#2f7cff" stop-opacity="0.02" />
          </linearGradient>
        </defs>
        ${gridLines}
        <polygon class="chart-area" points="${areaPoints}" />
        <polyline class="chart-line" points="${linePoints}" />
        ${pointsMarkup}
      </svg>
    `;
  } else {
    document.getElementById('dashboard-chart').innerHTML = '<div class="empty-state">No sales data for charting.</div>';
  }

  const productPerformance = {};
  visibleSales.forEach((sale) => {
    sale.items.forEach((item) => {
      const productId = item.productId || item.product_id || item.menu_item_id;
      const name = item.name || item.item_name || state.products.find((product) => product.id === productId)?.name || 'Menu item';
      const productKey = String(name).trim().toLocaleLowerCase();
      if (!productPerformance[productKey]) {
        productPerformance[productKey] = { name, unit: item.unit || getProductUnit(productId), quantity: 0, revenue: 0 };
      }
      productPerformance[productKey].quantity += Number(item.qty || item.quantity || 0);
      productPerformance[productKey].revenue += Number(item.total || 0);
    });
  });
  const topProducts = Object.values(productPerformance)
    .sort((a, b) => b.quantity - a.quantity || b.revenue - a.revenue)
    .slice(0, 4);
  document.getElementById('dashboard-top-products').innerHTML = topProducts.length ? topProducts.map((product, index) => `
    <div class="top-product-row">
      <span class="top-product-rank">${index + 1}</span>
      <span class="top-product-name">${escapeHtml(product.name)}</span>
      <span class="top-product-quantity">${product.quantity} ${escapeHtml(product.unit)} sold</span>
      <strong>${formatCurrency(product.revenue)}</strong>
    </div>
  `).join('') : '<div class="empty-state">No completed sales yet.</div>';

  const kitchenQueue = activeTickets.slice(0, 4);
  document.getElementById('dashboard-kitchen-queue').innerHTML = kitchenQueue.length ? kitchenQueue.map((ticket) => {
    const items = (ticket.items || []).map((item) => `${Number(item.quantity || item.qty || 0)} × ${escapeHtml(item.item_name || item.name || 'Menu item')}`).join(', ');
    const status = String(ticket.status || 'queued').replace(/^./, (character) => character.toUpperCase());
    return `<div class="dashboard-queue-item">
      <div class="dashboard-queue-main"><strong>Fulfillment order</strong><span>${escapeHtml(items || 'Active order')}</span></div>
      <span class="dashboard-queue-status status-${escapeHtml(String(ticket.status || 'queued').toLowerCase())}">${escapeHtml(status)}</span>
    </div>`;
  }).join('') : '<div class="empty-state">No active orders.</div>';

  const summaryItems = role === 'sales' ? [
    { label: 'Products in Stock', value: state.products.reduce((sum, product) => sum + product.stock, 0), section: 'inventory' },
    { label: 'Low Stock Items', value: state.products.filter((product) => product.stock <= product.lowStockThreshold).length, section: 'inventory' },
    { label: 'Customers', value: state.customers.length, section: 'customers' }
  ] : role === 'purchase' ? [
    { label: 'Products in Stock', value: state.products.reduce((sum, product) => sum + product.stock, 0), section: 'inventory' },
    { label: 'Low Stock Items', value: state.products.filter((product) => product.stock <= product.lowStockThreshold).length, section: 'inventory' }
  ] : [
    { label: 'Products in Stock', value: state.products.reduce((sum, product) => sum + product.stock, 0), section: 'inventory' },
    { label: 'Low Stock Items', value: state.products.filter((product) => product.stock <= product.lowStockThreshold).length, section: 'inventory' },
    { label: 'Customers', value: state.customers.length, section: 'customers' }
  ];

  const dashboardSummary = document.getElementById('dashboard-summary');
  if (dashboardSummary) {
    dashboardSummary.innerHTML = summaryItems.map((item) => `
      <div class="summary-item" data-dashboard-section="${item.section}" role="button" tabindex="0" aria-label="Open ${item.label.toLowerCase()}">
        <span>${item.label}</span>
        <strong>${item.value}</strong>
      </div>
    `).join('');
  }

  const recentSales = visibleSales.slice(0, 5);
  const recentPurchases = visiblePurchases.slice(0, 5);
  const isPurchaseDashboard = role === 'purchase';
  document.getElementById('dashboard-recent-title').textContent = isPurchaseDashboard ? 'Recent Purchases' : 'Recent Orders';
  const recentViewAll = document.getElementById('dashboard-recent-view-all');
  recentViewAll.dataset.openSection = isPurchaseDashboard ? 'purchases' : 'sales';
  recentViewAll.textContent = isPurchaseDashboard ? 'View purchases' : 'View all';
  const recentActivity = document.getElementById('dashboard-recent-sales');
  const recentActivitySection = isPurchaseDashboard ? 'purchases' : 'sales';
  document.getElementById('dashboard-recent-total').textContent = formatCurrency((isPurchaseDashboard ? recentPurchases : recentSales).reduce((sum, entry) => sum + Number(entry.total || 0), 0));
  recentActivity.dataset.dashboardSection = recentActivitySection;
  recentActivity.setAttribute('role', 'button');
  recentActivity.tabIndex = 0;
  recentActivity.setAttribute('aria-label', `Open ${recentActivitySection}`);
  recentActivity.innerHTML = isPurchaseDashboard ? (recentPurchases.length ? `
    <div class="list-header"><span>Vendor</span><span>Date</span><span>Total</span><span>Recorded by</span></div>
    ${recentPurchases.map((purchase) => `<div class="list-row"><span>${escapeHtml(purchase.vendorName)}</span><span>${formatDate(purchase.createdAt)}</span><span>${formatCurrency(purchase.total)}</span><span>${escapeHtml(purchase.actorName || 'Admin')}</span></div>`).join('')}
  ` : '<div class="empty-state">No recent purchases.</div>') : (recentSales.length ? `
    <div class="list-header">
      <span>Order</span>
      <span>Customer</span>
      <span>Status</span>
      <span>Total</span>
    </div>
    ${recentSales.map((sale) => `
      <div class="list-row">
        <span>${escapeHtml(sale.receiptNo || sale.id)}</span>
        <span>${escapeHtml(sale.customerName || 'Walk-in Customer')}</span>
        <span>${escapeHtml(sale.status || 'Completed')}</span>
        <span>${formatCurrency(sale.total)}</span>
      </div>
    `).join('')}
  ` : '<div class="empty-state">No recent sales.</div>');
}

function renderWeeklySalesPie(days, total) {
  if (total <= 0) return '<div class="empty-state">No sales recorded in the last 7 days.</div>';

  const colors = ['#315ee1', '#22a06b', '#f0a43a', '#8b5cf6', '#e45858', '#0891b2', '#64748b'];
  const center = 100;
  const radius = 86;
  let angle = -Math.PI / 2;
  const slices = days.map((day, index) => {
    if (day.total <= 0) return '';
    const sliceAngle = (day.total / total) * Math.PI * 2;
    const endAngle = angle + sliceAngle;
    const startX = center + radius * Math.cos(angle);
    const startY = center + radius * Math.sin(angle);
    const endX = center + radius * Math.cos(endAngle);
    const endY = center + radius * Math.sin(endAngle);
    const path = sliceAngle >= Math.PI * 2 - 0.000001
      ? `<circle cx="${center}" cy="${center}" r="${radius}" fill="${colors[index]}" />`
      : `<path d="M ${center} ${center} L ${startX} ${startY} A ${radius} ${radius} 0 ${sliceAngle > Math.PI ? 1 : 0} 1 ${endX} ${endY} Z" fill="${colors[index]}" />`;
    const markup = `<g>${path}<title>${day.label}, ${day.dateLabel}: ${formatCurrency(day.total)} (${Math.round(day.total / total * 100)}%)</title></g>`;
    angle = endAngle;
    return markup;
  }).join('');
  const legend = days.map((day, index) => `
    <li class="weekly-sales-legend-item">
      <span class="weekly-sales-legend-color" style="--legend-color:${colors[index]}"></span>
      <span>${day.label} <small>${day.dateLabel}</small></span>
      <strong>${formatCurrency(day.total)}</strong>
    </li>
  `).join('');

  return `<div class="weekly-sales-content">
    <svg class="weekly-sales-pie" viewBox="0 0 200 200" role="img" aria-label="Pie chart of sales by day for the last 7 days">${slices}</svg>
    <ul class="weekly-sales-legend">${legend}</ul>
  </div>`;
}

function renderDashboardServiceOrders(ordersByType) {
  const cards = [
    { type: 'dine-in', countId: 'dashboard-dine-in-count', listId: 'dashboard-dine-in-orders' },
    { type: 'takeaway', countId: 'dashboard-takeaway-count', listId: 'dashboard-takeaway-orders' },
    { type: 'delivery', countId: 'dashboard-service-delivery-count', listId: 'dashboard-service-delivery-orders' }
  ];

  cards.forEach(({ type, countId, listId }) => {
    const orders = [...ordersByType[type]].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    document.getElementById(countId).textContent = String(orders.length);
    document.getElementById(listId).innerHTML = orders.length ? orders.map((sale) => {
      const items = (sale.items || []).map((item) => {
        const quantity = Number(item.qty || item.quantity || 0);
        return `${quantity} × ${escapeHtml(item.name || item.item_name || 'Menu item')}`;
      }).join(', ');
      const time = new Date(sale.createdAt);
      const timeLabel = Number.isNaN(time.getTime())
        ? 'Time unavailable'
        : time.toLocaleTimeString('en-UG', { hour: 'numeric', minute: '2-digit' });
      return `<article class="dashboard-order-entry">
        <div class="dashboard-order-entry-head"><strong>#${escapeHtml(sale.receiptNo || String(sale.id).slice(-6))}</strong><span>${formatCurrency(sale.total)}</span></div>
        <p>${escapeHtml(sale.customerName || 'Walk-in Customer')} · ${escapeHtml(timeLabel)}</p>
        <small>${escapeHtml(items || 'No item details')} · ${escapeHtml(sale.status || 'Completed')}</small>
      </article>`;
    }).join('') : '<p class="dashboard-order-empty">No orders</p>';
  });
}

function renderProductOptions() {
  const selectedSalesProduct = salesProductSelect.value;
  const selectedPurchaseProduct = purchaseProductSelect.value;
  const productOptions = state.products.map((product) => `<option value="${product.id}">${product.name} · ${product.stock} ${escapeHtml(product.unit || 'piece')} in stock</option>`).join('');
  const searchableOptions = state.products.map((product) => `<option value="${escapeHtml(product.name)}">${escapeHtml(product.sku || product.barcode || '')}</option>`).join('');
  salesProductOptions.innerHTML = searchableOptions;
  purchaseProductOptions.innerHTML = searchableOptions;
  const unitOptions = document.getElementById('unit-options');
  const availableUnits = new Set([
    ...Array.from(unitOptions.options, (option) => option.value),
    ...state.products.map((product) => product.unit || 'piece')
  ]);
  unitOptions.innerHTML = Array.from(availableUnits, (unit) => `<option value="${escapeHtml(unit)}"></option>`).join('');
  salesProductSelect.innerHTML = `<option value="">Select product</option>${productOptions}`;
  purchaseProductSelect.innerHTML = `<option value="">Select product</option>${productOptions}`;
  quotationProductSelect.innerHTML = `<option value="">Select product</option>${productOptions}`;

  const firstProductId = state.products[0]?.id || '';
  salesProductSelect.value = state.products.some((product) => product.id === selectedSalesProduct)
    ? selectedSalesProduct
    : firstProductId;
  purchaseProductSelect.value = state.products.some((product) => product.id === selectedPurchaseProduct)
    ? selectedPurchaseProduct
    : firstProductId;
  quotationProductSelect.value = quotationProductSelect.value || firstProductId;
  updateQuantityUnitLabels();
}

function findProductByBarcodeOrSku(value) {
  const normalizedValue = BarcodeScanner.normalizeBarcodeInput(value);
  const exactMatch = BarcodeScanner.findProductByBarcode(state.products, normalizedValue);
  if (exactMatch) return exactMatch;
  return state.products.find((entry) => [entry.barcode, entry.sku].some((code) => String(code || '').toLowerCase() === normalizedValue));
}

function updateScannerStatus(message, type = 'info') {
  const statusElement = document.getElementById('scanner-modal-status');
  if (!statusElement) return;
  statusElement.className = 'scanner-status';
  if (type === 'success') statusElement.classList.add('success');
  if (type === 'warning') statusElement.classList.add('warning');
  if (type === 'error') statusElement.classList.add('error');
  statusElement.textContent = message;
}

function openScannerSelection(context = 'sales') {
  scannerState.currentContext = BarcodeScanner.buildScannerContext(context);
  const modal = document.getElementById('barcode-scanner-modal');
  const title = document.getElementById('barcode-scanner-title');
  if (!modal || !title) return;
  modal.hidden = false;
  title.textContent = scannerState.currentContext === 'purchase' ? 'Scan Barcode - Purchases' : 'Scan Barcode - Sales';
  updateScannerStatus('Choose a scanning method to continue.', 'info');
}

function closeScannerSelection() {
  const modal = document.getElementById('barcode-scanner-modal');
  if (modal) modal.hidden = true;
}

function handleBarcode(barcode, context = 'sales') {
  const normalizedBarcode = BarcodeScanner.normalizeBarcodeInput(barcode);
  if (!BarcodeScanner.validateBarcode(normalizedBarcode)) {
    updateScannerStatus('Invalid barcode format. Please scan again.', 'error');
    return false;
  }

  const product = findProductByBarcodeOrSku(normalizedBarcode);
  if (!product) {
    updateScannerStatus('Product not found. Please create the product or scan a valid barcode.', 'warning');
    return false;
  }

  const targetContext = BarcodeScanner.buildScannerContext(context);
  if (targetContext === 'sales') {
    salesProductSelect.value = product.id;
    addSaleItem();
  } else {
    purchaseProductSelect.value = product.id;
    purchaseProductSearch.value = product.name;
    purchaseProductSelect.dispatchEvent(new Event('change'));
    purchaseQtyInput.value = purchaseQtyInput.value || '1';
    addPurchaseItem();
  }

  updateScannerStatus(`✓ Product added: ${product.name}`, 'success');
  return true;
}

function selectProductFromSearch(input, select) {
  const product = findProductFromSearchValue(input.value);
  if (product) {
    select.value = product.id;
    select.dispatchEvent(new Event('change'));
  }
}

function findProductFromSearchValue(value) {
  const query = String(value || '').trim().toLowerCase();
  if (!query) return null;
  const products = state.products.filter((product) => {
    const searchableValues = [product.name, product.sku, product.barcode]
      .filter(Boolean)
      .map((entry) => String(entry).trim().toLowerCase());
    return searchableValues.includes(query);
  });
  if (products.length === 1) return products[0];
  if (products.length > 1) return null;

  const partialMatches = state.products.filter((product) =>
    `${product.name} ${product.sku || ''} ${product.barcode || ''}`.toLowerCase().includes(query)
  );
  return partialMatches.length === 1 ? partialMatches[0] : null;
}

function renderCustomerOptions() {
  const selectedSaleCustomer = salesCustomerSelect.value || saleDraft.customerId;
  const guestOptions = state.customers.map((customer) => {
    const guestName = customer.name === 'Walk-in Customer' ? 'Walk-in Guest' : customer.name;
    return `<option value="${customer.id}">${escapeHtml(guestName)}${customer.phone ? ` · ${escapeHtml(customer.phone)}` : ''}</option>`;
  });
  if (!guestOptions.length) guestOptions.push('<option value="">Walk-in Guest</option>');
  salesCustomerSelect.innerHTML = guestOptions.join('');
  salesCustomerSelect.value = state.customers.some((customer) => customer.id === selectedSaleCustomer) ? selectedSaleCustomer : state.customers[0]?.id || '';
  saleDraft.customerId = salesCustomerSelect.value;
  quotationCustomerSelect.innerHTML = state.customers.map((customer) => `<option value="${customer.id}">${escapeHtml(customer.name)}</option>`).join('');
  quotationCustomerSelect.value = quotationCustomerSelect.value || state.customers[0]?.id || '';
  const currentMethod = ['Cash', 'Pesapal'].includes(salesPaymentMethod.value)
    ? salesPaymentMethod.value
    : ['Cash', 'Pesapal'].includes(saleDraft.paymentMethod) ? saleDraft.paymentMethod : 'Cash';
  salesPaymentMethod.innerHTML = '<option value="Cash">Cash</option><option value="Pesapal">Pesapal</option>';
  salesPaymentMethod.value = currentMethod;
  saleDraft.paymentMethod = currentMethod;
  renderPaymentDetails();
  salesPaymentMethod.value = saleDraft.paymentMethod;
}

function renderVendorOptions() {
  const options = state.vendors.map((vendor) => `<option value="${vendor.id}">${vendor.name}</option>`).join('');
  purchaseVendorSelect.innerHTML = `<option value="">Select vendor</option>${options}`;
  if (state.vendors.length) {
    purchaseVendorSelect.value = purchaseDraft.vendorId || state.vendors[0].id;
    purchaseDraft.vendorId = purchaseVendorSelect.value;
  }
}

function renderQuotationOptions() {
  quotationCustomerSelect.value = quotationCustomerSelect.value || state.customers[0]?.id || '';
}

function renderSalesOrderControls() {
  document.getElementById('sale-status-tag').textContent = saleDraft.items.length ? `${saleDraft.items.length} item${saleDraft.items.length === 1 ? '' : 's'}` : 'Draft';
}

function renderSalesMenu() {
  const categoriesBox = document.getElementById('sales-menu-categories');
  const productsBox = document.getElementById('sales-menu-products');
  const categorySelect = document.getElementById('sales-menu-category');
  if (!categoriesBox || !productsBox || !categorySelect) return;
  const categories = [...new Set(state.products.map((product) => String(product.category || '').trim()).filter(Boolean))].sort((a, b) => a.localeCompare(b));
  if (salesCategory !== '*' && !categories.includes(salesCategory)) salesCategory = '*';
  const search = document.getElementById('sales-menu-search').value.trim().toLowerCase();
  const topSearch = salesProductSearch.value.trim().toLowerCase();
  const query = search || topSearch;
  categorySelect.innerHTML = `<option value="*">All Categories</option>${categories.map((category) => `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`).join('')}`;
  categorySelect.value = salesCategory;
  categoriesBox.innerHTML = `<button class="sales-category-option ${salesCategory === '*' ? 'active' : ''}" type="button" data-menu-category="*">All items <span>${state.products.length}</span></button>${categories.map((category) => {
    const count = state.products.filter((product) => product.category === category).length;
    return `<button class="sales-category-option ${salesCategory === category ? 'active' : ''}" type="button" data-menu-category="${escapeHtml(category)}">${menuCategoryIcon(category)} ${escapeHtml(category)} <span>${count}</span></button>`;
  }).join('')}`;
  categoriesBox.querySelectorAll('[data-menu-category]').forEach((button) => {
    button.addEventListener('click', () => {
      salesCategory = button.dataset.menuCategory;
      renderSalesMenu();
    });
  });
  const visible = state.products.filter((product) =>
    (salesCategory === '*' || product.category === salesCategory) &&
    (!query || `${product.name} ${product.category} ${product.sku || ''}`.toLowerCase().includes(query))
  );
  salesProductOptions.innerHTML = state.products.map((product) => `<option value="${escapeHtml(product.name)}">${escapeHtml(product.category || '')}</option>`).join('');
  productsBox.innerHTML = visible.length ? visible.map((product, index) => {
    const unavailable = Number(product.stock || 0) <= 0;
    return `<article class="sales-menu-card ${unavailable ? 'unavailable' : ''}">
      <img src="${menuProductImage(product, index)}" alt="" loading="lazy" />
      <div class="sales-menu-card-info"><span class="sales-menu-card-category">${escapeHtml(product.category || 'Menu item')}</span><strong>${escapeHtml(product.name)}</strong><span class="sales-menu-card-stock">${unavailable ? 'Out of stock' : `${Number(product.stock)} ${escapeHtml(product.unit || 'piece')} available`}</span>
      <div class="sales-menu-card-bottom"><strong>${formatCurrency(product.sellingPrice)}</strong><button type="button" data-add-menu-item="${escapeHtml(product.id)}" ${unavailable ? 'disabled' : ''}>${unavailable ? 'Unavailable' : '＋ Add'}</button></div></div>
    </article>`;
  }).join('') : '<div class="empty-state">No menu items match this category or search.</div>';
  productsBox.querySelectorAll('[data-add-menu-item]').forEach((button) => {
    button.addEventListener('click', () => {
      salesProductSelect.value = button.dataset.addMenuItem;
      addSaleItem();
    });
  });
}

function renderSalesSummary() {
  const { subtotal, discount, tax, total } = getSaleDraftTotals();

  salesSubtotal.textContent = formatCurrency(subtotal);
  salesDiscountTotal.textContent = formatCurrency(discount);
  document.getElementById('sales-tax-total').textContent = formatCurrency(tax);
  document.getElementById('sales-tax-row').hidden = tax <= 0;
  salesGrandTotal.textContent = formatCurrency(total);
  document.getElementById('pesapal-pay-total').textContent = formatCurrency(total);
  document.getElementById('cash-pay-total').textContent = formatCurrency(total);
  document.getElementById('pay-with-pesapal').disabled = saleDraft.items.length === 0;
  document.getElementById('pay-with-cash').disabled = saleDraft.items.length === 0;

  salesCartBox.innerHTML = saleDraft.items.length ? `
    <div class="list-header">
      <span>Item</span>
      <span>Qty</span>
      <span>Price</span>
      <span>Total</span>
      <span></span>
    </div>
    ${saleDraft.items.map((item) => `
      <div class="list-row">
        <span class="item-name">${item.name}</span>
        <span>${item.qty} ${escapeHtml(item.unit || getProductUnit(item.productId))}</span>
        <span>${formatCurrency(item.price)}</span>
        <span>${formatCurrency(item.total)}</span>
        <button class="small-btn delete" data-remove-sale-item="${item.productId}">Remove</button>
      </div>
    `).join('')}
  ` : '<div class="empty-state">No items yet in this sale.</div>';

  salesCartBox.querySelectorAll('[data-remove-sale-item]').forEach((button) => {
    button.addEventListener('click', () => {
      const targetId = button.dataset.removeSaleItem;
      saleDraft.items = saleDraft.items.filter((item) => item.productId !== targetId);
      renderSalesSummary();
    });
  });

  const currentUser = getCurrentUser();
  const salesQuery = salesHistorySearch.value.trim().toLowerCase();
  const typeFilter = document.getElementById('orders-type-filter').value;
  const selectedDate = document.getElementById('orders-date-filter').value;
  const visibleSales = getVisibleSales()
    .filter((sale) => !salesQuery || `${sale.receiptNo} ${sale.customerName} ${sale.paymentMethod} ${sale.cashierName}`.toLowerCase().includes(salesQuery))
    .filter((sale) => !typeFilter || sale.status === typeFilter)
    .filter((sale) => !selectedDate || (sale.createdAt || '').startsWith(selectedDate))
    .filter((sale) => !orderStatusFilter || sale.status === orderStatusFilter);
  document.getElementById('sales-history-total').textContent = formatCurrency(visibleSales.reduce((sum, sale) => sum + Number(sale.total || 0), 0));
  const history = visibleSales.map((sale) => {
    const orderStatus = sale.status === 'Completed' ? 'Completed' : sale.status || 'Pending';
    const orderType = sale.orderType === 'delivery' || sale.requiresDelivery
      ? 'Delivery'
      : sale.orderType === 'takeaway' ? 'Takeaway' : 'Dine in';
    const itemCount = (sale.items || []).reduce((sum, item) => sum + Number(item.qty || item.quantity || 0), 0);
    return `<div class="orders-list-row">
      <span><strong>#${escapeHtml(sale.receiptNo || String(sale.id).slice(-6))}</strong><small>${formatDate(sale.createdAt)}</small></span>
      <span>${escapeHtml(sale.customerName || 'Walk-in Customer')}</span>
      <span>${itemCount} item${itemCount === 1 ? '' : 's'}</span>
      <span>${escapeHtml(orderType)}</span>
      <span>${formatCurrency(sale.total)}</span>
      <span><span class="order-status-badge status-${escapeHtml(orderStatus.toLowerCase())}">${escapeHtml(orderStatus)}</span></span>
      <span>${escapeHtml(sale.paymentMethod || '—')}</span>
      ${currentUser?.role === 'admin' ? `<span class="action-controls"><button class="small-btn success" data-return-sale="${escapeHtml(sale.id)}">Return</button></span>` : '<span>—</span>'}
    </div>`;
  }).join('');

  salesHistoryBox.innerHTML = visibleSales.length ? `
    <div class="orders-list-header">
      <span>Order</span><span>Customer</span><span>Items</span><span>Type</span><span>Total</span><span>Status</span><span>Payment</span><span>Action</span>
    </div>
    ${history}
  ` : '<div class="empty-state">No orders recorded yet.</div>';

  salesHistoryBox.querySelectorAll('[data-return-sale]').forEach((button) => {
    button.addEventListener('click', () => {
      const saleId = button.dataset.returnSale;
      returnSale(saleId);
    });
  });

  document.getElementById('sale-status-tag').textContent = saleDraft.items.length
    ? `Draft · ${saleDraft.items.length} item${saleDraft.items.length === 1 ? '' : 's'}`
    : 'Draft';
}

function renderInvoices() {
  const completedSales = getVisibleSales().filter((sale) => sale.status === 'Completed');
  const query = invoiceSearch.value.trim().toLowerCase();
  const filteredSales = completedSales.filter((sale) =>
    !query || `${sale.receiptNo} ${sale.customerName} ${sale.paymentMethod} ${sale.cashierName}`.toLowerCase().includes(query)
  );
  const invoicedTotal = completedSales.reduce((sum, sale) => sum + Number(sale.total || 0), 0);
  const filteredTotal = filteredSales.reduce((sum, sale) => sum + Number(sale.total || 0), 0);
  const latestSale = [...completedSales].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];

  document.getElementById('invoice-count').textContent = String(completedSales.length);
  document.getElementById('invoice-total').textContent = formatCurrency(invoicedTotal);
  document.getElementById('invoice-list-count').textContent = `${filteredSales.length} of ${completedSales.length} invoices`;
  document.getElementById('invoice-list-total').textContent = formatCurrency(filteredTotal);
  document.getElementById('invoice-latest-details').innerHTML = latestSale ? `
    <div class="total-row"><span>Invoice Number</span><strong>${latestSale.receiptNo}</strong></div>
    <div class="total-row"><span>Customer</span><strong>${latestSale.customerName || 'Walk-in customer'}</strong></div>
    <div class="total-row"><span>Invoice Date</span><strong>${formatDate(latestSale.createdAt)}</strong></div>
    <div class="total-row"><span>Payment Method</span><strong>${latestSale.paymentMethod || 'Not recorded'}</strong></div>
    <div class="total-row grand"><span>Invoice Total</span><strong>${formatCurrency(latestSale.total)}</strong></div>
    <div class="action-row"><button class="primary" data-invoice-sale="${latestSale.id}">View / Print Latest Invoice</button></div>
  ` : '<div class="empty-state">No completed sales to invoice yet.</div>';
  invoiceListBox.innerHTML = filteredSales.length ? `
    <div class="list-header">
      <span>Invoice</span>
      <span>Customer</span>
      <span>Date</span>
      <span>Total</span>
      <span>Action</span>
    </div>
    ${filteredSales.map((sale) => `
      <div class="list-row">
        <span><strong>${sale.receiptNo}</strong><br><span class="text-muted">${sale.paymentMethod || 'Payment not recorded'}</span></span>
        <span>${sale.customerName || 'Walk-in customer'}</span>
        <span>${formatDate(sale.createdAt)}</span>
        <span>${formatCurrency(sale.total)}</span>
        <span class="action-controls"><button class="small-btn primary" data-invoice-sale="${sale.id}">View / Print</button></span>
      </div>
    `).join('')}
  ` : `<div class="empty-state">${completedSales.length ? 'No invoices match your search.' : 'No completed sales to invoice yet.'}</div>`;
}

function renderPurchases() {
  const total = purchaseDraft.items.reduce((sum, item) => sum + item.total, 0);
  purchaseGrandTotal.textContent = formatCurrency(total);

  purchaseCartBox.innerHTML = purchaseDraft.items.length ? `
    <div class="list-header">
      <span>Item</span>
      <span>Qty</span>
      <span>Price</span>
      <span>Total</span>
      <span></span>
    </div>
    ${purchaseDraft.items.map((item) => `
      <div class="list-row">
        <span class="item-name">${item.name}</span>
        <span>${item.qty} ${escapeHtml(item.unit || getProductUnit(item.productId))}</span>
        <span>${formatCurrency(item.buyingPrice)}<br><span class="text-muted">Sell: ${formatCurrency(item.sellingPrice)}</span></span>
        <span>${formatCurrency(item.total)}</span>
        <span><span class="text-muted">Exp: ${formatShortDate(item.expiryDate)}</span><br><button class="small-btn delete" data-remove-purchase-item="${item.productId}">Remove</button></span>
      </div>
    `).join('')}
  ` : '<div class="empty-state">No purchase items yet.</div>';

  purchaseCartBox.querySelectorAll('[data-remove-purchase-item]').forEach((button) => {
    button.addEventListener('click', () => {
      const targetId = button.dataset.removePurchaseItem;
      purchaseDraft.items = purchaseDraft.items.filter((item) => item.productId !== targetId);
      renderPurchases();
    });
  });

  const currentUser = getCurrentUser();
  const purchaseQuery = purchaseHistorySearch.value.trim().toLowerCase();
  const visiblePurchases = getVisiblePurchases().filter((purchase) => !purchaseQuery || `${purchase.vendorName} ${purchase.actorName} ${purchase.items.map((item) => item.name).join(' ')}`.toLowerCase().includes(purchaseQuery));
  document.getElementById('purchase-history-total').textContent = formatCurrency(visiblePurchases.reduce((sum, purchase) => sum + Number(purchase.total || 0), 0));
  purchaseHistoryBox.innerHTML = visiblePurchases.length ? `
    <div class="list-header">
      <span>Vendor</span>
      <span>Date</span>
      <span>Total</span>
      <span>Recorded by</span>
    </div>
    ${visiblePurchases.map((purchase) => `
      <div class="list-row">
        <span>${purchase.vendorName}</span>
        <span>${formatDate(purchase.createdAt)}</span>
        <span>${formatCurrency(purchase.total)}</span>
        <span>${purchase.actorName || 'Admin'} · ${purchase.items.length} item(s)</span>
      </div>
    `).join('')}
  ` : '<div class="empty-state">No supplier purchases recorded.</div>';
}

function getQuotationStatus(quotation) {
  if (quotation.expiryDate < dateISO() && !quotation.convertedSaleId && (quotation.status === 'Draft' || quotation.status === 'Sent')) return 'Expired';
  if (quotation.status === 'Draft' || quotation.status === 'Sent' || quotation.status === 'Accepted' || quotation.status === 'Rejected') return quotation.status;
  return 'Expired';
}

function renderQuotations() {
  if (!quotationListBox) return;
  const query = quotationSearch.value.trim().toLowerCase();
  const visible = state.quotations.filter((quotation) => `${quotation.quotationNo} ${quotation.customerName}`.toLowerCase().includes(query));
  document.getElementById('quotation-count').textContent = `${visible.length} quotation${visible.length === 1 ? '' : 's'}`;
  document.getElementById('quotation-list-total').textContent = formatCurrency(visible.reduce((sum, quotation) => sum + Number(quotation.total || 0), 0));
  quotationListBox.innerHTML = visible.length ? `<div class="list-header"><span>Quotation</span><span>Customer</span><span>Valid Until</span><span>Total</span><span>Status / Actions</span></div>${visible.map((quotation) => {
    const status = getQuotationStatus(quotation);
    const canConvert = status === 'Accepted' && !quotation.convertedSaleId;
    return `<div class="list-row"><span><strong>${escapeHtml(quotation.quotationNo)}</strong><br><span class="text-muted">${formatShortDate(quotation.quotationDate)}</span></span><span>${escapeHtml(quotation.customerName)}</span><span>${formatShortDate(quotation.expiryDate)}</span><span>${formatCurrency(quotation.total)}</span><span class="action-controls"><span class="muted">${status}</span><button class="small-btn" data-quote-action="view" data-quote-id="${quotation.id}">View</button><button class="small-btn" data-quote-action="edit" data-quote-id="${quotation.id}">Edit</button><button class="small-btn" data-quote-action="print" data-quote-id="${quotation.id}">Print</button>${status === 'Draft' ? `<button class="small-btn success" data-quote-action="status" data-quote-status="Sent" data-quote-id="${quotation.id}">Send</button>` : ''}${status === 'Sent' ? `<button class="small-btn success" data-quote-action="status" data-quote-status="Accepted" data-quote-id="${quotation.id}">Accept</button><button class="small-btn delete" data-quote-action="status" data-quote-status="Rejected" data-quote-id="${quotation.id}">Reject</button>` : ''}${canConvert ? `<button class="small-btn success" data-quote-action="convert" data-quote-id="${quotation.id}">Convert to Sale</button>` : ''}</span></div>`;
  }).join('')}` : '<div class="empty-state">No quotations match your search.</div>';
}

function handleQuotationAction(event) {
  const button = event.target.closest('[data-quote-action]');
  if (!button) return;
  const quotation = state.quotations.find((entry) => entry.id === button.dataset.quoteId);
  if (!quotation) return;
  const action = button.dataset.quoteAction;
  if (action === 'status') {
    apiRequest(`/quotations/${quotation.id}/status`, { method: 'PATCH', body: JSON.stringify({ status: button.dataset.quoteStatus }) }).then(async () => {
      await refreshServerState();
      renderQuotations();
    }).catch((error) => alert(error.message || 'Quotation status could not be saved.'));
  } else if (action === 'view' || action === 'print') {
    printDocumentRecord(quotation, 'Quotation', action === 'print');
  } else if (action === 'edit') {
    editQuotation(quotation);
  } else if (action === 'convert') {
    convertQuotationToSale(quotation);
  }
}

function editQuotation(quotation) {
  if (quotation.status !== 'Draft') {
    alert('Only draft quotations can be edited.');
    return;
  }
  quotationCustomerSelect.value = quotation.customerId;
  document.getElementById('quotation-date').value = quotation.quotationDate;
  document.getElementById('quotation-expiry').value = quotation.expiryDate;
  document.getElementById('quotation-discount').value = quotation.discount;
  document.getElementById('quotation-tax').value = quotation.taxRate;
  document.getElementById('quotation-notes').value = quotation.notes || '';
  quotationDraft.items = quotation.items.map((item) => ({ ...item }));
  quotationDraft.editingId = quotation.id;
  renderQuotationDraft();
  renderQuotations();
}

function convertQuotationToSale(quotation) {
  if (quotation.status !== 'Accepted' || quotation.convertedSaleId) return;
  if (!confirm(`Convert ${quotation.quotationNo} to a sale? Inventory will be reduced when the sale is completed.`)) return;
  saleDraft.items = quotation.items.map((item) => ({ productId: item.productId, name: item.name, unit: item.unit || getProductUnit(item), qty: item.qty, price: item.price, total: item.total }));
  saleDraft.customerId = quotation.customerId;
  saleDraft.discount = quotation.discount;
  saleDraft.taxRate = quotation.taxRate || 0;
  salesDiscountInput.value = quotation.discount;
  salesPaymentMethod.value = 'Cash';
  saleDraft.paymentMethod = 'Cash';
  showSection('sales', '🛒 Sales');
  renderSalesSummary();
  document.getElementById('complete-sale').dataset.quotationId = quotation.id;
}

function printDocumentRecord(record, title, printImmediately) {
  if (title === 'Quotation') {
    printQuotationRecord(record, printImmediately);
    return;
  }
  const rows = record.items.map((item) => `<tr><td>${escapeHtml(item.name)}</td><td>${item.qty} ${escapeHtml(item.unit || getProductUnit(item))}</td><td>${formatCurrency(item.price || item.cost)}</td><td>${formatCurrency(item.total)}</td></tr>`).join('');
  const printWindow = window.open('', '_blank', 'width=900,height=700');
  if (!printWindow) return alert('Please allow pop-ups to view or print this document.');
  printWindow.document.write(`<!doctype html><html><head><title>${escapeHtml(title)} ${escapeHtml(record.quotationNo || record.invoiceNo)}</title><style>body{font-family:Arial,sans-serif;padding:24px;color:#18212f}table{width:100%;border-collapse:collapse;margin-top:20px}th,td{border:1px solid #dfe8f5;padding:8px;text-align:left}th{background:#eef4ff}</style></head><body><h1>${escapeHtml(state.business.name)}</h1><h2>${escapeHtml(title)} ${escapeHtml(record.quotationNo || record.invoiceNo)}</h2><p>${escapeHtml(record.customerName || record.vendorName)} · Total: ${formatCurrency(record.total)}</p><table><thead><tr><th>Item</th><th>Qty</th><th>Unit price</th><th>Total</th></tr></thead><tbody>${rows}</tbody></table><p>${escapeHtml(record.notes || '')}</p>${printImmediately ? '<script>window.onload=function(){window.print();};</script>' : ''}</body></html>`);
  printWindow.document.close();
}



function printQuotationRecord(quotation, printImmediately) {
  const printWindow = window.open('', '_blank', 'width=900,height=1050');
  if (!printWindow) return alert('Please allow pop-ups to view or print this quotation.');

  const customer = state.customers.find((entry) => entry.id === quotation.customerId);
  const preparedBy = getCurrentUser();
  const subtotal = Number(quotation.subtotal ?? quotation.items.reduce((sum, item) => sum + Number(item.total || 0), 0));
  const discount = Number(quotation.discount || 0);
  const tax = Number(quotation.tax || 0);
  const taxRate = Number(quotation.taxRate || 0);
  const shipping = Number(quotation.shippingCost || 0);
  const items = quotation.items.map((item) => `
    <tr>
      <td>${escapeHtml(item.name)}</td>
      <td class="center">${Number(item.qty || 0).toLocaleString('en-US')} ${escapeHtml(item.unit || getProductUnit(item))}</td>
      <td class="number">${formatCurrency(item.price)}</td>
      <td class="number">${formatCurrency(item.total)}</td>
    </tr>`).join('');
  const totalRows = [
    `<tr><th colspan="3">Subtotal</th><td class="number">${formatCurrency(subtotal)}</td></tr>`,
    ...(discount > 0 ? [`<tr><th colspan="3">Discount</th><td class="number">-${formatCurrency(discount)}</td></tr>`] : []),
    `<tr><th colspan="3">Tax${taxRate > 0 ? ` (${taxRate}%)` : ''}</th><td class="number">${formatCurrency(tax)}</td></tr>`,
    ...(shipping > 0 ? [`<tr><th colspan="3">Shipping Cost</th><td class="number">${formatCurrency(shipping)}</td></tr>`] : []),
    `<tr class="grand-total"><th colspan="3">Total Amount</th><td class="number">${formatCurrency(quotation.total)}</td></tr>`
  ].join('');
  const businessLines = [state.business.address, state.business.phone ? `Phone: ${state.business.phone}` : '', state.business.email ? `Email: ${state.business.email}` : ''].filter(Boolean);
  const customerLines = [customer?.address, customer?.phone ? `Phone: ${customer.phone}` : '', customer?.email ? `Email: ${customer.email}` : ''].filter(Boolean);
  const terms = String(quotation.notes || `This quotation is valid until ${formatShortDate(quotation.expiryDate)}.`)
    .split(/\r?\n/)
    .map((term) => term.trim())
    .filter(Boolean);

  printWindow.document.write(`<!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Sales Quotation ${escapeHtml(quotation.quotationNo)}</title>
        <style>
          @page { size: A4 portrait; margin: 0; }
          * { box-sizing: border-box; }
          body { margin: 0; color: #171717; font: 13px/1.45 Arial, Helvetica, sans-serif; }
          .quotation-backdrop { position: relative; min-height: 100vh; padding: 7vh 9vw; overflow: hidden; background: #fff; }
          .quotation-backdrop::before, .quotation-backdrop::after { position: absolute; z-index: 0; content: ""; pointer-events: none; }
          .quotation-backdrop::before { inset: 0 0 auto auto; width: 48%; height: 42%; background: #ddc4ab; clip-path: polygon(45% 0, 100% 0, 100% 100%, 0 20%); }
          .quotation-backdrop::after { inset: auto auto 0 0; width: 48%; height: 33%; background: #eab17e; clip-path: polygon(0 10%, 100% 100%, 0 100%); }
          .quotation-sheet { position: relative; z-index: 1; width: 100%; max-width: 180mm; min-height: 86vh; margin: 0 auto; padding: 12mm 9mm 10mm; border: 2px solid #80552f; background: #fff; }
          h1 { margin: 0 0 9px; color: #80552f; font-size: 29px; line-height: 1.15; text-align: center; text-transform: uppercase; }
          .quotation-meta { margin: 0; font-weight: 700; text-align: center; }
          .quotation-parties { display: flex; justify-content: space-between; gap: 24px; margin: 22px 0 24px; }
          .quotation-party { max-width: 48%; overflow-wrap: anywhere; }
          .quotation-party:last-child { text-align: right; }
          .quotation-party strong, .quotation-party span { display: block; }
          .quotation-section-title { margin: 0 0 6px; font-weight: 700; text-transform: uppercase; }
          table { width: 100%; border-collapse: collapse; }
          th, td { padding: 7px 6px; border: 1px solid #36302b; }
          thead th { background: #ead7c5; text-align: center; }
          tbody td { height: 31px; }
          .center { text-align: center; }
          .number { text-align: right; white-space: nowrap; }
          tfoot th { width: 75%; background: #ead7c5; font-weight: 400; text-align: center; }
          tfoot td { width: 25%; }
          tfoot .grand-total th, tfoot .grand-total td { font-weight: 700; }
          .terms { margin-top: 20px; }
          .terms ul { margin: 0; padding-left: 18px; }
          .signatures { display: flex; justify-content: space-between; gap: 24px; margin-top: 22px; }
          .signature { display: flex; flex: 1; min-height: 90px; flex-direction: column; justify-content: space-between; }
          .signature:last-child { text-align: right; }
          .signature-name { font-weight: 700; }
          .signature-role { color: #444; }
          @media screen and (max-width: 650px) {
            .quotation-backdrop { padding: 16px 10px; }
            .quotation-sheet { min-height: 0; padding: 25px 16px; }
            h1 { font-size: 23px; }
            .quotation-parties { gap: 12px; }
            th, td { padding: 6px 4px; font-size: 11px; }
          }
          @media print {
            html, body { width: 210mm; min-height: 297mm; }
            .quotation-backdrop { width: 210mm; min-height: 297mm; padding: 20mm 19mm 14mm; print-color-adjust: exact; -webkit-print-color-adjust: exact; }
            .quotation-sheet { width: 100%; max-width: none; min-height: 263mm; padding: 13mm 8mm 10mm; }
          }
        </style>
      </head>
      <body>
        <main class="quotation-backdrop">
          <article class="quotation-sheet">
            <header>
              <h1>Sales Quotation</h1>
              <p class="quotation-meta">Quotation Number: ${escapeHtml(quotation.quotationNo)}</p>
              <p class="quotation-meta">Date: ${escapeHtml(formatShortDate(quotation.quotationDate))}</p>
              <p class="quotation-meta">Valid Until: ${escapeHtml(formatShortDate(quotation.expiryDate))}</p>
            </header>
            <section class="quotation-parties" aria-label="Quotation parties">
              <div class="quotation-party">
                <strong>From:</strong>
                <strong>${escapeHtml(state.business.name)}</strong>
                ${businessLines.map((line) => `<span>${escapeHtml(line)}</span>`).join('')}
              </div>
              <div class="quotation-party">
                <strong>To:</strong>
                <strong>${escapeHtml(quotation.customerName)}</strong>
                ${customerLines.map((line) => `<span>${escapeHtml(line)}</span>`).join('')}
              </div>
            </section>
            <section>
              <p class="quotation-section-title">Itemized Quotation Details:</p>
              <table>
                <thead><tr><th>Item Description</th><th>Quantity</th><th>Unit Price (${escapeHtml(state.business.currency || 'UGX')})</th><th>Total Price (${escapeHtml(state.business.currency || 'UGX')})</th></tr></thead>
                <tbody>${items}</tbody>
                <tfoot>${totalRows}</tfoot>
              </table>
            </section>
            <section class="terms">
              <p class="quotation-section-title">Terms and Conditions:</p>
              <ul>${terms.map((term) => `<li>${escapeHtml(term)}</li>`).join('')}</ul>
            </section>
            <footer class="signatures">
              <div class="signature">
                <span>Prepared By:</span>
                <div><span class="signature-name">${escapeHtml(preparedBy?.displayName || state.business.name)}</span><br><span class="signature-role">${escapeHtml(preparedBy ? formatRole(preparedBy.role) : '')}</span></div>
              </div>
              <div class="signature">
                <span>Approved By:</span>
                <div><span class="signature-name">${escapeHtml(quotation.customerName)}</span></div>
              </div>
            </footer>
          </article>
        </main>
        ${printImmediately ? '<script>window.onload=function(){window.print();};</script>' : ''}
      </body>
    </html>`);
  printWindow.document.close();
}

function renderCustomers() {
  const filter = customerSearch.value.trim().toLowerCase();
  const filtered = state.customers.filter((customer) => {
    const haystack = `${customer.name} ${customer.phone}`.toLowerCase();
    return haystack.includes(filter);
  });
  document.getElementById('customer-total').textContent = formatCurrency(filtered.reduce((sum, customer) => sum + Number(customer.balance || 0), 0));

  customerListBox.innerHTML = filtered.length ? `
    <div class="list-header">
      <span>Customer</span>
      <span>Phone</span>
      <span>Balance</span>
      <span>Action</span>
    </div>
    ${filtered.map((customer) => `
      <div class="list-row">
        <span>
          <strong>${customer.name}</strong><br>
          <span class="text-muted">${customer.type || 'Physical'} · Total purchases: ${formatCurrency(customer.totalPurchases || 0)}</span>
        </span>
        <span>${customer.phone || '—'}</span>
        <span>${formatCurrency(customer.balance || 0)}</span>
        <span class="action-controls">
          <button class="small-btn edit" data-edit-customer="${customer.id}">Edit</button>
          <button class="small-btn delete" data-delete-customer="${customer.id}">Delete</button>
        </span>
      </div>
    `).join('')}
  ` : '<div class="empty-state">No customer found.</div>';

  const creditQuery = creditSearch.value.trim().toLowerCase();
  const visibleCreditAccounts = state.creditAccounts.filter((account) => !creditQuery || `${account.name} ${account.phone} ${account.status}`.toLowerCase().includes(creditQuery));
  creditAccountsListBox.innerHTML = visibleCreditAccounts.length ? `
    <div class="list-header">
      <span>Credit Customer</span>
      <span>Balance</span>
      <span>Due / Limit</span>
      <span>Status</span>
    </div>
    ${visibleCreditAccounts.map((account) => `
      <div class="list-row">
        <span><strong>${escapeHtml(account.name)}</strong><br><span class="text-muted">${escapeHtml(account.phone)}</span></span>
        <span>${formatCurrency(account.balance)}</span>
        <span>${formatShortDate(account.dueDate)}<br><span class="text-muted">Limit: ${formatCurrency(account.creditLimit || 0)}</span></span>
        <span>${escapeHtml(account.status || 'Open')}</span>
      </div>
    `).join('')}
  ` : '<div class="empty-state">No credit accounts match your search.</div>';
  document.getElementById('credit-total').textContent = formatCurrency(visibleCreditAccounts.reduce((sum, account) => sum + Number(account.balance || 0), 0));

  customerListBox.querySelectorAll('[data-edit-customer]').forEach((button) => {
    button.addEventListener('click', () => {
      const customer = state.customers.find((entry) => entry.id === button.dataset.editCustomer);
      if (!customer) return;
      document.getElementById('customer-id').value = customer.id;
      document.getElementById('customer-name').value = customer.name;
      document.getElementById('customer-phone').value = customer.phone || '';
      document.getElementById('customer-type').value = customer.type || 'Physical';
      document.getElementById('customer-name').readOnly = customer.type === 'Physical';
      document.getElementById('customer-name').required = customer.type !== 'Physical';
      document.getElementById('customer-balance').value = customer.balance || 0;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  customerListBox.querySelectorAll('[data-delete-customer]').forEach((button) => {
    button.addEventListener('click', () => {
      const id = button.dataset.deleteCustomer;
      if (!confirm('Delete this customer?')) return;
      apiRequest(`/customers/${id}`, { method: 'DELETE' }).then(() => {
        state.customers = state.customers.filter((entry) => entry.id !== id);
        renderAll();
      }).catch((error) => alert(error.message || 'Customer could not be deactivated.'));
    });
  });
}

function renderVendors() {
  const filter = vendorSearch.value.trim().toLowerCase();
  const filtered = state.vendors.filter((vendor) => `${vendor.name} ${vendor.phone} ${vendor.email} ${vendor.products}`.toLowerCase().includes(filter));
  document.getElementById('vendor-total').textContent = formatCurrency(filtered.reduce((sum, vendor) => sum + Number(vendor.amountOwed || 0), 0));

  vendorListBox.innerHTML = filtered.length ? `
    <div class="list-header">
      <span>Vendor</span>
      <span>Phone</span>
      <span>Owed</span>
      <span>Action</span>
    </div>
    ${filtered.map((vendor) => `
      <div class="list-row">
        <span>
            <strong>${escapeHtml(vendor.name)}</strong><br>
            <span class="text-muted">${escapeHtml(vendor.email || 'No email')}</span>
        </span>
          <span>${escapeHtml(vendor.phone || '—')}<br><span class="text-muted">${escapeHtml(vendor.products || 'Products not listed')}</span></span>
        <span>${formatCurrency(vendor.amountOwed || 0)}</span>
        <span class="action-controls">
          <button class="small-btn edit" data-edit-vendor="${vendor.id}">Edit</button>
          <button class="small-btn delete" data-delete-vendor="${vendor.id}">Delete</button>
        </span>
      </div>
    `).join('')}
  ` : '<div class="empty-state">No vendor found.</div>';

  vendorListBox.querySelectorAll('[data-edit-vendor]').forEach((button) => {
    button.addEventListener('click', () => {
      const vendor = state.vendors.find((entry) => entry.id === button.dataset.editVendor);
      if (!vendor) return;
      document.getElementById('vendor-id').value = vendor.id;
      document.getElementById('vendor-name').value = vendor.name;
      document.getElementById('vendor-phone').value = vendor.phone || '';
      document.getElementById('vendor-email').value = vendor.email || '';
      document.getElementById('vendor-products').value = vendor.products || '';
      document.getElementById('vendor-owed').value = vendor.amountOwed || 0;
      document.getElementById('supplier-modal-title').textContent = 'Edit Supplier';
      document.getElementById('supplier-modal').hidden = false;
    });
  });

  vendorListBox.querySelectorAll('[data-delete-vendor]').forEach((button) => {
    button.addEventListener('click', () => {
      const id = button.dataset.deleteVendor;
      if (!confirm('Delete this vendor?')) return;
      apiRequest(`/suppliers/${id}`, { method: 'DELETE' }).then(() => {
        state.vendors = state.vendors.filter((entry) => entry.id !== id);
        renderAll();
      }).catch((error) => alert(error.message || 'Supplier could not be deactivated.'));
    });
  });
}

function switchMenuTab(tab) {
  activeMenuTab = tab;
  const itemsTabBtn = document.getElementById('menu-tab-items');
  const catTabBtn = document.getElementById('menu-tab-categories');
  const itemsView = document.getElementById('menu-items-view');
  const catView = document.getElementById('menu-categories-view');

  if (itemsTabBtn) {
    itemsTabBtn.classList.toggle('active', tab === 'items');
    itemsTabBtn.setAttribute('aria-selected', String(tab === 'items'));
  }
  if (catTabBtn) {
    catTabBtn.classList.toggle('active', tab === 'categories');
    catTabBtn.setAttribute('aria-selected', String(tab === 'categories'));
  }
  if (itemsView) itemsView.hidden = tab !== 'items';
  if (catView) catView.hidden = tab !== 'categories';
}

function renderMenuCatalog() {
  const canManageInventory = hasRole('admin', 'purchase');
  const addBtn = document.getElementById('menu-add-item');
  if (addBtn) addBtn.hidden = !canManageInventory;

  switchMenuTab(activeMenuTab || 'items');

  // Category filters panel
  const categoryFiltersBox = document.getElementById('menu-category-filters');
  if (categoryFiltersBox) {
    const categories = getMenuCategoryGroups();

    const isAllActive = selectedMenuCategory === '*';
    const allCount = state.products.length;

    let html = `
      <button class="menu-category-chip ${isAllActive ? 'active' : ''}" type="button" data-menu-category="*">
        <span class="menu-category-chip-left">
          <span class="menu-category-chip-icon">🗂</span>
          <span>All Items</span>
        </span>
        <span class="menu-category-chip-count">${allCount}</span>
      </button>
    `;

    categories.forEach((category) => {
      const cfg = MENU_CATEGORY_CONFIG[category.label] || { icon: menuCategoryIcon(category.label), color: '#8b5cf6' };
      const isActive = selectedMenuCategory === category.key;
      html += `
        <button class="menu-category-chip ${isActive ? 'active' : ''}" type="button" data-menu-category="${escapeHtml(category.key)}" style="--cat-accent: ${cfg.color};" aria-label="${escapeHtml(category.label)} menu items">
          <span class="menu-category-chip-stripe"></span>
          <span class="menu-category-chip-left">
            <span class="menu-category-chip-icon">${cfg.icon}</span>
            <span>${escapeHtml(category.label)}</span>
          </span>
          <span class="menu-category-chip-count">${category.count}</span>
        </button>
      `;
    });

    categoryFiltersBox.innerHTML = html;

    categoryFiltersBox.querySelectorAll('[data-menu-category]').forEach((button) => {
      button.addEventListener('click', () => {
        selectedMenuCategory = button.dataset.menuCategory;
        renderMenuCatalog();
      });
    });
  }

  // Filter products for the products grid
  const productQuery = (menuProductSearch ? menuProductSearch.value.trim().toLowerCase() : '');
  let visibleProducts = state.products.filter((product) => {
    const matchesCategory = selectedMenuCategory === '*' || String(product.category || '').trim() === selectedMenuCategory;
    const matchesQuery = !productQuery || `${product.name} ${product.category} ${product.sku} ${product.barcode}`.toLowerCase().includes(productQuery);
    return matchesCategory && matchesQuery;
  });

  // Featured order matching the mockup when viewing All Items without search
  if (selectedMenuCategory === '*' && !productQuery) {
    const featuredOrder = [
      'Chicken & Chips',
      'Beef Burger',
      'Pizza',
      'Grilled Fish',
      'Rice & Chicken',
      'Fresh Juice',
      'Soda',
      'Ice Cream'
    ];
    visibleProducts.sort((a, b) => {
      const idxA = featuredOrder.indexOf(a.name);
      const idxB = featuredOrder.indexOf(b.name);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return a.name.localeCompare(b.name);
    });
  }

  if (menuProductListBox) {
    menuProductListBox.className = 'menu-product-grid';
    menuProductListBox.innerHTML = visibleProducts.length ? visibleProducts.map((product, index) => `
      <article class="menu-product-card" data-product-id="${escapeHtml(product.id)}">
        <div class="menu-product-image">
          <img src="${menuProductImage(product, index)}" alt="${escapeHtml(product.name)}" loading="lazy" />
          <div class="menu-product-image-fallback">${menuCategoryIcon(product.category)}</div>
        </div>
        <div class="menu-product-details">
          <div class="menu-product-name-row">
            <h4>${escapeHtml(product.name)}</h4>
          </div>
          <span class="menu-product-stock">${Number(product.stock) > 0 ? `${Number(product.stock)} ${escapeHtml(product.unit || 'piece')} available` : 'Out of stock'}</span>
          <div class="menu-product-price-row">
            <span class="menu-price-text">${formatCurrency(product.sellingPrice)}</span>
          </div>
        </div>
        ${canManageInventory ? `<div class="menu-product-actions">
          <button class="menu-product-action edit" type="button" data-edit-product="${escapeHtml(product.id)}" title="Edit item">✎</button>
          <button class="menu-product-action delete" type="button" data-delete-product="${escapeHtml(product.id)}" title="Delete item">🗑</button>
        </div>` : ''}
      </article>
    `).join('') : '<div class="menu-empty-state">No menu items match this category or search.</div>';

    menuProductListBox.querySelectorAll('.menu-product-image img').forEach((image) => {
      image.addEventListener('error', () => image.parentElement.classList.add('fallback-mode'), { once: true });
    });

    menuProductListBox.querySelectorAll('[data-edit-product]').forEach((button) => {
      button.addEventListener('click', (event) => {
        event.stopPropagation();
        if (!canManageInventory) return;
        const product = state.products.find((entry) => entry.id === button.dataset.editProduct);
        if (!product) return;
        document.getElementById('product-id').value = product.id;
        document.getElementById('product-name').value = product.name;
        document.getElementById('product-category').value = product.category || '';
        document.getElementById('product-sku').value = product.sku || '';
        document.getElementById('product-barcode').value = product.barcode || product.sku || '';
        document.getElementById('product-unit').value = product.unit || 'piece';
        document.getElementById('product-buying-price').value = product.buyingPrice || 0;
        document.getElementById('product-selling-price').value = product.sellingPrice || 0;
        document.getElementById('product-stock').value = product.stock || 0;
        document.getElementById('product-low-stock').value = product.lowStockThreshold || 0;
        document.getElementById('product-expiry-date').value = product.expiryDate || '';
        setProductFormContext('menu');
        setProductImagePreview(product.imageUrl || '');
        document.getElementById('menu-item-modal-title').textContent = 'Edit Menu Item';
        updateQuantityUnitLabels();
        openMenuItemModal();
      });
    });

    menuProductListBox.querySelectorAll('[data-delete-product]').forEach((button) => {
      button.addEventListener('click', (event) => {
        event.stopPropagation();
        if (!canManageInventory) return;
        const id = button.dataset.deleteProduct;
        if (!confirm('Delete this menu item?')) return;
        if (backendToken) {
          apiRequest(`/products/${id}`, { method: 'DELETE' }).then(() => {
            state.products = state.products.filter((entry) => entry.id !== id);
            renderAll();
          }).catch((error) => alert(error.message || 'Menu item could not be deactivated.'));
        } else {
          state.products = state.products.filter((entry) => entry.id !== id);
          saveState();
          renderAll();
        }
      });
    });

    menuProductListBox.querySelectorAll('.menu-product-card').forEach((card) => {
      card.addEventListener('click', (event) => {
        if (event.target.closest('button')) return;
        const id = card.dataset.productId;
        const editBtn = card.querySelector(`[data-edit-product="${id}"]`);
        if (editBtn) editBtn.click();
      });
    });
  }

  // Categories View rendering
  const categoryCardsBox = document.getElementById('menu-category-cards');
  if (categoryCardsBox) {
    const categories = getMenuCategoryGroups();
    categoryCardsBox.innerHTML = categories.map((category) => {
      const cfg = MENU_CATEGORY_CONFIG[category.label] || { icon: menuCategoryIcon(category.label), color: '#8b5cf6' };
      return `
        <div class="menu-category-card" data-open-category="${escapeHtml(category.key)}">
          <div class="menu-category-card-icon" style="background: ${cfg.color}15; color: ${cfg.color};">${cfg.icon}</div>
          <div class="menu-category-card-name">${escapeHtml(category.label)}</div>
          <div class="menu-category-card-count">${category.count} Menu Items</div>
          <span class="menu-category-card-link">View Menu Items →</span>
        </div>
      `;
    }).join('');

    categoryCardsBox.querySelectorAll('[data-open-category]').forEach((card) => {
      card.addEventListener('click', () => {
        selectedMenuCategory = card.dataset.openCategory;
        switchMenuTab('items');
        renderMenuCatalog();
      });
    });
  }

  // Update hidden trackers to prevent any missing element errors
  const lowStock = state.products.filter((product) => product.stock > 0 && product.stock <= product.lowStockThreshold);
  const outOfStock = state.products.filter((product) => product.stock <= 0);
  const menuValue = state.products.reduce((sum, product) => sum + Number(product.stock || 0) * Number(product.sellingPrice || 0), 0);
  const totalEl = document.getElementById('menu-total');
  if (totalEl) totalEl.textContent = formatCurrency(menuValue);
  const lowEl = document.getElementById('menu-low-count');
  if (lowEl) lowEl.textContent = lowStock.length;
  const outEl = document.getElementById('menu-out-count');
  if (outEl) outEl.textContent = outOfStock.length;

  renderBadgeSummary();
}

function renderInventory() {
  const canManageInventory = hasRole('admin', 'purchase');
  const lowStock = state.products.filter((product) => product.stock > 0 && product.stock <= product.lowStockThreshold);
  const outOfStock = state.products.filter((product) => product.stock <= 0);
  const productQuery = inventoryProductSearch.value.trim().toLowerCase();
  const visibleProducts = state.products.filter((product) => {
    const matchesFilter = inventoryFilter === 'low'
      ? product.stock > 0 && product.stock <= product.lowStockThreshold
      : inventoryFilter === 'out' ? product.stock <= 0 : true;
    const matchesQuery = !productQuery || `${product.name} ${product.category} ${product.sku} ${product.barcode}`.toLowerCase().includes(productQuery);
    return matchesFilter && matchesQuery;
  });
  const inventoryValue = state.products.reduce((sum, product) => sum + Number(product.stock || 0) * Number(product.buyingPrice || 0), 0);
  document.getElementById('inventory-total').textContent = formatCurrency(inventoryValue);
  document.getElementById('inventory-low-count').textContent = lowStock.length;
  document.getElementById('inventory-out-count').textContent = outOfStock.length;
  document.getElementById('inventory-add-item').hidden = !canManageInventory;
  document.querySelectorAll('[data-inventory-filter]').forEach((button) => {
    const selected = button.dataset.inventoryFilter === inventoryFilter;
    button.classList.toggle('active', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
  inventoryLowStockListBox.innerHTML = lowStock.length || outOfStock.length ? [...outOfStock, ...lowStock].slice(0, 8).map((product) => `
    <div class="low-stock-item"><span class="stock-alert-dot ${product.stock <= 0 ? 'out' : ''}"></span><span><strong>${escapeHtml(product.name)}</strong><small>${product.stock <= 0 ? 'Out of stock' : `${product.stock} ${escapeHtml(product.unit || 'piece')} remaining · threshold ${product.lowStockThreshold}`}</small></span></div>
  `).join('') : '<div class="empty-state">All products are above the low-stock threshold.</div>';

  inventoryProductListBox.innerHTML = visibleProducts.length ? `
    <div class="inventory-list-header"><span>Item</span><span>SKU</span><span>Category</span><span>In Stock</span><span>Buying Price</span><span>Actions</span></div>
    ${visibleProducts.map((product) => `
      <div class="inventory-list-row">
        <span class="inventory-item-name"><strong>${escapeHtml(product.name)}</strong><small>${escapeHtml(product.barcode || 'No barcode')}</small></span>
        <span>${escapeHtml(product.sku || '—')}</span>
        <span>${escapeHtml(product.category || 'Uncategorized')}</span>
        <span><strong class="${product.stock <= 0 ? 'stock-out' : product.stock <= product.lowStockThreshold ? 'stock-low' : 'stock-good'}">${Number(product.stock)} ${escapeHtml(product.unit || 'piece')}</strong><small>Alert at ${Number(product.lowStockThreshold)} ${escapeHtml(product.unit || 'piece')}</small></span>
        <span>${formatCurrency(product.buyingPrice)}</span>
        <span class="action-controls">${canManageInventory ? `<button class="small-btn edit" type="button" data-edit-product="${escapeHtml(product.id)}">Edit</button><button class="small-btn delete" type="button" data-delete-product="${escapeHtml(product.id)}">Delete</button>` : 'View only'}</span>
      </div>
    `).join('')}
  ` : '<div class="empty-state">No inventory items match this filter.</div>';

  inventoryProductListBox.querySelectorAll('[data-edit-product]').forEach((button) => {
    button.addEventListener('click', () => {
      if (!canManageInventory) return;
      const product = state.products.find((entry) => entry.id === button.dataset.editProduct);
      if (!product) return;
      document.getElementById('product-id').value = product.id;
      setProductFormContext('inventory');
      document.getElementById('product-name').value = product.name;
      document.getElementById('product-category').value = product.category || '';
      document.getElementById('product-sku').value = product.sku || '';
      document.getElementById('product-barcode').value = product.barcode || product.sku || '';
      document.getElementById('product-unit').value = product.unit || 'piece';
      document.getElementById('product-buying-price').value = product.buyingPrice || 0;
      document.getElementById('product-selling-price').value = product.sellingPrice || 0;
      document.getElementById('product-stock').value = product.stock || 0;
      document.getElementById('product-low-stock').value = product.lowStockThreshold || 0;
      document.getElementById('product-expiry-date').value = product.expiryDate || '';
      document.getElementById('product-image-url').value = product.imageUrl?.startsWith('data:image/') ? '' : product.imageUrl || '';
      setProductImagePreview('');
      document.getElementById('menu-item-modal-title').textContent = 'Edit Inventory Item';
      updateQuantityUnitLabels();
      openMenuItemModal();
    });
  });

  inventoryProductListBox.querySelectorAll('[data-delete-product]').forEach((button) => {
    button.addEventListener('click', () => {
      if (!canManageInventory) return;
      const id = button.dataset.deleteProduct;
      if (!confirm('Delete this product?')) return;
      apiRequest(`/products/${id}`, { method: 'DELETE' }).then(() => {
        state.products = state.products.filter((entry) => entry.id !== id);
        renderAll();
      }).catch((error) => alert(error.message || 'Product could not be deactivated.'));
    });
  });

  renderBadgeSummary();
}

function openMenuItemModal() {
  const modal = document.getElementById('menu-item-modal');
  modal.hidden = false;
  document.getElementById('product-name').focus();
}

function setProductFormContext(context) {
  productFormContext = context;
  document.querySelectorAll('[data-product-form-field]').forEach((field) => {
    const fieldContext = field.dataset.productFormField;
    field.hidden = fieldContext === 'menu-image'
      ? context !== 'menu'
      : fieldContext === 'inventory-image'
        ? context !== 'inventory'
        : context === 'menu' && ['barcode', 'buying-price', 'stock-alert'].includes(fieldContext);
  });
}

function setProductImagePreview(imageUrl) {
  const preview = document.getElementById('product-image-preview');
  preview.src = imageUrl || '';
  preview.hidden = !imageUrl;
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      if (typeof reader.result === 'string') resolve(reader.result);
      else reject(new Error('Image file could not be read.'));
    }, { once: true });
    reader.addEventListener('error', () => reject(reader.error || new Error('Image file could not be read.')), { once: true });
    reader.readAsDataURL(file);
  });
}

function menuCategoryIcon(category) {
  const name = String(category || '').toLowerCase();
  if (name.includes('drink') || name.includes('beverage') || name.includes('juice') || name.includes('soda')) return '🥤';
  if (name.includes('dessert') || name.includes('sweet') || name.includes('ice cream')) return '🍨';
  if (name.includes('pizza')) return '🍕';
  if (name.includes('burger')) return '🍔';
  if (name.includes('fish') || name.includes('seafood') || name.includes('tilapia')) return '🐟';
  if (name.includes('main') || name.includes('dish') || name.includes('rice') || name.includes('chicken')) return '🍽';
  return '🍴';
}

function getMenuCategoryGroups() {
  const groups = new Map();
  state.products.forEach((product) => {
    const name = String(product.category || '').trim();
    if (!name) return;
    if (!groups.has(name)) groups.set(name, { key: name, label: name, count: 0 });
    groups.get(name).count += 1;
  });
  return [...groups.values()].sort((a, b) => {
    const orderA = MENU_CATEGORY_CONFIG[a.label]?.order || 99;
    const orderB = MENU_CATEGORY_CONFIG[b.label]?.order || 99;
    return orderA - orderB || a.label.localeCompare(b.label);
  });
}

function menuProductImage(product, index) {
  if (product && product.imageUrl) return product.imageUrl;
  if (product?.testCatalog) {
    const name = product.name.toLowerCase();
    const drinkColors = name.includes('tea') ? ['#a56332', '#f2bd67']
      : name.includes('coffee') ? ['#49352d', '#b78a65']
        : name.includes('mojito') || name.includes('lemon') ? ['#62a96d', '#c5df7b']
          : name.includes('melon') || name.includes('juice') ? ['#e87c5b', '#ffd27b']
            : name.includes('pista') || name.includes('malba') ? ['#6e9b54', '#c8d98b']
              : ['#b05b8e', '#f2a6b9'];
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400"><defs><linearGradient id="bg" x2="1" y2="1"><stop stop-color="${drinkColors[0]}"/><stop offset="1" stop-color="${drinkColors[1]}"/></linearGradient><linearGradient id="glass" x2="0" y2="1"><stop stop-color="#fff" stop-opacity=".82"/><stop offset="1" stop-color="#fff" stop-opacity=".35"/></linearGradient></defs><rect width="600" height="400" fill="url(#bg)"/><circle cx="490" cy="82" r="95" fill="#fff" opacity=".12"/><circle cx="105" cy="340" r="115" fill="#fff" opacity=".1"/><path d="M275 92h132l-20 220a22 22 0 0 1-22 20h-48a22 22 0 0 1-22-20z" fill="url(#glass)" stroke="#fff" stroke-width="8"/><path d="M291 173h101l-12 127a12 12 0 0 1-12 11h-43a12 12 0 0 1-12-11z" fill="#fff" opacity=".34"/><path d="M331 92 390 39" stroke="#fff" stroke-width="11" stroke-linecap="round"/><circle cx="390" cy="104" r="31" fill="#fff" opacity=".85"/><circle cx="390" cy="104" r="20" fill="none" stroke="${drinkColors[0]}" stroke-width="5"/><path d="M247 338h190" stroke="#fff" stroke-width="10" stroke-linecap="round" opacity=".75"/></svg>`;
    return `data:image/svg+xml,${encodeURIComponent(svg)}`;
  }
  const name = `${product?.name || ''} ${product?.category || ''}`.toLowerCase();
  
  if (name.includes('tea')) {
    return 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80';
  }
  if (name.includes('coffee')) {
    return 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80';
  }
  if (name.includes('mojito') || name.includes('lemon') || name.includes('falooda')) {
    return 'https://images.unsplash.com/photo-1513558161293-cdaf765edfd7?auto=format&fit=crop&w=600&q=80';
  }
  if (name.includes('shake') || name.includes('malba')) {
    return 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80';
  }
  if (name.includes('chicken & chips') || name.includes('chicken and chips') || (name.includes('chicken') && name.includes('chips'))) {
    return 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80';
  }
  if (name.includes('beef burger') || (name.includes('burger') && name.includes('beef'))) {
    return 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80';
  }
  if (name.includes('pizza')) {
    if (name.includes('bbq')) return 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80';
    if (name.includes('deluxe')) return 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=600&q=80';
    if (name.includes('veggie')) return 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80';
    return 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80';
  }
  if (name.includes('grilled fish') || name.includes('tilapia') || name.includes('fish')) {
    return 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80';
  }
  if (name.includes('rice & chicken') || name.includes('rice and chicken')) {
    return 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=600&q=80';
  }
  if (name.includes('fresh juice') || (name.includes('juice') && !name.includes('passion'))) {
    return 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=600&q=80';
  }
  if (name.includes('passion')) {
    return 'https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?auto=format&fit=crop&w=600&q=80';
  }
  if (name.includes('soda') || name.includes('cola') || name.includes('coke')) {
    return 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=600&q=80';
  }
  if (name.includes('ice cream')) {
    return 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80';
  }
  if (name.includes('cake')) {
    return 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80';
  }
  if (name.includes('fruit salad')) {
    return 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=600&q=80';
  }
  if (name.includes('burger')) {
    if (name.includes('cheese')) return 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=600&q=80';
    if (name.includes('chicken')) return 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=600&q=80';
    return 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80';
  }
  if (name.includes('beef') || name.includes('stew') || name.includes('goat') || name.includes('roasted')) {
    return 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80';
  }
  if (name.includes('chicken') || name.includes('pilau') || name.includes('curry')) {
    return 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80';
  }
  if (name.includes('water')) {
    return 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=600&q=80';
  }
  if (name.includes('tea')) {
    return 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80';
  }
  const fallbackImages = [
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80'
  ];
  return fallbackImages[index % fallbackImages.length];
}

function renderAccounts() {
  const today = dateISO();
  const income = state.sales.filter((sale) => sale.createdAt && sale.createdAt.startsWith(today)).reduce((sum, sale) => sum + sale.total, 0);
  const expenses = state.expenses.filter((entry) => entry.date === today).reduce((sum, entry) => sum + entry.amount, 0);
  const paymentExpense = state.payments.filter((entry) => entry.type === 'Expense' && entry.date === today).reduce((sum, entry) => sum + entry.amount, 0);
  const paymentIncome = state.payments.filter((entry) => entry.type === 'Income' && entry.date === today).reduce((sum, entry) => sum + entry.amount, 0);

  const totalIncome = income + paymentIncome;
  const totalExpense = expenses + paymentExpense;
  const profit = totalIncome - totalExpense;
  const allTransactions = getTransactionHistory();
  const lifetimeIncome = allTransactions.filter((entry) => entry.direction === 'income').reduce((sum, entry) => sum + Number(entry.amount || 0), 0);
  const lifetimeExpense = allTransactions.filter((entry) => entry.direction === 'expense').reduce((sum, entry) => sum + Number(entry.amount || 0), 0);

  todayIncome.textContent = formatCurrency(totalIncome);
  todayExpenses.textContent = formatCurrency(totalExpense);
  todayProfit.textContent = formatCurrency(profit);
  currentBalance.textContent = formatCurrency(Number(state.business.openingBalance || 0) + lifetimeIncome - lifetimeExpense);

  const ledger = [...state.expenses, ...state.payments.map((item) => ({
    id: item.id,
    name: item.label,
    amount: item.amount,
    date: item.date,
    description: `Cash ${item.type}`
  }))].sort((a, b) => new Date(b.date) - new Date(a.date));
  const expenseQuery = expenseSearch.value.trim().toLowerCase();
  const visibleLedger = ledger.filter((entry) => !expenseQuery || `${entry.name} ${entry.description} ${entry.date}`.toLowerCase().includes(expenseQuery));
  document.getElementById('expense-total').textContent = formatCurrency(visibleLedger.reduce((sum, entry) => sum + Number(entry.amount || 0), 0));

  expenseHistoryBox.innerHTML = visibleLedger.length ? `
    <div class="list-header">
      <span>Name</span>
      <span>Date</span>
      <span>Amount</span>
      <span>Description</span>
    </div>
    ${visibleLedger.map((entry) => `
      <div class="list-row">
        <span>${entry.name}</span>
        <span>${formatDate(entry.date)}</span>
        <span>${formatCurrency(entry.amount)}</span>
        <span>${entry.description || '—'}</span>
      </div>
    `).join('')}
  ` : '<div class="empty-state">No ledger entries match your search.</div>';
  renderTransactionReport();
}

function getReportTransactions() {
  const type = reportType.value;
  const from = reportFrom.value ? new Date(`${reportFrom.value}T00:00:00`) : null;
  const to = reportTo.value ? new Date(`${reportTo.value}T23:59:59`) : null;
  return getTransactionHistory().filter((entry) => {
    const date = new Date(entry.date);
    return (!type || entry.type === type) && (!from || date >= from) && (!to || date <= to);
  });
}

function renderTransactionReport() {
  if (!reportResults || !reportSummary) return;
  const entries = getReportTransactions();
  const income = entries.filter((entry) => entry.direction === 'income').reduce((sum, entry) => sum + Number(entry.amount || 0), 0);
  const expense = entries.filter((entry) => entry.direction === 'expense').reduce((sum, entry) => sum + Number(entry.amount || 0), 0);
  reportSummary.textContent = `${entries.length} transaction${entries.length === 1 ? '' : 's'} · Income ${formatCurrency(income)} · Expenses ${formatCurrency(expense)} · Net ${formatCurrency(income - expense)}`;
  reportResults.innerHTML = entries.length ? `
    <div class="list-header"><span>Date</span><span>Type</span><span>Description</span><span>Reference</span><span>Amount</span></div>
    ${entries.map((entry) => `<div class="list-row"><span>${formatDate(entry.date)}</span><span>${escapeHtml(entry.type)}</span><span>${escapeHtml(entry.label)}</span><span>${escapeHtml(entry.reference)}</span><span class="${entry.direction === 'income' ? 'income' : 'expense'}">${entry.direction === 'income' ? '+' : '-'}${formatCurrency(entry.amount)}</span></div>`).join('')}
  ` : '<div class="empty-state">No transactions match the selected filters.</div>';
}

function bindReportsActions() {
  document.getElementById('reports-period').addEventListener('change', renderReports);
  document.querySelectorAll('[data-report-tab]').forEach((button) => {
    button.addEventListener('click', () => {
      reportTab = button.dataset.reportTab;
      document.querySelectorAll('[data-report-tab]').forEach((tab) => {
        const selected = tab === button;
        tab.classList.toggle('active', selected);
        tab.setAttribute('aria-selected', String(selected));
      });
      renderReports();
    });
  });
  document.getElementById('export-sales-report').addEventListener('click', exportSalesReport);
}

function getSalesReportData() {
  const period = document.getElementById('reports-period').value;
  const now = new Date();
  let start = new Date(now.getFullYear(), now.getMonth(), 1);
  if (period === 'today') start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  if (period === 'week') {
    start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    start.setDate(start.getDate() - ((start.getDay() + 6) % 7));
  }
  const branchId = getActiveBranchId();
  const sales = getVisibleSales().filter((sale) => {
    const createdAt = new Date(sale.createdAt);
    return sale.status === 'Completed' && (period === 'all' || createdAt >= start);
  });
  const expenses = [
    ...state.expenses.map((expense) => ({ date: expense.date, amount: Number(expense.amount || 0), name: expense.name, branchId: expense.branchId })),
    ...state.payments.filter((payment) => payment.type === 'Expense').map((payment) => ({ date: payment.date, amount: Number(payment.amount || 0), name: payment.label, branchId: payment.branchId }))
  ].filter((expense) => (period === 'all' || new Date(`${expense.date}T00:00:00`) >= start) && (!branchId || !expense.branchId || expense.branchId === branchId));
  return { sales, expenses, period };
}

function reportItemStats(sales) {
  const stats = new Map();
  sales.forEach((sale) => (sale.items || []).forEach((item) => {
    const name = item.name || item.product_name || state.products.find((product) => product.id === (item.productId || item.product_id))?.name || 'Menu item';
    const quantity = Number(item.qty || item.quantity || 0);
    const total = Number(item.total || item.line_total || (quantity * Number(item.price || item.unit_price || 0)));
    const stat = stats.get(name) || { name, quantity: 0, total: 0 };
    stat.quantity += quantity;
    stat.total += total;
    stats.set(name, stat);
  }));
  return [...stats.values()].sort((a, b) => b.quantity - a.quantity || b.total - a.total);
}

function formatReportChartLabel(label) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(label));
  if (!match) return String(label).length > 12 ? `${String(label).slice(0, 11)}…` : String(label);
  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  return date.toLocaleDateString('en-UG', { day: 'numeric', month: 'short' });
}

function formatReportChartValue(value) {
  return formatCurrency(value);
}

function renderReports() {
  const { sales, expenses, period } = getSalesReportData();
  const totalSales = sales.reduce((sum, sale) => sum + Number(sale.total || 0), 0);
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  document.getElementById('reports-total-sales').textContent = formatCurrency(totalSales);
  document.getElementById('reports-total-orders').textContent = String(sales.length);
  document.getElementById('reports-average-order').textContent = formatCurrency(sales.length ? totalSales / sales.length : 0);
  document.getElementById('reports-total-profit').textContent = formatCurrency(totalSales - totalExpenses);
  const title = {
    sales: ['Sales Trend', 'Best Selling Items', 'Sales totals over the selected period'],
    popular: ['Items Sold', 'Popular Menu Items', 'Ranked by units sold'],
    orders: ['Order Activity', 'Recent Orders', 'Latest completed orders'],
    expenses: ['Expense Trend', 'Recorded Expenses', 'Recorded expenses for this period'],
    customers: ['Customer Sales', 'Top Customers', 'Ranked by completed sales']
  }[reportTab] || ['Sales Trend', 'Best Selling Items', 'Sales totals over the selected period'];
  document.getElementById('reports-main-panel-title').textContent = title[0];
  document.getElementById('reports-side-panel-title').textContent = title[1];
  document.querySelector('#reports-main-panel-title + .section-note').textContent = title[2];

  const chartBox = document.getElementById('reports-sales-chart');
  let buckets = [];
  if (reportTab === 'expenses') {
    const byDate = new Map();
    expenses.forEach((entry) => byDate.set(entry.date, (byDate.get(entry.date) || 0) + entry.amount));
    buckets = [...byDate.entries()].sort(([a], [b]) => a.localeCompare(b)).slice(-12).map(([label, value]) => ({ label, value }));
  } else if (reportTab === 'popular') {
    buckets = reportItemStats(sales).slice(0, 8).map((item) => ({ label: item.name, value: item.quantity }));
  } else if (reportTab === 'customers') {
    const totals = new Map();
    sales.forEach((sale) => totals.set(sale.customerName || 'Walk-in Customer', (totals.get(sale.customerName || 'Walk-in Customer') || 0) + Number(sale.total || 0)));
    buckets = [...totals.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8).map(([label, value]) => ({ label, value }));
  } else {
    const byDate = new Map();
    sales.forEach((sale) => {
      const key = localDateKey(sale.createdAt);
      byDate.set(key, (byDate.get(key) || 0) + Number(sale.total || 0));
    });
    buckets = [...byDate.entries()].sort(([a], [b]) => a.localeCompare(b)).slice(-12).map(([label, value]) => ({ label, value }));
  }
  const max = Math.max(1, ...buckets.map((bucket) => bucket.value));
  chartBox.innerHTML = buckets.length ? buckets.map((bucket) => {
    const label = formatReportChartLabel(bucket.label);
    const value = reportTab === 'popular' ? String(bucket.value) : formatReportChartValue(bucket.value);
    const fullValue = reportTab === 'popular' ? `${bucket.value} units` : formatCurrency(bucket.value);
    return `<div class="report-chart-column" title="${escapeHtml(bucket.label)} · ${escapeHtml(fullValue)}" aria-label="${escapeHtml(bucket.label)}: ${escapeHtml(fullValue)}"><span class="report-chart-value">${escapeHtml(value)}</span><i style="height:${Math.max(4, bucket.value / max * 100)}%"></i><small>${escapeHtml(label)}</small></div>`;
  }
  ).join('') : '<div class="empty-state">No report data for the selected period.</div>';

  const sidePanel = document.getElementById('reports-side-panel');
  if (reportTab === 'expenses') {
    sidePanel.innerHTML = expenses.length ? expenses.slice().sort((a, b) => b.date.localeCompare(a.date)).slice(0, 8).map((item) =>
      `<div class="report-side-row"><span><strong>${escapeHtml(item.name || 'Expense')}</strong><small>${escapeHtml(formatDate(item.date))}</small></span><strong>${formatCurrency(item.amount)}</strong></div>`
    ).join('') : '<div class="empty-state">No expenses recorded in this period.</div>';
  } else if (reportTab === 'orders') {
    sidePanel.innerHTML = sales.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 8).map((sale) =>
      `<div class="report-side-row"><span><strong>${escapeHtml(sale.receiptNo || sale.id)}</strong><small>${escapeHtml(sale.customerName || 'Walk-in Customer')} · ${escapeHtml(formatDate(sale.createdAt))}</small></span><strong>${formatCurrency(sale.total)}</strong></div>`
    ).join('') || '<div class="empty-state">No completed orders in this period.</div>';
  } else if (reportTab === 'customers') {
    const customers = new Map();
    sales.forEach((sale) => {
      const key = sale.customerName || 'Walk-in Customer';
      customers.set(key, (customers.get(key) || 0) + Number(sale.total || 0));
    });
    sidePanel.innerHTML = [...customers.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8).map(([name, amount]) =>
      `<div class="report-side-row"><span><strong>${escapeHtml(name)}</strong><small>Customer sales</small></span><strong>${formatCurrency(amount)}</strong></div>`
    ).join('') || '<div class="empty-state">No customer sales in this period.</div>';
  } else {
    sidePanel.innerHTML = reportItemStats(sales).slice(0, 8).map((item, index) =>
      `<div class="report-side-row"><span class="report-rank">${index + 1}</span><span><strong>${escapeHtml(item.name)}</strong><small>${item.quantity} sold</small></span><strong>${formatCurrency(item.total)}</strong></div>`
    ).join('') || '<div class="empty-state">No item sales in this period.</div>';
  }
}

function exportSalesReport() {
  const { sales, expenses } = getSalesReportData();
  const headers = ['Date', 'Order', 'Customer', 'Status', 'Payment', 'Sales', 'Expenses'];
  const rows = sales.map((sale) => [localDateKey(sale.createdAt), sale.receiptNo || sale.id, sale.customerName || 'Walk-in Customer', sale.status, sale.paymentMethod, Number(sale.total || 0), 0]);
  expenses.forEach((expense) => rows.push([expense.date, '', expense.name || 'Expense', 'Expense', '', 0, expense.amount]));
  if (!rows.length) {
    alert('There is no report data to export for this period.');
    return;
  }
  const csv = [headers, ...rows].map((row) => row.map((value) => `"${String(value ?? '').replace(/"/g, '""')}"`).join(',')).join('\r\n');
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = `restaurant-report-${dateISO()}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

function printTransactionReport() {
  const entries = getReportTransactions();
  if (!entries.length) {
    alert('There are no transactions matching the selected filters.');
    return;
  }
  const income = entries.filter((entry) => entry.direction === 'income').reduce((sum, entry) => sum + Number(entry.amount || 0), 0);
  const expense = entries.filter((entry) => entry.direction === 'expense').reduce((sum, entry) => sum + Number(entry.amount || 0), 0);
  const printWindow = window.open('', '_blank', 'width=1000,height=700');
  if (!printWindow) {
    alert('Please allow pop-ups to print the report.');
    return;
  }
  const rows = entries.map((entry) => `<tr><td>${escapeHtml(formatDate(entry.date))}</td><td>${escapeHtml(entry.type)}</td><td>${escapeHtml(entry.label)}</td><td>${escapeHtml(entry.reference)}</td><td>${entry.direction === 'income' ? '+' : '-'}${escapeHtml(formatCurrency(entry.amount))}</td></tr>`).join('');
  printWindow.document.write(`<!doctype html><html><head><title>${escapeHtml(state.business.name)} - Transaction Report</title><style>body{font-family:Arial,sans-serif;color:#18212f;padding:24px}h1{margin:0 0 4px}p{color:#64748b}table{width:100%;border-collapse:collapse;margin-top:20px}th,td{border:1px solid #dfe8f5;padding:9px;text-align:left}th{background:#eef4ff}.summary{font-weight:700;margin-top:16px}</style></head><body><h1>${escapeHtml(state.business.name)}</h1><p>Transaction report · Generated ${escapeHtml(formatDate(new Date().toISOString()))}</p><div class="summary">${entries.length} transactions · Income ${formatCurrency(income)} · Expenses ${formatCurrency(expense)} · Net ${formatCurrency(income - expense)}</div><table><thead><tr><th>Date</th><th>Type</th><th>Description</th><th>Reference</th><th>Amount</th></tr></thead><tbody>${rows}</tbody></table><script>window.onload=function(){window.print();window.onafterprint=function(){window.close();};};</script></body></html>`);
  printWindow.document.close();
}

function renderDeliveries() {
  const currentUser = getCurrentUser();
  const selectedStatus = deliveryFilterStatus.value;
  const selectedDriver = deliveryFilterDriver.value;
  const terminalStatuses = new Set(['delivered', 'cancelled', 'failed']);
  const visibleDeliveries = state.deliveries
    .filter((delivery) => currentUser?.role !== 'delivery' || delivery.driverId === currentUser.id)
    .filter((delivery) => {
      const status = String(delivery.status || '').trim().toLowerCase();
      if (deliverySummaryFilter === 'delivered') return status === 'delivered';
      if (deliverySummaryFilter === 'pending') return !terminalStatuses.has(status);
      return true;
    })
    .filter((delivery) => !deliveryFilterDate.value || (delivery.createdAt || '').startsWith(deliveryFilterDate.value))
    .filter((delivery) => !deliveryFilterStatus.value || delivery.status === deliveryFilterStatus.value)
    .filter((delivery) => !deliveryFilterDriver.value || delivery.driverId === deliveryFilterDriver.value)
    .filter((delivery) => {
      const query = deliveryFilterCustomer.value.trim().toLowerCase();
      return !query || `${delivery.customerName} ${delivery.phone}`.toLowerCase().includes(query);
    });

  deliveryBoardCount.textContent = `${visibleDeliveries.length} deliver${visibleDeliveries.length === 1 ? 'y' : 'ies'}`;
  deliveryFilterStatus.innerHTML = `<option value="">All statuses</option>${DELIVERY_STATUSES.map((status) => `<option value="${status}">${status}</option>`).join('')}`;
  deliveryFilterStatus.value = deliveryFilterStatus.value || '';
  const drivers = state.users.filter((user) => user.role === 'delivery' || user.role === 'sales');
  deliveryFilterDriver.innerHTML = `<option value="">All delivery people</option>${drivers.map((driver) => `<option value="${driver.id}">${escapeHtml(driver.displayName)}</option>`).join('')}`;
  deliveryFilterStatus.value = selectedStatus;
  deliveryFilterDriver.value = selectedDriver;

  deliverySummary.innerHTML = DELIVERY_STATUSES.map((status) => `<span class="delivery-summary-item"><strong>${state.deliveries.filter((delivery) => delivery.status === status).length}</strong>${status}</span>`).join('');
  renderBadgeSummary();
  document.getElementById('delivery-total').textContent = formatCurrency(visibleDeliveries.reduce((sum, delivery) => sum + Number(delivery.orderTotal || 0) + Number(delivery.fee || 0), 0));
  deliveryListBox.innerHTML = visibleDeliveries.length ? `
    <div class="delivery-board">
      ${visibleDeliveries.map((delivery) => renderDeliveryCard(delivery, currentUser)).join('')}
    </div>
  ` : '<div class="empty-state">No deliveries match the selected filters.</div>';
}

function renderDeliveryCard(delivery, currentUser) {
  const canSeePin = currentUser?.role !== 'delivery' || delivery.driverId === currentUser.id;
  return `<article class="delivery-card">
    <div class="delivery-card-head">
      <div><strong>DELIVERY #${escapeHtml(delivery.deliveryNo || delivery.id)}</strong><br><span class="text-muted">Sale ${escapeHtml(delivery.receiptNo || 'Not linked')} · ${formatDate(delivery.createdAt)}</span></div>
      <span class="delivery-status status-${slugify(delivery.status)}">${escapeHtml(delivery.status)}</span>
    </div>
    <div class="delivery-card-grid">
      <div><span class="label">Customer</span><strong>${escapeHtml(delivery.customerName)}</strong><span>${escapeHtml(delivery.phone || 'No phone')}</span></div>
      <div><span class="label">Address</span><strong>${escapeHtml(delivery.address || 'No address')}</strong></div>
      <div><span class="label">Order / Fee</span><strong>${formatCurrency(delivery.orderTotal)}</strong><span>Fee: ${formatCurrency(delivery.fee)}</span></div>
      <div><span class="label">Delivery Person</span><strong>${escapeHtml(delivery.driverName || 'Unassigned')}</strong>${canSeePin ? `<span>Customer PIN: <strong>${escapeHtml(delivery.pin)}</strong></span>` : ''}</div>
    </div>
    ${delivery.failureReason ? `<div class="delivery-failure"><strong>Failed:</strong> ${escapeHtml(delivery.failureReason)}${delivery.failureDescription ? ` · ${escapeHtml(delivery.failureDescription)}` : ''}</div>` : ''}
    <div class="delivery-card-foot"><span class="text-muted">${formatDeliveryTimeline(delivery)}</span><span class="action-controls">${renderDeliveryActions(delivery, currentUser)}</span></div>
  </article>`;
}

function renderDeliveryActions(delivery, currentUser) {
  const isAssigned = delivery.driverId === currentUser?.id;
  const isManager = hasRole('admin', 'sales');
  const canOperate = isManager || (currentUser?.role === 'delivery' && isAssigned);
  const actions = [];
  if (currentUser?.role === 'delivery') {
    if (isAssigned && ['On the Way', 'Arrived'].includes(delivery.status)) actions.push(actionButton('confirm', delivery.id, 'Enter Customer Code'));
    return actions.join('') || '<span class="text-muted">Waiting for delivery</span>';
  }
  if (isManager && !['Received', 'Delivered', 'Cancelled', 'Failed'].includes(delivery.status)) actions.push(`<button class="small-btn edit" data-delivery-action="assign" data-delivery-id="${delivery.id}">${delivery.driverId ? 'Reassign' : 'Assign'}</button>`);
  if (isManager && ['Pending', 'Preparing'].includes(delivery.status)) actions.push(actionButton('ready', delivery.id, 'Ready for Delivery'));
  if (isManager && delivery.status === 'Ready for Delivery') actions.push(actionButton('dispatch', delivery.id, 'Dispatch'));
  if (canOperate && delivery.status === 'Dispatched') actions.push(actionButton('start', delivery.id, 'Start Delivery'));
  if (canOperate && delivery.status === 'On the Way') actions.push(actionButton('arrive', delivery.id, "I've Arrived"));
  if (canOperate && delivery.status === 'Arrived') actions.push(actionButton('confirm', delivery.id, 'Confirm Delivery'));
  if (canOperate && !['Received', 'Delivered', 'Cancelled', 'Failed'].includes(delivery.status)) actions.push(`<button class="small-btn delete" data-delivery-action="fail" data-delivery-id="${delivery.id}">Mark Failed</button>`);
  return actions.join('') || '<span class="text-muted">No action</span>';
}

function actionButton(action, id, label) {
  return `<button class="small-btn success" data-delivery-action="${action}" data-delivery-id="${id}">${label}</button>`;
}

function formatDeliveryTimeline(delivery) {
  const timestamps = delivery.timestamps || {};
  const latest = Object.entries(timestamps).sort((a, b) => new Date(b[1]) - new Date(a[1]))[0];
  return latest ? `${latest[0].replace(/^./, (character) => character.toUpperCase())}: ${formatDate(latest[1])}` : 'No events recorded';
}

function handleDeliveryAction(action, deliveryId) {
  const delivery = state.deliveries.find((entry) => entry.id === deliveryId);
  const currentUser = getCurrentUser();
  if (!delivery) return;
  const isManager = hasRole('admin', 'sales');
  const isAssigned = delivery.driverId === currentUser?.id;
  if (action === 'assign') return openDeliveryModal(action, delivery);
  if (currentUser?.role === 'delivery' && !isAssigned) return alert('You can only manage deliveries assigned to you.');
  if (!isManager && currentUser?.role !== 'delivery') return alert('Your account is not authorized to update deliveries.');
  const nextStatus = { ready: 'Ready for Delivery', dispatch: 'Dispatched', start: 'On the Way', arrive: 'Arrived' }[action];
  if (nextStatus) return transitionDelivery(delivery, nextStatus);
  if (action === 'confirm' || action === 'fail') return openDeliveryModal(action, delivery);
}

function openDeliveryModal(action, delivery) {
  if (action === 'assign' && !hasRole('admin', 'sales')) return alert('Only managers can assign delivery people.');
  deliveryModalAction = action;
  deliveryModalDeliveryId = delivery.id;
  deliveryModalTitle.textContent = action === 'assign' ? 'Assign delivery person' : action === 'confirm' ? 'Confirm delivery' : 'Mark delivery failed';
  deliveryModalSubmit.textContent = action === 'assign' ? 'Assign' : action === 'confirm' ? 'Confirm Delivery' : 'Mark Failed';
  if (action === 'assign') {
    const drivers = state.users.filter((user) => user.role === 'delivery' || user.role === 'sales');
    deliveryModalFields.innerHTML = `<div class="field"><label for="delivery-driver-choice">Delivery Person</label><select id="delivery-driver-choice" required>${drivers.map((driver) => `<option value="${driver.id}" ${driver.id === delivery.driverId ? 'selected' : ''}>${escapeHtml(driver.displayName)}</option>`).join('')}</select></div>`;
  } else if (action === 'confirm') {
    deliveryModalFields.innerHTML = '<div class="field"><label for="delivery-pin-entry">Customer delivery code</label><input id="delivery-pin-entry" inputmode="numeric" pattern="[0-9]{4}" maxlength="4" required autofocus /><small class="section-note">Ask the customer to show you the code from their delivery email.</small></div>';
  } else {
    deliveryModalFields.innerHTML = `<div class="field"><label for="delivery-failure-reason">Failure reason</label><select id="delivery-failure-reason" required>${DELIVERY_FAILURE_REASONS.map((reason) => `<option value="${reason}">${reason}</option>`).join('')}</select></div><div class="field" id="delivery-failure-description-field" hidden><label for="delivery-failure-description">Description</label><textarea id="delivery-failure-description" rows="3" placeholder="Describe the issue"></textarea></div>`;
  }
  deliveryModal.hidden = false;
}

function closeDeliveryModal() {
  deliveryModal.hidden = true;
  deliveryModalForm.reset();
  deliveryModalAction = '';
  deliveryModalDeliveryId = '';
}

async function submitDeliveryModal(event) {
  event.preventDefault();
  const delivery = state.deliveries.find((entry) => entry.id === deliveryModalDeliveryId);
  if (!delivery) return closeDeliveryModal();
  if (deliveryModalAction === 'assign') {
    const driver = state.users.find((user) => user.id === document.getElementById('delivery-driver-choice').value);
    if (driver) await assignDelivery(delivery, driver);
  } else if (deliveryModalAction === 'confirm') {
    if (!await confirmDelivery(delivery, document.getElementById('delivery-pin-entry').value.trim())) return;
  } else if (deliveryModalAction === 'fail') {
    await failDelivery(delivery, document.getElementById('delivery-failure-reason').value, document.getElementById('delivery-failure-description')?.value.trim() || '');
  }
  closeDeliveryModal();
}

async function assignDelivery(delivery, driver) {
  if (!hasRole('admin', 'sales')) return alert('Only managers can assign delivery people.');
  if (!driver) return;
  try {
    const response = await apiRequest(`/deliveries/${delivery.id}`, { method: 'PATCH', body: JSON.stringify({ driver_id: driver.id }) });
    Object.assign(delivery, mapDelivery(response.delivery));
    renderDeliveries();
  } catch (error) { alert(error.message || 'Delivery assignment could not be saved.'); }
}

async function transitionDelivery(delivery, nextStatus) {
  const expectedNext = { Pending: 'Ready for Delivery', Preparing: 'Ready for Delivery', 'Ready for Delivery': 'Dispatched', Dispatched: 'On the Way', 'On the Way': 'Arrived' }[delivery.status];
  if (expectedNext !== nextStatus) return alert(`This delivery must move from ${delivery.status} to ${expectedNext || 'a final status'} first.`);
  if (nextStatus === 'Dispatched' && !delivery.driverId) return alert('Assign a delivery person before dispatching this order.');
  try {
    const response = await apiRequest(`/deliveries/${delivery.id}`, { method: 'PATCH', body: JSON.stringify({ status: nextStatus, timestamp_key: nextStatusTimestampKey(nextStatus) }) });
    Object.assign(delivery, mapDelivery(response.delivery));
    renderDeliveries();
    if (nextStatus === 'On the Way') sendDeliveryEmail(delivery, 'on-way');
  } catch (error) { alert(error.message || 'Delivery status could not be saved.'); }
}

async function confirmDelivery(delivery, enteredPin) {
  if (!['On the Way', 'Arrived'].includes(delivery.status)) {
    alert('The delivery must be On the Way before confirmation.');
    return false;
  }
  if (enteredPin !== delivery.pin) {
    alert('Incorrect delivery code. Delivery was not completed.');
    return false;
  }
  if (!confirm('The customer code is correct. Mark this delivery as delivered?')) return false;
  try {
    const response = await apiRequest(`/deliveries/${delivery.id}`, { method: 'PATCH', body: JSON.stringify({ status: 'Received', timestamp_key: 'received' }) });
    Object.assign(delivery, mapDelivery(response.delivery));
    renderDeliveries();
    sendDeliveryEmail(delivery, 'delivered');
    alert('Delivery confirmed successfully.');
    return true;
  } catch (error) { alert(error.message || 'Delivery confirmation could not be saved.'); return false; }
}

function sendDeliveryEmail(delivery, messageType) {
  if (!delivery.customerEmail) return;
  const sale = state.sales.find((entry) => entry.id === delivery.saleId);
  const items = sale?.items?.map((item) => `${item.name} x${item.qty} ${getProductUnit(item)} - ${formatCurrency(item.total)}`).join('\n') || 'Your ordered products are ready.';
  const subject = messageType === 'delivered' ? `Thank you for your SUUK Restaurant order ${delivery.receiptNo || ''}` : `Your SUUK Restaurant order ${delivery.receiptNo || ''} is on the way`;
  const body = messageType === 'delivered'
    ? `Hello ${delivery.customerName},\n\nThank you for receiving your order. We appreciate your business.\n\nOrder: ${delivery.receiptNo || delivery.deliveryNo}\n${items}`
    : `Hello ${delivery.customerName},\n\nYour order is on the way. Please show this delivery code to the delivery person when your order arrives:\n\nDELIVERY CODE: ${delivery.pin}\n\nOrder: ${delivery.receiptNo || delivery.deliveryNo}\n${items}\n\nTotal: ${formatCurrency(delivery.orderTotal)}`;
  window.location.href = `mailto:${encodeURIComponent(delivery.customerEmail)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

async function failDelivery(delivery, selectedReason, description) {
  if (!selectedReason) return;
  if (selectedReason === 'Other' && !description) return alert('A description is required for Other.');
  try {
    const response = await apiRequest(`/deliveries/${delivery.id}`, { method: 'PATCH', body: JSON.stringify({ status: 'Failed', failure_reason: selectedReason, failure_description: description || '', timestamp_key: 'failed' }) });
    Object.assign(delivery, mapDelivery(response.delivery));
    renderDeliveries();
  } catch (error) { alert(error.message || 'Delivery failure could not be saved.'); }
}

function nextStatusTimestampKey(status) {
  return { 'Ready for Delivery': 'ready', Dispatched: 'dispatched', 'On the Way': 'started', Arrived: 'arrived' }[status];
}

function renderBadgeSummary() {
  const currentUser = getCurrentUser();
  const visibleDeliveries = state.deliveries.filter((delivery) =>
    currentUser?.role !== 'delivery' || delivery.driverId === currentUser.id
  );
  const terminalStatuses = new Set(['delivered', 'cancelled', 'failed']);
  const pendingCount = visibleDeliveries.filter((delivery) =>
    !terminalStatuses.has(String(delivery.status || '').trim().toLowerCase())
  ).length;
  const deliveredCount = visibleDeliveries.filter((delivery) =>
    String(delivery.status || '').trim().toLowerCase() === 'delivered'
  ).length;
  pendingDeliveriesBadge.textContent = String(pendingCount);
  deliveredBadge.textContent = String(deliveredCount);
}

function returnSale(saleId) {
  const sale = state.sales.find((entry) => entry.id === saleId);
  if (!sale) return;

  returnSaleId = saleId;
  document.getElementById('return-sale-message').textContent = `Return sale ${sale.receiptNo}? Inventory will be adjusted and the sale will be removed from active sales history.`;
  returnSaleModal.hidden = false;
}

function closeReturnSaleModal() {
  returnSaleId = '';
  returnSaleModal.hidden = true;
}

async function confirmReturnSale() {
  const sale = state.sales.find((entry) => entry.id === returnSaleId);
  if (!sale) return closeReturnSaleModal();
  try {
    await apiRequest(`/sales/${sale.id}/return`, { method: 'POST' });
    await refreshServerState();
    renderAll();
    closeReturnSaleModal();
    alert(`Returned sale ${sale.receiptNo}. Inventory adjusted.`);
  } catch (error) {
    alert(error.message || 'Sale return failed. Inventory was not changed.');
  }
}

function buildReceiptText(sale) {
  const width = 42;
  const center = (text) => {
    const value = String(text || '').slice(0, width);
    const padding = Math.max(width - value.length, 0);
    return `${' '.repeat(Math.floor(padding / 2))}${value}`;
  };
  const amountLine = (label, amount) => `${label.padEnd(28)}${formatCurrency(amount).padStart(14)}`;
  const lines = [
    center(state.business.name || 'SUUK Restaurant'),
    state.business.address ? center(state.business.address) : '',
    state.business.phone ? center(`Tel: ${state.business.phone}`) : '',
    state.business.email ? center(state.business.email) : '',
    '-'.repeat(width),
    `RECEIPT: ${sale.receiptNo}`,
    `DATE: ${formatDate(sale.createdAt)}`,
    `CASHIER: ${sale.cashierName || 'Admin'}`,
    `CUSTOMER: ${sale.customerName || 'Walk-in Customer'}`,
    '-'.repeat(width),
    'ITEM                         QTY       TOTAL'
  ];

  for (const item of sale.items) {
    const name = String(item.name || 'Item').slice(0, 28);
    lines.push(name);
    lines.push(`${String(item.qty).padStart(3)} ${getProductUnit(item)} x ${formatCurrency(item.price)}${formatCurrency(item.total).padStart(19)}`);
  }
  lines.push(
    '-'.repeat(width),
    amountLine('Subtotal', sale.subtotal),
    amountLine('Discount', sale.discount)
  );
  if (sale.tax) lines.push(amountLine('Tax / VAT', sale.tax));
  lines.push(
    '='.repeat(width),
    amountLine('TOTAL DUE', sale.total),
    '='.repeat(width),
    `PAID VIA: ${formatPaymentReceiptLine(sale)}`
  );
  if (sale.paymentDetails?.confirmationCode) lines.push(`PESAPAL CONFIRMATION: ${sale.paymentDetails.confirmationCode}`);
  if (sale.paymentDetails?.transactionReference) lines.push(`PAYMENT REF: ${sale.paymentDetails.transactionReference}`);
  if (sale.paymentDetails?.customerPhone) lines.push(`PHONE: ${sale.paymentDetails.customerPhone}`);
  if (sale.paymentDetails?.amountReceived !== undefined) {
    lines.push(amountLine('Cash received', sale.paymentDetails.amountReceived));
    lines.push(amountLine('Change', sale.paymentDetails.change));
  }
  if (sale.requiresDelivery) {
    lines.push('-'.repeat(width), 'DELIVERY');
    lines.push(`Address: ${sale.deliveryAddress || '—'}`);
    lines.push(amountLine('Delivery fee', sale.deliveryFee));
    lines.push(`Delivery PIN: ${state.deliveries.find((delivery) => delivery.saleId === sale.id)?.pin || '—'}`);
  }
  lines.push(
    '-'.repeat(width),
    center(state.paymentConfig?.config?.receiptNotes || 'Thank you for shopping with us'),
    sale.paymentMethod === 'Pesapal' ? center('Secure payment by Pesapal') : '',
    center('Please keep this receipt')
  );
  return lines.filter(Boolean).join('\n');
}

function formatPaymentReceiptLine(sale) {
  if (sale.paymentMethod === 'Pesapal') {
    return `Pesapal${sale.paymentDetails?.paymentChannel ? ` · ${sale.paymentDetails.paymentChannel}` : ''}`;
  }
  return sale.paymentMethod;
}

function printReceipt() {
  if (!lastReceiptText || lastReceiptText === 'No sale completed yet.') {
    alert('Complete a sale before printing a receipt.');
    return;
  }
  const paperSize = receiptPaperSize.value === 'a4' ? 'a4' : 'thermal';
  if (paperSize === 'a4') {
    if (!lastReceiptSale) {
      alert('The completed sale details are unavailable. Complete the sale again before printing an invoice.');
      return;
    }
    printSalesInvoice(lastReceiptSale);
    return;
  }
  const printWindow = window.open('', '_blank', 'width=900,height=700');
  if (!printWindow) {
    alert('Please allow pop-ups to print the receipt.');
    return;
  }
  if (!writeReceiptPrintWindow(printWindow, lastReceiptText, paperSize)) {
    alert('The receipt could not be opened for printing. Please allow pop-ups and try again.');
  }
}

function writeReceiptPrintWindow(printWindow, receiptText, paperSize = 'thermal') {
  if (!printWindow || printWindow.closed) return false;
  const safePaperSize = paperSize === 'a4' ? 'a4' : 'thermal';
  const safeReceipt = escapeHtml(receiptText);
  printWindow.onload = () => {
    printWindow.focus();
    printWindow.print();
    printWindow.onafterprint = () => printWindow.close();
  };
  printWindow.document.open();
  printWindow.document.write(`<!doctype html><html><head><title>Receipt</title><style>
    @page { size: ${safePaperSize === 'thermal' ? '80mm auto' : 'A4'}; margin: ${safePaperSize === 'thermal' ? '4mm' : '16mm'}; }
    * { box-sizing: border-box; } body { margin: 0; color: #111; font-family: ${safePaperSize === 'thermal' ? 'Consolas, monospace' : 'Arial, sans-serif'}; }
    pre { width: ${safePaperSize === 'thermal' ? '72mm' : '100%'}; margin: 0 auto; white-space: pre-wrap; overflow-wrap: anywhere; font-size: ${safePaperSize === 'thermal' ? '10px' : '13px'}; line-height: 1.35; }
  </style></head><body><pre>${safeReceipt}</pre></body></html>`);
  printWindow.document.close();
  return true;
}

function printSalesInvoice(sale) {
  const printWindow = window.open('', '_blank', 'width=900,height=1050');
  if (!printWindow) {
    alert('Please allow pop-ups to print the invoice.');
    return;
  }

  const customer = state.customers.find((entry) => entry.id === sale.customerId);
  const businessLines = [state.business.address, state.business.phone ? `Phone: ${state.business.phone}` : '', state.business.email ? `Email: ${state.business.email}` : ''].filter(Boolean);
  const customerDetails = [
    { label: 'City, State, Zip:', value: customer?.address || sale.deliveryAddress },
    { label: 'Phone:', value: customer?.phone || sale.paymentDetails?.customerPhone },
    { label: 'Email:', value: customer?.email || sale.customerEmail }
  ].filter((detail) => detail.value);
  const paymentAccounts = state.mobileMoneyAccounts.filter((account) => account.status !== 'Inactive');
  const itemRows = sale.items.map((item) => `
    <tr>
      <td>${escapeHtml(formatShortDate(sale.createdAt))}</td>
      <td>${escapeHtml(item.name)}</td>
      <td class="number">${formatCurrency(item.price)}</td>
      <td class="center">${Number(item.qty || 0).toLocaleString('en-US')} ${escapeHtml(item.unit || getProductUnit(item))}</td>
      <td class="number">${formatCurrency(item.total)}</td>
    </tr>`).join('') + Array.from({ length: Math.max(8 - sale.items.length, 0) }, () => '<tr class="empty-item-row"><td>&nbsp;</td><td></td><td></td><td></td><td></td></tr>').join('');
  const paymentAccountRows = paymentAccounts.length ? paymentAccounts.map((account) => `
    <div class="payment-line"><span>${escapeHtml(account.network)} Account</span><span>${escapeHtml(account.name)}${account.phone ? ` · ${escapeHtml(account.phone)}` : ''}</span></div>
    ${account.description ? `<div class="payment-line"><span>Details</span><span>${escapeHtml(account.description)}</span></div>` : ''}`).join('') : '';
  const paymentReference = sale.paymentDetails?.confirmationCode || sale.paymentDetails?.transactionReference || sale.receiptNo;
  const paymentPhone = sale.paymentDetails?.customerPhone || customer?.phone || '';
  const paymentMethod = formatPaymentReceiptLine(sale) || 'Not recorded';
  const paymentEmail = state.business.email ? `<div class="payment-line"><span>Email</span><span>${escapeHtml(state.business.email)}</span></div>` : '';
  const confirmationRow = sale.paymentDetails?.confirmationCode && sale.paymentDetails.confirmationCode !== paymentReference
    ? `<div class="payment-line"><span>Confirmation</span><span>${escapeHtml(sale.paymentDetails.confirmationCode)}</span></div>`
    : '';
  const cashPaymentRows = sale.paymentDetails?.amountReceived !== undefined
    ? `<div class="payment-line"><span>Cash received</span><span>${formatCurrency(sale.paymentDetails.amountReceived)}</span></div><div class="payment-line"><span>Change</span><span>${formatCurrency(sale.paymentDetails.change)}</span></div>`
    : '';
  const logo = state.business.logo || new URL('assets/suuk logo.jpeg', window.location.href).href;

  printWindow.document.write(`<!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Invoice ${escapeHtml(sale.receiptNo)}</title>
        <style>
          @page { size: A4 portrait; margin: 0; }
          * { box-sizing: border-box; }
          body { margin: 0; background: #d7d7d7; color: #292929; font: 11px/1.4 Arial, Helvetica, sans-serif; }
          .invoice-page { width: 210mm; min-height: 297mm; margin: 0 auto; padding: 11mm 15mm; background: linear-gradient(145deg, #c9c9c9, #ededed 48%, #c4c4c4); }
          .invoice-sheet { width: 100%; min-height: 275mm; display: flex; flex-direction: column; background: #fff; box-shadow: 0 2px 14px #0002; }
          .invoice-header { min-height: 46mm; display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 7mm; background: #505050; color: #fff; }
          .brand h1 { margin: 0 0 3px; font-size: 15px; font-weight: 800; overflow-wrap: anywhere; }
          .brand p { margin: 1px 0; color: #e3e3e3; font-size: 8px; }
          .invoice-heading { margin-top: 3mm; text-align: left; }
          .invoice-heading h2 { margin: 0; font-size: 26px; line-height: 1.05; }
          .invoice-heading p { margin: 3px 0 0; font-size: 8px; }
          .company-logo { display: block; width: 27mm; height: 25mm; padding: 2mm; object-fit: contain; background: #fff; border: 1px solid #ddd; }
          .invoice-content { flex: 1; padding: 7mm 7mm 4mm; }
          .details { display: grid; grid-template-columns: 1fr 1fr; gap: 8mm; margin-bottom: 5mm; color: #555; font-size: 9px; }
          .details h3, .payment-info h3 { margin: 0 0 3px; color: #333; font-size: 9px; }
          .details p { display: grid; grid-template-columns: 24mm 1fr; gap: 2mm; margin: 1px 0; overflow-wrap: anywhere; }
          .details .detail-label { color: #555; }
          .bill-to { text-align: left; }
          .bill-to p { grid-template-columns: 19mm 1fr; }
          .bill-to h3 { margin-left: 21mm; }
          .bill-to .client-name { font-weight: 700; }
          table { width: 100%; border-collapse: collapse; table-layout: fixed; }
          th, td { padding: 5px 4px; border: 1px solid #777; }
          thead th { background: #555; color: #fff; font-size: 8px; text-align: left; }
          tbody td { height: 9mm; overflow-wrap: anywhere; }
          th:first-child, td:first-child { width: 14%; }
          th:nth-child(2), td:nth-child(2) { width: 42%; }
          th:nth-child(3), td:nth-child(3) { width: 17%; }
          th:nth-child(4), td:nth-child(4) { width: 9%; }
          th:nth-child(5), td:nth-child(5) { width: 18%; }
          .number { text-align: right; white-space: nowrap; }
          .center { text-align: center; }
          tfoot th, tfoot td { padding: 5px; background: #505050; color: #fff; font-weight: 700; }
          tfoot th { text-align: right; }
          .payment-info { display: grid; grid-template-columns: 1.3fr 0.7fr; gap: 8mm; min-height: 31mm; padding: 6mm 7mm; border-top: 1px solid #ddd; font-size: 8px; }
          .payment-info p { margin: 1px 0; overflow-wrap: anywhere; }
          .payment-line { display: grid; grid-template-columns: 25mm 1fr; gap: 2mm; margin: 1px 0; }
          .payment-line span:first-child { font-weight: 700; }
          .payment-summary { margin-top: 2mm; }
          .signature { align-self: end; text-align: center; font-size: 8px; }
          .signature-mark { display: block; margin-bottom: 2mm; color: #404040; font-family: cursive; font-size: 22px; font-style: italic; }
          .invoice-footer { margin-top: auto; padding: 3mm; background: #505050; color: #fff; font-size: 9px; font-weight: 700; text-align: center; }
          @media screen and (max-width: 600px) {
            .invoice-page { width: 100%; min-height: 100vh; padding: 12px; }
            .invoice-sheet { min-height: calc(100vh - 24px); }
            .invoice-header { min-height: 100px; padding: 14px 12px; }
            .brand h1 { font-size: 12px; }
            .brand p { font-size: 8px; }
            .invoice-heading h2 { font-size: 19px; }
            .company-logo { width: 50px; height: 43px; }
            .invoice-content { padding: 18px 10px; }
            .details { gap: 8px; font-size: 8px; }
            .details p { grid-template-columns: 19mm 1fr; }
            .bill-to p { grid-template-columns: 15mm 1fr; }
            .bill-to h3 { margin-left: 17mm; }
            th, td { padding: 5px 3px; font-size: 8px; }
            tbody td { height: 30px; }
            .payment-info { gap: 8px; padding: 14px 10px; }
            .payment-line { grid-template-columns: 20mm 1fr; }
          }
          @media print {
            body { background: #d7d7d7; print-color-adjust: exact; -webkit-print-color-adjust: exact; }
            .invoice-page { width: 210mm; min-height: 297mm; padding: 11mm 15mm; }
            .invoice-sheet { min-height: 275mm; box-shadow: none; }
          }
        </style>
      </head>
      <body>
        <main class="invoice-page">
          <article class="invoice-sheet">
            <header class="invoice-header">
              <div class="brand">
                <h1>${escapeHtml(state.business.name)}</h1>
                ${businessLines.map((line) => `<p>${escapeHtml(line)}</p>`).join('')}
                <div class="invoice-heading"><h2>INVOICE</h2><p>NO: ${escapeHtml(sale.receiptNo)}</p></div>
              </div>
              <img class="company-logo" src="${escapeHtml(logo)}" alt="${escapeHtml(state.business.name)} logo">
            </header>
            <div class="invoice-content">
              <section class="details">
                <div>
                  <h3>Account</h3>
                  <p><span class="detail-label">Payment Type:</span><span>${escapeHtml(paymentMethod)}</span></p>
                  <p><span class="detail-label">Reference:</span><span>${escapeHtml(paymentReference)}</span></p>
                  ${paymentPhone ? `<p><span class="detail-label">Phone:</span><span>${escapeHtml(paymentPhone)}</span></p>` : ''}
                  ${sale.paymentDetails?.paymentChannel ? `<p><span class="detail-label">Channel:</span><span>${escapeHtml(sale.paymentDetails.paymentChannel)}</span></p>` : ''}
                </div>
                <div class="bill-to">
                  <h3>Bill to:</h3>
                  <p><span class="detail-label">Company/Client:</span><span class="client-name">${escapeHtml(sale.customerName || 'Customer')}</span></p>
                  ${customerDetails.map((detail) => `<p><span class="detail-label">${detail.label}</span><span>${escapeHtml(detail.value)}</span></p>`).join('')}
                  <p><span class="detail-label">Date:</span><span>${escapeHtml(formatShortDate(sale.createdAt))}</span></p>
                </div>
              </section>
              <table>
                <thead><tr><th>Date</th><th>Item Description</th><th>Price</th><th>Qty</th><th>Total</th></tr></thead>
                <tbody>${itemRows}</tbody>
                <tfoot>
                  <tr class="total-row"><th colspan="4">Total</th><td class="number">${formatCurrency(sale.total)}</td></tr>
                </tfoot>
              </table>
            </div>
            <section class="payment-info">
              <div>
                <h3>Payment Information</h3>
                <div class="payment-line"><span>Method</span><span>${escapeHtml(paymentMethod)}</span></div>
                <div class="payment-line"><span>No / Account</span><span>${escapeHtml(paymentReference)}</span></div>
                ${confirmationRow}
                ${paymentPhone ? `<div class="payment-line"><span>Phone</span><span>${escapeHtml(paymentPhone)}</span></div>` : ''}
                ${paymentAccountRows}
                ${paymentEmail}
                ${cashPaymentRows}
              </div>
              <div class="signature">
                <span class="signature-mark">SUUK</span>
                <span>${escapeHtml(sale.cashierName || 'Authorized Representative')}</span><br>
                <strong>Cashier</strong>
              </div>
            </section>
            <footer class="invoice-footer">THANK YOU</footer>
          </article>
        </main>
        <script>window.onload=function(){window.print();window.onafterprint=function(){window.close();};};</script>
      </body>
    </html>`);
  printWindow.document.close();
}

function uid(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
}

function normalizeDelivery(delivery) {
  const createdAt = delivery.createdAt || new Date().toISOString();
  const legacyStatus = { 'Out for Delivery': 'Dispatched' }[delivery.status] || delivery.status;
  return {
    ...delivery,
    deliveryNo: delivery.deliveryNo || `D${String(delivery.id || uid('del')).replace(/\D/g, '').slice(-6) || Date.now().toString().slice(-6)}`,
    status: DELIVERY_STATUSES.includes(legacyStatus) ? legacyStatus : 'Preparing',
    orderTotal: Number(delivery.orderTotal || 0),
    fee: Number(delivery.fee || 0),
    customerEmail: delivery.customerEmail || '',
    driverId: delivery.driverId || '',
    driverName: delivery.driverName || '',
    pin: delivery.pin || String(Math.floor(1000 + Math.random() * 9000)),
    createdAt,
    timestamps: { created: createdAt, ...(delivery.timestamps || {}) },
    failureReason: delivery.failureReason || '',
    failureDescription: delivery.failureDescription || ''
  };
}

function slugify(value) {
  return String(value).toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

function formatCurrency(value) {
  return `${state.business?.currency || 'UGX'} ${Number(value || 0).toLocaleString('en-US')}`;
}

function formatRole(role) {
  return { owner: 'Business Owner', admin: 'Administrator', manager: 'Branch Manager', sales: 'Sales', purchase: 'Purchase & Inventory', delivery: 'Delivery Person' }[role] || role;
}

function escapeHtml(value) {
  return String(value || '').replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[character]));
}

function formatDate(value) {
  if (!value) return '—';
  return new Date(value).toLocaleString('en-UG', {
    dateStyle: 'medium',
    timeStyle: 'short'
  });
}

function formatShortDate(value) {
  if (!value) return 'Not set';
  return new Date(`${String(value).slice(0, 10)}T12:00:00Z`).toLocaleDateString('en-UG', { dateStyle: 'medium' });
}

function formatExpiry(value) {
  if (!value) return 'Not set';
  const expiry = new Date(`${value}T00:00:00`);
  const daysRemaining = Math.ceil((expiry - new Date(new Date().toDateString())) / 86400000);
  if (daysRemaining < 0) return `Expired · ${formatShortDate(value)}`;
  if (daysRemaining <= 30) return `Soon · ${formatShortDate(value)}`;
  return formatShortDate(value);
}

function expiryClass(value) {
  if (!value) return 'text-muted';
  const expiry = new Date(`${value}T00:00:00`);
  const daysRemaining = Math.ceil((expiry - new Date(new Date().toDateString())) / 86400000);
  return daysRemaining < 0 ? 'expiry-danger' : daysRemaining <= 30 ? 'expiry-warning' : '';
}

function dateISO() {
  return new Date().toISOString().split('T')[0];
}

window.addEventListener('load', () => {
  receiptPreview.textContent = lastReceiptText;
  renderBadgeSummary();
});

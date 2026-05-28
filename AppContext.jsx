"use client";
import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext(null);

export const CURRENCIES = {
  EGP: { symbol: "ج.م", name: "جنيه مصري", nameEn: "Egyptian Pound" },
  USD: { symbol: "$", name: "دولار أمريكي", nameEn: "US Dollar" },
  SAR: { symbol: "﷼", name: "ريال سعودي", nameEn: "Saudi Riyal" },
  AED: { symbol: "د.إ", name: "درهم إماراتي", nameEn: "UAE Dirham" },
  EUR: { symbol: "€", name: "يورو", nameEn: "Euro" },
};

export const T = {
  ar: {
    dashboard: "لوحة التحكم",
    pos: "الكاشير",
    sales: "المبيعات",
    purchases: "المشتريات",
    inventory: "المخزون",
    customers: "العملاء",
    suppliers: "الموردين",
    supplierPayments: "مدفوعات الموردين",
    treasury: "الخزينة",
    expenses: "المصروفات",
    reports: "التقارير",
    settings: "الإعدادات",
    logout: "تسجيل الخروج",
    search: "بحث...",
    add: "إضافة",
    edit: "تعديل",
    delete: "حذف",
    save: "حفظ",
    cancel: "إلغاء",
    confirm: "تأكيد",
    print: "طباعة",
    export: "تصدير",
    name: "الاسم",
    price: "السعر",
    quantity: "الكمية",
    total: "الإجمالي",
    discount: "الخصم",
    tax: "الضريبة",
    subtotal: "المجموع الفرعي",
    paid: "المدفوع",
    remaining: "المتبقي",
    paymentMethod: "طريقة الدفع",
    cash: "نقدًا",
    credit: "آجل",
    partial: "جزئي",
    notes: "ملاحظات",
    phone: "الهاتف",
    email: "البريد الإلكتروني",
    address: "العنوان",
    code: "الكود",
    barcode: "الباركود",
    category: "التصنيف",
    unit: "الوحدة",
    costPrice: "سعر التكلفة",
    salePrice: "سعر البيع",
    stock: "المخزون",
    minStock: "الحد الأدنى",
    actions: "الإجراءات",
    date: "التاريخ",
    invoiceNumber: "رقم الفاتورة",
    customer: "العميل",
    supplier: "المورد",
    balance: "الرصيد",
    salesToday: "مبيعات اليوم",
    salesMonth: "مبيعات الشهر",
    salesYear: "مبيعات السنة",
    profit: "الأرباح",
    treasuryBalance: "رصيد الخزينة",
    inventoryValue: "قيمة المخزون",
    lowStock: "مخزون منخفض",
    recentSales: "آخر المبيعات",
    addProduct: "إضافة منتج",
    addCustomer: "إضافة عميل",
    addSupplier: "إضافة مورد",
    addExpense: "إضافة مصروف",
    completePayment: "إتمام الدفع",
    selectCustomer: "اختر عميل",
    cashCustomer: "عميل نقدي",
    from: "من",
    to: "إلى",
    generate: "توليد التقرير",
    salesReport: "تقرير المبيعات",
    purchasesReport: "تقرير المشتريات",
    expensesReport: "تقرير المصروفات",
    profitReport: "تقرير الأرباح",
    inventoryReport: "تقرير المخزون",
    companyName: "اسم الشركة",
    currency: "العملة",
    language: "اللغة",
    receiptTemplate: "قالب الإيصال",
    backup: "النسخ الاحتياطي",
    restore: "الاستعادة",
    taxRate: "نسبة الضريبة",
    address2: "العنوان",
    receiptFooter: "نص أسفل الإيصال",
    deleteConfirm: "هل أنت متأكد من الحذف؟",
    deleteWarning: "لا يمكن التراجع عن هذه العملية",
    yes: "نعم",
    no: "لا",
    success: "تمت العملية بنجاح",
    error: "حدث خطأ",
    loading: "جارٍ التحميل...",
    noData: "لا توجد بيانات",
    amount: "المبلغ",
    description: "الوصف",
    type: "النوع",
    in: "وارد",
    out: "صادر",
    companyPhone: "هاتف الشركة",
    username: "اسم المستخدم",
    password: "كلمة المرور",
    login: "تسجيل الدخول",
    rememberMe: "تذكرني",
    fullName: "الاسم الكامل",
    role: "الدور",
    status: "الحالة",
    active: "نشط",
    inactive: "غير نشط",
    allCategories: "جميع التصنيفات",
    stockAlert: "تنبيه مخزون منخفض",
    items: "عناصر",
    piece: "قطعة",
    kg: "كجم",
    liter: "لتر",
    box: "صندوق",
    paymentDate: "تاريخ الدفع",
    requiredBalance: "الرصيد المستحق",
    paySupplier: "دفع للمورد",
    invoice: "فاتورة",
    receipt: "إيصال",
    page: "صفحة",
    of: "من",
    exportPDF: "تصدير PDF",
    exportExcel: "تصدير Excel",
    printReport: "طباعة التقرير",
  },
  en: {
    dashboard: "Dashboard",
    pos: "POS",
    sales: "Sales",
    purchases: "Purchases",
    inventory: "Inventory",
    customers: "Customers",
    suppliers: "Suppliers",
    supplierPayments: "Supplier Payments",
    treasury: "Treasury",
    expenses: "Expenses",
    reports: "Reports",
    settings: "Settings",
    logout: "Logout",
    search: "Search...",
    add: "Add",
    edit: "Edit",
    delete: "Delete",
    save: "Save",
    cancel: "Cancel",
    confirm: "Confirm",
    print: "Print",
    export: "Export",
    name: "Name",
    price: "Price",
    quantity: "Quantity",
    total: "Total",
    discount: "Discount",
    tax: "Tax",
    subtotal: "Subtotal",
    paid: "Paid",
    remaining: "Remaining",
    paymentMethod: "Payment Method",
    cash: "Cash",
    credit: "Credit",
    partial: "Partial",
    notes: "Notes",
    phone: "Phone",
    email: "Email",
    address: "Address",
    code: "Code",
    barcode: "Barcode",
    category: "Category",
    unit: "Unit",
    costPrice: "Cost Price",
    salePrice: "Sale Price",
    stock: "Stock",
    minStock: "Min Stock",
    actions: "Actions",
    date: "Date",
    invoiceNumber: "Invoice #",
    customer: "Customer",
    supplier: "Supplier",
    balance: "Balance",
    salesToday: "Today's Sales",
    salesMonth: "Monthly Sales",
    salesYear: "Annual Sales",
    profit: "Profit",
    treasuryBalance: "Treasury Balance",
    inventoryValue: "Inventory Value",
    lowStock: "Low Stock",
    recentSales: "Recent Sales",
    addProduct: "Add Product",
    addCustomer: "Add Customer",
    addSupplier: "Add Supplier",
    addExpense: "Add Expense",
    completePayment: "Complete Payment",
    selectCustomer: "Select Customer",
    cashCustomer: "Cash Customer",
    from: "From",
    to: "To",
    generate: "Generate Report",
    salesReport: "Sales Report",
    purchasesReport: "Purchases Report",
    expensesReport: "Expenses Report",
    profitReport: "Profit Report",
    inventoryReport: "Inventory Report",
    companyName: "Company Name",
    currency: "Currency",
    language: "Language",
    receiptTemplate: "Receipt Template",
    backup: "Backup",
    restore: "Restore",
    taxRate: "Tax Rate",
    address2: "Address",
    receiptFooter: "Receipt Footer",
    deleteConfirm: "Are you sure you want to delete?",
    deleteWarning: "This action cannot be undone",
    yes: "Yes",
    no: "No",
    success: "Operation completed successfully",
    error: "An error occurred",
    loading: "Loading...",
    noData: "No data available",
    amount: "Amount",
    description: "Description",
    type: "Type",
    in: "Income",
    out: "Expense",
    companyPhone: "Company Phone",
    username: "Username",
    password: "Password",
    login: "Login",
    rememberMe: "Remember Me",
    fullName: "Full Name",
    role: "Role",
    status: "Status",
    active: "Active",
    inactive: "Inactive",
    allCategories: "All Categories",
    stockAlert: "Low Stock Alert",
    items: "Items",
    piece: "Piece",
    kg: "KG",
    liter: "Liter",
    box: "Box",
    paymentDate: "Payment Date",
    requiredBalance: "Outstanding Balance",
    paySupplier: "Pay Supplier",
    invoice: "Invoice",
    receipt: "Receipt",
    page: "Page",
    of: "of",
    exportPDF: "Export PDF",
    exportExcel: "Export Excel",
    printReport: "Print Report",
  },
};

export function AppProvider({ children }) {
  const [lang, setLang] = useState("ar");
  const [currency, setCurrency] = useState("EGP");
  const [user, setUser] = useState(null);
  const [settings, setSettings] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const savedLang = localStorage.getItem("kn_lang") || "ar";
    const savedCurrency = localStorage.getItem("kn_currency") || "EGP";
    const savedUser = localStorage.getItem("kn_user");
    setLang(savedLang);
    setCurrency(savedCurrency);
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {}
    }
    // Load settings from API
    fetch("/api/settings")
      .then((r) => r.json())
      .then((d) => {
        if (d.settings) setSettings(d.settings);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    localStorage.setItem("kn_lang", lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem("kn_currency", currency);
  }, [currency]);

  const t = (key) => T[lang][key] || key;
  const currencySymbol = CURRENCIES[currency]?.symbol || "ج.م";

  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem("kn_user", JSON.stringify(userData));
    localStorage.setItem("kn_token", token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("kn_user");
    localStorage.removeItem("kn_token");
  };

  const formatMoney = (amount) => {
    const num = parseFloat(amount || 0).toFixed(2);
    return lang === "ar"
      ? `${num} ${currencySymbol}`
      : `${currencySymbol}${num}`;
  };

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        currency,
        setCurrency,
        user,
        login,
        logout,
        settings,
        setSettings,
        t,
        currencySymbol,
        formatMoney,
        sidebarOpen,
        setSidebarOpen,
        CURRENCIES,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}

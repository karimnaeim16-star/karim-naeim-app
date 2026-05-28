"use client";
import { useState, useEffect } from "react";
import { useApp } from "./AppContext";
import {
  LayoutDashboard,
  ShoppingCart,
  TrendingUp,
  ShoppingBag,
  Package,
  Users,
  Truck,
  CreditCard,
  Vault,
  Receipt,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Bell,
  Globe,
  DollarSign,
  AlertTriangle,
  Search,
  User,
} from "lucide-react";

const NAV_ITEMS = [
  { key: "dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { key: "pos", icon: ShoppingCart, href: "/pos" },
  { key: "sales", icon: TrendingUp, href: "/sales" },
  { key: "purchases", icon: ShoppingBag, href: "/purchases" },
  { key: "inventory", icon: Package, href: "/products" },
  { key: "customers", icon: Users, href: "/customers" },
  { key: "suppliers", icon: Truck, href: "/suppliers" },
  { key: "supplierPayments", icon: CreditCard, href: "/supplier-payments" },
  { key: "treasury", icon: Vault, href: "/treasury" },
  { key: "expenses", icon: Receipt, href: "/expenses" },
  {
    key: "reports",
    icon: BarChart3,
    children: [
      { key: "salesReport", href: "/reports?type=sales" },
      { key: "purchasesReport", href: "/reports?type=purchases" },
      { key: "expensesReport", href: "/reports?type=expenses" },
      { key: "profitReport", href: "/reports?type=profit" },
      { key: "inventoryReport", href: "/reports?type=inventory" },
    ],
  },
  {
    key: "settings",
    icon: Settings,
    children: [
      { key: "companyName", href: "/settings?tab=company" },
      { key: "currency", href: "/settings?tab=currency" },
      { key: "language", href: "/settings?tab=language" },
      { key: "receiptTemplate", href: "/settings?tab=receipt" },
      { key: "backup", href: "/settings?tab=backup" },
    ],
  },
];

function NavItem({ item, collapsed, currentPath }) {
  const { t, lang } = useApp();
  const [open, setOpen] = useState(false);
  const isActive = item.href
    ? currentPath === item.href ||
      currentPath.startsWith(item.href?.split("?")[0] || "")
    : false;
  const Icon = item.icon;

  if (item.children) {
    return (
      <div>
        <button
          onClick={() => setOpen(!open)}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group
            ${open ? "bg-blue-50 text-blue-600" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}
        >
          {Icon && <Icon size={20} className="flex-shrink-0" />}
          {!collapsed && (
            <>
              <span className="flex-1 text-sm font-medium text-start">
                {t(item.key)}
              </span>
              {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </>
          )}
        </button>
        {open && !collapsed && (
          <div className="mt-1 ms-4 border-s-2 border-blue-100 ps-3 space-y-0.5">
            {item.children.map((child) => (
              <a
                key={child.key}
                href={child.href}
                className={`block px-3 py-2 rounded-lg text-sm transition-all
                  ${
                    currentPath +
                      (typeof window !== "undefined"
                        ? window.location.search
                        : "") ===
                    child.href
                      ? "bg-blue-500 text-white font-medium"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                  }`}
              >
                {t(child.key)}
              </a>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <a
      href={item.href}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group
        ${isActive ? "bg-blue-500 text-white shadow-md shadow-blue-200" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}
    >
      {Icon && <Icon size={20} className="flex-shrink-0" />}
      {!collapsed && <span className="text-sm font-medium">{t(item.key)}</span>}
    </a>
  );
}

export default function AppLayout({ children, title }) {
  const {
    t,
    lang,
    setLang,
    currency,
    setCurrency,
    user,
    logout,
    sidebarOpen,
    setSidebarOpen,
    settings,
    CURRENCIES,
    formatMoney,
  } = useApp();
  const [currentPath, setCurrentPath] = useState("/");
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showCurrMenu, setShowCurrMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const collapsed = !sidebarOpen;

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  useEffect(() => {
    document.title = `${title || t("dashboard")} — ${settings?.company_name || "Karim Naeim"}`;
  }, [title, settings, lang]);

  return (
    <div
      className={`flex h-screen bg-slate-50 overflow-hidden ${lang === "ar" ? "font-[Cairo,Tajawal,sans-serif]" : "font-[Inter,sans-serif]"}`}
    >
      {/* Sidebar */}
      <aside
        className={`flex-shrink-0 h-full bg-white border-e border-slate-200 flex flex-col transition-all duration-300 overflow-hidden z-30
          ${collapsed ? "w-16" : "w-64"}`}
        style={{ boxShadow: "2px 0 12px rgba(0,0,0,0.04)" }}
      >
        {/* Logo */}
        <div
          className={`flex items-center gap-3 px-4 py-4 border-b border-slate-100 ${collapsed ? "justify-center" : ""}`}
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-base flex-shrink-0">
            K
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <div className="font-bold text-slate-900 text-sm leading-tight truncate">
                {settings?.company_name || "Karim Naeim"}
              </div>
              <div className="text-xs text-slate-400">POS & Accounting</div>
            </div>
          )}
        </div>

        {/* Toggle button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="flex items-center justify-center p-2 mx-3 mt-3 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors"
        >
          {collapsed ? <Menu size={18} /> : <X size={18} />}
        </button>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-0.5">
          {NAV_ITEMS.map((item) => (
            <NavItem
              key={item.key}
              item={item}
              collapsed={collapsed}
              currentPath={currentPath}
            />
          ))}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-slate-100">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-500 hover:bg-red-50 transition-colors"
          >
            <LogOut size={20} className="flex-shrink-0" />
            {!collapsed && (
              <span className="text-sm font-medium">{t("logout")}</span>
            )}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Header */}
        <header
          className="bg-white border-b border-slate-200 px-5 py-3 flex items-center gap-3 flex-shrink-0"
          style={{ boxShadow: "0 1px 8px rgba(0,0,0,0.04)" }}
        >
          <h1 className="font-bold text-slate-800 text-lg flex-1 min-w-0 truncate">
            {title || t("dashboard")}
          </h1>

          {/* Language switcher */}
          <div className="relative">
            <button
              onClick={() => {
                setShowLangMenu(!showLangMenu);
                setShowCurrMenu(false);
                setShowUserMenu(false);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <Globe size={15} />
              <span>{lang === "ar" ? "عربي" : "EN"}</span>
            </button>
            {showLangMenu && (
              <div className="absolute top-10 end-0 bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden z-50 min-w-[120px]">
                <button
                  onClick={() => {
                    setLang("ar");
                    setShowLangMenu(false);
                  }}
                  className={`w-full text-start px-4 py-2.5 text-sm hover:bg-slate-50 ${lang === "ar" ? "text-blue-600 font-semibold" : "text-slate-700"}`}
                >
                  🇪🇬 العربية
                </button>
                <button
                  onClick={() => {
                    setLang("en");
                    setShowLangMenu(false);
                  }}
                  className={`w-full text-start px-4 py-2.5 text-sm hover:bg-slate-50 ${lang === "en" ? "text-blue-600 font-semibold" : "text-slate-700"}`}
                >
                  🇺🇸 English
                </button>
              </div>
            )}
          </div>

          {/* Currency switcher */}
          <div className="relative">
            <button
              onClick={() => {
                setShowCurrMenu(!showCurrMenu);
                setShowLangMenu(false);
                setShowUserMenu(false);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <DollarSign size={15} />
              <span>{currency}</span>
            </button>
            {showCurrMenu && (
              <div className="absolute top-10 end-0 bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden z-50 min-w-[150px]">
                {Object.entries(CURRENCIES).map(([code, info]) => (
                  <button
                    key={code}
                    onClick={() => {
                      setCurrency(code);
                      setShowCurrMenu(false);
                    }}
                    className={`w-full text-start px-4 py-2.5 text-sm hover:bg-slate-50 flex items-center gap-2
                      ${currency === code ? "text-blue-600 font-semibold bg-blue-50" : "text-slate-700"}`}
                  >
                    <span className="font-mono">{info.symbol}</span>
                    <span>{lang === "ar" ? info.name : info.nameEn}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User menu */}
          <div className="relative">
            <button
              onClick={() => {
                setShowUserMenu(!showUserMenu);
                setShowLangMenu(false);
                setShowCurrMenu(false);
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">
                {user?.full_name?.[0] || user?.username?.[0] || "A"}
              </div>
              <span className="hidden sm:inline">
                {user?.full_name || user?.username || "Admin"}
              </span>
            </button>
            {showUserMenu && (
              <div className="absolute top-10 end-0 bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden z-50 min-w-[150px]">
                <div className="px-4 py-3 border-b border-slate-100">
                  <div className="font-semibold text-slate-800 text-sm">
                    {user?.full_name || user?.username}
                  </div>
                  <div className="text-xs text-slate-400">{user?.role}</div>
                </div>
                <button
                  onClick={() => {
                    logout();
                    window.location.href = "/login";
                  }}
                  className="w-full text-start px-4 py-2.5 text-sm text-red-500 hover:bg-red-50"
                >
                  {t("logout")}
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-5">{children}</main>
      </div>

      {/* Global style */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap');
        body { font-family: 'Cairo', 'Inter', sans-serif; }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: #f1f5f9; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 99px; }
        .kn-card { background: white; border-radius: 16px; border: 1px solid #e2e8f0; padding: 20px; }
        .kn-btn-primary { background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; border-radius: 10px; padding: 8px 18px; font-weight: 600; font-size: 14px; transition: all 0.2s; box-shadow: 0 2px 8px rgba(37,99,235,0.3); }
        .kn-btn-primary:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(37,99,235,0.4); }
        .kn-btn-secondary { background: #f1f5f9; color: #475569; border-radius: 10px; padding: 8px 18px; font-weight: 500; font-size: 14px; transition: all 0.2s; }
        .kn-btn-danger { background: linear-gradient(135deg, #ef4444, #dc2626); color: white; border-radius: 10px; padding: 8px 18px; font-weight: 600; font-size: 14px; transition: all 0.2s; box-shadow: 0 2px 8px rgba(239,68,68,0.3); }
        .kn-input { width: 100%; border: 1.5px solid #e2e8f0; border-radius: 10px; padding: 9px 13px; font-size: 14px; transition: border-color 0.2s; outline: none; background: white; }
        .kn-input:focus { border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37,99,235,0.1); }
        .kn-table { width: 100%; border-collapse: separate; border-spacing: 0; }
        .kn-table th { background: #f8fafc; font-size: 12px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; padding: 10px 14px; border-bottom: 1px solid #e2e8f0; }
        .kn-table td { padding: 12px 14px; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #1e293b; }
        .kn-table tr:hover td { background: #f8fafc; }
        .kn-badge-green { background: #d1fae5; color: #059669; border-radius: 99px; padding: 2px 10px; font-size: 12px; font-weight: 600; display: inline-block; }
        .kn-badge-red { background: #fee2e2; color: #dc2626; border-radius: 99px; padding: 2px 10px; font-size: 12px; font-weight: 600; display: inline-block; }
        .kn-badge-yellow { background: #fef3c7; color: #d97706; border-radius: 99px; padding: 2px 10px; font-size: 12px; font-weight: 600; display: inline-block; }
        .kn-badge-blue { background: #dbeafe; color: #2563eb; border-radius: 99px; padding: 2px 10px; font-size: 12px; font-weight: 600; display: inline-block; }
      `}</style>
    </div>
  );
}

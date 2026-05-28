"use client";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useApp } from "../../components/AppContext";
import AppLayout from "../../components/AppLayout";
import {
  Vault,
  TrendingUp,
  TrendingDown,
  Plus,
  X,
  Check,
  Printer,
} from "lucide-react";

function withAuth(C) {
  return function G(p) {
    const [ok, setOk] = useState(false);
    useEffect(() => {
      if (!localStorage.getItem("kn_user")) window.location.href = "/login";
      else setOk(true);
    }, []);
    if (!ok) return null;
    return <C {...p} />;
  };
}

function AddTransactionModal({ onClose, onSave, lang, t }) {
  const [form, setForm] = useState({ type: "in", amount: "", description: "" });
  const [loading, setLoading] = useState(false);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSave = async () => {
    if (!form.amount) return;
    setLoading(true);
    try {
      const res = await fetch("/api/treasury", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, amount: parseFloat(form.amount) }),
      });
      if (!res.ok) throw new Error("Failed");
      onSave();
    } catch {
      alert(lang === "ar" ? "حدث خطأ" : "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div
        className="bg-white rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden"
        dir={lang === "ar" ? "rtl" : "ltr"}
      >
        <div className="bg-gradient-to-r from-cyan-500 to-cyan-700 p-5 text-white flex items-center justify-between">
          <h2 className="text-lg font-bold">
            {lang === "ar" ? "إضافة معاملة" : "Add Transaction"}
          </h2>
          <button onClick={onClose}>
            <X size={22} />
          </button>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">
              {t("type")}
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => set("type", "in")}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all ${form.type === "in" ? "border-green-500 bg-green-50 text-green-600" : "border-slate-200 text-slate-500"}`}
              >
                ↑ {lang === "ar" ? "وارد" : "Income"}
              </button>
              <button
                onClick={() => set("type", "out")}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all ${form.type === "out" ? "border-red-500 bg-red-50 text-red-600" : "border-slate-200 text-slate-500"}`}
              >
                ↓ {lang === "ar" ? "صادر" : "Expense"}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">
              {t("amount")}
            </label>
            <input
              type="number"
              value={form.amount}
              onChange={(e) => set("amount", e.target.value)}
              className="kn-input text-lg font-bold"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">
              {t("description")}
            </label>
            <input
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              className="kn-input text-sm"
            />
          </div>
        </div>
        <div className="p-4 border-t flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 kn-btn-secondary py-2.5 text-sm"
          >
            {t("cancel")}
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex-[2] kn-btn-primary py-2.5 text-sm font-bold"
          >
            {loading ? "..." : t("save")}
          </button>
        </div>
      </div>
    </div>
  );
}

function TreasuryPage() {
  const { t, lang, formatMoney } = useApp();
  const [showAdd, setShowAdd] = useState(false);
  const [toast, setToast] = useState("");
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["treasury"],
    queryFn: async () => {
      const r = await fetch("/api/treasury");
      return r.json();
    },
  });

  const transactions = data?.transactions || [];
  const balance = data?.current_balance || 0;
  const totalIn = data?.total_in || 0;
  const totalOut = data?.total_out || 0;

  const handlePrint = () => {
    const win = window.open("", "_blank", "width=900,height=600");
    win.document.write(`<html dir="${lang === "ar" ? "rtl" : "ltr"}"><head><style>
      body { font-family: Arial, sans-serif; padding: 24px; font-size: 13px; }
      h2 { text-align: center; } table { width: 100%; border-collapse: collapse; }
      th, td { border: 1px solid #e2e8f0; padding: 8px; } th { background: #f8fafc; }
      .in { color: green; } .out { color: red; }
    </style></head><body>
      <h2>${lang === "ar" ? "كشف الخزينة" : "Treasury Statement"}</h2>
      <p>${lang === "ar" ? "الرصيد الحالي:" : "Current Balance:"} <strong>${formatMoney(balance)}</strong></p>
      <table><tr><th>${t("date")}</th><th>${t("type")}</th><th>${t("description")}</th><th>${t("amount")}</th><th>${lang === "ar" ? "الرصيد بعد" : "Balance After"}</th></tr>
      ${transactions.map((tx) => `<tr><td>${new Date(tx.created_at).toLocaleDateString()}</td><td class="${tx.type}">${tx.type === "in" ? (lang === "ar" ? "وارد" : "In") : lang === "ar" ? "صادر" : "Out"}</td><td>${tx.description || ""}</td><td class="${tx.type}">${formatMoney(tx.amount)}</td><td>${formatMoney(tx.balance_after)}</td></tr>`).join("")}
      </table></body></html>`);
    win.document.close();
    win.print();
  };

  return (
    <AppLayout title={t("treasury")}>
      {/* KPI */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          {
            label: lang === "ar" ? "الرصيد الحالي" : "Current Balance",
            value: formatMoney(balance),
            color: "from-cyan-500 to-cyan-700",
            icon: Vault,
          },
          {
            label: lang === "ar" ? "إجمالي الوارد" : "Total Income",
            value: formatMoney(totalIn),
            color: "from-green-500 to-green-700",
            icon: TrendingUp,
          },
          {
            label: lang === "ar" ? "إجمالي الصادر" : "Total Expense",
            value: formatMoney(totalOut),
            color: "from-red-500 to-red-700",
            icon: TrendingDown,
          },
        ].map((card) => (
          <div key={card.label} className="kn-card flex items-center gap-4">
            <div
              className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center flex-shrink-0`}
            >
              <card.icon size={22} color="white" />
            </div>
            <div>
              <p className="text-xs text-slate-400">{card.label}</p>
              <p className="font-bold text-slate-900 text-xl">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-slate-800">
          {lang === "ar" ? "سجل المعاملات" : "Transaction History"}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={handlePrint}
            className="kn-btn-secondary flex items-center gap-2 text-sm"
          >
            <Printer size={16} /> {t("print")}
          </button>
          <button
            onClick={() => setShowAdd(true)}
            className="kn-btn-primary flex items-center gap-2"
          >
            <Plus size={16} /> {lang === "ar" ? "إضافة" : "Add"}
          </button>
        </div>
      </div>

      <div className="kn-card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="kn-table">
            <thead>
              <tr>
                <th>#</th>
                <th>{t("date")}</th>
                <th>{t("type")}</th>
                <th>{t("description")}</th>
                <th>{t("amount")}</th>
                <th>{lang === "ar" ? "الرصيد بعد" : "Balance After"}</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-slate-400">
                    {t("loading")}
                  </td>
                </tr>
              ) : transactions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-slate-400">
                    {t("noData")}
                  </td>
                </tr>
              ) : (
                transactions.map((tx, i) => (
                  <tr key={tx.id}>
                    <td className="text-slate-400 text-sm">{i + 1}</td>
                    <td className="text-slate-500 text-sm">
                      {new Date(tx.created_at).toLocaleDateString(
                        lang === "ar" ? "ar-EG" : "en-US",
                      )}
                    </td>
                    <td>
                      <span
                        className={
                          tx.type === "in" ? "kn-badge-green" : "kn-badge-red"
                        }
                      >
                        {tx.type === "in"
                          ? lang === "ar"
                            ? "↑ وارد"
                            : "↑ In"
                          : lang === "ar"
                            ? "↓ صادر"
                            : "↓ Out"}
                      </span>
                    </td>
                    <td className="text-slate-600 text-sm">
                      {tx.description || "-"}
                    </td>
                    <td
                      className={`font-bold ${tx.type === "in" ? "text-green-600" : "text-red-600"}`}
                    >
                      {formatMoney(tx.amount)}
                    </td>
                    <td className="font-semibold text-slate-800">
                      {formatMoney(tx.balance_after)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showAdd && (
        <AddTransactionModal
          onClose={() => setShowAdd(false)}
          onSave={() => {
            refetch();
            setShowAdd(false);
            showToast(t("success"));
          }}
          lang={lang}
          t={t}
        />
      )}
      {toast && (
        <div className="fixed bottom-6 end-6 bg-green-500 text-white px-5 py-3 rounded-2xl shadow-lg font-semibold text-sm flex items-center gap-2 z-50">
          <Check size={16} /> {toast}
        </div>
      )}
    </AppLayout>
  );
}

export default withAuth(TreasuryPage);

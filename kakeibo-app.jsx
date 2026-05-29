/*
========================================
💰 家計簿アプリ - ビルド進捗
========================================
フェーズ1:  基盤・データ構造・状態管理    [✅]
フェーズ2:  共通コンポーネント・スマホUI  [✅]
フェーズ3:  ホーム（ダッシュボード）      [✅]
フェーズ4:  ①収入タブ                   [✅]
フェーズ5:  ②支出タブ 前半（入力・一覧） [✅]
フェーズ6:  ②支出タブ 後半（分析・予算） [✅]
フェーズ7:  ③ローンタブ 前半（登録・一覧）[✅]
フェーズ8:  ③ローンタブ 後半（返済表・繰上）[✅]
フェーズ9:  ④資産タブ 銀行・株式・投信   [✅]
フェーズ10: ④資産タブ NISA・iDeCo       [✅]
フェーズ11: ④資産タブ 変額年金・総資産   [✅]
フェーズ12: ⑤シミュ 将来資産・ローン完済 [ ]
フェーズ13: ⑤シミュ 老後資金・FIRE試算  [ ]
フェーズ14: AI機能統合                  [ ]
フェーズ15: 仕上げ・CSV出力・バックアップ [ ]
========================================
*/

import { useState, useEffect, useCallback } from "react";
import {
  Plus, Minus, Edit2, Trash2, ChevronRight, ChevronDown,
  BarChart2, PieChart, TrendingUp, Home, DollarSign,
  CreditCard, PiggyBank, Activity, Calendar, AlertCircle,
  Check, RefreshCw, Calculator
} from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, PieChart as RechartsPie, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area
} from "recharts";

// ===== デザイントークン =====
const colors = {
  income:   "#27AE60",
  expense:  "#E74C3C",
  loan:     "#E67E22",
  saving:   "#2980B9",
  asset:    "#8E44AD",
  neutral:  "#95A5A6",
  bg:       "#F8F9FA",
  card:     "#FFFFFF",
  text:     "#2C3E50",
  textLight:"#7F8C8D",
};

// ===== 初期状態 =====
const initialState = {
  salaries: [],
  expenses: [],
  budgets: {
    "食費": 50000,
    "住居費": 80000,
    "光熱費": 15000,
    "通信費": 10000,
    "交通費": 20000,
    "保険料": 30000,
    "医療費": 10000,
    "教育費": 20000,
    "娯楽費": 20000,
    "日用品": 15000,
    "被服費": 10000,
    "その他": 10000,
  },
  loans: [],
  assets: {
    bankAccounts: [],
    investments: [],
    nisa: {
      tsumitateUsed: 0,
      growthUsed: 0,
      lifetimeUsed: 0,
      year: new Date().getFullYear(),
    },
    ideco: {
      monthlyContribution: 0,
      totalContributed: 0,
      currentValue: 0,
      startDate: "",
    },
    variableAnnuities: [],
  },
  settings: {
    userName: "",
    currency: "JPY",
    monthlyGoalSaving: 50000,
    emergencyFundTarget: 1000000,
  },
};

// ===== 支出カテゴリ定義 =====
const expenseCategories = {
  "食費":   { color: "#E74C3C", subcategories: ["外食", "スーパー", "コンビニ", "宅配"], isFixed: false },
  "住居費": { color: "#E67E22", subcategories: ["家賃", "管理費", "駐車場", "修繕"], isFixed: true },
  "光熱費": { color: "#F1C40F", subcategories: ["電気", "ガス", "水道"], isFixed: false },
  "通信費": { color: "#2ECC71", subcategories: ["スマホ", "ネット", "NHK", "その他"], isFixed: true },
  "交通費": { color: "#3498DB", subcategories: ["ガソリン", "高速", "電車", "タクシー"], isFixed: false },
  "保険料": { color: "#9B59B6", subcategories: ["生命保険", "医療保険", "車保険", "火災保険"], isFixed: true },
  "医療費": { color: "#E91E63", subcategories: ["病院", "薬", "歯科"], isFixed: false },
  "教育費": { color: "#00BCD4", subcategories: ["学費", "塾", "習い事", "書籍"], isFixed: false },
  "娯楽費": { color: "#FF9800", subcategories: ["旅行", "外食", "趣味", "サブスク"], isFixed: false },
  "日用品": { color: "#795548", subcategories: ["消耗品", "家電", "家具"], isFixed: false },
  "被服費": { color: "#607D8B", subcategories: ["衣類", "靴", "バッグ"], isFixed: false },
  "その他": { color: "#95A5A6", subcategories: ["冠婚葬祭", "寄付", "その他"], isFixed: false },
};

// ===== localStorage ユーティリティ =====
const STORAGE_KEY = "kakeibo-app-data";

const saveData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("保存エラー:", e);
  }
};

const loadData = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialState;
    const parsed = JSON.parse(raw);
    return {
      ...initialState,
      ...parsed,
      assets: { ...initialState.assets, ...(parsed.assets || {}) },
      settings: { ...initialState.settings, ...(parsed.settings || {}) },
      budgets: { ...initialState.budgets, ...(parsed.budgets || {}) },
    };
  } catch (e) {
    return initialState;
  }
};

// ===== 数値フォーマット ユーティリティ =====
const fmt = (n) =>
  new Intl.NumberFormat("ja-JP").format(Math.round(n || 0));

const fmtYen = (n) => `¥${fmt(n)}`;

const parseNum = (s) => {
  const n = parseFloat(String(s).replace(/,/g, ""));
  return isNaN(n) ? 0 : n;
};

const genId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

const currentYM = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
};

const todayStr = () => new Date().toISOString().slice(0, 10);

// ===== タブ定義 =====
const TABS = [
  { id: "home",       label: "ホーム",   icon: Home },
  { id: "income",     label: "収入",     icon: DollarSign },
  { id: "expense",    label: "支出",     icon: CreditCard },
  { id: "loan",       label: "ローン",   icon: Calculator },
  { id: "asset",      label: "資産",     icon: PiggyBank },
  { id: "simulation", label: "シミュ",   icon: TrendingUp },
];

// ===== メインアプリ =====
export default function KakeiboApp() {
  const [data, setData] = useState(() => loadData());
  const [activeTab, setActiveTab] = useState("home");

  // データ更新と自動保存
  const updateData = useCallback((updater) => {
    setData((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      saveData(next);
      return next;
    });
  }, []);

  // タブコンテンツのプレースホルダー（後のフェーズで実装）
  const renderTab = () => {
    switch (activeTab) {
      case "home":       return <HomeTab       data={data} updateData={updateData} />;
      case "income":     return <IncomeTab     data={data} updateData={updateData} />;
      case "expense":    return <ExpenseTab    data={data} updateData={updateData} />;
      case "loan":       return <LoanTab       data={data} updateData={updateData} />;
      case "asset":      return <AssetTab      data={data} updateData={updateData} />;
      case "simulation": return <SimulationTab data={data} updateData={updateData} />;
      default:           return null;
    }
  };

  return (
    <div style={{
      fontFamily: "'Noto Sans JP', sans-serif",
      backgroundColor: colors.bg,
      minHeight: "100vh",
      maxWidth: 430,
      margin: "0 auto",
      position: "relative",
    }}>
      {/* コンテンツエリア */}
      <div style={{ paddingBottom: 80 }}>
        {renderTab()}
      </div>

      {/* ボトムナビゲーション */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

// ===== ボトムナビゲーション =====
function BottomNav({ activeTab, setActiveTab }) {
  return (
    <nav style={{
      position: "fixed",
      bottom: 0,
      left: "50%",
      transform: "translateX(-50%)",
      width: "100%",
      maxWidth: 430,
      height: 60,
      backgroundColor: colors.card,
      borderTop: "1px solid #E8E8E8",
      display: "flex",
      zIndex: 1000,
      boxShadow: "0 -2px 8px rgba(0,0,0,0.08)",
    }}>
      {TABS.map((tab) => {
        const Icon = tab.icon;
        const active = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
              border: "none",
              background: "none",
              cursor: "pointer",
              color: active ? colors.saving : colors.textLight,
              fontSize: 10,
              fontWeight: active ? 700 : 400,
              minHeight: 44,
              transition: "color 0.2s",
            }}
          >
            <Icon size={20} />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

// ===== フェーズ2: 共通コンポーネント =====

// カードコンポーネント
function Card({ children, style = {} }) {
  return (
    <div style={{
      backgroundColor: colors.card,
      borderRadius: 16,
      boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
      padding: 16,
      marginBottom: 12,
      ...style,
    }}>
      {children}
    </div>
  );
}

// セクションヘッダー
function SectionHeader({ title, color = colors.text, right }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
      <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color }}>{title}</h3>
      {right}
    </div>
  );
}

// 金額入力フィールド
function AmountInput({ value, onChange, placeholder = "0", label, style = {} }) {
  return (
    <div style={{ marginBottom: 12, ...style }}>
      {label && <label style={{ fontSize: 12, color: colors.textLight, display: "block", marginBottom: 4 }}>{label}</label>}
      <div style={{ position: "relative" }}>
        <span style={{
          position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
          color: colors.textLight, fontSize: 16, pointerEvents: "none",
        }}>¥</span>
        <input
          type="number"
          inputMode="numeric"
          value={value || ""}
          onChange={(e) => onChange(parseNum(e.target.value))}
          placeholder={placeholder}
          style={{
            width: "100%",
            padding: "12px 12px 12px 28px",
            fontSize: 16,
            border: "1.5px solid #E0E0E0",
            borderRadius: 10,
            outline: "none",
            boxSizing: "border-box",
            backgroundColor: "#FAFAFA",
          }}
        />
      </div>
    </div>
  );
}

// テキスト入力フィールド
function TextInput({ value, onChange, placeholder, label, style = {} }) {
  return (
    <div style={{ marginBottom: 12, ...style }}>
      {label && <label style={{ fontSize: 12, color: colors.textLight, display: "block", marginBottom: 4 }}>{label}</label>}
      <input
        type="text"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "12px",
          fontSize: 16,
          border: "1.5px solid #E0E0E0",
          borderRadius: 10,
          outline: "none",
          boxSizing: "border-box",
          backgroundColor: "#FAFAFA",
        }}
      />
    </div>
  );
}

// セレクトボックス
function SelectInput({ value, onChange, options, label, style = {} }) {
  return (
    <div style={{ marginBottom: 12, ...style }}>
      {label && <label style={{ fontSize: 12, color: colors.textLight, display: "block", marginBottom: 4 }}>{label}</label>}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          fontSize: 16,
          border: "1.5px solid #E0E0E0",
          borderRadius: 10,
          outline: "none",
          boxSizing: "border-box",
          backgroundColor: "#FAFAFA",
          appearance: "none",
        }}
      >
        {options.map((opt) => (
          <option key={opt.value ?? opt} value={opt.value ?? opt}>
            {opt.label ?? opt}
          </option>
        ))}
      </select>
    </div>
  );
}

// プライマリボタン
function PrimaryButton({ children, onClick, color = colors.income, disabled = false, style = {} }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: "100%",
        padding: "14px",
        backgroundColor: disabled ? colors.neutral : color,
        color: "#fff",
        border: "none",
        borderRadius: 12,
        fontSize: 16,
        fontWeight: 700,
        cursor: disabled ? "not-allowed" : "pointer",
        minHeight: 44,
        transition: "opacity 0.2s",
        ...style,
      }}
    >
      {children}
    </button>
  );
}

// アウトラインボタン
function OutlineButton({ children, onClick, color = colors.saving, style = {} }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "10px 16px",
        backgroundColor: "transparent",
        color,
        border: `2px solid ${color}`,
        borderRadius: 10,
        fontSize: 14,
        fontWeight: 600,
        cursor: "pointer",
        minHeight: 44,
        ...style,
      }}
    >
      {children}
    </button>
  );
}

// バッジ
function Badge({ label, color, bgColor }) {
  return (
    <span style={{
      display: "inline-block",
      padding: "2px 8px",
      borderRadius: 20,
      fontSize: 11,
      fontWeight: 600,
      color: color || "#fff",
      backgroundColor: bgColor || colors.neutral,
    }}>
      {label}
    </span>
  );
}

// プログレスバー
function ProgressBar({ value, max, color = colors.saving, showPercent = true }) {
  const pct = max > 0 ? Math.min((value / max) * 100, 100) : 0;
  const over = max > 0 && value > max;
  return (
    <div>
      <div style={{ height: 10, backgroundColor: "#EEE", borderRadius: 5, overflow: "hidden" }}>
        <div style={{
          height: "100%",
          width: `${pct}%`,
          backgroundColor: over ? colors.expense : color,
          borderRadius: 5,
          transition: "width 0.4s ease",
        }} />
      </div>
      {showPercent && (
        <div style={{ fontSize: 12, color: over ? colors.expense : colors.textLight, marginTop: 4, textAlign: "right" }}>
          {Math.round(pct)}%
          {over && " ⚠️ 超過"}
        </div>
      )}
    </div>
  );
}

// モーダル
function Modal({ title, children, onClose }) {
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: "rgba(0,0,0,0.4)", zIndex: 2000,
      display: "flex", alignItems: "flex-end", justifyContent: "center",
    }} onClick={onClose}>
      <div
        style={{
          backgroundColor: colors.card,
          borderRadius: "20px 20px 0 0",
          padding: 20,
          paddingBottom: 40,
          width: "100%",
          maxWidth: 430,
          maxHeight: "90vh",
          overflowY: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ margin: 0, fontSize: 18, color: colors.text }}>{title}</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 24, cursor: "pointer", color: colors.textLight }}>×</button>
        </div>
        {children}
      </div>
    </div>
  );
}

// アコーディオン
function Accordion({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ marginBottom: 8 }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "12px 16px", backgroundColor: "#F5F5F5", border: "none", borderRadius: 10,
          cursor: "pointer", fontSize: 14, fontWeight: 600, color: colors.text,
        }}
      >
        {title}
        {open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
      </button>
      {open && <div style={{ padding: "12px 4px 0" }}>{children}</div>}
    </div>
  );
}

// 月ナビゲーター
function MonthNavigator({ month, setMonth }) {
  const prev = () => {
    const [y, m] = month.split("-").map(Number);
    const d = new Date(y, m - 2, 1);
    setMonth(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`);
  };
  const next = () => {
    const [y, m] = month.split("-").map(Number);
    const d = new Date(y, m, 1);
    setMonth(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`);
  };
  const [y, m] = month.split("-");
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 16,
    }}>
      <button onClick={prev} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: colors.saving, minWidth: 44, minHeight: 44 }}>‹</button>
      <span style={{ fontSize: 18, fontWeight: 700, color: colors.text }}>{y}年{parseInt(m, 10)}月</span>
      <button onClick={next} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: colors.saving, minWidth: 44, minHeight: 44 }}>›</button>
    </div>
  );
}

// サマリー行
function SummaryRow({ label, value, color = colors.text, large = false }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingVertical: 4, marginBottom: 6 }}>
      <span style={{ fontSize: large ? 15 : 13, color: colors.textLight }}>{label}</span>
      <span style={{ fontSize: large ? 20 : 15, fontWeight: large ? 700 : 600, color }}>{value}</span>
    </div>
  );
}

// 区切り線
function Divider() {
  return <div style={{ height: 1, backgroundColor: "#EEE", margin: "8px 0" }} />;
}

// スワイプ削除対応リストアイテム
function SwipeDeleteItem({ onDelete, children }) {
  const [swiped, setSwiped] = useState(false);
  const [startX, setStartX] = useState(null);

  const onTouchStart = (e) => setStartX(e.touches[0].clientX);
  const onTouchEnd = (e) => {
    if (startX !== null && startX - e.changedTouches[0].clientX > 60) setSwiped(true);
    else setSwiped(false);
    setStartX(null);
  };

  return (
    <div style={{ position: "relative", overflow: "hidden", borderRadius: 10, marginBottom: 8 }}
      onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <div style={{ transform: swiped ? "translateX(-72px)" : "translateX(0)", transition: "transform 0.2s" }}>
        {children}
      </div>
      {swiped && (
        <button
          onClick={() => { setSwiped(false); onDelete(); }}
          style={{
            position: "absolute", right: 0, top: 0, bottom: 0, width: 72,
            backgroundColor: colors.expense, color: "#fff", border: "none",
            fontSize: 12, fontWeight: 700, cursor: "pointer",
          }}
        >
          削除
        </button>
      )}
    </div>
  );
}

// 空状態表示
function EmptyState({ message, icon: Icon = AlertCircle }) {
  return (
    <div style={{ textAlign: "center", padding: "32px 16px", color: colors.textLight }}>
      <Icon size={40} style={{ marginBottom: 8, opacity: 0.4 }} />
      <p style={{ margin: 0, fontSize: 14 }}>{message}</p>
    </div>
  );
}

// ページタイトル
function PageTitle({ title, subtitle }) {
  return (
    <div style={{ padding: "16px 16px 8px" }}>
      <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: colors.text }}>{title}</h2>
      {subtitle && <p style={{ margin: "4px 0 0", fontSize: 13, color: colors.textLight }}>{subtitle}</p>}
    </div>
  );
}

// ===== フェーズ1終了 - 後フェーズで実装するプレースホルダー =====

// ===== フェーズ3: ホーム（ダッシュボード）=====

function HomeTab({ data, updateData }) {
  const today = new Date();
  const ym = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`;

  // 今月の給与データ
  const thisSalary = data.salaries.find((s) => s.month === ym);
  const grossIncome = thisSalary
    ? thisSalary.basicSalary + Object.values(thisSalary.allowances || {}).reduce((a, b) => a + b, 0)
    : 0;
  const totalDeductions = thisSalary
    ? Object.values(thisSalary.deductions || {}).reduce((a, b) => a + b, 0)
    : 0;
  const netIncome = grossIncome - totalDeductions + (thisSalary?.bonus || 0) + (thisSalary?.sideIncome || 0);

  // 今月の支出
  const monthExpenses = data.expenses.filter((e) => e.date?.startsWith(ym));
  const totalExpense = monthExpenses.reduce((a, e) => a + e.amount, 0);
  const balance = netIncome - totalExpense;

  // 資産・負債
  const bankTotal = (data.assets.bankAccounts || []).reduce((a, b) => a + b.balance, 0);
  const investTotal = (data.assets.investments || []).reduce((a, inv) => a + inv.currentPrice * inv.quantity, 0);
  const idecoVal = data.assets.ideco?.currentValue || 0;
  const annuityVal = (data.assets.variableAnnuities || []).reduce((a, v) => a + v.currentValue, 0);
  const totalAsset = bankTotal + investTotal + idecoVal + annuityVal;

  const totalLoan = (data.loans || []).reduce((a, l) => a + l.remainingBalance, 0);
  const netWorth = totalAsset - totalLoan;

  // 今月の貯蓄目標
  const goalSaving = data.settings.monthlyGoalSaving || 50000;
  const actualSaving = Math.max(0, balance);

  // 支出カテゴリ別集計（円グラフ用）
  const catTotals = {};
  monthExpenses.forEach((e) => {
    catTotals[e.category] = (catTotals[e.category] || 0) + e.amount;
  });
  const pieData = Object.entries(catTotals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([name, value]) => ({ name, value, color: expenseCategories[name]?.color || colors.neutral }));

  // 直近5件の支出
  const recent5 = [...data.expenses]
    .sort((a, b) => b.date > a.date ? 1 : -1)
    .slice(0, 5);

  // ローン残高一覧
  const loanTypeIcon = { car: "🚗", housing: "🏠", scholarship: "🎓", other: "💰" };

  return (
    <div>
      <PageTitle title="🏠 ホーム" subtitle={`${today.getFullYear()}年${today.getMonth() + 1}月`} />

      {/* 1. 今月の収支カード */}
      <div style={{ padding: "0 16px" }}>
        <Card style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "#fff" }}>
          <div style={{ fontSize: 13, opacity: 0.85, marginBottom: 8 }}>
            {today.getFullYear()}年{today.getMonth() + 1}月
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 14, opacity: 0.9 }}>手取り</span>
            <span style={{ fontSize: 22, fontWeight: 700 }}>{fmtYen(netIncome)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 14, opacity: 0.9 }}>支出</span>
            <span style={{ fontSize: 22, fontWeight: 700 }}>-{fmtYen(totalExpense)}</span>
          </div>
          <div style={{ height: 1, backgroundColor: "rgba(255,255,255,0.3)", marginBottom: 8 }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 15, fontWeight: 600 }}>収支</span>
            <span style={{ fontSize: 26, fontWeight: 800, color: balance >= 0 ? "#A8FFB0" : "#FFB0B0" }}>
              {balance >= 0 ? "+" : ""}{fmtYen(balance)}
            </span>
          </div>
        </Card>

        {/* 2. 資産・負債サマリー */}
        <div style={{ display: "flex", gap: 8, marginBottom: 12, overflowX: "auto", paddingBottom: 4 }}>
          {[
            { label: "総資産", value: totalAsset, color: colors.asset },
            { label: "ローン残高", value: totalLoan, color: colors.loan },
            { label: "純資産", value: netWorth, color: netWorth >= 0 ? colors.income : colors.expense },
          ].map((item) => (
            <div key={item.label} style={{
              flex: "0 0 auto", minWidth: 110,
              backgroundColor: colors.card, borderRadius: 12, padding: 12,
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)", textAlign: "center",
            }}>
              <div style={{ fontSize: 11, color: colors.textLight, marginBottom: 4 }}>{item.label}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: item.color }}>
                {item.value < 0 ? "▲" : ""}{fmtYen(Math.abs(item.value))}
              </div>
            </div>
          ))}
        </div>

        {/* 3. 支出カテゴリ円グラフ */}
        {pieData.length > 0 ? (
          <Card>
            <SectionHeader title="今月の支出内訳" />
            <ResponsiveContainer width="100%" height={180}>
              <RechartsPie>
                <Pie data={pieData} cx="50%" cy="50%" outerRadius={70} dataKey="value" label={({ name, percent }) => `${name} ${Math.round(percent * 100)}%`} labelLine={false} fontSize={10}>
                  {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip formatter={(v) => fmtYen(v)} />
              </RechartsPie>
            </ResponsiveContainer>
          </Card>
        ) : (
          <Card>
            <SectionHeader title="今月の支出内訳" />
            <EmptyState message="今月の支出データがありません" />
          </Card>
        )}

        {/* 4. 貯蓄目標達成率 */}
        <Card>
          <SectionHeader title="今月の貯蓄目標" />
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 13, color: colors.textLight }}>目標: {fmtYen(goalSaving)}</span>
            <span style={{ fontSize: 13, color: colors.saving, fontWeight: 700 }}>{fmtYen(actualSaving)}</span>
          </div>
          <ProgressBar value={actualSaving} max={goalSaving} color={colors.saving} />
        </Card>

        {/* 5. ローン返済状況 */}
        {data.loans.length > 0 && (
          <Card>
            <SectionHeader title="ローン返済状況" />
            {data.loans.map((loan) => {
              const monthsLeft = loan.monthlyPayment > 0
                ? Math.ceil(loan.remainingBalance / loan.monthlyPayment)
                : 0;
              return (
                <div key={loan.id} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  paddingBottom: 8, marginBottom: 8, borderBottom: "1px solid #F0F0F0",
                }}>
                  <div>
                    <span style={{ marginRight: 6 }}>{loanTypeIcon[loan.type] || "💰"}</span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: colors.text }}>{loan.name}</span>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: colors.loan }}>{fmtYen(loan.remainingBalance)}</div>
                    <div style={{ fontSize: 11, color: colors.textLight }}>あと{monthsLeft}回</div>
                  </div>
                </div>
              );
            })}
          </Card>
        )}

        {/* 6. 直近の支出履歴 */}
        <Card>
          <SectionHeader title="最近の支出" />
          {recent5.length > 0 ? (
            recent5.map((e) => (
              <div key={e.id} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                paddingBottom: 8, marginBottom: 8, borderBottom: "1px solid #F8F8F8",
              }}>
                <div>
                  <div style={{
                    display: "inline-block", width: 8, height: 8, borderRadius: "50%",
                    backgroundColor: expenseCategories[e.category]?.color || colors.neutral,
                    marginRight: 8,
                  }} />
                  <span style={{ fontSize: 13, color: colors.text }}>{e.category}</span>
                  <span style={{ fontSize: 11, color: colors.textLight, marginLeft: 6 }}>{e.date}</span>
                </div>
                <span style={{ fontSize: 14, fontWeight: 700, color: colors.expense }}>-{fmtYen(e.amount)}</span>
              </div>
            ))
          ) : (
            <EmptyState message="支出履歴がありません" />
          )}
        </Card>
      </div>
    </div>
  );
}

// ===== フェーズ4: 収入タブ =====

const blankSalary = () => ({
  id: genId(),
  month: currentYM(),
  basicSalary: 0,
  allowances: { commuting: 0, housing: 0, overtime: 0, family: 0, other: 0 },
  deductions: { healthInsurance: 0, nursingInsurance: 0, pension: 0, employmentInsurance: 0, incomeTax: 0, residentTax: 0, other: 0 },
  bonus: 0,
  sideIncome: 0,
  memo: "",
});

function IncomeTab({ data, updateData }) {
  const [month, setMonth] = useState(currentYM());
  const existing = data.salaries.find((s) => s.month === month);
  const [form, setForm] = useState(existing || blankSalary());
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const e = data.salaries.find((s) => s.month === month);
    setForm(e ? { ...e } : { ...blankSalary(), month });
    setSaved(false);
  }, [month, data.salaries]);

  const setA = (field) => (val) => setForm((f) => ({ ...f, allowances: { ...f.allowances, [field]: val } }));
  const setD = (field) => (val) => setForm((f) => ({ ...f, deductions: { ...f.deductions, [field]: val } }));

  const grossPay = form.basicSalary + Object.values(form.allowances).reduce((a, b) => a + b, 0);
  const totalDed = Object.values(form.deductions).reduce((a, b) => a + b, 0);
  const netPay = grossPay - totalDed;
  const totalIncome = netPay + (form.bonus || 0) + (form.sideIncome || 0);

  // 固定費（支出の固定費）
  const fixedExpenses = data.expenses
    .filter((e) => e.date?.startsWith(month) && e.isFixed)
    .reduce((a, e) => a + e.amount, 0);
  // ローン返済合計
  const loanPayments = data.loans.reduce((a, l) => a + l.monthlyPayment, 0);
  const disposable = totalIncome - fixedExpenses - loanPayments;

  const save = () => {
    updateData((prev) => {
      const exists = prev.salaries.find((s) => s.month === month);
      if (exists) {
        return { ...prev, salaries: prev.salaries.map((s) => s.month === month ? { ...form } : s) };
      }
      return { ...prev, salaries: [...prev.salaries, { ...form }] };
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  // 月次収入グラフ（直近12ヶ月）
  const chartData = (() => {
    const months = [];
    const now = new Date();
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const ym = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      const s = data.salaries.find((x) => x.month === ym);
      const basic = s ? (s.basicSalary - Object.values(s.deductions || {}).reduce((a, b) => a + b, 0)) : 0;
      months.push({
        month: `${d.getMonth() + 1}月`,
        手取り: Math.max(0, basic + (s?.bonus || 0) + (s?.sideIncome || 0)),
        基本給: Math.max(0, basic),
        ボーナス: s?.bonus || 0,
        副収入: s?.sideIncome || 0,
      });
    }
    return months;
  })();

  return (
    <div>
      <PageTitle title="💴 収入" subtitle="給与明細を入力してください" />
      <div style={{ padding: "0 16px" }}>
        <MonthNavigator month={month} setMonth={setMonth} />

        {/* 支給セクション */}
        <Card>
          <Accordion title="【支給】" defaultOpen={true}>
            <AmountInput label="基本給" value={form.basicSalary} onChange={(v) => setForm((f) => ({ ...f, basicSalary: v }))} />
            <AmountInput label="通勤手当" value={form.allowances.commuting} onChange={setA("commuting")} />
            <AmountInput label="住宅手当" value={form.allowances.housing} onChange={setA("housing")} />
            <AmountInput label="残業手当" value={form.allowances.overtime} onChange={setA("overtime")} />
            <AmountInput label="家族手当" value={form.allowances.family} onChange={setA("family")} />
            <AmountInput label="その他手当" value={form.allowances.other} onChange={setA("other")} />
            <Divider />
            <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0" }}>
              <span style={{ fontSize: 14, fontWeight: 600 }}>支給合計</span>
              <span style={{ fontSize: 18, fontWeight: 700, color: colors.income }}>{fmtYen(grossPay)}</span>
            </div>
          </Accordion>
        </Card>

        {/* 控除セクション */}
        <Card>
          <Accordion title="【控除】" defaultOpen={false}>
            <AmountInput label="健康保険料" value={form.deductions.healthInsurance} onChange={setD("healthInsurance")} />
            <AmountInput label="介護保険料" value={form.deductions.nursingInsurance} onChange={setD("nursingInsurance")} />
            <AmountInput label="厚生年金保険料" value={form.deductions.pension} onChange={setD("pension")} />
            <AmountInput label="雇用保険料" value={form.deductions.employmentInsurance} onChange={setD("employmentInsurance")} />
            <AmountInput label="所得税" value={form.deductions.incomeTax} onChange={setD("incomeTax")} />
            <AmountInput label="住民税" value={form.deductions.residentTax} onChange={setD("residentTax")} />
            <AmountInput label="その他控除" value={form.deductions.other} onChange={setD("other")} />
            <Divider />
            <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0" }}>
              <span style={{ fontSize: 14, fontWeight: 600 }}>控除合計</span>
              <span style={{ fontSize: 18, fontWeight: 700, color: colors.expense }}>-{fmtYen(totalDed)}</span>
            </div>
          </Accordion>
        </Card>

        {/* 手取り表示 */}
        <Card style={{ backgroundColor: "#F0FFF4", border: `2px solid ${colors.income}` }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 13, color: colors.textLight, marginBottom: 4 }}>差引支給額（手取り）</div>
            <div style={{ fontSize: 32, fontWeight: 800, color: colors.income }}>{fmtYen(netPay)}</div>
          </div>
        </Card>

        {/* ボーナス・副収入 */}
        <Card>
          <SectionHeader title="ボーナス・副収入" />
          <AmountInput label="ボーナス" value={form.bonus} onChange={(v) => setForm((f) => ({ ...f, bonus: v }))} />
          <AmountInput label="副収入" value={form.sideIncome} onChange={(v) => setForm((f) => ({ ...f, sideIncome: v }))} />
          <TextInput label="メモ" value={form.memo} onChange={(v) => setForm((f) => ({ ...f, memo: v }))} placeholder="メモ（任意）" />
        </Card>

        {/* 可処分所得カード */}
        <Card style={{ backgroundColor: "#EBF5FB" }}>
          <SectionHeader title="可処分所得" color={colors.saving} />
          <div style={{ fontSize: 12, color: colors.textLight, marginBottom: 8 }}>
            手取り収入 − 固定費（家賃・ローン・保険等）= 自由に使えるお金
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            <span style={{ fontSize: 13, color: colors.textLight }}>手取り合計</span>
            <span style={{ fontSize: 15, fontWeight: 600 }}>{fmtYen(totalIncome)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            <span style={{ fontSize: 13, color: colors.textLight }}>固定費</span>
            <span style={{ fontSize: 15, fontWeight: 600 }}>-{fmtYen(fixedExpenses)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 13, color: colors.textLight }}>ローン返済</span>
            <span style={{ fontSize: 15, fontWeight: 600 }}>-{fmtYen(loanPayments)}</span>
          </div>
          <Divider />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: colors.saving }}>今月の可処分所得</span>
            <span style={{ fontSize: 22, fontWeight: 800, color: disposable >= 0 ? colors.saving : colors.expense }}>
              {fmtYen(disposable)}
            </span>
          </div>
        </Card>

        <PrimaryButton onClick={save} color={saved ? colors.neutral : colors.income}>
          {saved ? "✅ 保存しました" : "保存する"}
        </PrimaryButton>

        {/* 収入推移グラフ */}
        <Card style={{ marginTop: 16 }}>
          <SectionHeader title="手取り推移（12ヶ月）" />
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEE" />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => `${Math.round(v / 10000)}万`} />
              <Tooltip formatter={(v) => fmtYen(v)} />
              <Area type="monotone" dataKey="手取り" stroke={colors.income} fill="#D5F5E3" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}

// ===== フェーズ5・6: 支出タブ =====

const PAYMENT_METHODS = ["現金", "クレカ", "電子マネー", "口座振替", "その他"];
const EXPENSE_SUBTABS = ["入力", "一覧", "分析", "予算"];

function ExpenseTab({ data, updateData }) {
  const [subtab, setSubtab] = useState("入力");
  const [month, setMonth] = useState(currentYM());

  const monthExpenses = data.expenses.filter((e) => e.date?.startsWith(month));

  return (
    <div>
      <PageTitle title="💳 支出" />
      {/* サブタブ */}
      <div style={{ display: "flex", gap: 8, padding: "0 16px 12px", overflowX: "auto" }}>
        {EXPENSE_SUBTABS.map((t) => (
          <button key={t} onClick={() => setSubtab(t)} style={{
            flex: "0 0 auto", padding: "8px 16px",
            backgroundColor: subtab === t ? colors.expense : "#EEE",
            color: subtab === t ? "#fff" : colors.text,
            border: "none", borderRadius: 20, fontSize: 13, fontWeight: 600, cursor: "pointer",
          }}>{t}</button>
        ))}
      </div>

      <div style={{ padding: "0 16px" }}>
        {subtab === "入力"  && <ExpenseInput   data={data} updateData={updateData} />}
        {subtab === "一覧"  && <ExpenseList    data={data} updateData={updateData} month={month} setMonth={setMonth} monthExpenses={monthExpenses} />}
        {subtab === "分析"  && <ExpenseAnalysis data={data} month={month} setMonth={setMonth} monthExpenses={monthExpenses} />}
        {subtab === "予算"  && <ExpenseBudget  data={data} updateData={updateData} month={month} setMonth={setMonth} monthExpenses={monthExpenses} />}
      </div>
    </div>
  );
}

// 支出入力フォーム
function ExpenseInput({ data, updateData }) {
  const [form, setForm] = useState({
    date: todayStr(),
    amount: 0,
    category: "食費",
    subcategory: "",
    isFixed: false,
    memo: "",
    paymentMethod: "現金",
  });
  const [added, setAdded] = useState(false);

  const catList = Object.keys(expenseCategories);
  const subList = expenseCategories[form.category]?.subcategories || [];

  const add = () => {
    if (!form.amount) return;
    const newExp = {
      ...form,
      id: genId(),
      amount: Number(form.amount),
      isFixed: expenseCategories[form.category]?.isFixed || form.isFixed,
    };
    updateData((prev) => ({ ...prev, expenses: [...prev.expenses, newExp] }));
    setForm((f) => ({ ...f, amount: 0, memo: "", subcategory: "" }));
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Card>
      <SectionHeader title="クイック入力" color={colors.expense} />
      {/* 日付 */}
      <div style={{ marginBottom: 12 }}>
        <label style={{ fontSize: 12, color: colors.textLight, display: "block", marginBottom: 4 }}>日付</label>
        <input type="date" value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
          style={{ width: "100%", padding: 12, fontSize: 16, border: "1.5px solid #E0E0E0", borderRadius: 10, boxSizing: "border-box", backgroundColor: "#FAFAFA" }} />
      </div>
      {/* 金額 */}
      <AmountInput label="金額" value={form.amount} onChange={(v) => setForm((f) => ({ ...f, amount: v }))} />
      {/* カテゴリ */}
      <SelectInput label="カテゴリ" value={form.category}
        onChange={(v) => setForm((f) => ({ ...f, category: v, subcategory: "" }))}
        options={catList.map((c) => ({ value: c, label: c }))} />
      {/* サブカテゴリ */}
      {subList.length > 0 && (
        <SelectInput label="サブカテゴリ" value={form.subcategory || subList[0]}
          onChange={(v) => setForm((f) => ({ ...f, subcategory: v }))}
          options={subList.map((s) => ({ value: s, label: s }))} />
      )}
      {/* 支払方法 */}
      <SelectInput label="支払方法" value={form.paymentMethod}
        onChange={(v) => setForm((f) => ({ ...f, paymentMethod: v }))}
        options={PAYMENT_METHODS} />
      {/* メモ */}
      <TextInput label="メモ（任意）" value={form.memo} onChange={(v) => setForm((f) => ({ ...f, memo: v }))} placeholder="メモ" />
      {/* 固定費チェック */}
      <label style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, cursor: "pointer" }}>
        <input type="checkbox" checked={form.isFixed} onChange={(e) => setForm((f) => ({ ...f, isFixed: e.target.checked }))} />
        <span style={{ fontSize: 14, color: colors.text }}>固定費として登録</span>
      </label>
      <PrimaryButton onClick={add} color={added ? colors.neutral : colors.expense}>
        {added ? "✅ 追加しました" : "追加する"}
      </PrimaryButton>
    </Card>
  );
}

// 支出一覧
function ExpenseList({ data, updateData, month, setMonth, monthExpenses }) {
  const sorted = [...monthExpenses].sort((a, b) => b.date > a.date ? 1 : -1);
  const total = monthExpenses.reduce((a, e) => a + e.amount, 0);

  const del = (id) => updateData((prev) => ({ ...prev, expenses: prev.expenses.filter((e) => e.id !== id) }));

  return (
    <div>
      <MonthNavigator month={month} setMonth={setMonth} />
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <span style={{ fontSize: 14, color: colors.textLight }}>{month}の合計</span>
          <span style={{ fontSize: 22, fontWeight: 800, color: colors.expense }}>-{fmtYen(total)}</span>
        </div>
      </Card>
      {sorted.length > 0 ? sorted.map((e) => (
        <SwipeDeleteItem key={e.id} onDelete={() => del(e.id)}>
          <div style={{
            backgroundColor: colors.card, padding: "12px 16px", borderRadius: 10,
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 10, height: 10, borderRadius: "50%",
                backgroundColor: expenseCategories[e.category]?.color || colors.neutral,
                flexShrink: 0,
              }} />
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: colors.text }}>
                  {e.category}{e.subcategory ? `・${e.subcategory}` : ""}
                  {e.isFixed && <Badge label="固定費" bgColor={colors.saving} style={{ marginLeft: 6, fontSize: 10 }} />}
                </div>
                <div style={{ fontSize: 11, color: colors.textLight }}>
                  {e.date}　{e.paymentMethod}{e.memo ? `　${e.memo}` : ""}
                </div>
              </div>
            </div>
            <span style={{ fontSize: 16, fontWeight: 700, color: colors.expense }}>-{fmtYen(e.amount)}</span>
          </div>
        </SwipeDeleteItem>
      )) : <EmptyState message="支出データがありません" />}
    </div>
  );
}

// 支出分析
function ExpenseAnalysis({ data, month, setMonth, monthExpenses }) {
  const catTotals = {};
  monthExpenses.forEach((e) => {
    catTotals[e.category] = (catTotals[e.category] || 0) + e.amount;
  });
  const pieData = Object.entries(catTotals)
    .sort((a, b) => b[1] - a[1])
    .map(([name, value]) => ({ name, value, color: expenseCategories[name]?.color || colors.neutral }));

  const fixedTotal = monthExpenses.filter((e) => e.isFixed || expenseCategories[e.category]?.isFixed).reduce((a, e) => a + e.amount, 0);
  const varTotal = monthExpenses.reduce((a, e) => a + e.amount, 0) - fixedTotal;
  const totalAmt = fixedTotal + varTotal;

  // 月次支出棒グラフ
  const barData = (() => {
    const now = new Date();
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const ym = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      const total = data.expenses.filter((e) => e.date?.startsWith(ym)).reduce((a, e) => a + e.amount, 0);
      months.push({ month: `${d.getMonth() + 1}月`, 支出: total });
    }
    return months;
  })();

  return (
    <div>
      <MonthNavigator month={month} setMonth={setMonth} />

      {pieData.length > 0 ? (
        <>
          <Card>
            <SectionHeader title="カテゴリ別内訳" />
            <ResponsiveContainer width="100%" height={200}>
              <RechartsPie>
                <Pie data={pieData} cx="50%" cy="50%" outerRadius={75} dataKey="value" label={({ name, percent }) => percent > 0.05 ? `${name} ${Math.round(percent * 100)}%` : ""} fontSize={10}>
                  {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip formatter={(v) => fmtYen(v)} />
              </RechartsPie>
            </ResponsiveContainer>
            {pieData.map((d) => (
              <div key={d.name} style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 2, backgroundColor: d.color }} />
                  <span style={{ fontSize: 13 }}>{d.name}</span>
                </div>
                <span style={{ fontSize: 13, fontWeight: 600 }}>{fmtYen(d.value)}</span>
              </div>
            ))}
          </Card>

          <Card>
            <SectionHeader title="固定費 vs 変動費" />
            <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
              {[
                { label: "固定費", val: fixedTotal, color: colors.saving },
                { label: "変動費", val: varTotal, color: colors.expense },
              ].map((item) => (
                <div key={item.label} style={{ flex: 1, backgroundColor: "#F8F8F8", borderRadius: 10, padding: 12, textAlign: "center" }}>
                  <div style={{ fontSize: 12, color: colors.textLight }}>{item.label}</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: item.color }}>{fmtYen(item.val)}</div>
                  <div style={{ fontSize: 11, color: colors.textLight }}>{totalAmt ? Math.round(item.val / totalAmt * 100) : 0}%</div>
                </div>
              ))}
            </div>
            <ProgressBar value={fixedTotal} max={totalAmt} color={colors.saving} showPercent={false} />
          </Card>
        </>
      ) : <EmptyState message="分析するデータがありません" />}

      <Card>
        <SectionHeader title="月次支出推移（6ヶ月）" />
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#EEE" />
            <XAxis dataKey="month" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => `${Math.round(v / 10000)}万`} />
            <Tooltip formatter={(v) => fmtYen(v)} />
            <Bar dataKey="支出" fill={colors.expense} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}

// 予算管理
function ExpenseBudget({ data, updateData, month, setMonth, monthExpenses }) {
  const [editing, setEditing] = useState(null);
  const [editVal, setEditVal] = useState(0);

  const catTotals = {};
  monthExpenses.forEach((e) => { catTotals[e.category] = (catTotals[e.category] || 0) + e.amount; });

  const saveBudget = (cat) => {
    updateData((prev) => ({ ...prev, budgets: { ...prev.budgets, [cat]: editVal } }));
    setEditing(null);
  };

  return (
    <div>
      <MonthNavigator month={month} setMonth={setMonth} />
      <Card>
        <SectionHeader title="カテゴリ別予算管理" />
        {Object.keys(expenseCategories).map((cat) => {
          const budget = data.budgets[cat] || 0;
          const actual = catTotals[cat] || 0;
          const over = budget > 0 && actual > budget;
          return (
            <div key={cat} style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: expenseCategories[cat].color }} />
                  <span style={{ fontSize: 14, fontWeight: 600 }}>{cat}</span>
                  {over && <span style={{ fontSize: 10, color: colors.expense, fontWeight: 700 }}>⚠️ 超過</span>}
                </div>
                {editing === cat ? (
                  <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                    <input type="number" inputMode="numeric" value={editVal} onChange={(e) => setEditVal(parseNum(e.target.value))}
                      style={{ width: 90, padding: "4px 8px", fontSize: 13, border: "1px solid #CCC", borderRadius: 6 }} />
                    <button onClick={() => saveBudget(cat)} style={{ padding: "4px 8px", backgroundColor: colors.income, color: "#fff", border: "none", borderRadius: 6, cursor: "pointer", fontSize: 12 }}>保存</button>
                  </div>
                ) : (
                  <button onClick={() => { setEditing(cat); setEditVal(budget); }}
                    style={{ fontSize: 12, color: colors.saving, background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>
                    予算: {fmtYen(budget)}
                  </button>
                )}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: colors.textLight, marginBottom: 4 }}>
                <span>実績: {fmtYen(actual)}</span>
                <span style={{ color: over ? colors.expense : colors.textLight }}>{budget > 0 ? `残: ${fmtYen(budget - actual)}` : "予算未設定"}</span>
              </div>
              {budget > 0 && <ProgressBar value={actual} max={budget} color={expenseCategories[cat].color} />}
            </div>
          );
        })}
      </Card>
    </div>
  );
}

// ===== フェーズ7・8: ローンタブ =====

const LOAN_TYPES = [
  { value: "car", label: "🚗 車" },
  { value: "housing", label: "🏠 住宅" },
  { value: "scholarship", label: "🎓 奨学金" },
  { value: "other", label: "💰 その他" },
];
const LOAN_TYPE_ICON = { car: "🚗", housing: "🏠", scholarship: "🎓", other: "💰" };

function LoanTab({ data, updateData }) {
  const [subtab, setSubtab] = useState("一覧");
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [showAdd, setShowAdd] = useState(false);

  const tabs = ["一覧", "登録", "返済表", "繰上シミュ"];

  return (
    <div>
      <PageTitle title="🏦 ローン・返済" />
      <div style={{ display: "flex", gap: 8, padding: "0 16px 12px", overflowX: "auto" }}>
        {tabs.map((t) => (
          <button key={t} onClick={() => setSubtab(t)} style={{
            flex: "0 0 auto", padding: "8px 16px",
            backgroundColor: subtab === t ? colors.loan : "#EEE",
            color: subtab === t ? "#fff" : colors.text,
            border: "none", borderRadius: 20, fontSize: 13, fontWeight: 600, cursor: "pointer",
          }}>{t}</button>
        ))}
      </div>
      <div style={{ padding: "0 16px" }}>
        {subtab === "一覧"     && <LoanList    data={data} updateData={updateData} setSubtab={setSubtab} setSelectedLoan={setSelectedLoan} />}
        {subtab === "登録"     && <LoanForm    data={data} updateData={updateData} setSubtab={setSubtab} />}
        {subtab === "返済表"   && <LoanSchedule data={data} selectedLoan={selectedLoan} setSelectedLoan={setSelectedLoan} />}
        {subtab === "繰上シミュ" && <LoanPrepay  data={data} selectedLoan={selectedLoan} setSelectedLoan={setSelectedLoan} />}
      </div>
    </div>
  );
}

// ローン一覧
function LoanList({ data, updateData, setSubtab, setSelectedLoan }) {
  const totalBalance = data.loans.reduce((a, l) => a + l.remainingBalance, 0);
  const totalMonthly = data.loans.reduce((a, l) => a + l.monthlyPayment, 0);

  const del = (id) => {
    if (window.confirm("このローンを削除しますか？")) {
      updateData((prev) => ({ ...prev, loans: prev.loans.filter((l) => l.id !== id) }));
    }
  };

  return (
    <div>
      {data.loans.length > 0 && (
        <Card>
          <SectionHeader title="ローン合計" />
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ flex: 1, backgroundColor: "#FEF3E2", borderRadius: 10, padding: 12, textAlign: "center" }}>
              <div style={{ fontSize: 11, color: colors.textLight }}>残高合計</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: colors.loan }}>{fmtYen(totalBalance)}</div>
            </div>
            <div style={{ flex: 1, backgroundColor: "#FEF3E2", borderRadius: 10, padding: 12, textAlign: "center" }}>
              <div style={{ fontSize: 11, color: colors.textLight }}>月返済合計</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: colors.loan }}>{fmtYen(totalMonthly)}</div>
            </div>
          </div>
        </Card>
      )}

      {data.loans.map((loan) => {
        const monthsLeft = loan.monthlyPayment > 0 ? Math.ceil(loan.remainingBalance / loan.monthlyPayment) : 0;
        const progress = loan.totalAmount > 0 ? (1 - loan.remainingBalance / loan.totalAmount) * 100 : 0;
        return (
          <Card key={loan.id}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
              <div>
                <span style={{ fontSize: 20, marginRight: 6 }}>{LOAN_TYPE_ICON[loan.type] || "💰"}</span>
                <span style={{ fontSize: 16, fontWeight: 700 }}>{loan.name}</span>
              </div>
              <button onClick={() => del(loan.id)} style={{ background: "none", border: "none", color: colors.expense, cursor: "pointer", fontSize: 18 }}>🗑</button>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontSize: 13, color: colors.textLight }}>残高</span>
              <span style={{ fontSize: 20, fontWeight: 800, color: colors.loan }}>{fmtYen(loan.remainingBalance)}</span>
            </div>
            <div style={{ display: "flex", gap: 16, marginBottom: 8 }}>
              <div style={{ fontSize: 12, color: colors.textLight }}>月返済: <strong>{fmtYen(loan.monthlyPayment)}</strong></div>
              <div style={{ fontSize: 12, color: colors.textLight }}>年利: <strong>{loan.interestRate}%</strong></div>
              <div style={{ fontSize: 12, color: colors.textLight }}>残り: <strong>{monthsLeft}回</strong></div>
            </div>
            <ProgressBar value={progress} max={100} color={colors.loan} showPercent={false} />
            <div style={{ fontSize: 11, color: colors.textLight, marginTop: 4, textAlign: "right" }}>
              返済完了 {Math.round(progress)}%
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <OutlineButton color={colors.loan} style={{ flex: 1, fontSize: 12 }}
                onClick={() => { setSelectedLoan(loan.id); setSubtab("返済表"); }}>返済表を見る</OutlineButton>
              <OutlineButton color={colors.saving} style={{ flex: 1, fontSize: 12 }}
                onClick={() => { setSelectedLoan(loan.id); setSubtab("繰上シミュ"); }}>繰上シミュ</OutlineButton>
            </div>
          </Card>
        );
      })}

      <PrimaryButton color={colors.loan} onClick={() => setSubtab("登録")}>
        ＋ ローンを登録する
      </PrimaryButton>
    </div>
  );
}

// ローン登録フォーム
function LoanForm({ data, updateData, setSubtab }) {
  const [form, setForm] = useState({
    type: "car", name: "", totalAmount: 0, remainingBalance: 0,
    monthlyPayment: 0, interestRate: 0, startDate: "", endDate: "", memo: "",
  });
  const [saved, setSaved] = useState(false);

  const save = () => {
    if (!form.name || !form.remainingBalance) return;
    updateData((prev) => ({ ...prev, loans: [...prev.loans, { ...form, id: genId(), payments: [] }] }));
    setSaved(true);
    setTimeout(() => { setSaved(false); setSubtab("一覧"); }, 1000);
  };

  const F = (field) => (v) => setForm((f) => ({ ...f, [field]: v }));

  return (
    <Card>
      <SectionHeader title="ローン登録" color={colors.loan} />
      <SelectInput label="ローン種類" value={form.type} onChange={F("type")} options={LOAN_TYPES} />
      <TextInput label="ローン名（例: トヨタファイナンス）" value={form.name} onChange={F("name")} placeholder="ローン名" />
      <AmountInput label="借入総額" value={form.totalAmount} onChange={F("totalAmount")} />
      <AmountInput label="現在の残高" value={form.remainingBalance} onChange={F("remainingBalance")} />
      <AmountInput label="月々返済額" value={form.monthlyPayment} onChange={F("monthlyPayment")} />
      <div style={{ marginBottom: 12 }}>
        <label style={{ fontSize: 12, color: colors.textLight, display: "block", marginBottom: 4 }}>年利（%）</label>
        <input type="number" inputMode="decimal" value={form.interestRate || ""} onChange={(e) => F("interestRate")(parseFloat(e.target.value) || 0)}
          placeholder="例: 2.5"
          style={{ width: "100%", padding: 12, fontSize: 16, border: "1.5px solid #E0E0E0", borderRadius: 10, boxSizing: "border-box", backgroundColor: "#FAFAFA" }} />
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <div style={{ flex: 1, marginBottom: 12 }}>
          <label style={{ fontSize: 12, color: colors.textLight, display: "block", marginBottom: 4 }}>借入開始日</label>
          <input type="month" value={form.startDate} onChange={(e) => F("startDate")(e.target.value)}
            style={{ width: "100%", padding: 12, fontSize: 16, border: "1.5px solid #E0E0E0", borderRadius: 10, boxSizing: "border-box", backgroundColor: "#FAFAFA" }} />
        </div>
        <div style={{ flex: 1, marginBottom: 12 }}>
          <label style={{ fontSize: 12, color: colors.textLight, display: "block", marginBottom: 4 }}>完済予定日</label>
          <input type="month" value={form.endDate} onChange={(e) => F("endDate")(e.target.value)}
            style={{ width: "100%", padding: 12, fontSize: 16, border: "1.5px solid #E0E0E0", borderRadius: 10, boxSizing: "border-box", backgroundColor: "#FAFAFA" }} />
        </div>
      </div>
      <TextInput label="メモ" value={form.memo} onChange={F("memo")} placeholder="メモ（任意）" />
      <PrimaryButton onClick={save} color={saved ? colors.neutral : colors.loan}>
        {saved ? "✅ 登録しました" : "登録する"}
      </PrimaryButton>
    </Card>
  );
}

// 返済スケジュール表
function LoanSchedule({ data, selectedLoan, setSelectedLoan }) {
  const loan = data.loans.find((l) => l.id === selectedLoan) || data.loans[0];

  if (!loan) return <EmptyState message="ローンが登録されていません" />;

  // 返済スケジュール計算
  const schedule = (() => {
    const rows = [];
    let balance = loan.remainingBalance;
    const monthlyRate = loan.interestRate / 100 / 12;
    const payment = loan.monthlyPayment;
    let month = new Date();

    for (let i = 1; balance > 0 && i <= 600; i++) {
      const interest = Math.round(balance * monthlyRate);
      const principal = Math.min(payment - interest, balance);
      const actualPayment = Math.min(payment, balance + interest);
      balance = Math.max(0, balance - principal);
      const dateStr = `${month.getFullYear()}/${String(month.getMonth() + 1).padStart(2, "0")}`;
      rows.push({ no: i, date: dateStr, payment: actualPayment, principal, interest, balance });
      month = new Date(month.getFullYear(), month.getMonth() + 1, 1);
      if (balance <= 0) break;
    }
    return rows;
  })();

  const totalInterest = schedule.reduce((a, r) => a + r.interest, 0);

  return (
    <div>
      <SelectInput label="ローンを選択" value={loan.id}
        onChange={(v) => setSelectedLoan(v)}
        options={data.loans.map((l) => ({ value: l.id, label: `${LOAN_TYPE_ICON[l.type]} ${l.name}` }))} />
      <Card>
        <SectionHeader title={`${LOAN_TYPE_ICON[loan.type]} ${loan.name}`} color={colors.loan} />
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
          <span style={{ fontSize: 13, color: colors.textLight }}>残高</span>
          <span style={{ fontSize: 18, fontWeight: 700, color: colors.loan }}>{fmtYen(loan.remainingBalance)}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
          <span style={{ fontSize: 13, color: colors.textLight }}>総利息</span>
          <span style={{ fontSize: 15, fontWeight: 700, color: colors.expense }}>{fmtYen(totalInterest)}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontSize: 13, color: colors.textLight }}>完済まで</span>
          <span style={{ fontSize: 15, fontWeight: 700 }}>{schedule.length}回（{Math.floor(schedule.length / 12)}年{schedule.length % 12}ヶ月）</span>
        </div>
      </Card>
      <Card>
        <SectionHeader title="返済スケジュール" />
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
            <thead>
              <tr style={{ backgroundColor: "#F5F5F5" }}>
                {["回", "日付", "返済額", "元金", "利息", "残高"].map((h) => (
                  <th key={h} style={{ padding: "6px 4px", textAlign: "right", color: colors.textLight, fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {schedule.slice(0, 60).map((r) => (
                <tr key={r.no} style={{ borderBottom: "1px solid #F0F0F0" }}>
                  <td style={{ padding: "6px 4px", textAlign: "right", color: colors.textLight }}>{r.no}</td>
                  <td style={{ padding: "6px 4px", textAlign: "right" }}>{r.date}</td>
                  <td style={{ padding: "6px 4px", textAlign: "right", fontWeight: 600 }}>{fmt(r.payment)}</td>
                  <td style={{ padding: "6px 4px", textAlign: "right", color: colors.saving }}>{fmt(r.principal)}</td>
                  <td style={{ padding: "6px 4px", textAlign: "right", color: colors.expense }}>{fmt(r.interest)}</td>
                  <td style={{ padding: "6px 4px", textAlign: "right" }}>{fmt(r.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {schedule.length > 60 && (
            <p style={{ textAlign: "center", color: colors.textLight, fontSize: 12, margin: "8px 0" }}>
              （以降{schedule.length - 60}回分は省略）
            </p>
          )}
        </div>
      </Card>
    </div>
  );
}

// 繰上返済シミュレーター
function LoanPrepay({ data, selectedLoan, setSelectedLoan }) {
  const [prepayAmount, setPrepayAmount] = useState(0);
  const [result, setResult] = useState(null);
  const loan = data.loans.find((l) => l.id === selectedLoan) || data.loans[0];

  if (!loan) return <EmptyState message="ローンが登録されていません" />;

  const calcSchedule = (balance, monthly, annualRate) => {
    const monthlyRate = annualRate / 100 / 12;
    let rows = 0;
    let totalInterest = 0;
    while (balance > 0 && rows < 600) {
      const interest = Math.round(balance * monthlyRate);
      const principal = Math.min(monthly - interest, balance);
      if (principal <= 0) break;
      balance = Math.max(0, balance - principal);
      totalInterest += interest;
      rows++;
    }
    return { months: rows, totalInterest };
  };

  const simulate = () => {
    const orig = calcSchedule(loan.remainingBalance, loan.monthlyPayment, loan.interestRate);
    const after = calcSchedule(Math.max(0, loan.remainingBalance - prepayAmount), loan.monthlyPayment, loan.interestRate);
    setResult({
      origMonths: orig.months,
      afterMonths: after.months,
      savedMonths: orig.months - after.months,
      savedInterest: orig.totalInterest - after.totalInterest,
    });
  };

  return (
    <div>
      <SelectInput label="ローンを選択" value={loan.id}
        onChange={(v) => setSelectedLoan(v)}
        options={data.loans.map((l) => ({ value: l.id, label: `${LOAN_TYPE_ICON[l.type]} ${l.name}` }))} />

      <Card>
        <SectionHeader title="繰上返済シミュレーター" color={colors.saving} />
        <div style={{ marginBottom: 8 }}>
          <span style={{ fontSize: 13, color: colors.textLight }}>残高: </span>
          <span style={{ fontSize: 16, fontWeight: 700, color: colors.loan }}>{fmtYen(loan.remainingBalance)}</span>
        </div>
        <AmountInput label="繰上返済額" value={prepayAmount} onChange={setPrepayAmount} />
        <PrimaryButton onClick={simulate} color={colors.saving}>シミュレーション実行</PrimaryButton>

        {result && (
          <div style={{ marginTop: 16 }}>
            <Divider />
            <div style={{ backgroundColor: "#EBF5FB", borderRadius: 10, padding: 12, marginTop: 12 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: colors.saving, marginBottom: 8 }}>📊 シミュレーション結果</div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 13, color: colors.textLight }}>現在の完済まで</span>
                <span style={{ fontSize: 14, fontWeight: 600 }}>{result.origMonths}ヶ月</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 13, color: colors.textLight }}>繰上後の完済まで</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: colors.income }}>{result.afterMonths}ヶ月</span>
              </div>
              <Divider />
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: colors.income }}>短縮期間</span>
                <span style={{ fontSize: 18, fontWeight: 800, color: colors.income }}>▲{result.savedMonths}ヶ月</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: colors.income }}>利息節約額</span>
                <span style={{ fontSize: 18, fontWeight: 800, color: colors.income }}>{fmtYen(result.savedInterest)}</span>
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* ローン返済優先度アドバイス */}
      {data.loans.length > 1 && (
        <Card>
          <SectionHeader title="返済優先度アドバイス" color={colors.loan} />
          <div style={{ fontSize: 13, color: colors.textLight, marginBottom: 8 }}>
            💡 金利の高いローンから返済する「アバランチ法」が利息節約に効果的です。
          </div>
          {[...data.loans].sort((a, b) => b.interestRate - a.interestRate).map((l, i) => (
            <div key={l.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid #F0F0F0" }}>
              <div>
                <span style={{ fontSize: 13, fontWeight: 600, color: i === 0 ? colors.expense : colors.text }}>
                  {i + 1}位 {LOAN_TYPE_ICON[l.type]} {l.name}
                </span>
                {i === 0 && <Badge label="最優先" bgColor={colors.expense} style={{ marginLeft: 6 }} />}
              </div>
              <span style={{ fontSize: 13, fontWeight: 700, color: colors.loan }}>年利{l.interestRate}%</span>
            </div>
          ))}
        </Card>
      )}
    </div>
  );
}

// ===== フェーズ9〜11: 資産タブ =====

const ASSET_SUBTABS = ["銀行・現金", "株式・投信", "NISA", "iDeCo", "変額年金", "総資産"];

function AssetTab({ data, updateData }) {
  const [subtab, setSubtab] = useState("銀行・現金");

  return (
    <div>
      <PageTitle title="📈 資産管理" />
      <div style={{ display: "flex", gap: 6, padding: "0 16px 12px", overflowX: "auto" }}>
        {ASSET_SUBTABS.map((t) => (
          <button key={t} onClick={() => setSubtab(t)} style={{
            flex: "0 0 auto", padding: "8px 12px",
            backgroundColor: subtab === t ? colors.asset : "#EEE",
            color: subtab === t ? "#fff" : colors.text,
            border: "none", borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: "pointer",
          }}>{t}</button>
        ))}
      </div>
      <div style={{ padding: "0 16px" }}>
        {subtab === "銀行・現金" && <BankTab     data={data} updateData={updateData} />}
        {subtab === "株式・投信" && <InvestTab   data={data} updateData={updateData} />}
        {subtab === "NISA"      && <NisaTab     data={data} updateData={updateData} />}
        {subtab === "iDeCo"     && <IdecoTab    data={data} updateData={updateData} />}
        {subtab === "変額年金"  && <AnnuityTab  data={data} updateData={updateData} />}
        {subtab === "総資産"    && <NetWorthTab data={data} />}
      </div>
    </div>
  );
}

// 銀行・現金
function BankTab({ data, updateData }) {
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: "", balance: 0, type: "普通", memo: "" });

  const accounts = data.assets.bankAccounts || [];
  const total = accounts.reduce((a, b) => a + b.balance, 0);

  const add = () => {
    if (!form.name) return;
    updateData((prev) => ({
      ...prev, assets: { ...prev.assets, bankAccounts: [...(prev.assets.bankAccounts || []), { ...form, id: genId() }] }
    }));
    setForm({ name: "", balance: 0, type: "普通", memo: "" });
    setShowAdd(false);
  };

  const del = (id) => updateData((prev) => ({
    ...prev, assets: { ...prev.assets, bankAccounts: prev.assets.bankAccounts.filter((a) => a.id !== id) }
  }));

  const update = (id, field, val) => updateData((prev) => ({
    ...prev, assets: { ...prev.assets, bankAccounts: prev.assets.bankAccounts.map((a) => a.id === id ? { ...a, [field]: val } : a) }
  }));

  return (
    <div>
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 14, color: colors.textLight }}>現金・預金合計</span>
          <span style={{ fontSize: 24, fontWeight: 800, color: colors.asset }}>{fmtYen(total)}</span>
        </div>
      </Card>
      {accounts.map((acc) => (
        <Card key={acc.id}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700 }}>{acc.name}</div>
              <Badge label={acc.type} bgColor={colors.asset} style={{ marginTop: 4 }} />
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: colors.asset }}>{fmtYen(acc.balance)}</div>
              <button onClick={() => del(acc.id)} style={{ fontSize: 11, color: colors.expense, background: "none", border: "none", cursor: "pointer", marginTop: 4 }}>削除</button>
            </div>
          </div>
        </Card>
      ))}
      {showAdd ? (
        <Card>
          <SectionHeader title="口座追加" />
          <TextInput label="銀行名・口座名" value={form.name} onChange={(v) => setForm((f) => ({ ...f, name: v }))} placeholder="例: 三菱UFJ 普通" />
          <AmountInput label="残高" value={form.balance} onChange={(v) => setForm((f) => ({ ...f, balance: v }))} />
          <SelectInput label="種別" value={form.type} onChange={(v) => setForm((f) => ({ ...f, type: v }))} options={["普通", "定期", "積立", "MMF", "その他"]} />
          <div style={{ display: "flex", gap: 8 }}>
            <PrimaryButton onClick={add} color={colors.asset} style={{ flex: 1 }}>追加</PrimaryButton>
            <OutlineButton onClick={() => setShowAdd(false)} color={colors.neutral} style={{ flex: 1 }}>キャンセル</OutlineButton>
          </div>
        </Card>
      ) : (
        <PrimaryButton onClick={() => setShowAdd(true)} color={colors.asset}>＋ 口座を追加</PrimaryButton>
      )}
    </div>
  );
}

// 株式・投信
function InvestTab({ data, updateData }) {
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: "", type: "fund", account: "NISA", purchasePrice: 0, quantity: 0, currentPrice: 0, purchaseDate: "", memo: "" });

  const investments = data.assets.investments || [];
  const totalValue = investments.reduce((a, inv) => a + inv.currentPrice * inv.quantity, 0);
  const totalCost  = investments.reduce((a, inv) => a + inv.purchasePrice * inv.quantity, 0);
  const totalPnl   = totalValue - totalCost;

  const add = () => {
    if (!form.name) return;
    updateData((prev) => ({
      ...prev, assets: { ...prev.assets, investments: [...(prev.assets.investments || []), { ...form, id: genId() }] }
    }));
    setForm({ name: "", type: "fund", account: "NISA", purchasePrice: 0, quantity: 0, currentPrice: 0, purchaseDate: "", memo: "" });
    setShowAdd(false);
  };

  const del = (id) => updateData((prev) => ({
    ...prev, assets: { ...prev.assets, investments: prev.assets.investments.filter((i) => i.id !== id) }
  }));

  const TYPE_LABELS = { stock: "株式", fund: "投信", etf: "ETF", reit: "REIT", crypto: "暗号資産", other: "その他" };
  const F = (field) => (v) => setForm((f) => ({ ...f, [field]: v }));

  return (
    <div>
      {investments.length > 0 && (
        <Card>
          <SectionHeader title="投資資産合計" />
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            <span style={{ fontSize: 13, color: colors.textLight }}>評価額合計</span>
            <span style={{ fontSize: 20, fontWeight: 800, color: colors.asset }}>{fmtYen(totalValue)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            <span style={{ fontSize: 13, color: colors.textLight }}>取得額合計</span>
            <span style={{ fontSize: 14, fontWeight: 600 }}>{fmtYen(totalCost)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: 14, fontWeight: 700 }}>含み損益</span>
            <span style={{ fontSize: 18, fontWeight: 800, color: totalPnl >= 0 ? colors.income : colors.expense }}>
              {totalPnl >= 0 ? "+" : ""}{fmtYen(totalPnl)}
              <span style={{ fontSize: 12, marginLeft: 4 }}>({totalCost > 0 ? (totalPnl / totalCost * 100).toFixed(1) : 0}%)</span>
            </span>
          </div>
        </Card>
      )}

      {investments.map((inv) => {
        const value = inv.currentPrice * inv.quantity;
        const cost  = inv.purchasePrice * inv.quantity;
        const pnl   = value - cost;
        const pct   = cost > 0 ? (pnl / cost * 100).toFixed(1) : 0;
        return (
          <Card key={inv.id}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700 }}>📈 {inv.name}</div>
                <div style={{ display: "flex", gap: 4, marginTop: 4 }}>
                  <Badge label={TYPE_LABELS[inv.type] || inv.type} bgColor={colors.saving} />
                  <Badge label={inv.account} bgColor={colors.asset} />
                </div>
              </div>
              <button onClick={() => del(inv.id)} style={{ fontSize: 11, color: colors.expense, background: "none", border: "none", cursor: "pointer" }}>削除</button>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
              <span style={{ fontSize: 13, color: colors.textLight }}>評価額</span>
              <span style={{ fontSize: 18, fontWeight: 700, color: colors.asset }}>{fmtYen(value)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
              <span style={{ fontSize: 12, color: colors.textLight }}>取得単価 ¥{fmt(inv.purchasePrice)} × {fmt(inv.quantity)}口</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: pnl >= 0 ? colors.income : colors.expense }}>
                {pnl >= 0 ? "+" : ""}{fmtYen(pnl)} ({pct}%)
              </span>
            </div>
          </Card>
        );
      })}

      {showAdd ? (
        <Card>
          <SectionHeader title="銘柄追加" />
          <TextInput label="銘柄名・ファンド名" value={form.name} onChange={F("name")} placeholder="例: eMAXIS Slim 全世界株式" />
          <SelectInput label="種類" value={form.type} onChange={F("type")} options={[
            { value: "stock", label: "株式" }, { value: "fund", label: "投資信託" },
            { value: "etf", label: "ETF" }, { value: "reit", label: "REIT" },
            { value: "crypto", label: "暗号資産" }, { value: "other", label: "その他" },
          ]} />
          <SelectInput label="口座" value={form.account} onChange={F("account")} options={["NISA（つみたて）", "NISA（成長）", "iDeCo", "特定", "一般", "その他"]} />
          <AmountInput label="取得単価（1口あたり）" value={form.purchasePrice} onChange={F("purchasePrice")} />
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 12, color: colors.textLight, display: "block", marginBottom: 4 }}>保有口数</label>
            <input type="number" inputMode="numeric" value={form.quantity || ""} onChange={(e) => F("quantity")(parseNum(e.target.value))}
              style={{ width: "100%", padding: 12, fontSize: 16, border: "1.5px solid #E0E0E0", borderRadius: 10, boxSizing: "border-box", backgroundColor: "#FAFAFA" }} />
          </div>
          <AmountInput label="現在価格（1口あたり）" value={form.currentPrice} onChange={F("currentPrice")} />
          <div style={{ display: "flex", gap: 8 }}>
            <PrimaryButton onClick={add} color={colors.asset} style={{ flex: 1 }}>追加</PrimaryButton>
            <OutlineButton onClick={() => setShowAdd(false)} color={colors.neutral} style={{ flex: 1 }}>キャンセル</OutlineButton>
          </div>
        </Card>
      ) : (
        <PrimaryButton onClick={() => setShowAdd(true)} color={colors.asset}>＋ 銘柄を追加</PrimaryButton>
      )}
    </div>
  );
}

// NISA管理
function NisaTab({ data, updateData }) {
  const nisa = data.assets.nisa || {};
  const year = nisa.year || new Date().getFullYear();
  const LIMITS = { tsumitate: 1200000, growth: 2400000, lifetime: 18000000 };

  const update = (field) => (val) => updateData((prev) => ({
    ...prev, assets: { ...prev.assets, nisa: { ...prev.assets.nisa, [field]: val } }
  }));

  const sections = [
    { key: "tsumitateUsed", label: "つみたて投資枠", limit: LIMITS.tsumitate, color: colors.income },
    { key: "growthUsed",    label: "成長投資枠",     limit: LIMITS.growth,    color: colors.saving },
    { key: "lifetimeUsed",  label: "生涯非課税枠",   limit: LIMITS.lifetime,  color: colors.asset },
  ];

  return (
    <div>
      <Card style={{ backgroundColor: "#F0FFF4", border: `2px solid ${colors.income}` }}>
        <SectionHeader title={`${year}年 NISA枠管理`} color={colors.income} />
        {sections.map(({ key, label, limit, color }) => {
          const used = nisa[key] || 0;
          const remaining = limit - used;
          return (
            <div key={key} style={{ marginBottom: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color }}>{label}</span>
                <span style={{ fontSize: 12, color: colors.textLight }}>上限: {fmtYen(limit)}</span>
              </div>
              <AmountInput value={nisa[key] || 0} onChange={update(key)} />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                <span style={{ color: colors.textLight }}>使用済み: {fmtYen(used)}</span>
                <span style={{ color: remaining >= 0 ? colors.income : colors.expense, fontWeight: 600 }}>
                  残り: {fmtYen(Math.max(0, remaining))}
                </span>
              </div>
              <ProgressBar value={used} max={limit} color={color} />
            </div>
          );
        })}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontSize: 13, color: colors.textLight }}>今年度合計使用</span>
          <span style={{ fontSize: 16, fontWeight: 700, color: colors.income }}>
            {fmtYen((nisa.tsumitateUsed || 0) + (nisa.growthUsed || 0))}
          </span>
        </div>
      </Card>
    </div>
  );
}

// iDeCo管理
function IdecoTab({ data, updateData }) {
  const ideco = data.assets.ideco || {};
  const F = (field) => (val) => updateData((prev) => ({
    ...prev, assets: { ...prev.assets, ideco: { ...prev.assets.ideco, [field]: val } }
  }));

  const pnl = (ideco.currentValue || 0) - (ideco.totalContributed || 0);
  const pct = ideco.totalContributed > 0 ? (pnl / ideco.totalContributed * 100).toFixed(1) : 0;

  // 所得控除節税シミュレーション（概算）
  const annualContrib = (ideco.monthlyContribution || 0) * 12;
  const taxSaving = Math.round(annualContrib * 0.2);

  return (
    <div>
      <Card>
        <SectionHeader title="iDeCo 管理" color={colors.saving} />
        <AmountInput label="月額拠出金" value={ideco.monthlyContribution} onChange={F("monthlyContribution")} />
        <AmountInput label="累計拠出額" value={ideco.totalContributed} onChange={F("totalContributed")} />
        <AmountInput label="現在評価額" value={ideco.currentValue} onChange={F("currentValue")} />
        <div style={{ marginBottom: 12 }}>
          <label style={{ fontSize: 12, color: colors.textLight, display: "block", marginBottom: 4 }}>運用開始日</label>
          <input type="month" value={ideco.startDate || ""} onChange={(e) => F("startDate")(e.target.value)}
            style={{ width: "100%", padding: 12, fontSize: 16, border: "1.5px solid #E0E0E0", borderRadius: 10, boxSizing: "border-box", backgroundColor: "#FAFAFA" }} />
        </div>
      </Card>

      {ideco.totalContributed > 0 && (
        <Card style={{ backgroundColor: "#EBF5FB" }}>
          <SectionHeader title="iDeCo 運用成績" color={colors.saving} />
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            <span style={{ fontSize: 13, color: colors.textLight }}>現在評価額</span>
            <span style={{ fontSize: 20, fontWeight: 800, color: colors.saving }}>{fmtYen(ideco.currentValue || 0)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            <span style={{ fontSize: 13, color: colors.textLight }}>運用益</span>
            <span style={{ fontSize: 16, fontWeight: 700, color: pnl >= 0 ? colors.income : colors.expense }}>
              {pnl >= 0 ? "+" : ""}{fmtYen(pnl)} ({pct}%)
            </span>
          </div>
          <Divider />
          <div style={{ fontSize: 13, color: colors.textLight, marginBottom: 4 }}>💡 所得控除効果（今年度・概算）</div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: 13 }}>拠出額 {fmtYen(annualContrib)} × 税率20%</span>
            <span style={{ fontSize: 16, fontWeight: 700, color: colors.income }}>≈ {fmtYen(taxSaving)} 節税</span>
          </div>
        </Card>
      )}
    </div>
  );
}

// 変額年金保険
function AnnuityTab({ data, updateData }) {
  const [showAdd, setShowAdd] = useState(false);
  const annuities = data.assets.variableAnnuities || [];

  const [form, setForm] = useState({
    name: "", contractDate: "", monthlyPremium: 0, totalPremium: 0,
    currentValue: 0, maturityDate: "", maturityAmount: 0, deathBenefit: 0,
    fundAllocation: [{ fundName: "", allocation: 100 }], memo: "",
  });

  const add = () => {
    if (!form.name) return;
    updateData((prev) => ({
      ...prev, assets: { ...prev.assets, variableAnnuities: [...(prev.assets.variableAnnuities || []), { ...form, id: genId() }] }
    }));
    setShowAdd(false);
  };

  const del = (id) => updateData((prev) => ({
    ...prev, assets: { ...prev.assets, variableAnnuities: prev.assets.variableAnnuities.filter((a) => a.id !== id) }
  }));

  const F = (field) => (v) => setForm((f) => ({ ...f, [field]: v }));

  return (
    <div>
      {annuities.map((ann) => {
        const pnl = ann.currentValue - ann.totalPremium;
        const pct = ann.totalPremium > 0 ? (pnl / ann.totalPremium * 100).toFixed(2) : 0;
        return (
          <Card key={ann.id}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <div style={{ fontSize: 15, fontWeight: 700 }}>{ann.name}</div>
              <button onClick={() => del(ann.id)} style={{ fontSize: 11, color: colors.expense, background: "none", border: "none", cursor: "pointer" }}>削除</button>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontSize: 13, color: colors.textLight }}>現在評価額</span>
              <span style={{ fontSize: 20, fontWeight: 800, color: colors.asset }}>{fmtYen(ann.currentValue)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontSize: 13, color: colors.textLight }}>払込保険料</span>
              <span style={{ fontSize: 14 }}>{fmtYen(ann.totalPremium)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 14, fontWeight: 700 }}>含み損益</span>
              <span style={{ fontSize: 16, fontWeight: 700, color: pnl >= 0 ? colors.income : colors.expense }}>
                {pnl >= 0 ? "+" : ""}{fmtYen(pnl)} ({pct}%)
              </span>
            </div>
          </Card>
        );
      })}

      {showAdd ? (
        <Card>
          <SectionHeader title="変額年金保険を追加" />
          <TextInput label="保険会社・商品名" value={form.name} onChange={F("name")} placeholder="例: 日本生命 変額年金" />
          <AmountInput label="月額保険料" value={form.monthlyPremium} onChange={F("monthlyPremium")} />
          <AmountInput label="累計払込保険料" value={form.totalPremium} onChange={F("totalPremium")} />
          <AmountInput label="現在評価額（解約返戻金）" value={form.currentValue} onChange={F("currentValue")} />
          <AmountInput label="死亡保険金" value={form.deathBenefit} onChange={F("deathBenefit")} />
          <TextInput label="メモ" value={form.memo} onChange={F("memo")} placeholder="メモ（任意）" />
          <div style={{ backgroundColor: "#FFF3CD", borderRadius: 8, padding: 10, marginBottom: 12 }}>
            <div style={{ fontSize: 12, color: "#856404" }}>
              ⚠️ 変額年金は元本保証なし。早期解約で元本割れの可能性があります。
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <PrimaryButton onClick={add} color={colors.asset} style={{ flex: 1 }}>追加</PrimaryButton>
            <OutlineButton onClick={() => setShowAdd(false)} color={colors.neutral} style={{ flex: 1 }}>キャンセル</OutlineButton>
          </div>
        </Card>
      ) : (
        <PrimaryButton onClick={() => setShowAdd(true)} color={colors.asset}>＋ 変額年金保険を追加</PrimaryButton>
      )}
    </div>
  );
}

// 総資産・純資産
function NetWorthTab({ data }) {
  const bankTotal     = (data.assets.bankAccounts || []).reduce((a, b) => a + b.balance, 0);
  const investTotal   = (data.assets.investments || []).reduce((a, inv) => a + inv.currentPrice * inv.quantity, 0);
  const idecoVal      = data.assets.ideco?.currentValue || 0;
  const annuityVal    = (data.assets.variableAnnuities || []).reduce((a, v) => a + v.currentValue, 0);
  const totalAsset    = bankTotal + investTotal + idecoVal + annuityVal;
  const totalLoan     = (data.loans || []).reduce((a, l) => a + l.remainingBalance, 0);
  const netWorth      = totalAsset - totalLoan;

  const pieData = [
    { name: "現金・預金", value: bankTotal, color: colors.saving },
    { name: "投資資産", value: investTotal, color: colors.income },
    { name: "iDeCo", value: idecoVal, color: "#F39C12" },
    { name: "変額年金", value: annuityVal, color: colors.asset },
  ].filter((d) => d.value > 0);

  return (
    <div>
      <Card>
        <SectionHeader title="純資産（ネットワース）" color={colors.asset} />
        {[
          { label: "現金・預金", val: bankTotal, color: colors.saving },
          { label: "投資資産", val: investTotal, color: colors.income },
          { label: "iDeCo", val: idecoVal, color: "#F39C12" },
          { label: "変額年金", val: annuityVal, color: colors.asset },
        ].map(({ label, val, color }) => (
          <div key={label} style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 13, color: colors.textLight }}>{label}</span>
            <span style={{ fontSize: 14, fontWeight: 600, color }}>{fmtYen(val)}</span>
          </div>
        ))}
        <Divider />
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontSize: 14, fontWeight: 700 }}>総資産</span>
          <span style={{ fontSize: 18, fontWeight: 800, color: colors.asset }}>{fmtYen(totalAsset)}</span>
        </div>

        <Divider />
        {data.loans.map((l) => (
          <div key={l.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 13, color: colors.textLight }}>{LOAN_TYPE_ICON[l.type]} {l.name}</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: colors.loan }}>▲{fmtYen(l.remainingBalance)}</span>
          </div>
        ))}
        <Divider />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontSize: 15, fontWeight: 700 }}>純資産</span>
          <span style={{ fontSize: 24, fontWeight: 800, color: netWorth >= 0 ? colors.income : colors.expense }}>
            {netWorth < 0 ? "▲" : ""}{fmtYen(Math.abs(netWorth))}
          </span>
        </div>
      </Card>

      {pieData.length > 0 && (
        <Card>
          <SectionHeader title="資産クラス別構成" />
          <ResponsiveContainer width="100%" height={200}>
            <RechartsPie>
              <Pie data={pieData} cx="50%" cy="50%" outerRadius={75} dataKey="value"
                label={({ name, percent }) => percent > 0.05 ? `${name} ${Math.round(percent * 100)}%` : ""}
                fontSize={10}>
                {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip formatter={(v) => fmtYen(v)} />
            </RechartsPie>
          </ResponsiveContainer>
        </Card>
      )}
    </div>
  );
}

function SimulationTab({ data, updateData }) {
  return (
    <div style={{ padding: 16 }}>
      <h2 style={{ color: colors.text, margin: 0 }}>🔮 シミュレーション</h2>
      <p style={{ color: colors.textLight }}>フェーズ12・13で実装予定</p>
    </div>
  );
}

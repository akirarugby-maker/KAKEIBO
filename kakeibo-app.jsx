/*
========================================
💰 家計簿アプリ - ビルド進捗
========================================
フェーズ1:  基盤・データ構造・状態管理    [✅]
フェーズ2:  共通コンポーネント・スマホUI  [✅]
フェーズ3:  ホーム（ダッシュボード）      [✅]
フェーズ4:  ①収入タブ                   [✅]
フェーズ5:  ②支出タブ 前半（入力・一覧） [ ]
フェーズ6:  ②支出タブ 後半（分析・予算） [ ]
フェーズ7:  ③ローンタブ 前半（登録・一覧）[ ]
フェーズ8:  ③ローンタブ 後半（返済表・繰上）[ ]
フェーズ9:  ④資産タブ 銀行・株式・投信   [ ]
フェーズ10: ④資産タブ NISA・iDeCo       [ ]
フェーズ11: ④資産タブ 変額年金・総資産   [ ]
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

function ExpenseTab({ data, updateData }) {
  return (
    <div style={{ padding: 16 }}>
      <h2 style={{ color: colors.text, margin: 0 }}>💳 支出</h2>
      <p style={{ color: colors.textLight }}>フェーズ5・6で実装予定</p>
    </div>
  );
}

function LoanTab({ data, updateData }) {
  return (
    <div style={{ padding: 16 }}>
      <h2 style={{ color: colors.text, margin: 0 }}>🏦 ローン</h2>
      <p style={{ color: colors.textLight }}>フェーズ7・8で実装予定</p>
    </div>
  );
}

function AssetTab({ data, updateData }) {
  return (
    <div style={{ padding: 16 }}>
      <h2 style={{ color: colors.text, margin: 0 }}>📈 資産</h2>
      <p style={{ color: colors.textLight }}>フェーズ9〜11で実装予定</p>
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

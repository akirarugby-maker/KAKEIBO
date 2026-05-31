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
フェーズ12: ⑤シミュ 将来資産・ローン完済 [✅]
フェーズ13: ⑤シミュ 老後資金・FIRE試算  [✅]
フェーズ14: AI機能統合                  [削除]
フェーズ15: 仕上げ・CSV出力・バックアップ [✅]
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
  futurePlans: [],
  futureIncomes: [],
  customCats: [],
  budgets: {
    "食費": 50000, "外食": 20000, "住居費": 80000, "マンション管理費等": 20000,
    "電気代": 8000, "ガス代": 5000, "水道代": 3000,
    "通信費": 10000, "交通費": 20000, "保険料": 30000, "医療費": 10000,
    "勉強費": 10000, "雑費": 15000, "交際費": 20000, "車関係": 20000,
    "被服費": 10000, "こづかい1": 10000, "こづかい2": 10000,
    "楽天カード1": 30000, "楽天カード2": 30000,
    "イオンカード1": 30000, "イオンカード2": 30000,
    "奨学金返済1": 20000, "奨学金返済2": 20000,
    "ローン返済1": 30000, "ローン返済2": 30000,
    "クレジットカード": 30000, "その他": 10000,
  },
  loans: [],
  assets: {
    bankAccounts: [],
    investments: [],
    nisa: {
      tsumitateUsed: 0,
      growthUsed: 0,
      // lifetimeUsed は tsumitateUsed + growthUsed から自動計算
      year: new Date().getFullYear(),
      monthlyContribution: 0,  // NISA月額積立
      investments: [],
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
const EXPENSE_CATS = [
  { name: "食費",     color: "#E74C3C", isFixed: false },
  { name: "外食",     color: "#C0392B", isFixed: false },
  { name: "住居費",   color: "#E67E22", isFixed: true  },
  { name: "マンション管理費等", color: "#D35400", isFixed: true  },
  { name: "電気代",   color: "#F1C40F", isFixed: false },
  { name: "ガス代",   color: "#FF9800", isFixed: false },
  { name: "水道代",   color: "#3498DB", isFixed: false },
  { name: "通信費",   color: "#2ECC71", isFixed: true  },
  { name: "交通費",   color: "#3498DB", isFixed: false },
  { name: "保険料",   color: "#9B59B6", isFixed: true  },
  { name: "医療費",   color: "#E91E63", isFixed: false },
  { name: "勉強費",   color: "#00BCD4", isFixed: false },
  { name: "雑費",     color: "#795548", isFixed: false },
  { name: "交際費",   color: "#FF9800", isFixed: false },
  { name: "車関係",   color: "#546E7A", isFixed: false },
  { name: "被服費",       color: "#607D8B", isFixed: false },
  { name: "こづかい1",    color: "#FF7043", isFixed: false },
  { name: "こづかい2",    color: "#FF8A65", isFixed: false },
  { name: "楽天カード1",  color: "#BF0000", isFixed: false },
  { name: "楽天カード2",  color: "#D32F2F", isFixed: false },
  { name: "イオンカード1", color: "#E91E63", isFixed: false },
  { name: "イオンカード2", color: "#F06292", isFixed: false },
  { name: "奨学金返済1",  color: "#5C6BC0", isFixed: true  },
  { name: "奨学金返済2",  color: "#7986CB", isFixed: true  },
  { name: "ローン返済1",  color: "#00838F", isFixed: true  },
  { name: "ローン返済2",  color: "#00ACC1", isFixed: true  },
  { name: "クレジットカード", color: "#1565C0", isFixed: false },
  { name: "その他",       color: "#95A5A6", isFixed: false },
  { name: "NISA積立", color: "#27AE60", isFixed: true, isInvest: true },
  { name: "iDeCo",   color: "#2980B9", isFixed: true, isInvest: true },
  { name: "変額年金", color: "#8E44AD", isFixed: true, isInvest: true },
];
// 後方互換用マップ（分析・ホーム参照）
const expenseCategories = Object.fromEntries(
  EXPENSE_CATS.map((c) => [c.name, { color: c.color, subcategories: [], isFixed: false }])
);

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
  { id: "home",       label: "ホーム",  emoji: "🏠", color: "#5B5EA6" },
  { id: "income",     label: "収入",    emoji: "💴", color: "#27AE60" },
  { id: "expense",    label: "支出",    emoji: "🛒", color: "#E74C3C" },
  { id: "loan",       label: "ローン",  emoji: "🏦", color: "#E67E22" },
  { id: "asset",      label: "資産",    emoji: "📈", color: "#8E44AD" },
  { id: "simulation", label: "シミュ",  emoji: "🔮", color: "#2980B9" },
  { id: "financial",  label: "財務諸表", emoji: "📊", color: "#1565C0" },
];

// ===== メインアプリ =====
export default function KakeiboApp() {
  const [data, setData] = useState(() => loadData());
  const [activeTab, setActiveTab] = useState(
    () => localStorage.getItem("kakeibo-active-tab") || "home"
  );

  const handleSetActiveTab = (tab) => {
    localStorage.setItem("kakeibo-active-tab", tab);
    setActiveTab(tab);
  };

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
      case "financial":  return <FinancialTab  data={data} />;
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
      <BottomNav activeTab={activeTab} setActiveTab={handleSetActiveTab} />
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
      height: 74,
      backgroundColor: "#FFFFFF",
      borderTop: "1px solid #EBEBEB",
      display: "flex",
      zIndex: 1000,
      boxShadow: "0 -4px 16px rgba(0,0,0,0.10)",
    }}>
      {TABS.map((tab) => {
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
              gap: 3,
              border: "none",
              background: "none",
              cursor: "pointer",
              padding: "6px 0 4px",
              position: "relative",
            }}
          >
            {/* アクティブ時の背景ピル */}
            {active && (
              <div style={{
                position: "absolute",
                top: 6,
                left: "50%",
                transform: "translateX(-50%)",
                width: 44,
                height: 32,
                backgroundColor: tab.color + "22",
                borderRadius: 12,
              }} />
            )}
            {/* 上部アクセントライン */}
            {active && (
              <div style={{
                position: "absolute",
                top: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: 28,
                height: 3,
                backgroundColor: tab.color,
                borderRadius: "0 0 4px 4px",
              }} />
            )}
            <span style={{
              fontSize: active ? 27 : 23,
              lineHeight: 1,
              filter: active ? "none" : "grayscale(30%)",
              transition: "font-size 0.15s",
              zIndex: 1,
            }}>{tab.emoji}</span>
            <span style={{
              fontSize: 12,
              fontWeight: active ? 800 : 500,
              color: active ? tab.color : "#AAA",
              letterSpacing: active ? "0.02em" : 0,
              transition: "color 0.15s",
              zIndex: 1,
            }}>{tab.label}</span>
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

  // 先月のYM
  const prevMonth = today.getMonth() === 0
    ? `${today.getFullYear() - 1}-12`
    : `${today.getFullYear()}-${String(today.getMonth()).padStart(2, "0")}`;

  // 今月の給与データ
  const thisSalary = data.salaries.find((s) => s.month === ym);
  const grossIncome = thisSalary
    ? thisSalary.basicSalary + Object.values(thisSalary.allowances || {}).reduce((a, b) => a + b, 0)
    : 0;
  const totalDeductions = thisSalary
    ? Object.values(thisSalary.deductions || {}).reduce((a, b) => a + b, 0)
    : 0;
  const netIncome = grossIncome - totalDeductions + (thisSalary?.bonus || 0) + (thisSalary?.spouseIncome || 0) + (thisSalary?.sideIncome || 0) + Object.values(thisSalary?.businessIncome || {}).reduce((a,b)=>a+b,0) - Object.values(thisSalary?.generalDeductions || {}).reduce((a,b)=>a+b,0);

  // 今月の支出
  const monthExpenses = data.expenses.filter((e) => e.date?.startsWith(ym));
  const totalExpense = monthExpenses.reduce((a, e) => a + e.amount, 0);
  const balance = netIncome - totalExpense;

  // 資産・負債
  const bankTotal = (data.assets.bankAccounts || []).reduce((a, b) => a + b.balance, 0);
  const investTotal = (data.assets.nisa?.investments || []).reduce((a, i) => a + i.currentPrice * i.quantity, 0);
  const idecoVal = data.assets.ideco?.currentValue || 0;
  const annuityVal = (data.assets.variableAnnuities || []).reduce((a, v) => a + v.currentValue, 0);
  const totalAsset = bankTotal + investTotal + idecoVal + annuityVal;
  const totalLoan = (data.loans || []).reduce((a, l) => a + l.remainingBalance, 0);
  const netWorth = totalAsset - totalLoan;

  // 先月の収支を将来予測の基準に
  const prevSalary = data.salaries.find((s) => s.month === prevMonth);
  const prevIncome = prevSalary
    ? prevSalary.basicSalary
      + Object.values(prevSalary.allowances || {}).reduce((a, b) => a + b, 0)
      - Object.values(prevSalary.deductions || {}).reduce((a, b) => a + b, 0)
      + (prevSalary.bonus || 0) + (prevSalary.spouseIncome || 0) + (prevSalary.sideIncome || 0) + Object.values(prevSalary.businessIncome || {}).reduce((a,b)=>a+b,0) - Object.values(prevSalary.generalDeductions || {}).reduce((a,b)=>a+b,0)
    : netIncome;
  const prevExpense = data.expenses
    .filter((e) => e.date?.startsWith(prevMonth))
    .reduce((a, e) => a + e.amount, 0);
  const monthlyBalance = prevIncome > 0 ? prevIncome - prevExpense : balance;
  const baseMonth = prevIncome > 0 ? prevMonth : ym;

  // ローン残高のn年後を計算
  const loanAfterMonths = (months) => data.loans.reduce((sum, loan) => {
    const rate = loan.interestRate / 100 / 12;
    let bal = loan.remainingBalance;
    for (let i = 0; i < months && bal > 0; i++) {
      if (rate > 0) bal = Math.max(0, bal - (loan.monthlyPayment - Math.round(bal * rate)));
      else          bal = Math.max(0, bal - loan.monthlyPayment);
    }
    return sum + bal;
  }, 0);

  // 資産管理の月額積立合計（NISA＋iDeCo＋変額年金）
  const nisaMonthly    = data.assets.nisa?.monthlyContribution || 0;
  const idecoMonthly   = data.assets.ideco?.monthlyContribution || 0;
  const annuityMonthly = (data.assets.variableAnnuities || []).reduce((a, v) => a + (v.monthlyPremium || 0), 0);
  const totalMonthlyInvest = nisaMonthly + idecoMonthly + annuityMonthly;

  // 将来予測の行
  const forecasts = [5, 10, 15, 20].map((years) => {
    const months = years * 12;
    const planCost = (data.futurePlans || [])
      .filter((p) => (p.years || 0) <= years)
      .reduce((a, p) => a + (p.amount || 0), 0);
    const incomeGain = (data.futureIncomes || [])
      .filter((p) => (p.years || 0) <= years)
      .reduce((a, p) => a + (p.amount || 0), 0);
    const futureAsset    = totalAsset + monthlyBalance * months + totalMonthlyInvest * months - planCost + incomeGain;
    const futureLoan     = loanAfterMonths(months);
    const futureNetWorth = futureAsset - futureLoan;
    return { years, futureAsset, futureLoan, futureNetWorth };
  });

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

  const [cardMonth, setCardMonth] = useState(ym);
  const loanTypeIcon = { car: "🚗", housing: "🏠", scholarship: "🎓", other: "💰" };

  // cardMonth用のデータを計算
  const cardSalary = data.salaries.find((s) => s.month === cardMonth);
  const cardGross = cardSalary
    ? cardSalary.basicSalary + Object.values(cardSalary.allowances || {}).reduce((a, b) => a + b, 0)
    : 0;
  const cardDed = cardSalary
    ? Object.values(cardSalary.deductions || {}).reduce((a, b) => a + b, 0)
    : 0;
  const cardNet = cardGross - cardDed + (cardSalary?.bonus || 0) + (cardSalary?.spouseIncome || 0) + (cardSalary?.sideIncome || 0) + Object.values(cardSalary?.businessIncome || {}).reduce((a,b)=>a+b,0) - Object.values(cardSalary?.generalDeductions || {}).reduce((a,b)=>a+b,0);
  const cardExpense = data.expenses.filter((e) => e.date?.startsWith(cardMonth)).reduce((a, e) => a + e.amount, 0);
  const cardBalance = cardNet - cardExpense;

  const shiftCardMonth = (delta) => {
    const [y, m] = cardMonth.split("-").map(Number);
    const d = new Date(y, m - 1 + delta, 1);
    const next = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    // 未来月には進めない
    if (next <= ym) setCardMonth(next);
  };
  const [cm_y, cm_m] = cardMonth.split("-").map(Number);
  const isCurrentMonth = cardMonth === ym;

  const [bm_y, bm_m] = baseMonth.split("-").map(Number);

  // 月末リマインダー（25日〜月末に表示）
  const todayDay = today.getDate();
  const dismissKey = `kakeibo-asset-reminder-${ym}`;
  const [reminderDismissed, setReminderDismissed] = useState(
    () => localStorage.getItem(dismissKey) === "1"
  );
  const showReminder = todayDay >= 25 && !reminderDismissed;
  const dismissReminder = () => {
    localStorage.setItem(dismissKey, "1");
    setReminderDismissed(true);
  };

  return (
    <div>
      {/* ページタイトル */}
      <div style={{ padding: "16px 16px 4px", display: "flex", alignItems: "baseline", gap: 10 }}>
        <span style={{ fontSize: 20, fontWeight: 800, color: colors.text }}>家計簿</span>
        <span style={{ fontSize: 16, fontWeight: 600, color: colors.textLight }}>
          {today.getFullYear()}年{today.getMonth() + 1}月
        </span>
      </div>

      {/* 月末リマインダーバナー */}
      {showReminder && (
        <div style={{ padding: "0 16px 8px" }}>
          <div style={{
            backgroundColor: "#FFF9E6",
            border: "1.5px solid #F1C40F",
            borderRadius: 12,
            padding: "12px 14px",
            display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1 }}>
              <span style={{ fontSize: 22 }}>🔔</span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#B8860B" }}>資産管理の更新をしましょう</div>
                <div style={{ fontSize: 11, color: "#8B6914", marginTop: 2 }}>
                  銀行残高・NISA評価額などを最新の値に更新してください
                </div>
              </div>
            </div>
            <button onClick={dismissReminder} style={{
              background: "none", border: "none", fontSize: 18,
              color: "#B8860B", cursor: "pointer", flexShrink: 0, padding: 4,
            }}>✕</button>
          </div>
        </div>
      )}

      {/* 1. 収支カード（月スライド対応） */}
      <div style={{ padding: "0 16px" }}>
        <Card style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "#fff" }}>
          {/* 月ナビゲーター */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
            <button onClick={() => shiftCardMonth(-1)} style={{
              background: "rgba(255,255,255,0.2)", border: "none", borderRadius: 8,
              color: "#fff", fontSize: 20, width: 36, height: 36, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>‹</button>
            <span style={{ fontSize: 15, fontWeight: 700 }}>
              {cm_y}年{cm_m}月{isCurrentMonth ? "（今月）" : ""}
            </span>
            <button onClick={() => shiftCardMonth(1)} style={{
              background: isCurrentMonth ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.2)",
              border: "none", borderRadius: 8,
              color: isCurrentMonth ? "rgba(255,255,255,0.3)" : "#fff",
              fontSize: 20, width: 36, height: 36,
              cursor: isCurrentMonth ? "default" : "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>›</button>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 14, opacity: 0.9 }}>手取り</span>
            <span style={{ fontSize: 22, fontWeight: 700 }}>{fmtYen(cardNet)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 14, opacity: 0.9 }}>支出</span>
            <span style={{ fontSize: 22, fontWeight: 700 }}>-{fmtYen(cardExpense)}</span>
          </div>
          <div style={{ height: 1, backgroundColor: "rgba(255,255,255,0.3)", marginBottom: 8 }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 15, fontWeight: 600 }}>収支</span>
            <span style={{ fontSize: 26, fontWeight: 800, color: cardBalance >= 0 ? "#A8FFB0" : "#FFB0B0" }}>
              {cardBalance >= 0 ? "+" : ""}{fmtYen(cardBalance)}
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

        {/* 将来予測カード */}
        <Card style={{ border: `1.5px solid ${colors.asset}` }}>
          <SectionHeader title="【予想】将来の資産・負債" color={colors.asset} />
          <div style={{ fontSize: 11, color: colors.textLight, marginBottom: 10 }}>
            {bm_y}年{bm_m}月の収支（月{monthlyBalance >= 0 ? "+" : ""}{fmtYen(monthlyBalance)}）を元に計算しています
            {totalMonthlyInvest > 0 && (
              <span>　＋　NISA・iDeCo・変額年金 月{fmtYen(totalMonthlyInvest)}を加算</span>
            )}
          </div>
          {/* ヘッダー行 */}
          <div style={{ display: "flex", borderBottom: "1.5px solid #EEE", paddingBottom: 6, marginBottom: 4 }}>
            <div style={{ flex: "0 0 52px" }} />
            {["総資産", "ローン残高", "純資産"].map((h) => (
              <div key={h} style={{ flex: 1, textAlign: "right", fontSize: 11, fontWeight: 700, color: colors.textLight }}>{h}</div>
            ))}
          </div>
          {/* 現在 */}
          <div style={{ display: "flex", alignItems: "center", padding: "6px 0", borderBottom: "1px solid #F0F0F0" }}>
            <div style={{ flex: "0 0 52px", fontSize: 12, fontWeight: 700, color: colors.text }}>現在</div>
            <div style={{ flex: 1, textAlign: "right", fontSize: 12, fontWeight: 600, color: colors.asset }}>{fmtYen(totalAsset)}</div>
            <div style={{ flex: 1, textAlign: "right", fontSize: 12, fontWeight: 600, color: colors.loan }}>{fmtYen(totalLoan)}</div>
            <div style={{ flex: 1, textAlign: "right", fontSize: 13, fontWeight: 800, color: netWorth >= 0 ? colors.income : colors.expense }}>
              {netWorth < 0 ? "▲" : ""}{fmtYen(Math.abs(netWorth))}
            </div>
          </div>
          {/* 5・10・15・20年後 */}
          {forecasts.map(({ years, futureAsset, futureLoan, futureNetWorth }) => (
            <div key={years} style={{ display: "flex", alignItems: "center", padding: "6px 0", borderBottom: "1px solid #F5F5F5" }}>
              <div style={{ flex: "0 0 52px", fontSize: 12, fontWeight: 700, color: colors.asset }}>{years}年後</div>
              <div style={{ flex: 1, textAlign: "right", fontSize: 12, color: colors.asset }}>{fmtYen(Math.max(0, futureAsset))}</div>
              <div style={{ flex: 1, textAlign: "right", fontSize: 12, color: colors.loan }}>
                {futureLoan > 0 ? fmtYen(futureLoan) : <span style={{ color: colors.income, fontWeight: 700 }}>完済</span>}
              </div>
              <div style={{ flex: 1, textAlign: "right", fontSize: 13, fontWeight: 800, color: futureNetWorth >= 0 ? colors.income : colors.expense }}>
                {futureNetWorth < 0 ? "▲" : ""}{fmtYen(Math.abs(futureNetWorth))}
              </div>
            </div>
          ))}
        </Card>

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

        {/* データ管理 */}
        <DataManagementPanel data={data} updateData={updateData} />

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
  businessIncome: { firstYearFee: 0, renewalFee: 0, conservationFee: 0, nonLifeFee: 0, commuting: 0, carInsuranceSubsidy: 0, taxAdjustment: 0, balanceFee: 0, other: 0 },
  generalDeductions: { groupInsurance: 0, novelty: 0, salesTool: 0, printing: 0, donation: 0, other: 0 },
  deductions: { healthInsurance: 0, nursingInsurance: 0, pension: 0, employmentInsurance: 0, incomeTax: 0, residentTax: 0, other: 0 },
  bonus: 0,
  spouseIncome: 0,
  sideIncome: 0,
  memo: "",
});

function IncomeTab({ data, updateData }) {
  const [incSubtab, setIncSubtab] = useState("毎月収入");
  const [month, setMonth] = useState(currentYM());
  const existing = data.salaries.find((s) => s.month === month);
  const [form, setForm] = useState(existing || blankSalary());
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const e = data.salaries.find((s) => s.month === month);
    if (e) {
      setForm({ ...e });
    } else {
      // 前月データをコピーして翌月の初期値にする
      const [y, m] = month.split("-").map(Number);
      const prevMonth = m === 1
        ? `${y - 1}-12`
        : `${y}-${String(m - 1).padStart(2, "0")}`;
      const prev = data.salaries.find((s) => s.month === prevMonth);
      if (prev) {
        setForm({ ...prev, month, bonus: 0, memo: "" });
      } else {
        setForm({ ...blankSalary(), month });
      }
    }
    setSaved(false);
  }, [month, data.salaries]);

  const setA  = (field) => (val) => setForm((f) => ({ ...f, allowances:      { ...f.allowances,      [field]: val } }));
  const setD  = (field) => (val) => setForm((f) => ({ ...f, deductions:      { ...f.deductions,      [field]: val } }));
  const setBI = (field) => (val) => setForm((f) => ({ ...f, businessIncome:  { ...(f.businessIncome  || {}), [field]: val } }));
  const setGD = (field) => (val) => setForm((f) => ({ ...f, generalDeductions: { ...(f.generalDeductions || {}), [field]: val } }));

  const grossPay    = form.basicSalary + Object.values(form.allowances).reduce((a, b) => a + b, 0);
  const totalBI     = Object.values(form.businessIncome  || {}).reduce((a, b) => a + b, 0);
  const totalGD     = Object.values(form.generalDeductions || {}).reduce((a, b) => a + b, 0);
  const totalDed    = Object.values(form.deductions).reduce((a, b) => a + b, 0);
  const netPay      = grossPay + totalBI - totalGD - totalDed;
  const totalIncome = netPay + (form.bonus || 0) + (form.spouseIncome || 0) + (form.sideIncome || 0);

  // 固定費（カテゴリで自動判定：住居費・通信費・保険料）
  const fixedExpenses = data.expenses
    .filter((e) => e.date?.startsWith(month) && (EXPENSE_CATS.find((c) => c.name === e.category)?.isFixed))
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
        手取り: Math.max(0, basic + (s?.bonus || 0) + (s?.spouseIncome || 0) + (s?.sideIncome || 0) + Object.values(s?.businessIncome || {}).reduce((a,b)=>a+b,0) - Object.values(s?.generalDeductions || {}).reduce((a,b)=>a+b,0)),
        基本給: Math.max(0, basic),
        配偶者収入: s?.spouseIncome || 0,
        ボーナス: s?.bonus || 0,
        副収入: s?.sideIncome || 0,
      });
    }
    return months;
  })();

  return (
    <div>
      <PageTitle title="💴 収入" subtitle="給与明細を入力してください" />

      {/* サブタブ */}
      <div style={{ display: "flex", padding: "0 16px 8px", gap: 6 }}>
        {["毎月収入", "将来の収入"].map((t) => (
          <button key={t} onClick={() => setIncSubtab(t)} style={{
            flex: 1, padding: "8px 4px", borderRadius: 10, border: "none", cursor: "pointer",
            fontSize: 13, fontWeight: 700,
            backgroundColor: incSubtab === t ? colors.income : "#EEE",
            color: incSubtab === t ? "#fff" : colors.text,
          }}>{t}</button>
        ))}
      </div>

      {incSubtab === "将来の収入" ? <FutureIncomeTab data={data} updateData={updateData} /> : (
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

        {/* 事業所得セクション */}
        <Card>
          <Accordion title="【事業所得】" defaultOpen={false}>
            <AmountInput label="初年度手数料"     value={(form.businessIncome||{}).firstYearFee||0}          onChange={setBI("firstYearFee")} />
            <AmountInput label="継続手数料"       value={(form.businessIncome||{}).renewalFee||0}            onChange={setBI("renewalFee")} />
            <AmountInput label="保全フィー"       value={(form.businessIncome||{}).conservationFee||0}       onChange={setBI("conservationFee")} />
            <AmountInput label="損保手数料"       value={(form.businessIncome||{}).nonLifeFee||0}            onChange={setBI("nonLifeFee")} />
            <AmountInput label="通勤手当"         value={(form.businessIncome||{}).commuting||0}             onChange={setBI("commuting")} />
            <AmountInput label="自動車保険補助"   value={(form.businessIncome||{}).carInsuranceSubsidy||0}   onChange={setBI("carInsuranceSubsidy")} />
            <AmountInput label="消費税調整"       value={(form.businessIncome||{}).taxAdjustment||0}         onChange={setBI("taxAdjustment")} />
            <AmountInput label="残高比例手数料"   value={(form.businessIncome||{}).balanceFee||0}            onChange={setBI("balanceFee")} />
            <AmountInput label="その他"           value={(form.businessIncome||{}).other||0}                 onChange={setBI("other")} />
            <Divider />
            <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0" }}>
              <span style={{ fontSize: 14, fontWeight: 600 }}>事業所得合計</span>
              <span style={{ fontSize: 18, fontWeight: 700, color: "#E67E22" }}>+{fmtYen(totalBI)}</span>
            </div>
          </Accordion>
        </Card>

        {/* 一般控除セクション */}
        <Card>
          <Accordion title="【一般控除】" defaultOpen={false}>
            <AmountInput label="グループ保険料"     value={(form.generalDeductions||{}).groupInsurance||0}  onChange={setGD("groupInsurance")} />
            <AmountInput label="ノベルティ購入"     value={(form.generalDeductions||{}).novelty||0}         onChange={setGD("novelty")} />
            <AmountInput label="営業ツール利用料"   value={(form.generalDeductions||{}).salesTool||0}        onChange={setGD("salesTool")} />
            <AmountInput label="印刷代"             value={(form.generalDeductions||{}).printing||0}        onChange={setGD("printing")} />
            <AmountInput label="社会貢献募金"       value={(form.generalDeductions||{}).donation||0}        onChange={setGD("donation")} />
            <AmountInput label="その他"             value={(form.generalDeductions||{}).other||0}           onChange={setGD("other")} />
            <Divider />
            <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0" }}>
              <span style={{ fontSize: 14, fontWeight: 600 }}>一般控除合計</span>
              <span style={{ fontSize: 18, fontWeight: 700, color: colors.expense }}>-{fmtYen(totalGD)}</span>
            </div>
          </Accordion>
        </Card>

        {/* 控除セクション */}
        <Card>
          <Accordion title="【控除】" defaultOpen={true}>
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
          <div style={{ fontSize: 11, color: colors.textLight, textAlign: "center", marginBottom: 4 }}>
            支給 ＋ 事業所得 − 一般控除 − 控除
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
            <span style={{ fontSize: 12, color: colors.textLight }}>支給合計</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: colors.income }}>+{fmtYen(grossPay)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
            <span style={{ fontSize: 12, color: colors.textLight }}>事業所得</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#E67E22" }}>+{fmtYen(totalBI)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
            <span style={{ fontSize: 12, color: colors.textLight }}>一般控除</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: colors.expense }}>-{fmtYen(totalGD)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 12, color: colors.textLight }}>控除合計</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: colors.expense }}>-{fmtYen(totalDed)}</span>
          </div>
          <div style={{ borderTop: "2px solid #C8E6C9", paddingTop: 8, textAlign: "center" }}>
            <div style={{ fontSize: 13, color: colors.textLight, marginBottom: 4 }}>差引支給額（手取り）</div>
            <div style={{ fontSize: 32, fontWeight: 800, color: colors.income }}>{fmtYen(netPay)}</div>
          </div>
        </Card>

        {/* 配偶者収入・ボーナス・副収入 */}
        <Card>
          <SectionHeader title="配偶者収入・ボーナス・副収入" />
          <AmountInput label="配偶者収入（手取り）" value={form.spouseIncome} onChange={(v) => setForm((f) => ({ ...f, spouseIncome: v }))} />
          <AmountInput label="ボーナス" value={form.bonus} onChange={(v) => setForm((f) => ({ ...f, bonus: v }))} />
          <AmountInput label="副収入" value={form.sideIncome} onChange={(v) => setForm((f) => ({ ...f, sideIncome: v }))} />
          <TextInput label="メモ" value={form.memo} onChange={(v) => setForm((f) => ({ ...f, memo: v }))} placeholder="メモ（任意）" />
        </Card>

        {/* 余裕資金カード */}
        <Card style={{ backgroundColor: "#EBF5FB" }}>
          <SectionHeader title="毎月の余裕資金" color={colors.saving} />
          <div style={{ fontSize: 12, color: colors.textLight, marginBottom: 8 }}>
            手取り収入 − 固定費 − ローン返済 = 自由に使えるお金
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
            <span style={{ fontSize: 15, fontWeight: 700, color: colors.saving }}>今月の余裕資金</span>
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
      )}
    </div>
  );
}

// ===== 将来の収入タブ =====
const FUTURE_INCOME_TYPES = [
  { type: "retirement",  label: "💼 退職金",       color: "#1565C0" },
  { type: "insurance",   label: "🛡 生命保険満期金", color: "#27AE60" },
  { type: "inheritance", label: "🏛 相続",          color: "#8E44AD" },
  { type: "pension",     label: "🧓 年金（一時金）", color: "#E67E22" },
  { type: "property",   label: "🏠 不動産売却",    color: "#E74C3C" },
  { type: "other",      label: "🎁 その他",        color: "#607D8B" },
];

function FutureIncomeTab({ data, updateData }) {
  const plans = data.futureIncomes || [];
  const blankForm = () => ({ id: null, type: "retirement", label: "", years: "", amount: "", memo: "" });
  const [form, setForm] = useState(blankForm());
  const [editing, setEditing] = useState(false);

  const F = (field) => (val) => setForm((f) => ({ ...f, [field]: val }));

  const save = () => {
    if (!form.years || !form.amount) return;
    const entry = {
      ...form,
      id: form.id || genId(),
      years: Number(form.years),
      amount: Number(form.amount),
    };
    updateData((prev) => {
      const list = prev.futureIncomes || [];
      return {
        ...prev,
        futureIncomes: form.id ? list.map((p) => p.id === form.id ? entry : p) : [...list, entry],
      };
    });
    setForm(blankForm());
    setEditing(false);
  };

  const del = (id) => updateData((prev) => ({ ...prev, futureIncomes: (prev.futureIncomes || []).filter((p) => p.id !== id) }));

  const startEdit = (p) => { setForm({ ...p }); setEditing(true); };

  const sorted = [...plans].sort((a, b) => a.years - b.years);
  const typeInfo = (t) => FUTURE_INCOME_TYPES.find((x) => x.type === t) || FUTURE_INCOME_TYPES[5];

  return (
    <div style={{ padding: "0 16px" }}>
      {/* 入力フォーム */}
      <Card>
        <SectionHeader title={editing ? "✏️ 将来の収入を編集" : "＋ 将来の収入を追加"} color={colors.income} />
        <div style={{ fontSize: 12, color: colors.textLight, marginBottom: 10 }}>
          退職金・保険満期金・相続など、将来受け取る予定の一時的な収入を登録します
        </div>
        {/* 種別ボタン */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
          {FUTURE_INCOME_TYPES.map((t) => (
            <button key={t.type} onClick={() => setForm((f) => ({ ...f, type: t.type }))} style={{
              padding: "6px 10px", borderRadius: 20, border: "none", cursor: "pointer",
              fontSize: 12, fontWeight: 700,
              backgroundColor: form.type === t.type ? t.color : "#EEE",
              color: form.type === t.type ? "#fff" : colors.text,
            }}>{t.label}</button>
          ))}
        </div>
        <TextInput label="名称（任意）" value={form.label} onChange={F("label")} placeholder={typeInfo(form.type).label} />
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, color: colors.textLight, marginBottom: 4 }}>何年後</div>
            <input
              type="number" inputMode="numeric" value={form.years}
              onChange={(e) => setForm((f) => ({ ...f, years: e.target.value }))}
              placeholder="例: 20"
              style={{ width: "100%", padding: "10px 12px", fontSize: 15, border: "1.5px solid #DDD", borderRadius: 10, boxSizing: "border-box" }}
            />
          </div>
          <div style={{ flex: 2 }}>
            <div style={{ fontSize: 12, color: colors.textLight, marginBottom: 4 }}>金額（円）</div>
            <input
              type="number" inputMode="numeric" value={form.amount}
              onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
              placeholder="例: 3000000"
              style={{ width: "100%", padding: "10px 12px", fontSize: 15, border: "1.5px solid #DDD", borderRadius: 10, boxSizing: "border-box" }}
            />
          </div>
        </div>
        <TextInput label="メモ（任意）" value={form.memo} onChange={F("memo")} placeholder="補足・条件など" />
        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          <PrimaryButton onClick={save} color={colors.income} style={{ flex: 1 }}>
            {editing ? "更新する" : "追加する"}
          </PrimaryButton>
          {editing && (
            <OutlineButton onClick={() => { setForm(blankForm()); setEditing(false); }} color={colors.neutral} style={{ flex: 1 }}>
              キャンセル
            </OutlineButton>
          )}
        </div>
      </Card>

      {/* 一覧 */}
      {sorted.length === 0 ? (
        <EmptyState message="将来の収入がまだ登録されていません" />
      ) : (
        <Card>
          <SectionHeader title="登録済みの将来収入" />
          {sorted.map((p) => {
            const info = typeInfo(p.type);
            const displayLabel = p.label || info.label;
            const nowYear = new Date().getFullYear();
            return (
              <div key={p.id} style={{
                padding: "12px 14px", borderRadius: 12, marginBottom: 8,
                border: `1.5px solid ${info.color}20`, backgroundColor: `${info.color}08`,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: info.color, backgroundColor: `${info.color}20`, padding: "2px 8px", borderRadius: 20 }}>
                        {info.label}
                      </span>
                      <span style={{ fontSize: 12, color: colors.textLight }}>
                        {p.years}年後（{nowYear + p.years}年）
                      </span>
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: colors.text }}>{displayLabel}</div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: info.color, marginTop: 2 }}>{fmtYen(p.amount)}</div>
                    {p.memo && <div style={{ fontSize: 11, color: colors.textLight, marginTop: 4 }}>{p.memo}</div>}
                  </div>
                  <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                    <button onClick={() => startEdit(p)} style={{
                      padding: "6px 10px", backgroundColor: "#EEE", border: "none",
                      borderRadius: 8, fontSize: 12, cursor: "pointer",
                    }}>編集</button>
                    <button onClick={() => del(p.id)} style={{
                      padding: "6px 10px", backgroundColor: "#FFEBEE", color: "#E74C3C",
                      border: "none", borderRadius: 8, fontSize: 12, cursor: "pointer",
                    }}>削除</button>
                  </div>
                </div>
              </div>
            );
          })}
          <Divider />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: 13, color: colors.textLight }}>合計予定受取額</span>
            <span style={{ fontSize: 18, fontWeight: 800, color: colors.income }}>
              {fmtYen(sorted.reduce((a, p) => a + p.amount, 0))}
            </span>
          </div>
        </Card>
      )}
    </div>
  );
}

// ===== フェーズ5・6: 支出タブ =====

// 日付文字列ユーティリティ
function addDays(dateStr, n) {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
}

function daysInMonth(ym) {
  const [y, m] = ym.split("-").map(Number);
  return new Date(y, m, 0).getDate();
}

// 月別支出一覧（メイン画面）
function ExpenseMonthlyView({ data, updateData, month, setMonth, onSelectDate }) {
  const days = daysInMonth(month);
  const [y, m] = month.split("-").map(Number);

  const monthTotal = data.expenses
    .filter((e) => e.date?.startsWith(month))
    .reduce((a, e) => a + e.amount, 0);

  return (
    <div>
      <MonthNavigator month={month} setMonth={setMonth} />

      {/* 月合計カード */}
      <div style={{ padding: "0 16px 8px" }}>
        <div style={{
          backgroundColor: "#FFF5F5", border: `2px solid ${colors.expense}`, borderRadius: 14,
          padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <span style={{ fontSize: 14, color: colors.textLight, fontWeight: 600 }}>{month} 合計支出</span>
          <span style={{ fontSize: 22, fontWeight: 800, color: colors.expense }}>-{fmtYen(monthTotal)}</span>
        </div>
      </div>

      {/* 日付一覧テーブル */}
      <div style={{ padding: "0 16px" }}>
        {/* ヘッダー行 */}
        <div style={{
          display: "flex", alignItems: "center",
          padding: "8px 14px", marginBottom: 4,
          backgroundColor: "#F0F0F0", borderRadius: 8,
        }}>
          <span style={{ flex: "0 0 70px", fontSize: 12, color: colors.textLight, fontWeight: 700 }}>日付</span>
          <span style={{ flex: 1, fontSize: 12, color: colors.textLight, fontWeight: 700 }}>カテゴリ内訳</span>
          <span style={{ flex: "0 0 90px", fontSize: 12, color: colors.textLight, fontWeight: 700, textAlign: "right" }}>金額</span>
        </div>

        {Array.from({ length: days }, (_, i) => {
          const day = i + 1;
          const dateStr = `${month}-${String(day).padStart(2, "0")}`;
          const dayExps = data.expenses.filter((e) => e.date === dateStr);
          const dayTotal = dayExps.reduce((a, e) => a + e.amount, 0);
          const today = todayStr();
          const isToday = dateStr === today;

          // カテゴリ色ドット（最大4つ）
          const cats = [...new Set(dayExps.map((e) => e.category))].slice(0, 4);

          return (
            <div key={day} onClick={() => onSelectDate(dateStr)} style={{
              display: "flex", alignItems: "center",
              padding: "11px 14px", marginBottom: 3, borderRadius: 12,
              backgroundColor: isToday ? "#FFF9E6" : colors.card,
              border: isToday ? `1.5px solid #F1C40F` : `1.5px solid transparent`,
              cursor: "pointer", transition: "background 0.1s",
            }}>
              {/* 日付 */}
              <div style={{ flex: "0 0 70px" }}>
                <span style={{ fontSize: 15, fontWeight: isToday ? 800 : 600, color: isToday ? "#B8860B" : colors.text }}>
                  {m}/{day}
                </span>
                {isToday && <span style={{ fontSize: 10, color: "#B8860B", marginLeft: 4 }}>今日</span>}
              </div>
              {/* カテゴリドット */}
              <div style={{ flex: 1, display: "flex", gap: 4, flexWrap: "wrap" }}>
                {cats.length > 0 ? cats.map((name) => {
                  const cat = EXPENSE_CATS.find((c) => c.name === name);
                  return (
                    <div key={name} style={{ display: "flex", alignItems: "center", gap: 3 }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: cat?.color || colors.neutral }} />
                      <span style={{ fontSize: 10, color: colors.textLight }}>{name}</span>
                    </div>
                  );
                }) : (
                  <span style={{ fontSize: 11, color: "#DDD" }}>—</span>
                )}
              </div>
              {/* 金額 */}
              <div style={{ flex: "0 0 90px", textAlign: "right" }}>
                {dayTotal > 0 ? (
                  <span style={{ fontSize: 15, fontWeight: 700, color: colors.expense }}>-{fmtYen(dayTotal)}</span>
                ) : (
                  <span style={{ fontSize: 13, color: "#DDD" }}>—</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ExpenseTab({ data, updateData }) {
  const [subtab, setSubtab] = useState("月別");
  const [month, setMonth] = useState(currentYM());
  const [selectedDate, setSelectedDate] = useState(null);

  const monthExpenses = data.expenses.filter((e) => e.date?.startsWith(month));

  const navigateDay = (dateStr) => setSelectedDate(dateStr);
  const handleSubtab = (t) => { setSubtab(t); setSelectedDate(null); };

  return (
    <div>
      <PageTitle title="💳 支出" />
      {!selectedDate && (
        <div style={{ display: "flex", gap: 8, padding: "0 16px 12px", overflowX: "auto" }}>
          {["月別", "分析", "将来プラン"].map((t) => (
            <button key={t} onClick={() => handleSubtab(t)} style={{
              flex: "0 0 auto", padding: "8px 20px",
              backgroundColor: subtab === t ? colors.expense : "#EEE",
              color: subtab === t ? "#fff" : colors.text,
              border: "none", borderRadius: 20, fontSize: 13, fontWeight: 600, cursor: "pointer",
            }}>{t}</button>
          ))}
        </div>
      )}

      <div style={{ padding: selectedDate ? "0" : "0 0px" }}>
        {selectedDate ? (
          <ExpenseDayDetailWrapper
            date={selectedDate}
            data={data}
            updateData={updateData}
            onBack={() => setSelectedDate(null)}
            onNavigate={navigateDay}
          />
        ) : subtab === "月別" ? (
          <ExpenseMonthlyView
            data={data}
            updateData={updateData}
            month={month}
            setMonth={setMonth}
            onSelectDate={setSelectedDate}
          />
        ) : subtab === "分析" ? (
          <ExpenseAnalysis
            data={data}
            month={month}
            setMonth={setMonth}
            monthExpenses={monthExpenses}
          />
        ) : (
          <FuturePlanTab data={data} updateData={updateData} />
        )}
      </div>
    </div>
  );
}

// ===== 将来プランタブ =====
const PLAN_TYPES = [
  { type: "wedding",  label: "💍 結婚資金",    color: "#E91E63" },
  { type: "car",      label: "🚗 車買い替え",  color: "#E67E22" },
  { type: "house",    label: "🏠 住宅購入",    color: "#2980B9" },
  { type: "travel",   label: "✈️ 海外旅行",   color: "#27AE60" },
  { type: "other",    label: "🎯 その他",      color: "#8E44AD" },
];

function FuturePlanTab({ data, updateData }) {
  const plans = data.futurePlans || [];
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ type: "wedding", label: "", years: 5, amount: 0, memo: "" });

  const F = (field) => (v) => setForm((f) => ({ ...f, [field]: v }));

  const resetForm = () => { setForm({ type: "wedding", label: "", years: 5, amount: 0, memo: "" }); setEditingId(null); setShowForm(false); };

  const save = () => {
    if (!form.amount) return;
    const planType = PLAN_TYPES.find((p) => p.type === form.type);
    const entry = { ...form, label: form.label || planType?.label || form.type, id: editingId || genId() };
    if (editingId) {
      updateData((prev) => ({ ...prev, futurePlans: prev.futurePlans.map((p) => p.id === editingId ? entry : p) }));
    } else {
      updateData((prev) => ({ ...prev, futurePlans: [...(prev.futurePlans || []), entry] }));
    }
    resetForm();
  };

  const del = (id) => updateData((prev) => ({ ...prev, futurePlans: prev.futurePlans.filter((p) => p.id !== id) }));

  const startEdit = (plan) => {
    setForm({ type: plan.type, label: plan.label, years: plan.years, amount: plan.amount, memo: plan.memo || "" });
    setEditingId(plan.id);
    setShowForm(true);
  };

  const totalPlan = plans.reduce((a, p) => a + (p.amount || 0), 0);
  const sorted = [...plans].sort((a, b) => a.years - b.years);

  return (
    <div style={{ padding: "0 16px" }}>
      {/* 合計カード */}
      {plans.length > 0 && (
        <Card style={{ border: `1.5px solid ${colors.expense}` }}>
          <SectionHeader title="将来の必要資金 合計" color={colors.expense} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 13, color: colors.textLight }}>{plans.length}件のプラン</span>
            <span style={{ fontSize: 24, fontWeight: 800, color: colors.expense }}>{fmtYen(totalPlan)}</span>
          </div>
          <div style={{ fontSize: 11, color: colors.textLight, marginTop: 4 }}>
            ※ ホーム画面の将来資産予測に反映されます
          </div>
        </Card>
      )}

      {/* プラン一覧 */}
      {sorted.map((plan) => {
        const pt = PLAN_TYPES.find((p) => p.type === plan.type);
        return (
          <Card key={plan.id}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: colors.text }}>{plan.label}</div>
                <div style={{ display: "flex", gap: 8, marginTop: 6, alignItems: "center" }}>
                  <span style={{
                    backgroundColor: (pt?.color || colors.neutral) + "22",
                    color: pt?.color || colors.neutral,
                    borderRadius: 8, padding: "2px 8px", fontSize: 11, fontWeight: 700,
                  }}>{plan.years}年後</span>
                  <span style={{ fontSize: 18, fontWeight: 800, color: colors.expense }}>{fmtYen(plan.amount)}</span>
                </div>
                {plan.memo ? <div style={{ fontSize: 11, color: colors.textLight, marginTop: 4 }}>{plan.memo}</div> : null}
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                <button onClick={() => startEdit(plan)} style={{ background: "none", border: "none", color: colors.saving, cursor: "pointer", fontSize: 16 }}>✏️</button>
                <button onClick={() => del(plan.id)} style={{ background: "none", border: "none", color: colors.expense, cursor: "pointer", fontSize: 16 }}>🗑</button>
              </div>
            </div>
          </Card>
        );
      })}

      {/* 入力フォーム */}
      {showForm ? (
        <Card>
          <SectionHeader title={editingId ? "プランを編集" : "プランを追加"} color={colors.expense} />
          {/* 種別ボタン */}
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 12, color: colors.textLight, display: "block", marginBottom: 6 }}>種別</label>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {PLAN_TYPES.map((pt) => (
                <button key={pt.type} onClick={() => {
                  setForm((f) => ({ ...f, type: pt.type, label: f.label || pt.label }));
                }} style={{
                  padding: "6px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600,
                  backgroundColor: form.type === pt.type ? pt.color : "#EEE",
                  color: form.type === pt.type ? "#fff" : colors.text,
                  border: "none", cursor: "pointer",
                }}>{pt.label}</button>
              ))}
            </div>
          </div>
          <TextInput label="プラン名" value={form.label} onChange={F("label")}
            placeholder={PLAN_TYPES.find((p) => p.type === form.type)?.label || "プラン名"} />
          {/* 何年後 */}
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 12, color: colors.textLight, display: "block", marginBottom: 4 }}>何年後</label>
            <input type="number" inputMode="numeric" value={form.years || ""}
              onChange={(e) => F("years")(Math.max(1, parseInt(e.target.value) || 1))}
              style={{ width: "100%", padding: 12, fontSize: 16, border: "1.5px solid #E0E0E0", borderRadius: 10, boxSizing: "border-box", backgroundColor: "#FAFAFA" }} />
          </div>
          <AmountInput label="必要金額" value={form.amount} onChange={F("amount")} />
          <TextInput label="メモ（任意）" value={form.memo} onChange={F("memo")} placeholder="メモ" />
          <div style={{ display: "flex", gap: 8 }}>
            <PrimaryButton onClick={save} color={colors.expense} style={{ flex: 1 }}>{editingId ? "保存" : "追加"}</PrimaryButton>
            <OutlineButton onClick={resetForm} color={colors.neutral} style={{ flex: 1 }}>キャンセル</OutlineButton>
          </div>
        </Card>
      ) : (
        <PrimaryButton onClick={() => setShowForm(true)} color={colors.expense}>＋ プランを追加</PrimaryButton>
      )}
    </div>
  );
}

// ラッパー：日付ナビを正しく扱う
function ExpenseDayDetailWrapper({ date, data, updateData, onBack, onNavigate }) {
  const [currentDate, setCurrentDate] = useState(date);

  React.useEffect(() => { setCurrentDate(date); }, [date]);

  const [y, mm, d] = currentDate.split("-").map(Number);
  const dateLabel = `${y}年${mm}月${d}日`;
  const [selectedCat, setSelectedCat] = useState(null);
  const [inputVal, setInputVal] = useState(0);
  const [showAddCat, setShowAddCat] = useState(false);
  const [newCatName, setNewCatName] = useState("");
  const [copiedFromPrev, setCopiedFromPrev] = useState(false);

  // 27日で当月未入力の場合、前月27日のデータを自動コピー
  React.useEffect(() => {
    if (d !== 27) return;
    const todayExps = data.expenses.filter((e) => e.date === currentDate);
    if (todayExps.length > 0) return;
    const prevYM = mm === 1 ? `${y - 1}-12` : `${y}-${String(mm - 1).padStart(2, "0")}`;
    const prevDate = `${prevYM}-27`;
    const prevExps = data.expenses.filter((e) => e.date === prevDate);
    if (prevExps.length === 0) return;
    updateData((prev) => {
      const already = prev.expenses.filter((e) => e.date === currentDate);
      if (already.length > 0) return prev;
      const copied = prevExps.map((e) => ({ ...e, id: genId(), date: currentDate }));
      return { ...prev, expenses: [...prev.expenses, ...copied] };
    });
    setCopiedFromPrev(true);
    setTimeout(() => setCopiedFromPrev(false), 3000);
  }, [currentDate]);

  // 資産管理からの月額参照（投資カテゴリのデフォルト値）
  const investDefaults = {
    "NISA積立": data.assets.nisa?.monthlyContribution || 0,
    "iDeCo":   data.assets.ideco?.monthlyContribution || 0,
    "変額年金": (data.assets.variableAnnuities || []).reduce((a, v) => a + (v.monthlyPremium || 0), 0),
  };
  const [saved, setSaved] = useState(false);

  const dayExps = data.expenses.filter((e) => e.date === currentDate);
  const catTotal = (name) => dayExps.filter((e) => e.category === name).reduce((a, e) => a + e.amount, 0);

  const handleCatTap = (name) => {
    if (selectedCat === name) { setSelectedCat(null); return; }
    setSelectedCat(name);
    // 投資カテゴリで未入力の場合は資産管理の月額をデフォルト表示
    const existing = catTotal(name);
    setInputVal(existing > 0 ? existing : (investDefaults[name] || 0));
  };

  const saveAmount = () => {
    const newAmount = Number(inputVal) || 0;
    updateData((prev) => {
      const filtered = prev.expenses.filter((e) => !(e.date === currentDate && e.category === selectedCat));
      const next = newAmount > 0
        ? [...filtered, { id: genId(), date: currentDate, category: selectedCat, amount: newAmount, memo: "" }]
        : filtered;
      return { ...prev, expenses: next };
    });
    setSelectedCat(null);
    setSaved(true);
    setTimeout(() => setSaved(false), 1200);
  };

  const goDay = (delta) => {
    setSelectedCat(null);
    setCurrentDate((prev) => addDays(prev, delta));
  };

  const dayTotal = dayExps.reduce((a, e) => a + e.amount, 0);

  return (
    <div>
      {/* ヘッダー */}
      <div style={{ display: "flex", alignItems: "center", padding: "4px 16px 8px", gap: 4 }}>
        <button onClick={onBack} style={{
          background: "none", border: "none", fontSize: 14, cursor: "pointer",
          color: colors.textLight, padding: "6px 8px", borderRadius: 8,
          display: "flex", alignItems: "center", gap: 4,
        }}>
          ← 一覧
        </button>
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <button onClick={() => goDay(-1)} style={{
            background: "none", border: "1.5px solid #DDD", borderRadius: 8,
            padding: "6px 14px", fontSize: 18, cursor: "pointer", color: colors.text, lineHeight: 1,
          }}>‹</button>
          <span style={{ fontSize: 15, fontWeight: 700, color: colors.text, minWidth: 130, textAlign: "center" }}>{dateLabel}</span>
          <button onClick={() => goDay(1)} style={{
            background: "none", border: "1.5px solid #DDD", borderRadius: 8,
            padding: "6px 14px", fontSize: 18, cursor: "pointer", color: colors.text, lineHeight: 1,
          }}>›</button>
        </div>
        {saved && <span style={{ fontSize: 12, color: colors.income, fontWeight: 700 }}>✅</span>}
      </div>

      {/* 日合計バー */}
      {copiedFromPrev && (
        <div style={{ margin: "0 16px 8px", padding: "8px 14px", backgroundColor: "#E8F5E9", border: "1.5px solid #4CAF50", borderRadius: 10, fontSize: 12, color: "#2E7D32", fontWeight: 600 }}>
          📋 前月27日の支払内容を自動コピーしました。金額を確認してください。
        </div>
      )}
      <div style={{ padding: "0 16px 10px" }}>
        <div style={{
          backgroundColor: "#FFF5F5", border: `1.5px solid ${colors.expense}`, borderRadius: 12,
          padding: "10px 16px", display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <span style={{ fontSize: 13, color: colors.textLight }}>この日の合計</span>
          <span style={{ fontSize: 20, fontWeight: 800, color: colors.expense }}>-{fmtYen(dayTotal)}</span>
        </div>
      </div>

      {/* カテゴリ一覧 */}
      <div style={{ padding: "0 16px" }}>
        {[...EXPENSE_CATS, ...(data.customCats || []).map((c) => ({ name: c.name, color: c.color, isFixed: false }))].map((cat) => {
          const total = catTotal(cat.name);
          const isOpen = selectedCat === cat.name;
          const defaultAmt = investDefaults[cat.name] || 0;
          const accentColor = cat.isInvest ? cat.color : colors.expense;
          return (
            <div key={cat.name} style={{ marginBottom: 3 }}>
              <div onClick={() => handleCatTap(cat.name)} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "13px 14px", borderRadius: isOpen ? "12px 12px 0 0" : 12,
                backgroundColor: isOpen ? (cat.isInvest ? "#F0F8FF" : "#FFF0F0") : colors.card,
                border: `1.5px solid ${isOpen ? accentColor : "transparent"}`,
                borderBottom: isOpen ? "none" : undefined,
                cursor: "pointer",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: cat.color, flexShrink: 0 }} />
                  <div>
                    <span style={{ fontSize: 15, fontWeight: 600, color: colors.text }}>{cat.name}</span>
                    {cat.isInvest && defaultAmt > 0 && total === 0 && (
                      <span style={{ fontSize: 10, color: cat.color, marginLeft: 6 }}>資産管理: {fmtYen(defaultAmt)}/月</span>
                    )}
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {total > 0 && (
                    <span style={{ fontSize: 15, fontWeight: 700, color: accentColor }}>-{fmtYen(total)}</span>
                  )}
                  <span style={{ fontSize: 14, color: colors.textLight }}>{isOpen ? "▲" : "▶"}</span>
                </div>
              </div>
              {isOpen && (
                <div style={{
                  backgroundColor: cat.isInvest ? "#F0F8FF" : "#FFF0F0",
                  borderRadius: "0 0 12px 12px",
                  padding: "12px 14px 14px",
                  border: `1.5px solid ${accentColor}`, borderTop: "none",
                }}>
                  <div style={{ fontSize: 12, color: colors.textLight, marginBottom: 8 }}>
                    金額を入力（0で削除）
                    {cat.isInvest && defaultAmt > 0 && (
                      <span style={{ color: cat.color, marginLeft: 6 }}>資産管理の月額: {fmtYen(defaultAmt)}</span>
                    )}
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <input
                      type="number" inputMode="numeric"
                      value={inputVal || ""}
                      onChange={(e) => setInputVal(parseNum(e.target.value))}
                      onKeyDown={(e) => { if (e.key === "Enter") { e.target.blur(); saveAmount(); } }}
                      placeholder="0"
                      autoFocus
                      style={{
                        flex: 1, padding: "10px 12px", fontSize: 18, fontWeight: 700,
                        border: `2px solid ${colors.expense}`, borderRadius: 10,
                        boxSizing: "border-box", backgroundColor: "#FFF", textAlign: "right",
                      }}
                    />
                    <button onClick={saveAmount} style={{
                      padding: "10px 20px", backgroundColor: colors.expense, color: "#fff",
                      border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer",
                    }}>保存</button>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* カスタムカテゴリ追加 */}
        {!showAddCat ? (
          <button onClick={() => setShowAddCat(true)} style={{
            width: "100%", marginTop: 6, padding: "12px 14px", borderRadius: 12,
            border: "1.5px dashed #BBB", backgroundColor: "transparent",
            fontSize: 14, color: colors.textLight, cursor: "pointer", textAlign: "left",
          }}>
            ＋ カテゴリを追加
          </button>
        ) : (
          <div style={{
            marginTop: 6, padding: "14px", borderRadius: 12,
            border: `1.5px solid ${colors.expense}`, backgroundColor: "#FFF5F5",
          }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: colors.expense, marginBottom: 10 }}>新しいカテゴリ名</div>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                type="text"
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && newCatName.trim()) {
                    const name = newCatName.trim();
                    const palette = ["#E91E63","#009688","#FF5722","#3F51B5","#795548","#607D8B","#FF9800"];
                    const color = palette[(data.customCats || []).length % palette.length];
                    updateData((prev) => ({ ...prev, customCats: [...(prev.customCats || []), { id: genId(), name, color }] }));
                    setNewCatName(""); setShowAddCat(false);
                  }
                }}
                placeholder="例：ペット費"
                autoFocus
                style={{
                  flex: 1, padding: "10px 12px", fontSize: 15,
                  border: `1.5px solid ${colors.expense}`, borderRadius: 10,
                  boxSizing: "border-box",
                }}
              />
              <button onClick={() => {
                const name = newCatName.trim();
                if (!name) return;
                const palette = ["#E91E63","#009688","#FF5722","#3F51B5","#795548","#607D8B","#FF9800"];
                const color = palette[(data.customCats || []).length % palette.length];
                updateData((prev) => ({ ...prev, customCats: [...(prev.customCats || []), { id: genId(), name, color }] }));
                setNewCatName(""); setShowAddCat(false);
              }} style={{
                padding: "10px 16px", backgroundColor: colors.expense, color: "#fff",
                border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer",
              }}>追加</button>
              <button onClick={() => { setNewCatName(""); setShowAddCat(false); }} style={{
                padding: "10px 14px", backgroundColor: "#EEE", color: colors.text,
                border: "none", borderRadius: 10, fontSize: 14, cursor: "pointer",
              }}>✕</button>
            </div>
          </div>
        )}
      </div>
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

  const isFixedCat = (cat) => EXPENSE_CATS.find((c) => c.name === cat)?.isFixed || false;
  const fixedTotal = monthExpenses.filter((e) => isFixedCat(e.category)).reduce((a, e) => a + e.amount, 0);
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
  const [editingLoanId, setEditingLoanId] = useState(null);

  const tabs = ["一覧", "登録", "返済表", "繰上シミュ"];

  return (
    <div>
      <PageTitle title="🏦 ローン・返済" />
      <div style={{ display: "flex", gap: 8, padding: "0 16px 12px", overflowX: "auto" }}>
        {tabs.map((t) => (
          <button key={t} onClick={() => { setSubtab(t); if (t !== "登録") setEditingLoanId(null); }} style={{
            flex: "0 0 auto", padding: "8px 16px",
            backgroundColor: subtab === t ? colors.loan : "#EEE",
            color: subtab === t ? "#fff" : colors.text,
            border: "none", borderRadius: 20, fontSize: 13, fontWeight: 600, cursor: "pointer",
          }}>{t}</button>
        ))}
      </div>
      <div style={{ padding: "0 16px" }}>
        {subtab === "一覧"       && <LoanList     data={data} updateData={updateData} setSubtab={setSubtab} setSelectedLoan={setSelectedLoan} setEditingLoanId={setEditingLoanId} />}
        {subtab === "登録"       && <LoanForm     data={data} updateData={updateData} setSubtab={setSubtab} editingLoanId={editingLoanId} setEditingLoanId={setEditingLoanId} />}
        {subtab === "返済表"     && <LoanSchedule data={data} selectedLoan={selectedLoan} setSelectedLoan={setSelectedLoan} />}
        {subtab === "繰上シミュ" && <LoanPrepay   data={data} selectedLoan={selectedLoan} setSelectedLoan={setSelectedLoan} />}
      </div>
    </div>
  );
}

// ローン一覧
function LoanList({ data, updateData, setSubtab, setSelectedLoan, setEditingLoanId }) {
  const totalBalance = data.loans.reduce((a, l) => a + l.remainingBalance, 0);
  const totalMonthly = data.loans.reduce((a, l) => a + l.monthlyPayment, 0);

  // n年後の残高を計算（元利均等返済）
  const balanceAfterMonths = (loan, months) => {
    const monthlyRate = loan.interestRate / 100 / 12;
    let bal = loan.remainingBalance;
    const payment = loan.monthlyPayment;
    for (let i = 0; i < months && bal > 0; i++) {
      if (monthlyRate > 0) {
        const interest = Math.round(bal * monthlyRate);
        bal = Math.max(0, bal - (payment - interest));
      } else {
        bal = Math.max(0, bal - payment);
      }
    }
    return bal;
  };

  const total5y  = data.loans.reduce((a, l) => a + balanceAfterMonths(l, 60),  0);
  const total10y = data.loans.reduce((a, l) => a + balanceAfterMonths(l, 120), 0);

  const del = (id) => {
    if (window.confirm("このローンを削除しますか？")) {
      updateData((prev) => ({ ...prev, loans: prev.loans.filter((l) => l.id !== id) }));
    }
  };

  return (
    <div>
      {data.loans.length > 0 && (
        <>
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

          {/* 残高予測 */}
          <Card style={{ border: `1.5px solid ${colors.loan}` }}>
            <SectionHeader title="残高予測" color={colors.loan} />
            <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
              {[
                { label: "5年後", val: total5y },
                { label: "10年後", val: total10y },
              ].map(({ label, val }) => (
                <div key={label} style={{ flex: 1, backgroundColor: "#FEF3E2", borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
                  <div style={{ fontSize: 12, color: colors.textLight, marginBottom: 4 }}>{label}の残高合計</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: val > 0 ? colors.loan : colors.income }}>
                    {val > 0 ? fmtYen(val) : "完済"}
                  </div>
                  {val > 0 && (
                    <div style={{ fontSize: 11, color: colors.textLight, marginTop: 2 }}>
                      現在比 {Math.round(val / totalBalance * 100)}%
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* ローン別内訳 */}
            {data.loans.length > 1 && (
              <>
                <Divider />
                <div style={{ fontSize: 12, color: colors.textLight, marginBottom: 6 }}>ローン別内訳</div>
                {data.loans.map((loan) => {
                  const b5  = balanceAfterMonths(loan, 60);
                  const b10 = balanceAfterMonths(loan, 120);
                  return (
                    <div key={loan.id} style={{ marginBottom: 8 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>
                        {LOAN_TYPE_ICON[loan.type]} {loan.name}
                      </div>
                      <div style={{ display: "flex", gap: 8 }}>
                        <div style={{ flex: 1, backgroundColor: "#FFF8F0", borderRadius: 8, padding: "6px 10px", textAlign: "center" }}>
                          <div style={{ fontSize: 10, color: colors.textLight }}>5年後</div>
                          <div style={{ fontSize: 13, fontWeight: 700, color: b5 > 0 ? colors.loan : colors.income }}>
                            {b5 > 0 ? fmtYen(b5) : "完済"}
                          </div>
                        </div>
                        <div style={{ flex: 1, backgroundColor: "#FFF8F0", borderRadius: 8, padding: "6px 10px", textAlign: "center" }}>
                          <div style={{ fontSize: 10, color: colors.textLight }}>10年後</div>
                          <div style={{ fontSize: 13, fontWeight: 700, color: b10 > 0 ? colors.loan : colors.income }}>
                            {b10 > 0 ? fmtYen(b10) : "完済"}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </Card>
        </>
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
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => { setEditingLoanId(loan.id); setSubtab("登録"); }}
                  style={{ background: "none", border: "none", color: colors.saving, cursor: "pointer", fontSize: 16 }}>✏️</button>
                <button onClick={() => del(loan.id)}
                  style={{ background: "none", border: "none", color: colors.expense, cursor: "pointer", fontSize: 16 }}>🗑</button>
              </div>
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

// ローン登録・編集フォーム（editingLoanId があれば編集モード）
function LoanForm({ data, updateData, setSubtab, editingLoanId, setEditingLoanId }) {
  const editTarget = editingLoanId ? data.loans.find((l) => l.id === editingLoanId) : null;
  const isEdit = !!editTarget;

  const [form, setForm] = useState(editTarget ? { ...editTarget } : {
    type: "car", name: "", totalAmount: 0, remainingBalance: 0,
    monthlyPayment: 0, interestRate: 0, startDate: "", endDate: "", memo: "",
  });
  const [saved, setSaved] = useState(false);

  // 編集対象が切り替わったらフォームを再初期化
  useEffect(() => {
    if (editTarget) setForm({ ...editTarget });
  }, [editingLoanId]);

  const save = () => {
    if (!form.name || !form.remainingBalance) return;
    if (isEdit) {
      updateData((prev) => ({
        ...prev,
        loans: prev.loans.map((l) => l.id === editingLoanId ? { ...l, ...form } : l),
      }));
    } else {
      updateData((prev) => ({ ...prev, loans: [...prev.loans, { ...form, id: genId(), payments: [] }] }));
    }
    setSaved(true);
    setTimeout(() => { setSaved(false); setEditingLoanId(null); setSubtab("一覧"); }, 1000);
  };

  const F = (field) => (v) => setForm((f) => ({ ...f, [field]: v }));

  return (
    <Card>
      <SectionHeader title={isEdit ? `✏️ ${form.name} を編集` : "ローン登録"} color={colors.loan} />
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
      <div style={{ display: "flex", gap: 8 }}>
        <PrimaryButton onClick={save} color={saved ? colors.neutral : colors.loan} style={{ flex: 1 }}>
          {saved ? "✅ 保存しました" : isEdit ? "変更を保存する" : "登録する"}
        </PrimaryButton>
        {isEdit && (
          <OutlineButton onClick={() => { setEditingLoanId(null); setSubtab("一覧"); }} color={colors.neutral} style={{ flex: 1 }}>
            キャンセル
          </OutlineButton>
        )}
      </div>
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

const ASSET_SUBTABS = ["銀行・現金", "NISA", "iDeCo", "変額年金", "総資産"];

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
            border: t === "総資産" ? `2px solid ${colors.asset}` : "2px solid transparent",
            borderRadius: 20, fontSize: 12,
            fontWeight: t === "総資産" ? 800 : 600,
            cursor: "pointer",
          }}>{t}</button>
        ))}
      </div>
      <div style={{ padding: "0 16px" }}>
        {subtab === "銀行・現金" && <BankTab     data={data} updateData={updateData} />}
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
  const [editingId, setEditingId] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const blankBank = () => ({ name: "", balance: 0, type: "普通", memo: "" });
  const [form, setForm] = useState(blankBank());

  const accounts = data.assets.bankAccounts || [];
  const total = accounts.reduce((a, b) => a + b.balance, 0);

  const resetForm = () => { setForm(blankBank()); setEditingId(null); setShowAdd(false); };

  const save = () => {
    if (!form.name) return;
    if (editingId) {
      updateData((prev) => ({
        ...prev, assets: { ...prev.assets, bankAccounts: prev.assets.bankAccounts.map((a) => a.id === editingId ? { ...a, ...form } : a) }
      }));
    } else {
      updateData((prev) => ({
        ...prev, assets: { ...prev.assets, bankAccounts: [...(prev.assets.bankAccounts || []), { ...form, id: genId() }] }
      }));
    }
    resetForm();
  };

  const del = (id) => updateData((prev) => ({
    ...prev, assets: { ...prev.assets, bankAccounts: prev.assets.bankAccounts.filter((a) => a.id !== id) }
  }));

  const startEdit = (acc) => {
    setForm({ name: acc.name, balance: acc.balance, type: acc.type, memo: acc.memo || "" });
    setEditingId(acc.id);
    setShowAdd(true);
  };

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
              {acc.memo ? <div style={{ fontSize: 11, color: colors.textLight, marginTop: 4 }}>{acc.memo}</div> : null}
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: colors.asset }}>{fmtYen(acc.balance)}</div>
              <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 6 }}>
                <button onClick={() => startEdit(acc)} style={{ background: "none", border: "none", color: colors.saving, cursor: "pointer", fontSize: 16 }}>✏️</button>
                <button onClick={() => del(acc.id)} style={{ background: "none", border: "none", color: colors.expense, cursor: "pointer", fontSize: 16 }}>🗑</button>
              </div>
            </div>
          </div>
        </Card>
      ))}
      {showAdd ? (
        <Card>
          <SectionHeader title={editingId ? "口座を編集" : "口座を追加"} color={colors.asset} />
          <TextInput label="銀行名・口座名" value={form.name} onChange={(v) => setForm((f) => ({ ...f, name: v }))} placeholder="例: 三菱UFJ 普通" />
          <AmountInput label="残高" value={form.balance} onChange={(v) => setForm((f) => ({ ...f, balance: v }))} />
          <SelectInput label="種別" value={form.type} onChange={(v) => setForm((f) => ({ ...f, type: v }))} options={["普通", "定期", "積立", "MMF", "その他"]} />
          <TextInput label="メモ（任意）" value={form.memo} onChange={(v) => setForm((f) => ({ ...f, memo: v }))} placeholder="メモ" />
          <div style={{ display: "flex", gap: 8 }}>
            <PrimaryButton onClick={save} color={colors.asset} style={{ flex: 1 }}>{editingId ? "保存" : "追加"}</PrimaryButton>
            <OutlineButton onClick={resetForm} color={colors.neutral} style={{ flex: 1 }}>キャンセル</OutlineButton>
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

// NISA管理（投信登録・枠管理・総資産連携）
function NisaTab({ data, updateData }) {
  const nisa = data.assets.nisa || {};
  const year = nisa.year || new Date().getFullYear();
  const LIMITS = { tsumitate: 1200000, growth: 2400000, lifetime: 18000000 };
  const investments = nisa.investments || [];

  const [showAdd, setShowAdd] = useState(false);
  const [editingInvestId, setEditingInvestId] = useState(null);
  const [form, setForm] = useState({
    name: "", nisaType: "つみたて", purchasePrice: 0, quantity: 0, currentPrice: 0, memo: "",
  });

  // 枠使用額：登録銘柄の取得額合計から自動計算
  const tsumitateUsed = investments
    .filter((i) => i.nisaType === "つみたて")
    .reduce((a, i) => a + i.purchasePrice * i.quantity, 0);
  const growthUsed = investments
    .filter((i) => i.nisaType === "成長")
    .reduce((a, i) => a + i.purchasePrice * i.quantity, 0);
  const lifetimeUsed = tsumitateUsed + growthUsed;

  // 評価額合計
  const totalValue = investments.reduce((a, i) => a + i.currentPrice * i.quantity, 0);
  const totalCost  = investments.reduce((a, i) => a + i.purchasePrice * i.quantity, 0);
  const totalPnl   = totalValue - totalCost;

  const updateNisa = (obj) => updateData((prev) => ({
    ...prev, assets: { ...prev.assets, nisa: { ...prev.assets.nisa, ...obj } }
  }));

  const resetForm = () => {
    setForm({ name: "", nisaType: "つみたて", purchasePrice: 0, quantity: 0, currentPrice: 0, memo: "" });
    setEditingInvestId(null);
    setShowAdd(false);
  };

  const addInvestment = () => {
    if (!form.name) return;
    if (editingInvestId) {
      updateNisa({ investments: investments.map((i) => i.id === editingInvestId ? { ...i, ...form } : i) });
    } else {
      updateNisa({ investments: [...investments, { ...form, id: genId() }] });
    }
    resetForm();
  };

  const startEdit = (inv) => {
    setForm({ name: inv.name, nisaType: inv.nisaType, purchasePrice: inv.purchasePrice, quantity: inv.quantity, currentPrice: inv.currentPrice, memo: inv.memo || "" });
    setEditingInvestId(inv.id);
    setShowAdd(true);
  };

  const delInvestment = (id) => updateNisa({ investments: investments.filter((i) => i.id !== id) });

  const F = (field) => (v) => setForm((f) => ({ ...f, [field]: v }));

  const sections = [
    { label: "つみたて投資枠", used: tsumitateUsed, limit: LIMITS.tsumitate, color: colors.income },
    { label: "成長投資枠",     used: growthUsed,    limit: LIMITS.growth,    color: colors.saving },
    { label: "生涯非課税枠",   used: lifetimeUsed,  limit: LIMITS.lifetime,  color: colors.asset },
  ];

  return (
    <div>
      {/* 枠管理カード */}
      <Card style={{ backgroundColor: "#F0FFF4", border: `2px solid ${colors.income}` }}>
        <SectionHeader title={`${year}年 NISA枠管理`} color={colors.income} />
        <div style={{ fontSize: 12, color: colors.textLight, marginBottom: 12 }}>
          ※ 枠使用額は登録銘柄の取得額から自動計算。生涯枠はつみたて＋成長の合計です。
        </div>
        {sections.map(({ label, used, limit, color }) => {
          const remaining = limit - used;
          return (
            <div key={label} style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color }}>{label}</span>
                <span style={{ fontSize: 12, color: colors.textLight }}>上限: {fmtYen(limit)}</span>
              </div>
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
      </Card>

      {/* 月額積立設定 */}
      <Card>
        <SectionHeader title="月額積立設定" color={colors.income} />
        <AmountInput
          label="NISA月額積立額"
          value={nisa.monthlyContribution || 0}
          onChange={(v) => updateNisa({ monthlyContribution: v })}
        />
        <div style={{ fontSize: 11, color: colors.textLight }}>将来資産予測（ホーム画面）に反映されます</div>
      </Card>

      {/* 保有銘柄サマリー */}
      {investments.length > 0 && (
        <Card>
          <SectionHeader title="保有銘柄 評価サマリー" color={colors.income} />
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            <span style={{ fontSize: 13, color: colors.textLight }}>評価額合計</span>
            <span style={{ fontSize: 22, fontWeight: 800, color: colors.income }}>{fmtYen(totalValue)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            <span style={{ fontSize: 13, color: colors.textLight }}>取得額合計</span>
            <span style={{ fontSize: 14, fontWeight: 600 }}>{fmtYen(totalCost)}</span>
          </div>
          <Divider />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: 14, fontWeight: 700 }}>含み損益</span>
            <span style={{ fontSize: 18, fontWeight: 800, color: totalPnl >= 0 ? colors.income : colors.expense }}>
              {totalPnl >= 0 ? "+" : ""}{fmtYen(totalPnl)}
              <span style={{ fontSize: 12, marginLeft: 4 }}>
                ({totalCost > 0 ? (totalPnl / totalCost * 100).toFixed(1) : 0}%)
              </span>
            </span>
          </div>
        </Card>
      )}

      {/* 保有銘柄一覧 */}
      {investments.map((inv) => {
        const value = inv.currentPrice * inv.quantity;
        const cost  = inv.purchasePrice * inv.quantity;
        const pnl   = value - cost;
        const pct   = cost > 0 ? (pnl / cost * 100).toFixed(1) : 0;
        return (
          <Card key={inv.id}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700 }}>{inv.name}</div>
                <Badge
                  label={inv.nisaType === "つみたて" ? "つみたて投資枠" : "成長投資枠"}
                  bgColor={inv.nisaType === "つみたて" ? colors.income : colors.saving}
                  style={{ marginTop: 4 }}
                />
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                <button onClick={() => startEdit(inv)}
                  style={{ background: "none", border: "none", color: colors.saving, cursor: "pointer", fontSize: 18 }}>✏️</button>
                <button onClick={() => delInvestment(inv.id)}
                  style={{ background: "none", border: "none", color: colors.expense, cursor: "pointer", fontSize: 18 }}>🗑</button>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
              <span style={{ fontSize: 13, color: colors.textLight }}>評価額</span>
              <span style={{ fontSize: 18, fontWeight: 700, color: colors.income }}>{fmtYen(value)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 12, color: colors.textLight }}>
                取得単価 {fmtYen(inv.purchasePrice)} × {fmt(inv.quantity)}口
              </span>
              <span style={{ fontSize: 14, fontWeight: 700, color: pnl >= 0 ? colors.income : colors.expense }}>
                {pnl >= 0 ? "+" : ""}{fmtYen(pnl)} ({pct}%)
              </span>
            </div>
            {inv.memo ? <div style={{ fontSize: 12, color: colors.textLight, marginTop: 4 }}>{inv.memo}</div> : null}
          </Card>
        );
      })}

      {/* 銘柄追加フォーム */}
      {showAdd ? (
        <Card>
          <SectionHeader title={editingInvestId ? "銘柄を編集" : "銘柄を追加"} color={colors.income} />
          <TextInput label="ファンド名" value={form.name} onChange={F("name")} placeholder="例: eMAXIS Slim 全世界株式" />
          <SelectInput label="NISA枠の種類" value={form.nisaType} onChange={F("nisaType")}
            options={["つみたて", "成長"]} />
          <AmountInput label="取得単価（1口あたり）" value={form.purchasePrice} onChange={F("purchasePrice")} />
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 12, color: colors.textLight, display: "block", marginBottom: 4 }}>保有口数</label>
            <input type="number" inputMode="numeric" value={form.quantity || ""}
              onChange={(e) => F("quantity")(parseNum(e.target.value))}
              style={{ width: "100%", padding: 12, fontSize: 16, border: "1.5px solid #E0E0E0", borderRadius: 10, boxSizing: "border-box", backgroundColor: "#FAFAFA" }} />
          </div>
          <AmountInput label="現在の基準価額（1口あたり）" value={form.currentPrice} onChange={F("currentPrice")} />
          <TextInput label="メモ（任意）" value={form.memo} onChange={F("memo")} placeholder="メモ" />
          <div style={{ display: "flex", gap: 8 }}>
            <PrimaryButton onClick={addInvestment} color={colors.income} style={{ flex: 1 }}>{editingInvestId ? "保存" : "追加"}</PrimaryButton>
            <OutlineButton onClick={resetForm} color={colors.neutral} style={{ flex: 1 }}>キャンセル</OutlineButton>
          </div>
        </Card>
      ) : (
        <PrimaryButton onClick={() => setShowAdd(true)} color={colors.income}>＋ 銘柄を追加</PrimaryButton>
      )}
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
  const [editingId, setEditingId] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const annuities = data.assets.variableAnnuities || [];

  const blankAnnuity = () => ({
    name: "", contractDate: "", monthlyPremium: 0, totalPremium: 0,
    currentValue: 0, maturityDate: "", maturityAmount: 0, deathBenefit: 0, memo: "",
  });
  const [form, setForm] = useState(blankAnnuity());
  const F = (field) => (v) => setForm((f) => ({ ...f, [field]: v }));

  const resetForm = () => { setForm(blankAnnuity()); setEditingId(null); setShowAdd(false); };

  const save = () => {
    if (!form.name) return;
    if (editingId) {
      updateData((prev) => ({
        ...prev, assets: { ...prev.assets, variableAnnuities: prev.assets.variableAnnuities.map((a) => a.id === editingId ? { ...a, ...form } : a) }
      }));
    } else {
      updateData((prev) => ({
        ...prev, assets: { ...prev.assets, variableAnnuities: [...(prev.assets.variableAnnuities || []), { ...form, id: genId() }] }
      }));
    }
    resetForm();
  };

  const del = (id) => updateData((prev) => ({
    ...prev, assets: { ...prev.assets, variableAnnuities: prev.assets.variableAnnuities.filter((a) => a.id !== id) }
  }));

  const startEdit = (ann) => {
    setForm({ name: ann.name, contractDate: ann.contractDate || "", monthlyPremium: ann.monthlyPremium || 0,
      totalPremium: ann.totalPremium || 0, currentValue: ann.currentValue || 0,
      maturityDate: ann.maturityDate || "", maturityAmount: ann.maturityAmount || 0,
      deathBenefit: ann.deathBenefit || 0, memo: ann.memo || "" });
    setEditingId(ann.id);
    setShowAdd(true);
  };

  return (
    <div>
      {annuities.map((ann) => {
        const pnl = ann.currentValue - ann.totalPremium;
        const pct = ann.totalPremium > 0 ? (pnl / ann.totalPremium * 100).toFixed(2) : 0;
        return (
          <Card key={ann.id}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
              <div style={{ fontSize: 15, fontWeight: 700, flex: 1 }}>{ann.name}</div>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => startEdit(ann)} style={{ background: "none", border: "none", color: colors.saving, cursor: "pointer", fontSize: 16 }}>✏️</button>
                <button onClick={() => del(ann.id)} style={{ background: "none", border: "none", color: colors.expense, cursor: "pointer", fontSize: 16 }}>🗑</button>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontSize: 13, color: colors.textLight }}>現在評価額</span>
              <span style={{ fontSize: 20, fontWeight: 800, color: colors.asset }}>{fmtYen(ann.currentValue)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontSize: 13, color: colors.textLight }}>払込保険料</span>
              <span style={{ fontSize: 14 }}>{fmtYen(ann.totalPremium)}</span>
            </div>
            {ann.monthlyPremium > 0 && (
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 13, color: colors.textLight }}>月額保険料</span>
                <span style={{ fontSize: 14 }}>{fmtYen(ann.monthlyPremium)}</span>
              </div>
            )}
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
          <SectionHeader title={editingId ? "変額年金を編集" : "変額年金保険を追加"} color={colors.asset} />
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
            <PrimaryButton onClick={save} color={colors.asset} style={{ flex: 1 }}>{editingId ? "保存" : "追加"}</PrimaryButton>
            <OutlineButton onClick={resetForm} color={colors.neutral} style={{ flex: 1 }}>キャンセル</OutlineButton>
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
  const nisaInvest    = (data.assets.nisa?.investments || []).reduce((a, i) => a + i.currentPrice * i.quantity, 0);
  const idecoVal      = data.assets.ideco?.currentValue || 0;
  const annuityVal    = (data.assets.variableAnnuities || []).reduce((a, v) => a + v.currentValue, 0);
  const totalAsset    = bankTotal + nisaInvest + idecoVal + annuityVal;
  const totalLoan     = (data.loans || []).reduce((a, l) => a + l.remainingBalance, 0);
  const netWorth      = totalAsset - totalLoan;

  const pieData = [
    { name: "現金・預金", value: bankTotal, color: colors.saving },
    { name: "NISA投資", value: nisaInvest, color: colors.income },
    { name: "iDeCo", value: idecoVal, color: "#F39C12" },
    { name: "変額年金", value: annuityVal, color: colors.asset },
  ].filter((d) => d.value > 0);

  return (
    <div>
      <Card>
        <SectionHeader title="純資産（ネットワース）" color={colors.asset} />
        {[
          { label: "現金・預金", val: bankTotal, color: colors.saving },
          { label: "NISA投資", val: nisaInvest, color: colors.income },
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

// ===== フェーズ12・13: シミュレーションタブ =====

const SIM_SUBTABS = ["将来資産", "ローン完済後", "老後資金", "FIRE試算"];

function SimulationTab({ data, updateData }) {
  const [subtab, setSubtab] = useState("将来資産");

  return (
    <div>
      <PageTitle title="🔮 シミュレーション" />
      <div style={{ display: "flex", gap: 6, padding: "0 16px 12px", overflowX: "auto" }}>
        {SIM_SUBTABS.map((t) => (
          <button key={t} onClick={() => setSubtab(t)} style={{
            flex: "0 0 auto", padding: "8px 12px",
            backgroundColor: subtab === t ? colors.saving : "#EEE",
            color: subtab === t ? "#fff" : colors.text,
            border: "none", borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: "pointer",
          }}>{t}</button>
        ))}
      </div>
      <div style={{ padding: "0 16px" }}>
        {subtab === "将来資産"   && <FutureAssetSim data={data} />}
        {subtab === "ローン完済後" && <AfterLoanSim  data={data} />}
        {subtab === "老後資金"   && <RetirementSim data={data} />}
        {subtab === "FIRE試算"   && <FireSim       data={data} />}
      </div>
    </div>
  );
}

// 将来資産シミュレーター
function FutureAssetSim({ data }) {
  const totalAsset = (() => {
    const b = (data.assets.bankAccounts || []).reduce((a, x) => a + x.balance, 0);
    const i = (data.assets.nisa?.investments || []).reduce((a, x) => a + x.currentPrice * x.quantity, 0);
    return b + i + (data.assets.ideco?.currentValue || 0);
  })();

  const [currentAsset, setCurrentAsset] = useState(totalAsset || 0);
  const [monthly, setMonthly] = useState(50000);
  const [rate, setRate] = useState(5);
  const [years, setYears] = useState(20);

  const calcFuture = (asset, mon, annualRate, yrs) => {
    const r = annualRate / 100 / 12;
    let bal = asset;
    for (let i = 0; i < yrs * 12; i++) {
      bal = bal * (1 + r) + mon;
    }
    return Math.round(bal);
  };

  const futureTotal = calcFuture(currentAsset, monthly, rate, years);
  const principal = currentAsset + monthly * 12 * years;
  const gains = futureTotal - principal;

  // グラフデータ
  const chartData = Array.from({ length: years + 1 }, (_, i) => {
    const total = calcFuture(currentAsset, monthly, rate, i);
    const princ = currentAsset + monthly * 12 * i;
    return { year: `${i}年`, 元本: princ, 運用益: Math.max(0, total - princ), 合計: total };
  });

  // 利率別比較表
  const rateTable = [1, 3, 5, 7].map((r) => ({
    rate: r,
    y10: calcFuture(currentAsset, monthly, r, 10),
    y20: calcFuture(currentAsset, monthly, r, 20),
    y30: calcFuture(currentAsset, monthly, r, 30),
  }));

  return (
    <div>
      <Card>
        <SectionHeader title="将来資産シミュレーター" color={colors.saving} />
        <AmountInput label="現在の資産" value={currentAsset} onChange={setCurrentAsset} />
        <AmountInput label="月々の積立額" value={monthly} onChange={setMonthly} />
        <div style={{ marginBottom: 12 }}>
          <label style={{ fontSize: 12, color: colors.textLight, display: "block", marginBottom: 4 }}>年間運用利率: {rate}%</label>
          <input type="range" min={0} max={10} step={0.5} value={rate} onChange={(e) => setRate(Number(e.target.value))}
            style={{ width: "100%", accentColor: colors.saving }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 12, color: colors.textLight, display: "block", marginBottom: 4 }}>積立期間: {years}年</label>
          <input type="range" min={1} max={40} value={years} onChange={(e) => setYears(Number(e.target.value))}
            style={{ width: "100%", accentColor: colors.saving }} />
        </div>
        <div style={{ backgroundColor: "#EBF5FB", borderRadius: 12, padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 13, color: colors.textLight, marginBottom: 4 }}>{years}年後の資産予測</div>
          <div style={{ fontSize: 32, fontWeight: 800, color: colors.saving }}>{fmtYen(futureTotal)}</div>
          <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 8 }}>
            <div>
              <div style={{ fontSize: 11, color: colors.textLight }}>元本</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: colors.text }}>{fmtYen(principal)}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: colors.textLight }}>運用益</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: colors.income }}>+{fmtYen(gains)}</div>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <SectionHeader title="資産推移グラフ" />
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#EEE" />
            <XAxis dataKey="year" tick={{ fontSize: 10 }} interval={Math.floor(years / 5)} />
            <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => `${Math.round(v / 10000)}万`} />
            <Tooltip formatter={(v) => fmtYen(v)} />
            <Area type="monotone" dataKey="元本"  stackId="1" stroke={colors.saving} fill="#D6EAF8" />
            <Area type="monotone" dataKey="運用益" stackId="1" stroke={colors.income} fill="#D5F5E3" />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      <Card>
        <SectionHeader title="利率別比較表" />
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
            <thead>
              <tr style={{ backgroundColor: "#F5F5F5" }}>
                {["利率", "10年後", "20年後", "30年後"].map((h) => (
                  <th key={h} style={{ padding: "8px 6px", textAlign: "right", color: colors.textLight }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rateTable.map((r) => (
                <tr key={r.rate} style={{ borderBottom: "1px solid #F0F0F0" }}>
                  <td style={{ padding: "8px 6px", fontWeight: 700, color: colors.saving }}>{r.rate}%</td>
                  <td style={{ padding: "8px 6px", textAlign: "right" }}>{Math.round(r.y10 / 10000)}万</td>
                  <td style={{ padding: "8px 6px", textAlign: "right" }}>{Math.round(r.y20 / 10000)}万</td>
                  <td style={{ padding: "8px 6px", textAlign: "right" }}>{Math.round(r.y30 / 10000)}万</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

// ローン完済後シミュレーター
function AfterLoanSim({ data }) {
  const [rate, setRate] = useState(5);

  const loans = [...data.loans].sort((a, b) => {
    const aMonths = a.monthlyPayment > 0 ? Math.ceil(a.remainingBalance / a.monthlyPayment) : 999;
    const bMonths = b.monthlyPayment > 0 ? Math.ceil(b.remainingBalance / b.monthlyPayment) : 999;
    return aMonths - bMonths;
  });

  const totalMonthly = loans.reduce((a, l) => a + l.monthlyPayment, 0);

  // 完済シナリオ
  const scenarios = loans.map((l) => ({
    name: `${LOAN_TYPE_ICON[l.type]} ${l.name}`,
    months: l.monthlyPayment > 0 ? Math.ceil(l.remainingBalance / l.monthlyPayment) : 0,
    monthlyPayment: l.monthlyPayment,
  }));

  // 完済後に積立回した場合の追加資産
  const calcAdditional = () => {
    const now = new Date();
    // 住宅ローン完済月（最長）を終点とする
    const maxMonths = scenarios.reduce((m, s) => Math.max(m, s.months), 0);
    let additionalAsset = 0;
    const r = rate / 100 / 12;

    scenarios.forEach((s) => {
      // 完済後の残り期間に積立
      const remaining = maxMonths - s.months;
      if (remaining > 0 && s.monthlyPayment > 0) {
        for (let i = 0; i < remaining; i++) {
          additionalAsset = additionalAsset * (1 + r) + s.monthlyPayment;
        }
      }
    });
    return Math.round(additionalAsset);
  };

  const additionalAsset = calcAdditional();

  return (
    <div>
      <Card>
        <SectionHeader title="現在のローン返済額" color={colors.loan} />
        <div style={{ fontSize: 24, fontWeight: 800, color: colors.loan, textAlign: "center", marginBottom: 12 }}>
          {fmtYen(totalMonthly)}<span style={{ fontSize: 14 }}>/月</span>
        </div>
        <Divider />
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>完済スケジュール</div>
        {scenarios.map((s) => {
          const years = Math.floor(s.months / 12);
          const months = s.months % 12;
          const completeDate = new Date();
          completeDate.setMonth(completeDate.getMonth() + s.months);
          return (
            <div key={s.name} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 13 }}>{s.name}</span>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: colors.income }}>
                  {completeDate.getFullYear()}年{completeDate.getMonth() + 1}月完済
                </div>
                <div style={{ fontSize: 11, color: colors.textLight }}>あと{years > 0 ? `${years}年` : ""}{months}ヶ月</div>
              </div>
            </div>
          );
        })}
      </Card>

      <Card>
        <SectionHeader title="完済後に積立に回したら？" color={colors.saving} />
        <div style={{ marginBottom: 12 }}>
          <label style={{ fontSize: 12, color: colors.textLight, display: "block", marginBottom: 4 }}>運用利率: {rate}%</label>
          <input type="range" min={0} max={10} step={0.5} value={rate} onChange={(e) => setRate(Number(e.target.value))}
            style={{ width: "100%", accentColor: colors.saving }} />
        </div>
        {scenarios.map((s) => (
          <div key={s.name} style={{ fontSize: 13, color: colors.textLight, marginBottom: 4 }}>
            {s.name}完済後: <strong style={{ color: colors.income }}>+{fmtYen(s.monthlyPayment)}/月</strong>を積立
          </div>
        ))}
        <Divider />
        <div style={{ backgroundColor: "#EBF5FB", borderRadius: 10, padding: 12, textAlign: "center" }}>
          <div style={{ fontSize: 12, color: colors.textLight }}>全ローン完済後の追加資産（概算）</div>
          <div style={{ fontSize: 28, fontWeight: 800, color: colors.saving }}>{fmtYen(additionalAsset)}</div>
        </div>
      </Card>
    </div>
  );
}

// 老後資金シミュレーター
function RetirementSim({ data }) {
  const [age, setAge] = useState(35);
  const [retireAge, setRetireAge] = useState(65);
  const [lifeAge, setLifeAge] = useState(90);
  const [pension, setPension] = useState(150000);
  const [severance, setSeverance] = useState(2000000);
  const [monthlyLiving, setMonthlyLiving] = useState(250000);

  const retireYears = retireAge - age;
  const lifeYears = lifeAge - retireAge;

  // 退職後の必要資金
  const annualExpense = monthlyLiving * 12;
  const annualPension = pension * 12;
  const annualShortfall = Math.max(0, annualExpense - annualPension);
  const totalNeeded = annualShortfall * lifeYears;

  // 現在の準備額
  const currentSavings = (() => {
    const b = (data.assets.bankAccounts || []).reduce((a, x) => a + x.balance, 0);
    const i = (data.assets.nisa?.investments || []).reduce((a, x) => a + x.currentPrice * x.quantity, 0);
    return b + i + (data.assets.ideco?.currentValue || 0) + severance;
  })();

  const shortfall = Math.max(0, totalNeeded - currentSavings);

  return (
    <div>
      <Card>
        <SectionHeader title="老後資金シミュレーター" color="#F39C12" />
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: 12, color: colors.textLight, display: "block", marginBottom: 4 }}>現在の年齢</label>
            <input type="number" inputMode="numeric" value={age} onChange={(e) => setAge(Number(e.target.value))}
              style={{ width: "100%", padding: 10, fontSize: 16, border: "1.5px solid #E0E0E0", borderRadius: 10, boxSizing: "border-box", backgroundColor: "#FAFAFA" }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: 12, color: colors.textLight, display: "block", marginBottom: 4 }}>退職予定年齢</label>
            <input type="number" inputMode="numeric" value={retireAge} onChange={(e) => setRetireAge(Number(e.target.value))}
              style={{ width: "100%", padding: 10, fontSize: 16, border: "1.5px solid #E0E0E0", borderRadius: 10, boxSizing: "border-box", backgroundColor: "#FAFAFA" }} />
          </div>
        </div>
        <div style={{ marginBottom: 12 }}>
          <label style={{ fontSize: 12, color: colors.textLight, display: "block", marginBottom: 4 }}>想定寿命: {lifeAge}歳</label>
          <input type="range" min={70} max={100} value={lifeAge} onChange={(e) => setLifeAge(Number(e.target.value))}
            style={{ width: "100%", accentColor: "#F39C12" }} />
        </div>
        <AmountInput label="年金受取予定額（月額）" value={pension} onChange={setPension} />
        <AmountInput label="退職金予定額" value={severance} onChange={setSeverance} />
        <div style={{ marginBottom: 12 }}>
          <label style={{ fontSize: 12, color: colors.textLight, display: "block", marginBottom: 4 }}>老後の月生活費: {fmtYen(monthlyLiving)}</label>
          <input type="range" min={100000} max={500000} step={10000} value={monthlyLiving} onChange={(e) => setMonthlyLiving(Number(e.target.value))}
            style={{ width: "100%", accentColor: "#F39C12" }} />
        </div>
      </Card>

      <Card style={{ backgroundColor: "#FEF9E7" }}>
        <SectionHeader title="シミュレーション結果" color="#F39C12" />
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontSize: 13, color: colors.textLight }}>退職後の期間</span>
          <span style={{ fontSize: 14, fontWeight: 600 }}>{lifeYears}年</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontSize: 13, color: colors.textLight }}>年間生活費</span>
          <span style={{ fontSize: 14, fontWeight: 600 }}>{fmtYen(annualExpense)}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontSize: 13, color: colors.textLight }}>年金収入</span>
          <span style={{ fontSize: 14, fontWeight: 600, color: colors.income }}>-{fmtYen(annualPension)}</span>
        </div>
        <Divider />
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontSize: 14, fontWeight: 700 }}>必要老後資金</span>
          <span style={{ fontSize: 22, fontWeight: 800, color: "#F39C12" }}>{fmtYen(totalNeeded)}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontSize: 14, fontWeight: 700 }}>現在の準備額</span>
          <span style={{ fontSize: 18, fontWeight: 700, color: colors.income }}>{fmtYen(currentSavings)}</span>
        </div>
        <Divider />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontSize: 15, fontWeight: 700 }}>{shortfall > 0 ? "不足額" : "余剰額"}</span>
          <span style={{ fontSize: 24, fontWeight: 800, color: shortfall > 0 ? colors.expense : colors.income }}>
            {shortfall > 0 ? "▲" : "+"}{fmtYen(shortfall > 0 ? shortfall : currentSavings - totalNeeded)}
          </span>
        </div>
      </Card>
    </div>
  );
}

// FIRE試算
function FireSim({ data }) {
  const totalAsset = (() => {
    const b = (data.assets.bankAccounts || []).reduce((a, x) => a + x.balance, 0);
    const i = (data.assets.nisa?.investments || []).reduce((a, x) => a + x.currentPrice * x.quantity, 0);
    return b + i + (data.assets.ideco?.currentValue || 0);
  })();

  const [currentAsset, setCurrentAsset] = useState(totalAsset || 0);
  const [monthlyLiving, setMonthlyLiving] = useState(250000);
  const [withdrawRate, setWithdrawRate] = useState(4);
  const [monthly, setMonthly] = useState(100000);
  const [rate, setRate] = useState(5);

  const annualLiving = monthlyLiving * 12;
  const fireTarget = Math.round(annualLiving / (withdrawRate / 100));

  // FIRE達成までの期間
  const calcFireYears = () => {
    const r = rate / 100 / 12;
    let bal = currentAsset;
    for (let m = 0; m <= 600; m++) {
      if (bal >= fireTarget) return { months: m, asset: bal };
      bal = bal * (1 + r) + monthly;
    }
    return { months: -1, asset: bal };
  };

  const fireResult = calcFireYears();
  const fireMonths = fireResult.months;
  const fireYears = Math.floor(fireMonths / 12);
  const fireRemainingMonths = fireMonths % 12;

  // グラフデータ
  const chartData = (() => {
    const r = rate / 100 / 12;
    let bal = currentAsset;
    const data = [];
    for (let y = 0; y <= Math.min(40, Math.ceil(fireMonths / 12) + 5); y++) {
      data.push({ year: `${y}年`, 資産: Math.round(bal), 目標: fireTarget });
      for (let m = 0; m < 12; m++) bal = bal * (1 + r) + monthly;
    }
    return data;
  })();

  return (
    <div>
      <Card>
        <SectionHeader title="🔥 FIRE試算" color={colors.expense} />
        <div style={{ fontSize: 12, color: colors.textLight, marginBottom: 12 }}>
          FIRE = 年間生活費 ÷ 取り崩し率（4%ルール）
        </div>
        <AmountInput label="現在の資産" value={currentAsset} onChange={setCurrentAsset} />
        <div style={{ marginBottom: 12 }}>
          <label style={{ fontSize: 12, color: colors.textLight, display: "block", marginBottom: 4 }}>月々の生活費: {fmtYen(monthlyLiving)}</label>
          <input type="range" min={100000} max={500000} step={10000} value={monthlyLiving} onChange={(e) => setMonthlyLiving(Number(e.target.value))}
            style={{ width: "100%", accentColor: colors.expense }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label style={{ fontSize: 12, color: colors.textLight, display: "block", marginBottom: 4 }}>年間取り崩し率: {withdrawRate}%</label>
          <input type="range" min={2} max={6} step={0.5} value={withdrawRate} onChange={(e) => setWithdrawRate(Number(e.target.value))}
            style={{ width: "100%", accentColor: colors.expense }} />
        </div>
        <AmountInput label="月々の積立額" value={monthly} onChange={setMonthly} />
        <div style={{ marginBottom: 12 }}>
          <label style={{ fontSize: 12, color: colors.textLight, display: "block", marginBottom: 4 }}>運用利率: {rate}%</label>
          <input type="range" min={0} max={10} step={0.5} value={rate} onChange={(e) => setRate(Number(e.target.value))}
            style={{ width: "100%", accentColor: colors.expense }} />
        </div>
      </Card>

      <Card style={{ backgroundColor: "#FFF5F5" }}>
        <SectionHeader title="FIRE達成シミュレーション" color={colors.expense} />
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontSize: 13, color: colors.textLight }}>年間生活費</span>
          <span style={{ fontSize: 14, fontWeight: 600 }}>{fmtYen(annualLiving)}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
          <span style={{ fontSize: 14, fontWeight: 700 }}>FIRE必要資産</span>
          <span style={{ fontSize: 22, fontWeight: 800, color: colors.expense }}>{fmtYen(fireTarget)}</span>
        </div>
        <ProgressBar value={currentAsset} max={fireTarget} color={colors.expense} />
        <div style={{ fontSize: 12, color: colors.textLight, textAlign: "right", marginTop: 4 }}>
          達成率 {fireTarget > 0 ? Math.round(currentAsset / fireTarget * 100) : 0}%
        </div>
        <Divider />
        {fireMonths >= 0 ? (
          <div style={{ textAlign: "center", padding: 12 }}>
            <div style={{ fontSize: 13, color: colors.textLight }}>FIRE達成まで</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: colors.expense }}>
              {fireYears > 0 ? `${fireYears}年` : ""}{fireRemainingMonths}ヶ月
            </div>
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: 12, color: colors.textLight, fontSize: 13 }}>
            現在の設定ではFIREが困難です。積立額・利率を見直してください。
          </div>
        )}
      </Card>

      {chartData.length > 0 && (
        <Card>
          <SectionHeader title="資産推移と目標ライン" />
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEE" />
              <XAxis dataKey="year" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => `${Math.round(v / 10000)}万`} />
              <Tooltip formatter={(v) => fmtYen(v)} />
              <Area type="monotone" dataKey="資産" stroke={colors.saving} fill="#D6EAF8" strokeWidth={2} />
              <Line type="monotone" dataKey="目標" stroke={colors.expense} strokeWidth={2} strokeDasharray="5 5" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      )}
    </div>
  );
}

// ===== フェーズ15: CSV出力・JSONバックアップ =====

function DataManagementPanel({ data, updateData }) {
  const exportCSV = () => {
    const header = "日付,カテゴリ,サブカテゴリ,金額,固定費,支払方法,メモ";
    const rows = data.expenses.map((e) =>
      `${e.date},${e.category},${e.subcategory || ""},${e.amount},${e.isFixed ? "固定費" : "変動費"},${e.paymentMethod || ""},${e.memo || ""}`
    );
    const csv = [header, ...rows].join("\n");
    const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `kakeibo_expenses_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportJSON = () => {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `kakeibo_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importJSON = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const imported = JSON.parse(ev.target.result);
        if (window.confirm("バックアップデータを復元しますか？現在のデータは上書きされます。")) {
          updateData(imported);
          alert("復元が完了しました。");
        }
      } catch {
        alert("JSONファイルの読み込みに失敗しました。");
      }
    };
    reader.readAsText(file);
  };

  const clearData = () => {
    if (window.confirm("全データを削除しますか？この操作は元に戻せません。")) {
      if (window.confirm("本当に削除しますか？（2回確認）")) {
        updateData({ ...initialState });
        localStorage.removeItem(STORAGE_KEY);
        alert("データを削除しました。");
      }
    }
  };

  return (
    <Card>
      <SectionHeader title="📁 データ管理" />
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <OutlineButton onClick={exportCSV} color={colors.income} style={{ width: "100%" }}>
          📊 支出データをCSVエクスポート
        </OutlineButton>
        <OutlineButton onClick={exportJSON} color={colors.saving} style={{ width: "100%" }}>
          💾 全データをJSONバックアップ
        </OutlineButton>
        <label style={{
          display: "block", padding: "10px 16px", textAlign: "center",
          border: `2px solid ${colors.loan}`, borderRadius: 10, color: colors.loan,
          fontSize: 14, fontWeight: 600, cursor: "pointer",
        }}>
          📂 JSONから復元
          <input type="file" accept=".json" onChange={importJSON} style={{ display: "none" }} />
        </label>
        <OutlineButton onClick={clearData} color={colors.expense} style={{ width: "100%" }}>
          🗑 全データを削除
        </OutlineButton>
      </div>
    </Card>
  );
}

// ===== 財務諸表タブ =====
function FinancialTab({ data }) {
  const [month, setMonth] = useState(currentYM());
  const [subtab, setSubtab] = useState("bs");

  // ---- 共通計算ヘルパー ----
  const getSalary = (ym) => data.salaries.find((s) => s.month === ym);
  const getMonthIncome = (ym) => {
    const s = getSalary(ym);
    if (!s) return 0;
    const gross = s.basicSalary + Object.values(s.allowances || {}).reduce((a, b) => a + b, 0);
    const ded   = Object.values(s.deductions || {}).reduce((a, b) => a + b, 0);
    return Math.max(0, gross - ded) + (s.bonus || 0) + (s.spouseIncome || 0) + (s.sideIncome || 0) + Object.values(s.businessIncome || {}).reduce((a,b)=>a+b,0) - Object.values(s.generalDeductions || {}).reduce((a,b)=>a+b,0);
  };
  const getMonthExpense = (ym) => data.expenses.filter((e) => e.date?.startsWith(ym)).reduce((a, e) => a + e.amount, 0);
  const isFixedCat = (cat) => EXPENSE_CATS.find((c) => c.name === cat)?.isFixed || false;
  const getFixedExpense = (ym) => data.expenses.filter((e) => e.date?.startsWith(ym) && isFixedCat(e.category)).reduce((a, e) => a + e.amount, 0);
  const getVarExpense = (ym) => getMonthExpense(ym) - getFixedExpense(ym);

  // ---- B/S 計算 ----
  const totalBank = (data.assets.bankAccounts || []).reduce((a, b) => a + (b.balance || 0), 0);
  const nisaVal = (data.assets.nisa?.investments || []).reduce((a, i) => a + (i.currentValue || 0), 0);
  const idecoVal = data.assets.ideco?.totalBalance || 0;
  const annuityVal = (data.assets.variableAnnuities || []).reduce((a, v) => a + (v.currentValue || 0), 0);
  const totalAsset = totalBank + nisaVal + idecoVal + annuityVal;
  const totalLiability = data.loans.reduce((a, l) => a + (l.remainingBalance || 0), 0);
  const netWorth = totalAsset - totalLiability;

  // ---- P/L 計算（選択月）----
  const income = getMonthIncome(month);
  const expense = getMonthExpense(month);
  const profit = income - expense;
  const fixedExp = getFixedExpense(month);
  const varExp = getVarExpense(month);

  // カテゴリ別支出（P/L詳細用）
  const catBreakdown = (() => {
    const map = {};
    data.expenses.filter((e) => e.date?.startsWith(month)).forEach((e) => {
      map[e.category] = (map[e.category] || 0) + e.amount;
    });
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  })();

  // ---- 損益分岐点（直近12ヶ月）----
  const bepRows = (() => {
    const rows = [];
    const now = new Date();
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const ym = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      const inc = getMonthIncome(ym);
      const fixed = getFixedExpense(ym);
      const variable = getVarExpense(ym);
      const total = fixed + variable;
      const varRate = inc > 0 ? variable / inc : 0;
      // 損益分岐点売上高 = 固定費 / (1 - 変動費率)
      const bep = varRate < 1 && inc > 0 ? Math.round(fixed / (1 - varRate)) : null;
      const margin = inc > 0 ? Math.round((profit / inc) * 100) : null;
      rows.push({ ym, label: `${d.getMonth() + 1}月`, inc, fixed, variable, total, bep, profit: inc - total });
    }
    return rows;
  })();

  // ---- BSダイアグラム（T字型）----
  const BSDiagram = () => {
    const assetItems = [
      { label: "銀行預金",   value: totalBank,    color: "#1565C0" },
      { label: "NISA",       value: nisaVal,       color: "#27AE60" },
      { label: "iDeCo",      value: idecoVal,      color: "#2980B9" },
      { label: "変額年金",   value: annuityVal,    color: "#8E44AD" },
    ].filter((i) => i.value > 0);
    const liabItems = data.loans.map((l) => ({
      label: l.name || "ローン",
      value: l.remainingBalance || 0,
      color: "#E74C3C",
    })).filter((i) => i.value > 0);

    const maxH = 220;
    const totalForScale = Math.max(totalAsset, totalLiability + Math.max(0, netWorth));

    const barSection = (items, total, baseColor) => {
      let offset = 0;
      return items.map((item, idx) => {
        const pct = totalForScale > 0 ? item.value / totalForScale : 0;
        const h = Math.max(pct * maxH, item.value > 0 ? 18 : 0);
        const y = offset;
        offset += h;
        return (
          <div key={idx} style={{
            height: h, backgroundColor: item.color, display: "flex", alignItems: "center",
            justifyContent: "center", flexDirection: "column", overflow: "hidden",
            borderBottom: "1px solid rgba(255,255,255,0.3)",
          }}>
            {h > 22 && <span style={{ fontSize: 10, color: "#fff", fontWeight: 700, textAlign: "center", padding: "0 4px" }}>{item.label}</span>}
            {h > 32 && <span style={{ fontSize: 9, color: "rgba(255,255,255,0.9)" }}>{fmtYen(item.value)}</span>}
          </div>
        );
      });
    };

    const netH = totalForScale > 0 ? Math.max((Math.max(0, netWorth) / totalForScale) * maxH, netWorth > 0 ? 20 : 0) : 0;
    const liabH = totalForScale > 0 ? (totalLiability / totalForScale) * maxH : 0;

    return (
      <div>
        <div style={{ display: "flex", gap: 2 }}>
          {/* 資産 */}
          <div style={{ flex: 1 }}>
            <div style={{ textAlign: "center", fontSize: 12, fontWeight: 700, color: "#1565C0", marginBottom: 4, padding: "4px 0", backgroundColor: "#E3F2FD", borderRadius: "6px 6px 0 0" }}>
              資産 {fmtYen(totalAsset)}
            </div>
            <div style={{ height: maxH, borderRadius: "0 0 6px 6px", overflow: "hidden", border: "1.5px solid #90CAF9", borderTop: "none" }}>
              {barSection(assetItems, totalAsset, "#1565C0")}
              {assetItems.length === 0 && (
                <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#999", fontSize: 12 }}>データなし</div>
              )}
            </div>
          </div>
          {/* 負債＋純資産 */}
          <div style={{ flex: 1 }}>
            <div style={{ textAlign: "center", fontSize: 12, fontWeight: 700, color: "#C62828", marginBottom: 4, padding: "4px 0", backgroundColor: "#FFEBEE", borderRadius: "6px 6px 0 0" }}>
              負債＋純資産 {fmtYen(totalLiability + Math.max(0, netWorth))}
            </div>
            <div style={{ height: maxH, borderRadius: "0 0 6px 6px", overflow: "hidden", border: "1.5px solid #EF9A9A", borderTop: "none", display: "flex", flexDirection: "column" }}>
              {barSection(liabItems, totalLiability, "#E74C3C")}
              {netWorth > 0 && (
                <div style={{
                  flex: 1, minHeight: netH, backgroundColor: "#4CAF50",
                  display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column",
                }}>
                  <span style={{ fontSize: 10, color: "#fff", fontWeight: 700 }}>純資産</span>
                  <span style={{ fontSize: 9, color: "rgba(255,255,255,0.9)" }}>{fmtYen(netWorth)}</span>
                </div>
              )}
              {liabItems.length === 0 && netWorth <= 0 && (
                <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "#999", fontSize: 12 }}>負債なし</div>
              )}
            </div>
          </div>
        </div>
        {/* 凡例 */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10 }}>
          {[
            { label: "銀行預金", color: "#1565C0" },
            { label: "NISA", color: "#27AE60" },
            { label: "iDeCo", color: "#2980B9" },
            { label: "変額年金", color: "#8E44AD" },
            { label: "ローン（負債）", color: "#E74C3C" },
            { label: "純資産", color: "#4CAF50" },
          ].map((l) => (
            <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, backgroundColor: l.color }} />
              <span style={{ fontSize: 11, color: colors.textLight }}>{l.label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ---- P/Lウォーターフォール図式 ----
  const PLDiagram = () => {
    const maxVal = Math.max(income, expense, 1);
    const incomeH  = Math.round((income  / maxVal) * 180);
    const fixedH   = Math.round((fixedExp  / maxVal) * 180);
    const varH     = Math.round((varExp    / maxVal) * 180);
    const profitH  = Math.max(Math.round((Math.abs(profit) / maxVal) * 180), profit !== 0 ? 20 : 4);
    const isProfit = profit >= 0;

    const Bar = ({ height, color, label, value, striped }) => (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
        <div style={{ fontSize: 10, color: colors.textLight, marginBottom: 2, textAlign: "center" }}>{fmtYen(value)}</div>
        <div style={{
          height, width: "100%", backgroundColor: color, borderRadius: "6px 6px 0 0",
          display: "flex", alignItems: "center", justifyContent: "center",
          backgroundImage: striped ? "repeating-linear-gradient(45deg, rgba(255,255,255,0.15) 0px, rgba(255,255,255,0.15) 4px, transparent 4px, transparent 8px)" : "none",
        }}>
          {height > 28 && <span style={{ fontSize: 10, color: "#fff", fontWeight: 700, writingMode: "vertical-rl", textOrientation: "mixed" }}>{label}</span>}
        </div>
        <div style={{ height: 3, width: "100%", backgroundColor: "#DDD" }} />
        <div style={{ fontSize: 11, fontWeight: 700, color, marginTop: 4, textAlign: "center" }}>{label}</div>
      </div>
    );

    return (
      <div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 220 }}>
          <Bar height={incomeH} color="#27AE60" label="収入" value={income} />
          <div style={{ display: "flex", alignItems: "center", fontSize: 18, color: "#999", paddingBottom: 20 }}>−</div>
          <Bar height={fixedH}  color="#E67E22" label="固定費" value={fixedExp} striped />
          <div style={{ display: "flex", alignItems: "center", fontSize: 18, color: "#999", paddingBottom: 20 }}>−</div>
          <Bar height={varH}    color="#E74C3C" label="変動費" value={varExp} striped />
          <div style={{ display: "flex", alignItems: "center", fontSize: 18, color: "#999", paddingBottom: 20 }}>=</div>
          <Bar height={profitH} color={isProfit ? "#1565C0" : "#B71C1C"} label={isProfit ? "黒字" : "赤字"} value={Math.abs(profit)} />
        </div>
        {/* カテゴリ別費用明細 */}
        {catBreakdown.length > 0 && (
          <div style={{ marginTop: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: colors.textLight, marginBottom: 6 }}>費用内訳</div>
            {catBreakdown.map(([cat, amt]) => {
              const pct = expense > 0 ? amt / expense : 0;
              const catColor = expenseCategories[cat]?.color || colors.neutral;
              return (
                <div key={cat} style={{ marginBottom: 6 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: catColor }} />
                      <span style={{ fontSize: 12 }}>{cat}</span>
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 600 }}>{fmtYen(amt)}</span>
                  </div>
                  <div style={{ height: 5, borderRadius: 3, backgroundColor: "#EEE", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${pct * 100}%`, backgroundColor: catColor, borderRadius: 3 }} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  // ---- 損益分岐点表 ----
  const BEPTable = () => (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
        <thead>
          <tr style={{ backgroundColor: "#E3F2FD" }}>
            {["月", "収入", "固定費", "変動費", "収支", "損益分岐点"].map((h) => (
              <th key={h} style={{ padding: "6px 4px", textAlign: "right", fontWeight: 700, color: "#1565C0", borderBottom: "2px solid #90CAF9", whiteSpace: "nowrap" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bepRows.map((row, i) => {
            const isCurrentMonth = row.ym === month;
            const isBlack = row.profit >= 0;
            return (
              <tr key={row.ym} style={{ backgroundColor: isCurrentMonth ? "#FFF9C4" : i % 2 === 0 ? "#FAFAFA" : "#FFF" }}>
                <td style={{ padding: "5px 4px", fontWeight: isCurrentMonth ? 700 : 400, whiteSpace: "nowrap" }}>{row.label}</td>
                <td style={{ padding: "5px 4px", textAlign: "right", color: "#27AE60", fontWeight: 600 }}>{row.inc > 0 ? fmtYen(row.inc) : "-"}</td>
                <td style={{ padding: "5px 4px", textAlign: "right", color: "#E67E22" }}>{row.fixed > 0 ? fmtYen(row.fixed) : "-"}</td>
                <td style={{ padding: "5px 4px", textAlign: "right", color: "#E74C3C" }}>{row.variable > 0 ? fmtYen(row.variable) : "-"}</td>
                <td style={{ padding: "5px 4px", textAlign: "right", color: isBlack ? "#1565C0" : "#B71C1C", fontWeight: 700 }}>
                  {row.inc > 0 ? (isBlack ? "+" : "") + fmtYen(row.profit) : "-"}
                </td>
                <td style={{ padding: "5px 4px", textAlign: "right", color: "#555" }}>
                  {row.bep !== null ? fmtYen(row.bep) : "-"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div style={{ fontSize: 10, color: colors.textLight, marginTop: 6 }}>
        ※ 損益分岐点 ＝ 固定費 ÷（1 − 変動費率）　黄色行が選択中の月
      </div>
    </div>
  );

  return (
    <div>
      <div style={{ padding: "8px 16px 4px", textAlign: "center" }}>
        <div style={{ fontSize: 17, fontWeight: 800, color: "#1565C0" }}>📊 財務諸表</div>
      </div>

      {/* サブタブ */}
      <div style={{ display: "flex", padding: "4px 16px 8px", gap: 6 }}>
        {[
          { id: "bs", label: "B/S 貸借対照表" },
          { id: "pl", label: "P/L 損益計算書" },
          { id: "cf", label: "損益分岐点" },
        ].map((t) => (
          <button key={t.id} onClick={() => setSubtab(t.id)} style={{
            flex: 1, padding: "7px 4px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 11, fontWeight: 700,
            backgroundColor: subtab === t.id ? "#1565C0" : "#EEE",
            color: subtab === t.id ? "#fff" : colors.textLight,
          }}>{t.label}</button>
        ))}
      </div>

      {/* 月選択（P/Lと損益分岐点で使用） */}
      {subtab !== "bs" && (
        <div style={{ padding: "0 16px 8px" }}>
          <MonthNavigator month={month} setMonth={setMonth} />
        </div>
      )}

      {subtab === "bs" && (
        <>
          <Card>
            <SectionHeader title="貸借対照表（B/S）" />
            <div style={{ fontSize: 11, color: colors.textLight, marginBottom: 10 }}>
              現時点の資産・負債・純資産の構成
            </div>
            <BSDiagram />
            <Divider />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
              <span style={{ fontSize: 13, color: colors.textLight }}>総資産</span>
              <span style={{ fontSize: 15, fontWeight: 700, color: "#1565C0" }}>{fmtYen(totalAsset)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
              <span style={{ fontSize: 13, color: colors.textLight }}>総負債</span>
              <span style={{ fontSize: 15, fontWeight: 700, color: "#E74C3C" }}>-{fmtYen(totalLiability)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4, paddingTop: 8, borderTop: "2px solid #EEE" }}>
              <span style={{ fontSize: 14, fontWeight: 700 }}>純資産</span>
              <span style={{ fontSize: 20, fontWeight: 800, color: netWorth >= 0 ? "#4CAF50" : "#B71C1C" }}>{fmtYen(netWorth)}</span>
            </div>
          </Card>
          <Card>
            <SectionHeader title="資産の部 明細" />
            {[
              { label: "銀行預金",  value: totalBank,    color: "#1565C0" },
              { label: "NISA",      value: nisaVal,       color: "#27AE60" },
              { label: "iDeCo",     value: idecoVal,      color: "#2980B9" },
              { label: "変額年金",  value: annuityVal,    color: "#8E44AD" },
            ].map((item) => (
              <div key={item.label} style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 2, backgroundColor: item.color }} />
                  <span style={{ fontSize: 13 }}>{item.label}</span>
                </div>
                <span style={{ fontSize: 14, fontWeight: 600, color: item.color }}>{fmtYen(item.value)}</span>
              </div>
            ))}
          </Card>
          {data.loans.length > 0 && (
            <Card>
              <SectionHeader title="負債の部 明細" />
              {data.loans.map((l) => (
                <div key={l.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 13 }}>{l.name || "ローン"}</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#E74C3C" }}>-{fmtYen(l.remainingBalance || 0)}</span>
                </div>
              ))}
            </Card>
          )}
        </>
      )}

      {subtab === "pl" && (
        <>
          <Card>
            <SectionHeader title={`損益計算書（P/L）— ${month.replace("-","年")}月`} />
            <div style={{ fontSize: 11, color: colors.textLight, marginBottom: 10 }}>
              収入から費用を差し引いた当月の損益
            </div>
            {income === 0 && expense === 0
              ? <EmptyState message="この月のデータがありません" />
              : <PLDiagram />
            }
            <Divider />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
              <span style={{ fontSize: 13, color: colors.textLight }}>収入合計</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#27AE60" }}>{fmtYen(income)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
              <span style={{ fontSize: 13, color: colors.textLight }}>固定費</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: "#E67E22" }}>-{fmtYen(fixedExp)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
              <span style={{ fontSize: 13, color: colors.textLight }}>変動費</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: "#E74C3C" }}>-{fmtYen(varExp)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, paddingTop: 8, borderTop: "2px solid #EEE" }}>
              <span style={{ fontSize: 14, fontWeight: 700 }}>当月収支</span>
              <span style={{ fontSize: 22, fontWeight: 800, color: profit >= 0 ? "#1565C0" : "#B71C1C" }}>
                {profit >= 0 ? "+" : ""}{fmtYen(profit)}
              </span>
            </div>
          </Card>
        </>
      )}

      {subtab === "cf" && (
        <Card>
          <SectionHeader title="損益分岐点分析（直近12ヶ月）" />
          <div style={{ fontSize: 11, color: colors.textLight, marginBottom: 10 }}>
            損益分岐点：最低限必要な収入額。これを上回ると黒字。
          </div>
          <BEPTable />
        </Card>
      )}
    </div>
  );
}

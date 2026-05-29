/*
========================================
💰 家計簿アプリ - ビルド進捗
========================================
フェーズ1:  基盤・データ構造・状態管理    [✅]
フェーズ2:  共通コンポーネント・スマホUI  [ ]
フェーズ3:  ホーム（ダッシュボード）      [ ]
フェーズ4:  ①収入タブ                   [ ]
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

// ===== フェーズ1終了 - 後フェーズで実装するプレースホルダー =====

function HomeTab({ data, updateData }) {
  return (
    <div style={{ padding: 16 }}>
      <h2 style={{ color: colors.text, margin: 0 }}>🏠 ホーム</h2>
      <p style={{ color: colors.textLight }}>フェーズ3で実装予定</p>
    </div>
  );
}

function IncomeTab({ data, updateData }) {
  return (
    <div style={{ padding: 16 }}>
      <h2 style={{ color: colors.text, margin: 0 }}>💴 収入</h2>
      <p style={{ color: colors.textLight }}>フェーズ4で実装予定</p>
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

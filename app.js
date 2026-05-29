function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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

// ===== デザイントークン =====
var colors = {
  income: "#27AE60",
  expense: "#E74C3C",
  loan: "#E67E22",
  saving: "#2980B9",
  asset: "#8E44AD",
  neutral: "#95A5A6",
  bg: "#F8F9FA",
  card: "#FFFFFF",
  text: "#2C3E50",
  textLight: "#7F8C8D"
};

// ===== 初期状態 =====
var initialState = {
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
    "その他": 10000
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
      investments: [] // NISA保有銘柄
    },
    ideco: {
      monthlyContribution: 0,
      totalContributed: 0,
      currentValue: 0,
      startDate: ""
    },
    variableAnnuities: []
  },
  settings: {
    userName: "",
    currency: "JPY",
    monthlyGoalSaving: 50000,
    emergencyFundTarget: 1000000
  }
};

// ===== 支出カテゴリ定義 =====
var expenseCategories = {
  "食費": {
    color: "#E74C3C",
    subcategories: ["外食", "スーパー", "コンビニ", "宅配"],
    isFixed: false
  },
  "住居費": {
    color: "#E67E22",
    subcategories: ["家賃", "管理費", "駐車場", "修繕"],
    isFixed: true
  },
  "光熱費": {
    color: "#F1C40F",
    subcategories: ["電気", "ガス", "水道"],
    isFixed: false
  },
  "通信費": {
    color: "#2ECC71",
    subcategories: ["スマホ", "ネット", "NHK", "その他"],
    isFixed: true
  },
  "交通費": {
    color: "#3498DB",
    subcategories: ["ガソリン", "高速", "電車", "タクシー"],
    isFixed: false
  },
  "保険料": {
    color: "#9B59B6",
    subcategories: ["生命保険", "医療保険", "車保険", "火災保険"],
    isFixed: true
  },
  "医療費": {
    color: "#E91E63",
    subcategories: ["病院", "薬", "歯科"],
    isFixed: false
  },
  "教育費": {
    color: "#00BCD4",
    subcategories: ["学費", "塾", "習い事", "書籍"],
    isFixed: false
  },
  "娯楽費": {
    color: "#FF9800",
    subcategories: ["旅行", "外食", "趣味", "サブスク"],
    isFixed: false
  },
  "日用品": {
    color: "#795548",
    subcategories: ["消耗品", "家電", "家具"],
    isFixed: false
  },
  "被服費": {
    color: "#607D8B",
    subcategories: ["衣類", "靴", "バッグ"],
    isFixed: false
  },
  "その他": {
    color: "#95A5A6",
    subcategories: ["冠婚葬祭", "寄付", "その他"],
    isFixed: false
  }
};

// ===== localStorage ユーティリティ =====
var STORAGE_KEY = "kakeibo-app-data";
var saveData = function saveData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("保存エラー:", e);
  }
};
var loadData = function loadData() {
  try {
    var raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialState;
    var parsed = JSON.parse(raw);
    return _objectSpread(_objectSpread(_objectSpread({}, initialState), parsed), {}, {
      assets: _objectSpread(_objectSpread({}, initialState.assets), parsed.assets || {}),
      settings: _objectSpread(_objectSpread({}, initialState.settings), parsed.settings || {}),
      budgets: _objectSpread(_objectSpread({}, initialState.budgets), parsed.budgets || {})
    });
  } catch (e) {
    return initialState;
  }
};

// ===== 数値フォーマット ユーティリティ =====
var fmt = function fmt(n) {
  return new Intl.NumberFormat("ja-JP").format(Math.round(n || 0));
};
var fmtYen = function fmtYen(n) {
  return "\xA5".concat(fmt(n));
};
var parseNum = function parseNum(s) {
  var n = parseFloat(String(s).replace(/,/g, ""));
  return isNaN(n) ? 0 : n;
};
var genId = function genId() {
  return "".concat(Date.now(), "-").concat(Math.random().toString(36).slice(2, 7));
};
var currentYM = function currentYM() {
  var d = new Date();
  return "".concat(d.getFullYear(), "-").concat(String(d.getMonth() + 1).padStart(2, "0"));
};
var todayStr = function todayStr() {
  return new Date().toISOString().slice(0, 10);
};

// ===== タブ定義 =====
var TABS = [{
  id: "home",
  label: "ホーム",
  icon: Home
}, {
  id: "income",
  label: "収入",
  icon: DollarSign
}, {
  id: "expense",
  label: "支出",
  icon: CreditCard
}, {
  id: "loan",
  label: "ローン",
  icon: Calculator
}, {
  id: "asset",
  label: "資産",
  icon: PiggyBank
}, {
  id: "simulation",
  label: "シミュ",
  icon: TrendingUp
}];

// ===== メインアプリ =====
function KakeiboApp() {
  var _useState = useState(function () {
      return loadData();
    }),
    _useState2 = _slicedToArray(_useState, 2),
    data = _useState2[0],
    setData = _useState2[1];
  var _useState3 = useState("home"),
    _useState4 = _slicedToArray(_useState3, 2),
    activeTab = _useState4[0],
    setActiveTab = _useState4[1];

  // データ更新と自動保存
  var updateData = useCallback(function (updater) {
    setData(function (prev) {
      var next = typeof updater === "function" ? updater(prev) : updater;
      saveData(next);
      return next;
    });
  }, []);

  // タブコンテンツのプレースホルダー（後のフェーズで実装）
  var renderTab = function renderTab() {
    switch (activeTab) {
      case "home":
        return /*#__PURE__*/React.createElement(HomeTab, {
          data: data,
          updateData: updateData
        });
      case "income":
        return /*#__PURE__*/React.createElement(IncomeTab, {
          data: data,
          updateData: updateData
        });
      case "expense":
        return /*#__PURE__*/React.createElement(ExpenseTab, {
          data: data,
          updateData: updateData
        });
      case "loan":
        return /*#__PURE__*/React.createElement(LoanTab, {
          data: data,
          updateData: updateData
        });
      case "asset":
        return /*#__PURE__*/React.createElement(AssetTab, {
          data: data,
          updateData: updateData
        });
      case "simulation":
        return /*#__PURE__*/React.createElement(SimulationTab, {
          data: data,
          updateData: updateData
        });
      default:
        return null;
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Noto Sans JP', sans-serif",
      backgroundColor: colors.bg,
      minHeight: "100vh",
      maxWidth: 430,
      margin: "0 auto",
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      paddingBottom: 80
    }
  }, renderTab()), /*#__PURE__*/React.createElement(BottomNav, {
    activeTab: activeTab,
    setActiveTab: setActiveTab
  }));
}

// ===== ボトムナビゲーション =====
function BottomNav(_ref) {
  var activeTab = _ref.activeTab,
    setActiveTab = _ref.setActiveTab;
  return /*#__PURE__*/React.createElement("nav", {
    style: {
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
      boxShadow: "0 -2px 8px rgba(0,0,0,0.08)"
    }
  }, TABS.map(function (tab) {
    var Icon = tab.icon;
    var active = activeTab === tab.id;
    return /*#__PURE__*/React.createElement("button", {
      key: tab.id,
      onClick: function onClick() {
        return setActiveTab(tab.id);
      },
      style: {
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
        transition: "color 0.2s"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      size: 20
    }), /*#__PURE__*/React.createElement("span", null, tab.label));
  }));
}

// ===== フェーズ2: 共通コンポーネント =====

// カードコンポーネント
function Card(_ref2) {
  var children = _ref2.children,
    _ref2$style = _ref2.style,
    style = _ref2$style === void 0 ? {} : _ref2$style;
  return /*#__PURE__*/React.createElement("div", {
    style: _objectSpread({
      backgroundColor: colors.card,
      borderRadius: 16,
      boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
      padding: 16,
      marginBottom: 12
    }, style)
  }, children);
}

// セクションヘッダー
function SectionHeader(_ref3) {
  var title = _ref3.title,
    _ref3$color = _ref3.color,
    color = _ref3$color === void 0 ? colors.text : _ref3$color,
    right = _ref3.right;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: 16,
      fontWeight: 700,
      color: color
    }
  }, title), right);
}

// 金額入力フィールド
function AmountInput(_ref4) {
  var value = _ref4.value,
    _onChange = _ref4.onChange,
    _ref4$placeholder = _ref4.placeholder,
    placeholder = _ref4$placeholder === void 0 ? "0" : _ref4$placeholder,
    label = _ref4.label,
    _ref4$style = _ref4.style,
    style = _ref4$style === void 0 ? {} : _ref4$style;
  return /*#__PURE__*/React.createElement("div", {
    style: _objectSpread({
      marginBottom: 12
    }, style)
  }, label && /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 12,
      color: colors.textLight,
      display: "block",
      marginBottom: 4
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: 12,
      top: "50%",
      transform: "translateY(-50%)",
      color: colors.textLight,
      fontSize: 16,
      pointerEvents: "none"
    }
  }, "\xA5"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    inputMode: "numeric",
    value: value || "",
    onChange: function onChange(e) {
      return _onChange(parseNum(e.target.value));
    },
    placeholder: placeholder,
    style: {
      width: "100%",
      padding: "12px 12px 12px 28px",
      fontSize: 16,
      border: "1.5px solid #E0E0E0",
      borderRadius: 10,
      outline: "none",
      boxSizing: "border-box",
      backgroundColor: "#FAFAFA"
    }
  })));
}

// テキスト入力フィールド
function TextInput(_ref5) {
  var value = _ref5.value,
    _onChange2 = _ref5.onChange,
    placeholder = _ref5.placeholder,
    label = _ref5.label,
    _ref5$style = _ref5.style,
    style = _ref5$style === void 0 ? {} : _ref5$style;
  return /*#__PURE__*/React.createElement("div", {
    style: _objectSpread({
      marginBottom: 12
    }, style)
  }, label && /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 12,
      color: colors.textLight,
      display: "block",
      marginBottom: 4
    }
  }, label), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: value || "",
    onChange: function onChange(e) {
      return _onChange2(e.target.value);
    },
    placeholder: placeholder,
    style: {
      width: "100%",
      padding: "12px",
      fontSize: 16,
      border: "1.5px solid #E0E0E0",
      borderRadius: 10,
      outline: "none",
      boxSizing: "border-box",
      backgroundColor: "#FAFAFA"
    }
  }));
}

// セレクトボックス
function SelectInput(_ref6) {
  var value = _ref6.value,
    _onChange3 = _ref6.onChange,
    options = _ref6.options,
    label = _ref6.label,
    _ref6$style = _ref6.style,
    style = _ref6$style === void 0 ? {} : _ref6$style;
  return /*#__PURE__*/React.createElement("div", {
    style: _objectSpread({
      marginBottom: 12
    }, style)
  }, label && /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 12,
      color: colors.textLight,
      display: "block",
      marginBottom: 4
    }
  }, label), /*#__PURE__*/React.createElement("select", {
    value: value,
    onChange: function onChange(e) {
      return _onChange3(e.target.value);
    },
    style: {
      width: "100%",
      padding: "12px",
      fontSize: 16,
      border: "1.5px solid #E0E0E0",
      borderRadius: 10,
      outline: "none",
      boxSizing: "border-box",
      backgroundColor: "#FAFAFA",
      appearance: "none"
    }
  }, options.map(function (opt) {
    var _opt$value, _opt$value2, _opt$label;
    return /*#__PURE__*/React.createElement("option", {
      key: (_opt$value = opt.value) !== null && _opt$value !== void 0 ? _opt$value : opt,
      value: (_opt$value2 = opt.value) !== null && _opt$value2 !== void 0 ? _opt$value2 : opt
    }, (_opt$label = opt.label) !== null && _opt$label !== void 0 ? _opt$label : opt);
  })));
}

// プライマリボタン
function PrimaryButton(_ref7) {
  var children = _ref7.children,
    onClick = _ref7.onClick,
    _ref7$color = _ref7.color,
    color = _ref7$color === void 0 ? colors.income : _ref7$color,
    _ref7$disabled = _ref7.disabled,
    disabled = _ref7$disabled === void 0 ? false : _ref7$disabled,
    _ref7$style = _ref7.style,
    style = _ref7$style === void 0 ? {} : _ref7$style;
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    disabled: disabled,
    style: _objectSpread({
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
      transition: "opacity 0.2s"
    }, style)
  }, children);
}

// アウトラインボタン
function OutlineButton(_ref8) {
  var children = _ref8.children,
    onClick = _ref8.onClick,
    _ref8$color = _ref8.color,
    color = _ref8$color === void 0 ? colors.saving : _ref8$color,
    _ref8$style = _ref8.style,
    style = _ref8$style === void 0 ? {} : _ref8$style;
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: _objectSpread({
      padding: "10px 16px",
      backgroundColor: "transparent",
      color: color,
      border: "2px solid ".concat(color),
      borderRadius: 10,
      fontSize: 14,
      fontWeight: 600,
      cursor: "pointer",
      minHeight: 44
    }, style)
  }, children);
}

// バッジ
function Badge(_ref9) {
  var label = _ref9.label,
    color = _ref9.color,
    bgColor = _ref9.bgColor;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-block",
      padding: "2px 8px",
      borderRadius: 20,
      fontSize: 11,
      fontWeight: 600,
      color: color || "#fff",
      backgroundColor: bgColor || colors.neutral
    }
  }, label);
}

// プログレスバー
function ProgressBar(_ref0) {
  var value = _ref0.value,
    max = _ref0.max,
    _ref0$color = _ref0.color,
    color = _ref0$color === void 0 ? colors.saving : _ref0$color,
    _ref0$showPercent = _ref0.showPercent,
    showPercent = _ref0$showPercent === void 0 ? true : _ref0$showPercent;
  var pct = max > 0 ? Math.min(value / max * 100, 100) : 0;
  var over = max > 0 && value > max;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 10,
      backgroundColor: "#EEE",
      borderRadius: 5,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      width: "".concat(pct, "%"),
      backgroundColor: over ? colors.expense : color,
      borderRadius: 5,
      transition: "width 0.4s ease"
    }
  })), showPercent && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: over ? colors.expense : colors.textLight,
      marginTop: 4,
      textAlign: "right"
    }
  }, Math.round(pct), "%", over && " ⚠️ 超過"));
}

// モーダル
function Modal(_ref1) {
  var title = _ref1.title,
    children = _ref1.children,
    onClose = _ref1.onClose;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.4)",
      zIndex: 2000,
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "center"
    },
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      backgroundColor: colors.card,
      borderRadius: "20px 20px 0 0",
      padding: 20,
      paddingBottom: 40,
      width: "100%",
      maxWidth: 430,
      maxHeight: "90vh",
      overflowY: "auto"
    },
    onClick: function onClick(e) {
      return e.stopPropagation();
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: 18,
      color: colors.text
    }
  }, title), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      background: "none",
      border: "none",
      fontSize: 24,
      cursor: "pointer",
      color: colors.textLight
    }
  }, "\xD7")), children));
}

// アコーディオン
function Accordion(_ref10) {
  var title = _ref10.title,
    children = _ref10.children,
    _ref10$defaultOpen = _ref10.defaultOpen,
    defaultOpen = _ref10$defaultOpen === void 0 ? false : _ref10$defaultOpen;
  var _useState5 = useState(defaultOpen),
    _useState6 = _slicedToArray(_useState5, 2),
    open = _useState6[0],
    setOpen = _useState6[1];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setOpen(!open);
    },
    style: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px 16px",
      backgroundColor: "#F5F5F5",
      border: "none",
      borderRadius: 10,
      cursor: "pointer",
      fontSize: 14,
      fontWeight: 600,
      color: colors.text
    }
  }, title, open ? /*#__PURE__*/React.createElement(ChevronDown, {
    size: 16
  }) : /*#__PURE__*/React.createElement(ChevronRight, {
    size: 16
  })), open && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "12px 4px 0"
    }
  }, children));
}

// 月ナビゲーター
function MonthNavigator(_ref11) {
  var month = _ref11.month,
    setMonth = _ref11.setMonth;
  var prev = function prev() {
    var _month$split$map = month.split("-").map(Number),
      _month$split$map2 = _slicedToArray(_month$split$map, 2),
      y = _month$split$map2[0],
      m = _month$split$map2[1];
    var d = new Date(y, m - 2, 1);
    setMonth("".concat(d.getFullYear(), "-").concat(String(d.getMonth() + 1).padStart(2, "0")));
  };
  var next = function next() {
    var _month$split$map3 = month.split("-").map(Number),
      _month$split$map4 = _slicedToArray(_month$split$map3, 2),
      y = _month$split$map4[0],
      m = _month$split$map4[1];
    var d = new Date(y, m, 1);
    setMonth("".concat(d.getFullYear(), "-").concat(String(d.getMonth() + 1).padStart(2, "0")));
  };
  var _month$split = month.split("-"),
    _month$split2 = _slicedToArray(_month$split, 2),
    y = _month$split2[0],
    m = _month$split2[1];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 16,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: prev,
    style: {
      background: "none",
      border: "none",
      fontSize: 20,
      cursor: "pointer",
      color: colors.saving,
      minWidth: 44,
      minHeight: 44
    }
  }, "\u2039"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18,
      fontWeight: 700,
      color: colors.text
    }
  }, y, "\u5E74", parseInt(m, 10), "\u6708"), /*#__PURE__*/React.createElement("button", {
    onClick: next,
    style: {
      background: "none",
      border: "none",
      fontSize: 20,
      cursor: "pointer",
      color: colors.saving,
      minWidth: 44,
      minHeight: 44
    }
  }, "\u203A"));
}

// サマリー行
function SummaryRow(_ref12) {
  var label = _ref12.label,
    value = _ref12.value,
    _ref12$color = _ref12.color,
    color = _ref12$color === void 0 ? colors.text : _ref12$color,
    _ref12$large = _ref12.large,
    large = _ref12$large === void 0 ? false : _ref12$large;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 4,
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: large ? 15 : 13,
      color: colors.textLight
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: large ? 20 : 15,
      fontWeight: large ? 700 : 600,
      color: color
    }
  }, value));
}

// 区切り線
function Divider() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      backgroundColor: "#EEE",
      margin: "8px 0"
    }
  });
}

// スワイプ削除対応リストアイテム
function SwipeDeleteItem(_ref13) {
  var onDelete = _ref13.onDelete,
    children = _ref13.children;
  var _useState7 = useState(false),
    _useState8 = _slicedToArray(_useState7, 2),
    swiped = _useState8[0],
    setSwiped = _useState8[1];
  var _useState9 = useState(null),
    _useState0 = _slicedToArray(_useState9, 2),
    startX = _useState0[0],
    setStartX = _useState0[1];
  var onTouchStart = function onTouchStart(e) {
    return setStartX(e.touches[0].clientX);
  };
  var onTouchEnd = function onTouchEnd(e) {
    if (startX !== null && startX - e.changedTouches[0].clientX > 60) setSwiped(true);else setSwiped(false);
    setStartX(null);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      overflow: "hidden",
      borderRadius: 10,
      marginBottom: 8
    },
    onTouchStart: onTouchStart,
    onTouchEnd: onTouchEnd
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      transform: swiped ? "translateX(-72px)" : "translateX(0)",
      transition: "transform 0.2s"
    }
  }, children), swiped && /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      setSwiped(false);
      onDelete();
    },
    style: {
      position: "absolute",
      right: 0,
      top: 0,
      bottom: 0,
      width: 72,
      backgroundColor: colors.expense,
      color: "#fff",
      border: "none",
      fontSize: 12,
      fontWeight: 700,
      cursor: "pointer"
    }
  }, "\u524A\u9664"));
}

// 空状態表示
function EmptyState(_ref14) {
  var message = _ref14.message,
    _ref14$icon = _ref14.icon,
    Icon = _ref14$icon === void 0 ? AlertCircle : _ref14$icon;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      padding: "32px 16px",
      color: colors.textLight
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    size: 40,
    style: {
      marginBottom: 8,
      opacity: 0.4
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 14
    }
  }, message));
}

// ページタイトル
function PageTitle(_ref15) {
  var title = _ref15.title,
    subtitle = _ref15.subtitle;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "16px 16px 8px"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 20,
      fontWeight: 800,
      color: colors.text
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "4px 0 0",
      fontSize: 13,
      color: colors.textLight
    }
  }, subtitle));
}

// ===== フェーズ1終了 - 後フェーズで実装するプレースホルダー =====

// ===== フェーズ3: ホーム（ダッシュボード）=====

function HomeTab(_ref16) {
  var _data$assets$nisa, _data$assets$ideco;
  var data = _ref16.data,
    updateData = _ref16.updateData;
  var today = new Date();
  var ym = "".concat(today.getFullYear(), "-").concat(String(today.getMonth() + 1).padStart(2, "0"));

  // 今月の給与データ
  var thisSalary = data.salaries.find(function (s) {
    return s.month === ym;
  });
  var grossIncome = thisSalary ? thisSalary.basicSalary + Object.values(thisSalary.allowances || {}).reduce(function (a, b) {
    return a + b;
  }, 0) : 0;
  var totalDeductions = thisSalary ? Object.values(thisSalary.deductions || {}).reduce(function (a, b) {
    return a + b;
  }, 0) : 0;
  var netIncome = grossIncome - totalDeductions + ((thisSalary === null || thisSalary === void 0 ? void 0 : thisSalary.bonus) || 0) + ((thisSalary === null || thisSalary === void 0 ? void 0 : thisSalary.sideIncome) || 0);

  // 今月の支出
  var monthExpenses = data.expenses.filter(function (e) {
    var _e$date;
    return (_e$date = e.date) === null || _e$date === void 0 ? void 0 : _e$date.startsWith(ym);
  });
  var totalExpense = monthExpenses.reduce(function (a, e) {
    return a + e.amount;
  }, 0);
  var balance = netIncome - totalExpense;

  // 資産・負債
  var bankTotal = (data.assets.bankAccounts || []).reduce(function (a, b) {
    return a + b.balance;
  }, 0);
  var investTotal = (((_data$assets$nisa = data.assets.nisa) === null || _data$assets$nisa === void 0 ? void 0 : _data$assets$nisa.investments) || []).reduce(function (a, i) {
    return a + i.currentPrice * i.quantity;
  }, 0);
  var idecoVal = ((_data$assets$ideco = data.assets.ideco) === null || _data$assets$ideco === void 0 ? void 0 : _data$assets$ideco.currentValue) || 0;
  var annuityVal = (data.assets.variableAnnuities || []).reduce(function (a, v) {
    return a + v.currentValue;
  }, 0);
  var totalAsset = bankTotal + investTotal + idecoVal + annuityVal;
  var totalLoan = (data.loans || []).reduce(function (a, l) {
    return a + l.remainingBalance;
  }, 0);
  var netWorth = totalAsset - totalLoan;

  // 今月の貯蓄目標
  var goalSaving = data.settings.monthlyGoalSaving || 50000;
  var actualSaving = Math.max(0, balance);

  // 支出カテゴリ別集計（円グラフ用）
  var catTotals = {};
  monthExpenses.forEach(function (e) {
    catTotals[e.category] = (catTotals[e.category] || 0) + e.amount;
  });
  var pieData = Object.entries(catTotals).sort(function (a, b) {
    return b[1] - a[1];
  }).slice(0, 6).map(function (_ref17) {
    var _expenseCategories$na;
    var _ref18 = _slicedToArray(_ref17, 2),
      name = _ref18[0],
      value = _ref18[1];
    return {
      name: name,
      value: value,
      color: ((_expenseCategories$na = expenseCategories[name]) === null || _expenseCategories$na === void 0 ? void 0 : _expenseCategories$na.color) || colors.neutral
    };
  });

  // 直近5件の支出
  var recent5 = _toConsumableArray(data.expenses).sort(function (a, b) {
    return b.date > a.date ? 1 : -1;
  }).slice(0, 5);

  // ローン残高一覧
  var loanTypeIcon = {
    car: "🚗",
    housing: "🏠",
    scholarship: "🎓",
    other: "💰"
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PageTitle, {
    title: "\uD83C\uDFE0 \u30DB\u30FC\u30E0",
    subtitle: "".concat(today.getFullYear(), "\u5E74").concat(today.getMonth() + 1, "\u6708")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 16px"
    }
  }, /*#__PURE__*/React.createElement(Card, {
    style: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "#fff"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      opacity: 0.85,
      marginBottom: 8
    }
  }, today.getFullYear(), "\u5E74", today.getMonth() + 1, "\u6708"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      opacity: 0.9
    }
  }, "\u624B\u53D6\u308A"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 22,
      fontWeight: 700
    }
  }, fmtYen(netIncome))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      opacity: 0.9
    }
  }, "\u652F\u51FA"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 22,
      fontWeight: 700
    }
  }, "-", fmtYen(totalExpense))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      backgroundColor: "rgba(255,255,255,0.3)",
      marginBottom: 8
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      fontWeight: 600
    }
  }, "\u53CE\u652F"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 26,
      fontWeight: 800,
      color: balance >= 0 ? "#A8FFB0" : "#FFB0B0"
    }
  }, balance >= 0 ? "+" : "", fmtYen(balance)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginBottom: 12,
      overflowX: "auto",
      paddingBottom: 4
    }
  }, [{
    label: "総資産",
    value: totalAsset,
    color: colors.asset
  }, {
    label: "ローン残高",
    value: totalLoan,
    color: colors.loan
  }, {
    label: "純資産",
    value: netWorth,
    color: netWorth >= 0 ? colors.income : colors.expense
  }].map(function (item) {
    return /*#__PURE__*/React.createElement("div", {
      key: item.label,
      style: {
        flex: "0 0 auto",
        minWidth: 110,
        backgroundColor: colors.card,
        borderRadius: 12,
        padding: 12,
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        textAlign: "center"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: colors.textLight,
        marginBottom: 4
      }
    }, item.label), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 15,
        fontWeight: 700,
        color: item.color
      }
    }, item.value < 0 ? "▲" : "", fmtYen(Math.abs(item.value))));
  })), pieData.length > 0 ? /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "\u4ECA\u6708\u306E\u652F\u51FA\u5185\u8A33"
  }), /*#__PURE__*/React.createElement(ResponsiveContainer, {
    width: "100%",
    height: 180
  }, /*#__PURE__*/React.createElement(RechartsPie, null, /*#__PURE__*/React.createElement(Pie, {
    data: pieData,
    cx: "50%",
    cy: "50%",
    outerRadius: 70,
    dataKey: "value",
    label: function label(_ref19) {
      var name = _ref19.name,
        percent = _ref19.percent;
      return "".concat(name, " ").concat(Math.round(percent * 100), "%");
    },
    labelLine: false,
    fontSize: 10
  }, pieData.map(function (entry, i) {
    return /*#__PURE__*/React.createElement(Cell, {
      key: i,
      fill: entry.color
    });
  })), /*#__PURE__*/React.createElement(Tooltip, {
    formatter: function formatter(v) {
      return fmtYen(v);
    }
  })))) : /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "\u4ECA\u6708\u306E\u652F\u51FA\u5185\u8A33"
  }), /*#__PURE__*/React.createElement(EmptyState, {
    message: "\u4ECA\u6708\u306E\u652F\u51FA\u30C7\u30FC\u30BF\u304C\u3042\u308A\u307E\u305B\u3093"
  })), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "\u4ECA\u6708\u306E\u8CAF\u84C4\u76EE\u6A19"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: colors.textLight
    }
  }, "\u76EE\u6A19: ", fmtYen(goalSaving)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: colors.saving,
      fontWeight: 700
    }
  }, fmtYen(actualSaving))), /*#__PURE__*/React.createElement(ProgressBar, {
    value: actualSaving,
    max: goalSaving,
    color: colors.saving
  })), data.loans.length > 0 && /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "\u30ED\u30FC\u30F3\u8FD4\u6E08\u72B6\u6CC1"
  }), data.loans.map(function (loan) {
    var monthsLeft = loan.monthlyPayment > 0 ? Math.ceil(loan.remainingBalance / loan.monthlyPayment) : 0;
    return /*#__PURE__*/React.createElement("div", {
      key: loan.id,
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingBottom: 8,
        marginBottom: 8,
        borderBottom: "1px solid #F0F0F0"
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      style: {
        marginRight: 6
      }
    }, loanTypeIcon[loan.type] || "💰"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        fontWeight: 600,
        color: colors.text
      }
    }, loan.name)), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "right"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 700,
        color: colors.loan
      }
    }, fmtYen(loan.remainingBalance)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: colors.textLight
      }
    }, "\u3042\u3068", monthsLeft, "\u56DE")));
  })), /*#__PURE__*/React.createElement(DataManagementPanel, {
    data: data,
    updateData: updateData
  }), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "\u6700\u8FD1\u306E\u652F\u51FA"
  }), recent5.length > 0 ? recent5.map(function (e) {
    var _expenseCategories$e$;
    return /*#__PURE__*/React.createElement("div", {
      key: e.id,
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingBottom: 8,
        marginBottom: 8,
        borderBottom: "1px solid #F8F8F8"
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "inline-block",
        width: 8,
        height: 8,
        borderRadius: "50%",
        backgroundColor: ((_expenseCategories$e$ = expenseCategories[e.category]) === null || _expenseCategories$e$ === void 0 ? void 0 : _expenseCategories$e$.color) || colors.neutral,
        marginRight: 8
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        color: colors.text
      }
    }, e.category), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        color: colors.textLight,
        marginLeft: 6
      }
    }, e.date)), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        fontWeight: 700,
        color: colors.expense
      }
    }, "-", fmtYen(e.amount)));
  }) : /*#__PURE__*/React.createElement(EmptyState, {
    message: "\u652F\u51FA\u5C65\u6B74\u304C\u3042\u308A\u307E\u305B\u3093"
  }))));
}

// ===== フェーズ4: 収入タブ =====

var blankSalary = function blankSalary() {
  return {
    id: genId(),
    month: currentYM(),
    basicSalary: 0,
    allowances: {
      commuting: 0,
      housing: 0,
      overtime: 0,
      family: 0,
      other: 0
    },
    deductions: {
      healthInsurance: 0,
      nursingInsurance: 0,
      pension: 0,
      employmentInsurance: 0,
      incomeTax: 0,
      residentTax: 0,
      other: 0
    },
    bonus: 0,
    sideIncome: 0,
    memo: ""
  };
};
function IncomeTab(_ref20) {
  var data = _ref20.data,
    updateData = _ref20.updateData;
  var _useState1 = useState(currentYM()),
    _useState10 = _slicedToArray(_useState1, 2),
    month = _useState10[0],
    setMonth = _useState10[1];
  var existing = data.salaries.find(function (s) {
    return s.month === month;
  });
  var _useState11 = useState(existing || blankSalary()),
    _useState12 = _slicedToArray(_useState11, 2),
    form = _useState12[0],
    setForm = _useState12[1];
  var _useState13 = useState(false),
    _useState14 = _slicedToArray(_useState13, 2),
    saved = _useState14[0],
    setSaved = _useState14[1];
  useEffect(function () {
    var e = data.salaries.find(function (s) {
      return s.month === month;
    });
    setForm(e ? _objectSpread({}, e) : _objectSpread(_objectSpread({}, blankSalary()), {}, {
      month: month
    }));
    setSaved(false);
  }, [month, data.salaries]);
  var setA = function setA(field) {
    return function (val) {
      return setForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          allowances: _objectSpread(_objectSpread({}, f.allowances), {}, _defineProperty({}, field, val))
        });
      });
    };
  };
  var setD = function setD(field) {
    return function (val) {
      return setForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          deductions: _objectSpread(_objectSpread({}, f.deductions), {}, _defineProperty({}, field, val))
        });
      });
    };
  };
  var grossPay = form.basicSalary + Object.values(form.allowances).reduce(function (a, b) {
    return a + b;
  }, 0);
  var totalDed = Object.values(form.deductions).reduce(function (a, b) {
    return a + b;
  }, 0);
  var netPay = grossPay - totalDed;
  var totalIncome = netPay + (form.bonus || 0) + (form.sideIncome || 0);

  // 固定費（支出の固定費）
  var fixedExpenses = data.expenses.filter(function (e) {
    var _e$date2;
    return ((_e$date2 = e.date) === null || _e$date2 === void 0 ? void 0 : _e$date2.startsWith(month)) && e.isFixed;
  }).reduce(function (a, e) {
    return a + e.amount;
  }, 0);
  // ローン返済合計
  var loanPayments = data.loans.reduce(function (a, l) {
    return a + l.monthlyPayment;
  }, 0);
  var disposable = totalIncome - fixedExpenses - loanPayments;
  var save = function save() {
    updateData(function (prev) {
      var exists = prev.salaries.find(function (s) {
        return s.month === month;
      });
      if (exists) {
        return _objectSpread(_objectSpread({}, prev), {}, {
          salaries: prev.salaries.map(function (s) {
            return s.month === month ? _objectSpread({}, form) : s;
          })
        });
      }
      return _objectSpread(_objectSpread({}, prev), {}, {
        salaries: [].concat(_toConsumableArray(prev.salaries), [_objectSpread({}, form)])
      });
    });
    setSaved(true);
    setTimeout(function () {
      return setSaved(false);
    }, 2000);
  };

  // 月次収入グラフ（直近12ヶ月）
  var chartData = function () {
    var months = [];
    var now = new Date();
    var _loop = function _loop() {
      var d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      var ym = "".concat(d.getFullYear(), "-").concat(String(d.getMonth() + 1).padStart(2, "0"));
      var s = data.salaries.find(function (x) {
        return x.month === ym;
      });
      var basic = s ? s.basicSalary - Object.values(s.deductions || {}).reduce(function (a, b) {
        return a + b;
      }, 0) : 0;
      months.push({
        month: "".concat(d.getMonth() + 1, "\u6708"),
        手取り: Math.max(0, basic + ((s === null || s === void 0 ? void 0 : s.bonus) || 0) + ((s === null || s === void 0 ? void 0 : s.sideIncome) || 0)),
        基本給: Math.max(0, basic),
        ボーナス: (s === null || s === void 0 ? void 0 : s.bonus) || 0,
        副収入: (s === null || s === void 0 ? void 0 : s.sideIncome) || 0
      });
    };
    for (var i = 11; i >= 0; i--) {
      _loop();
    }
    return months;
  }();
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PageTitle, {
    title: "\uD83D\uDCB4 \u53CE\u5165",
    subtitle: "\u7D66\u4E0E\u660E\u7D30\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 16px"
    }
  }, /*#__PURE__*/React.createElement(MonthNavigator, {
    month: month,
    setMonth: setMonth
  }), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(Accordion, {
    title: "\u3010\u652F\u7D66\u3011",
    defaultOpen: true
  }, /*#__PURE__*/React.createElement(AmountInput, {
    label: "\u57FA\u672C\u7D66",
    value: form.basicSalary,
    onChange: function onChange(v) {
      return setForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          basicSalary: v
        });
      });
    }
  }), /*#__PURE__*/React.createElement(AmountInput, {
    label: "\u901A\u52E4\u624B\u5F53",
    value: form.allowances.commuting,
    onChange: setA("commuting")
  }), /*#__PURE__*/React.createElement(AmountInput, {
    label: "\u4F4F\u5B85\u624B\u5F53",
    value: form.allowances.housing,
    onChange: setA("housing")
  }), /*#__PURE__*/React.createElement(AmountInput, {
    label: "\u6B8B\u696D\u624B\u5F53",
    value: form.allowances.overtime,
    onChange: setA("overtime")
  }), /*#__PURE__*/React.createElement(AmountInput, {
    label: "\u5BB6\u65CF\u624B\u5F53",
    value: form.allowances.family,
    onChange: setA("family")
  }), /*#__PURE__*/React.createElement(AmountInput, {
    label: "\u305D\u306E\u4ED6\u624B\u5F53",
    value: form.allowances.other,
    onChange: setA("other")
  }), /*#__PURE__*/React.createElement(Divider, null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      padding: "4px 0"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 600
    }
  }, "\u652F\u7D66\u5408\u8A08"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18,
      fontWeight: 700,
      color: colors.income
    }
  }, fmtYen(grossPay))))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(Accordion, {
    title: "\u3010\u63A7\u9664\u3011",
    defaultOpen: false
  }, /*#__PURE__*/React.createElement(AmountInput, {
    label: "\u5065\u5EB7\u4FDD\u967A\u6599",
    value: form.deductions.healthInsurance,
    onChange: setD("healthInsurance")
  }), /*#__PURE__*/React.createElement(AmountInput, {
    label: "\u4ECB\u8B77\u4FDD\u967A\u6599",
    value: form.deductions.nursingInsurance,
    onChange: setD("nursingInsurance")
  }), /*#__PURE__*/React.createElement(AmountInput, {
    label: "\u539A\u751F\u5E74\u91D1\u4FDD\u967A\u6599",
    value: form.deductions.pension,
    onChange: setD("pension")
  }), /*#__PURE__*/React.createElement(AmountInput, {
    label: "\u96C7\u7528\u4FDD\u967A\u6599",
    value: form.deductions.employmentInsurance,
    onChange: setD("employmentInsurance")
  }), /*#__PURE__*/React.createElement(AmountInput, {
    label: "\u6240\u5F97\u7A0E",
    value: form.deductions.incomeTax,
    onChange: setD("incomeTax")
  }), /*#__PURE__*/React.createElement(AmountInput, {
    label: "\u4F4F\u6C11\u7A0E",
    value: form.deductions.residentTax,
    onChange: setD("residentTax")
  }), /*#__PURE__*/React.createElement(AmountInput, {
    label: "\u305D\u306E\u4ED6\u63A7\u9664",
    value: form.deductions.other,
    onChange: setD("other")
  }), /*#__PURE__*/React.createElement(Divider, null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      padding: "4px 0"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 600
    }
  }, "\u63A7\u9664\u5408\u8A08"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18,
      fontWeight: 700,
      color: colors.expense
    }
  }, "-", fmtYen(totalDed))))), /*#__PURE__*/React.createElement(Card, {
    style: {
      backgroundColor: "#F0FFF4",
      border: "2px solid ".concat(colors.income)
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: colors.textLight,
      marginBottom: 4
    }
  }, "\u5DEE\u5F15\u652F\u7D66\u984D\uFF08\u624B\u53D6\u308A\uFF09"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 32,
      fontWeight: 800,
      color: colors.income
    }
  }, fmtYen(netPay)))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "\u30DC\u30FC\u30CA\u30B9\u30FB\u526F\u53CE\u5165"
  }), /*#__PURE__*/React.createElement(AmountInput, {
    label: "\u30DC\u30FC\u30CA\u30B9",
    value: form.bonus,
    onChange: function onChange(v) {
      return setForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          bonus: v
        });
      });
    }
  }), /*#__PURE__*/React.createElement(AmountInput, {
    label: "\u526F\u53CE\u5165",
    value: form.sideIncome,
    onChange: function onChange(v) {
      return setForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          sideIncome: v
        });
      });
    }
  }), /*#__PURE__*/React.createElement(TextInput, {
    label: "\u30E1\u30E2",
    value: form.memo,
    onChange: function onChange(v) {
      return setForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          memo: v
        });
      });
    },
    placeholder: "\u30E1\u30E2\uFF08\u4EFB\u610F\uFF09"
  })), /*#__PURE__*/React.createElement(Card, {
    style: {
      backgroundColor: "#EBF5FB"
    }
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "\u53EF\u51E6\u5206\u6240\u5F97",
    color: colors.saving
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: colors.textLight,
      marginBottom: 8
    }
  }, "\u624B\u53D6\u308A\u53CE\u5165 \u2212 \u56FA\u5B9A\u8CBB\uFF08\u5BB6\u8CC3\u30FB\u30ED\u30FC\u30F3\u30FB\u4FDD\u967A\u7B49\uFF09= \u81EA\u7531\u306B\u4F7F\u3048\u308B\u304A\u91D1"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: colors.textLight
    }
  }, "\u624B\u53D6\u308A\u5408\u8A08"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      fontWeight: 600
    }
  }, fmtYen(totalIncome))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: colors.textLight
    }
  }, "\u56FA\u5B9A\u8CBB"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      fontWeight: 600
    }
  }, "-", fmtYen(fixedExpenses))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: colors.textLight
    }
  }, "\u30ED\u30FC\u30F3\u8FD4\u6E08"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      fontWeight: 600
    }
  }, "-", fmtYen(loanPayments))), /*#__PURE__*/React.createElement(Divider, null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      color: colors.saving
    }
  }, "\u4ECA\u6708\u306E\u53EF\u51E6\u5206\u6240\u5F97"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 22,
      fontWeight: 800,
      color: disposable >= 0 ? colors.saving : colors.expense
    }
  }, fmtYen(disposable)))), /*#__PURE__*/React.createElement(PrimaryButton, {
    onClick: save,
    color: saved ? colors.neutral : colors.income
  }, saved ? "✅ 保存しました" : "保存する"), /*#__PURE__*/React.createElement(Card, {
    style: {
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "\u624B\u53D6\u308A\u63A8\u79FB\uFF0812\u30F6\u6708\uFF09"
  }), /*#__PURE__*/React.createElement(ResponsiveContainer, {
    width: "100%",
    height: 200
  }, /*#__PURE__*/React.createElement(AreaChart, {
    data: chartData
  }, /*#__PURE__*/React.createElement(CartesianGrid, {
    strokeDasharray: "3 3",
    stroke: "#EEE"
  }), /*#__PURE__*/React.createElement(XAxis, {
    dataKey: "month",
    tick: {
      fontSize: 10
    }
  }), /*#__PURE__*/React.createElement(YAxis, {
    tick: {
      fontSize: 10
    },
    tickFormatter: function tickFormatter(v) {
      return "".concat(Math.round(v / 10000), "\u4E07");
    }
  }), /*#__PURE__*/React.createElement(Tooltip, {
    formatter: function formatter(v) {
      return fmtYen(v);
    }
  }), /*#__PURE__*/React.createElement(Area, {
    type: "monotone",
    dataKey: "\u624B\u53D6\u308A",
    stroke: colors.income,
    fill: "#D5F5E3",
    strokeWidth: 2
  }))))));
}

// ===== フェーズ5・6: 支出タブ =====

var PAYMENT_METHODS = ["現金", "クレカ", "電子マネー", "口座振替", "その他"];
var EXPENSE_SUBTABS = ["入力", "一覧", "分析", "予算"];
function ExpenseTab(_ref21) {
  var data = _ref21.data,
    updateData = _ref21.updateData;
  var _useState15 = useState("入力"),
    _useState16 = _slicedToArray(_useState15, 2),
    subtab = _useState16[0],
    setSubtab = _useState16[1];
  var _useState17 = useState(currentYM()),
    _useState18 = _slicedToArray(_useState17, 2),
    month = _useState18[0],
    setMonth = _useState18[1];
  var monthExpenses = data.expenses.filter(function (e) {
    var _e$date3;
    return (_e$date3 = e.date) === null || _e$date3 === void 0 ? void 0 : _e$date3.startsWith(month);
  });
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PageTitle, {
    title: "\uD83D\uDCB3 \u652F\u51FA"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      padding: "0 16px 12px",
      overflowX: "auto"
    }
  }, EXPENSE_SUBTABS.map(function (t) {
    return /*#__PURE__*/React.createElement("button", {
      key: t,
      onClick: function onClick() {
        return setSubtab(t);
      },
      style: {
        flex: "0 0 auto",
        padding: "8px 16px",
        backgroundColor: subtab === t ? colors.expense : "#EEE",
        color: subtab === t ? "#fff" : colors.text,
        border: "none",
        borderRadius: 20,
        fontSize: 13,
        fontWeight: 600,
        cursor: "pointer"
      }
    }, t);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 16px"
    }
  }, subtab === "入力" && /*#__PURE__*/React.createElement(ExpenseInput, {
    data: data,
    updateData: updateData
  }), subtab === "一覧" && /*#__PURE__*/React.createElement(ExpenseList, {
    data: data,
    updateData: updateData,
    month: month,
    setMonth: setMonth,
    monthExpenses: monthExpenses
  }), subtab === "分析" && /*#__PURE__*/React.createElement(ExpenseAnalysis, {
    data: data,
    month: month,
    setMonth: setMonth,
    monthExpenses: monthExpenses
  }), subtab === "予算" && /*#__PURE__*/React.createElement(ExpenseBudget, {
    data: data,
    updateData: updateData,
    month: month,
    setMonth: setMonth,
    monthExpenses: monthExpenses
  })));
}

// 支出入力フォーム
function ExpenseInput(_ref22) {
  var _expenseCategories$fo;
  var data = _ref22.data,
    updateData = _ref22.updateData;
  var _useState19 = useState({
      date: todayStr(),
      amount: 0,
      category: "食費",
      subcategory: "",
      isFixed: false,
      memo: "",
      paymentMethod: "現金"
    }),
    _useState20 = _slicedToArray(_useState19, 2),
    form = _useState20[0],
    setForm = _useState20[1];
  var _useState21 = useState(false),
    _useState22 = _slicedToArray(_useState21, 2),
    added = _useState22[0],
    setAdded = _useState22[1];
  var catList = Object.keys(expenseCategories);
  var subList = ((_expenseCategories$fo = expenseCategories[form.category]) === null || _expenseCategories$fo === void 0 ? void 0 : _expenseCategories$fo.subcategories) || [];
  var add = function add() {
    var _expenseCategories$fo2;
    if (!form.amount) return;
    var newExp = _objectSpread(_objectSpread({}, form), {}, {
      id: genId(),
      amount: Number(form.amount),
      isFixed: ((_expenseCategories$fo2 = expenseCategories[form.category]) === null || _expenseCategories$fo2 === void 0 ? void 0 : _expenseCategories$fo2.isFixed) || form.isFixed
    });
    updateData(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, {
        expenses: [].concat(_toConsumableArray(prev.expenses), [newExp])
      });
    });
    setForm(function (f) {
      return _objectSpread(_objectSpread({}, f), {}, {
        amount: 0,
        memo: "",
        subcategory: ""
      });
    });
    setAdded(true);
    setTimeout(function () {
      return setAdded(false);
    }, 1500);
  };
  return /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "\u30AF\u30A4\u30C3\u30AF\u5165\u529B",
    color: colors.expense
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 12,
      color: colors.textLight,
      display: "block",
      marginBottom: 4
    }
  }, "\u65E5\u4ED8"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: form.date,
    onChange: function onChange(e) {
      return setForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          date: e.target.value
        });
      });
    },
    style: {
      width: "100%",
      padding: 12,
      fontSize: 16,
      border: "1.5px solid #E0E0E0",
      borderRadius: 10,
      boxSizing: "border-box",
      backgroundColor: "#FAFAFA"
    }
  })), /*#__PURE__*/React.createElement(AmountInput, {
    label: "\u91D1\u984D",
    value: form.amount,
    onChange: function onChange(v) {
      return setForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          amount: v
        });
      });
    }
  }), /*#__PURE__*/React.createElement(SelectInput, {
    label: "\u30AB\u30C6\u30B4\u30EA",
    value: form.category,
    onChange: function onChange(v) {
      return setForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          category: v,
          subcategory: ""
        });
      });
    },
    options: catList.map(function (c) {
      return {
        value: c,
        label: c
      };
    })
  }), subList.length > 0 && /*#__PURE__*/React.createElement(SelectInput, {
    label: "\u30B5\u30D6\u30AB\u30C6\u30B4\u30EA",
    value: form.subcategory || subList[0],
    onChange: function onChange(v) {
      return setForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          subcategory: v
        });
      });
    },
    options: subList.map(function (s) {
      return {
        value: s,
        label: s
      };
    })
  }), /*#__PURE__*/React.createElement(SelectInput, {
    label: "\u652F\u6255\u65B9\u6CD5",
    value: form.paymentMethod,
    onChange: function onChange(v) {
      return setForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          paymentMethod: v
        });
      });
    },
    options: PAYMENT_METHODS
  }), /*#__PURE__*/React.createElement(TextInput, {
    label: "\u30E1\u30E2\uFF08\u4EFB\u610F\uFF09",
    value: form.memo,
    onChange: function onChange(v) {
      return setForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          memo: v
        });
      });
    },
    placeholder: "\u30E1\u30E2"
  }), /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: 16,
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: form.isFixed,
    onChange: function onChange(e) {
      return setForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          isFixed: e.target.checked
        });
      });
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: colors.text
    }
  }, "\u56FA\u5B9A\u8CBB\u3068\u3057\u3066\u767B\u9332")), /*#__PURE__*/React.createElement(PrimaryButton, {
    onClick: add,
    color: added ? colors.neutral : colors.expense
  }, added ? "✅ 追加しました" : "追加する"));
}

// 支出一覧
function ExpenseList(_ref23) {
  var data = _ref23.data,
    updateData = _ref23.updateData,
    month = _ref23.month,
    setMonth = _ref23.setMonth,
    monthExpenses = _ref23.monthExpenses;
  var sorted = _toConsumableArray(monthExpenses).sort(function (a, b) {
    return b.date > a.date ? 1 : -1;
  });
  var total = monthExpenses.reduce(function (a, e) {
    return a + e.amount;
  }, 0);
  var del = function del(id) {
    return updateData(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, {
        expenses: prev.expenses.filter(function (e) {
          return e.id !== id;
        })
      });
    });
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(MonthNavigator, {
    month: month,
    setMonth: setMonth
  }), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: colors.textLight
    }
  }, month, "\u306E\u5408\u8A08"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 22,
      fontWeight: 800,
      color: colors.expense
    }
  }, "-", fmtYen(total)))), sorted.length > 0 ? sorted.map(function (e) {
    var _expenseCategories$e$2;
    return /*#__PURE__*/React.createElement(SwipeDeleteItem, {
      key: e.id,
      onDelete: function onDelete() {
        return del(e.id);
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        backgroundColor: colors.card,
        padding: "12px 16px",
        borderRadius: 10,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 10,
        height: 10,
        borderRadius: "50%",
        backgroundColor: ((_expenseCategories$e$2 = expenseCategories[e.category]) === null || _expenseCategories$e$2 === void 0 ? void 0 : _expenseCategories$e$2.color) || colors.neutral,
        flexShrink: 0
      }
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 600,
        color: colors.text
      }
    }, e.category, e.subcategory ? "\u30FB".concat(e.subcategory) : "", e.isFixed && /*#__PURE__*/React.createElement(Badge, {
      label: "\u56FA\u5B9A\u8CBB",
      bgColor: colors.saving,
      style: {
        marginLeft: 6,
        fontSize: 10
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: colors.textLight
      }
    }, e.date, "\u3000", e.paymentMethod, e.memo ? "\u3000".concat(e.memo) : ""))), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 16,
        fontWeight: 700,
        color: colors.expense
      }
    }, "-", fmtYen(e.amount))));
  }) : /*#__PURE__*/React.createElement(EmptyState, {
    message: "\u652F\u51FA\u30C7\u30FC\u30BF\u304C\u3042\u308A\u307E\u305B\u3093"
  }));
}

// 支出分析
function ExpenseAnalysis(_ref24) {
  var data = _ref24.data,
    month = _ref24.month,
    setMonth = _ref24.setMonth,
    monthExpenses = _ref24.monthExpenses;
  var catTotals = {};
  monthExpenses.forEach(function (e) {
    catTotals[e.category] = (catTotals[e.category] || 0) + e.amount;
  });
  var pieData = Object.entries(catTotals).sort(function (a, b) {
    return b[1] - a[1];
  }).map(function (_ref25) {
    var _expenseCategories$na2;
    var _ref26 = _slicedToArray(_ref25, 2),
      name = _ref26[0],
      value = _ref26[1];
    return {
      name: name,
      value: value,
      color: ((_expenseCategories$na2 = expenseCategories[name]) === null || _expenseCategories$na2 === void 0 ? void 0 : _expenseCategories$na2.color) || colors.neutral
    };
  });
  var fixedTotal = monthExpenses.filter(function (e) {
    var _expenseCategories$e$3;
    return e.isFixed || ((_expenseCategories$e$3 = expenseCategories[e.category]) === null || _expenseCategories$e$3 === void 0 ? void 0 : _expenseCategories$e$3.isFixed);
  }).reduce(function (a, e) {
    return a + e.amount;
  }, 0);
  var varTotal = monthExpenses.reduce(function (a, e) {
    return a + e.amount;
  }, 0) - fixedTotal;
  var totalAmt = fixedTotal + varTotal;

  // 月次支出棒グラフ
  var barData = function () {
    var now = new Date();
    var months = [];
    var _loop2 = function _loop2() {
      var d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      var ym = "".concat(d.getFullYear(), "-").concat(String(d.getMonth() + 1).padStart(2, "0"));
      var total = data.expenses.filter(function (e) {
        var _e$date4;
        return (_e$date4 = e.date) === null || _e$date4 === void 0 ? void 0 : _e$date4.startsWith(ym);
      }).reduce(function (a, e) {
        return a + e.amount;
      }, 0);
      months.push({
        month: "".concat(d.getMonth() + 1, "\u6708"),
        支出: total
      });
    };
    for (var i = 5; i >= 0; i--) {
      _loop2();
    }
    return months;
  }();
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(MonthNavigator, {
    month: month,
    setMonth: setMonth
  }), pieData.length > 0 ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "\u30AB\u30C6\u30B4\u30EA\u5225\u5185\u8A33"
  }), /*#__PURE__*/React.createElement(ResponsiveContainer, {
    width: "100%",
    height: 200
  }, /*#__PURE__*/React.createElement(RechartsPie, null, /*#__PURE__*/React.createElement(Pie, {
    data: pieData,
    cx: "50%",
    cy: "50%",
    outerRadius: 75,
    dataKey: "value",
    label: function label(_ref27) {
      var name = _ref27.name,
        percent = _ref27.percent;
      return percent > 0.05 ? "".concat(name, " ").concat(Math.round(percent * 100), "%") : "";
    },
    fontSize: 10
  }, pieData.map(function (entry, i) {
    return /*#__PURE__*/React.createElement(Cell, {
      key: i,
      fill: entry.color
    });
  })), /*#__PURE__*/React.createElement(Tooltip, {
    formatter: function formatter(v) {
      return fmtYen(v);
    }
  }))), pieData.map(function (d) {
    return /*#__PURE__*/React.createElement("div", {
      key: d.name,
      style: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 4
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 6
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 10,
        height: 10,
        borderRadius: 2,
        backgroundColor: d.color
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13
      }
    }, d.name)), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        fontWeight: 600
      }
    }, fmtYen(d.value)));
  })), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "\u56FA\u5B9A\u8CBB vs \u5909\u52D5\u8CBB"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginBottom: 12
    }
  }, [{
    label: "固定費",
    val: fixedTotal,
    color: colors.saving
  }, {
    label: "変動費",
    val: varTotal,
    color: colors.expense
  }].map(function (item) {
    return /*#__PURE__*/React.createElement("div", {
      key: item.label,
      style: {
        flex: 1,
        backgroundColor: "#F8F8F8",
        borderRadius: 10,
        padding: 12,
        textAlign: "center"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: colors.textLight
      }
    }, item.label), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 18,
        fontWeight: 700,
        color: item.color
      }
    }, fmtYen(item.val)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: colors.textLight
      }
    }, totalAmt ? Math.round(item.val / totalAmt * 100) : 0, "%"));
  })), /*#__PURE__*/React.createElement(ProgressBar, {
    value: fixedTotal,
    max: totalAmt,
    color: colors.saving,
    showPercent: false
  }))) : /*#__PURE__*/React.createElement(EmptyState, {
    message: "\u5206\u6790\u3059\u308B\u30C7\u30FC\u30BF\u304C\u3042\u308A\u307E\u305B\u3093"
  }), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "\u6708\u6B21\u652F\u51FA\u63A8\u79FB\uFF086\u30F6\u6708\uFF09"
  }), /*#__PURE__*/React.createElement(ResponsiveContainer, {
    width: "100%",
    height: 180
  }, /*#__PURE__*/React.createElement(BarChart, {
    data: barData
  }, /*#__PURE__*/React.createElement(CartesianGrid, {
    strokeDasharray: "3 3",
    stroke: "#EEE"
  }), /*#__PURE__*/React.createElement(XAxis, {
    dataKey: "month",
    tick: {
      fontSize: 10
    }
  }), /*#__PURE__*/React.createElement(YAxis, {
    tick: {
      fontSize: 10
    },
    tickFormatter: function tickFormatter(v) {
      return "".concat(Math.round(v / 10000), "\u4E07");
    }
  }), /*#__PURE__*/React.createElement(Tooltip, {
    formatter: function formatter(v) {
      return fmtYen(v);
    }
  }), /*#__PURE__*/React.createElement(Bar, {
    dataKey: "\u652F\u51FA",
    fill: colors.expense,
    radius: [4, 4, 0, 0]
  })))));
}

// 予算管理
function ExpenseBudget(_ref28) {
  var data = _ref28.data,
    updateData = _ref28.updateData,
    month = _ref28.month,
    setMonth = _ref28.setMonth,
    monthExpenses = _ref28.monthExpenses;
  var _useState23 = useState(null),
    _useState24 = _slicedToArray(_useState23, 2),
    editing = _useState24[0],
    setEditing = _useState24[1];
  var _useState25 = useState(0),
    _useState26 = _slicedToArray(_useState25, 2),
    editVal = _useState26[0],
    setEditVal = _useState26[1];
  var catTotals = {};
  monthExpenses.forEach(function (e) {
    catTotals[e.category] = (catTotals[e.category] || 0) + e.amount;
  });
  var saveBudget = function saveBudget(cat) {
    updateData(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, {
        budgets: _objectSpread(_objectSpread({}, prev.budgets), {}, _defineProperty({}, cat, editVal))
      });
    });
    setEditing(null);
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(MonthNavigator, {
    month: month,
    setMonth: setMonth
  }), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "\u30AB\u30C6\u30B4\u30EA\u5225\u4E88\u7B97\u7BA1\u7406"
  }), Object.keys(expenseCategories).map(function (cat) {
    var budget = data.budgets[cat] || 0;
    var actual = catTotals[cat] || 0;
    var over = budget > 0 && actual > budget;
    return /*#__PURE__*/React.createElement("div", {
      key: cat,
      style: {
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 4
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 6
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 8,
        height: 8,
        borderRadius: "50%",
        backgroundColor: expenseCategories[cat].color
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        fontWeight: 600
      }
    }, cat), over && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        color: colors.expense,
        fontWeight: 700
      }
    }, "\u26A0\uFE0F \u8D85\u904E")), editing === cat ? /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 4,
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("input", {
      type: "number",
      inputMode: "numeric",
      value: editVal,
      onChange: function onChange(e) {
        return setEditVal(parseNum(e.target.value));
      },
      style: {
        width: 90,
        padding: "4px 8px",
        fontSize: 13,
        border: "1px solid #CCC",
        borderRadius: 6
      }
    }), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return saveBudget(cat);
      },
      style: {
        padding: "4px 8px",
        backgroundColor: colors.income,
        color: "#fff",
        border: "none",
        borderRadius: 6,
        cursor: "pointer",
        fontSize: 12
      }
    }, "\u4FDD\u5B58")) : /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        setEditing(cat);
        setEditVal(budget);
      },
      style: {
        fontSize: 12,
        color: colors.saving,
        background: "none",
        border: "none",
        cursor: "pointer",
        textDecoration: "underline"
      }
    }, "\u4E88\u7B97: ", fmtYen(budget))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        fontSize: 11,
        color: colors.textLight,
        marginBottom: 4
      }
    }, /*#__PURE__*/React.createElement("span", null, "\u5B9F\u7E3E: ", fmtYen(actual)), /*#__PURE__*/React.createElement("span", {
      style: {
        color: over ? colors.expense : colors.textLight
      }
    }, budget > 0 ? "\u6B8B: ".concat(fmtYen(budget - actual)) : "予算未設定")), budget > 0 && /*#__PURE__*/React.createElement(ProgressBar, {
      value: actual,
      max: budget,
      color: expenseCategories[cat].color
    }));
  })));
}

// ===== フェーズ7・8: ローンタブ =====

var LOAN_TYPES = [{
  value: "car",
  label: "🚗 車"
}, {
  value: "housing",
  label: "🏠 住宅"
}, {
  value: "scholarship",
  label: "🎓 奨学金"
}, {
  value: "other",
  label: "💰 その他"
}];
var LOAN_TYPE_ICON = {
  car: "🚗",
  housing: "🏠",
  scholarship: "🎓",
  other: "💰"
};
function LoanTab(_ref29) {
  var data = _ref29.data,
    updateData = _ref29.updateData;
  var _useState27 = useState("一覧"),
    _useState28 = _slicedToArray(_useState27, 2),
    subtab = _useState28[0],
    setSubtab = _useState28[1];
  var _useState29 = useState(null),
    _useState30 = _slicedToArray(_useState29, 2),
    selectedLoan = _useState30[0],
    setSelectedLoan = _useState30[1];
  var _useState31 = useState(null),
    _useState32 = _slicedToArray(_useState31, 2),
    editingLoanId = _useState32[0],
    setEditingLoanId = _useState32[1];
  var tabs = ["一覧", "登録", "返済表", "繰上シミュ"];
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PageTitle, {
    title: "\uD83C\uDFE6 \u30ED\u30FC\u30F3\u30FB\u8FD4\u6E08"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      padding: "0 16px 12px",
      overflowX: "auto"
    }
  }, tabs.map(function (t) {
    return /*#__PURE__*/React.createElement("button", {
      key: t,
      onClick: function onClick() {
        setSubtab(t);
        if (t !== "登録") setEditingLoanId(null);
      },
      style: {
        flex: "0 0 auto",
        padding: "8px 16px",
        backgroundColor: subtab === t ? colors.loan : "#EEE",
        color: subtab === t ? "#fff" : colors.text,
        border: "none",
        borderRadius: 20,
        fontSize: 13,
        fontWeight: 600,
        cursor: "pointer"
      }
    }, t);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 16px"
    }
  }, subtab === "一覧" && /*#__PURE__*/React.createElement(LoanList, {
    data: data,
    updateData: updateData,
    setSubtab: setSubtab,
    setSelectedLoan: setSelectedLoan,
    setEditingLoanId: setEditingLoanId
  }), subtab === "登録" && /*#__PURE__*/React.createElement(LoanForm, {
    data: data,
    updateData: updateData,
    setSubtab: setSubtab,
    editingLoanId: editingLoanId,
    setEditingLoanId: setEditingLoanId
  }), subtab === "返済表" && /*#__PURE__*/React.createElement(LoanSchedule, {
    data: data,
    selectedLoan: selectedLoan,
    setSelectedLoan: setSelectedLoan
  }), subtab === "繰上シミュ" && /*#__PURE__*/React.createElement(LoanPrepay, {
    data: data,
    selectedLoan: selectedLoan,
    setSelectedLoan: setSelectedLoan
  })));
}

// ローン一覧
function LoanList(_ref30) {
  var data = _ref30.data,
    updateData = _ref30.updateData,
    setSubtab = _ref30.setSubtab,
    setSelectedLoan = _ref30.setSelectedLoan,
    setEditingLoanId = _ref30.setEditingLoanId;
  var totalBalance = data.loans.reduce(function (a, l) {
    return a + l.remainingBalance;
  }, 0);
  var totalMonthly = data.loans.reduce(function (a, l) {
    return a + l.monthlyPayment;
  }, 0);
  var del = function del(id) {
    if (window.confirm("このローンを削除しますか？")) {
      updateData(function (prev) {
        return _objectSpread(_objectSpread({}, prev), {}, {
          loans: prev.loans.filter(function (l) {
            return l.id !== id;
          })
        });
      });
    }
  };
  return /*#__PURE__*/React.createElement("div", null, data.loans.length > 0 && /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "\u30ED\u30FC\u30F3\u5408\u8A08"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      backgroundColor: "#FEF3E2",
      borderRadius: 10,
      padding: 12,
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: colors.textLight
    }
  }, "\u6B8B\u9AD8\u5408\u8A08"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 700,
      color: colors.loan
    }
  }, fmtYen(totalBalance))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      backgroundColor: "#FEF3E2",
      borderRadius: 10,
      padding: 12,
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: colors.textLight
    }
  }, "\u6708\u8FD4\u6E08\u5408\u8A08"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 700,
      color: colors.loan
    }
  }, fmtYen(totalMonthly))))), data.loans.map(function (loan) {
    var monthsLeft = loan.monthlyPayment > 0 ? Math.ceil(loan.remainingBalance / loan.monthlyPayment) : 0;
    var progress = loan.totalAmount > 0 ? (1 - loan.remainingBalance / loan.totalAmount) * 100 : 0;
    return /*#__PURE__*/React.createElement(Card, {
      key: loan.id
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 8
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 20,
        marginRight: 6
      }
    }, LOAN_TYPE_ICON[loan.type] || "💰"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 16,
        fontWeight: 700
      }
    }, loan.name)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        setEditingLoanId(loan.id);
        setSubtab("登録");
      },
      style: {
        background: "none",
        border: "none",
        color: colors.saving,
        cursor: "pointer",
        fontSize: 16
      }
    }, "\u270F\uFE0F"), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return del(loan.id);
      },
      style: {
        background: "none",
        border: "none",
        color: colors.expense,
        cursor: "pointer",
        fontSize: 16
      }
    }, "\uD83D\uDDD1"))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 4
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        color: colors.textLight
      }
    }, "\u6B8B\u9AD8"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 20,
        fontWeight: 800,
        color: colors.loan
      }
    }, fmtYen(loan.remainingBalance))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 16,
        marginBottom: 8
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: colors.textLight
      }
    }, "\u6708\u8FD4\u6E08: ", /*#__PURE__*/React.createElement("strong", null, fmtYen(loan.monthlyPayment))), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: colors.textLight
      }
    }, "\u5E74\u5229: ", /*#__PURE__*/React.createElement("strong", null, loan.interestRate, "%")), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: colors.textLight
      }
    }, "\u6B8B\u308A: ", /*#__PURE__*/React.createElement("strong", null, monthsLeft, "\u56DE"))), /*#__PURE__*/React.createElement(ProgressBar, {
      value: progress,
      max: 100,
      color: colors.loan,
      showPercent: false
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: colors.textLight,
        marginTop: 4,
        textAlign: "right"
      }
    }, "\u8FD4\u6E08\u5B8C\u4E86 ", Math.round(progress), "%"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8,
        marginTop: 8
      }
    }, /*#__PURE__*/React.createElement(OutlineButton, {
      color: colors.loan,
      style: {
        flex: 1,
        fontSize: 12
      },
      onClick: function onClick() {
        setSelectedLoan(loan.id);
        setSubtab("返済表");
      }
    }, "\u8FD4\u6E08\u8868\u3092\u898B\u308B"), /*#__PURE__*/React.createElement(OutlineButton, {
      color: colors.saving,
      style: {
        flex: 1,
        fontSize: 12
      },
      onClick: function onClick() {
        setSelectedLoan(loan.id);
        setSubtab("繰上シミュ");
      }
    }, "\u7E70\u4E0A\u30B7\u30DF\u30E5")));
  }), /*#__PURE__*/React.createElement(PrimaryButton, {
    color: colors.loan,
    onClick: function onClick() {
      return setSubtab("登録");
    }
  }, "\uFF0B \u30ED\u30FC\u30F3\u3092\u767B\u9332\u3059\u308B"));
}

// ローン登録・編集フォーム（editingLoanId があれば編集モード）
function LoanForm(_ref31) {
  var data = _ref31.data,
    updateData = _ref31.updateData,
    setSubtab = _ref31.setSubtab,
    editingLoanId = _ref31.editingLoanId,
    setEditingLoanId = _ref31.setEditingLoanId;
  var editTarget = editingLoanId ? data.loans.find(function (l) {
    return l.id === editingLoanId;
  }) : null;
  var isEdit = !!editTarget;
  var _useState33 = useState(editTarget ? _objectSpread({}, editTarget) : {
      type: "car",
      name: "",
      totalAmount: 0,
      remainingBalance: 0,
      monthlyPayment: 0,
      interestRate: 0,
      startDate: "",
      endDate: "",
      memo: ""
    }),
    _useState34 = _slicedToArray(_useState33, 2),
    form = _useState34[0],
    setForm = _useState34[1];
  var _useState35 = useState(false),
    _useState36 = _slicedToArray(_useState35, 2),
    saved = _useState36[0],
    setSaved = _useState36[1];

  // 編集対象が切り替わったらフォームを再初期化
  useEffect(function () {
    if (editTarget) setForm(_objectSpread({}, editTarget));
  }, [editingLoanId]);
  var save = function save() {
    if (!form.name || !form.remainingBalance) return;
    if (isEdit) {
      updateData(function (prev) {
        return _objectSpread(_objectSpread({}, prev), {}, {
          loans: prev.loans.map(function (l) {
            return l.id === editingLoanId ? _objectSpread(_objectSpread({}, l), form) : l;
          })
        });
      });
    } else {
      updateData(function (prev) {
        return _objectSpread(_objectSpread({}, prev), {}, {
          loans: [].concat(_toConsumableArray(prev.loans), [_objectSpread(_objectSpread({}, form), {}, {
            id: genId(),
            payments: []
          })])
        });
      });
    }
    setSaved(true);
    setTimeout(function () {
      setSaved(false);
      setEditingLoanId(null);
      setSubtab("一覧");
    }, 1000);
  };
  var F = function F(field) {
    return function (v) {
      return setForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, _defineProperty({}, field, v));
      });
    };
  };
  return /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(SectionHeader, {
    title: isEdit ? "\u270F\uFE0F ".concat(form.name, " \u3092\u7DE8\u96C6") : "ローン登録",
    color: colors.loan
  }), /*#__PURE__*/React.createElement(SelectInput, {
    label: "\u30ED\u30FC\u30F3\u7A2E\u985E",
    value: form.type,
    onChange: F("type"),
    options: LOAN_TYPES
  }), /*#__PURE__*/React.createElement(TextInput, {
    label: "\u30ED\u30FC\u30F3\u540D\uFF08\u4F8B: \u30C8\u30E8\u30BF\u30D5\u30A1\u30A4\u30CA\u30F3\u30B9\uFF09",
    value: form.name,
    onChange: F("name"),
    placeholder: "\u30ED\u30FC\u30F3\u540D"
  }), /*#__PURE__*/React.createElement(AmountInput, {
    label: "\u501F\u5165\u7DCF\u984D",
    value: form.totalAmount,
    onChange: F("totalAmount")
  }), /*#__PURE__*/React.createElement(AmountInput, {
    label: "\u73FE\u5728\u306E\u6B8B\u9AD8",
    value: form.remainingBalance,
    onChange: F("remainingBalance")
  }), /*#__PURE__*/React.createElement(AmountInput, {
    label: "\u6708\u3005\u8FD4\u6E08\u984D",
    value: form.monthlyPayment,
    onChange: F("monthlyPayment")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 12,
      color: colors.textLight,
      display: "block",
      marginBottom: 4
    }
  }, "\u5E74\u5229\uFF08%\uFF09"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    inputMode: "decimal",
    value: form.interestRate || "",
    onChange: function onChange(e) {
      return F("interestRate")(parseFloat(e.target.value) || 0);
    },
    placeholder: "\u4F8B: 2.5",
    style: {
      width: "100%",
      padding: 12,
      fontSize: 16,
      border: "1.5px solid #E0E0E0",
      borderRadius: 10,
      boxSizing: "border-box",
      backgroundColor: "#FAFAFA"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 12,
      color: colors.textLight,
      display: "block",
      marginBottom: 4
    }
  }, "\u501F\u5165\u958B\u59CB\u65E5"), /*#__PURE__*/React.createElement("input", {
    type: "month",
    value: form.startDate,
    onChange: function onChange(e) {
      return F("startDate")(e.target.value);
    },
    style: {
      width: "100%",
      padding: 12,
      fontSize: 16,
      border: "1.5px solid #E0E0E0",
      borderRadius: 10,
      boxSizing: "border-box",
      backgroundColor: "#FAFAFA"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 12,
      color: colors.textLight,
      display: "block",
      marginBottom: 4
    }
  }, "\u5B8C\u6E08\u4E88\u5B9A\u65E5"), /*#__PURE__*/React.createElement("input", {
    type: "month",
    value: form.endDate,
    onChange: function onChange(e) {
      return F("endDate")(e.target.value);
    },
    style: {
      width: "100%",
      padding: 12,
      fontSize: 16,
      border: "1.5px solid #E0E0E0",
      borderRadius: 10,
      boxSizing: "border-box",
      backgroundColor: "#FAFAFA"
    }
  }))), /*#__PURE__*/React.createElement(TextInput, {
    label: "\u30E1\u30E2",
    value: form.memo,
    onChange: F("memo"),
    placeholder: "\u30E1\u30E2\uFF08\u4EFB\u610F\uFF09"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(PrimaryButton, {
    onClick: save,
    color: saved ? colors.neutral : colors.loan,
    style: {
      flex: 1
    }
  }, saved ? "✅ 保存しました" : isEdit ? "変更を保存する" : "登録する"), isEdit && /*#__PURE__*/React.createElement(OutlineButton, {
    onClick: function onClick() {
      setEditingLoanId(null);
      setSubtab("一覧");
    },
    color: colors.neutral,
    style: {
      flex: 1
    }
  }, "\u30AD\u30E3\u30F3\u30BB\u30EB")));
}

// 返済スケジュール表
function LoanSchedule(_ref32) {
  var data = _ref32.data,
    selectedLoan = _ref32.selectedLoan,
    setSelectedLoan = _ref32.setSelectedLoan;
  var loan = data.loans.find(function (l) {
    return l.id === selectedLoan;
  }) || data.loans[0];
  if (!loan) return /*#__PURE__*/React.createElement(EmptyState, {
    message: "\u30ED\u30FC\u30F3\u304C\u767B\u9332\u3055\u308C\u3066\u3044\u307E\u305B\u3093"
  });

  // 返済スケジュール計算
  var schedule = function () {
    var rows = [];
    var balance = loan.remainingBalance;
    var monthlyRate = loan.interestRate / 100 / 12;
    var payment = loan.monthlyPayment;
    var month = new Date();
    for (var i = 1; balance > 0 && i <= 600; i++) {
      var interest = Math.round(balance * monthlyRate);
      var principal = Math.min(payment - interest, balance);
      var actualPayment = Math.min(payment, balance + interest);
      balance = Math.max(0, balance - principal);
      var dateStr = "".concat(month.getFullYear(), "/").concat(String(month.getMonth() + 1).padStart(2, "0"));
      rows.push({
        no: i,
        date: dateStr,
        payment: actualPayment,
        principal: principal,
        interest: interest,
        balance: balance
      });
      month = new Date(month.getFullYear(), month.getMonth() + 1, 1);
      if (balance <= 0) break;
    }
    return rows;
  }();
  var totalInterest = schedule.reduce(function (a, r) {
    return a + r.interest;
  }, 0);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SelectInput, {
    label: "\u30ED\u30FC\u30F3\u3092\u9078\u629E",
    value: loan.id,
    onChange: function onChange(v) {
      return setSelectedLoan(v);
    },
    options: data.loans.map(function (l) {
      return {
        value: l.id,
        label: "".concat(LOAN_TYPE_ICON[l.type], " ").concat(l.name)
      };
    })
  }), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "".concat(LOAN_TYPE_ICON[loan.type], " ").concat(loan.name),
    color: colors.loan
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: colors.textLight
    }
  }, "\u6B8B\u9AD8"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18,
      fontWeight: 700,
      color: colors.loan
    }
  }, fmtYen(loan.remainingBalance))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: colors.textLight
    }
  }, "\u7DCF\u5229\u606F"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      color: colors.expense
    }
  }, fmtYen(totalInterest))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: colors.textLight
    }
  }, "\u5B8C\u6E08\u307E\u3067"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      fontWeight: 700
    }
  }, schedule.length, "\u56DE\uFF08", Math.floor(schedule.length / 12), "\u5E74", schedule.length % 12, "\u30F6\u6708\uFF09"))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "\u8FD4\u6E08\u30B9\u30B1\u30B8\u30E5\u30FC\u30EB"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: "auto"
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      fontSize: 12
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      backgroundColor: "#F5F5F5"
    }
  }, ["回", "日付", "返済額", "元金", "利息", "残高"].map(function (h) {
    return /*#__PURE__*/React.createElement("th", {
      key: h,
      style: {
        padding: "6px 4px",
        textAlign: "right",
        color: colors.textLight,
        fontWeight: 600
      }
    }, h);
  }))), /*#__PURE__*/React.createElement("tbody", null, schedule.slice(0, 60).map(function (r) {
    return /*#__PURE__*/React.createElement("tr", {
      key: r.no,
      style: {
        borderBottom: "1px solid #F0F0F0"
      }
    }, /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "6px 4px",
        textAlign: "right",
        color: colors.textLight
      }
    }, r.no), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "6px 4px",
        textAlign: "right"
      }
    }, r.date), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "6px 4px",
        textAlign: "right",
        fontWeight: 600
      }
    }, fmt(r.payment)), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "6px 4px",
        textAlign: "right",
        color: colors.saving
      }
    }, fmt(r.principal)), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "6px 4px",
        textAlign: "right",
        color: colors.expense
      }
    }, fmt(r.interest)), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "6px 4px",
        textAlign: "right"
      }
    }, fmt(r.balance)));
  }))), schedule.length > 60 && /*#__PURE__*/React.createElement("p", {
    style: {
      textAlign: "center",
      color: colors.textLight,
      fontSize: 12,
      margin: "8px 0"
    }
  }, "\uFF08\u4EE5\u964D", schedule.length - 60, "\u56DE\u5206\u306F\u7701\u7565\uFF09"))));
}

// 繰上返済シミュレーター
function LoanPrepay(_ref33) {
  var data = _ref33.data,
    selectedLoan = _ref33.selectedLoan,
    setSelectedLoan = _ref33.setSelectedLoan;
  var _useState37 = useState(0),
    _useState38 = _slicedToArray(_useState37, 2),
    prepayAmount = _useState38[0],
    setPrepayAmount = _useState38[1];
  var _useState39 = useState(null),
    _useState40 = _slicedToArray(_useState39, 2),
    result = _useState40[0],
    setResult = _useState40[1];
  var loan = data.loans.find(function (l) {
    return l.id === selectedLoan;
  }) || data.loans[0];
  if (!loan) return /*#__PURE__*/React.createElement(EmptyState, {
    message: "\u30ED\u30FC\u30F3\u304C\u767B\u9332\u3055\u308C\u3066\u3044\u307E\u305B\u3093"
  });
  var calcSchedule = function calcSchedule(balance, monthly, annualRate) {
    var monthlyRate = annualRate / 100 / 12;
    var rows = 0;
    var totalInterest = 0;
    while (balance > 0 && rows < 600) {
      var interest = Math.round(balance * monthlyRate);
      var principal = Math.min(monthly - interest, balance);
      if (principal <= 0) break;
      balance = Math.max(0, balance - principal);
      totalInterest += interest;
      rows++;
    }
    return {
      months: rows,
      totalInterest: totalInterest
    };
  };
  var simulate = function simulate() {
    var orig = calcSchedule(loan.remainingBalance, loan.monthlyPayment, loan.interestRate);
    var after = calcSchedule(Math.max(0, loan.remainingBalance - prepayAmount), loan.monthlyPayment, loan.interestRate);
    setResult({
      origMonths: orig.months,
      afterMonths: after.months,
      savedMonths: orig.months - after.months,
      savedInterest: orig.totalInterest - after.totalInterest
    });
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SelectInput, {
    label: "\u30ED\u30FC\u30F3\u3092\u9078\u629E",
    value: loan.id,
    onChange: function onChange(v) {
      return setSelectedLoan(v);
    },
    options: data.loans.map(function (l) {
      return {
        value: l.id,
        label: "".concat(LOAN_TYPE_ICON[l.type], " ").concat(l.name)
      };
    })
  }), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "\u7E70\u4E0A\u8FD4\u6E08\u30B7\u30DF\u30E5\u30EC\u30FC\u30BF\u30FC",
    color: colors.saving
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: colors.textLight
    }
  }, "\u6B8B\u9AD8: "), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 16,
      fontWeight: 700,
      color: colors.loan
    }
  }, fmtYen(loan.remainingBalance))), /*#__PURE__*/React.createElement(AmountInput, {
    label: "\u7E70\u4E0A\u8FD4\u6E08\u984D",
    value: prepayAmount,
    onChange: setPrepayAmount
  }), /*#__PURE__*/React.createElement(PrimaryButton, {
    onClick: simulate,
    color: colors.saving
  }, "\u30B7\u30DF\u30E5\u30EC\u30FC\u30B7\u30E7\u30F3\u5B9F\u884C"), result && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement(Divider, null), /*#__PURE__*/React.createElement("div", {
    style: {
      backgroundColor: "#EBF5FB",
      borderRadius: 10,
      padding: 12,
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: colors.saving,
      marginBottom: 8
    }
  }, "\uD83D\uDCCA \u30B7\u30DF\u30E5\u30EC\u30FC\u30B7\u30E7\u30F3\u7D50\u679C"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: colors.textLight
    }
  }, "\u73FE\u5728\u306E\u5B8C\u6E08\u307E\u3067"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 600
    }
  }, result.origMonths, "\u30F6\u6708")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: colors.textLight
    }
  }, "\u7E70\u4E0A\u5F8C\u306E\u5B8C\u6E08\u307E\u3067"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: colors.income
    }
  }, result.afterMonths, "\u30F6\u6708")), /*#__PURE__*/React.createElement(Divider, null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: colors.income
    }
  }, "\u77ED\u7E2E\u671F\u9593"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18,
      fontWeight: 800,
      color: colors.income
    }
  }, "\u25B2", result.savedMonths, "\u30F6\u6708")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: colors.income
    }
  }, "\u5229\u606F\u7BC0\u7D04\u984D"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18,
      fontWeight: 800,
      color: colors.income
    }
  }, fmtYen(result.savedInterest)))))), data.loans.length > 1 && /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "\u8FD4\u6E08\u512A\u5148\u5EA6\u30A2\u30C9\u30D0\u30A4\u30B9",
    color: colors.loan
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: colors.textLight,
      marginBottom: 8
    }
  }, "\uD83D\uDCA1 \u91D1\u5229\u306E\u9AD8\u3044\u30ED\u30FC\u30F3\u304B\u3089\u8FD4\u6E08\u3059\u308B\u300C\u30A2\u30D0\u30E9\u30F3\u30C1\u6CD5\u300D\u304C\u5229\u606F\u7BC0\u7D04\u306B\u52B9\u679C\u7684\u3067\u3059\u3002"), _toConsumableArray(data.loans).sort(function (a, b) {
    return b.interestRate - a.interestRate;
  }).map(function (l, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: l.id,
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "8px 0",
        borderBottom: "1px solid #F0F0F0"
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        fontWeight: 600,
        color: i === 0 ? colors.expense : colors.text
      }
    }, i + 1, "\u4F4D ", LOAN_TYPE_ICON[l.type], " ", l.name), i === 0 && /*#__PURE__*/React.createElement(Badge, {
      label: "\u6700\u512A\u5148",
      bgColor: colors.expense,
      style: {
        marginLeft: 6
      }
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        color: colors.loan
      }
    }, "\u5E74\u5229", l.interestRate, "%"));
  })));
}

// ===== フェーズ9〜11: 資産タブ =====

var ASSET_SUBTABS = ["銀行・現金", "NISA", "iDeCo", "変額年金", "総資産"];
function AssetTab(_ref34) {
  var data = _ref34.data,
    updateData = _ref34.updateData;
  var _useState41 = useState("銀行・現金"),
    _useState42 = _slicedToArray(_useState41, 2),
    subtab = _useState42[0],
    setSubtab = _useState42[1];
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PageTitle, {
    title: "\uD83D\uDCC8 \u8CC7\u7523\u7BA1\u7406"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      padding: "0 16px 12px",
      overflowX: "auto"
    }
  }, ASSET_SUBTABS.map(function (t) {
    return /*#__PURE__*/React.createElement("button", {
      key: t,
      onClick: function onClick() {
        return setSubtab(t);
      },
      style: {
        flex: "0 0 auto",
        padding: "8px 12px",
        backgroundColor: subtab === t ? colors.asset : "#EEE",
        color: subtab === t ? "#fff" : colors.text,
        border: t === "総資産" ? "2px solid ".concat(colors.asset) : "2px solid transparent",
        borderRadius: 20,
        fontSize: 12,
        fontWeight: t === "総資産" ? 800 : 600,
        cursor: "pointer"
      }
    }, t);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 16px"
    }
  }, subtab === "銀行・現金" && /*#__PURE__*/React.createElement(BankTab, {
    data: data,
    updateData: updateData
  }), subtab === "NISA" && /*#__PURE__*/React.createElement(NisaTab, {
    data: data,
    updateData: updateData
  }), subtab === "iDeCo" && /*#__PURE__*/React.createElement(IdecoTab, {
    data: data,
    updateData: updateData
  }), subtab === "変額年金" && /*#__PURE__*/React.createElement(AnnuityTab, {
    data: data,
    updateData: updateData
  }), subtab === "総資産" && /*#__PURE__*/React.createElement(NetWorthTab, {
    data: data
  })));
}

// 銀行・現金
function BankTab(_ref35) {
  var data = _ref35.data,
    updateData = _ref35.updateData;
  var _useState43 = useState(false),
    _useState44 = _slicedToArray(_useState43, 2),
    showAdd = _useState44[0],
    setShowAdd = _useState44[1];
  var _useState45 = useState({
      name: "",
      balance: 0,
      type: "普通",
      memo: ""
    }),
    _useState46 = _slicedToArray(_useState45, 2),
    form = _useState46[0],
    setForm = _useState46[1];
  var accounts = data.assets.bankAccounts || [];
  var total = accounts.reduce(function (a, b) {
    return a + b.balance;
  }, 0);
  var add = function add() {
    if (!form.name) return;
    updateData(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, {
        assets: _objectSpread(_objectSpread({}, prev.assets), {}, {
          bankAccounts: [].concat(_toConsumableArray(prev.assets.bankAccounts || []), [_objectSpread(_objectSpread({}, form), {}, {
            id: genId()
          })])
        })
      });
    });
    setForm({
      name: "",
      balance: 0,
      type: "普通",
      memo: ""
    });
    setShowAdd(false);
  };
  var del = function del(id) {
    return updateData(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, {
        assets: _objectSpread(_objectSpread({}, prev.assets), {}, {
          bankAccounts: prev.assets.bankAccounts.filter(function (a) {
            return a.id !== id;
          })
        })
      });
    });
  };
  var update = function update(id, field, val) {
    return updateData(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, {
        assets: _objectSpread(_objectSpread({}, prev.assets), {}, {
          bankAccounts: prev.assets.bankAccounts.map(function (a) {
            return a.id === id ? _objectSpread(_objectSpread({}, a), {}, _defineProperty({}, field, val)) : a;
          })
        })
      });
    });
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: colors.textLight
    }
  }, "\u73FE\u91D1\u30FB\u9810\u91D1\u5408\u8A08"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 24,
      fontWeight: 800,
      color: colors.asset
    }
  }, fmtYen(total)))), accounts.map(function (acc) {
    return /*#__PURE__*/React.createElement(Card, {
      key: acc.id
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start"
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 15,
        fontWeight: 700
      }
    }, acc.name), /*#__PURE__*/React.createElement(Badge, {
      label: acc.type,
      bgColor: colors.asset,
      style: {
        marginTop: 4
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "right"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 20,
        fontWeight: 800,
        color: colors.asset
      }
    }, fmtYen(acc.balance)), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return del(acc.id);
      },
      style: {
        fontSize: 11,
        color: colors.expense,
        background: "none",
        border: "none",
        cursor: "pointer",
        marginTop: 4
      }
    }, "\u524A\u9664"))));
  }), showAdd ? /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "\u53E3\u5EA7\u8FFD\u52A0"
  }), /*#__PURE__*/React.createElement(TextInput, {
    label: "\u9280\u884C\u540D\u30FB\u53E3\u5EA7\u540D",
    value: form.name,
    onChange: function onChange(v) {
      return setForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          name: v
        });
      });
    },
    placeholder: "\u4F8B: \u4E09\u83F1UFJ \u666E\u901A"
  }), /*#__PURE__*/React.createElement(AmountInput, {
    label: "\u6B8B\u9AD8",
    value: form.balance,
    onChange: function onChange(v) {
      return setForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          balance: v
        });
      });
    }
  }), /*#__PURE__*/React.createElement(SelectInput, {
    label: "\u7A2E\u5225",
    value: form.type,
    onChange: function onChange(v) {
      return setForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          type: v
        });
      });
    },
    options: ["普通", "定期", "積立", "MMF", "その他"]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(PrimaryButton, {
    onClick: add,
    color: colors.asset,
    style: {
      flex: 1
    }
  }, "\u8FFD\u52A0"), /*#__PURE__*/React.createElement(OutlineButton, {
    onClick: function onClick() {
      return setShowAdd(false);
    },
    color: colors.neutral,
    style: {
      flex: 1
    }
  }, "\u30AD\u30E3\u30F3\u30BB\u30EB"))) : /*#__PURE__*/React.createElement(PrimaryButton, {
    onClick: function onClick() {
      return setShowAdd(true);
    },
    color: colors.asset
  }, "\uFF0B \u53E3\u5EA7\u3092\u8FFD\u52A0"));
}

// 株式・投信
function InvestTab(_ref36) {
  var data = _ref36.data,
    updateData = _ref36.updateData;
  var _useState47 = useState(false),
    _useState48 = _slicedToArray(_useState47, 2),
    showAdd = _useState48[0],
    setShowAdd = _useState48[1];
  var _useState49 = useState({
      name: "",
      type: "fund",
      account: "NISA",
      purchasePrice: 0,
      quantity: 0,
      currentPrice: 0,
      purchaseDate: "",
      memo: ""
    }),
    _useState50 = _slicedToArray(_useState49, 2),
    form = _useState50[0],
    setForm = _useState50[1];
  var investments = data.assets.investments || [];
  var totalValue = investments.reduce(function (a, inv) {
    return a + inv.currentPrice * inv.quantity;
  }, 0);
  var totalCost = investments.reduce(function (a, inv) {
    return a + inv.purchasePrice * inv.quantity;
  }, 0);
  var totalPnl = totalValue - totalCost;
  var add = function add() {
    if (!form.name) return;
    updateData(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, {
        assets: _objectSpread(_objectSpread({}, prev.assets), {}, {
          investments: [].concat(_toConsumableArray(prev.assets.investments || []), [_objectSpread(_objectSpread({}, form), {}, {
            id: genId()
          })])
        })
      });
    });
    setForm({
      name: "",
      type: "fund",
      account: "NISA",
      purchasePrice: 0,
      quantity: 0,
      currentPrice: 0,
      purchaseDate: "",
      memo: ""
    });
    setShowAdd(false);
  };
  var del = function del(id) {
    return updateData(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, {
        assets: _objectSpread(_objectSpread({}, prev.assets), {}, {
          investments: prev.assets.investments.filter(function (i) {
            return i.id !== id;
          })
        })
      });
    });
  };
  var TYPE_LABELS = {
    stock: "株式",
    fund: "投信",
    etf: "ETF",
    reit: "REIT",
    crypto: "暗号資産",
    other: "その他"
  };
  var F = function F(field) {
    return function (v) {
      return setForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, _defineProperty({}, field, v));
      });
    };
  };
  return /*#__PURE__*/React.createElement("div", null, investments.length > 0 && /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "\u6295\u8CC7\u8CC7\u7523\u5408\u8A08"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: colors.textLight
    }
  }, "\u8A55\u4FA1\u984D\u5408\u8A08"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 20,
      fontWeight: 800,
      color: colors.asset
    }
  }, fmtYen(totalValue))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: colors.textLight
    }
  }, "\u53D6\u5F97\u984D\u5408\u8A08"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 600
    }
  }, fmtYen(totalCost))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 700
    }
  }, "\u542B\u307F\u640D\u76CA"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18,
      fontWeight: 800,
      color: totalPnl >= 0 ? colors.income : colors.expense
    }
  }, totalPnl >= 0 ? "+" : "", fmtYen(totalPnl), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      marginLeft: 4
    }
  }, "(", totalCost > 0 ? (totalPnl / totalCost * 100).toFixed(1) : 0, "%)")))), investments.map(function (inv) {
    var value = inv.currentPrice * inv.quantity;
    var cost = inv.purchasePrice * inv.quantity;
    var pnl = value - cost;
    var pct = cost > 0 ? (pnl / cost * 100).toFixed(1) : 0;
    return /*#__PURE__*/React.createElement(Card, {
      key: inv.id
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 6
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 15,
        fontWeight: 700
      }
    }, "\uD83D\uDCC8 ", inv.name), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 4,
        marginTop: 4
      }
    }, /*#__PURE__*/React.createElement(Badge, {
      label: TYPE_LABELS[inv.type] || inv.type,
      bgColor: colors.saving
    }), /*#__PURE__*/React.createElement(Badge, {
      label: inv.account,
      bgColor: colors.asset
    }))), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return del(inv.id);
      },
      style: {
        fontSize: 11,
        color: colors.expense,
        background: "none",
        border: "none",
        cursor: "pointer"
      }
    }, "\u524A\u9664")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 2
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        color: colors.textLight
      }
    }, "\u8A55\u4FA1\u984D"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 18,
        fontWeight: 700,
        color: colors.asset
      }
    }, fmtYen(value))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 2
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: colors.textLight
      }
    }, "\u53D6\u5F97\u5358\u4FA1 \xA5", fmt(inv.purchasePrice), " \xD7 ", fmt(inv.quantity), "\u53E3"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        fontWeight: 700,
        color: pnl >= 0 ? colors.income : colors.expense
      }
    }, pnl >= 0 ? "+" : "", fmtYen(pnl), " (", pct, "%)")));
  }), showAdd ? /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "\u9298\u67C4\u8FFD\u52A0"
  }), /*#__PURE__*/React.createElement(TextInput, {
    label: "\u9298\u67C4\u540D\u30FB\u30D5\u30A1\u30F3\u30C9\u540D",
    value: form.name,
    onChange: F("name"),
    placeholder: "\u4F8B: eMAXIS Slim \u5168\u4E16\u754C\u682A\u5F0F"
  }), /*#__PURE__*/React.createElement(SelectInput, {
    label: "\u7A2E\u985E",
    value: form.type,
    onChange: F("type"),
    options: [{
      value: "stock",
      label: "株式"
    }, {
      value: "fund",
      label: "投資信託"
    }, {
      value: "etf",
      label: "ETF"
    }, {
      value: "reit",
      label: "REIT"
    }, {
      value: "crypto",
      label: "暗号資産"
    }, {
      value: "other",
      label: "その他"
    }]
  }), /*#__PURE__*/React.createElement(SelectInput, {
    label: "\u53E3\u5EA7",
    value: form.account,
    onChange: F("account"),
    options: ["NISA（つみたて）", "NISA（成長）", "iDeCo", "特定", "一般", "その他"]
  }), /*#__PURE__*/React.createElement(AmountInput, {
    label: "\u53D6\u5F97\u5358\u4FA1\uFF081\u53E3\u3042\u305F\u308A\uFF09",
    value: form.purchasePrice,
    onChange: F("purchasePrice")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 12,
      color: colors.textLight,
      display: "block",
      marginBottom: 4
    }
  }, "\u4FDD\u6709\u53E3\u6570"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    inputMode: "numeric",
    value: form.quantity || "",
    onChange: function onChange(e) {
      return F("quantity")(parseNum(e.target.value));
    },
    style: {
      width: "100%",
      padding: 12,
      fontSize: 16,
      border: "1.5px solid #E0E0E0",
      borderRadius: 10,
      boxSizing: "border-box",
      backgroundColor: "#FAFAFA"
    }
  })), /*#__PURE__*/React.createElement(AmountInput, {
    label: "\u73FE\u5728\u4FA1\u683C\uFF081\u53E3\u3042\u305F\u308A\uFF09",
    value: form.currentPrice,
    onChange: F("currentPrice")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(PrimaryButton, {
    onClick: add,
    color: colors.asset,
    style: {
      flex: 1
    }
  }, "\u8FFD\u52A0"), /*#__PURE__*/React.createElement(OutlineButton, {
    onClick: function onClick() {
      return setShowAdd(false);
    },
    color: colors.neutral,
    style: {
      flex: 1
    }
  }, "\u30AD\u30E3\u30F3\u30BB\u30EB"))) : /*#__PURE__*/React.createElement(PrimaryButton, {
    onClick: function onClick() {
      return setShowAdd(true);
    },
    color: colors.asset
  }, "\uFF0B \u9298\u67C4\u3092\u8FFD\u52A0"));
}

// NISA管理（投信登録・枠管理・総資産連携）
function NisaTab(_ref37) {
  var data = _ref37.data,
    updateData = _ref37.updateData;
  var nisa = data.assets.nisa || {};
  var year = nisa.year || new Date().getFullYear();
  var LIMITS = {
    tsumitate: 1200000,
    growth: 2400000,
    lifetime: 18000000
  };
  var investments = nisa.investments || [];
  var _useState51 = useState(false),
    _useState52 = _slicedToArray(_useState51, 2),
    showAdd = _useState52[0],
    setShowAdd = _useState52[1];
  var _useState53 = useState({
      name: "",
      nisaType: "つみたて",
      purchasePrice: 0,
      quantity: 0,
      currentPrice: 0,
      memo: ""
    }),
    _useState54 = _slicedToArray(_useState53, 2),
    form = _useState54[0],
    setForm = _useState54[1];

  // 枠使用額：登録銘柄の取得額合計から自動計算
  var tsumitateUsed = investments.filter(function (i) {
    return i.nisaType === "つみたて";
  }).reduce(function (a, i) {
    return a + i.purchasePrice * i.quantity;
  }, 0);
  var growthUsed = investments.filter(function (i) {
    return i.nisaType === "成長";
  }).reduce(function (a, i) {
    return a + i.purchasePrice * i.quantity;
  }, 0);
  var lifetimeUsed = tsumitateUsed + growthUsed;

  // 評価額合計
  var totalValue = investments.reduce(function (a, i) {
    return a + i.currentPrice * i.quantity;
  }, 0);
  var totalCost = investments.reduce(function (a, i) {
    return a + i.purchasePrice * i.quantity;
  }, 0);
  var totalPnl = totalValue - totalCost;
  var updateNisa = function updateNisa(obj) {
    return updateData(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, {
        assets: _objectSpread(_objectSpread({}, prev.assets), {}, {
          nisa: _objectSpread(_objectSpread({}, prev.assets.nisa), obj)
        })
      });
    });
  };
  var addInvestment = function addInvestment() {
    if (!form.name) return;
    updateNisa({
      investments: [].concat(_toConsumableArray(investments), [_objectSpread(_objectSpread({}, form), {}, {
        id: genId()
      })])
    });
    setForm({
      name: "",
      nisaType: "つみたて",
      purchasePrice: 0,
      quantity: 0,
      currentPrice: 0,
      memo: ""
    });
    setShowAdd(false);
  };
  var delInvestment = function delInvestment(id) {
    return updateNisa({
      investments: investments.filter(function (i) {
        return i.id !== id;
      })
    });
  };
  var F = function F(field) {
    return function (v) {
      return setForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, _defineProperty({}, field, v));
      });
    };
  };
  var sections = [{
    label: "つみたて投資枠",
    used: tsumitateUsed,
    limit: LIMITS.tsumitate,
    color: colors.income
  }, {
    label: "成長投資枠",
    used: growthUsed,
    limit: LIMITS.growth,
    color: colors.saving
  }, {
    label: "生涯非課税枠",
    used: lifetimeUsed,
    limit: LIMITS.lifetime,
    color: colors.asset
  }];
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Card, {
    style: {
      backgroundColor: "#F0FFF4",
      border: "2px solid ".concat(colors.income)
    }
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "".concat(year, "\u5E74 NISA\u67A0\u7BA1\u7406"),
    color: colors.income
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: colors.textLight,
      marginBottom: 12
    }
  }, "\u203B \u67A0\u4F7F\u7528\u984D\u306F\u767B\u9332\u9298\u67C4\u306E\u53D6\u5F97\u984D\u304B\u3089\u81EA\u52D5\u8A08\u7B97\u3002\u751F\u6DAF\u67A0\u306F\u3064\u307F\u305F\u3066\uFF0B\u6210\u9577\u306E\u5408\u8A08\u3067\u3059\u3002"), sections.map(function (_ref38) {
    var label = _ref38.label,
      used = _ref38.used,
      limit = _ref38.limit,
      color = _ref38.color;
    var remaining = limit - used;
    return /*#__PURE__*/React.createElement("div", {
      key: label,
      style: {
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 4
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        fontWeight: 700,
        color: color
      }
    }, label), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: colors.textLight
      }
    }, "\u4E0A\u9650: ", fmtYen(limit))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        fontSize: 12,
        marginBottom: 4
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: colors.textLight
      }
    }, "\u4F7F\u7528\u6E08\u307F: ", fmtYen(used)), /*#__PURE__*/React.createElement("span", {
      style: {
        color: remaining >= 0 ? colors.income : colors.expense,
        fontWeight: 600
      }
    }, "\u6B8B\u308A: ", fmtYen(Math.max(0, remaining)))), /*#__PURE__*/React.createElement(ProgressBar, {
      value: used,
      max: limit,
      color: color
    }));
  })), investments.length > 0 && /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "\u4FDD\u6709\u9298\u67C4 \u8A55\u4FA1\u30B5\u30DE\u30EA\u30FC",
    color: colors.income
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: colors.textLight
    }
  }, "\u8A55\u4FA1\u984D\u5408\u8A08"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 22,
      fontWeight: 800,
      color: colors.income
    }
  }, fmtYen(totalValue))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: colors.textLight
    }
  }, "\u53D6\u5F97\u984D\u5408\u8A08"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 600
    }
  }, fmtYen(totalCost))), /*#__PURE__*/React.createElement(Divider, null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 700
    }
  }, "\u542B\u307F\u640D\u76CA"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18,
      fontWeight: 800,
      color: totalPnl >= 0 ? colors.income : colors.expense
    }
  }, totalPnl >= 0 ? "+" : "", fmtYen(totalPnl), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      marginLeft: 4
    }
  }, "(", totalCost > 0 ? (totalPnl / totalCost * 100).toFixed(1) : 0, "%)")))), investments.map(function (inv) {
    var value = inv.currentPrice * inv.quantity;
    var cost = inv.purchasePrice * inv.quantity;
    var pnl = value - cost;
    var pct = cost > 0 ? (pnl / cost * 100).toFixed(1) : 0;
    return /*#__PURE__*/React.createElement(Card, {
      key: inv.id
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 6
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 15,
        fontWeight: 700
      }
    }, inv.name), /*#__PURE__*/React.createElement(Badge, {
      label: inv.nisaType === "つみたて" ? "つみたて投資枠" : "成長投資枠",
      bgColor: inv.nisaType === "つみたて" ? colors.income : colors.saving,
      style: {
        marginTop: 4
      }
    })), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return delInvestment(inv.id);
      },
      style: {
        background: "none",
        border: "none",
        color: colors.expense,
        cursor: "pointer",
        fontSize: 18
      }
    }, "\uD83D\uDDD1")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 2
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        color: colors.textLight
      }
    }, "\u8A55\u4FA1\u984D"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 18,
        fontWeight: 700,
        color: colors.income
      }
    }, fmtYen(value))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: colors.textLight
      }
    }, "\u53D6\u5F97\u5358\u4FA1 ", fmtYen(inv.purchasePrice), " \xD7 ", fmt(inv.quantity), "\u53E3"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        fontWeight: 700,
        color: pnl >= 0 ? colors.income : colors.expense
      }
    }, pnl >= 0 ? "+" : "", fmtYen(pnl), " (", pct, "%)")), inv.memo ? /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: colors.textLight,
        marginTop: 4
      }
    }, inv.memo) : null);
  }), showAdd ? /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "\u9298\u67C4\u3092\u8FFD\u52A0",
    color: colors.income
  }), /*#__PURE__*/React.createElement(TextInput, {
    label: "\u30D5\u30A1\u30F3\u30C9\u540D",
    value: form.name,
    onChange: F("name"),
    placeholder: "\u4F8B: eMAXIS Slim \u5168\u4E16\u754C\u682A\u5F0F"
  }), /*#__PURE__*/React.createElement(SelectInput, {
    label: "NISA\u67A0\u306E\u7A2E\u985E",
    value: form.nisaType,
    onChange: F("nisaType"),
    options: ["つみたて", "成長"]
  }), /*#__PURE__*/React.createElement(AmountInput, {
    label: "\u53D6\u5F97\u5358\u4FA1\uFF081\u53E3\u3042\u305F\u308A\uFF09",
    value: form.purchasePrice,
    onChange: F("purchasePrice")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 12,
      color: colors.textLight,
      display: "block",
      marginBottom: 4
    }
  }, "\u4FDD\u6709\u53E3\u6570"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    inputMode: "numeric",
    value: form.quantity || "",
    onChange: function onChange(e) {
      return F("quantity")(parseNum(e.target.value));
    },
    style: {
      width: "100%",
      padding: 12,
      fontSize: 16,
      border: "1.5px solid #E0E0E0",
      borderRadius: 10,
      boxSizing: "border-box",
      backgroundColor: "#FAFAFA"
    }
  })), /*#__PURE__*/React.createElement(AmountInput, {
    label: "\u73FE\u5728\u306E\u57FA\u6E96\u4FA1\u984D\uFF081\u53E3\u3042\u305F\u308A\uFF09",
    value: form.currentPrice,
    onChange: F("currentPrice")
  }), /*#__PURE__*/React.createElement(TextInput, {
    label: "\u30E1\u30E2\uFF08\u4EFB\u610F\uFF09",
    value: form.memo,
    onChange: F("memo"),
    placeholder: "\u30E1\u30E2"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(PrimaryButton, {
    onClick: addInvestment,
    color: colors.income,
    style: {
      flex: 1
    }
  }, "\u8FFD\u52A0"), /*#__PURE__*/React.createElement(OutlineButton, {
    onClick: function onClick() {
      return setShowAdd(false);
    },
    color: colors.neutral,
    style: {
      flex: 1
    }
  }, "\u30AD\u30E3\u30F3\u30BB\u30EB"))) : /*#__PURE__*/React.createElement(PrimaryButton, {
    onClick: function onClick() {
      return setShowAdd(true);
    },
    color: colors.income
  }, "\uFF0B \u9298\u67C4\u3092\u8FFD\u52A0"));
}

// iDeCo管理
function IdecoTab(_ref39) {
  var data = _ref39.data,
    updateData = _ref39.updateData;
  var ideco = data.assets.ideco || {};
  var F = function F(field) {
    return function (val) {
      return updateData(function (prev) {
        return _objectSpread(_objectSpread({}, prev), {}, {
          assets: _objectSpread(_objectSpread({}, prev.assets), {}, {
            ideco: _objectSpread(_objectSpread({}, prev.assets.ideco), {}, _defineProperty({}, field, val))
          })
        });
      });
    };
  };
  var pnl = (ideco.currentValue || 0) - (ideco.totalContributed || 0);
  var pct = ideco.totalContributed > 0 ? (pnl / ideco.totalContributed * 100).toFixed(1) : 0;

  // 所得控除節税シミュレーション（概算）
  var annualContrib = (ideco.monthlyContribution || 0) * 12;
  var taxSaving = Math.round(annualContrib * 0.2);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "iDeCo \u7BA1\u7406",
    color: colors.saving
  }), /*#__PURE__*/React.createElement(AmountInput, {
    label: "\u6708\u984D\u62E0\u51FA\u91D1",
    value: ideco.monthlyContribution,
    onChange: F("monthlyContribution")
  }), /*#__PURE__*/React.createElement(AmountInput, {
    label: "\u7D2F\u8A08\u62E0\u51FA\u984D",
    value: ideco.totalContributed,
    onChange: F("totalContributed")
  }), /*#__PURE__*/React.createElement(AmountInput, {
    label: "\u73FE\u5728\u8A55\u4FA1\u984D",
    value: ideco.currentValue,
    onChange: F("currentValue")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 12,
      color: colors.textLight,
      display: "block",
      marginBottom: 4
    }
  }, "\u904B\u7528\u958B\u59CB\u65E5"), /*#__PURE__*/React.createElement("input", {
    type: "month",
    value: ideco.startDate || "",
    onChange: function onChange(e) {
      return F("startDate")(e.target.value);
    },
    style: {
      width: "100%",
      padding: 12,
      fontSize: 16,
      border: "1.5px solid #E0E0E0",
      borderRadius: 10,
      boxSizing: "border-box",
      backgroundColor: "#FAFAFA"
    }
  }))), ideco.totalContributed > 0 && /*#__PURE__*/React.createElement(Card, {
    style: {
      backgroundColor: "#EBF5FB"
    }
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "iDeCo \u904B\u7528\u6210\u7E3E",
    color: colors.saving
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: colors.textLight
    }
  }, "\u73FE\u5728\u8A55\u4FA1\u984D"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 20,
      fontWeight: 800,
      color: colors.saving
    }
  }, fmtYen(ideco.currentValue || 0))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: colors.textLight
    }
  }, "\u904B\u7528\u76CA"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 16,
      fontWeight: 700,
      color: pnl >= 0 ? colors.income : colors.expense
    }
  }, pnl >= 0 ? "+" : "", fmtYen(pnl), " (", pct, "%)")), /*#__PURE__*/React.createElement(Divider, null), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: colors.textLight,
      marginBottom: 4
    }
  }, "\uD83D\uDCA1 \u6240\u5F97\u63A7\u9664\u52B9\u679C\uFF08\u4ECA\u5E74\u5EA6\u30FB\u6982\u7B97\uFF09"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13
    }
  }, "\u62E0\u51FA\u984D ", fmtYen(annualContrib), " \xD7 \u7A0E\u738720%"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 16,
      fontWeight: 700,
      color: colors.income
    }
  }, "\u2248 ", fmtYen(taxSaving), " \u7BC0\u7A0E"))));
}

// 変額年金保険
function AnnuityTab(_ref40) {
  var data = _ref40.data,
    updateData = _ref40.updateData;
  var _useState55 = useState(false),
    _useState56 = _slicedToArray(_useState55, 2),
    showAdd = _useState56[0],
    setShowAdd = _useState56[1];
  var annuities = data.assets.variableAnnuities || [];
  var _useState57 = useState({
      name: "",
      contractDate: "",
      monthlyPremium: 0,
      totalPremium: 0,
      currentValue: 0,
      maturityDate: "",
      maturityAmount: 0,
      deathBenefit: 0,
      fundAllocation: [{
        fundName: "",
        allocation: 100
      }],
      memo: ""
    }),
    _useState58 = _slicedToArray(_useState57, 2),
    form = _useState58[0],
    setForm = _useState58[1];
  var add = function add() {
    if (!form.name) return;
    updateData(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, {
        assets: _objectSpread(_objectSpread({}, prev.assets), {}, {
          variableAnnuities: [].concat(_toConsumableArray(prev.assets.variableAnnuities || []), [_objectSpread(_objectSpread({}, form), {}, {
            id: genId()
          })])
        })
      });
    });
    setShowAdd(false);
  };
  var del = function del(id) {
    return updateData(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, {
        assets: _objectSpread(_objectSpread({}, prev.assets), {}, {
          variableAnnuities: prev.assets.variableAnnuities.filter(function (a) {
            return a.id !== id;
          })
        })
      });
    });
  };
  var F = function F(field) {
    return function (v) {
      return setForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, _defineProperty({}, field, v));
      });
    };
  };
  return /*#__PURE__*/React.createElement("div", null, annuities.map(function (ann) {
    var pnl = ann.currentValue - ann.totalPremium;
    var pct = ann.totalPremium > 0 ? (pnl / ann.totalPremium * 100).toFixed(2) : 0;
    return /*#__PURE__*/React.createElement(Card, {
      key: ann.id
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 8
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 15,
        fontWeight: 700
      }
    }, ann.name), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return del(ann.id);
      },
      style: {
        fontSize: 11,
        color: colors.expense,
        background: "none",
        border: "none",
        cursor: "pointer"
      }
    }, "\u524A\u9664")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 4
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        color: colors.textLight
      }
    }, "\u73FE\u5728\u8A55\u4FA1\u984D"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 20,
        fontWeight: 800,
        color: colors.asset
      }
    }, fmtYen(ann.currentValue))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 4
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        color: colors.textLight
      }
    }, "\u6255\u8FBC\u4FDD\u967A\u6599"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14
      }
    }, fmtYen(ann.totalPremium))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        fontWeight: 700
      }
    }, "\u542B\u307F\u640D\u76CA"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 16,
        fontWeight: 700,
        color: pnl >= 0 ? colors.income : colors.expense
      }
    }, pnl >= 0 ? "+" : "", fmtYen(pnl), " (", pct, "%)")));
  }), showAdd ? /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "\u5909\u984D\u5E74\u91D1\u4FDD\u967A\u3092\u8FFD\u52A0"
  }), /*#__PURE__*/React.createElement(TextInput, {
    label: "\u4FDD\u967A\u4F1A\u793E\u30FB\u5546\u54C1\u540D",
    value: form.name,
    onChange: F("name"),
    placeholder: "\u4F8B: \u65E5\u672C\u751F\u547D \u5909\u984D\u5E74\u91D1"
  }), /*#__PURE__*/React.createElement(AmountInput, {
    label: "\u6708\u984D\u4FDD\u967A\u6599",
    value: form.monthlyPremium,
    onChange: F("monthlyPremium")
  }), /*#__PURE__*/React.createElement(AmountInput, {
    label: "\u7D2F\u8A08\u6255\u8FBC\u4FDD\u967A\u6599",
    value: form.totalPremium,
    onChange: F("totalPremium")
  }), /*#__PURE__*/React.createElement(AmountInput, {
    label: "\u73FE\u5728\u8A55\u4FA1\u984D\uFF08\u89E3\u7D04\u8FD4\u623B\u91D1\uFF09",
    value: form.currentValue,
    onChange: F("currentValue")
  }), /*#__PURE__*/React.createElement(AmountInput, {
    label: "\u6B7B\u4EA1\u4FDD\u967A\u91D1",
    value: form.deathBenefit,
    onChange: F("deathBenefit")
  }), /*#__PURE__*/React.createElement(TextInput, {
    label: "\u30E1\u30E2",
    value: form.memo,
    onChange: F("memo"),
    placeholder: "\u30E1\u30E2\uFF08\u4EFB\u610F\uFF09"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      backgroundColor: "#FFF3CD",
      borderRadius: 8,
      padding: 10,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "#856404"
    }
  }, "\u26A0\uFE0F \u5909\u984D\u5E74\u91D1\u306F\u5143\u672C\u4FDD\u8A3C\u306A\u3057\u3002\u65E9\u671F\u89E3\u7D04\u3067\u5143\u672C\u5272\u308C\u306E\u53EF\u80FD\u6027\u304C\u3042\u308A\u307E\u3059\u3002")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(PrimaryButton, {
    onClick: add,
    color: colors.asset,
    style: {
      flex: 1
    }
  }, "\u8FFD\u52A0"), /*#__PURE__*/React.createElement(OutlineButton, {
    onClick: function onClick() {
      return setShowAdd(false);
    },
    color: colors.neutral,
    style: {
      flex: 1
    }
  }, "\u30AD\u30E3\u30F3\u30BB\u30EB"))) : /*#__PURE__*/React.createElement(PrimaryButton, {
    onClick: function onClick() {
      return setShowAdd(true);
    },
    color: colors.asset
  }, "\uFF0B \u5909\u984D\u5E74\u91D1\u4FDD\u967A\u3092\u8FFD\u52A0"));
}

// 総資産・純資産
function NetWorthTab(_ref41) {
  var _data$assets$nisa2, _data$assets$ideco2;
  var data = _ref41.data;
  var bankTotal = (data.assets.bankAccounts || []).reduce(function (a, b) {
    return a + b.balance;
  }, 0);
  var nisaInvest = (((_data$assets$nisa2 = data.assets.nisa) === null || _data$assets$nisa2 === void 0 ? void 0 : _data$assets$nisa2.investments) || []).reduce(function (a, i) {
    return a + i.currentPrice * i.quantity;
  }, 0);
  var idecoVal = ((_data$assets$ideco2 = data.assets.ideco) === null || _data$assets$ideco2 === void 0 ? void 0 : _data$assets$ideco2.currentValue) || 0;
  var annuityVal = (data.assets.variableAnnuities || []).reduce(function (a, v) {
    return a + v.currentValue;
  }, 0);
  var totalAsset = bankTotal + nisaInvest + idecoVal + annuityVal;
  var totalLoan = (data.loans || []).reduce(function (a, l) {
    return a + l.remainingBalance;
  }, 0);
  var netWorth = totalAsset - totalLoan;
  var pieData = [{
    name: "現金・預金",
    value: bankTotal,
    color: colors.saving
  }, {
    name: "NISA投資",
    value: nisaInvest,
    color: colors.income
  }, {
    name: "iDeCo",
    value: idecoVal,
    color: "#F39C12"
  }, {
    name: "変額年金",
    value: annuityVal,
    color: colors.asset
  }].filter(function (d) {
    return d.value > 0;
  });
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "\u7D14\u8CC7\u7523\uFF08\u30CD\u30C3\u30C8\u30EF\u30FC\u30B9\uFF09",
    color: colors.asset
  }), [{
    label: "現金・預金",
    val: bankTotal,
    color: colors.saving
  }, {
    label: "NISA投資",
    val: nisaInvest,
    color: colors.income
  }, {
    label: "iDeCo",
    val: idecoVal,
    color: "#F39C12"
  }, {
    label: "変額年金",
    val: annuityVal,
    color: colors.asset
  }].map(function (_ref42) {
    var label = _ref42.label,
      val = _ref42.val,
      color = _ref42.color;
    return /*#__PURE__*/React.createElement("div", {
      key: label,
      style: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 6
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        color: colors.textLight
      }
    }, label), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        fontWeight: 600,
        color: color
      }
    }, fmtYen(val)));
  }), /*#__PURE__*/React.createElement(Divider, null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 700
    }
  }, "\u7DCF\u8CC7\u7523"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18,
      fontWeight: 800,
      color: colors.asset
    }
  }, fmtYen(totalAsset))), /*#__PURE__*/React.createElement(Divider, null), data.loans.map(function (l) {
    return /*#__PURE__*/React.createElement("div", {
      key: l.id,
      style: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 6
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        color: colors.textLight
      }
    }, LOAN_TYPE_ICON[l.type], " ", l.name), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        fontWeight: 600,
        color: colors.loan
      }
    }, "\u25B2", fmtYen(l.remainingBalance)));
  }), /*#__PURE__*/React.createElement(Divider, null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      fontWeight: 700
    }
  }, "\u7D14\u8CC7\u7523"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 24,
      fontWeight: 800,
      color: netWorth >= 0 ? colors.income : colors.expense
    }
  }, netWorth < 0 ? "▲" : "", fmtYen(Math.abs(netWorth))))), pieData.length > 0 && /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "\u8CC7\u7523\u30AF\u30E9\u30B9\u5225\u69CB\u6210"
  }), /*#__PURE__*/React.createElement(ResponsiveContainer, {
    width: "100%",
    height: 200
  }, /*#__PURE__*/React.createElement(RechartsPie, null, /*#__PURE__*/React.createElement(Pie, {
    data: pieData,
    cx: "50%",
    cy: "50%",
    outerRadius: 75,
    dataKey: "value",
    label: function label(_ref43) {
      var name = _ref43.name,
        percent = _ref43.percent;
      return percent > 0.05 ? "".concat(name, " ").concat(Math.round(percent * 100), "%") : "";
    },
    fontSize: 10
  }, pieData.map(function (entry, i) {
    return /*#__PURE__*/React.createElement(Cell, {
      key: i,
      fill: entry.color
    });
  })), /*#__PURE__*/React.createElement(Tooltip, {
    formatter: function formatter(v) {
      return fmtYen(v);
    }
  })))));
}

// ===== フェーズ12・13: シミュレーションタブ =====

var SIM_SUBTABS = ["将来資産", "ローン完済後", "老後資金", "FIRE試算"];
function SimulationTab(_ref44) {
  var data = _ref44.data,
    updateData = _ref44.updateData;
  var _useState59 = useState("将来資産"),
    _useState60 = _slicedToArray(_useState59, 2),
    subtab = _useState60[0],
    setSubtab = _useState60[1];
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PageTitle, {
    title: "\uD83D\uDD2E \u30B7\u30DF\u30E5\u30EC\u30FC\u30B7\u30E7\u30F3"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      padding: "0 16px 12px",
      overflowX: "auto"
    }
  }, SIM_SUBTABS.map(function (t) {
    return /*#__PURE__*/React.createElement("button", {
      key: t,
      onClick: function onClick() {
        return setSubtab(t);
      },
      style: {
        flex: "0 0 auto",
        padding: "8px 12px",
        backgroundColor: subtab === t ? colors.saving : "#EEE",
        color: subtab === t ? "#fff" : colors.text,
        border: "none",
        borderRadius: 20,
        fontSize: 12,
        fontWeight: 600,
        cursor: "pointer"
      }
    }, t);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 16px"
    }
  }, subtab === "将来資産" && /*#__PURE__*/React.createElement(FutureAssetSim, {
    data: data
  }), subtab === "ローン完済後" && /*#__PURE__*/React.createElement(AfterLoanSim, {
    data: data
  }), subtab === "老後資金" && /*#__PURE__*/React.createElement(RetirementSim, {
    data: data
  }), subtab === "FIRE試算" && /*#__PURE__*/React.createElement(FireSim, {
    data: data
  })));
}

// 将来資産シミュレーター
function FutureAssetSim(_ref45) {
  var data = _ref45.data;
  var totalAsset = function (_data$assets$nisa3, _data$assets$ideco3) {
    var b = (data.assets.bankAccounts || []).reduce(function (a, x) {
      return a + x.balance;
    }, 0);
    var i = (((_data$assets$nisa3 = data.assets.nisa) === null || _data$assets$nisa3 === void 0 ? void 0 : _data$assets$nisa3.investments) || []).reduce(function (a, x) {
      return a + x.currentPrice * x.quantity;
    }, 0);
    return b + i + (((_data$assets$ideco3 = data.assets.ideco) === null || _data$assets$ideco3 === void 0 ? void 0 : _data$assets$ideco3.currentValue) || 0);
  }();
  var _useState61 = useState(totalAsset || 0),
    _useState62 = _slicedToArray(_useState61, 2),
    currentAsset = _useState62[0],
    setCurrentAsset = _useState62[1];
  var _useState63 = useState(50000),
    _useState64 = _slicedToArray(_useState63, 2),
    monthly = _useState64[0],
    setMonthly = _useState64[1];
  var _useState65 = useState(5),
    _useState66 = _slicedToArray(_useState65, 2),
    rate = _useState66[0],
    setRate = _useState66[1];
  var _useState67 = useState(20),
    _useState68 = _slicedToArray(_useState67, 2),
    years = _useState68[0],
    setYears = _useState68[1];
  var calcFuture = function calcFuture(asset, mon, annualRate, yrs) {
    var r = annualRate / 100 / 12;
    var bal = asset;
    for (var i = 0; i < yrs * 12; i++) {
      bal = bal * (1 + r) + mon;
    }
    return Math.round(bal);
  };
  var futureTotal = calcFuture(currentAsset, monthly, rate, years);
  var principal = currentAsset + monthly * 12 * years;
  var gains = futureTotal - principal;

  // グラフデータ
  var chartData = Array.from({
    length: years + 1
  }, function (_, i) {
    var total = calcFuture(currentAsset, monthly, rate, i);
    var princ = currentAsset + monthly * 12 * i;
    return {
      year: "".concat(i, "\u5E74"),
      元本: princ,
      運用益: Math.max(0, total - princ),
      合計: total
    };
  });

  // 利率別比較表
  var rateTable = [1, 3, 5, 7].map(function (r) {
    return {
      rate: r,
      y10: calcFuture(currentAsset, monthly, r, 10),
      y20: calcFuture(currentAsset, monthly, r, 20),
      y30: calcFuture(currentAsset, monthly, r, 30)
    };
  });
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "\u5C06\u6765\u8CC7\u7523\u30B7\u30DF\u30E5\u30EC\u30FC\u30BF\u30FC",
    color: colors.saving
  }), /*#__PURE__*/React.createElement(AmountInput, {
    label: "\u73FE\u5728\u306E\u8CC7\u7523",
    value: currentAsset,
    onChange: setCurrentAsset
  }), /*#__PURE__*/React.createElement(AmountInput, {
    label: "\u6708\u3005\u306E\u7A4D\u7ACB\u984D",
    value: monthly,
    onChange: setMonthly
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 12,
      color: colors.textLight,
      display: "block",
      marginBottom: 4
    }
  }, "\u5E74\u9593\u904B\u7528\u5229\u7387: ", rate, "%"), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: 0,
    max: 10,
    step: 0.5,
    value: rate,
    onChange: function onChange(e) {
      return setRate(Number(e.target.value));
    },
    style: {
      width: "100%",
      accentColor: colors.saving
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 12,
      color: colors.textLight,
      display: "block",
      marginBottom: 4
    }
  }, "\u7A4D\u7ACB\u671F\u9593: ", years, "\u5E74"), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: 1,
    max: 40,
    value: years,
    onChange: function onChange(e) {
      return setYears(Number(e.target.value));
    },
    style: {
      width: "100%",
      accentColor: colors.saving
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      backgroundColor: "#EBF5FB",
      borderRadius: 12,
      padding: 16,
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: colors.textLight,
      marginBottom: 4
    }
  }, years, "\u5E74\u5F8C\u306E\u8CC7\u7523\u4E88\u6E2C"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 32,
      fontWeight: 800,
      color: colors.saving
    }
  }, fmtYen(futureTotal)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      gap: 24,
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: colors.textLight
    }
  }, "\u5143\u672C"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      color: colors.text
    }
  }, fmtYen(principal))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: colors.textLight
    }
  }, "\u904B\u7528\u76CA"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      color: colors.income
    }
  }, "+", fmtYen(gains)))))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "\u8CC7\u7523\u63A8\u79FB\u30B0\u30E9\u30D5"
  }), /*#__PURE__*/React.createElement(ResponsiveContainer, {
    width: "100%",
    height: 220
  }, /*#__PURE__*/React.createElement(AreaChart, {
    data: chartData
  }, /*#__PURE__*/React.createElement(CartesianGrid, {
    strokeDasharray: "3 3",
    stroke: "#EEE"
  }), /*#__PURE__*/React.createElement(XAxis, {
    dataKey: "year",
    tick: {
      fontSize: 10
    },
    interval: Math.floor(years / 5)
  }), /*#__PURE__*/React.createElement(YAxis, {
    tick: {
      fontSize: 10
    },
    tickFormatter: function tickFormatter(v) {
      return "".concat(Math.round(v / 10000), "\u4E07");
    }
  }), /*#__PURE__*/React.createElement(Tooltip, {
    formatter: function formatter(v) {
      return fmtYen(v);
    }
  }), /*#__PURE__*/React.createElement(Area, {
    type: "monotone",
    dataKey: "\u5143\u672C",
    stackId: "1",
    stroke: colors.saving,
    fill: "#D6EAF8"
  }), /*#__PURE__*/React.createElement(Area, {
    type: "monotone",
    dataKey: "\u904B\u7528\u76CA",
    stackId: "1",
    stroke: colors.income,
    fill: "#D5F5E3"
  })))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "\u5229\u7387\u5225\u6BD4\u8F03\u8868"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: "auto"
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      fontSize: 12
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      backgroundColor: "#F5F5F5"
    }
  }, ["利率", "10年後", "20年後", "30年後"].map(function (h) {
    return /*#__PURE__*/React.createElement("th", {
      key: h,
      style: {
        padding: "8px 6px",
        textAlign: "right",
        color: colors.textLight
      }
    }, h);
  }))), /*#__PURE__*/React.createElement("tbody", null, rateTable.map(function (r) {
    return /*#__PURE__*/React.createElement("tr", {
      key: r.rate,
      style: {
        borderBottom: "1px solid #F0F0F0"
      }
    }, /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "8px 6px",
        fontWeight: 700,
        color: colors.saving
      }
    }, r.rate, "%"), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "8px 6px",
        textAlign: "right"
      }
    }, Math.round(r.y10 / 10000), "\u4E07"), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "8px 6px",
        textAlign: "right"
      }
    }, Math.round(r.y20 / 10000), "\u4E07"), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "8px 6px",
        textAlign: "right"
      }
    }, Math.round(r.y30 / 10000), "\u4E07"));
  }))))));
}

// ローン完済後シミュレーター
function AfterLoanSim(_ref46) {
  var data = _ref46.data;
  var _useState69 = useState(5),
    _useState70 = _slicedToArray(_useState69, 2),
    rate = _useState70[0],
    setRate = _useState70[1];
  var loans = _toConsumableArray(data.loans).sort(function (a, b) {
    var aMonths = a.monthlyPayment > 0 ? Math.ceil(a.remainingBalance / a.monthlyPayment) : 999;
    var bMonths = b.monthlyPayment > 0 ? Math.ceil(b.remainingBalance / b.monthlyPayment) : 999;
    return aMonths - bMonths;
  });
  var totalMonthly = loans.reduce(function (a, l) {
    return a + l.monthlyPayment;
  }, 0);

  // 完済シナリオ
  var scenarios = loans.map(function (l) {
    return {
      name: "".concat(LOAN_TYPE_ICON[l.type], " ").concat(l.name),
      months: l.monthlyPayment > 0 ? Math.ceil(l.remainingBalance / l.monthlyPayment) : 0,
      monthlyPayment: l.monthlyPayment
    };
  });

  // 完済後に積立回した場合の追加資産
  var calcAdditional = function calcAdditional() {
    var now = new Date();
    // 住宅ローン完済月（最長）を終点とする
    var maxMonths = scenarios.reduce(function (m, s) {
      return Math.max(m, s.months);
    }, 0);
    var additionalAsset = 0;
    var r = rate / 100 / 12;
    scenarios.forEach(function (s) {
      // 完済後の残り期間に積立
      var remaining = maxMonths - s.months;
      if (remaining > 0 && s.monthlyPayment > 0) {
        for (var i = 0; i < remaining; i++) {
          additionalAsset = additionalAsset * (1 + r) + s.monthlyPayment;
        }
      }
    });
    return Math.round(additionalAsset);
  };
  var additionalAsset = calcAdditional();
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "\u73FE\u5728\u306E\u30ED\u30FC\u30F3\u8FD4\u6E08\u984D",
    color: colors.loan
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 24,
      fontWeight: 800,
      color: colors.loan,
      textAlign: "center",
      marginBottom: 12
    }
  }, fmtYen(totalMonthly), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14
    }
  }, "/\u6708")), /*#__PURE__*/React.createElement(Divider, null), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      marginBottom: 8
    }
  }, "\u5B8C\u6E08\u30B9\u30B1\u30B8\u30E5\u30FC\u30EB"), scenarios.map(function (s) {
    var years = Math.floor(s.months / 12);
    var months = s.months % 12;
    var completeDate = new Date();
    completeDate.setMonth(completeDate.getMonth() + s.months);
    return /*#__PURE__*/React.createElement("div", {
      key: s.name,
      style: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 8
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13
      }
    }, s.name), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "right"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 600,
        color: colors.income
      }
    }, completeDate.getFullYear(), "\u5E74", completeDate.getMonth() + 1, "\u6708\u5B8C\u6E08"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: colors.textLight
      }
    }, "\u3042\u3068", years > 0 ? "".concat(years, "\u5E74") : "", months, "\u30F6\u6708")));
  })), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "\u5B8C\u6E08\u5F8C\u306B\u7A4D\u7ACB\u306B\u56DE\u3057\u305F\u3089\uFF1F",
    color: colors.saving
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 12,
      color: colors.textLight,
      display: "block",
      marginBottom: 4
    }
  }, "\u904B\u7528\u5229\u7387: ", rate, "%"), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: 0,
    max: 10,
    step: 0.5,
    value: rate,
    onChange: function onChange(e) {
      return setRate(Number(e.target.value));
    },
    style: {
      width: "100%",
      accentColor: colors.saving
    }
  })), scenarios.map(function (s) {
    return /*#__PURE__*/React.createElement("div", {
      key: s.name,
      style: {
        fontSize: 13,
        color: colors.textLight,
        marginBottom: 4
      }
    }, s.name, "\u5B8C\u6E08\u5F8C: ", /*#__PURE__*/React.createElement("strong", {
      style: {
        color: colors.income
      }
    }, "+", fmtYen(s.monthlyPayment), "/\u6708"), "\u3092\u7A4D\u7ACB");
  }), /*#__PURE__*/React.createElement(Divider, null), /*#__PURE__*/React.createElement("div", {
    style: {
      backgroundColor: "#EBF5FB",
      borderRadius: 10,
      padding: 12,
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: colors.textLight
    }
  }, "\u5168\u30ED\u30FC\u30F3\u5B8C\u6E08\u5F8C\u306E\u8FFD\u52A0\u8CC7\u7523\uFF08\u6982\u7B97\uFF09"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 28,
      fontWeight: 800,
      color: colors.saving
    }
  }, fmtYen(additionalAsset)))));
}

// 老後資金シミュレーター
function RetirementSim(_ref47) {
  var data = _ref47.data;
  var _useState71 = useState(35),
    _useState72 = _slicedToArray(_useState71, 2),
    age = _useState72[0],
    setAge = _useState72[1];
  var _useState73 = useState(65),
    _useState74 = _slicedToArray(_useState73, 2),
    retireAge = _useState74[0],
    setRetireAge = _useState74[1];
  var _useState75 = useState(90),
    _useState76 = _slicedToArray(_useState75, 2),
    lifeAge = _useState76[0],
    setLifeAge = _useState76[1];
  var _useState77 = useState(150000),
    _useState78 = _slicedToArray(_useState77, 2),
    pension = _useState78[0],
    setPension = _useState78[1];
  var _useState79 = useState(2000000),
    _useState80 = _slicedToArray(_useState79, 2),
    severance = _useState80[0],
    setSeverance = _useState80[1];
  var _useState81 = useState(250000),
    _useState82 = _slicedToArray(_useState81, 2),
    monthlyLiving = _useState82[0],
    setMonthlyLiving = _useState82[1];
  var retireYears = retireAge - age;
  var lifeYears = lifeAge - retireAge;

  // 退職後の必要資金
  var annualExpense = monthlyLiving * 12;
  var annualPension = pension * 12;
  var annualShortfall = Math.max(0, annualExpense - annualPension);
  var totalNeeded = annualShortfall * lifeYears;

  // 現在の準備額
  var currentSavings = function (_data$assets$nisa4, _data$assets$ideco4) {
    var b = (data.assets.bankAccounts || []).reduce(function (a, x) {
      return a + x.balance;
    }, 0);
    var i = (((_data$assets$nisa4 = data.assets.nisa) === null || _data$assets$nisa4 === void 0 ? void 0 : _data$assets$nisa4.investments) || []).reduce(function (a, x) {
      return a + x.currentPrice * x.quantity;
    }, 0);
    return b + i + (((_data$assets$ideco4 = data.assets.ideco) === null || _data$assets$ideco4 === void 0 ? void 0 : _data$assets$ideco4.currentValue) || 0) + severance;
  }();
  var shortfall = Math.max(0, totalNeeded - currentSavings);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "\u8001\u5F8C\u8CC7\u91D1\u30B7\u30DF\u30E5\u30EC\u30FC\u30BF\u30FC",
    color: "#F39C12"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 12,
      color: colors.textLight,
      display: "block",
      marginBottom: 4
    }
  }, "\u73FE\u5728\u306E\u5E74\u9F62"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    inputMode: "numeric",
    value: age,
    onChange: function onChange(e) {
      return setAge(Number(e.target.value));
    },
    style: {
      width: "100%",
      padding: 10,
      fontSize: 16,
      border: "1.5px solid #E0E0E0",
      borderRadius: 10,
      boxSizing: "border-box",
      backgroundColor: "#FAFAFA"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 12,
      color: colors.textLight,
      display: "block",
      marginBottom: 4
    }
  }, "\u9000\u8077\u4E88\u5B9A\u5E74\u9F62"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    inputMode: "numeric",
    value: retireAge,
    onChange: function onChange(e) {
      return setRetireAge(Number(e.target.value));
    },
    style: {
      width: "100%",
      padding: 10,
      fontSize: 16,
      border: "1.5px solid #E0E0E0",
      borderRadius: 10,
      boxSizing: "border-box",
      backgroundColor: "#FAFAFA"
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 12,
      color: colors.textLight,
      display: "block",
      marginBottom: 4
    }
  }, "\u60F3\u5B9A\u5BFF\u547D: ", lifeAge, "\u6B73"), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: 70,
    max: 100,
    value: lifeAge,
    onChange: function onChange(e) {
      return setLifeAge(Number(e.target.value));
    },
    style: {
      width: "100%",
      accentColor: "#F39C12"
    }
  })), /*#__PURE__*/React.createElement(AmountInput, {
    label: "\u5E74\u91D1\u53D7\u53D6\u4E88\u5B9A\u984D\uFF08\u6708\u984D\uFF09",
    value: pension,
    onChange: setPension
  }), /*#__PURE__*/React.createElement(AmountInput, {
    label: "\u9000\u8077\u91D1\u4E88\u5B9A\u984D",
    value: severance,
    onChange: setSeverance
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 12,
      color: colors.textLight,
      display: "block",
      marginBottom: 4
    }
  }, "\u8001\u5F8C\u306E\u6708\u751F\u6D3B\u8CBB: ", fmtYen(monthlyLiving)), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: 100000,
    max: 500000,
    step: 10000,
    value: monthlyLiving,
    onChange: function onChange(e) {
      return setMonthlyLiving(Number(e.target.value));
    },
    style: {
      width: "100%",
      accentColor: "#F39C12"
    }
  }))), /*#__PURE__*/React.createElement(Card, {
    style: {
      backgroundColor: "#FEF9E7"
    }
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "\u30B7\u30DF\u30E5\u30EC\u30FC\u30B7\u30E7\u30F3\u7D50\u679C",
    color: "#F39C12"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: colors.textLight
    }
  }, "\u9000\u8077\u5F8C\u306E\u671F\u9593"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 600
    }
  }, lifeYears, "\u5E74")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: colors.textLight
    }
  }, "\u5E74\u9593\u751F\u6D3B\u8CBB"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 600
    }
  }, fmtYen(annualExpense))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: colors.textLight
    }
  }, "\u5E74\u91D1\u53CE\u5165"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: colors.income
    }
  }, "-", fmtYen(annualPension))), /*#__PURE__*/React.createElement(Divider, null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 700
    }
  }, "\u5FC5\u8981\u8001\u5F8C\u8CC7\u91D1"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 22,
      fontWeight: 800,
      color: "#F39C12"
    }
  }, fmtYen(totalNeeded))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 700
    }
  }, "\u73FE\u5728\u306E\u6E96\u5099\u984D"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18,
      fontWeight: 700,
      color: colors.income
    }
  }, fmtYen(currentSavings))), /*#__PURE__*/React.createElement(Divider, null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      fontWeight: 700
    }
  }, shortfall > 0 ? "不足額" : "余剰額"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 24,
      fontWeight: 800,
      color: shortfall > 0 ? colors.expense : colors.income
    }
  }, shortfall > 0 ? "▲" : "+", fmtYen(shortfall > 0 ? shortfall : currentSavings - totalNeeded)))));
}

// FIRE試算
function FireSim(_ref48) {
  var data = _ref48.data;
  var totalAsset = function (_data$assets$nisa5, _data$assets$ideco5) {
    var b = (data.assets.bankAccounts || []).reduce(function (a, x) {
      return a + x.balance;
    }, 0);
    var i = (((_data$assets$nisa5 = data.assets.nisa) === null || _data$assets$nisa5 === void 0 ? void 0 : _data$assets$nisa5.investments) || []).reduce(function (a, x) {
      return a + x.currentPrice * x.quantity;
    }, 0);
    return b + i + (((_data$assets$ideco5 = data.assets.ideco) === null || _data$assets$ideco5 === void 0 ? void 0 : _data$assets$ideco5.currentValue) || 0);
  }();
  var _useState83 = useState(totalAsset || 0),
    _useState84 = _slicedToArray(_useState83, 2),
    currentAsset = _useState84[0],
    setCurrentAsset = _useState84[1];
  var _useState85 = useState(250000),
    _useState86 = _slicedToArray(_useState85, 2),
    monthlyLiving = _useState86[0],
    setMonthlyLiving = _useState86[1];
  var _useState87 = useState(4),
    _useState88 = _slicedToArray(_useState87, 2),
    withdrawRate = _useState88[0],
    setWithdrawRate = _useState88[1];
  var _useState89 = useState(100000),
    _useState90 = _slicedToArray(_useState89, 2),
    monthly = _useState90[0],
    setMonthly = _useState90[1];
  var _useState91 = useState(5),
    _useState92 = _slicedToArray(_useState91, 2),
    rate = _useState92[0],
    setRate = _useState92[1];
  var annualLiving = monthlyLiving * 12;
  var fireTarget = Math.round(annualLiving / (withdrawRate / 100));

  // FIRE達成までの期間
  var calcFireYears = function calcFireYears() {
    var r = rate / 100 / 12;
    var bal = currentAsset;
    for (var m = 0; m <= 600; m++) {
      if (bal >= fireTarget) return {
        months: m,
        asset: bal
      };
      bal = bal * (1 + r) + monthly;
    }
    return {
      months: -1,
      asset: bal
    };
  };
  var fireResult = calcFireYears();
  var fireMonths = fireResult.months;
  var fireYears = Math.floor(fireMonths / 12);
  var fireRemainingMonths = fireMonths % 12;

  // グラフデータ
  var chartData = function () {
    var r = rate / 100 / 12;
    var bal = currentAsset;
    var data = [];
    for (var y = 0; y <= Math.min(40, Math.ceil(fireMonths / 12) + 5); y++) {
      data.push({
        year: "".concat(y, "\u5E74"),
        資産: Math.round(bal),
        目標: fireTarget
      });
      for (var m = 0; m < 12; m++) bal = bal * (1 + r) + monthly;
    }
    return data;
  }();
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "\uD83D\uDD25 FIRE\u8A66\u7B97",
    color: colors.expense
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: colors.textLight,
      marginBottom: 12
    }
  }, "FIRE = \u5E74\u9593\u751F\u6D3B\u8CBB \xF7 \u53D6\u308A\u5D29\u3057\u7387\uFF084%\u30EB\u30FC\u30EB\uFF09"), /*#__PURE__*/React.createElement(AmountInput, {
    label: "\u73FE\u5728\u306E\u8CC7\u7523",
    value: currentAsset,
    onChange: setCurrentAsset
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 12,
      color: colors.textLight,
      display: "block",
      marginBottom: 4
    }
  }, "\u6708\u3005\u306E\u751F\u6D3B\u8CBB: ", fmtYen(monthlyLiving)), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: 100000,
    max: 500000,
    step: 10000,
    value: monthlyLiving,
    onChange: function onChange(e) {
      return setMonthlyLiving(Number(e.target.value));
    },
    style: {
      width: "100%",
      accentColor: colors.expense
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 12,
      color: colors.textLight,
      display: "block",
      marginBottom: 4
    }
  }, "\u5E74\u9593\u53D6\u308A\u5D29\u3057\u7387: ", withdrawRate, "%"), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: 2,
    max: 6,
    step: 0.5,
    value: withdrawRate,
    onChange: function onChange(e) {
      return setWithdrawRate(Number(e.target.value));
    },
    style: {
      width: "100%",
      accentColor: colors.expense
    }
  })), /*#__PURE__*/React.createElement(AmountInput, {
    label: "\u6708\u3005\u306E\u7A4D\u7ACB\u984D",
    value: monthly,
    onChange: setMonthly
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 12,
      color: colors.textLight,
      display: "block",
      marginBottom: 4
    }
  }, "\u904B\u7528\u5229\u7387: ", rate, "%"), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: 0,
    max: 10,
    step: 0.5,
    value: rate,
    onChange: function onChange(e) {
      return setRate(Number(e.target.value));
    },
    style: {
      width: "100%",
      accentColor: colors.expense
    }
  }))), /*#__PURE__*/React.createElement(Card, {
    style: {
      backgroundColor: "#FFF5F5"
    }
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "FIRE\u9054\u6210\u30B7\u30DF\u30E5\u30EC\u30FC\u30B7\u30E7\u30F3",
    color: colors.expense
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: colors.textLight
    }
  }, "\u5E74\u9593\u751F\u6D3B\u8CBB"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 600
    }
  }, fmtYen(annualLiving))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 700
    }
  }, "FIRE\u5FC5\u8981\u8CC7\u7523"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 22,
      fontWeight: 800,
      color: colors.expense
    }
  }, fmtYen(fireTarget))), /*#__PURE__*/React.createElement(ProgressBar, {
    value: currentAsset,
    max: fireTarget,
    color: colors.expense
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: colors.textLight,
      textAlign: "right",
      marginTop: 4
    }
  }, "\u9054\u6210\u7387 ", fireTarget > 0 ? Math.round(currentAsset / fireTarget * 100) : 0, "%"), /*#__PURE__*/React.createElement(Divider, null), fireMonths >= 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      padding: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: colors.textLight
    }
  }, "FIRE\u9054\u6210\u307E\u3067"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 28,
      fontWeight: 800,
      color: colors.expense
    }
  }, fireYears > 0 ? "".concat(fireYears, "\u5E74") : "", fireRemainingMonths, "\u30F6\u6708")) : /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      padding: 12,
      color: colors.textLight,
      fontSize: 13
    }
  }, "\u73FE\u5728\u306E\u8A2D\u5B9A\u3067\u306FFIRE\u304C\u56F0\u96E3\u3067\u3059\u3002\u7A4D\u7ACB\u984D\u30FB\u5229\u7387\u3092\u898B\u76F4\u3057\u3066\u304F\u3060\u3055\u3044\u3002")), chartData.length > 0 && /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "\u8CC7\u7523\u63A8\u79FB\u3068\u76EE\u6A19\u30E9\u30A4\u30F3"
  }), /*#__PURE__*/React.createElement(ResponsiveContainer, {
    width: "100%",
    height: 220
  }, /*#__PURE__*/React.createElement(AreaChart, {
    data: chartData
  }, /*#__PURE__*/React.createElement(CartesianGrid, {
    strokeDasharray: "3 3",
    stroke: "#EEE"
  }), /*#__PURE__*/React.createElement(XAxis, {
    dataKey: "year",
    tick: {
      fontSize: 10
    }
  }), /*#__PURE__*/React.createElement(YAxis, {
    tick: {
      fontSize: 10
    },
    tickFormatter: function tickFormatter(v) {
      return "".concat(Math.round(v / 10000), "\u4E07");
    }
  }), /*#__PURE__*/React.createElement(Tooltip, {
    formatter: function formatter(v) {
      return fmtYen(v);
    }
  }), /*#__PURE__*/React.createElement(Area, {
    type: "monotone",
    dataKey: "\u8CC7\u7523",
    stroke: colors.saving,
    fill: "#D6EAF8",
    strokeWidth: 2
  }), /*#__PURE__*/React.createElement(Line, {
    type: "monotone",
    dataKey: "\u76EE\u6A19",
    stroke: colors.expense,
    strokeWidth: 2,
    strokeDasharray: "5 5",
    dot: false
  })))));
}

// ===== フェーズ15: CSV出力・JSONバックアップ =====

function DataManagementPanel(_ref49) {
  var data = _ref49.data,
    updateData = _ref49.updateData;
  var exportCSV = function exportCSV() {
    var header = "日付,カテゴリ,サブカテゴリ,金額,固定費,支払方法,メモ";
    var rows = data.expenses.map(function (e) {
      return "".concat(e.date, ",").concat(e.category, ",").concat(e.subcategory || "", ",").concat(e.amount, ",").concat(e.isFixed ? "固定費" : "変動費", ",").concat(e.paymentMethod || "", ",").concat(e.memo || "");
    });
    var csv = [header].concat(_toConsumableArray(rows)).join("\n");
    var blob = new Blob(["﻿" + csv], {
      type: "text/csv;charset=utf-8;"
    });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "kakeibo_expenses_".concat(new Date().toISOString().slice(0, 10), ".csv");
    a.click();
    URL.revokeObjectURL(url);
  };
  var exportJSON = function exportJSON() {
    var json = JSON.stringify(data, null, 2);
    var blob = new Blob([json], {
      type: "application/json"
    });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "kakeibo_backup_".concat(new Date().toISOString().slice(0, 10), ".json");
    a.click();
    URL.revokeObjectURL(url);
  };
  var importJSON = function importJSON(e) {
    var file = e.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function (ev) {
      try {
        var imported = JSON.parse(ev.target.result);
        if (window.confirm("バックアップデータを復元しますか？現在のデータは上書きされます。")) {
          updateData(imported);
          alert("復元が完了しました。");
        }
      } catch (_unused) {
        alert("JSONファイルの読み込みに失敗しました。");
      }
    };
    reader.readAsText(file);
  };
  var clearData = function clearData() {
    if (window.confirm("全データを削除しますか？この操作は元に戻せません。")) {
      if (window.confirm("本当に削除しますか？（2回確認）")) {
        updateData(_objectSpread({}, initialState));
        localStorage.removeItem(STORAGE_KEY);
        alert("データを削除しました。");
      }
    }
  };
  return /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "\uD83D\uDCC1 \u30C7\u30FC\u30BF\u7BA1\u7406"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(OutlineButton, {
    onClick: exportCSV,
    color: colors.income,
    style: {
      width: "100%"
    }
  }, "\uD83D\uDCCA \u652F\u51FA\u30C7\u30FC\u30BF\u3092CSV\u30A8\u30AF\u30B9\u30DD\u30FC\u30C8"), /*#__PURE__*/React.createElement(OutlineButton, {
    onClick: exportJSON,
    color: colors.saving,
    style: {
      width: "100%"
    }
  }, "\uD83D\uDCBE \u5168\u30C7\u30FC\u30BF\u3092JSON\u30D0\u30C3\u30AF\u30A2\u30C3\u30D7"), /*#__PURE__*/React.createElement("label", {
    style: {
      display: "block",
      padding: "10px 16px",
      textAlign: "center",
      border: "2px solid ".concat(colors.loan),
      borderRadius: 10,
      color: colors.loan,
      fontSize: 14,
      fontWeight: 600,
      cursor: "pointer"
    }
  }, "\uD83D\uDCC2 JSON\u304B\u3089\u5FA9\u5143", /*#__PURE__*/React.createElement("input", {
    type: "file",
    accept: ".json",
    onChange: importJSON,
    style: {
      display: "none"
    }
  })), /*#__PURE__*/React.createElement(OutlineButton, {
    onClick: clearData,
    color: colors.expense,
    style: {
      width: "100%"
    }
  }, "\uD83D\uDDD1 \u5168\u30C7\u30FC\u30BF\u3092\u524A\u9664")));
}
// マウント
var container = document.getElementById('root');
var root = ReactDOM.createRoot(container);
root.render(React.createElement(KakeiboApp, null));

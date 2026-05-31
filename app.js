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
  futurePlans: [],
  futureIncomes: [],
  customCats: [],
  budgets: {
    "食費": 50000,
    "外食": 20000,
    "住居費": 80000,
    "マンション管理費等": 20000,
    "電気代": 8000,
    "ガス代": 5000,
    "水道代": 3000,
    "通信費": 10000,
    "交通費": 20000,
    "保険料": 30000,
    "医療費": 10000,
    "勉強費": 10000,
    "雑費": 15000,
    "交際費": 20000,
    "車関係": 20000,
    "被服費": 10000,
    "こづかい1": 10000,
    "こづかい2": 10000,
    "楽天カード1": 30000,
    "楽天カード2": 30000,
    "イオンカード1": 30000,
    "イオンカード2": 30000,
    "奨学金返済1": 20000,
    "奨学金返済2": 20000,
    "ローン返済1": 30000,
    "ローン返済2": 30000,
    "クレジットカード": 30000,
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
      monthlyContribution: 0,
      // NISA月額積立
      investments: []
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
var EXPENSE_CATS = [{
  name: "食費",
  color: "#E74C3C",
  isFixed: false
}, {
  name: "外食",
  color: "#C0392B",
  isFixed: false
}, {
  name: "住居費",
  color: "#E67E22",
  isFixed: true
}, {
  name: "マンション管理費等",
  color: "#D35400",
  isFixed: true
}, {
  name: "電気代",
  color: "#F1C40F",
  isFixed: false
}, {
  name: "ガス代",
  color: "#FF9800",
  isFixed: false
}, {
  name: "水道代",
  color: "#3498DB",
  isFixed: false
}, {
  name: "通信費",
  color: "#2ECC71",
  isFixed: true
}, {
  name: "交通費",
  color: "#3498DB",
  isFixed: false
}, {
  name: "保険料",
  color: "#9B59B6",
  isFixed: true
}, {
  name: "医療費",
  color: "#E91E63",
  isFixed: false
}, {
  name: "勉強費",
  color: "#00BCD4",
  isFixed: false
}, {
  name: "雑費",
  color: "#795548",
  isFixed: false
}, {
  name: "交際費",
  color: "#FF9800",
  isFixed: false
}, {
  name: "車関係",
  color: "#546E7A",
  isFixed: false
}, {
  name: "被服費",
  color: "#607D8B",
  isFixed: false
}, {
  name: "こづかい1",
  color: "#FF7043",
  isFixed: false
}, {
  name: "こづかい2",
  color: "#FF8A65",
  isFixed: false
}, {
  name: "楽天カード1",
  color: "#BF0000",
  isFixed: false
}, {
  name: "楽天カード2",
  color: "#D32F2F",
  isFixed: false
}, {
  name: "イオンカード1",
  color: "#E91E63",
  isFixed: false
}, {
  name: "イオンカード2",
  color: "#F06292",
  isFixed: false
}, {
  name: "奨学金返済1",
  color: "#5C6BC0",
  isFixed: true
}, {
  name: "奨学金返済2",
  color: "#7986CB",
  isFixed: true
}, {
  name: "ローン返済1",
  color: "#00838F",
  isFixed: true
}, {
  name: "ローン返済2",
  color: "#00ACC1",
  isFixed: true
}, {
  name: "クレジットカード",
  color: "#1565C0",
  isFixed: false
}, {
  name: "その他",
  color: "#95A5A6",
  isFixed: false
}, {
  name: "NISA積立",
  color: "#27AE60",
  isFixed: true,
  isInvest: true
}, {
  name: "iDeCo",
  color: "#2980B9",
  isFixed: true,
  isInvest: true
}, {
  name: "変額年金",
  color: "#8E44AD",
  isFixed: true,
  isInvest: true
}];
// 後方互換用マップ（分析・ホーム参照）
var expenseCategories = Object.fromEntries(EXPENSE_CATS.map(function (c) {
  return [c.name, {
    color: c.color,
    subcategories: [],
    isFixed: false
  }];
}));

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
  emoji: "🏠",
  color: "#5B5EA6"
}, {
  id: "income",
  label: "収入",
  emoji: "💴",
  color: "#27AE60"
}, {
  id: "expense",
  label: "支出",
  emoji: "🛒",
  color: "#E74C3C"
}, {
  id: "loan",
  label: "ローン",
  emoji: "🏦",
  color: "#E67E22"
}, {
  id: "asset",
  label: "資産",
  emoji: "📈",
  color: "#8E44AD"
}, {
  id: "simulation",
  label: "シミュ",
  emoji: "🔮",
  color: "#2980B9"
}, {
  id: "financial",
  label: "財務諸表",
  emoji: "📊",
  color: "#1565C0"
}];

// ===== メインアプリ =====
function KakeiboApp() {
  var _useState = useState(function () {
      return loadData();
    }),
    _useState2 = _slicedToArray(_useState, 2),
    data = _useState2[0],
    setData = _useState2[1];
  var _useState3 = useState(function () {
      return localStorage.getItem("kakeibo-active-tab") || "home";
    }),
    _useState4 = _slicedToArray(_useState3, 2),
    activeTab = _useState4[0],
    setActiveTab = _useState4[1];
  var handleSetActiveTab = function handleSetActiveTab(tab) {
    localStorage.setItem("kakeibo-active-tab", tab);
    setActiveTab(tab);
  };

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
      case "financial":
        return /*#__PURE__*/React.createElement(FinancialTab, {
          data: data
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
    setActiveTab: handleSetActiveTab
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
      height: 74,
      backgroundColor: "#FFFFFF",
      borderTop: "1px solid #EBEBEB",
      display: "flex",
      zIndex: 1000,
      boxShadow: "0 -4px 16px rgba(0,0,0,0.10)"
    }
  }, TABS.map(function (tab) {
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
        gap: 3,
        border: "none",
        background: "none",
        cursor: "pointer",
        padding: "6px 0 4px",
        position: "relative"
      }
    }, active && /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        top: 6,
        left: "50%",
        transform: "translateX(-50%)",
        width: 44,
        height: 32,
        backgroundColor: tab.color + "22",
        borderRadius: 12
      }
    }), active && /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: 28,
        height: 3,
        backgroundColor: tab.color,
        borderRadius: "0 0 4px 4px"
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: active ? 27 : 23,
        lineHeight: 1,
        filter: active ? "none" : "grayscale(30%)",
        transition: "font-size 0.15s",
        zIndex: 1
      }
    }, tab.emoji), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        fontWeight: active ? 800 : 500,
        color: active ? tab.color : "#AAA",
        letterSpacing: active ? "0.02em" : 0,
        transition: "color 0.15s",
        zIndex: 1
      }
    }, tab.label));
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
  var _data$assets$nisa, _data$assets$ideco, _data$assets$nisa2, _data$assets$ideco2;
  var data = _ref16.data,
    updateData = _ref16.updateData;
  var today = new Date();
  var ym = "".concat(today.getFullYear(), "-").concat(String(today.getMonth() + 1).padStart(2, "0"));

  // 先月のYM
  var prevMonth = today.getMonth() === 0 ? "".concat(today.getFullYear() - 1, "-12") : "".concat(today.getFullYear(), "-").concat(String(today.getMonth()).padStart(2, "0"));

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
  var netIncome = grossIncome - totalDeductions + ((thisSalary === null || thisSalary === void 0 ? void 0 : thisSalary.bonus) || 0) + ((thisSalary === null || thisSalary === void 0 ? void 0 : thisSalary.spouseIncome) || 0) + ((thisSalary === null || thisSalary === void 0 ? void 0 : thisSalary.sideIncome) || 0) + Object.values((thisSalary === null || thisSalary === void 0 ? void 0 : thisSalary.businessIncome) || {}).reduce(function (a, b) {
    return a + b;
  }, 0) - Object.values((thisSalary === null || thisSalary === void 0 ? void 0 : thisSalary.generalDeductions) || {}).reduce(function (a, b) {
    return a + b;
  }, 0);

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

  // 先月の収支を将来予測の基準に
  var prevSalary = data.salaries.find(function (s) {
    return s.month === prevMonth;
  });
  var prevIncome = prevSalary ? prevSalary.basicSalary + Object.values(prevSalary.allowances || {}).reduce(function (a, b) {
    return a + b;
  }, 0) - Object.values(prevSalary.deductions || {}).reduce(function (a, b) {
    return a + b;
  }, 0) + (prevSalary.bonus || 0) + (prevSalary.spouseIncome || 0) + (prevSalary.sideIncome || 0) + Object.values(prevSalary.businessIncome || {}).reduce(function (a, b) {
    return a + b;
  }, 0) - Object.values(prevSalary.generalDeductions || {}).reduce(function (a, b) {
    return a + b;
  }, 0) : netIncome;
  var prevExpense = data.expenses.filter(function (e) {
    var _e$date2;
    return (_e$date2 = e.date) === null || _e$date2 === void 0 ? void 0 : _e$date2.startsWith(prevMonth);
  }).reduce(function (a, e) {
    return a + e.amount;
  }, 0);
  var monthlyBalance = prevIncome > 0 ? prevIncome - prevExpense : balance;
  var baseMonth = prevIncome > 0 ? prevMonth : ym;

  // ローン残高のn年後を計算
  var loanAfterMonths = function loanAfterMonths(months) {
    return data.loans.reduce(function (sum, loan) {
      var rate = loan.interestRate / 100 / 12;
      var bal = loan.remainingBalance;
      for (var i = 0; i < months && bal > 0; i++) {
        if (rate > 0) bal = Math.max(0, bal - (loan.monthlyPayment - Math.round(bal * rate)));else bal = Math.max(0, bal - loan.monthlyPayment);
      }
      return sum + bal;
    }, 0);
  };

  // 資産管理の月額積立合計（NISA＋iDeCo＋変額年金）
  var nisaMonthly = ((_data$assets$nisa2 = data.assets.nisa) === null || _data$assets$nisa2 === void 0 ? void 0 : _data$assets$nisa2.monthlyContribution) || 0;
  var idecoMonthly = ((_data$assets$ideco2 = data.assets.ideco) === null || _data$assets$ideco2 === void 0 ? void 0 : _data$assets$ideco2.monthlyContribution) || 0;
  var annuityMonthly = (data.assets.variableAnnuities || []).reduce(function (a, v) {
    return a + (v.monthlyPremium || 0);
  }, 0);
  var totalMonthlyInvest = nisaMonthly + idecoMonthly + annuityMonthly;

  // 将来予測の行
  var forecasts = [5, 10, 15, 20].map(function (years) {
    var months = years * 12;
    var planCost = (data.futurePlans || []).filter(function (p) {
      return (p.years || 0) <= years;
    }).reduce(function (a, p) {
      return a + (p.amount || 0);
    }, 0);
    var incomeGain = (data.futureIncomes || []).filter(function (p) {
      return (p.years || 0) <= years;
    }).reduce(function (a, p) {
      return a + (p.amount || 0);
    }, 0);
    var futureAsset = totalAsset + monthlyBalance * months + totalMonthlyInvest * months - planCost + incomeGain;
    var futureLoan = loanAfterMonths(months);
    var futureNetWorth = futureAsset - futureLoan;
    return {
      years: years,
      futureAsset: futureAsset,
      futureLoan: futureLoan,
      futureNetWorth: futureNetWorth
    };
  });

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
  var _useState1 = useState(ym),
    _useState10 = _slicedToArray(_useState1, 2),
    cardMonth = _useState10[0],
    setCardMonth = _useState10[1];
  var loanTypeIcon = {
    car: "🚗",
    housing: "🏠",
    scholarship: "🎓",
    other: "💰"
  };

  // cardMonth用のデータを計算
  var cardSalary = data.salaries.find(function (s) {
    return s.month === cardMonth;
  });
  var cardGross = cardSalary ? cardSalary.basicSalary + Object.values(cardSalary.allowances || {}).reduce(function (a, b) {
    return a + b;
  }, 0) : 0;
  var cardDed = cardSalary ? Object.values(cardSalary.deductions || {}).reduce(function (a, b) {
    return a + b;
  }, 0) : 0;
  var cardNet = cardGross - cardDed + ((cardSalary === null || cardSalary === void 0 ? void 0 : cardSalary.bonus) || 0) + ((cardSalary === null || cardSalary === void 0 ? void 0 : cardSalary.spouseIncome) || 0) + ((cardSalary === null || cardSalary === void 0 ? void 0 : cardSalary.sideIncome) || 0) + Object.values((cardSalary === null || cardSalary === void 0 ? void 0 : cardSalary.businessIncome) || {}).reduce(function (a, b) {
    return a + b;
  }, 0) - Object.values((cardSalary === null || cardSalary === void 0 ? void 0 : cardSalary.generalDeductions) || {}).reduce(function (a, b) {
    return a + b;
  }, 0);
  var cardExpense = data.expenses.filter(function (e) {
    var _e$date3;
    return (_e$date3 = e.date) === null || _e$date3 === void 0 ? void 0 : _e$date3.startsWith(cardMonth);
  }).reduce(function (a, e) {
    return a + e.amount;
  }, 0);
  var cardBalance = cardNet - cardExpense;
  var shiftCardMonth = function shiftCardMonth(delta) {
    var _cardMonth$split$map = cardMonth.split("-").map(Number),
      _cardMonth$split$map2 = _slicedToArray(_cardMonth$split$map, 2),
      y = _cardMonth$split$map2[0],
      m = _cardMonth$split$map2[1];
    var d = new Date(y, m - 1 + delta, 1);
    var next = "".concat(d.getFullYear(), "-").concat(String(d.getMonth() + 1).padStart(2, "0"));
    // 未来月には進めない
    if (next <= ym) setCardMonth(next);
  };
  var _cardMonth$split$map3 = cardMonth.split("-").map(Number),
    _cardMonth$split$map4 = _slicedToArray(_cardMonth$split$map3, 2),
    cm_y = _cardMonth$split$map4[0],
    cm_m = _cardMonth$split$map4[1];
  var isCurrentMonth = cardMonth === ym;
  var _baseMonth$split$map = baseMonth.split("-").map(Number),
    _baseMonth$split$map2 = _slicedToArray(_baseMonth$split$map, 2),
    bm_y = _baseMonth$split$map2[0],
    bm_m = _baseMonth$split$map2[1];

  // 月末リマインダー（25日〜月末に表示）
  var todayDay = today.getDate();
  var dismissKey = "kakeibo-asset-reminder-".concat(ym);
  var _useState11 = useState(function () {
      return localStorage.getItem(dismissKey) === "1";
    }),
    _useState12 = _slicedToArray(_useState11, 2),
    reminderDismissed = _useState12[0],
    setReminderDismissed = _useState12[1];
  var showReminder = todayDay >= 25 && !reminderDismissed;
  var dismissReminder = function dismissReminder() {
    localStorage.setItem(dismissKey, "1");
    setReminderDismissed(true);
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "16px 16px 4px",
      display: "flex",
      alignItems: "baseline",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 20,
      fontWeight: 800,
      color: colors.text
    }
  }, "\u5BB6\u8A08\u7C3F"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 16,
      fontWeight: 600,
      color: colors.textLight
    }
  }, today.getFullYear(), "\u5E74", today.getMonth() + 1, "\u6708")), showReminder && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 16px 8px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      backgroundColor: "#FFF9E6",
      border: "1.5px solid #F1C40F",
      borderRadius: 12,
      padding: "12px 14px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 22
    }
  }, "\uD83D\uDD14"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: "#B8860B"
    }
  }, "\u8CC7\u7523\u7BA1\u7406\u306E\u66F4\u65B0\u3092\u3057\u307E\u3057\u3087\u3046"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "#8B6914",
      marginTop: 2
    }
  }, "\u9280\u884C\u6B8B\u9AD8\u30FBNISA\u8A55\u4FA1\u984D\u306A\u3069\u3092\u6700\u65B0\u306E\u5024\u306B\u66F4\u65B0\u3057\u3066\u304F\u3060\u3055\u3044"))), /*#__PURE__*/React.createElement("button", {
    onClick: dismissReminder,
    style: {
      background: "none",
      border: "none",
      fontSize: 18,
      color: "#B8860B",
      cursor: "pointer",
      flexShrink: 0,
      padding: 4
    }
  }, "\u2715"))), /*#__PURE__*/React.createElement("div", {
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
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return shiftCardMonth(-1);
    },
    style: {
      background: "rgba(255,255,255,0.2)",
      border: "none",
      borderRadius: 8,
      color: "#fff",
      fontSize: 20,
      width: 36,
      height: 36,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, "\u2039"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      fontWeight: 700
    }
  }, cm_y, "\u5E74", cm_m, "\u6708", isCurrentMonth ? "（今月）" : ""), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return shiftCardMonth(1);
    },
    style: {
      background: isCurrentMonth ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.2)",
      border: "none",
      borderRadius: 8,
      color: isCurrentMonth ? "rgba(255,255,255,0.3)" : "#fff",
      fontSize: 20,
      width: 36,
      height: 36,
      cursor: isCurrentMonth ? "default" : "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, "\u203A")), /*#__PURE__*/React.createElement("div", {
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
  }, fmtYen(cardNet))), /*#__PURE__*/React.createElement("div", {
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
  }, "-", fmtYen(cardExpense))), /*#__PURE__*/React.createElement("div", {
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
      color: cardBalance >= 0 ? "#A8FFB0" : "#FFB0B0"
    }
  }, cardBalance >= 0 ? "+" : "", fmtYen(cardBalance)))), /*#__PURE__*/React.createElement("div", {
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
  })), /*#__PURE__*/React.createElement(Card, {
    style: {
      border: "1.5px solid ".concat(colors.asset)
    }
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "\u3010\u4E88\u60F3\u3011\u5C06\u6765\u306E\u8CC7\u7523\u30FB\u8CA0\u50B5",
    color: colors.asset
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: colors.textLight,
      marginBottom: 10
    }
  }, bm_y, "\u5E74", bm_m, "\u6708\u306E\u53CE\u652F\uFF08\u6708", monthlyBalance >= 0 ? "+" : "", fmtYen(monthlyBalance), "\uFF09\u3092\u5143\u306B\u8A08\u7B97\u3057\u3066\u3044\u307E\u3059", totalMonthlyInvest > 0 && /*#__PURE__*/React.createElement("span", null, "\u3000\uFF0B\u3000NISA\u30FBiDeCo\u30FB\u5909\u984D\u5E74\u91D1 \u6708", fmtYen(totalMonthlyInvest), "\u3092\u52A0\u7B97")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      borderBottom: "1.5px solid #EEE",
      paddingBottom: 6,
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "0 0 52px"
    }
  }), ["総資産", "ローン残高", "純資産"].map(function (h) {
    return /*#__PURE__*/React.createElement("div", {
      key: h,
      style: {
        flex: 1,
        textAlign: "right",
        fontSize: 11,
        fontWeight: 700,
        color: colors.textLight
      }
    }, h);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      padding: "6px 0",
      borderBottom: "1px solid #F0F0F0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "0 0 52px",
      fontSize: 12,
      fontWeight: 700,
      color: colors.text
    }
  }, "\u73FE\u5728"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      textAlign: "right",
      fontSize: 12,
      fontWeight: 600,
      color: colors.asset
    }
  }, fmtYen(totalAsset)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      textAlign: "right",
      fontSize: 12,
      fontWeight: 600,
      color: colors.loan
    }
  }, fmtYen(totalLoan)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      textAlign: "right",
      fontSize: 13,
      fontWeight: 800,
      color: netWorth >= 0 ? colors.income : colors.expense
    }
  }, netWorth < 0 ? "▲" : "", fmtYen(Math.abs(netWorth)))), forecasts.map(function (_ref19) {
    var years = _ref19.years,
      futureAsset = _ref19.futureAsset,
      futureLoan = _ref19.futureLoan,
      futureNetWorth = _ref19.futureNetWorth;
    return /*#__PURE__*/React.createElement("div", {
      key: years,
      style: {
        display: "flex",
        alignItems: "center",
        padding: "6px 0",
        borderBottom: "1px solid #F5F5F5"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: "0 0 52px",
        fontSize: 12,
        fontWeight: 700,
        color: colors.asset
      }
    }, years, "\u5E74\u5F8C"), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        textAlign: "right",
        fontSize: 12,
        color: colors.asset
      }
    }, fmtYen(Math.max(0, futureAsset))), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        textAlign: "right",
        fontSize: 12,
        color: colors.loan
      }
    }, futureLoan > 0 ? fmtYen(futureLoan) : /*#__PURE__*/React.createElement("span", {
      style: {
        color: colors.income,
        fontWeight: 700
      }
    }, "\u5B8C\u6E08")), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        textAlign: "right",
        fontSize: 13,
        fontWeight: 800,
        color: futureNetWorth >= 0 ? colors.income : colors.expense
      }
    }, futureNetWorth < 0 ? "▲" : "", fmtYen(Math.abs(futureNetWorth))));
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
    label: function label(_ref20) {
      var name = _ref20.name,
        percent = _ref20.percent;
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
    businessIncome: {
      firstYearFee: 0,
      renewalFee: 0,
      conservationFee: 0,
      nonLifeFee: 0,
      commuting: 0,
      carInsuranceSubsidy: 0,
      taxAdjustment: 0,
      balanceFee: 0,
      other: 0
    },
    generalDeductions: {
      groupInsurance: 0,
      novelty: 0,
      salesTool: 0,
      printing: 0,
      donation: 0,
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
    spouseIncome: 0,
    sideIncome: 0,
    memo: ""
  };
};
function IncomeTab(_ref21) {
  var data = _ref21.data,
    updateData = _ref21.updateData;
  var _useState13 = useState("毎月収入"),
    _useState14 = _slicedToArray(_useState13, 2),
    incSubtab = _useState14[0],
    setIncSubtab = _useState14[1];
  var _useState15 = useState(currentYM()),
    _useState16 = _slicedToArray(_useState15, 2),
    month = _useState16[0],
    setMonth = _useState16[1];
  var existing = data.salaries.find(function (s) {
    return s.month === month;
  });
  var _useState17 = useState(existing || blankSalary()),
    _useState18 = _slicedToArray(_useState17, 2),
    form = _useState18[0],
    setForm = _useState18[1];
  var _useState19 = useState(false),
    _useState20 = _slicedToArray(_useState19, 2),
    saved = _useState20[0],
    setSaved = _useState20[1];
  useEffect(function () {
    var e = data.salaries.find(function (s) {
      return s.month === month;
    });
    if (e) {
      setForm(_objectSpread({}, e));
    } else {
      // 前月データをコピーして翌月の初期値にする
      var _month$split$map5 = month.split("-").map(Number),
        _month$split$map6 = _slicedToArray(_month$split$map5, 2),
        y = _month$split$map6[0],
        m = _month$split$map6[1];
      var prevMonth = m === 1 ? "".concat(y - 1, "-12") : "".concat(y, "-").concat(String(m - 1).padStart(2, "0"));
      var prev = data.salaries.find(function (s) {
        return s.month === prevMonth;
      });
      if (prev) {
        setForm(_objectSpread(_objectSpread({}, prev), {}, {
          month: month,
          bonus: 0,
          memo: ""
        }));
      } else {
        setForm(_objectSpread(_objectSpread({}, blankSalary()), {}, {
          month: month
        }));
      }
    }
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
  var setBI = function setBI(field) {
    return function (val) {
      return setForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          businessIncome: _objectSpread(_objectSpread({}, f.businessIncome || {}), {}, _defineProperty({}, field, val))
        });
      });
    };
  };
  var setGD = function setGD(field) {
    return function (val) {
      return setForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          generalDeductions: _objectSpread(_objectSpread({}, f.generalDeductions || {}), {}, _defineProperty({}, field, val))
        });
      });
    };
  };
  var grossPay = form.basicSalary + Object.values(form.allowances).reduce(function (a, b) {
    return a + b;
  }, 0);
  var totalBI = Object.values(form.businessIncome || {}).reduce(function (a, b) {
    return a + b;
  }, 0);
  var totalGD = Object.values(form.generalDeductions || {}).reduce(function (a, b) {
    return a + b;
  }, 0);
  var totalDed = Object.values(form.deductions).reduce(function (a, b) {
    return a + b;
  }, 0);
  var netPay = grossPay + totalBI - totalGD - totalDed;
  var totalIncome = netPay + (form.bonus || 0) + (form.spouseIncome || 0) + (form.sideIncome || 0);

  // 固定費（カテゴリで自動判定：住居費・通信費・保険料）
  var fixedExpenses = data.expenses.filter(function (e) {
    var _e$date4, _EXPENSE_CATS$find;
    return ((_e$date4 = e.date) === null || _e$date4 === void 0 ? void 0 : _e$date4.startsWith(month)) && ((_EXPENSE_CATS$find = EXPENSE_CATS.find(function (c) {
      return c.name === e.category;
    })) === null || _EXPENSE_CATS$find === void 0 ? void 0 : _EXPENSE_CATS$find.isFixed);
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
        手取り: Math.max(0, basic + ((s === null || s === void 0 ? void 0 : s.bonus) || 0) + ((s === null || s === void 0 ? void 0 : s.spouseIncome) || 0) + ((s === null || s === void 0 ? void 0 : s.sideIncome) || 0) + Object.values((s === null || s === void 0 ? void 0 : s.businessIncome) || {}).reduce(function (a, b) {
          return a + b;
        }, 0) - Object.values((s === null || s === void 0 ? void 0 : s.generalDeductions) || {}).reduce(function (a, b) {
          return a + b;
        }, 0)),
        基本給: Math.max(0, basic),
        配偶者収入: (s === null || s === void 0 ? void 0 : s.spouseIncome) || 0,
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
      display: "flex",
      padding: "0 16px 8px",
      gap: 6
    }
  }, ["毎月収入", "将来の収入"].map(function (t) {
    return /*#__PURE__*/React.createElement("button", {
      key: t,
      onClick: function onClick() {
        return setIncSubtab(t);
      },
      style: {
        flex: 1,
        padding: "8px 4px",
        borderRadius: 10,
        border: "none",
        cursor: "pointer",
        fontSize: 13,
        fontWeight: 700,
        backgroundColor: incSubtab === t ? colors.income : "#EEE",
        color: incSubtab === t ? "#fff" : colors.text
      }
    }, t);
  })), incSubtab === "将来の収入" ? /*#__PURE__*/React.createElement(FutureIncomeTab, {
    data: data,
    updateData: updateData
  }) : /*#__PURE__*/React.createElement("div", {
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
    title: "\u3010\u4E8B\u696D\u6240\u5F97\u3011",
    defaultOpen: false
  }, /*#__PURE__*/React.createElement(AmountInput, {
    label: "\u521D\u5E74\u5EA6\u624B\u6570\u6599",
    value: (form.businessIncome || {}).firstYearFee || 0,
    onChange: setBI("firstYearFee")
  }), /*#__PURE__*/React.createElement(AmountInput, {
    label: "\u7D99\u7D9A\u624B\u6570\u6599",
    value: (form.businessIncome || {}).renewalFee || 0,
    onChange: setBI("renewalFee")
  }), /*#__PURE__*/React.createElement(AmountInput, {
    label: "\u4FDD\u5168\u30D5\u30A3\u30FC",
    value: (form.businessIncome || {}).conservationFee || 0,
    onChange: setBI("conservationFee")
  }), /*#__PURE__*/React.createElement(AmountInput, {
    label: "\u640D\u4FDD\u624B\u6570\u6599",
    value: (form.businessIncome || {}).nonLifeFee || 0,
    onChange: setBI("nonLifeFee")
  }), /*#__PURE__*/React.createElement(AmountInput, {
    label: "\u901A\u52E4\u624B\u5F53",
    value: (form.businessIncome || {}).commuting || 0,
    onChange: setBI("commuting")
  }), /*#__PURE__*/React.createElement(AmountInput, {
    label: "\u81EA\u52D5\u8ECA\u4FDD\u967A\u88DC\u52A9",
    value: (form.businessIncome || {}).carInsuranceSubsidy || 0,
    onChange: setBI("carInsuranceSubsidy")
  }), /*#__PURE__*/React.createElement(AmountInput, {
    label: "\u6D88\u8CBB\u7A0E\u8ABF\u6574",
    value: (form.businessIncome || {}).taxAdjustment || 0,
    onChange: setBI("taxAdjustment")
  }), /*#__PURE__*/React.createElement(AmountInput, {
    label: "\u6B8B\u9AD8\u6BD4\u4F8B\u624B\u6570\u6599",
    value: (form.businessIncome || {}).balanceFee || 0,
    onChange: setBI("balanceFee")
  }), /*#__PURE__*/React.createElement(AmountInput, {
    label: "\u305D\u306E\u4ED6",
    value: (form.businessIncome || {}).other || 0,
    onChange: setBI("other")
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
  }, "\u4E8B\u696D\u6240\u5F97\u5408\u8A08"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18,
      fontWeight: 700,
      color: "#E67E22"
    }
  }, "+", fmtYen(totalBI))))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(Accordion, {
    title: "\u3010\u4E00\u822C\u63A7\u9664\u3011",
    defaultOpen: false
  }, /*#__PURE__*/React.createElement(AmountInput, {
    label: "\u30B0\u30EB\u30FC\u30D7\u4FDD\u967A\u6599",
    value: (form.generalDeductions || {}).groupInsurance || 0,
    onChange: setGD("groupInsurance")
  }), /*#__PURE__*/React.createElement(AmountInput, {
    label: "\u30CE\u30D9\u30EB\u30C6\u30A3\u8CFC\u5165",
    value: (form.generalDeductions || {}).novelty || 0,
    onChange: setGD("novelty")
  }), /*#__PURE__*/React.createElement(AmountInput, {
    label: "\u55B6\u696D\u30C4\u30FC\u30EB\u5229\u7528\u6599",
    value: (form.generalDeductions || {}).salesTool || 0,
    onChange: setGD("salesTool")
  }), /*#__PURE__*/React.createElement(AmountInput, {
    label: "\u5370\u5237\u4EE3",
    value: (form.generalDeductions || {}).printing || 0,
    onChange: setGD("printing")
  }), /*#__PURE__*/React.createElement(AmountInput, {
    label: "\u793E\u4F1A\u8CA2\u732E\u52DF\u91D1",
    value: (form.generalDeductions || {}).donation || 0,
    onChange: setGD("donation")
  }), /*#__PURE__*/React.createElement(AmountInput, {
    label: "\u305D\u306E\u4ED6",
    value: (form.generalDeductions || {}).other || 0,
    onChange: setGD("other")
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
  }, "\u4E00\u822C\u63A7\u9664\u5408\u8A08"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18,
      fontWeight: 700,
      color: colors.expense
    }
  }, "-", fmtYen(totalGD))))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(Accordion, {
    title: "\u3010\u63A7\u9664\u3011",
    defaultOpen: true
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
      fontSize: 11,
      color: colors.textLight,
      textAlign: "center",
      marginBottom: 4
    }
  }, "\u652F\u7D66 \uFF0B \u4E8B\u696D\u6240\u5F97 \u2212 \u4E00\u822C\u63A7\u9664 \u2212 \u63A7\u9664"), /*#__PURE__*/React.createElement("div", {
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
  }, "\u652F\u7D66\u5408\u8A08"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: colors.income
    }
  }, "+", fmtYen(grossPay))), /*#__PURE__*/React.createElement("div", {
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
  }, "\u4E8B\u696D\u6240\u5F97"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: "#E67E22"
    }
  }, "+", fmtYen(totalBI))), /*#__PURE__*/React.createElement("div", {
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
  }, "\u4E00\u822C\u63A7\u9664"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: colors.expense
    }
  }, "-", fmtYen(totalGD))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: colors.textLight
    }
  }, "\u63A7\u9664\u5408\u8A08"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: colors.expense
    }
  }, "-", fmtYen(totalDed))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "2px solid #C8E6C9",
      paddingTop: 8,
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
    title: "\u914D\u5076\u8005\u53CE\u5165\u30FB\u30DC\u30FC\u30CA\u30B9\u30FB\u526F\u53CE\u5165"
  }), /*#__PURE__*/React.createElement(AmountInput, {
    label: "\u914D\u5076\u8005\u53CE\u5165\uFF08\u624B\u53D6\u308A\uFF09",
    value: form.spouseIncome,
    onChange: function onChange(v) {
      return setForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          spouseIncome: v
        });
      });
    }
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
    title: "\u6BCE\u6708\u306E\u4F59\u88D5\u8CC7\u91D1",
    color: colors.saving
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: colors.textLight,
      marginBottom: 8
    }
  }, "\u624B\u53D6\u308A\u53CE\u5165 \u2212 \u56FA\u5B9A\u8CBB \u2212 \u30ED\u30FC\u30F3\u8FD4\u6E08 = \u81EA\u7531\u306B\u4F7F\u3048\u308B\u304A\u91D1"), /*#__PURE__*/React.createElement("div", {
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
  }, "\u4ECA\u6708\u306E\u4F59\u88D5\u8CC7\u91D1"), /*#__PURE__*/React.createElement("span", {
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

// ===== 将来の収入タブ =====
var FUTURE_INCOME_TYPES = [{
  type: "retirement",
  label: "💼 退職金",
  color: "#1565C0"
}, {
  type: "insurance",
  label: "🛡 生命保険満期金",
  color: "#27AE60"
}, {
  type: "inheritance",
  label: "🏛 相続",
  color: "#8E44AD"
}, {
  type: "pension",
  label: "🧓 年金（一時金）",
  color: "#E67E22"
}, {
  type: "property",
  label: "🏠 不動産売却",
  color: "#E74C3C"
}, {
  type: "other",
  label: "🎁 その他",
  color: "#607D8B"
}];
function FutureIncomeTab(_ref22) {
  var data = _ref22.data,
    updateData = _ref22.updateData;
  var plans = data.futureIncomes || [];
  var blankForm = function blankForm() {
    return {
      id: null,
      type: "retirement",
      label: "",
      years: "",
      amount: "",
      memo: ""
    };
  };
  var _useState21 = useState(blankForm()),
    _useState22 = _slicedToArray(_useState21, 2),
    form = _useState22[0],
    setForm = _useState22[1];
  var _useState23 = useState(false),
    _useState24 = _slicedToArray(_useState23, 2),
    editing = _useState24[0],
    setEditing = _useState24[1];
  var F = function F(field) {
    return function (val) {
      return setForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, _defineProperty({}, field, val));
      });
    };
  };
  var save = function save() {
    if (!form.years || !form.amount) return;
    var entry = _objectSpread(_objectSpread({}, form), {}, {
      id: form.id || genId(),
      years: Number(form.years),
      amount: Number(form.amount)
    });
    updateData(function (prev) {
      var list = prev.futureIncomes || [];
      return _objectSpread(_objectSpread({}, prev), {}, {
        futureIncomes: form.id ? list.map(function (p) {
          return p.id === form.id ? entry : p;
        }) : [].concat(_toConsumableArray(list), [entry])
      });
    });
    setForm(blankForm());
    setEditing(false);
  };
  var del = function del(id) {
    return updateData(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, {
        futureIncomes: (prev.futureIncomes || []).filter(function (p) {
          return p.id !== id;
        })
      });
    });
  };
  var startEdit = function startEdit(p) {
    setForm(_objectSpread({}, p));
    setEditing(true);
  };
  var sorted = _toConsumableArray(plans).sort(function (a, b) {
    return a.years - b.years;
  });
  var typeInfo = function typeInfo(t) {
    return FUTURE_INCOME_TYPES.find(function (x) {
      return x.type === t;
    }) || FUTURE_INCOME_TYPES[5];
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 16px"
    }
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(SectionHeader, {
    title: editing ? "✏️ 将来の収入を編集" : "＋ 将来の収入を追加",
    color: colors.income
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: colors.textLight,
      marginBottom: 10
    }
  }, "\u9000\u8077\u91D1\u30FB\u4FDD\u967A\u6E80\u671F\u91D1\u30FB\u76F8\u7D9A\u306A\u3069\u3001\u5C06\u6765\u53D7\u3051\u53D6\u308B\u4E88\u5B9A\u306E\u4E00\u6642\u7684\u306A\u53CE\u5165\u3092\u767B\u9332\u3057\u307E\u3059"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 6,
      marginBottom: 12
    }
  }, FUTURE_INCOME_TYPES.map(function (t) {
    return /*#__PURE__*/React.createElement("button", {
      key: t.type,
      onClick: function onClick() {
        return setForm(function (f) {
          return _objectSpread(_objectSpread({}, f), {}, {
            type: t.type
          });
        });
      },
      style: {
        padding: "6px 10px",
        borderRadius: 20,
        border: "none",
        cursor: "pointer",
        fontSize: 12,
        fontWeight: 700,
        backgroundColor: form.type === t.type ? t.color : "#EEE",
        color: form.type === t.type ? "#fff" : colors.text
      }
    }, t.label);
  })), /*#__PURE__*/React.createElement(TextInput, {
    label: "\u540D\u79F0\uFF08\u4EFB\u610F\uFF09",
    value: form.label,
    onChange: F("label"),
    placeholder: typeInfo(form.type).label
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: colors.textLight,
      marginBottom: 4
    }
  }, "\u4F55\u5E74\u5F8C"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    inputMode: "numeric",
    value: form.years,
    onChange: function onChange(e) {
      return setForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          years: e.target.value
        });
      });
    },
    placeholder: "\u4F8B: 20",
    style: {
      width: "100%",
      padding: "10px 12px",
      fontSize: 15,
      border: "1.5px solid #DDD",
      borderRadius: 10,
      boxSizing: "border-box"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 2
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: colors.textLight,
      marginBottom: 4
    }
  }, "\u91D1\u984D\uFF08\u5186\uFF09"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    inputMode: "numeric",
    value: form.amount,
    onChange: function onChange(e) {
      return setForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          amount: e.target.value
        });
      });
    },
    placeholder: "\u4F8B: 3000000",
    style: {
      width: "100%",
      padding: "10px 12px",
      fontSize: 15,
      border: "1.5px solid #DDD",
      borderRadius: 10,
      boxSizing: "border-box"
    }
  }))), /*#__PURE__*/React.createElement(TextInput, {
    label: "\u30E1\u30E2\uFF08\u4EFB\u610F\uFF09",
    value: form.memo,
    onChange: F("memo"),
    placeholder: "\u88DC\u8DB3\u30FB\u6761\u4EF6\u306A\u3069"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement(PrimaryButton, {
    onClick: save,
    color: colors.income,
    style: {
      flex: 1
    }
  }, editing ? "更新する" : "追加する"), editing && /*#__PURE__*/React.createElement(OutlineButton, {
    onClick: function onClick() {
      setForm(blankForm());
      setEditing(false);
    },
    color: colors.neutral,
    style: {
      flex: 1
    }
  }, "\u30AD\u30E3\u30F3\u30BB\u30EB"))), sorted.length === 0 ? /*#__PURE__*/React.createElement(EmptyState, {
    message: "\u5C06\u6765\u306E\u53CE\u5165\u304C\u307E\u3060\u767B\u9332\u3055\u308C\u3066\u3044\u307E\u305B\u3093"
  }) : /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "\u767B\u9332\u6E08\u307F\u306E\u5C06\u6765\u53CE\u5165"
  }), sorted.map(function (p) {
    var info = typeInfo(p.type);
    var displayLabel = p.label || info.label;
    var nowYear = new Date().getFullYear();
    return /*#__PURE__*/React.createElement("div", {
      key: p.id,
      style: {
        padding: "12px 14px",
        borderRadius: 12,
        marginBottom: 8,
        border: "1.5px solid ".concat(info.color, "20"),
        backgroundColor: "".concat(info.color, "08")
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 6,
        marginBottom: 4
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        fontWeight: 700,
        color: info.color,
        backgroundColor: "".concat(info.color, "20"),
        padding: "2px 8px",
        borderRadius: 20
      }
    }, info.label), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: colors.textLight
      }
    }, p.years, "\u5E74\u5F8C\uFF08", nowYear + p.years, "\u5E74\uFF09")), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 15,
        fontWeight: 700,
        color: colors.text
      }
    }, displayLabel), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 18,
        fontWeight: 800,
        color: info.color,
        marginTop: 2
      }
    }, fmtYen(p.amount)), p.memo && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: colors.textLight,
        marginTop: 4
      }
    }, p.memo)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 6,
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return startEdit(p);
      },
      style: {
        padding: "6px 10px",
        backgroundColor: "#EEE",
        border: "none",
        borderRadius: 8,
        fontSize: 12,
        cursor: "pointer"
      }
    }, "\u7DE8\u96C6"), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return del(p.id);
      },
      style: {
        padding: "6px 10px",
        backgroundColor: "#FFEBEE",
        color: "#E74C3C",
        border: "none",
        borderRadius: 8,
        fontSize: 12,
        cursor: "pointer"
      }
    }, "\u524A\u9664"))));
  }), /*#__PURE__*/React.createElement(Divider, null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: colors.textLight
    }
  }, "\u5408\u8A08\u4E88\u5B9A\u53D7\u53D6\u984D"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18,
      fontWeight: 800,
      color: colors.income
    }
  }, fmtYen(sorted.reduce(function (a, p) {
    return a + p.amount;
  }, 0))))));
}

// ===== フェーズ5・6: 支出タブ =====

// 日付文字列ユーティリティ
function addDays(dateStr, n) {
  var d = new Date(dateStr);
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
}
function daysInMonth(ym) {
  var _ym$split$map = ym.split("-").map(Number),
    _ym$split$map2 = _slicedToArray(_ym$split$map, 2),
    y = _ym$split$map2[0],
    m = _ym$split$map2[1];
  return new Date(y, m, 0).getDate();
}

// 月別支出一覧（メイン画面）
function ExpenseMonthlyView(_ref23) {
  var data = _ref23.data,
    updateData = _ref23.updateData,
    month = _ref23.month,
    setMonth = _ref23.setMonth,
    onSelectDate = _ref23.onSelectDate;
  var days = daysInMonth(month);
  var _month$split$map7 = month.split("-").map(Number),
    _month$split$map8 = _slicedToArray(_month$split$map7, 2),
    y = _month$split$map8[0],
    m = _month$split$map8[1];
  var monthTotal = data.expenses.filter(function (e) {
    var _e$date5;
    return (_e$date5 = e.date) === null || _e$date5 === void 0 ? void 0 : _e$date5.startsWith(month);
  }).reduce(function (a, e) {
    return a + e.amount;
  }, 0);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(MonthNavigator, {
    month: month,
    setMonth: setMonth
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 16px 8px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      backgroundColor: "#FFF5F5",
      border: "2px solid ".concat(colors.expense),
      borderRadius: 14,
      padding: "12px 16px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: colors.textLight,
      fontWeight: 600
    }
  }, month, " \u5408\u8A08\u652F\u51FA"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 22,
      fontWeight: 800,
      color: colors.expense
    }
  }, "-", fmtYen(monthTotal)))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 16px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      padding: "8px 14px",
      marginBottom: 4,
      backgroundColor: "#F0F0F0",
      borderRadius: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: "0 0 70px",
      fontSize: 12,
      color: colors.textLight,
      fontWeight: 700
    }
  }, "\u65E5\u4ED8"), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 12,
      color: colors.textLight,
      fontWeight: 700
    }
  }, "\u30AB\u30C6\u30B4\u30EA\u5185\u8A33"), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: "0 0 90px",
      fontSize: 12,
      color: colors.textLight,
      fontWeight: 700,
      textAlign: "right"
    }
  }, "\u91D1\u984D")), Array.from({
    length: days
  }, function (_, i) {
    var day = i + 1;
    var dateStr = "".concat(month, "-").concat(String(day).padStart(2, "0"));
    var dayExps = data.expenses.filter(function (e) {
      return e.date === dateStr;
    });
    var dayTotal = dayExps.reduce(function (a, e) {
      return a + e.amount;
    }, 0);
    var today = todayStr();
    var isToday = dateStr === today;

    // カテゴリ色ドット（最大4つ）
    var cats = _toConsumableArray(new Set(dayExps.map(function (e) {
      return e.category;
    }))).slice(0, 4);
    return /*#__PURE__*/React.createElement("div", {
      key: day,
      onClick: function onClick() {
        return onSelectDate(dateStr);
      },
      style: {
        display: "flex",
        alignItems: "center",
        padding: "11px 14px",
        marginBottom: 3,
        borderRadius: 12,
        backgroundColor: isToday ? "#FFF9E6" : colors.card,
        border: isToday ? "1.5px solid #F1C40F" : "1.5px solid transparent",
        cursor: "pointer",
        transition: "background 0.1s"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: "0 0 70px"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 15,
        fontWeight: isToday ? 800 : 600,
        color: isToday ? "#B8860B" : colors.text
      }
    }, m, "/", day), isToday && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        color: "#B8860B",
        marginLeft: 4
      }
    }, "\u4ECA\u65E5")), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        display: "flex",
        gap: 4,
        flexWrap: "wrap"
      }
    }, cats.length > 0 ? cats.map(function (name) {
      var cat = EXPENSE_CATS.find(function (c) {
        return c.name === name;
      });
      return /*#__PURE__*/React.createElement("div", {
        key: name,
        style: {
          display: "flex",
          alignItems: "center",
          gap: 3
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: (cat === null || cat === void 0 ? void 0 : cat.color) || colors.neutral
        }
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 10,
          color: colors.textLight
        }
      }, name));
    }) : /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        color: "#DDD"
      }
    }, "\u2014")), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: "0 0 90px",
        textAlign: "right"
      }
    }, dayTotal > 0 ? /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 15,
        fontWeight: 700,
        color: colors.expense
      }
    }, "-", fmtYen(dayTotal)) : /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        color: "#DDD"
      }
    }, "\u2014")));
  })));
}
function ExpenseTab(_ref24) {
  var data = _ref24.data,
    updateData = _ref24.updateData;
  var _useState25 = useState("月別"),
    _useState26 = _slicedToArray(_useState25, 2),
    subtab = _useState26[0],
    setSubtab = _useState26[1];
  var _useState27 = useState(currentYM()),
    _useState28 = _slicedToArray(_useState27, 2),
    month = _useState28[0],
    setMonth = _useState28[1];
  var _useState29 = useState(null),
    _useState30 = _slicedToArray(_useState29, 2),
    selectedDate = _useState30[0],
    setSelectedDate = _useState30[1];
  var monthExpenses = data.expenses.filter(function (e) {
    var _e$date6;
    return (_e$date6 = e.date) === null || _e$date6 === void 0 ? void 0 : _e$date6.startsWith(month);
  });
  var navigateDay = function navigateDay(dateStr) {
    return setSelectedDate(dateStr);
  };
  var handleSubtab = function handleSubtab(t) {
    setSubtab(t);
    setSelectedDate(null);
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PageTitle, {
    title: "\uD83D\uDCB3 \u652F\u51FA"
  }), !selectedDate && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      padding: "0 16px 12px",
      overflowX: "auto"
    }
  }, ["月別", "分析", "将来プラン"].map(function (t) {
    return /*#__PURE__*/React.createElement("button", {
      key: t,
      onClick: function onClick() {
        return handleSubtab(t);
      },
      style: {
        flex: "0 0 auto",
        padding: "8px 20px",
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
      padding: selectedDate ? "0" : "0 0px"
    }
  }, selectedDate ? /*#__PURE__*/React.createElement(ExpenseDayDetailWrapper, {
    date: selectedDate,
    data: data,
    updateData: updateData,
    onBack: function onBack() {
      return setSelectedDate(null);
    },
    onNavigate: navigateDay
  }) : subtab === "月別" ? /*#__PURE__*/React.createElement(ExpenseMonthlyView, {
    data: data,
    updateData: updateData,
    month: month,
    setMonth: setMonth,
    onSelectDate: setSelectedDate
  }) : subtab === "分析" ? /*#__PURE__*/React.createElement(ExpenseAnalysis, {
    data: data,
    month: month,
    setMonth: setMonth,
    monthExpenses: monthExpenses
  }) : /*#__PURE__*/React.createElement(FuturePlanTab, {
    data: data,
    updateData: updateData
  })));
}

// ===== 将来プランタブ =====
var PLAN_TYPES = [{
  type: "wedding",
  label: "💍 結婚資金",
  color: "#E91E63"
}, {
  type: "car",
  label: "🚗 車買い替え",
  color: "#E67E22"
}, {
  type: "house",
  label: "🏠 住宅購入",
  color: "#2980B9"
}, {
  type: "travel",
  label: "✈️ 海外旅行",
  color: "#27AE60"
}, {
  type: "other",
  label: "🎯 その他",
  color: "#8E44AD"
}];
function FuturePlanTab(_ref25) {
  var _PLAN_TYPES$find;
  var data = _ref25.data,
    updateData = _ref25.updateData;
  var plans = data.futurePlans || [];
  var _useState31 = useState(false),
    _useState32 = _slicedToArray(_useState31, 2),
    showForm = _useState32[0],
    setShowForm = _useState32[1];
  var _useState33 = useState(null),
    _useState34 = _slicedToArray(_useState33, 2),
    editingId = _useState34[0],
    setEditingId = _useState34[1];
  var _useState35 = useState({
      type: "wedding",
      label: "",
      years: 5,
      amount: 0,
      memo: ""
    }),
    _useState36 = _slicedToArray(_useState35, 2),
    form = _useState36[0],
    setForm = _useState36[1];
  var F = function F(field) {
    return function (v) {
      return setForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, _defineProperty({}, field, v));
      });
    };
  };
  var resetForm = function resetForm() {
    setForm({
      type: "wedding",
      label: "",
      years: 5,
      amount: 0,
      memo: ""
    });
    setEditingId(null);
    setShowForm(false);
  };
  var save = function save() {
    if (!form.amount) return;
    var planType = PLAN_TYPES.find(function (p) {
      return p.type === form.type;
    });
    var entry = _objectSpread(_objectSpread({}, form), {}, {
      label: form.label || (planType === null || planType === void 0 ? void 0 : planType.label) || form.type,
      id: editingId || genId()
    });
    if (editingId) {
      updateData(function (prev) {
        return _objectSpread(_objectSpread({}, prev), {}, {
          futurePlans: prev.futurePlans.map(function (p) {
            return p.id === editingId ? entry : p;
          })
        });
      });
    } else {
      updateData(function (prev) {
        return _objectSpread(_objectSpread({}, prev), {}, {
          futurePlans: [].concat(_toConsumableArray(prev.futurePlans || []), [entry])
        });
      });
    }
    resetForm();
  };
  var del = function del(id) {
    return updateData(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, {
        futurePlans: prev.futurePlans.filter(function (p) {
          return p.id !== id;
        })
      });
    });
  };
  var startEdit = function startEdit(plan) {
    setForm({
      type: plan.type,
      label: plan.label,
      years: plan.years,
      amount: plan.amount,
      memo: plan.memo || ""
    });
    setEditingId(plan.id);
    setShowForm(true);
  };
  var totalPlan = plans.reduce(function (a, p) {
    return a + (p.amount || 0);
  }, 0);
  var sorted = _toConsumableArray(plans).sort(function (a, b) {
    return a.years - b.years;
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 16px"
    }
  }, plans.length > 0 && /*#__PURE__*/React.createElement(Card, {
    style: {
      border: "1.5px solid ".concat(colors.expense)
    }
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "\u5C06\u6765\u306E\u5FC5\u8981\u8CC7\u91D1 \u5408\u8A08",
    color: colors.expense
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: colors.textLight
    }
  }, plans.length, "\u4EF6\u306E\u30D7\u30E9\u30F3"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 24,
      fontWeight: 800,
      color: colors.expense
    }
  }, fmtYen(totalPlan))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: colors.textLight,
      marginTop: 4
    }
  }, "\u203B \u30DB\u30FC\u30E0\u753B\u9762\u306E\u5C06\u6765\u8CC7\u7523\u4E88\u6E2C\u306B\u53CD\u6620\u3055\u308C\u307E\u3059")), sorted.map(function (plan) {
    var pt = PLAN_TYPES.find(function (p) {
      return p.type === plan.type;
    });
    return /*#__PURE__*/React.createElement(Card, {
      key: plan.id
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 15,
        fontWeight: 700,
        color: colors.text
      }
    }, plan.label), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8,
        marginTop: 6,
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        backgroundColor: ((pt === null || pt === void 0 ? void 0 : pt.color) || colors.neutral) + "22",
        color: (pt === null || pt === void 0 ? void 0 : pt.color) || colors.neutral,
        borderRadius: 8,
        padding: "2px 8px",
        fontSize: 11,
        fontWeight: 700
      }
    }, plan.years, "\u5E74\u5F8C"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 18,
        fontWeight: 800,
        color: colors.expense
      }
    }, fmtYen(plan.amount))), plan.memo ? /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: colors.textLight,
        marginTop: 4
      }
    }, plan.memo) : null), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 6
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return startEdit(plan);
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
        return del(plan.id);
      },
      style: {
        background: "none",
        border: "none",
        color: colors.expense,
        cursor: "pointer",
        fontSize: 16
      }
    }, "\uD83D\uDDD1"))));
  }), showForm ? /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(SectionHeader, {
    title: editingId ? "プランを編集" : "プランを追加",
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
      marginBottom: 6
    }
  }, "\u7A2E\u5225"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      flexWrap: "wrap"
    }
  }, PLAN_TYPES.map(function (pt) {
    return /*#__PURE__*/React.createElement("button", {
      key: pt.type,
      onClick: function onClick() {
        setForm(function (f) {
          return _objectSpread(_objectSpread({}, f), {}, {
            type: pt.type,
            label: f.label || pt.label
          });
        });
      },
      style: {
        padding: "6px 12px",
        borderRadius: 20,
        fontSize: 12,
        fontWeight: 600,
        backgroundColor: form.type === pt.type ? pt.color : "#EEE",
        color: form.type === pt.type ? "#fff" : colors.text,
        border: "none",
        cursor: "pointer"
      }
    }, pt.label);
  }))), /*#__PURE__*/React.createElement(TextInput, {
    label: "\u30D7\u30E9\u30F3\u540D",
    value: form.label,
    onChange: F("label"),
    placeholder: ((_PLAN_TYPES$find = PLAN_TYPES.find(function (p) {
      return p.type === form.type;
    })) === null || _PLAN_TYPES$find === void 0 ? void 0 : _PLAN_TYPES$find.label) || "プラン名"
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
  }, "\u4F55\u5E74\u5F8C"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    inputMode: "numeric",
    value: form.years || "",
    onChange: function onChange(e) {
      return F("years")(Math.max(1, parseInt(e.target.value) || 1));
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
    label: "\u5FC5\u8981\u91D1\u984D",
    value: form.amount,
    onChange: F("amount")
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
    onClick: save,
    color: colors.expense,
    style: {
      flex: 1
    }
  }, editingId ? "保存" : "追加"), /*#__PURE__*/React.createElement(OutlineButton, {
    onClick: resetForm,
    color: colors.neutral,
    style: {
      flex: 1
    }
  }, "\u30AD\u30E3\u30F3\u30BB\u30EB"))) : /*#__PURE__*/React.createElement(PrimaryButton, {
    onClick: function onClick() {
      return setShowForm(true);
    },
    color: colors.expense
  }, "\uFF0B \u30D7\u30E9\u30F3\u3092\u8FFD\u52A0"));
}

// ラッパー：日付ナビを正しく扱う
function ExpenseDayDetailWrapper(_ref26) {
  var _data$assets$nisa3, _data$assets$ideco3;
  var date = _ref26.date,
    data = _ref26.data,
    updateData = _ref26.updateData,
    onBack = _ref26.onBack,
    onNavigate = _ref26.onNavigate;
  var _useState37 = useState(date),
    _useState38 = _slicedToArray(_useState37, 2),
    currentDate = _useState38[0],
    setCurrentDate = _useState38[1];
  React.useEffect(function () {
    setCurrentDate(date);
  }, [date]);
  var _currentDate$split$ma = currentDate.split("-").map(Number),
    _currentDate$split$ma2 = _slicedToArray(_currentDate$split$ma, 3),
    y = _currentDate$split$ma2[0],
    mm = _currentDate$split$ma2[1],
    d = _currentDate$split$ma2[2];
  var dateLabel = "".concat(y, "\u5E74").concat(mm, "\u6708").concat(d, "\u65E5");
  var _useState39 = useState(null),
    _useState40 = _slicedToArray(_useState39, 2),
    selectedCat = _useState40[0],
    setSelectedCat = _useState40[1];
  var _useState41 = useState(0),
    _useState42 = _slicedToArray(_useState41, 2),
    inputVal = _useState42[0],
    setInputVal = _useState42[1];
  var _useState43 = useState(false),
    _useState44 = _slicedToArray(_useState43, 2),
    showAddCat = _useState44[0],
    setShowAddCat = _useState44[1];
  var _useState45 = useState(""),
    _useState46 = _slicedToArray(_useState45, 2),
    newCatName = _useState46[0],
    setNewCatName = _useState46[1];
  var _useState47 = useState(false),
    _useState48 = _slicedToArray(_useState47, 2),
    copiedFromPrev = _useState48[0],
    setCopiedFromPrev = _useState48[1];

  // 27日で当月未入力の場合、前月27日のデータを自動コピー
  React.useEffect(function () {
    if (d !== 27) return;
    var todayExps = data.expenses.filter(function (e) {
      return e.date === currentDate;
    });
    if (todayExps.length > 0) return;
    var prevYM = mm === 1 ? "".concat(y - 1, "-12") : "".concat(y, "-").concat(String(mm - 1).padStart(2, "0"));
    var prevDate = "".concat(prevYM, "-27");
    var prevExps = data.expenses.filter(function (e) {
      return e.date === prevDate;
    });
    if (prevExps.length === 0) return;
    updateData(function (prev) {
      var already = prev.expenses.filter(function (e) {
        return e.date === currentDate;
      });
      if (already.length > 0) return prev;
      var copied = prevExps.map(function (e) {
        return _objectSpread(_objectSpread({}, e), {}, {
          id: genId(),
          date: currentDate
        });
      });
      return _objectSpread(_objectSpread({}, prev), {}, {
        expenses: [].concat(_toConsumableArray(prev.expenses), _toConsumableArray(copied))
      });
    });
    setCopiedFromPrev(true);
    setTimeout(function () {
      return setCopiedFromPrev(false);
    }, 3000);
  }, [currentDate]);

  // 資産管理からの月額参照（投資カテゴリのデフォルト値）
  var investDefaults = {
    "NISA積立": ((_data$assets$nisa3 = data.assets.nisa) === null || _data$assets$nisa3 === void 0 ? void 0 : _data$assets$nisa3.monthlyContribution) || 0,
    "iDeCo": ((_data$assets$ideco3 = data.assets.ideco) === null || _data$assets$ideco3 === void 0 ? void 0 : _data$assets$ideco3.monthlyContribution) || 0,
    "変額年金": (data.assets.variableAnnuities || []).reduce(function (a, v) {
      return a + (v.monthlyPremium || 0);
    }, 0)
  };
  var _useState49 = useState(false),
    _useState50 = _slicedToArray(_useState49, 2),
    saved = _useState50[0],
    setSaved = _useState50[1];
  var dayExps = data.expenses.filter(function (e) {
    return e.date === currentDate;
  });
  var catTotal = function catTotal(name) {
    return dayExps.filter(function (e) {
      return e.category === name;
    }).reduce(function (a, e) {
      return a + e.amount;
    }, 0);
  };
  var handleCatTap = function handleCatTap(name) {
    if (selectedCat === name) {
      setSelectedCat(null);
      return;
    }
    setSelectedCat(name);
    // 投資カテゴリで未入力の場合は資産管理の月額をデフォルト表示
    var existing = catTotal(name);
    setInputVal(existing > 0 ? existing : investDefaults[name] || 0);
  };
  var saveAmount = function saveAmount() {
    var newAmount = Number(inputVal) || 0;
    updateData(function (prev) {
      var filtered = prev.expenses.filter(function (e) {
        return !(e.date === currentDate && e.category === selectedCat);
      });
      var next = newAmount > 0 ? [].concat(_toConsumableArray(filtered), [{
        id: genId(),
        date: currentDate,
        category: selectedCat,
        amount: newAmount,
        memo: ""
      }]) : filtered;
      return _objectSpread(_objectSpread({}, prev), {}, {
        expenses: next
      });
    });
    setSelectedCat(null);
    setSaved(true);
    setTimeout(function () {
      return setSaved(false);
    }, 1200);
  };
  var goDay = function goDay(delta) {
    setSelectedCat(null);
    setCurrentDate(function (prev) {
      return addDays(prev, delta);
    });
  };
  var dayTotal = dayExps.reduce(function (a, e) {
    return a + e.amount;
  }, 0);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      padding: "4px 16px 8px",
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onBack,
    style: {
      background: "none",
      border: "none",
      fontSize: 14,
      cursor: "pointer",
      color: colors.textLight,
      padding: "6px 8px",
      borderRadius: 8,
      display: "flex",
      alignItems: "center",
      gap: 4
    }
  }, "\u2190 \u4E00\u89A7"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return goDay(-1);
    },
    style: {
      background: "none",
      border: "1.5px solid #DDD",
      borderRadius: 8,
      padding: "6px 14px",
      fontSize: 18,
      cursor: "pointer",
      color: colors.text,
      lineHeight: 1
    }
  }, "\u2039"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      color: colors.text,
      minWidth: 130,
      textAlign: "center"
    }
  }, dateLabel), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return goDay(1);
    },
    style: {
      background: "none",
      border: "1.5px solid #DDD",
      borderRadius: 8,
      padding: "6px 14px",
      fontSize: 18,
      cursor: "pointer",
      color: colors.text,
      lineHeight: 1
    }
  }, "\u203A")), saved && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: colors.income,
      fontWeight: 700
    }
  }, "\u2705")), copiedFromPrev && /*#__PURE__*/React.createElement("div", {
    style: {
      margin: "0 16px 8px",
      padding: "8px 14px",
      backgroundColor: "#E8F5E9",
      border: "1.5px solid #4CAF50",
      borderRadius: 10,
      fontSize: 12,
      color: "#2E7D32",
      fontWeight: 600
    }
  }, "\uD83D\uDCCB \u524D\u670827\u65E5\u306E\u652F\u6255\u5185\u5BB9\u3092\u81EA\u52D5\u30B3\u30D4\u30FC\u3057\u307E\u3057\u305F\u3002\u91D1\u984D\u3092\u78BA\u8A8D\u3057\u3066\u304F\u3060\u3055\u3044\u3002"), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 16px 10px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      backgroundColor: "#FFF5F5",
      border: "1.5px solid ".concat(colors.expense),
      borderRadius: 12,
      padding: "10px 16px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: colors.textLight
    }
  }, "\u3053\u306E\u65E5\u306E\u5408\u8A08"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 20,
      fontWeight: 800,
      color: colors.expense
    }
  }, "-", fmtYen(dayTotal)))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 16px"
    }
  }, [].concat(EXPENSE_CATS, _toConsumableArray((data.customCats || []).map(function (c) {
    return {
      name: c.name,
      color: c.color,
      isFixed: false
    };
  }))).map(function (cat) {
    var total = catTotal(cat.name);
    var isOpen = selectedCat === cat.name;
    var defaultAmt = investDefaults[cat.name] || 0;
    var accentColor = cat.isInvest ? cat.color : colors.expense;
    return /*#__PURE__*/React.createElement("div", {
      key: cat.name,
      style: {
        marginBottom: 3
      }
    }, /*#__PURE__*/React.createElement("div", {
      onClick: function onClick() {
        return handleCatTap(cat.name);
      },
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "13px 14px",
        borderRadius: isOpen ? "12px 12px 0 0" : 12,
        backgroundColor: isOpen ? cat.isInvest ? "#F0F8FF" : "#FFF0F0" : colors.card,
        border: "1.5px solid ".concat(isOpen ? accentColor : "transparent"),
        borderBottom: isOpen ? "none" : undefined,
        cursor: "pointer"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 12,
        height: 12,
        borderRadius: "50%",
        backgroundColor: cat.color,
        flexShrink: 0
      }
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 15,
        fontWeight: 600,
        color: colors.text
      }
    }, cat.name), cat.isInvest && defaultAmt > 0 && total === 0 && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        color: cat.color,
        marginLeft: 6
      }
    }, "\u8CC7\u7523\u7BA1\u7406: ", fmtYen(defaultAmt), "/\u6708"))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8
      }
    }, total > 0 && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 15,
        fontWeight: 700,
        color: accentColor
      }
    }, "-", fmtYen(total)), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        color: colors.textLight
      }
    }, isOpen ? "▲" : "▶"))), isOpen && /*#__PURE__*/React.createElement("div", {
      style: {
        backgroundColor: cat.isInvest ? "#F0F8FF" : "#FFF0F0",
        borderRadius: "0 0 12px 12px",
        padding: "12px 14px 14px",
        border: "1.5px solid ".concat(accentColor),
        borderTop: "none"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: colors.textLight,
        marginBottom: 8
      }
    }, "\u91D1\u984D\u3092\u5165\u529B\uFF080\u3067\u524A\u9664\uFF09", cat.isInvest && defaultAmt > 0 && /*#__PURE__*/React.createElement("span", {
      style: {
        color: cat.color,
        marginLeft: 6
      }
    }, "\u8CC7\u7523\u7BA1\u7406\u306E\u6708\u984D: ", fmtYen(defaultAmt))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("input", {
      type: "number",
      inputMode: "numeric",
      value: inputVal || "",
      onChange: function onChange(e) {
        return setInputVal(parseNum(e.target.value));
      },
      onKeyDown: function onKeyDown(e) {
        if (e.key === "Enter") {
          e.target.blur();
          saveAmount();
        }
      },
      placeholder: "0",
      autoFocus: true,
      style: {
        flex: 1,
        padding: "10px 12px",
        fontSize: 18,
        fontWeight: 700,
        border: "2px solid ".concat(colors.expense),
        borderRadius: 10,
        boxSizing: "border-box",
        backgroundColor: "#FFF",
        textAlign: "right"
      }
    }), /*#__PURE__*/React.createElement("button", {
      onClick: saveAmount,
      style: {
        padding: "10px 20px",
        backgroundColor: colors.expense,
        color: "#fff",
        border: "none",
        borderRadius: 10,
        fontSize: 14,
        fontWeight: 700,
        cursor: "pointer"
      }
    }, "\u4FDD\u5B58"))));
  }), !showAddCat ? /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setShowAddCat(true);
    },
    style: {
      width: "100%",
      marginTop: 6,
      padding: "12px 14px",
      borderRadius: 12,
      border: "1.5px dashed #BBB",
      backgroundColor: "transparent",
      fontSize: 14,
      color: colors.textLight,
      cursor: "pointer",
      textAlign: "left"
    }
  }, "\uFF0B \u30AB\u30C6\u30B4\u30EA\u3092\u8FFD\u52A0") : /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6,
      padding: "14px",
      borderRadius: 12,
      border: "1.5px solid ".concat(colors.expense),
      backgroundColor: "#FFF5F5"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: colors.expense,
      marginBottom: 10
    }
  }, "\u65B0\u3057\u3044\u30AB\u30C6\u30B4\u30EA\u540D"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: newCatName,
    onChange: function onChange(e) {
      return setNewCatName(e.target.value);
    },
    onKeyDown: function onKeyDown(e) {
      if (e.key === "Enter" && newCatName.trim()) {
        var name = newCatName.trim();
        var palette = ["#E91E63", "#009688", "#FF5722", "#3F51B5", "#795548", "#607D8B", "#FF9800"];
        var color = palette[(data.customCats || []).length % palette.length];
        updateData(function (prev) {
          return _objectSpread(_objectSpread({}, prev), {}, {
            customCats: [].concat(_toConsumableArray(prev.customCats || []), [{
              id: genId(),
              name: name,
              color: color
            }])
          });
        });
        setNewCatName("");
        setShowAddCat(false);
      }
    },
    placeholder: "\u4F8B\uFF1A\u30DA\u30C3\u30C8\u8CBB",
    autoFocus: true,
    style: {
      flex: 1,
      padding: "10px 12px",
      fontSize: 15,
      border: "1.5px solid ".concat(colors.expense),
      borderRadius: 10,
      boxSizing: "border-box"
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      var name = newCatName.trim();
      if (!name) return;
      var palette = ["#E91E63", "#009688", "#FF5722", "#3F51B5", "#795548", "#607D8B", "#FF9800"];
      var color = palette[(data.customCats || []).length % palette.length];
      updateData(function (prev) {
        return _objectSpread(_objectSpread({}, prev), {}, {
          customCats: [].concat(_toConsumableArray(prev.customCats || []), [{
            id: genId(),
            name: name,
            color: color
          }])
        });
      });
      setNewCatName("");
      setShowAddCat(false);
    },
    style: {
      padding: "10px 16px",
      backgroundColor: colors.expense,
      color: "#fff",
      border: "none",
      borderRadius: 10,
      fontSize: 14,
      fontWeight: 700,
      cursor: "pointer"
    }
  }, "\u8FFD\u52A0"), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      setNewCatName("");
      setShowAddCat(false);
    },
    style: {
      padding: "10px 14px",
      backgroundColor: "#EEE",
      color: colors.text,
      border: "none",
      borderRadius: 10,
      fontSize: 14,
      cursor: "pointer"
    }
  }, "\u2715")))));
}

// 支出分析
function ExpenseAnalysis(_ref27) {
  var data = _ref27.data,
    month = _ref27.month,
    setMonth = _ref27.setMonth,
    monthExpenses = _ref27.monthExpenses;
  var catTotals = {};
  monthExpenses.forEach(function (e) {
    catTotals[e.category] = (catTotals[e.category] || 0) + e.amount;
  });
  var pieData = Object.entries(catTotals).sort(function (a, b) {
    return b[1] - a[1];
  }).map(function (_ref28) {
    var _expenseCategories$na2;
    var _ref29 = _slicedToArray(_ref28, 2),
      name = _ref29[0],
      value = _ref29[1];
    return {
      name: name,
      value: value,
      color: ((_expenseCategories$na2 = expenseCategories[name]) === null || _expenseCategories$na2 === void 0 ? void 0 : _expenseCategories$na2.color) || colors.neutral
    };
  });
  var isFixedCat = function isFixedCat(cat) {
    var _EXPENSE_CATS$find2;
    return ((_EXPENSE_CATS$find2 = EXPENSE_CATS.find(function (c) {
      return c.name === cat;
    })) === null || _EXPENSE_CATS$find2 === void 0 ? void 0 : _EXPENSE_CATS$find2.isFixed) || false;
  };
  var fixedTotal = monthExpenses.filter(function (e) {
    return isFixedCat(e.category);
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
        var _e$date7;
        return (_e$date7 = e.date) === null || _e$date7 === void 0 ? void 0 : _e$date7.startsWith(ym);
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
    label: function label(_ref30) {
      var name = _ref30.name,
        percent = _ref30.percent;
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
function LoanTab(_ref31) {
  var data = _ref31.data,
    updateData = _ref31.updateData;
  var _useState51 = useState("一覧"),
    _useState52 = _slicedToArray(_useState51, 2),
    subtab = _useState52[0],
    setSubtab = _useState52[1];
  var _useState53 = useState(null),
    _useState54 = _slicedToArray(_useState53, 2),
    selectedLoan = _useState54[0],
    setSelectedLoan = _useState54[1];
  var _useState55 = useState(null),
    _useState56 = _slicedToArray(_useState55, 2),
    editingLoanId = _useState56[0],
    setEditingLoanId = _useState56[1];
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
function LoanList(_ref32) {
  var data = _ref32.data,
    updateData = _ref32.updateData,
    setSubtab = _ref32.setSubtab,
    setSelectedLoan = _ref32.setSelectedLoan,
    setEditingLoanId = _ref32.setEditingLoanId;
  var totalBalance = data.loans.reduce(function (a, l) {
    return a + l.remainingBalance;
  }, 0);
  var totalMonthly = data.loans.reduce(function (a, l) {
    return a + l.monthlyPayment;
  }, 0);

  // n年後の残高を計算（元利均等返済）
  var balanceAfterMonths = function balanceAfterMonths(loan, months) {
    var monthlyRate = loan.interestRate / 100 / 12;
    var bal = loan.remainingBalance;
    var payment = loan.monthlyPayment;
    for (var i = 0; i < months && bal > 0; i++) {
      if (monthlyRate > 0) {
        var interest = Math.round(bal * monthlyRate);
        bal = Math.max(0, bal - (payment - interest));
      } else {
        bal = Math.max(0, bal - payment);
      }
    }
    return bal;
  };
  var total5y = data.loans.reduce(function (a, l) {
    return a + balanceAfterMonths(l, 60);
  }, 0);
  var total10y = data.loans.reduce(function (a, l) {
    return a + balanceAfterMonths(l, 120);
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
  return /*#__PURE__*/React.createElement("div", null, data.loans.length > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(SectionHeader, {
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
  }, fmtYen(totalMonthly))))), /*#__PURE__*/React.createElement(Card, {
    style: {
      border: "1.5px solid ".concat(colors.loan)
    }
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "\u6B8B\u9AD8\u4E88\u6E2C",
    color: colors.loan
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginBottom: 12
    }
  }, [{
    label: "5年後",
    val: total5y
  }, {
    label: "10年後",
    val: total10y
  }].map(function (_ref33) {
    var label = _ref33.label,
      val = _ref33.val;
    return /*#__PURE__*/React.createElement("div", {
      key: label,
      style: {
        flex: 1,
        backgroundColor: "#FEF3E2",
        borderRadius: 10,
        padding: "10px 12px",
        textAlign: "center"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: colors.textLight,
        marginBottom: 4
      }
    }, label, "\u306E\u6B8B\u9AD8\u5408\u8A08"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 18,
        fontWeight: 800,
        color: val > 0 ? colors.loan : colors.income
      }
    }, val > 0 ? fmtYen(val) : "完済"), val > 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: colors.textLight,
        marginTop: 2
      }
    }, "\u73FE\u5728\u6BD4 ", Math.round(val / totalBalance * 100), "%"));
  })), data.loans.length > 1 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Divider, null), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: colors.textLight,
      marginBottom: 6
    }
  }, "\u30ED\u30FC\u30F3\u5225\u5185\u8A33"), data.loans.map(function (loan) {
    var b5 = balanceAfterMonths(loan, 60);
    var b10 = balanceAfterMonths(loan, 120);
    return /*#__PURE__*/React.createElement("div", {
      key: loan.id,
      style: {
        marginBottom: 8
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 600,
        marginBottom: 4
      }
    }, LOAN_TYPE_ICON[loan.type], " ", loan.name), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        backgroundColor: "#FFF8F0",
        borderRadius: 8,
        padding: "6px 10px",
        textAlign: "center"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: colors.textLight
      }
    }, "5\u5E74\u5F8C"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        color: b5 > 0 ? colors.loan : colors.income
      }
    }, b5 > 0 ? fmtYen(b5) : "完済")), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        backgroundColor: "#FFF8F0",
        borderRadius: 8,
        padding: "6px 10px",
        textAlign: "center"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: colors.textLight
      }
    }, "10\u5E74\u5F8C"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        color: b10 > 0 ? colors.loan : colors.income
      }
    }, b10 > 0 ? fmtYen(b10) : "完済"))));
  })))), data.loans.map(function (loan) {
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
function LoanForm(_ref34) {
  var data = _ref34.data,
    updateData = _ref34.updateData,
    setSubtab = _ref34.setSubtab,
    editingLoanId = _ref34.editingLoanId,
    setEditingLoanId = _ref34.setEditingLoanId;
  var editTarget = editingLoanId ? data.loans.find(function (l) {
    return l.id === editingLoanId;
  }) : null;
  var isEdit = !!editTarget;
  var _useState57 = useState(editTarget ? _objectSpread({}, editTarget) : {
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
    _useState58 = _slicedToArray(_useState57, 2),
    form = _useState58[0],
    setForm = _useState58[1];
  var _useState59 = useState(false),
    _useState60 = _slicedToArray(_useState59, 2),
    saved = _useState60[0],
    setSaved = _useState60[1];

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
function LoanSchedule(_ref35) {
  var data = _ref35.data,
    selectedLoan = _ref35.selectedLoan,
    setSelectedLoan = _ref35.setSelectedLoan;
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
function LoanPrepay(_ref36) {
  var data = _ref36.data,
    selectedLoan = _ref36.selectedLoan,
    setSelectedLoan = _ref36.setSelectedLoan;
  var _useState61 = useState(0),
    _useState62 = _slicedToArray(_useState61, 2),
    prepayAmount = _useState62[0],
    setPrepayAmount = _useState62[1];
  var _useState63 = useState(null),
    _useState64 = _slicedToArray(_useState63, 2),
    result = _useState64[0],
    setResult = _useState64[1];
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
function AssetTab(_ref37) {
  var data = _ref37.data,
    updateData = _ref37.updateData;
  var _useState65 = useState("銀行・現金"),
    _useState66 = _slicedToArray(_useState65, 2),
    subtab = _useState66[0],
    setSubtab = _useState66[1];
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
function BankTab(_ref38) {
  var data = _ref38.data,
    updateData = _ref38.updateData;
  var _useState67 = useState(null),
    _useState68 = _slicedToArray(_useState67, 2),
    editingId = _useState68[0],
    setEditingId = _useState68[1];
  var _useState69 = useState(false),
    _useState70 = _slicedToArray(_useState69, 2),
    showAdd = _useState70[0],
    setShowAdd = _useState70[1];
  var blankBank = function blankBank() {
    return {
      name: "",
      balance: 0,
      type: "普通",
      memo: ""
    };
  };
  var _useState71 = useState(blankBank()),
    _useState72 = _slicedToArray(_useState71, 2),
    form = _useState72[0],
    setForm = _useState72[1];
  var accounts = data.assets.bankAccounts || [];
  var total = accounts.reduce(function (a, b) {
    return a + b.balance;
  }, 0);
  var resetForm = function resetForm() {
    setForm(blankBank());
    setEditingId(null);
    setShowAdd(false);
  };
  var save = function save() {
    if (!form.name) return;
    if (editingId) {
      updateData(function (prev) {
        return _objectSpread(_objectSpread({}, prev), {}, {
          assets: _objectSpread(_objectSpread({}, prev.assets), {}, {
            bankAccounts: prev.assets.bankAccounts.map(function (a) {
              return a.id === editingId ? _objectSpread(_objectSpread({}, a), form) : a;
            })
          })
        });
      });
    } else {
      updateData(function (prev) {
        return _objectSpread(_objectSpread({}, prev), {}, {
          assets: _objectSpread(_objectSpread({}, prev.assets), {}, {
            bankAccounts: [].concat(_toConsumableArray(prev.assets.bankAccounts || []), [_objectSpread(_objectSpread({}, form), {}, {
              id: genId()
            })])
          })
        });
      });
    }
    resetForm();
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
  var startEdit = function startEdit(acc) {
    setForm({
      name: acc.name,
      balance: acc.balance,
      type: acc.type,
      memo: acc.memo || ""
    });
    setEditingId(acc.id);
    setShowAdd(true);
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
    }), acc.memo ? /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: colors.textLight,
        marginTop: 4
      }
    }, acc.memo) : null), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "right"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 20,
        fontWeight: 800,
        color: colors.asset
      }
    }, fmtYen(acc.balance)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8,
        justifyContent: "flex-end",
        marginTop: 6
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return startEdit(acc);
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
        return del(acc.id);
      },
      style: {
        background: "none",
        border: "none",
        color: colors.expense,
        cursor: "pointer",
        fontSize: 16
      }
    }, "\uD83D\uDDD1")))));
  }), showAdd ? /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(SectionHeader, {
    title: editingId ? "口座を編集" : "口座を追加",
    color: colors.asset
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
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(PrimaryButton, {
    onClick: save,
    color: colors.asset,
    style: {
      flex: 1
    }
  }, editingId ? "保存" : "追加"), /*#__PURE__*/React.createElement(OutlineButton, {
    onClick: resetForm,
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
function InvestTab(_ref39) {
  var data = _ref39.data,
    updateData = _ref39.updateData;
  var _useState73 = useState(false),
    _useState74 = _slicedToArray(_useState73, 2),
    showAdd = _useState74[0],
    setShowAdd = _useState74[1];
  var _useState75 = useState({
      name: "",
      type: "fund",
      account: "NISA",
      purchasePrice: 0,
      quantity: 0,
      currentPrice: 0,
      purchaseDate: "",
      memo: ""
    }),
    _useState76 = _slicedToArray(_useState75, 2),
    form = _useState76[0],
    setForm = _useState76[1];
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
function NisaTab(_ref40) {
  var data = _ref40.data,
    updateData = _ref40.updateData;
  var nisa = data.assets.nisa || {};
  var year = nisa.year || new Date().getFullYear();
  var LIMITS = {
    tsumitate: 1200000,
    growth: 2400000,
    lifetime: 18000000
  };
  var investments = nisa.investments || [];
  var _useState77 = useState(false),
    _useState78 = _slicedToArray(_useState77, 2),
    showAdd = _useState78[0],
    setShowAdd = _useState78[1];
  var _useState79 = useState(null),
    _useState80 = _slicedToArray(_useState79, 2),
    editingInvestId = _useState80[0],
    setEditingInvestId = _useState80[1];
  var _useState81 = useState({
      name: "",
      nisaType: "つみたて",
      purchasePrice: 0,
      quantity: 0,
      currentPrice: 0,
      memo: ""
    }),
    _useState82 = _slicedToArray(_useState81, 2),
    form = _useState82[0],
    setForm = _useState82[1];

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
  var resetForm = function resetForm() {
    setForm({
      name: "",
      nisaType: "つみたて",
      purchasePrice: 0,
      quantity: 0,
      currentPrice: 0,
      memo: ""
    });
    setEditingInvestId(null);
    setShowAdd(false);
  };
  var addInvestment = function addInvestment() {
    if (!form.name) return;
    if (editingInvestId) {
      updateNisa({
        investments: investments.map(function (i) {
          return i.id === editingInvestId ? _objectSpread(_objectSpread({}, i), form) : i;
        })
      });
    } else {
      updateNisa({
        investments: [].concat(_toConsumableArray(investments), [_objectSpread(_objectSpread({}, form), {}, {
          id: genId()
        })])
      });
    }
    resetForm();
  };
  var startEdit = function startEdit(inv) {
    setForm({
      name: inv.name,
      nisaType: inv.nisaType,
      purchasePrice: inv.purchasePrice,
      quantity: inv.quantity,
      currentPrice: inv.currentPrice,
      memo: inv.memo || ""
    });
    setEditingInvestId(inv.id);
    setShowAdd(true);
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
  }, "\u203B \u67A0\u4F7F\u7528\u984D\u306F\u767B\u9332\u9298\u67C4\u306E\u53D6\u5F97\u984D\u304B\u3089\u81EA\u52D5\u8A08\u7B97\u3002\u751F\u6DAF\u67A0\u306F\u3064\u307F\u305F\u3066\uFF0B\u6210\u9577\u306E\u5408\u8A08\u3067\u3059\u3002"), sections.map(function (_ref41) {
    var label = _ref41.label,
      used = _ref41.used,
      limit = _ref41.limit,
      color = _ref41.color;
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
  })), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "\u6708\u984D\u7A4D\u7ACB\u8A2D\u5B9A",
    color: colors.income
  }), /*#__PURE__*/React.createElement(AmountInput, {
    label: "NISA\u6708\u984D\u7A4D\u7ACB\u984D",
    value: nisa.monthlyContribution || 0,
    onChange: function onChange(v) {
      return updateNisa({
        monthlyContribution: v
      });
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: colors.textLight
    }
  }, "\u5C06\u6765\u8CC7\u7523\u4E88\u6E2C\uFF08\u30DB\u30FC\u30E0\u753B\u9762\uFF09\u306B\u53CD\u6620\u3055\u308C\u307E\u3059")), investments.length > 0 && /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(SectionHeader, {
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
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 6
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return startEdit(inv);
      },
      style: {
        background: "none",
        border: "none",
        color: colors.saving,
        cursor: "pointer",
        fontSize: 18
      }
    }, "\u270F\uFE0F"), /*#__PURE__*/React.createElement("button", {
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
    }, "\uD83D\uDDD1"))), /*#__PURE__*/React.createElement("div", {
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
    title: editingInvestId ? "銘柄を編集" : "銘柄を追加",
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
  }, editingInvestId ? "保存" : "追加"), /*#__PURE__*/React.createElement(OutlineButton, {
    onClick: resetForm,
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
function IdecoTab(_ref42) {
  var data = _ref42.data,
    updateData = _ref42.updateData;
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
function AnnuityTab(_ref43) {
  var data = _ref43.data,
    updateData = _ref43.updateData;
  var _useState83 = useState(null),
    _useState84 = _slicedToArray(_useState83, 2),
    editingId = _useState84[0],
    setEditingId = _useState84[1];
  var _useState85 = useState(false),
    _useState86 = _slicedToArray(_useState85, 2),
    showAdd = _useState86[0],
    setShowAdd = _useState86[1];
  var annuities = data.assets.variableAnnuities || [];
  var blankAnnuity = function blankAnnuity() {
    return {
      name: "",
      contractDate: "",
      monthlyPremium: 0,
      totalPremium: 0,
      currentValue: 0,
      maturityDate: "",
      maturityAmount: 0,
      deathBenefit: 0,
      memo: ""
    };
  };
  var _useState87 = useState(blankAnnuity()),
    _useState88 = _slicedToArray(_useState87, 2),
    form = _useState88[0],
    setForm = _useState88[1];
  var F = function F(field) {
    return function (v) {
      return setForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, _defineProperty({}, field, v));
      });
    };
  };
  var resetForm = function resetForm() {
    setForm(blankAnnuity());
    setEditingId(null);
    setShowAdd(false);
  };
  var save = function save() {
    if (!form.name) return;
    if (editingId) {
      updateData(function (prev) {
        return _objectSpread(_objectSpread({}, prev), {}, {
          assets: _objectSpread(_objectSpread({}, prev.assets), {}, {
            variableAnnuities: prev.assets.variableAnnuities.map(function (a) {
              return a.id === editingId ? _objectSpread(_objectSpread({}, a), form) : a;
            })
          })
        });
      });
    } else {
      updateData(function (prev) {
        return _objectSpread(_objectSpread({}, prev), {}, {
          assets: _objectSpread(_objectSpread({}, prev.assets), {}, {
            variableAnnuities: [].concat(_toConsumableArray(prev.assets.variableAnnuities || []), [_objectSpread(_objectSpread({}, form), {}, {
              id: genId()
            })])
          })
        });
      });
    }
    resetForm();
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
  var startEdit = function startEdit(ann) {
    setForm({
      name: ann.name,
      contractDate: ann.contractDate || "",
      monthlyPremium: ann.monthlyPremium || 0,
      totalPremium: ann.totalPremium || 0,
      currentValue: ann.currentValue || 0,
      maturityDate: ann.maturityDate || "",
      maturityAmount: ann.maturityAmount || 0,
      deathBenefit: ann.deathBenefit || 0,
      memo: ann.memo || ""
    });
    setEditingId(ann.id);
    setShowAdd(true);
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
        alignItems: "flex-start",
        marginBottom: 8
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 15,
        fontWeight: 700,
        flex: 1
      }
    }, ann.name), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return startEdit(ann);
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
        return del(ann.id);
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
    }, fmtYen(ann.totalPremium))), ann.monthlyPremium > 0 && /*#__PURE__*/React.createElement("div", {
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
    }, "\u6708\u984D\u4FDD\u967A\u6599"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14
      }
    }, fmtYen(ann.monthlyPremium))), /*#__PURE__*/React.createElement("div", {
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
    title: editingId ? "変額年金を編集" : "変額年金保険を追加",
    color: colors.asset
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
    onClick: save,
    color: colors.asset,
    style: {
      flex: 1
    }
  }, editingId ? "保存" : "追加"), /*#__PURE__*/React.createElement(OutlineButton, {
    onClick: resetForm,
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
function NetWorthTab(_ref44) {
  var _data$assets$nisa4, _data$assets$ideco4;
  var data = _ref44.data;
  var bankTotal = (data.assets.bankAccounts || []).reduce(function (a, b) {
    return a + b.balance;
  }, 0);
  var nisaInvest = (((_data$assets$nisa4 = data.assets.nisa) === null || _data$assets$nisa4 === void 0 ? void 0 : _data$assets$nisa4.investments) || []).reduce(function (a, i) {
    return a + i.currentPrice * i.quantity;
  }, 0);
  var idecoVal = ((_data$assets$ideco4 = data.assets.ideco) === null || _data$assets$ideco4 === void 0 ? void 0 : _data$assets$ideco4.currentValue) || 0;
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
  }].map(function (_ref45) {
    var label = _ref45.label,
      val = _ref45.val,
      color = _ref45.color;
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
    label: function label(_ref46) {
      var name = _ref46.name,
        percent = _ref46.percent;
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
function SimulationTab(_ref47) {
  var data = _ref47.data,
    updateData = _ref47.updateData;
  var _useState89 = useState("将来資産"),
    _useState90 = _slicedToArray(_useState89, 2),
    subtab = _useState90[0],
    setSubtab = _useState90[1];
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
function FutureAssetSim(_ref48) {
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
  var _useState91 = useState(totalAsset || 0),
    _useState92 = _slicedToArray(_useState91, 2),
    currentAsset = _useState92[0],
    setCurrentAsset = _useState92[1];
  var _useState93 = useState(50000),
    _useState94 = _slicedToArray(_useState93, 2),
    monthly = _useState94[0],
    setMonthly = _useState94[1];
  var _useState95 = useState(5),
    _useState96 = _slicedToArray(_useState95, 2),
    rate = _useState96[0],
    setRate = _useState96[1];
  var _useState97 = useState(20),
    _useState98 = _slicedToArray(_useState97, 2),
    years = _useState98[0],
    setYears = _useState98[1];
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
function AfterLoanSim(_ref49) {
  var data = _ref49.data;
  var _useState99 = useState(5),
    _useState100 = _slicedToArray(_useState99, 2),
    rate = _useState100[0],
    setRate = _useState100[1];
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
function RetirementSim(_ref50) {
  var data = _ref50.data;
  var _useState101 = useState(35),
    _useState102 = _slicedToArray(_useState101, 2),
    age = _useState102[0],
    setAge = _useState102[1];
  var _useState103 = useState(65),
    _useState104 = _slicedToArray(_useState103, 2),
    retireAge = _useState104[0],
    setRetireAge = _useState104[1];
  var _useState105 = useState(90),
    _useState106 = _slicedToArray(_useState105, 2),
    lifeAge = _useState106[0],
    setLifeAge = _useState106[1];
  var _useState107 = useState(150000),
    _useState108 = _slicedToArray(_useState107, 2),
    pension = _useState108[0],
    setPension = _useState108[1];
  var _useState109 = useState(2000000),
    _useState110 = _slicedToArray(_useState109, 2),
    severance = _useState110[0],
    setSeverance = _useState110[1];
  var _useState111 = useState(250000),
    _useState112 = _slicedToArray(_useState111, 2),
    monthlyLiving = _useState112[0],
    setMonthlyLiving = _useState112[1];
  var retireYears = retireAge - age;
  var lifeYears = lifeAge - retireAge;

  // 退職後の必要資金
  var annualExpense = monthlyLiving * 12;
  var annualPension = pension * 12;
  var annualShortfall = Math.max(0, annualExpense - annualPension);
  var totalNeeded = annualShortfall * lifeYears;

  // 現在の準備額
  var currentSavings = function (_data$assets$nisa6, _data$assets$ideco6) {
    var b = (data.assets.bankAccounts || []).reduce(function (a, x) {
      return a + x.balance;
    }, 0);
    var i = (((_data$assets$nisa6 = data.assets.nisa) === null || _data$assets$nisa6 === void 0 ? void 0 : _data$assets$nisa6.investments) || []).reduce(function (a, x) {
      return a + x.currentPrice * x.quantity;
    }, 0);
    return b + i + (((_data$assets$ideco6 = data.assets.ideco) === null || _data$assets$ideco6 === void 0 ? void 0 : _data$assets$ideco6.currentValue) || 0) + severance;
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
function FireSim(_ref51) {
  var data = _ref51.data;
  var totalAsset = function (_data$assets$nisa7, _data$assets$ideco7) {
    var b = (data.assets.bankAccounts || []).reduce(function (a, x) {
      return a + x.balance;
    }, 0);
    var i = (((_data$assets$nisa7 = data.assets.nisa) === null || _data$assets$nisa7 === void 0 ? void 0 : _data$assets$nisa7.investments) || []).reduce(function (a, x) {
      return a + x.currentPrice * x.quantity;
    }, 0);
    return b + i + (((_data$assets$ideco7 = data.assets.ideco) === null || _data$assets$ideco7 === void 0 ? void 0 : _data$assets$ideco7.currentValue) || 0);
  }();
  var _useState113 = useState(totalAsset || 0),
    _useState114 = _slicedToArray(_useState113, 2),
    currentAsset = _useState114[0],
    setCurrentAsset = _useState114[1];
  var _useState115 = useState(250000),
    _useState116 = _slicedToArray(_useState115, 2),
    monthlyLiving = _useState116[0],
    setMonthlyLiving = _useState116[1];
  var _useState117 = useState(4),
    _useState118 = _slicedToArray(_useState117, 2),
    withdrawRate = _useState118[0],
    setWithdrawRate = _useState118[1];
  var _useState119 = useState(100000),
    _useState120 = _slicedToArray(_useState119, 2),
    monthly = _useState120[0],
    setMonthly = _useState120[1];
  var _useState121 = useState(5),
    _useState122 = _slicedToArray(_useState121, 2),
    rate = _useState122[0],
    setRate = _useState122[1];
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

function DataManagementPanel(_ref52) {
  var data = _ref52.data,
    updateData = _ref52.updateData;
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

// ===== 財務諸表タブ =====
function FinancialTab(_ref53) {
  var _data$assets$nisa8, _data$assets$ideco8;
  var data = _ref53.data;
  var _useState123 = useState(currentYM()),
    _useState124 = _slicedToArray(_useState123, 2),
    month = _useState124[0],
    setMonth = _useState124[1];
  var _useState125 = useState("bs"),
    _useState126 = _slicedToArray(_useState125, 2),
    subtab = _useState126[0],
    setSubtab = _useState126[1];

  // ---- 共通計算ヘルパー ----
  var getSalary = function getSalary(ym) {
    return data.salaries.find(function (s) {
      return s.month === ym;
    });
  };
  var getMonthIncome = function getMonthIncome(ym) {
    var s = getSalary(ym);
    if (!s) return 0;
    var gross = s.basicSalary + Object.values(s.allowances || {}).reduce(function (a, b) {
      return a + b;
    }, 0);
    var ded = Object.values(s.deductions || {}).reduce(function (a, b) {
      return a + b;
    }, 0);
    return Math.max(0, gross - ded) + (s.bonus || 0) + (s.spouseIncome || 0) + (s.sideIncome || 0) + Object.values(s.businessIncome || {}).reduce(function (a, b) {
      return a + b;
    }, 0) - Object.values(s.generalDeductions || {}).reduce(function (a, b) {
      return a + b;
    }, 0);
  };
  var getMonthExpense = function getMonthExpense(ym) {
    return data.expenses.filter(function (e) {
      var _e$date8;
      return (_e$date8 = e.date) === null || _e$date8 === void 0 ? void 0 : _e$date8.startsWith(ym);
    }).reduce(function (a, e) {
      return a + e.amount;
    }, 0);
  };
  var isFixedCat = function isFixedCat(cat) {
    var _EXPENSE_CATS$find3;
    return ((_EXPENSE_CATS$find3 = EXPENSE_CATS.find(function (c) {
      return c.name === cat;
    })) === null || _EXPENSE_CATS$find3 === void 0 ? void 0 : _EXPENSE_CATS$find3.isFixed) || false;
  };
  var getFixedExpense = function getFixedExpense(ym) {
    return data.expenses.filter(function (e) {
      var _e$date9;
      return ((_e$date9 = e.date) === null || _e$date9 === void 0 ? void 0 : _e$date9.startsWith(ym)) && isFixedCat(e.category);
    }).reduce(function (a, e) {
      return a + e.amount;
    }, 0);
  };
  var getVarExpense = function getVarExpense(ym) {
    return getMonthExpense(ym) - getFixedExpense(ym);
  };

  // ---- B/S 計算 ----
  var totalBank = (data.assets.bankAccounts || []).reduce(function (a, b) {
    return a + (b.balance || 0);
  }, 0);
  var nisaVal = (((_data$assets$nisa8 = data.assets.nisa) === null || _data$assets$nisa8 === void 0 ? void 0 : _data$assets$nisa8.investments) || []).reduce(function (a, i) {
    return a + (i.currentValue || 0);
  }, 0);
  var idecoVal = ((_data$assets$ideco8 = data.assets.ideco) === null || _data$assets$ideco8 === void 0 ? void 0 : _data$assets$ideco8.totalBalance) || 0;
  var annuityVal = (data.assets.variableAnnuities || []).reduce(function (a, v) {
    return a + (v.currentValue || 0);
  }, 0);
  var totalAsset = totalBank + nisaVal + idecoVal + annuityVal;
  var totalLiability = data.loans.reduce(function (a, l) {
    return a + (l.remainingBalance || 0);
  }, 0);
  var netWorth = totalAsset - totalLiability;

  // ---- P/L 計算（選択月）----
  var income = getMonthIncome(month);
  var expense = getMonthExpense(month);
  var profit = income - expense;
  var fixedExp = getFixedExpense(month);
  var varExp = getVarExpense(month);

  // カテゴリ別支出（P/L詳細用）
  var catBreakdown = function () {
    var map = {};
    data.expenses.filter(function (e) {
      var _e$date0;
      return (_e$date0 = e.date) === null || _e$date0 === void 0 ? void 0 : _e$date0.startsWith(month);
    }).forEach(function (e) {
      map[e.category] = (map[e.category] || 0) + e.amount;
    });
    return Object.entries(map).sort(function (a, b) {
      return b[1] - a[1];
    });
  }();

  // ---- 損益分岐点（直近12ヶ月）----
  var bepRows = function () {
    var rows = [];
    var now = new Date();
    for (var i = 11; i >= 0; i--) {
      var d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      var ym = "".concat(d.getFullYear(), "-").concat(String(d.getMonth() + 1).padStart(2, "0"));
      var inc = getMonthIncome(ym);
      var fixed = getFixedExpense(ym);
      var variable = getVarExpense(ym);
      var total = fixed + variable;
      var varRate = inc > 0 ? variable / inc : 0;
      // 損益分岐点売上高 = 固定費 / (1 - 変動費率)
      var bep = varRate < 1 && inc > 0 ? Math.round(fixed / (1 - varRate)) : null;
      var margin = inc > 0 ? Math.round(profit / inc * 100) : null;
      rows.push({
        ym: ym,
        label: "".concat(d.getMonth() + 1, "\u6708"),
        inc: inc,
        fixed: fixed,
        variable: variable,
        total: total,
        bep: bep,
        profit: inc - total
      });
    }
    return rows;
  }();

  // ---- BSダイアグラム（T字型）----
  var BSDiagram = function BSDiagram() {
    var assetItems = [{
      label: "銀行預金",
      value: totalBank,
      color: "#1565C0"
    }, {
      label: "NISA",
      value: nisaVal,
      color: "#27AE60"
    }, {
      label: "iDeCo",
      value: idecoVal,
      color: "#2980B9"
    }, {
      label: "変額年金",
      value: annuityVal,
      color: "#8E44AD"
    }].filter(function (i) {
      return i.value > 0;
    });
    var liabItems = data.loans.map(function (l) {
      return {
        label: l.name || "ローン",
        value: l.remainingBalance || 0,
        color: "#E74C3C"
      };
    }).filter(function (i) {
      return i.value > 0;
    });
    var maxH = 220;
    var totalForScale = Math.max(totalAsset, totalLiability + Math.max(0, netWorth));
    var barSection = function barSection(items, total, baseColor) {
      var offset = 0;
      return items.map(function (item, idx) {
        var pct = totalForScale > 0 ? item.value / totalForScale : 0;
        var h = Math.max(pct * maxH, item.value > 0 ? 18 : 0);
        var y = offset;
        offset += h;
        return /*#__PURE__*/React.createElement("div", {
          key: idx,
          style: {
            height: h,
            backgroundColor: item.color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            overflow: "hidden",
            borderBottom: "1px solid rgba(255,255,255,0.3)"
          }
        }, h > 22 && /*#__PURE__*/React.createElement("span", {
          style: {
            fontSize: 10,
            color: "#fff",
            fontWeight: 700,
            textAlign: "center",
            padding: "0 4px"
          }
        }, item.label), h > 32 && /*#__PURE__*/React.createElement("span", {
          style: {
            fontSize: 9,
            color: "rgba(255,255,255,0.9)"
          }
        }, fmtYen(item.value)));
      });
    };
    var netH = totalForScale > 0 ? Math.max(Math.max(0, netWorth) / totalForScale * maxH, netWorth > 0 ? 20 : 0) : 0;
    var liabH = totalForScale > 0 ? totalLiability / totalForScale * maxH : 0;
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 2
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "center",
        fontSize: 12,
        fontWeight: 700,
        color: "#1565C0",
        marginBottom: 4,
        padding: "4px 0",
        backgroundColor: "#E3F2FD",
        borderRadius: "6px 6px 0 0"
      }
    }, "\u8CC7\u7523 ", fmtYen(totalAsset)), /*#__PURE__*/React.createElement("div", {
      style: {
        height: maxH,
        borderRadius: "0 0 6px 6px",
        overflow: "hidden",
        border: "1.5px solid #90CAF9",
        borderTop: "none"
      }
    }, barSection(assetItems, totalAsset, "#1565C0"), assetItems.length === 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#999",
        fontSize: 12
      }
    }, "\u30C7\u30FC\u30BF\u306A\u3057"))), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "center",
        fontSize: 12,
        fontWeight: 700,
        color: "#C62828",
        marginBottom: 4,
        padding: "4px 0",
        backgroundColor: "#FFEBEE",
        borderRadius: "6px 6px 0 0"
      }
    }, "\u8CA0\u50B5\uFF0B\u7D14\u8CC7\u7523 ", fmtYen(totalLiability + Math.max(0, netWorth))), /*#__PURE__*/React.createElement("div", {
      style: {
        height: maxH,
        borderRadius: "0 0 6px 6px",
        overflow: "hidden",
        border: "1.5px solid #EF9A9A",
        borderTop: "none",
        display: "flex",
        flexDirection: "column"
      }
    }, barSection(liabItems, totalLiability, "#E74C3C"), netWorth > 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minHeight: netH,
        backgroundColor: "#4CAF50",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        color: "#fff",
        fontWeight: 700
      }
    }, "\u7D14\u8CC7\u7523"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 9,
        color: "rgba(255,255,255,0.9)"
      }
    }, fmtYen(netWorth))), liabItems.length === 0 && netWorth <= 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#999",
        fontSize: 12
      }
    }, "\u8CA0\u50B5\u306A\u3057")))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexWrap: "wrap",
        gap: 6,
        marginTop: 10
      }
    }, [{
      label: "銀行預金",
      color: "#1565C0"
    }, {
      label: "NISA",
      color: "#27AE60"
    }, {
      label: "iDeCo",
      color: "#2980B9"
    }, {
      label: "変額年金",
      color: "#8E44AD"
    }, {
      label: "ローン（負債）",
      color: "#E74C3C"
    }, {
      label: "純資産",
      color: "#4CAF50"
    }].map(function (l) {
      return /*#__PURE__*/React.createElement("div", {
        key: l.label,
        style: {
          display: "flex",
          alignItems: "center",
          gap: 4
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          width: 10,
          height: 10,
          borderRadius: 2,
          backgroundColor: l.color
        }
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 11,
          color: colors.textLight
        }
      }, l.label));
    })));
  };

  // ---- P/Lウォーターフォール図式 ----
  var PLDiagram = function PLDiagram() {
    var maxVal = Math.max(income, expense, 1);
    var incomeH = Math.round(income / maxVal * 180);
    var fixedH = Math.round(fixedExp / maxVal * 180);
    var varH = Math.round(varExp / maxVal * 180);
    var profitH = Math.max(Math.round(Math.abs(profit) / maxVal * 180), profit !== 0 ? 20 : 4);
    var isProfit = profit >= 0;
    var Bar = function Bar(_ref54) {
      var height = _ref54.height,
        color = _ref54.color,
        label = _ref54.label,
        value = _ref54.value,
        striped = _ref54.striped;
      return /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flex: 1
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 10,
          color: colors.textLight,
          marginBottom: 2,
          textAlign: "center"
        }
      }, fmtYen(value)), /*#__PURE__*/React.createElement("div", {
        style: {
          height: height,
          width: "100%",
          backgroundColor: color,
          borderRadius: "6px 6px 0 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: striped ? "repeating-linear-gradient(45deg, rgba(255,255,255,0.15) 0px, rgba(255,255,255,0.15) 4px, transparent 4px, transparent 8px)" : "none"
        }
      }, height > 28 && /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 10,
          color: "#fff",
          fontWeight: 700,
          writingMode: "vertical-rl",
          textOrientation: "mixed"
        }
      }, label)), /*#__PURE__*/React.createElement("div", {
        style: {
          height: 3,
          width: "100%",
          backgroundColor: "#DDD"
        }
      }), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 11,
          fontWeight: 700,
          color: color,
          marginTop: 4,
          textAlign: "center"
        }
      }, label));
    };
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "flex-end",
        gap: 6,
        height: 220
      }
    }, /*#__PURE__*/React.createElement(Bar, {
      height: incomeH,
      color: "#27AE60",
      label: "\u53CE\u5165",
      value: income
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        fontSize: 18,
        color: "#999",
        paddingBottom: 20
      }
    }, "\u2212"), /*#__PURE__*/React.createElement(Bar, {
      height: fixedH,
      color: "#E67E22",
      label: "\u56FA\u5B9A\u8CBB",
      value: fixedExp,
      striped: true
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        fontSize: 18,
        color: "#999",
        paddingBottom: 20
      }
    }, "\u2212"), /*#__PURE__*/React.createElement(Bar, {
      height: varH,
      color: "#E74C3C",
      label: "\u5909\u52D5\u8CBB",
      value: varExp,
      striped: true
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        fontSize: 18,
        color: "#999",
        paddingBottom: 20
      }
    }, "="), /*#__PURE__*/React.createElement(Bar, {
      height: profitH,
      color: isProfit ? "#1565C0" : "#B71C1C",
      label: isProfit ? "黒字" : "赤字",
      value: Math.abs(profit)
    })), catBreakdown.length > 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 14
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        fontWeight: 700,
        color: colors.textLight,
        marginBottom: 6
      }
    }, "\u8CBB\u7528\u5185\u8A33"), catBreakdown.map(function (_ref55) {
      var _expenseCategories$ca;
      var _ref56 = _slicedToArray(_ref55, 2),
        cat = _ref56[0],
        amt = _ref56[1];
      var pct = expense > 0 ? amt / expense : 0;
      var catColor = ((_expenseCategories$ca = expenseCategories[cat]) === null || _expenseCategories$ca === void 0 ? void 0 : _expenseCategories$ca.color) || colors.neutral;
      return /*#__PURE__*/React.createElement("div", {
        key: cat,
        style: {
          marginBottom: 6
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 2
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
          backgroundColor: catColor
        }
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 12
        }
      }, cat)), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 12,
          fontWeight: 600
        }
      }, fmtYen(amt))), /*#__PURE__*/React.createElement("div", {
        style: {
          height: 5,
          borderRadius: 3,
          backgroundColor: "#EEE",
          overflow: "hidden"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          height: "100%",
          width: "".concat(pct * 100, "%"),
          backgroundColor: catColor,
          borderRadius: 3
        }
      })));
    })));
  };

  // ---- 損益分岐点表 ----
  var BEPTable = function BEPTable() {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        overflowX: "auto"
      }
    }, /*#__PURE__*/React.createElement("table", {
      style: {
        width: "100%",
        borderCollapse: "collapse",
        fontSize: 11
      }
    }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
      style: {
        backgroundColor: "#E3F2FD"
      }
    }, ["月", "収入", "固定費", "変動費", "収支", "損益分岐点"].map(function (h) {
      return /*#__PURE__*/React.createElement("th", {
        key: h,
        style: {
          padding: "6px 4px",
          textAlign: "right",
          fontWeight: 700,
          color: "#1565C0",
          borderBottom: "2px solid #90CAF9",
          whiteSpace: "nowrap"
        }
      }, h);
    }))), /*#__PURE__*/React.createElement("tbody", null, bepRows.map(function (row, i) {
      var isCurrentMonth = row.ym === month;
      var isBlack = row.profit >= 0;
      return /*#__PURE__*/React.createElement("tr", {
        key: row.ym,
        style: {
          backgroundColor: isCurrentMonth ? "#FFF9C4" : i % 2 === 0 ? "#FAFAFA" : "#FFF"
        }
      }, /*#__PURE__*/React.createElement("td", {
        style: {
          padding: "5px 4px",
          fontWeight: isCurrentMonth ? 700 : 400,
          whiteSpace: "nowrap"
        }
      }, row.label), /*#__PURE__*/React.createElement("td", {
        style: {
          padding: "5px 4px",
          textAlign: "right",
          color: "#27AE60",
          fontWeight: 600
        }
      }, row.inc > 0 ? fmtYen(row.inc) : "-"), /*#__PURE__*/React.createElement("td", {
        style: {
          padding: "5px 4px",
          textAlign: "right",
          color: "#E67E22"
        }
      }, row.fixed > 0 ? fmtYen(row.fixed) : "-"), /*#__PURE__*/React.createElement("td", {
        style: {
          padding: "5px 4px",
          textAlign: "right",
          color: "#E74C3C"
        }
      }, row.variable > 0 ? fmtYen(row.variable) : "-"), /*#__PURE__*/React.createElement("td", {
        style: {
          padding: "5px 4px",
          textAlign: "right",
          color: isBlack ? "#1565C0" : "#B71C1C",
          fontWeight: 700
        }
      }, row.inc > 0 ? (isBlack ? "+" : "") + fmtYen(row.profit) : "-"), /*#__PURE__*/React.createElement("td", {
        style: {
          padding: "5px 4px",
          textAlign: "right",
          color: "#555"
        }
      }, row.bep !== null ? fmtYen(row.bep) : "-"));
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: colors.textLight,
        marginTop: 6
      }
    }, "\u203B \u640D\u76CA\u5206\u5C90\u70B9 \uFF1D \u56FA\u5B9A\u8CBB \xF7\uFF081 \u2212 \u5909\u52D5\u8CBB\u7387\uFF09\u3000\u9EC4\u8272\u884C\u304C\u9078\u629E\u4E2D\u306E\u6708"));
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "8px 16px 4px",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 17,
      fontWeight: 800,
      color: "#1565C0"
    }
  }, "\uD83D\uDCCA \u8CA1\u52D9\u8AF8\u8868")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      padding: "4px 16px 8px",
      gap: 6
    }
  }, [{
    id: "bs",
    label: "B/S 貸借対照表"
  }, {
    id: "pl",
    label: "P/L 損益計算書"
  }, {
    id: "cf",
    label: "損益分岐点"
  }].map(function (t) {
    return /*#__PURE__*/React.createElement("button", {
      key: t.id,
      onClick: function onClick() {
        return setSubtab(t.id);
      },
      style: {
        flex: 1,
        padding: "7px 4px",
        borderRadius: 8,
        border: "none",
        cursor: "pointer",
        fontSize: 11,
        fontWeight: 700,
        backgroundColor: subtab === t.id ? "#1565C0" : "#EEE",
        color: subtab === t.id ? "#fff" : colors.textLight
      }
    }, t.label);
  })), subtab !== "bs" && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 16px 8px"
    }
  }, /*#__PURE__*/React.createElement(MonthNavigator, {
    month: month,
    setMonth: setMonth
  })), subtab === "bs" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "\u8CB8\u501F\u5BFE\u7167\u8868\uFF08B/S\uFF09"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: colors.textLight,
      marginBottom: 10
    }
  }, "\u73FE\u6642\u70B9\u306E\u8CC7\u7523\u30FB\u8CA0\u50B5\u30FB\u7D14\u8CC7\u7523\u306E\u69CB\u6210"), /*#__PURE__*/React.createElement(BSDiagram, null), /*#__PURE__*/React.createElement(Divider, null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: colors.textLight
    }
  }, "\u7DCF\u8CC7\u7523"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      color: "#1565C0"
    }
  }, fmtYen(totalAsset))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: colors.textLight
    }
  }, "\u7DCF\u8CA0\u50B5"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      color: "#E74C3C"
    }
  }, "-", fmtYen(totalLiability))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: 4,
      paddingTop: 8,
      borderTop: "2px solid #EEE"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 700
    }
  }, "\u7D14\u8CC7\u7523"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 20,
      fontWeight: 800,
      color: netWorth >= 0 ? "#4CAF50" : "#B71C1C"
    }
  }, fmtYen(netWorth)))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "\u8CC7\u7523\u306E\u90E8 \u660E\u7D30"
  }), [{
    label: "銀行預金",
    value: totalBank,
    color: "#1565C0"
  }, {
    label: "NISA",
    value: nisaVal,
    color: "#27AE60"
  }, {
    label: "iDeCo",
    value: idecoVal,
    color: "#2980B9"
  }, {
    label: "変額年金",
    value: annuityVal,
    color: "#8E44AD"
  }].map(function (item) {
    return /*#__PURE__*/React.createElement("div", {
      key: item.label,
      style: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 6
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
        backgroundColor: item.color
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13
      }
    }, item.label)), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        fontWeight: 600,
        color: item.color
      }
    }, fmtYen(item.value)));
  })), data.loans.length > 0 && /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "\u8CA0\u50B5\u306E\u90E8 \u660E\u7D30"
  }), data.loans.map(function (l) {
    return /*#__PURE__*/React.createElement("div", {
      key: l.id,
      style: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 6
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13
      }
    }, l.name || "ローン"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        fontWeight: 600,
        color: "#E74C3C"
      }
    }, "-", fmtYen(l.remainingBalance || 0)));
  }))), subtab === "pl" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "\u640D\u76CA\u8A08\u7B97\u66F8\uFF08P/L\uFF09\u2014 ".concat(month.replace("-", "年"), "\u6708")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: colors.textLight,
      marginBottom: 10
    }
  }, "\u53CE\u5165\u304B\u3089\u8CBB\u7528\u3092\u5DEE\u3057\u5F15\u3044\u305F\u5F53\u6708\u306E\u640D\u76CA"), income === 0 && expense === 0 ? /*#__PURE__*/React.createElement(EmptyState, {
    message: "\u3053\u306E\u6708\u306E\u30C7\u30FC\u30BF\u304C\u3042\u308A\u307E\u305B\u3093"
  }) : /*#__PURE__*/React.createElement(PLDiagram, null), /*#__PURE__*/React.createElement(Divider, null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: colors.textLight
    }
  }, "\u53CE\u5165\u5408\u8A08"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: "#27AE60"
    }
  }, fmtYen(income))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: colors.textLight
    }
  }, "\u56FA\u5B9A\u8CBB"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: "#E67E22"
    }
  }, "-", fmtYen(fixedExp))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: colors.textLight
    }
  }, "\u5909\u52D5\u8CBB"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: "#E74C3C"
    }
  }, "-", fmtYen(varExp))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: 6,
      paddingTop: 8,
      borderTop: "2px solid #EEE"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 700
    }
  }, "\u5F53\u6708\u53CE\u652F"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 22,
      fontWeight: 800,
      color: profit >= 0 ? "#1565C0" : "#B71C1C"
    }
  }, profit >= 0 ? "+" : "", fmtYen(profit))))), subtab === "cf" && /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "\u640D\u76CA\u5206\u5C90\u70B9\u5206\u6790\uFF08\u76F4\u8FD112\u30F6\u6708\uFF09"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: colors.textLight,
      marginBottom: 10
    }
  }, "\u640D\u76CA\u5206\u5C90\u70B9\uFF1A\u6700\u4F4E\u9650\u5FC5\u8981\u306A\u53CE\u5165\u984D\u3002\u3053\u308C\u3092\u4E0A\u56DE\u308B\u3068\u9ED2\u5B57\u3002"), /*#__PURE__*/React.createElement(BEPTable, null)));
}
// マウント
var container = document.getElementById('root');
var root = ReactDOM.createRoot(container);
root.render(React.createElement(KakeiboApp, null));

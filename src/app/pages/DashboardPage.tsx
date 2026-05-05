import { useState } from "react";
import { Link, useNavigate } from "react-router";
import React from "react";
import {
  Home,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  Settings,
  LogOut,
  Bell,
  Search,
  ChevronDown,
  Info,
  X,
  Zap,
  List,
  BarChart2,
  ExternalLink,
  RefreshCw,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const salesData = [
  { day: "Mon", vendas: 2400, transacoes: 12 },
  { day: "Tue", vendas: 3200, transacoes: 18 },
  { day: "Wed", vendas: 2800, transacoes: 15 },
  { day: "Thu", vendas: 4100, transacoes: 22 },
  { day: "Fri", vendas: 5200, transacoes: 28 },
  { day: "Sat", vendas: 6800, transacoes: 35 },
  { day: "Sun", vendas: 4500, transacoes: 24 },
];

const transactions = [
  {
    id: "TXN-001",
    date: "30/04/2026 14:32",
    order: "#PED-8821",
    amount: "R$ 549,90",
    status: "completed",
    statusLabel: "Concluído",
    detail: "Transação confirmada em 0.4s com 32 validações",
    aiInsight: null,
  },
  {
    id: "TXN-002",
    date: "30/04/2026 13:15",
    order: "#PED-8820",
    amount: "R$ 89,00",
    status: "failed",
    statusLabel: "Falhou",
    detail: "Erro de gas insuficiente",
    aiInsight:
      "Nossa IA traduziu este erro: O cliente tentou pagar, mas não tinha SOL suficiente para a taxa de rede (gas fee). Recomendamos sugerir um depósito via Pix na carteira dele.",
  },
  {
    id: "TXN-003",
    date: "30/04/2026 12:48",
    order: "#PED-8819",
    amount: "R$ 1.200,00",
    status: "completed",
    statusLabel: "Concluído",
    detail: "Pagamento em USDC confirmado",
    aiInsight: null,
  },
  {
    id: "TXN-004",
    date: "30/04/2026 11:22",
    order: "#PED-8818",
    amount: "R$ 329,90",
    status: "pending",
    statusLabel: "Pendente",
    detail: "Aguardando confirmação de bloco",
    aiInsight: null,
  },
  {
    id: "TXN-005",
    date: "30/04/2026 10:05",
    order: "#PED-8817",
    amount: "R$ 78,50",
    status: "failed",
    statusLabel: "Falhou",
    detail: "Transação rejeitada pelo usuário",
    aiInsight:
      "Nossa IA analisou: O cliente cancelou manualmente a transação na carteira Phantom. Isso geralmente indica dúvida sobre o valor ou desconfiança no processo. Recomendamos adicionar um resumo claro do pedido no widget de pagamento.",
  },
  {
    id: "TXN-006",
    date: "30/04/2026 09:17",
    order: "#PED-8816",
    amount: "R$ 2.499,00",
    status: "completed",
    statusLabel: "Concluído",
    detail: "Maior transação do dia",
    aiInsight: null,
  },
];

const statusColors: Record<string, { bg: string; text: string; dot: string }> = {
  completed: { bg: "rgba(20,241,149,0.1)", text: "#059669", dot: "#14F195" },
  failed: { bg: "rgba(239,68,68,0.1)", text: "#DC2626", dot: "#EF4444" },
  pending: { bg: "rgba(251,191,36,0.1)", text: "#D97706", dot: "#FBB724" },
};

function AIInsightBubble({ text, onClose }: { text: string; onClose: () => void }) {
  return (
    <div
      className="relative p-4 rounded-xl text-sm mt-2"
      style={{
        background: "rgba(153,69,255,0.08)",
        border: "1px solid rgba(153,69,255,0.25)",
        color: "#111827",
      }}
    >
      <div className="flex gap-3">
        <div
          className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
          style={{ background: "linear-gradient(135deg, #9945FF, #14F195)" }}
        >
          <span className="text-xs text-white" style={{ fontWeight: 700 }}>
            IA
          </span>
        </div>
        <div className="flex-1">
          <p className="text-xs mb-1" style={{ color: "#9945FF", fontWeight: 600 }}>
            Análise por IA
          </p>
          <p style={{ color: "#374151" }}>{text}</p>
        </div>
        <button onClick={onClose} className="p-1 shrink-0" style={{ color: "#9CA3AF" }}>
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

export function DashboardPage() {
  const [activeMenu, setActiveMenu] = useState("home");
  const [openInsight, setOpenInsight] = useState<string | null>(null);
  const navigate = useNavigate();

  const menuItems = [
    { id: "home", label: "General View", icon: Home },
    { id: "transactions", label: "Transactions", icon: List },
    { id: "analytics", label: "Analytics", icon: BarChart2 },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const totalVendas = "R$ 27.840,30";
  const taxaConversao = "78.3%";
  const transacoesHoje = "24";
  const receitaUSDC = "4.820 USDC";

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "#0A0C10" }}>
      {/* Sidebar */}
      <aside
        className="w-64 shrink-0 flex flex-col h-full"
        style={{ background: "#0F1117", borderRight: "1px solid rgba(255,255,255,0.06)" }}
      >
        {/* Logo */}
        <div className="px-6 py-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <Link to="/" className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #9945FF, #14F195)" }}
            >
              <Zap className="w-4 h-4 text-white" fill="white" />
            </div>
            <span>
              <span style={{ color: "#F9FAFB", fontWeight: 700 }}>SolEasy</span>
              <span style={{ color: "#9945FF" }}> SDK</span>
            </span>
          </Link>
        </div>

        {/* Store info */}
        <div className="px-4 py-3 mx-3 mt-4 rounded-xl" style={{ background: "rgba(153,69,255,0.08)", border: "1px solid rgba(153,69,255,0.15)" }}>
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
              style={{ background: "linear-gradient(135deg, #9945FF33, #14F19533)", color: "#14F195", fontWeight: 700 }}
            >
              S
            </div>
            <div>
              <p className="text-sm" style={{ color: "#F9FAFB", fontWeight: 600 }}>
                Dev Store
              </p>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#14F195" }} />
                <p className="text-xs" style={{ color: "#14F195" }}>
                  Active
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {menuItems.map(({ id, label, icon: Icon }) => {
            const isActive = activeMenu === id;
            return (
              <button
                key={id}
                onClick={() => setActiveMenu(id)}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-left transition-all"
                style={{
                  background: isActive ? "rgba(153,69,255,0.15)" : "transparent",
                  color: isActive ? "#9945FF" : "#8B949E",
                  border: isActive ? "1px solid rgba(153,69,255,0.2)" : "1px solid transparent",
                }}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm">{label}</span>
                {id === "transactions" && (
                  <span
                    className="ml-auto text-xs px-1.5 py-0.5 rounded-full"
                    style={{ background: "rgba(153,69,255,0.2)", color: "#9945FF" }}
                  >
                    6
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div className="p-4 space-y-1" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <button
            onClick={() => navigate("/widget")}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all"
            style={{ color: "#8B949E" }}
          >
            <ExternalLink className="w-4 h-4" />
            View Widget Demo
          </button>
          <button
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all"
            style={{ color: "#EF4444" }}
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Top bar */}
        <div
          className="sticky top-0 z-10 px-8 py-4 flex items-center justify-between"
          style={{ background: "rgba(10,12,16,0.9)", backdropFilter: "blur(10px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div>
            <h1 style={{ color: "#F9FAFB", fontWeight: 700 }} className="text-xl">
              {activeMenu === "home" && "General View"}
              {activeMenu === "transactions" && "Transactions"}
              {activeMenu === "analytics" && "Analytics"}
              {activeMenu === "settings" && "Settings"}
            </h1>
            <p className="text-sm" style={{ color: "#8B949E" }}>
              April 30, 2026
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm"
              style={{ background: "rgba(255,255,255,0.05)", color: "#8B949E" }}
            >
              <Search className="w-4 h-4" />
              <span>Search...</span>
            </div>
            <button
              className="p-2 rounded-xl relative"
              style={{ background: "rgba(255,255,255,0.05)", color: "#8B949E" }}
            >
              <Bell className="w-4 h-4" />
              <span
                className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
                style={{ background: "#9945FF" }}
              />
            </button>
            <button
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm"
              style={{ background: "rgba(255,255,255,0.05)", color: "#F9FAFB" }}
            >
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs"
                style={{ background: "linear-gradient(135deg, #9945FF, #14F195)", fontWeight: 700 }}
              >
                L
              </div>
              <span>Dev Store</span>
              <ChevronDown className="w-3.5 h-3.5" style={{ color: "#8B949E" }} />
            </button>
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                label: "Total Sales",
                value: totalVendas,
                change: "+12.5%",
                positive: true,
                sub: "last 7 days",
                color: "#14F195",
              },
              {
                label: "Conversion Rate",
                value: taxaConversao,
                change: "+3.2%",
                positive: true,
                sub: "initiated vs completed",
                color: "#9945FF",
              },
              {
                label: "Transactions Today",
                value: transacoesHoje,
                change: "-2",
                positive: false,
                sub: "vs yesterday: 26",
                color: "#FBB724",
              },
              {
                label: "Revenue in USDC",
                value: receitaUSDC,
                change: "+8.1%",
                positive: true,
                sub: "stablecoin",
                color: "#14F195",
              },
            ].map((card) => (
              <div
                key={card.label}
                className="p-5 rounded-2xl"
                style={{ background: "#0F1117", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <p className="text-xs mb-3" style={{ color: "#8B949E" }}>
                  {card.label}
                </p>
                <p
                  className="text-2xl mb-2"
                  style={{ color: "#F9FAFB", fontWeight: 700 }}
                >
                  {card.value}
                </p>
                <div className="flex items-center gap-1.5">
                  {card.positive ? (
                    <ArrowUpRight className="w-3.5 h-3.5" style={{ color: "#14F195" }} />
                  ) : (
                    <ArrowDownRight className="w-3.5 h-3.5" style={{ color: "#EF4444" }} />
                  )}
                  <span
                    className="text-xs"
                    style={{ color: card.positive ? "#14F195" : "#EF4444" }}
                  >
                    {card.change}
                  </span>
                  <span className="text-xs" style={{ color: "#4A5568" }}>
                    {card.sub}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Area Chart */}
            <div
              className="lg:col-span-2 p-6 rounded-2xl"
              style={{ background: "#0F1117", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 style={{ color: "#F9FAFB", fontWeight: 600 }}>
                    Sales Volume
                  </h3>
                  <p className="text-sm" style={{ color: "#8B949E" }}>
                    Last 7 days
                  </p>
                </div>
                <button className="p-2 rounded-lg" style={{ color: "#8B949E" }}>
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={salesData}>
                  <defs>
                    <linearGradient id="colorVendas" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#9945FF" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#9945FF" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis
                    dataKey="day"
                    tick={{ fill: "#8B949E", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "#8B949E", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `R$${(v / 1000).toFixed(1)}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "#161B22",
                      border: "1px solid rgba(153,69,255,0.3)",
                      borderRadius: "8px",
                      color: "#F9FAFB",
                    }}
                    formatter={(value: number) => [`R$ ${value.toLocaleString("pt-BR")}`, "Vendas"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="vendas"
                    stroke="#9945FF"
                    strokeWidth={2}
                    fill="url(#colorVendas)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Bar Chart */}
            <div
              className="p-6 rounded-2xl"
              style={{ background: "#0F1117", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="mb-6">
                <h3 style={{ color: "#F9FAFB", fontWeight: 600 }}>
                  Transactions/Day
                </h3>
                <p className="text-sm" style={{ color: "#8B949E" }}>
                  Daily Quantity
                </p>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={salesData} barSize={12}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis
                    dataKey="day"
                    tick={{ fill: "#8B949E", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "#8B949E", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "#161B22",
                      border: "1px solid rgba(20,241,149,0.3)",
                      borderRadius: "8px",
                      color: "#F9FAFB",
                    }}
                  />
                  <Bar
                    dataKey="transacoes"
                    fill="#14F195"
                    radius={[4, 4, 0, 0]}
                    fillOpacity={0.8}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Transactions Table */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{ background: "#0F1117", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div
              className="px-6 py-4 flex items-center justify-between"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div>
                <h3 style={{ color: "#F9FAFB", fontWeight: 600 }}>
                  Recent Transactions
                </h3>
                <p className="text-sm" style={{ color: "#8B949E" }}>
                  Click the icon{" "}
                  <span style={{ color: "#9945FF" }}>ⓘ</span> for AI insights
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs"
                  style={{ background: "rgba(153,69,255,0.1)", color: "#9945FF", border: "1px solid rgba(153,69,255,0.2)" }}
                >
                  <TrendingUp className="w-3.5 h-3.5" />
                  AI Active
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    {["Data", "Pedido", "Valor", "Status", "Status Detalhado"].map((h) => (
                      <th
                        key={h}
                        className="px-6 py-3 text-left text-xs"
                        style={{ color: "#4A5568", fontWeight: 600 }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx) => {
                    const colors = statusColors[tx.status];
                    const isOpen = openInsight === tx.id;
                    return (
                      <React.Fragment key={tx.id}>
                        <tr
                          style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}
                        >
                          <td className="px-6 py-4 text-sm" style={{ color: "#8B949E" }}>
                            {tx.date}
                          </td>
                          <td className="px-6 py-4 text-sm" style={{ color: "#F9FAFB" }}>
                            {tx.order}
                          </td>
                          <td className="px-6 py-4 text-sm" style={{ color: "#F9FAFB", fontWeight: 600 }}>
                            {tx.amount}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className="flex items-center gap-1.5 w-fit px-2.5 py-1 rounded-full text-xs"
                              style={{ background: colors.bg, color: colors.text }}
                            >
                              <span
                                className="w-1.5 h-1.5 rounded-full"
                                style={{ background: colors.dot }}
                              />
                              {tx.statusLabel}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <span className="text-sm" style={{ color: "#8B949E" }}>
                                {tx.detail}
                              </span>
                              {tx.aiInsight && (
                                <button
                                  onClick={() => setOpenInsight(isOpen ? null : tx.id)}
                                  className="p-1 rounded-full transition-all"
                                  style={{
                                    color: isOpen ? "#9945FF" : "#4A5568",
                                    background: isOpen ? "rgba(153,69,255,0.15)" : "transparent",
                                  }}
                                  title="Ver análise da IA"
                                >
                                  <Info className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                        {isOpen && tx.aiInsight && (
                          <tr>
                            <td colSpan={5} className="px-6 pb-4">
                              <AIInsightBubble
                                text={tx.aiInsight}
                                onClose={() => setOpenInsight(null)}
                              />
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
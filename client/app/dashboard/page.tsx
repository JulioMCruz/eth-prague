"use client"

import React from "react"
import { TrendingUp, TrendingDown, Activity, DollarSign, BarChart3, Clock } from "lucide-react"
import Header from "@/components/header"
import { useAccount } from "wagmi"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const DashboardPage = () => {
  const { isConnected } = useAccount()

  // Portfolio data
  const portfolioStats = {
    totalValue: 12500,
    totalPnL: 3500,
    percentageGain: 38.9,
    weeklyPerformance: 3.5,
  }

  const portfolioPerformanceData = [
    { name: "Sun", value: 11800 },
    { name: "Mon", value: 11500 },
    { name: "Tue", value: 12100 },
    { name: "Wed", value: 11900 },
    { name: "Thu", value: 12200 },
    { name: "Fri", value: 12400 },
    { name: "Sat", value: 12500 },
  ]

  const activePositions = [
    {
      id: "active-1",
      name: "Viral Meme Hunter",
      description: "AI tracks social sentiment and trades viral meme tokens with 85% accuracy rate.",
      entryValue: "$1,247",
      currentValue: "$2,411",
      performance: "+45.2%",
      duration: "3 weeks",
      risk: "High",
      image: "/data/c1_meme-fund.jpg",
    },
    {
      id: "active-2",
      name: "Cross-Chain Arbitrage Pro",
      description: "AI captures price differences across chains with millisecond execution.",
      entryValue: "$3,200",
      currentValue: "$3,940",
      performance: "+23.1%",
      duration: "1 month",
      risk: "Medium",
      image: "/data/c1_arbitrage.jpg",
    },
    {
      id: "active-3",
      name: "Professional Manager Fund",
      description: "Professional fund manager with 8+ years experience and verified track record.",
      entryValue: "$5,000",
      currentValue: "$6,247",
      performance: "+24.9%",
      duration: "2 months",
      risk: "Medium",
      image: "/data/c3_professional.jpg",
    },
  ]

  const closedPositions = [
    {
      id: "closed-1",
      name: "DeFi Blue Chip Optimizer",
      exitDate: "2 weeks ago",
      duration: "3 months",
      entryValue: "$2,000",
      exitValue: "$2,374",
      pnl: "+$374",
      performance: "+18.7%",
    },
    {
      id: "closed-2",
      name: "News Event Trader",
      exitDate: "1 month ago",
      duration: "6 weeks",
      entryValue: "$1,500",
      exitValue: "$1,785",
      pnl: "+$285",
      performance: "+19.0%",
    },
    {
      id: "closed-3",
      name: "TradFi-Crypto Bridge",
      exitDate: "2 months ago",
      duration: "2 months",
      entryValue: "$3,000",
      exitValue: "$2,850",
      pnl: "-$150",
      performance: "-5.0%",
    },
  ]

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#1B1B3A" }}>
      <Header />

      {/* Top Sawtooth Border */}
      <div className="w-full mt-4" style={{ backgroundColor: "#1B1B3A" }}>
        <svg
          viewBox="0 0 1200 40"
          className="w-full h-10"
          preserveAspectRatio="none"
          style={{ display: "block" }}
        >
          <path
            d="M0,40 L20,0 L40,40 L60,0 L80,40 L100,0 L120,40 L140,0 L160,40 L180,0 L200,40 L220,0 L240,40 L260,0 L280,40 L300,0 L320,40 L340,0 L360,40 L380,0 L400,40 L420,0 L440,40 L460,0 L480,40 L500,0 L520,40 L540,0 L560,40 L580,0 L600,40 L620,0 L640,40 L660,0 L680,40 L700,0 L720,40 L740,0 L760,40 L780,0 L800,40 L820,0 L840,40 L860,0 L880,40 L900,0 L920,40 L940,0 L960,40 L980,0 L1000,40 L1020,0 L1040,40 L1060,0 L1080,40 L1100,0 L1120,40 L1140,0 L1160,40 L1180,0 L1200,40 L1200,40 L0,40 Z"
            fill="#F3F4F6"
          />
        </svg>
      </div>

      {/* Header Section with Big Title */}
      <div className="relative" style={{ backgroundColor: "#F3F4F6" }}>
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h1
            className="text-8xl md:text-9xl lg:text-[12rem] font-black tracking-tight leading-none font-clash-grotesk"
            style={{ color: "#1B1B3A" }}
          >
            PORTFOLIO
          </h1>
        </div>
      </div>

      {/* Bottom Sawtooth Border */}
      <div className="w-full" style={{ backgroundColor: "#F3F4F6" }}>
        <svg
          viewBox="0 0 1200 40"
          className="w-full h-10"
          preserveAspectRatio="none"
          style={{ display: "block" }}
        >
          <path
            d="M0,0 L20,40 L40,0 L60,40 L80,0 L100,40 L120,0 L140,40 L160,0 L180,40 L200,0 L220,40 L240,0 L260,40 L280,0 L300,40 L320,0 L340,40 L360,0 L380,40 L400,0 L420,40 L440,0 L460,40 L480,0 L500,40 L520,0 L540,40 L560,0 L580,40 L600,0 L620,40 L640,0 L660,40 L680,0 L700,40 L720,0 L740,40 L760,0 L780,40 L800,0 L820,40 L840,0 L860,40 L880,0 L900,40 L920,0 L940,40 L960,0 L980,40 L1000,0 L1020,40 L1040,0 L1060,40 L1080,0 L1100,40 L1120,0 L1140,40 L1160,0 L1180,40 L1200,0 L1200,40 L0,40 Z"
            fill="#1B1B3A"
          />
        </svg>
      </div>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {isConnected ? (
          <>
            {/* Overview Section */}
            <section className="mb-16">
              <div className="flex items-center space-x-3 mb-6">
                <BarChart3 className="w-7 h-7 text-[#F3F4F6]" />
                <h2 className="text-3xl font-bold text-white">Overview</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatsCard
                  title="Total Value in Vault"
                  value={`$${portfolioStats.totalValue.toLocaleString()}`}
                  change={`+${portfolioStats.weeklyPerformance}%`}
                  icon={<DollarSign className="w-5 h-5" />}
                />
                <StatsCard
                  title="Total P&L"
                  value={`$${portfolioStats.totalPnL.toLocaleString()}`}
                  change={`+${portfolioStats.percentageGain}%`}
                  icon={<TrendingUp className="w-5 h-5" />}
                  positive
                />
                <StatsCard
                  title="Active Positions"
                  value={activePositions.length.toString()}
                  icon={<Activity className="w-5 h-5" />}
                />
                <StatsCard
                  title="Portfolio Performance"
                  value={`+${portfolioStats.weeklyPerformance}%`}
                  change="7d"
                  icon={<BarChart3 className="w-5 h-5" />}
                  positive
                />
              </div>

              {/* Performance Chart */}
              <div className="bg-black/20 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">Portfolio Performance</h3>
                  <div className="flex space-x-1 bg-white/10 p-0.5 rounded-md">
                    {["24h", "7d", "30d", "All"].map((period) => (
                      <button
                        key={period}
                        className={`px-3 py-1 text-xs rounded-sm transition-all duration-300 ${
                          period === "7d"
                            ? "bg-[#F3F4F6] text-[#1B1B3A] font-bold"
                            : "text-white/60 hover:text-white hover:bg-white/10"
                        }`}
                      >
                        {period}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={portfolioPerformanceData}>
                      <defs>
                        <linearGradient id="colorPortfolio" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#F3F4F6" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#F3F4F6" stopOpacity={0.1} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" vertical={false} />
                      <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: "#ffffff60" }}
                        dy={10}
                      />
                      <YAxis hide={true} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(0, 0, 0, 0.8)",
                          border: "1px solid rgba(255, 255, 255, 0.2)",
                          borderRadius: "0.5rem",
                        }}
                        itemStyle={{ color: "#F3F4F6" }}
                        labelStyle={{ color: "#ffffff60" }}
                      />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#F3F4F6"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorPortfolio)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </section>

            {/* Active Positions */}
            <section className="mb-16">
              <div className="flex items-center space-x-3 mb-6">
                <Activity className="w-7 h-7 text-[#F3F4F6]" />
                <h2 className="text-3xl font-bold text-white">Active Positions</h2>
              </div>
              <p className="text-white/70 mb-8 text-lg">
                Your currently open fund positions
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activePositions.map((position) => (
                  <ActivePositionCard key={position.id} position={position} />
                ))}
              </div>
            </section>

            {/* Closed Positions */}
            <section className="mb-16">
              <div className="flex items-center space-x-3 mb-6">
                <Clock className="w-7 h-7 text-[#F3F4F6]" />
                <h2 className="text-3xl font-bold text-white">Past Positions</h2>
              </div>
              <p className="text-white/70 mb-8 text-lg">
                Your recently closed fund positions
              </p>
              <div className="space-y-4">
                {closedPositions.map((position) => (
                  <ClosedPositionCard key={position.id} position={position} />
                ))}
              </div>
            </section>
          </>
        ) : (
          <div className="text-center py-24">
            <h2 className="text-3xl font-bold text-white mb-4">
              Connect Your Wallet
            </h2>
            <p className="text-white/70 text-lg mb-8">
              Connect your wallet to view your portfolio and positions
            </p>
            <div className="inline-flex items-center justify-center w-64 h-64 bg-black/20 backdrop-blur-sm border border-white/20 rounded-full">
              <DollarSign className="w-24 h-24 text-white/40" />
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

// Stats Card Component
const StatsCard = ({
  title,
  value,
  change,
  icon,
  positive = false,
}: {
  title: string;
  value: string;
  change?: string;
  icon: React.ReactNode;
  positive?: boolean;
}) => {
  return (
    <div className="bg-black/20 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-black/30 hover:border-white/30 transition-all duration-300">
      <div className="flex items-center justify-between mb-2">
        <p className="text-white/60 text-sm">{title}</p>
        <div className="text-white/40">{icon}</div>
      </div>
      <p className="text-2xl font-bold text-white mb-1">{value}</p>
      {change && (
        <p
          className={`text-sm font-medium ${
            positive ? "text-green-400" : "text-white/60"
          }`}
        >
          {change}
        </p>
      )}
    </div>
  );
};

// Active Position Card Component
const ActivePositionCard = ({
  position,
}: {
  position: {
    id: string;
    name: string;
    description: string;
    entryValue: string;
    currentValue: string;
    performance: string;
    duration: string;
    risk: string;
    image?: string;
  };
}) => {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low":
        return "text-green-400 bg-green-500/20";
      case "Medium":
        return "text-yellow-400 bg-yellow-500/20";
      case "High":
        return "text-red-400 bg-red-500/20";
      default:
        return "text-gray-400 bg-gray-500/20";
    }
  };

  return (
    <div className="bg-black/20 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden hover:bg-black/30 hover:border-white/30 transition-all duration-300 group">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={position.image}
          alt={position.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {/* Badges */}
        <div className="absolute top-4 right-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold ${getRiskColor(
              position.risk
            )}`}
          >
            {position.risk} Risk
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Header */}
        <div className="mb-3">
          <h3 className="text-xl font-bold text-white group-hover:text-[#F3F4F6] transition-colors mb-1">
            {position.name}
          </h3>
          <p className="text-white/60 text-sm">{position.duration} invested</p>
        </div>

        {/* Description */}
        <p className="text-white/70 text-sm mb-4 line-clamp-2">
          {position.description}
        </p>

        {/* Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-white/60 text-xs mb-1">Entry Value</p>
            <p className="text-white font-bold">{position.entryValue}</p>
          </div>
          <div>
            <p className="text-white/60 text-xs mb-1">Current Value</p>
            <p className="text-white font-bold">{position.currentValue}</p>
          </div>
        </div>

        {/* Performance */}
        <div className="flex items-center justify-between pt-4 border-t border-white/20">
          <p className="text-white/60 text-sm">Performance</p>
          <div
            className={`font-bold flex items-center space-x-1 ${
              position.performance.startsWith("+")
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {position.performance.startsWith("+") ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span>{position.performance}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Closed Position Card Component
const ClosedPositionCard = ({
  position,
}: {
  position: {
    id: string;
    name: string;
    exitDate: string;
    duration: string;
    entryValue: string;
    exitValue: string;
    pnl: string;
    performance: string;
  };
}) => {
  const isPositive = position.pnl.startsWith("+");

  return (
    <div className="bg-black/20 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-black/30 hover:border-white/30 transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white mb-1">{position.name}</h3>
          <div className="flex items-center space-x-4 text-sm text-white/60">
            <span>Exited {position.exitDate}</span>
            <span>•</span>
            <span>Duration: {position.duration}</span>
          </div>
        </div>
        <div className="text-right">
          <p
            className={`text-xl font-bold ${
              isPositive ? "text-green-400" : "text-red-400"
            }`}
          >
            {position.pnl}
          </p>
          <p
            className={`text-sm font-medium flex items-center justify-end ${
              isPositive ? "text-green-400" : "text-red-400"
            }`}
          >
            {isPositive ? (
              <TrendingUp className="w-3 h-3 mr-1" />
            ) : (
              <TrendingDown className="w-3 h-3 mr-1" />
            )}
            {position.performance}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-white/10">
        <div>
          <p className="text-white/60 text-xs">Entry Value</p>
          <p className="text-white font-medium">{position.entryValue}</p>
        </div>
        <div>
          <p className="text-white/60 text-xs">Exit Value</p>
          <p className="text-white font-medium">{position.exitValue}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

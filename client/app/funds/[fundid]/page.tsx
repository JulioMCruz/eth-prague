"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  Bot,
  TrendingUp,
  TrendingDown,
  Users,
  Star,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { useState, use } from "react";
import Header from "@/components/header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Fund {
  id: string;
  name: string;
  description: string;
  apy: string;
  tvl: string;
  risk: string;
  manager: string;
  performance: string;
  investors: number;
  image: string;
  longDescription?: string;
  chartData?: Array<{ name: string; value: number }>;
  trades?: Array<{
    action: "Buy" | "Sell";
    tokenName: string;
    tokenAmount: string;
    timeframe: string;
    timestamp: string;
  }>;
}

// Updated funds data to match your main page structure
const allFundsData: { [key: string]: Fund[] } = {
  aiOnChain: [
    {
      id: "ai-1",
      name: "Viral Meme Hunter",
      description:
        "AI tracks social sentiment and trades viral meme tokens across all chains with 85% accuracy rate.",
      apy: "+127.3%",
      tvl: "$2.4M",
      risk: "High",
      manager: "Neural Alpha AI",
      performance: "+45.2%",
      investors: 1247,
      image: "/data/c1_meme-fund.jpg",
      longDescription:
        "Advanced AI system that monitors social media sentiment, trading volume, and momentum indicators across multiple blockchain networks. Our neural network processes over 10,000 data points per minute to identify viral meme tokens before they peak, executing trades with millisecond precision to capture maximum gains while minimizing downside risk.",
      chartData: [
        { name: "Jan", value: 3000 },
        { name: "Feb", value: 3500 },
        { name: "Mar", value: 4200 },
        { name: "Apr", value: 5800 },
        { name: "May", value: 6400 },
        { name: "Jun", value: 7200 },
      ],
      trades: [
        {
          action: "Buy",
          tokenName: "PEPE",
          tokenAmount: "1,250,000",
          timeframe: "2m",
          timestamp: "2 min ago",
        },
        {
          action: "Sell",
          tokenName: "DOGE",
          tokenAmount: "45,000",
          timeframe: "15m",
          timestamp: "8 min ago",
        },
        {
          action: "Buy",
          tokenName: "SHIB",
          tokenAmount: "2,100,000",
          timeframe: "5m",
          timestamp: "12 min ago",
        },
        {
          action: "Sell",
          tokenName: "BONK",
          tokenAmount: "850,000",
          timeframe: "30m",
          timestamp: "25 min ago",
        },
        {
          action: "Buy",
          tokenName: "WIF",
          tokenAmount: "15,500",
          timeframe: "1h",
          timestamp: "45 min ago",
        },
      ],
    },
    {
      id: "ai-2",
      name: "Cross-Chain Arbitrage Pro",
      description:
        "AI captures price differences and cross-chain opportunities with millisecond execution.",
      apy: "+89.7%",
      tvl: "$12.8M",
      risk: "Medium",
      manager: "ArbiBot Systems",
      performance: "+23.1%",
      investors: 892,
      image: "/data/c1_arbitrage.jpg",
      longDescription:
        "Sophisticated arbitrage algorithm that identifies and exploits price differences across 15+ blockchain networks including Ethereum, BSC, Polygon, Arbitrum, and Solana. The system executes flash loans and cross-chain swaps automatically to capture risk-free profits from market inefficiencies.",
      chartData: [
        { name: "Jan", value: 5000 },
        { name: "Feb", value: 5200 },
        { name: "Mar", value: 5800 },
        { name: "Apr", value: 6100 },
        { name: "May", value: 6350 },
        { name: "Jun", value: 6600 },
      ],
      trades: [
        {
          action: "Buy",
          tokenName: "ETH",
          tokenAmount: "2.5",
          timeframe: "1m",
          timestamp: "30 sec ago",
        },
        {
          action: "Sell",
          tokenName: "ETH",
          tokenAmount: "2.5",
          timeframe: "1m",
          timestamp: "45 sec ago",
        },
        {
          action: "Buy",
          tokenName: "USDC",
          tokenAmount: "10,000",
          timeframe: "2m",
          timestamp: "3 min ago",
        },
        {
          action: "Sell",
          tokenName: "USDT",
          tokenAmount: "10,000",
          timeframe: "2m",
          timestamp: "3 min ago",
        },
      ],
    },
    {
      id: "ai-3",
      name: "DeFi Blue Chip Optimizer",
      description:
        "AI allocates to established protocols like Uniswap, Aave, Compound with smart rebalancing.",
      apy: "+34.5%",
      tvl: "$45.2M",
      risk: "Low",
      manager: "Stability AI Fund",
      performance: "+18.7%",
      investors: 2156,
      image: "/data/c1_blue-chip.jpg",
      longDescription:
        "Conservative AI strategy focused on established DeFi protocols with proven track records. The algorithm continuously monitors yield opportunities, protocol health metrics, and risk factors to optimize allocation across blue-chip DeFi assets while maintaining capital preservation as the primary objective.",
      chartData: [
        { name: "Jan", value: 8000 },
        { name: "Feb", value: 8150 },
        { name: "Mar", value: 8300 },
        { name: "Apr", value: 8500 },
        { name: "May", value: 8750 },
        { name: "Jun", value: 9000 },
      ],
      trades: [
        {
          action: "Buy",
          tokenName: "UNI",
          tokenAmount: "500",
          timeframe: "4h",
          timestamp: "2 hrs ago",
        },
        {
          action: "Sell",
          tokenName: "COMP",
          tokenAmount: "25",
          timeframe: "6h",
          timestamp: "4 hrs ago",
        },
        {
          action: "Buy",
          tokenName: "AAVE",
          tokenAmount: "150",
          timeframe: "12h",
          timestamp: "8 hrs ago",
        },
      ],
    },
  ],
  // Add other categories as needed...
};

const findFundById = (fundId: string): Fund | undefined => {
  for (const categoryKey in allFundsData) {
    const categoryFunds =
      allFundsData[categoryKey as keyof typeof allFundsData];
    const fund = categoryFunds.find((f) => f.id === fundId);
    if (fund) return fund;
  }
  return undefined;
};

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

export default function FundDetailPage({
  params,
}: {
  params: Promise<{ fundid: string }>;
}) {
  const resolvedParams = use(params);
  const fund = findFundById(resolvedParams.fundid);
  const [selectedTimeframe, setSelectedTimeframe] = useState("7d");

  if (!fund) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: "#1B1B3A" }}>
        <Header />
        <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
          <h1 className="text-3xl font-bold text-white mb-3">Fund Not Found</h1>
          <p className="text-white/70 mb-6">
            The fund you are looking for (ID: {resolvedParams.fundid}) does not
            exist.
          </p>
          <Link href="/funds">
            <Button className="bg-[#F3F4F6] text-[#1B1B3A] hover:bg-[#F3F4F6]/90 rounded-lg px-6 py-2">
              Back to All Funds
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#1B1B3A" }}>
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <Link
          href="/funds"
          className="inline-flex items-center text-sm text-[#F3F4F6]/70 hover:text-[#F3F4F6] mb-8 group"
        >
          <ChevronLeft
            size={18}
            className="mr-1 group-hover:-translate-x-0.5 transition-transform"
          />
          Back to All Funds
        </Link>

        {/* Fund Header */}
        <div className="bg-black/20 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden mb-8">
          {/* Image Section */}
          <div className="relative h-64 overflow-hidden">
            <img
              src={fund.image}
              alt={fund.name}
              className="w-full h-full object-cover"
            />
            <div
              className="w-full h-full bg-gradient-to-br from-[#1B1B3A] to-[#F3F4F6]/20 hidden absolute inset-0"
              style={{ display: "none" }}
            />

            {/* Badges */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              {(fund.id.startsWith("ai-") || fund.id.startsWith("hybrid-")) && (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/80 text-white backdrop-blur-sm flex items-center gap-1">
                  <Bot className="w-3 h-3" />
                  AI Managed
                </span>
              )}
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${getRiskColor(
                  fund.risk
                )}`}
              >
                {fund.risk} Risk
              </span>
            </div>

            {/* Title Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent p-6 flex flex-col justify-end">
              <h1 className="text-4xl font-bold text-white mb-2">
                {fund.name}
              </h1>
              <div className="flex items-center space-x-3 text-white/80">
                <span>{fund.manager}</span>
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6">
            <p className="text-white/70 text-lg mb-6 leading-relaxed">
              {fund.longDescription || fund.description}
            </p>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div>
                <p className="text-white/60 text-sm mb-1">APY</p>
                <p className="text-green-400 font-bold text-2xl">{fund.apy}</p>
              </div>
              <div>
                <p className="text-white/60 text-sm mb-1">TVL</p>
                <p className="text-white font-bold text-2xl">{fund.tvl}</p>
              </div>
              <div>
                <p className="text-white/60 text-sm mb-1">24h Performance</p>
                <p
                  className={`font-bold text-xl flex items-center space-x-1 ${
                    fund.performance.startsWith("+")
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {fund.performance.startsWith("+") ? (
                    <TrendingUp className="w-5 h-5" />
                  ) : (
                    <TrendingDown className="w-5 h-5" />
                  )}
                  <span>{fund.performance}</span>
                </p>
              </div>
              <div>
                <p className="text-white/60 text-sm mb-1">Investors</p>
                <p className="text-white font-bold text-xl flex items-center space-x-1">
                  <Users className="w-5 h-5" />
                  <span>{fund.investors.toLocaleString()}</span>
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button className="bg-[#F3F4F6] text-[#1B1B3A] hover:bg-[#F3F4F6]/90 px-8 py-3 text-lg font-bold">
                Invest Now
              </Button>
              <Button
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 px-8 py-3 text-lg"
              >
                Withdraw
              </Button>
            </div>
          </div>
        </div>

        {/* Performance Chart */}
        {fund.chartData && (
          <div className="bg-black/20 backdrop-blur-sm border border-white/20 rounded-xl p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">
                Performance Chart
              </h2>
              <div className="flex gap-2">
                {["24h", "7d", "30d", "All"].map((period) => (
                  <button
                    key={period}
                    onClick={() => setSelectedTimeframe(period)}
                    className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                      selectedTimeframe === period
                        ? "bg-[#F3F4F6] text-[#1B1B3A]"
                        : "bg-white/10 text-white/70 hover:bg-white/20"
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart
                data={fund.chartData}
                margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
              >
                <defs>
                  <linearGradient
                    id={`chartColor-${fund.id}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#F3F4F6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#F3F4F6" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#F3F4F6" }}
                />
                <YAxis hide={true} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: "0.5rem",
                    color: "#F3F4F6",
                  }}
                  formatter={(value: number) => [
                    `$${value.toLocaleString()}`,
                    "Value",
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#F3F4F6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill={`url(#chartColor-${fund.id})`}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Trading Activity Table */}
        {fund.trades && (
          <div className="bg-black/20 backdrop-blur-sm border border-white/20 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-6">
              Recent Trading Activity
            </h2>
            <Table>
              <TableHeader>
                <TableRow className="border-white/20">
                  <TableHead className="text-white/70">Action</TableHead>
                  <TableHead className="text-white/70">Token</TableHead>
                  <TableHead className="text-white/70">Amount</TableHead>
                  <TableHead className="text-white/70">Timeframe</TableHead>
                  <TableHead className="text-white/70">Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fund.trades.map((trade, index) => (
                  <TableRow
                    key={index}
                    className="border-white/10 hover:bg-white/5"
                  >
                    <TableCell>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          trade.action === "Buy"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {trade.action}
                      </span>
                    </TableCell>
                    <TableCell className="text-white font-medium">
                      {trade.tokenName}
                    </TableCell>
                    <TableCell className="text-white/80">
                      {trade.tokenAmount}
                    </TableCell>
                    <TableCell className="text-white/80">
                      {trade.timeframe}
                    </TableCell>
                    <TableCell className="text-white/60 text-sm">
                      {trade.timestamp}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </main>
    </div>
  );
}

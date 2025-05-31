"use client" 

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts"
import { useState, use } from "react"
import Header from "@/components/header"

interface Tag {
  label: string
  type: string
}

interface ChartDataItem {
  name: string
  value: number
}

interface ActivityItemData {
  text: string
  time: string
}

interface Fund {
  id: string
  name: string
  description: string
  imageUrl: string
  tags: Tag[]
  category?: string
  longDescription?: string
  performancePercent?: number
  apy?: string
  riskRating?: string
  mode?: string
  strategy?: string
  chartData?: ChartDataItem[]
  recentActivity?: ActivityItemData[]
}

const allFundsData: { [key: string]: Fund[] } = {
  trending: [
    {
      id: "tf1",
      name: "Meme Momentum Fund",
      description: "Realtime sentiment based memecoin allocation.",
      imageUrl: "/data/crypto-art-mashup.png",
      tags: [
        { label: "AI managed", type: "type_light_bg" },
        { label: "+12.8%", type: "performance_dark_bg" },
      ],
      category: "Trending",
      longDescription:
        "Detects trending memecoins across Base, Solana, and Ethereum using real-time volume, social sentiment, and momentum signals. Capital is reallocated dynamically to maximise short-term spikes while minimising drawdown.",
      performancePercent: 12.8,
      apy: "12.8%",
      riskRating: "High",
      mode: "AI managed",
      strategy: "Rebalances every 2h based on trends",
      chartData: [
        { name: "Jan", value: 3000 },
        { name: "Feb", value: 3200 },
        { name: "Mar", value: 2800 },
        { name: "Apr", value: 3500 },
        { name: "May", value: 4000 },
        { name: "Jun", value: 4500 },
        { name: "Jul", value: 4200 },
      ],
      recentActivity: [
        { text: "Allocated 500 $FUND to SOL-WIF pool", time: "5 min ago" },
        { text: "Swapped 200 USDC → PONKE on Base", time: "1 hr ago" },
        { text: "Exited 150 PEPE position", time: "3 hrs ago" },
        { text: "Increased BONK exposure by 20%", time: "5 hrs ago" },
      ],
    },
    {
      id: "tf2",
      name: "Stable Momentum Fund",
      description: "Stablecoin farming with periodic momentum-based reallocation.",
      imageUrl: "/data/abstract-stablecoin-growth.png",
      tags: [
        { label: "Hybrid strategy", type: "type_light_bg" },
        { label: "+5%", type: "performance_dark_bg" },
      ],
      category: "Trending",
      longDescription: "Aims for steady growth with managed risk.",
      performancePercent: 5.0,
      apy: "5.0%",
      riskRating: "Medium",
      mode: "Hybrid strategy",
      strategy: "Quarterly rebalance.",
    },
    {
      id: "tf3",
      name: "EcoFi Fund",
      description: "Focused on regenerative finance, and impact-oriented protocols.",
      imageUrl: "/data/abstract-sunset-eco-finance.png",
      tags: [
        { label: "Human Manager", type: "type_light_bg" },
        { label: "+8%", type: "performance_dark_bg" },
      ],
      category: "Trending",
      longDescription: "Supports sustainable blockchain initiatives.",
      performancePercent: 8.0,
      apy: "8.0%",
      riskRating: "Medium-Low",
      mode: "Human Manager",
      strategy: "Long-term holding.",
    },
  ],
  aiManaged: [
    {
      id: "ai1",
      name: "Narrative Radar Fund",
      description: "Detects and rides early trends from social signals.",
      imageUrl: "/data/abstract-data-waves-social-signals.png",
      tags: [
        { label: "AI managed", type: "type_light_bg" },
        { label: "+15.2%", type: "performance_dark_bg" },
      ],
      category: "AI Managed",
      longDescription: "AI-driven narrative strength scores.",
      performancePercent: 15.2,
      apy: "15.2%",
      riskRating: "High",
      mode: "AI managed",
      strategy: "Dynamic allocation.",
    },
    {
      id: "ai2",
      name: "Cross-Chain Arbitrage Fund",
      description: "Exploits inefficiencies and price gaps across networks.",
      imageUrl: "/data/glowing-network.png",
      tags: [
        { label: "AI managed", type: "type_light_bg" },
        { label: "+18%", type: "performance_dark_bg" },
      ],
      category: "AI Managed",
      longDescription: "High-frequency arbitrage trades.",
      performancePercent: 18.0,
      apy: "18.0%",
      riskRating: "Medium",
      mode: "AI managed",
      strategy: "AI bot execution.",
    },
    {
      id: "ai3",
      name: "Yield Pulse Fund",
      description: "Rotates capital to the highest APY farms across chains in real time.",
      imageUrl: "/data/dynamic-yield-pulse.png",
      tags: [
        { label: "AI managed", type: "type_light_bg" },
        { label: "+11%", type: "performance_dark_bg" },
      ],
      category: "AI Managed",
      longDescription: "Continuous APY monitoring.",
      performancePercent: 11.0,
      apy: "11.0%",
      riskRating: "Medium-High",
      mode: "AI managed",
      strategy: "Automated rotation.",
    },
  ],
  hybridManaged: [
    {
      id: "hy1",
      name: "Stable Momentum Fund",
      description: "Stablecoin farming with periodic momentum-based reallocation.",
      imageUrl: "/data/stable-hybrid-momentum-fund.png",
      tags: [
        { label: "Hybrid strategy", type: "type_light_bg" },
        { label: "+7%", type: "performance_dark_bg" },
      ],
      category: "Hybrid Managed",
      longDescription: "Human oversight validates AI signals.",
      performancePercent: 7.0,
      apy: "7.0%",
      riskRating: "Medium",
      mode: "Hybrid strategy",
      strategy: "AI-suggested reallocations.",
    },
    {
      id: "hy2",
      name: "DeFi Alpha Fund",
      description: "Maximize returns with alpha strategies.",
      imageUrl: "/data/defi-alpha-hybrid-fund.png",
      tags: [
        { label: "Hybrid strategy", type: "type_light_bg" },
        { label: "+21.8%", type: "performance_dark_bg" },
      ],
      category: "Hybrid Managed",
      longDescription: "Blend of AI models and human trading.",
      performancePercent: 21.8,
      apy: "21.8%",
      riskRating: "High",
      mode: "Hybrid strategy",
      strategy: "AI quant + human discretion.",
    },
  ],
  humanManaged: [
    {
      id: "hm1",
      name: "Real World Yield Fund",
      description: "Focuses on tokenised RWAs like bonds, invoices, and real estate.",
      imageUrl: "/data/rwa-yield-fund-building.png",
      tags: [
        { label: "Human Manager", type: "type_light_bg" },
        { label: "+6%", type: "performance_dark_bg" },
      ],
      category: "Human Managed",
      longDescription: "Diversified RWA portfolio.",
      performancePercent: 6.0,
      apy: "6.0%",
      riskRating: "Low-Medium",
      mode: "Human Manager",
      strategy: "Active RWA management.",
    },
    {
      id: "hm2",
      name: "EcoFi Fund",
      description: "Focused on regenerative finance, and impact-oriented protocols.",
      imageUrl: "/data/eco-finance-human-managed.png",
      tags: [
        { label: "Human Manager", type: "type_light_bg" },
        { label: "+5%", type: "performance_dark_bg" },
      ],
      category: "Human Managed",
      longDescription: "Curated impact-driven assets.",
      performancePercent: 5.0,
      apy: "5.0%",
      riskRating: "Medium-Low",
      mode: "Human Manager",
      strategy: "Impact-vetted portfolio.",
    },
  ],
}

const findFundById = (fundId: string): Fund | undefined => {
  for (const categoryKey in allFundsData) {
    const categoryFunds = allFundsData[categoryKey as keyof typeof allFundsData]
    const fund = categoryFunds.find((f) => f.id === fundId)
    if (fund) return fund
  }
  return undefined
}

function ActivityItemDisplay({ text, time }: ActivityItemData) {
  return (
    <div className="bg-[#fff9ef] p-3 rounded-lg flex justify-between items-center border border-[#e9d7c1]">
      <p className="text-sm text-[#30261f]">{text}</p>
      <p className="text-xs text-[#7f664a] whitespace-nowrap">{time}</p>
    </div>
  )
}

function RecentActivitySection({ activities }: { activities?: ActivityItemData[] }) {
  if (!activities || activities.length === 0) {
    return (
      <div>
        <h2 className="text-xl font-bold text-[#30261f] mb-4">Recent Activity</h2>
        <p className="text-sm text-[#7f664a]">No recent activity available for this fund.</p>
      </div>
    )
  }
  return (
    <div>
      <h2 className="text-xl font-bold text-[#30261f] mb-4">Recent Activity</h2>
      <div className="space-y-3">
        {activities.map((activity, index) => (
          <ActivityItemDisplay key={index} text={activity.text} time={activity.time} />
        ))}
      </div>
    </div>
  )
}

export default function FundDetailPage({ params }: { params: Promise<{ fundid: string }> }) {
  const resolvedParams = use(params)
  const fund = findFundById(resolvedParams.fundid)
  const [selectedTimeframe, setSelectedTimeframe] = useState("7d")

  if (!fund) {
    return (
      <div className="min-h-screen bg-[#f3ebd5] text-[#30261f]">
        <Header />
        <div className="min-h-screen bg-[#f3ebd5] flex flex-col items-center justify-center p-4 text-center">
          <h1 className="text-3xl font-bold text-[#30261f] mb-3">Fund Not Found</h1>
          <p className="text-[#7f664a] mb-6">
            The fund you are looking for (ID: {resolvedParams.fundid}) does not exist or data is unavailable.
          </p>
          <Link href="/funds">
            <Button className="bg-[#f09630] text-black hover:bg-orange-500 rounded-lg px-6 py-2">
              Back to All Funds
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f3ebd5] text-[#30261f]">
      <Header />

      <main className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 max-w-5xl">
        <Link
          href="/funds"
          className="inline-flex items-center text-sm text-[#aa6325] hover:text-[#c28446] mb-6 group"
        >
          <ChevronLeft size={18} className="mr-1 group-hover:-translate-x-0.5 transition-transform" />
          Back to All
        </Link>

        <div className="relative h-64 rounded-xl overflow-hidden shadow-lg mb-8">
          <Image
            src={fund.imageUrl || "/placeholder.svg?width=1200&height=300&query=fund+visual"}
            alt={fund.name}
            layout="fill"
            objectFit="cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-6 flex flex-col justify-end">
            <h1 className="text-3xl font-bold text-white shadow-black [text-shadow:_0_2px_4px_rgb(0_0_0_/_0.8)]">
              {fund.name}
            </h1>
          </div>
        </div>

        <p className="text-base text-[#30261f] mb-8 leading-relaxed">
          {fund.longDescription || fund.description || "No detailed description available."}
        </p>

        <div className="bg-white rounded-xl p-6 mb-8 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-[#7f664a] mb-1">Performance</p>
              <p className="text-3xl font-bold text-[#30261f]">
                {fund.performancePercent !== undefined ? `${fund.performancePercent >= 0 ? "+" : ""}${fund.performancePercent}%` : "N/A"}
              </p>
            </div>
            <div className="flex gap-2">
              {["24h", "7d", "30d", "All"].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedTimeframe(period)}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    selectedTimeframe === period
                      ? "bg-[#f09630] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={fund.chartData || []} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <defs>
                <linearGradient id={`chartColor-${fund.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f09630" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#f09630" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: "#7f664a" }}
              />
              <YAxis hide={true} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  border: "1px solid #e9d7c1",
                  borderRadius: "0.5rem",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
                itemStyle={{ color: "#30261f" }}
                labelStyle={{ color: "#7f664a", fontSize: "0.75rem" }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, "Value"]}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#f09630"
                strokeWidth={2}
                fillOpacity={1}
                fill={`url(#chartColor-${fund.id})`}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4">
            <p className="text-xs text-[#7f664a] mb-1">APY</p>
            <p className="text-lg font-semibold text-[#30261f]">{fund.apy || "N/A"}</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <p className="text-xs text-[#7f664a] mb-1">Risk Rating</p>
            <p className="text-lg font-semibold text-[#30261f]">{fund.riskRating || "N/A"}</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <p className="text-xs text-[#7f664a] mb-1">Mode</p>
            <p className="text-lg font-semibold text-[#30261f]">{fund.mode || "N/A"}</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <p className="text-xs text-[#7f664a] mb-1">Strategy</p>
            <p className="text-sm font-medium text-[#30261f] leading-tight">{fund.strategy || "N/A"}</p>
          </div>
        </div>

        <div className="flex gap-4 mb-10">
          <Button
            size="lg"
            className="bg-[#c28446] text-white hover:bg-[#b0703c] px-8 py-3 rounded-lg text-base font-semibold"
          >
            Fund
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="bg-[#f9e8c9] border-[#c28446] text-[#c28446] hover:bg-[#f0ddb8] px-8 py-3 rounded-lg text-base font-semibold"
          >
            Withdraw
          </Button>
        </div>

        <RecentActivitySection activities={fund.recentActivity} />
      </main>
    </div>
  )
}

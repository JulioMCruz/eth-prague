"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import Header from "@/components/header"
import { useAccount } from "wagmi";

const totalValueInVault = {
  amount: 12500,
  currency: "USD",
  changePercent: 3.5,
}

const portfolioPerformanceData = [
  { name: "Jan", value: 3000 },
  { name: "Feb", value: 3500 },
  { name: "Mar", value: 2800 },
  { name: "Apr", value: 4000 },
  { name: "May", value: 3700 },
  { name: "Jun", value: 5500 },
  { name: "Jul", value: 5200 },
]

const openPositionsData = [
  {
    id: "op1",
    name: "Meme Momentum Fund",
    imageUrl: "/data/crypto-art-mashup.png",
    performance: 1.2,
  },
  {
    id: "op2",
    name: "Cross-Chain Arbitrage Fund",
    imageUrl: "/data/glowing-network.png",
    performance: -0.4,
  },
]

const pastPositionsData = [
  {
    id: "pp1",
    name: "Cross-Chain Arbitrage Fund",
    status: "Completed",
    exitTime: "exited 2 weeks ago",
    pnl: 500,
    currency: "USD",
  },
  {
    id: "pp2",
    name: "Real World Yield Fund",
    status: "Completed",
    exitTime: "exited 6 weeks ago",
    pnl: 40,
    currency: "USD",
  },
  {
    id: "pp3",
    name: "ETH Staking Vault",
    status: "Exited Early",
    exitTime: "exited 1 month ago",
    pnl: -150,
    currency: "USD",
  },
]

const totalValueInVaultEmpty = {
  amount: 0,
  currency: "USD",
  changePercent: 0, 
}

// Empty data for the chart
const portfolioPerformanceDataEmpty: { name: string; value: number }[] = []

// Empty data for positions
const openPositionsDataEmpty: any[] = [] // Using any[] for simplicity, define interface if needed
const pastPositionsDataEmpty: any[] = []


export default function PortfolioPage() {

  const { isConnected } = useAccount()

  return (
    <div className="min-h-screen bg-[#f3ebd5] text-[#30261f]">
      <Header />

      {/* Main Content - Identical to Dashboard */}
      <main className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#30261f] mb-8">Overview</h1>

        {isConnected! && (
          <>
            {/* Total Value Card */}
            <Card className="mb-8 bg-[#fff9ef] border-[#e9d7c1] shadow-sm rounded-xl">
              <CardContent className="p-6">
                <p className="text-sm text-[#7f664a] mb-1">Total Value in Vault</p>
                <p className="text-3xl sm:text-4xl font-bold text-[#30261f]">
                  ${totalValueInVault.amount.toLocaleString()}
                </p>
                <p
                  className={`text-sm font-medium ${totalValueInVault.changePercent >= 0 ? "text-green-600" : "text-red-600"}`}
                >
                  {totalValueInVault.changePercent >= 0 ? "+" : ""}
                  {totalValueInVault.changePercent}%
                </p>
              </CardContent>
            </Card>

            {/* Portfolio Performance Card */}
            <Card className="mb-8 bg-[#fff9ef] border-[#e9d7c1] shadow-sm rounded-xl">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle className="text-lg font-semibold text-[#30261f]">Portfolio Performance</CardTitle>
                  <p
                    className={`text-2xl font-bold mt-1 ${totalValueInVault.changePercent >= 0 ? "text-green-600" : "text-red-600"}`}
                  >
                    {totalValueInVault.changePercent >= 0 ? "+" : ""}
                    {totalValueInVault.changePercent}%
                  </p>
                </div>
                <div className="flex space-x-1 bg-[#e9d7c1] p-0.5 rounded-md">
                  {["24h", "7d", "30d", "All"].map((period) => (
                    <Button
                      key={period}
                      variant="ghost"
                      size="sm"
                      className={`px-2 py-1 text-xs rounded-sm h-auto
                        ${period === "7d" ? "bg-[#c28446] text-white hover:bg-[#b0703c]" : "text-[#7f664a] hover:bg-[#d9c8b3]"}
                      `}
                    >
                      {period}
                    </Button>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="h-[250px] sm:h-[300px] p-2 pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={portfolioPerformanceData}>
                    <defs>
                      <linearGradient id="colorUvPortfolio" x1="0" y1="0" x2="0" y2="1">
                        {" "}

                        <stop offset="5%" stopColor="#c28446" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#c28446" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e9d7c1" vertical={false} />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: "#7f664a" }}
                      dy={10}
                    />
                    <YAxis hide={true} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#fff9ef", border: "1px solid #e9d7c1", borderRadius: "0.5rem" }}
                      itemStyle={{ color: "#30261f" }}
                      labelStyle={{ color: "#7f664a" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#c28446"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorUvPortfolio)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-[#30261f] mb-4">Open Positions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {openPositionsData.map((position) => (
                  <Card key={position.id} className="bg-transparent border-none shadow-none overflow-hidden rounded-xl">
                    <div className="relative h-40 sm:h-48">
                      <Image
                        src={position.imageUrl || "/placeholder.svg?width=400&height=200&query=fund+art"}
                        alt={position.name}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-xl"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent rounded-xl" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="text-md font-semibold text-white">{position.name}</h3>
                        <p
                          className={`text-sm font-medium flex items-center ${position.performance >= 0 ? "text-green-400" : "text-red-400"}`}
                        >
                          {position.performance >= 0 ? (
                            <TrendingUp size={16} className="mr-1" />
                          ) : (
                            <TrendingDown size={16} className="mr-1" />
                          )}
                          {position.performance}%
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#30261f] mb-4">Past Positions</h2>
              <div className="space-y-3">
                {pastPositionsData.map((position) => (
                  <Card key={position.id} className="bg-[#fff9ef] border-[#e9d7c1] shadow-sm rounded-lg">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-[#30261f]">{position.name}</p>
                        <p className="text-xs text-[#7f664a]">
                          {position.status} - {position.exitTime}
                        </p>
                      </div>
                      <p className={`text-sm font-semibold ${position.pnl >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {position.pnl >= 0 ? "+" : ""}${Math.abs(position.pnl).toLocaleString()}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </>
        )}

        {!isConnected! && (
          <>
            <Card className="mb-8 bg-[#fff9ef] border-[#e9d7c1] shadow-sm rounded-xl">
                <CardContent className="p-6">
                  <p className="text-sm text-[#7f664a] mb-1">Total Value in Vault</p>
                  <p className="text-3xl sm:text-4xl font-bold text-[#30261f]">
                    ${totalValueInVaultEmpty.amount.toFixed(2)} 
                  </p>
                </CardContent>
              </Card>

              <Card className="mb-8 bg-[#fff9ef] border-[#e9d7c1] shadow-sm rounded-xl">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="text-lg font-semibold text-[#30261f]">Portfolio Performance</CardTitle>
                    <p className="text-2xl font-bold mt-1 text-[#30261f]">
                      {totalValueInVaultEmpty.changePercent.toFixed(1)}%
                    </p>
                  </div>
                  <div className="flex space-x-1 bg-[#e9d7c1] p-0.5 rounded-md">
                    {["24h", "7d", "30d", "All"].map((period) => (
                      <Button
                        key={period}
                        variant="ghost"
                        size="sm"
                        className={`px-2 py-1 text-xs rounded-sm h-auto
                          ${period === "7d" ? "bg-[#c28446] text-white hover:bg-[#b0703c]" : "text-[#7f664a] hover:bg-[#d9c8b3]"}
                        `}
                      >
                        {period}
                      </Button>
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="h-[250px] sm:h-[300px] p-2 pt-4 flex items-center justify-center">
                  {portfolioPerformanceDataEmpty.length === 0 ? (
                    <p className="text-[#7f664a]">No Data Available</p>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={portfolioPerformanceDataEmpty}>
                      </AreaChart>
                    </ResponsiveContainer>
                  )}
                </CardContent>
              </Card>

              <section className="mb-8">
                <h2 className="text-xl font-bold text-[#30261f] mb-4">Open Positions</h2>
                {openPositionsDataEmpty.length === 0 ? (
                  <Card className="bg-transparent border-none shadow-none overflow-hidden rounded-xl">
                    <div className="relative h-40 sm:h-48 md:h-56 w-full md:w-1/2">
                      {" "}
                      <Image
                        src="/data/desert-tumbleweed.png"
                        alt="No Open Positions"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-xl"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center rounded-xl">
                        <h3 className="text-lg font-semibold text-white">No Open Positions</h3>
                      </div>
                    </div>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  </div>
                )}
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#30261f] mb-4">Past Positions</h2>
                {pastPositionsDataEmpty.length === 0 ? (
                  <Card className="bg-[#fff9ef] border-[#e9d7c1] shadow-sm rounded-lg">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-[#30261f]">No Past Positions</p>
                        <p className="text-xs text-[#7f664a]">--</p>
                      </div>
                      <p className="text-sm font-semibold text-[#30261f]">+$0</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-3"></div>
                )}
              </section>
          </>  
        )}

      </main>
    </div>
  )
}

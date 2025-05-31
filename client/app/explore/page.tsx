"use client"

import Image from "next/image"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useAccount } from "wagmi";
import { useState } from "react"
import { TrendingUp, TrendingDown } from "lucide-react"



const exploreFundsData = {
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
        { label: "+12.8%", type: "performance_dark_bg" },
      ],
      category: "AI Managed",
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
    },
  ],
}

const myFundsTabData = {
    openPositions: [
      {
        id: "op1-myfunds",
        name: "Meme Momentum Fund",
        imageUrl: "/data/crypto-art-mashup.png",
        performance: 1.2,
      },
      {
        id: "op2-myfunds",
        name: "Cross-Chain Arbitrage Fund",
        imageUrl: "/data/glowing-network.png",
        performance: -0.4,
      },
    ],
    pastPositions: [
      {
        id: "pp1-myfunds",
        name: "Cross-Chain Arbitrage Fund",
        status: "Completed",
        exitTime: "exited 2 weeks ago",
        pnl: 500,
        currency: "USD",
      },
      {
        id: "pp2-myfunds",
        name: "Real World Yield Fund",
        status: "Completed",
        exitTime: "exited 6 weeks ago",
        pnl: 40,
        currency: "USD",
      },
    ],
  }

  interface OpenPosition {
    id: string
    name: string
    imageUrl: string
    performance: number
  }
  
  interface PastPosition {
    id: string
    name: string
    status: string
    exitTime: string
    pnl: number
    currency: string
  }  

interface Fund {
  id: string
  name: string
  description: string
  imageUrl: string
  tags: { label: string; type: string }[]
  category: string
}

function FundCard({ fund }: { fund: Fund }) {
  return (
    <Link href={`/explore/${fund.id}`} passHref legacyBehavior>
      <a className="block group">
        <Card className="bg-white border-transparent hover:shadow-xl transition-shadow duration-300 rounded-xl overflow-hidden h-full flex flex-col">
          <div className="relative">
            <Image
              src={fund.imageUrl || "/placeholder.svg?width=400&height=180&query=abstract+fund+art"}
              alt={fund.name}
              width={400}
              height={180}
              className="object-cover w-full h-44 group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute bottom-2 right-2 flex items-center space-x-1.5">
              {fund.tags.map((tag) => (
                <Badge
                  key={tag.label}
                  className={`
                    ${tag.type === "type_light_bg" ? "bg-white text-[#30261F]" : ""}
                    ${tag.type === "performance_dark_bg" ? "bg-black text-white" : ""}
                    text-xs px-2.5 py-1 rounded-full shadow-sm font-medium
                  `}
                >
                  {tag.label}
                </Badge>
              ))}
            </div>
          </div>
          <CardContent className="p-4 flex-grow">
            <h3 className="text-md font-semibold text-[#30261f] mb-1">{fund.name}</h3>
            <p className="text-xs text-[#7f664a] leading-snug">{fund.description}</p>
          </CardContent>
        </Card>
      </a>
    </Link>
  )
}

function FundSection({ title, funds }: { title: string; funds: Fund[] }) {
  if (!funds || funds.length === 0) return null
  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold text-[#30261f] mb-5">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
        {funds.map((fund) => (
          <FundCard key={fund.id} fund={fund} />
        ))}
      </div>
    </section>
  )
}



// Card for "Open Positions" in "My Funds" Tab
function OpenPositionCard({ position }: { position: OpenPosition }) {
    return (
      <Card className="bg-transparent border-none shadow-none overflow-hidden rounded-xl">
        <Link href={`/my-funds/position/${position.id}`} passHref legacyBehavior>
          <a className="block group">
            <div className="relative h-40 sm:h-48">
              <Image
                src={position.imageUrl || "/placeholder.svg?width=400&height=200&query=fund+art"}
                alt={position.name}
                layout="fill"
                objectFit="cover"
                className="rounded-xl group-hover:scale-105 transition-transform duration-300"
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
          </a>
        </Link>
      </Card>
    )
  }
  
  function PastPositionItem({ position }: { position: PastPosition }) {
    return (
      <Card className="bg-[#fff9ef] border-[#e9d7c1] shadow-sm rounded-lg">
        <Link href={`/my-funds/position/${position.id}`} passHref legacyBehavior>
          <a className="block hover:bg-[#f3ebd5]/50 transition-colors">
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
          </a>
        </Link>
      </Card>
    )
  }
export default function ExplorePage() {
  const { isConnected } = useAccount()
  const [tab, setTab] = useState("all-funds");
  
  return (
    <div className="min-h-screen bg-[#f3ebd5]">
      {/* Header */}
      <header className="py-5 px-4 sm:px-6 lg:px-8 border-b border-[#e9d7c1]">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/assets/kairos-orange.png" alt="Kairos logo icon" width={28} height={28} />
            <span className="text-xl font-bold text-[#30261f]">kairos</span>
          </Link>
          <div className="flex items-center space-x-4">
            {!isConnected! && (
            <Link href="/explore" className="text-sm font-medium text-[#30261f]">All Funds</Link>
            )}
            {isConnected! && (
                <div>
                    <Link href="/explore" className="text-sm font-medium text-[#30261f] mx-2">Portofolio</Link>
                    <Link href="/explore" className="text-sm font-medium text-[#30261f] mx-2">Funds</Link>
                </div>
            )}

            <ConnectButton />
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-6">

          {tab === "all-funds" && (
            <div>
              <h1 className="text-3xl font-bold text-[#30261f] mb-1">All Funds</h1>
              <p className="text-md text-[#7f664a]">Explore and invest in a variety of funds.</p>
            </div>
          )}
          {tab === "my-funds" && (
            <div>
              <h1 className="text-3xl font-bold text-[#30261f] mb-1">My Funds</h1>
              <p className="text-md text-[#7f664a]">View your funds and activity.</p>
            </div>
          )}
        </div>

        <Tabs defaultValue="all-funds" className="mb-8">
          <TabsList className="border-b border-[#e9d7c1] rounded-none p-0 bg-transparent mb-6">
            <TabsTrigger
              value="all-funds"
              className="data-[state=active]:border-b-2 data-[state=active]:border-[#f09630] data-[state=active]:text-[#f09630] rounded-none text-[#7f664a] px-4 py-2 text-sm font-medium"
              onClick={() => {
                setTab("all-funds");
              }}
            >
              All
            </TabsTrigger>
            {isConnected! && (
            <TabsTrigger
              value="my-funds"
              className="data-[state=active]:border-b-2 data-[state=active]:border-[#f09630] data-[state=active]:text-[#f09630] rounded-none text-[#7f664a] px-4 py-2 text-sm font-medium"
              onClick={() => {
                setTab("my-funds");
              }}
            >
              My Funds
            </TabsTrigger>
            )}
          </TabsList>
          <TabsContent value="all-funds">
            <FundSection title="Trending Funds" funds={exploreFundsData.trending} />
            <FundSection title="AI Managed Funds" funds={exploreFundsData.aiManaged} />
            <FundSection title="Hybrid Managed Funds" funds={exploreFundsData.hybridManaged} />
            <FundSection title="Human Managed Funds" funds={exploreFundsData.humanManaged} />
          </TabsContent>

          <TabsContent value="my-funds">
            <section className="mb-10">
              <h2 className="text-xl font-bold text-[#30261f] mb-5">Open Positions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {myFundsTabData.openPositions.map((position) => (
                  <OpenPositionCard key={position.id} position={position} />
                ))}
                {myFundsTabData.openPositions.length === 0 && (
                  <p className="text-sm text-gray-500 md:col-span-2">No open positions found in your funds.</p>
                )}
              </div>
            </section>
            <section>
              <h2 className="text-xl font-bold text-[#30261f] mb-5">Past Positions</h2>
              <div className="space-y-3">
                {myFundsTabData.pastPositions.map((position) => (
                  <PastPositionItem key={position.id} position={position} />
                ))}
                {myFundsTabData.pastPositions.length === 0 && (
                  <p className="text-sm text-gray-500">No past positions found in your funds.</p>
                )}
              </div>
            </section>
          </TabsContent>

        </Tabs>
      </main>
    </div>
  )
}

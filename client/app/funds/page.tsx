"use client";
import React from "react";
import { TrendingUp, TrendingDown, Bot, Users, Star, Zap } from "lucide-react";
import Header from "@/components/header";
import { useRouter } from "next/navigation";
import Link from "next/link";

const FundsPage = () => {
  const router = useRouter();

  const fundsData = {
    aiOnChain: [
      {
        id: "ai-1",
        name: "Viral Meme Hunter",
        description:
          "AI tracks social sentiment and trades viral meme tokens with 85% accuracy rate.",
        apy: "+127.3%",
        tvl: "$2.4M",
        risk: "High",
        manager: "Neural Alpha AI",
        performance: "+45.2%",
        investors: 1247,
        image: "/data/c1_meme-fund.jpg", // Add your image path
        available: true,
      },
      {
        id: "ai-2",
        name: "Cross-Chain Arbitrage Pro",
        description:
          "AI captures price differences across chains with millisecond execution.",
        apy: "+89.7%",
        tvl: "$12.8M",
        risk: "Medium",
        manager: "ArbiBot Systems",
        performance: "+23.1%",
        investors: 892,
        image: "/data/c1_arbitrage.jpg",
        available: false,
      },
      {
        id: "ai-3",
        name: "DeFi Blue Chip Optimizer",
        description:
          "AI allocates to established protocols with smart rebalancing.",
        apy: "+34.5%",
        tvl: "$45.2M",
        risk: "Low",
        manager: "Stability AI Fund",
        performance: "+18.7%",
        investors: 2156,
        image: "/data/c1_blue-chip.jpg",
        available: false,
      },
    ],
    aiHybrid: [
      {
        id: "hybrid-1",
        name: "Tokenized Real Estate AI",
        description:
          "AI invests in tokenized real estate and commodities across markets.",
        apy: "+42.1%",
        tvl: "$28.7M",
        risk: "Medium",
        manager: "RWA Intelligence",
        performance: "+31.4%",
        investors: 743,
        image: "/data/c2_RWA.jpg",
        available: false,
      },
      {
        id: "hybrid-2",
        name: "News Event Trader",
        description:
          "AI trades based on verified news and real-time market sentiment.",
        apy: "+76.8%",
        tvl: "$8.9M",
        risk: "High",
        manager: "EventFlow AI",
        performance: "+52.3%",
        investors: 456,
        image: "/data/c2_news.jpg",
        available: false,
      },
      {
        id: "hybrid-3",
        name: "TradFi-Crypto Bridge",
        description:
          "AI exploits price gaps between crypto and traditional finance markets.",
        apy: "+58.2%",
        tvl: "$67.3M",
        risk: "Medium",
        manager: "Bridge Capital AI",
        performance: "+29.8%",
        investors: 1829,
        image: "/data/c2_cross-market.jpg",
        available: false,
      },
    ],
    humanManaged: [
      {
        id: "human-1",
        name: "Professional Manager Fund",
        description:
          "Professional fund manager with 8+ years experience and verified track record.",
        apy: "+156.7%",
        tvl: "$134.5M",
        risk: "High",
        manager: "Marcus Chen",
        performance: "+67.9%",
        investors: 3421,
        image: "/data/c3_professional.jpg",
        available: false,
      },
      {
        id: "human-2",
        name: "Community Strategy Funds",
        description:
          "Top-performing community member shares copyable investment strategies.",
        apy: "+91.4%",
        tvl: "$19.6M",
        risk: "Medium",
        manager: "DegenKing.eth",
        performance: "+38.6%",
        investors: 987,
        image: "/data/c3_community.jpg",
        available: false,
      },
      {
        id: "human-3",
        name: "Institutional Hedge Funds",
        description:
          "Verified hedge fund offers proven institutional trading strategies.",
        apy: "+73.2%",
        tvl: "$289.7M",
        risk: "Low",
        manager: "Quantum Capital",
        performance: "+41.3%",
        investors: 5632,
        image: "/data/c3_institutional.png",
        available: false,
      },
    ],
  };

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
            TOP FUNDS
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
        {/* AI Bot Funds */}
        <section className="mb-16">
          <div className="flex items-center space-x-3 mb-6">
            <Bot className="w-7 h-7 text-[#F3F4F6]" />
            <h2 className="text-3xl font-bold text-white">AI Bot Funds</h2>
          </div>
          <p className="text-white/70 mb-8 text-lg">
            Automated trading strategies powered by artificial intelligence
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fundsData.aiOnChain.map((fund) => (
              <FundCard key={fund.id} fund={fund} router={router} />
            ))}
          </div>
        </section>

        {/* AI Hybrid Funds */}
        <section className="mb-16">
          <div className="flex items-center space-x-3 mb-6">
            <Zap className="w-7 h-7 text-[#F3F4F6]" />
            <h2 className="text-3xl font-bold text-white">AI Hybrid Funds</h2>
          </div>
          <p className="text-white/70 mb-8 text-lg">
            Cross-market AI strategies bridging traditional and crypto assets
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fundsData.aiHybrid.map((fund) => (
              <FundCard key={fund.id} fund={fund} router={router} />
            ))}
          </div>
        </section>

        {/* Human Expert Funds */}
        <section className="mb-16">
          <div className="flex items-center space-x-3 mb-6">
            <Users className="w-7 h-7 text-[#F3F4F6]" />
            <h2 className="text-3xl font-bold text-white">
              Human Expert Funds
            </h2>
          </div>
          <p className="text-white/70 mb-8 text-lg">
            Professional fund managers and verified experts
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fundsData.humanManaged.map((fund) => (
              <FundCard key={fund.id} fund={fund} router={router} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

// Simplified Fund Card Component
const FundCard = ({
  fund,
  router,
}: {
  fund: {
    id: string;
    name: string;
    description: string;
    apy: string;
    tvl: string;
    risk: string;
    manager: string;
    performance: string;
    investors: number;
    image?: string; // Optional image field
    available: boolean;
  };
  router: ReturnType<typeof useRouter>;
}) => {
  const getRiskColor = (risk: "Low" | "Medium" | "High" | string) => {
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

  const handleCardClick = () => {
    if (fund.available) {
      router.push(`/funds/${fund.id}`);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className={`bg-black/20 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden transition-all duration-300 group ${
        fund.available 
          ? "hover:bg-black/30 hover:border-white/30 cursor-pointer hover:scale-105" 
          : "opacity-60 cursor-not-allowed"
      }`}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={fund.image}
          alt={fund.name}
          className={`w-full h-full object-cover transition-transform duration-300 ${
            fund.available ? "group-hover:scale-110" : "filter grayscale"
          }`}
        />
        
        {/* Overlay for unavailable funds */}
        {!fund.available && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white font-bold text-lg border border-white/30">
              Coming Soon
            </span>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          {/* AI Badge for first two categories */}
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
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Header */}
        <div className="mb-3">
          <h3 className={`text-xl font-bold transition-colors mb-1 ${
            fund.available 
              ? "text-white group-hover:text-[#F3F4F6]" 
              : "text-white/60"
          }`}>
            {fund.name}
          </h3>
          <div className="flex items-center space-x-2 text-sm text-white/60">
            <span>{fund.manager}</span>
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          </div>
        </div>

        {/* Description */}
        <p className={`text-sm mb-4 line-clamp-2 ${
          fund.available ? "text-white/70" : "text-white/50"
        }`}>
          {fund.description}
        </p>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-white/60 text-xs mb-1">APY</p>
            <p className={`font-bold text-lg ${
              fund.available ? "text-green-400" : "text-green-400/50"
            }`}>{fund.apy}</p>
          </div>
          <div>
            <p className="text-white/60 text-xs mb-1">TVL</p>
            <p className={`font-bold text-lg ${
              fund.available ? "text-white" : "text-white/50"
            }`}>{fund.tvl}</p>
          </div>
        </div>

        {/* Performance & CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-white/20 mb-4">
          <div className="flex items-center space-x-1 text-white/60 text-sm">
            <Users className="w-4 h-4" />
            <span>{fund.investors.toLocaleString()}</span>
          </div>
          <div
            className={`font-bold flex items-center space-x-1 text-sm ${
              fund.performance.startsWith("+")
                ? fund.available ? "text-green-400" : "text-green-400/50"
                : fund.available ? "text-red-400" : "text-red-400/50"
            }`}
          >
            {fund.performance.startsWith("+") ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span>{fund.performance}</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-2">
          {fund.available ? (
            <>
              <Link
                href={`/funds/${fund.id}`}
                className="flex-1 px-4 py-2 bg-[#F3F4F6] text-[#1B1B3A] font-bold rounded-lg hover:bg-[#F3F4F6]/90 transition-all duration-300 hover:scale-105 text-sm text-center"
              >
                Invest Now
              </Link>
              <Link
                href={`/funds/${fund.id}`}
                className="px-4 py-2 border border-white/30 text-white font-medium rounded-lg hover:bg-white/10 transition-all duration-300 text-sm"
              >
                Details
              </Link>
            </>
          ) : (
            <>
              <button
                disabled
                className="flex-1 px-4 py-2 bg-white/10 text-white/40 font-bold rounded-lg cursor-not-allowed text-sm"
              >
                Unavailable
              </button>
              <button
                disabled
                className="px-4 py-2 border border-white/20 text-white/40 font-medium rounded-lg cursor-not-allowed text-sm"
              >
                Details
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FundsPage;

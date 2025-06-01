"use client";
import React, { useState } from "react";
import {
  // Vault,
  ArrowUp,
  ArrowDown,
  Coins,
  TrendingUp,
  Shield,
} from "lucide-react";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { WithdrawXrpModal } from "@/components/modal/withdraw-xrp-modal"

const VaultPage = () => {
  const vaultBalance = 125; // Dummy data
  const monthlyGain = "+8.4%";
  const totalDeposited = 105;
  const totalGain = vaultBalance - totalDeposited;

  const [isWithdrawXrpModalOpen, setIsWithdrawXrpModalOpen] = useState(false);
  const [amount, setAmount] = useState("");

  const handleWithdrawXrp = (lots: string, address: string) => {
    console.log("Withdraw XRP initiated:", { lots, address })
    // Implement actual withdrawal logic here
  }

  const handleDeposit = () => {
    console.log("Deposit clicked - Amount:", amount);
  };

  const handleWithdraw = () => {
    console.log("Withdraw clicked - Amount:", amount);
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
            YOUR VAULT
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
      <main className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        {/* Vault Balance Card */}
        <div className="bg-black/20 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden mb-8">
          {/* Vault Visual */}
          <div className="relative h-64 overflow-hidden">
            {/* Vault image as full background */}
            <img 
              src="/assets/vault.png" 
              alt="Vault" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/70 to-gray-900/50" />
            
            {/* Content overlay */}
            <div className="relative z-10 h-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-5xl font-bold text-white mb-2">
                  ${vaultBalance.toLocaleString()}
                </div>
                <div className="flex items-center justify-center space-x-2 text-green-400">
                  <TrendingUp className="w-5 h-5" />
                  <span className="text-lg font-semibold">
                    {monthlyGain}
                  </span>
                </div>
              </div>
            </div>

            {/* Security Badge */}
            <div className="absolute top-4 right-4 z-10">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-500/80 text-white backdrop-blur-sm flex items-center gap-1">
                <Shield className="w-3 h-3" />
                Secured
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="p-6">
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-white/60 text-sm mb-1">Total Deposited</p>
                <p className="text-white font-bold text-xl">
                  ${totalDeposited.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-white/60 text-sm mb-1">Total Gain</p>
                <p className="text-green-400 font-bold text-xl">
                  +${totalGain.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mb-4">
              {/* Amount Input */}
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full mb-4 bg-white/10 border border-white/30 text-white placeholder-white/50 px-4 py-3 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-[#F3F4F6]/50 focus:border-[#F3F4F6]"
              />
              
              {/* Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <Button
                  onClick={handleDeposit}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-[#F3F4F6] text-[#1B1B3A] font-bold rounded-lg hover:bg-[#F3F4F6]/90 transition-all duration-300 hover:scale-105"
                >
                  <ArrowDown className="w-4 h-4" />
                  Deposit
                </Button>
                <Button
                  onClick={handleWithdraw}
                  className="flex items-center justify-center gap-2 px-6 py-3 border border-white/30 text-white font-medium rounded-lg hover:bg-white/10 transition-all duration-300 bg-transparent"
                >
                  <ArrowUp className="w-4 h-4" />
                  Withdraw
                </Button>
              </div>
            </div>

            {/* XRP Withdraw Option */}
            <Button
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-orange-500/20 text-orange-400 border border-orange-500/30 font-medium rounded-lg hover:bg-orange-500/30 transition-all duration-300"
              onClick={() => setIsWithdrawXrpModalOpen(true)}
              >
              <Coins className="w-4 h-4" />
              Withdraw in XRP
            </Button>
          </div>

          <WithdrawXrpModal
          open={isWithdrawXrpModalOpen}
          onOpenChange={setIsWithdrawXrpModalOpen}
          onWithdraw={handleWithdrawXrp}
        />          
        </div>
      </main>
    </div>
  );
};

export default VaultPage;

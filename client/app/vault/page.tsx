"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Header from "@/components/header"

export default function VaultPage() {
  const vaultBalance = 12500 // Dummy data

  return (
    <div className="min-h-screen bg-[#f3ebd5] text-[#30261f] flex flex-col">
      <Header />


      <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#30261f] mb-10">Your Vault</h1>

          <Card className="relative w-full aspect-[16/9] max-h-[300px] sm:max-h-[350px] rounded-xl overflow-hidden shadow-xl border-[#e9d7c1] bg-[#d9c8b3] mb-8">
            <Image
              src="/assets/stylized-bank-vault.png"
              alt="Vault graphic"
              layout="fill"
              objectFit="cover"
              className="opacity-80"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <span className="text-5xl sm:text-6xl font-bold text-white [text-shadow:_0_2px_4px_rgb(0_0_0_/_0.5)]">
                ${vaultBalance.toLocaleString()}
              </span>
            </div>
          </Card>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <Button
              size="lg"
              className="bg-[#e7b26e] hover:bg-[#d9a05c] text-[#30261f] font-semibold py-3 text-base rounded-lg shadow-md"
            >
              Withdraw
            </Button>
            <Button
              size="lg"
              className="bg-[#b96b28] hover:bg-[#a05d23] text-white font-semibold py-3 text-base rounded-lg shadow-md"
            >
              Deposit
            </Button>
          </div>

          <Button
            variant="outline"
            size="lg"
            className="w-full bg-[#fff9ef]/70 hover:bg-[#f3ebd5]/90 border-[#c28446] text-[#c28446] hover:text-[#b0703c] font-semibold py-3 text-base rounded-lg shadow-md"
          >
            Withdraw in XRP
          </Button>
        </div>
      </main>
    </div>
  )
}

"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { useState } from "react"
import Header from "@/components/header"

export default function DepositPage() {
  const [amount, setAmount] = useState("")

  const handleDeposit = () => {
    console.log("Depositing amount:", amount)
  }

  return (
    <div className="min-h-screen bg-[#f3ebd5] text-[#30261f] flex flex-col">
      <Header />

      <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-lg text-center">
          <Card className="relative w-full aspect-[16/7] sm:aspect-[16/6] max-h-[200px] sm:max-h-[250px] rounded-xl overflow-hidden shadow-xl border-[#e9d7c1] bg-[#d9c8b3] mb-10">
            <Image
              src="/assets/stylized-bank-vault.png" 
              alt="Vault graphic"
              layout="fill"
              objectFit="cover"
              className="opacity-80"
            />
            <div className="absolute inset-0 flex items-center justify-start p-6 sm:p-8 bg-gradient-to-r from-black/30 via-black/10 to-transparent">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white [text-shadow:_0_2px_4px_rgb(0_0_0_/_0.5)] max-w-xs text-left">
                Add money to your vault
              </h1>
            </div>
          </Card>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleDeposit()
            }}
            className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4"
          >
            <Input
              type="number"
              placeholder="Type the amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="flex-grow bg-[#fff9ef] border-[#e9d7c1] focus:border-[#c28446] focus:ring-[#c28446] placeholder:text-[#b9a389] text-[#30261f] text-base p-3 rounded-lg shadow-sm h-12"
              min="0"
              step="any" 
            />
            <Button
              type="submit"
              size="lg"
              className="bg-[#b96b28] hover:bg-[#a05d23] text-white font-semibold py-3 text-base rounded-lg shadow-md h-12 px-8 w-full sm:w-auto"
            >
              Deposit
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}

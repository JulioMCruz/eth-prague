"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { useState } from "react"
import Header from "@/components/header"

export default function WithdrawPage() {
  const [amount, setAmount] = useState("583") 

  const handleWithdraw = () => {
    console.log("Withdrawing amount:", amount)
  }

  return (
    <div className="min-h-screen bg-[#f2e7db] text-[#171412] flex flex-col">
      <Header />

      <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-lg text-center">
          <Card className="relative w-full aspect-[16/7] sm:aspect-[16/6] max-h-[200px] sm:max-h-[250px] rounded-xl overflow-hidden shadow-xl border-transparent bg-gradient-to-r from-[#f3d6a5] to-[#b96b28] mb-10">
            <div className="absolute inset-0 flex items-center justify-between p-6 sm:p-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white [text-shadow:_0_1px_2px_rgb(0_0_0_/_0.2)] max-w-[50%] text-left leading-tight">
                Withdraw money
              </h1>
              <div className="w-[40%] h-full relative opacity-80">
                <Image
                  src="/assets/stylized-bank-vault.png" 
                  alt="Vault graphic"
                  layout="fill"
                  objectFit="contain"
                  objectPosition="center right"
                />
              </div>
            </div>
          </Card>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleWithdraw()
            }}
            className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4"
          >
            <Input
              type="number"
              placeholder="Type the amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="flex-grow bg-[#fff9ef] border-[#e9d7c1] focus:border-[#b96b28] focus:ring-[#b96b28] placeholder:text-[#b9a389] text-[#171412] text-base p-3 rounded-lg shadow-sm h-12 text-center sm:text-left"
              min="0"
              step="any" 
            />
            <Button
              type="submit"
              size="lg"
              className="bg-[#b96b28] hover:bg-[#a05d23] text-white font-semibold py-3 text-base rounded-lg shadow-md h-12 px-8 w-full sm:w-auto"
            >
              Withdraw
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}

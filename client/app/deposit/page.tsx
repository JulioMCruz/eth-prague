"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { useState } from "react"
import Header from "@/components/header"
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { abi } from "@/lib/abi" 

// Import your contract ABI
const CONTRACT_ADDRESS = "0xb27A31f1b0AF2946B7F582768f03239b1eC07c2c" // Your contract address

export default function DepositPage() {
  const [amount, setAmount] = useState("")
  const { isConnected } = useAccount()

  // Prepare the write contract hook
  const { writeContract, data: hash, isPending, isError, error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const handleDeposit = async () => {
    if (!amount || !isConnected) return

    try {
      // Convert amount to BigInt (assuming 18 decimals)
      const assets = BigInt(Math.floor(Number(amount) * 1e18))
      writeContract({
        abi,
        address: CONTRACT_ADDRESS,
        functionName: "depositAssets", 
        args: [assets],
        chainId: 114,
      })
    } catch (err) {
      console.error("Deposit failed:", err)
    }
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
              disabled={isPending || isConfirming}
            />
            <Button
              type="submit"
              size="lg"
              className="bg-[#b96b28] hover:bg-[#a05d23] text-white font-semibold py-3 text-base rounded-lg shadow-md h-12 px-8 w-full sm:w-auto"
              disabled={isPending || isConfirming}
            >
              {isPending ? "Confirm in Wallet..." : isConfirming ? "Waiting for Confirmation..." : "Deposit"}
            </Button>
          </form>

          {/* Transaction status */}
          {(isPending || isConfirming || isConfirmed || isError) && (
            <div className={`mt-4 p-4 rounded-lg ${
              isError ? 'bg-red-500/20 border border-red-500/40' :
              isConfirmed ? 'bg-green-500/20 border border-green-500/40' :
              'bg-blue-500/20 border border-blue-500/40'
            }`}>
              <p className="text-sm">
                {isPending && "Waiting for wallet confirmation..."}
                {isConfirming && "Transaction is being confirmed..."}
                {isConfirmed && "Deposit confirmed!"}
                {isError && `Error: ${error?.message || "Transaction failed"}`}
              </p>
              {hash && (
                <a
                  href={`https://coston2-explorer.flare.network/tx/${hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  View on Explorer
                </a>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

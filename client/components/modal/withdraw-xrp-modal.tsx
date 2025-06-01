"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogClose, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { abi } from "@/lib/abi-xrp"

import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'

interface WithdrawXrpModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onWithdraw: (lots: string, address: string) => void
}

export function WithdrawXrpModal({ open, onOpenChange, onWithdraw }: WithdrawXrpModalProps) {
  const [lots, setLots] = useState("")
  const [address, setAddress] = useState("")
  const [xrpPriceInfo, setXrpPriceInfo] = useState({ lotSizeFXRP: 10, lotValueUSD: 20 }) // Dummy initial data

  // Move useReadContract to component level
  const { refetch } = useReadContract({
    abi,
    address: '0x076f26d6d8A0fBf4C900D312c4709b3032655686',
    functionName: 'getAllPriceInfo',
    chainId: 114,
    query: {
      enabled: false, // Disable automatic fetching
    }
  })

  // Write contract hook for swapAndRedeem
  const { writeContract, data: hash, isPending, isError, error } = useWriteContract()

  // Wait for transaction receipt
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  const handleGetPrice = async () => {
    console.log("Fetching XRP price info...")
    
    try {
      const result = await refetch()
      console.log("Price info result:", result)
      
      if (result.data) {
        // getAllPriceInfo returns: [lotSizeAMG, assetDecimals, lotSizeFXRP, xrpUsdPrice, lotValueUSD, timestamp]
        const priceData = result.data as readonly [bigint, bigint, bigint, bigint, bigint, bigint]
        setXrpPriceInfo({
          lotSizeFXRP: Number(priceData[2]), // lotSizeFXRP is at index 2
          lotValueUSD: Number(priceData[4])  // lotValueUSD is at index 4
        })
      }
    } catch (error) {
      console.error("Error fetching price info:", error)
    }
  }

  const handleSubmit = async () => {
    if (!lots || !address) return

    try {
      // Convert lots to uint256 (assuming lots is a whole number)
      const lotsAmount = BigInt(lots)
      
      console.log("Calling redeem with:", { lots: lotsAmount, address })
      
      writeContract({
        abi,
        address: '0x076f26d6d8A0fBf4C900D312c4709b3032655686',
        functionName: 'swapAndRedeem',
        args: [lotsAmount, address],
        chainId: 114,
      })

      // Keep the modal open to show transaction status
      // onWithdraw callback can be used for any additional logic
      onWithdraw(lots, address)
    } catch (err) {
      console.error("Error submitting transaction:", err)
    }
  }

  // Close modal when transaction is confirmed
  if (isConfirmed) {
    setTimeout(() => {
      onOpenChange(false)
    }, 2000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="p-0 overflow-hidden border-0 bg-transparent sm:max-w-2xl"
        style={{ backgroundColor: "transparent" }}
      >
        {/* Visually hidden title for accessibility */}
        <DialogTitle className="sr-only">Withdraw XRP</DialogTitle>
        <div 
          className="relative"
          style={{ backgroundColor: "#1B1B3A" }}
        >
          {/* Header with large title */}
          <div 
            className="px-8 py-12 text-center border-b-4"
            style={{ 
              backgroundColor: "#F3F4F6",
              borderBottomColor: "#1B1B3A"
            }}
          >
            <h1 
              className="text-5xl md:text-6xl font-black tracking-tight leading-none font-clash-grotesk"
              style={{ color: "#1B1B3A" }}
            >
              WITHDRAW XRP
            </h1>
          </div>

          {/* Content */}
          <div className="p-8 space-y-6">
            {/* Price Information */}
            <div className="bg-black/20 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <p className="text-white/60 text-sm font-medium">XRP Price Information:</p>
                  <div className="space-y-1">
                    <p className="text-white">
                      Lot Size (FXRP): <span className="font-bold text-xl">{xrpPriceInfo.lotSizeFXRP}</span>
                    </p>
                    <p className="text-white">
                      Lot Value (USD): <span className="font-bold text-xl">${xrpPriceInfo.lotValueUSD}</span>
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleGetPrice}
                  className="border-white/30 text-white bg-transparent hover:bg-white/10 hover:text-white hover:border-white/50"
                >
                  Get Price
                </Button>
              </div>
            </div>

            {/* Transaction Status */}
            {(isPending || isConfirming || isConfirmed || isError) && (
              <div className={`p-4 rounded-lg ${
                isError ? 'bg-red-500/20 border border-red-500/40' : 
                isConfirmed ? 'bg-green-500/20 border border-green-500/40' :
                'bg-blue-500/20 border border-blue-500/40'
              }`}>
                <p className="text-white text-sm">
                  {isPending && "Waiting for wallet confirmation..."}
                  {isConfirming && "Transaction is being confirmed..."}
                  {isConfirmed && "Transaction confirmed successfully!"}
                  {isError && `Error: ${error?.message || "Transaction failed"}`}
                </p>
              </div>
            )}

            {/* Lots Input */}
            <div className="space-y-3">
              <Label htmlFor="lots" className="text-white/80 text-base">
                Lots
              </Label>
              <Input
                id="lots"
                type="number"
                value={lots}
                onChange={(e) => setLots(e.target.value)}
                placeholder="0"
                className="bg-black/20 backdrop-blur-sm border-white/20 focus:border-white/40 text-white placeholder:text-white/40 h-12 text-lg"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
                disabled={isPending || isConfirming}
              />
            </div>

            {/* XRP Address Input */}
            <div className="space-y-3">
              <Label htmlFor="address" className="text-white/80 text-base">
                XRP Address
              </Label>
              <Input
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter XRP withdrawal address"
                className="bg-black/20 backdrop-blur-sm border border-white/20 focus:border-white/40 text-white placeholder:text-white/40 h-12 text-lg"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
                disabled={isPending || isConfirming}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 h-14 text-lg font-bold border-2 border-white/30 text-white bg-transparent hover:bg-white/10 hover:border-white/50 transition-all duration-300"
                  disabled={isPending || isConfirming}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="button"
                onClick={handleSubmit}
                className="flex-1 h-14 text-lg font-bold text-[#1B1B3A] transition-all duration-300 hover:scale-105 hover:opacity-90"
                style={{ 
                  backgroundColor: "#F3F4F6"
                }}
                disabled={!lots || !address || isPending || isConfirming}
              >
                {isPending ? "Confirming..." : isConfirming ? "Processing..." : "Withdraw XRP"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

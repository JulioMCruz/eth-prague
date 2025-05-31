"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogClose, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// import { useReadContract } from 'wagmi'
// import { abi } from '@/lib/abi'

interface WithdrawXrpModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onWithdraw: (lots: string, address: string) => void
}

export function WithdrawXrpModal({ open, onOpenChange, onWithdraw }: WithdrawXrpModalProps) {
  const [lots, setLots] = useState("")
  const [address, setAddress] = useState("")
  const [xrpPriceInfo] = useState({ lotSizeFXRP: 10, lotValueUSD: 20 }) // Dummy initial data

  const handleGetPrice = async () => {
    // Placeholder: Fetch actual price info
    console.log("Fetching XRP price info...")
    // Simulate fetching new data
    // await new Promise((resolve) => setTimeout(resolve, 500))
    // setXrpPriceInfo({ lotSizeFXRP: 12, lotValueUSD: 24 }) // Example update

    // const result = useReadContract({
    //     abi,
    //     address: '0x9f0D97229687439CC70a46890b981510CBad1253',
    //     functionName: 'getAllPriceInfo',
    //   })

    //   console.log(result);
  }

  const handleSubmit = () => {
    onWithdraw(lots, address)
    onOpenChange(false) // Close modal on submit
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
                      Lot Size (FXRP): <span className="font-bold text-xl">{xrpPriceInfo.lotSizeFXRP}</span>
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
                className="bg-black/20 backdrop-blur-sm border-white/20 focus:border-white/40 text-white placeholder:text-white/40 h-12 text-lg"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 h-14 text-lg font-bold border-2 border-white/30 text-white bg-transparent hover:bg-white/10 hover:border-white/50 transition-all duration-300"
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
                disabled={!lots || !address}
              >
                Withdraw XRP
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

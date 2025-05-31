"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface WithdrawXrpModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onWithdraw: (lots: string, address: string) => void
}

export function WithdrawXrpModal({ open, onOpenChange, onWithdraw }: WithdrawXrpModalProps) {
  const [lots, setLots] = useState("")
  const [address, setAddress] = useState("")
  const [xrpPriceInfo, setXrpPriceInfo] = useState({ lotSizeFXRP: 10, lotValueUSD: 20 }) // Dummy initial data

  const handleGetPrice = async () => {
    // Placeholder: Fetch actual price info
    console.log("Fetching XRP price info...")
    // Simulate fetching new data
    await new Promise((resolve) => setTimeout(resolve, 500))
    setXrpPriceInfo({ lotSizeFXRP: 12, lotValueUSD: 24 }) // Example update
  }

  const handleSubmit = () => {
    onWithdraw(lots, address)
    onOpenChange(false) // Close modal on submit
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#151f2f] border-dark-secondary-text/30 text-dark-primary-text p-6 sm:max-w-md">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl font-semibold text-dark-primary-text">Withdraw XRP</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center">
            <div className="text-sm">
              <p className="text-dark-secondary-text">XRP Price Information:</p>
              <p>
                Lot Size (FXRP): <span className="font-medium">{xrpPriceInfo.lotSizeFXRP}</span>
              </p>
              <p>
                Lot Value (USD): <span className="font-medium">${xrpPriceInfo.lotValueUSD}</span>
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleGetPrice}
              className="border-dark-secondary-text/50 text-dark-secondary-text hover:bg-dark-secondary-text/20 hover:text-dark-primary-text"
            >
              Get Price
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="lots" className="text-dark-secondary-text">
              Lots
            </Label>
            <Input
              id="lots"
              type="number"
              value={lots}
              onChange={(e) => setLots(e.target.value)}
              placeholder="Enter number of lots"
              className="bg-dark-bg border-dark-secondary-text/50 focus:border-dark-accent-purple text-dark-primary-text"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address" className="text-dark-secondary-text">
              XRP Address
            </Label>
            <Input
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter XRP withdrawal address"
              className="bg-dark-bg border-dark-secondary-text/50 focus:border-dark-accent-purple text-dark-primary-text"
            />
          </div>
        </div>

        <DialogFooter className="gap-2 sm:justify-end">
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              className="border-dark-secondary-text/50 text-dark-secondary-text hover:bg-dark-secondary-text/20 hover:text-dark-primary-text"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="button"
            onClick={handleSubmit}
            className="bg-dark-accent-purple text-dark-primary-text hover:bg-purple-500"
            disabled={!lots || !address}
          >
            Withdraw XRP
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

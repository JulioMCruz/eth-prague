"use client"

import Image from "next/image"
import Link from "next/link"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useAccount } from "wagmi"
import { usePathname } from "next/navigation"
import { Button } from "./ui/button"

function Header() {
    const { isConnected } = useAccount()
    const pathname = usePathname()
    
    return (
        <header className="py-5 px-4 sm:px-6 lg:px-8 border-b border-[#e9d7c1]">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/assets/kairos-orange.png" alt="Kairos logo icon" width={28} height={28} />
            <span className="text-xl font-bold text-[#30261f]">kairos</span>
          </Link>
          <div className="flex items-center space-x-4">
            {!isConnected && (
            <Link href="/funds" className="text-sm font-medium text-[#30261f]">All Funds</Link>
            )}
            {isConnected && (
                <>
 {[
              { name: "Portfolio", href: "/portfolio" },
              { name: "Funds", href: "/funds" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-xs sm:text-sm font-medium hover:text-[#f09630] transition-colors ${
                  pathname === item.href
                    ? "text-[#f09630]"
                    : "text-[#7f664a]"
                }`}
              >
                {item.name}
              </Link>
            ))}
                    <Button className="bg-[#c28446] text-white hover:bg-[#b0703c] rounded-lg text-xs px-3 py-1.5 sm:text-sm sm:px-4 sm:py-2 mx-2">
                        Add Funds to Vault
                    </Button>
                </>
            )}

            <ConnectButton />
          </div>
        </div>
      </header>
    )
}

export default Header;
"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()
  return (
    <div className="relative min-h-screen bg-[#171714] text-white flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden">
      <header className="absolute top-0 left-1/2 -translate-x-1/2 z-20 py-6 md:py-8">
        <Link href="/" className="flex items-center">
          <Image
            src="/assets/kairos.png"
            alt="Kairos logo icon"
            width={36}
            height={36}
            className="filter invert brightness-0" 
          />
          <span className="ml-2 text-3xl font-bold text-white">kairos</span>
        </Link>
      </header>

      {/* <div className="absolute inset-0 opacity-40 md:opacity-50 pointer-events-none z-0">
        <Image
          src="/hero-background-element.jpg" 
          alt="Abstract background element"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="transform scale-150 md:scale-125 -translate-x-1/3 md:-translate-x-1/4 lg:-translate-x-1/3"
        />
      </div> */}

      <main className="relative z-10 flex flex-col items-center justify-center text-center flex-grow space-y-8 pt-20 pb-20 md:pt-24">
        {" "}
        <div className="max-w-2xl lg:max-w-3xl space-y-6">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
            <span className="text-[#fb9623]">One</span> token. <span className="text-[#fb9623]">Any</span> chain.
            <br />
            Automated capital.
          </h1>
          <p className="text-lg md:text-xl text-gray-300">
            Cross-chain investing made simple. DeFi, without the chaos.
          </p>
        </div>
      </main>

      <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 z-20">
        <Button
          size="lg"
          className="bg-[#fb9623] hover:bg-orange-500 text-black font-semibold px-8 py-3 text-lg rounded-xl"
          onClick={() => {
            console.log("Launch dApp clicked")
            router.push('/explore');
          }}
        >
          Launch dApp
        </Button>
      </div>
    </div>
  )}

import React from "react";
import Spline from "@splinetool/react-spline/next";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* Spline 3D Background */}
      <div className="absolute inset-0 w-full h-full">
        <Spline
          scene="https://prod.spline.design/JzBmC4cOUyDCPHkA/scene.splinecode"
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </div>

      {/* Oval Header */}
      <header className="w-[90vw] mx-auto relative z-20 flex justify-center pt-8">
        <div className="backdrop-blur-xl bg-black/30 border border-white/20 rounded-full px-12 py-4 flex items-center justify-between w-full shadow-2xl">
          <div className="flex items-center">
            <Image
              src="/assets/kairos.png"
              alt="Kairos logo icon"
              width={32}
              height={32}
              className="filter invert brightness-0"
            />
            <span className="ml-3 text-xl font-bold text-white tracking-wide font-mono">
              Kairos
            </span>
          </div>

          <Link
            href="/funds"
            className="px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-purple-500/50 text-sm"
          >
            Launch dApp
          </Link>
        </div>
      </header>

      {/* Hero Content - Just Title Centered */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-center">
        <h1 className="text-7xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white leading-[0.85] tracking-tight font-clash-grotesk mb-1">
          One Chain &amp; Rule Them All
        </h1>
        <p className="text-sm text-white/70 font-medium max-w-2xl mx-auto">
          Stop wrestling with fragmented DeFi. Unite everything under one
          intelligent platform.
        </p>
      </div>

      {/* Bottom Full Width Section - Three Columns */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-black/20 backdrop-blur-sm border-t border-white/10">
        <div className="flex justify-between items-start px-16 py-4 max-w-full">
          <div className="flex-1 max-w-sm">
            <h3 className="text-xs font-bold text-white mb-1">
              Stop the DeFi Chaos
            </h3>
            <p className="text-xs text-white/90 leading-tight">
              No more jumping between 120+ chains, tracking 1000+ protocols, or
              missing opportunities while you sleep.
            </p>
          </div>

          <div className="flex-1 max-w-sm mx-16">
            <h3 className="text-xs font-bold text-white mb-1">
              AI-Powered Unification
            </h3>
            <p className="text-xs text-white/60 leading-tight">
              Our intelligent platform automatically finds the best yields
              across all chains and manages your entire DeFi portfolio.
            </p>
          </div>

          <div className="flex-1 max-w-sm">
            <h3 className="text-xs font-bold text-white mb-1">
              Zero-Friction Experience
            </h3>
            <p className="text-xs text-white/95 leading-tight">
              Seamless cross-chain operations, minimal gas costs, and automated
              yield optimization. DeFi made simple.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

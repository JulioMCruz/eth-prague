"use client";

import Image from "next/image";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

function Header() {
  const { isConnected } = useAccount();
  const pathname = usePathname();

  return (
    <header className="w-[90vw] mx-auto sticky top-0 z-20 flex justify-center pt-8">
      <div className="backdrop-blur-xl bg-black/10 border border-white/20 rounded-full px-12 py-4 flex items-center justify-between w-full shadow-2xl">
        <div className="flex items-center justify-between w-full">
          <Link href={"/funds"} className="flex items-center space-x-3">
            <Image
              src="/assets/kairos.png"
              alt="Kairos logo icon"
              width={32}
              height={32}
              className="filter invert brightness-0"
            />

            <span className="text-xl font-bold text-white tracking-wide font-mono">
              Kairos
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            {!isConnected && (
              <Link
                href="/funds"
                className="text-white/90 hover:text-white transition-colors font-medium"
              >
                Funds
              </Link>
            )}

            {isConnected && (
              <>
                <Link
                  href="/dashboard"
                  className={`transition-colors font-medium ${
                    pathname === "/dashboard"
                      ? "text-white/90"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  Portfolio
                </Link>
                <Link
                  href="/funds"
                  className={`transition-colors font-medium ${
                    pathname === "/funds"
                      ? "text-white/90"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  Funds
                </Link>
                {/* <Link
                  href="/analytics"
                  className={`transition-colors font-medium ${
                    pathname === "/analytics"
                      ? "text-white/90"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  Analytics
                </Link>
                <Link
                  href="/rewards"
                  className={`transition-colors font-medium ${
                    pathname === "/rewards"
                      ? "text-white/90"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  Rewards
                </Link> */}
              </>
            )}
          </nav>
          <div className="flex items-center space-x-4">
            {isConnected && (
              <Link href="/vault">
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium px-4 py-2 rounded-full text-sm transition-all duration-300 hover:scale-105">
                  Add Funds to Vault
                </Button>
              </Link>
            )}

            <ConnectButton.Custom>
              {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                authenticationStatus,
                mounted,
              }) => {
                const ready = mounted && authenticationStatus !== "loading";
                const connected =
                  ready &&
                  account &&
                  chain &&
                  (!authenticationStatus ||
                    authenticationStatus === "authenticated");

                return (
                  <div
                    {...(!ready && {
                      "aria-hidden": true,
                      style: {
                        opacity: 0,
                        pointerEvents: "none",
                        userSelect: "none",
                      },
                    })}
                  >
                    {(() => {
                      if (!connected) {
                        return (
                          <button
                            onClick={openConnectModal}
                            type="button"
                            className="px-4 py-2 border rounded-full text-white text-sm font-medium hover:bg-white/10 transition-all duration-300"
                            style={{
                              background: "rgba(147, 51, 234, 0.2)",
                              borderColor: "rgba(147, 51, 234, 0.5)",
                            }}
                          >
                            Connect Wallet
                          </button>
                        );
                      }

                      if (chain.unsupported) {
                        return (
                          <button
                            onClick={openChainModal}
                            type="button"
                            className="px-4 py-2 border rounded-full text-red-400 text-sm font-medium"
                            style={{
                              background: "rgba(239, 68, 68, 0.2)",
                              borderColor: "rgba(239, 68, 68, 0.5)",
                            }}
                          >
                            Wrong network
                          </button>
                        );
                      }

                      return (
                      <div style={{ display: 'flex', gap: 12 }}>
                        <div
                          className="px-4 py-2 border rounded-full text-white text-sm font-medium cursor-pointer hover:bg-white/10 transition-all duration-300"
                          style={{
                            background: "rgba(147, 51, 234, 0.2)",
                            borderColor: "rgba(147, 51, 234, 0.5)",
                          }}
                          onClick={openChainModal}
                        >
                          {chain.hasIcon && (
                            <div
                              style={{
                                background: chain.iconBackground,
                                width: 12,
                                height: 12,
                                borderRadius: 999,
                                overflow: 'hidden',
                                marginRight: 4,
                              }}
                            >
                              {chain.iconUrl && (
                                <img
                                  alt={chain.name ?? 'Chain icon'}
                                  src={chain.iconUrl}
                                  style={{ width: 12, height: 12 }}
                                />
                              )}
                            </div>
                          )}
                          {chain.name}
                        </div>
                        <div
                          className="px-4 py-2 border rounded-full text-white text-sm font-medium cursor-pointer hover:bg-white/10 transition-all duration-300"
                          style={{
                            background: "rgba(147, 51, 234, 0.2)",
                            borderColor: "rgba(147, 51, 234, 0.5)",
                          }}
                          onClick={openAccountModal}
                        >
                          {account.displayName}
                        </div>
                      </div>
                      );
                    })()}
                  </div>
                );
              }}
            </ConnectButton.Custom>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

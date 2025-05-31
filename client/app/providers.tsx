"use client";

import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { darkTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { config } from "@/lib/wagmi";

export default function Web3Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const client = new QueryClient();
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <RainbowKitProvider
          modalSize="compact"
          theme={darkTheme({
            accentColor: "#8431ff",
            accentColorForeground: "white",
            borderRadius: "large",
            fontStack: "system",
            overlayBlur: "small",
          })}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

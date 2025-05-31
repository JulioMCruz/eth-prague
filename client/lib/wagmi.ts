
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  flare,
} from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'ETH Global Prague 2025',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || '',
  chains: [
    flare,
  ],
  ssr: true,
});


import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  flare,
  flareTestnet,
} from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'ETH Global Prague 2025',
  projectId: 'YOUR_PROJECT_ID',
  chains: [
    flare,
    flareTestnet,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [flareTestnet] : []),
  ],
  ssr: true,
});

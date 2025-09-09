import "@/styles/globals.css";
import { WagmiConfig, createConfig } from "wagmi";
import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
import { sepolia } from "wagmi/chains";
import { http } from "viem";
import { giwaSepolia } from "@/lib/bridgeConfig";

// WalletConnect project ID dari env
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

const { connectors } = getDefaultWallets({
  appName: "GIWA Bridge",
  projectId,
  chains: [sepolia, giwaSepolia],
});

const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient: http(), // <— ganti publicProvider() jadi http() dari viem
});

export default function App({ Component, pageProps }) {
  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider chains={[sepolia, giwaSepolia]}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

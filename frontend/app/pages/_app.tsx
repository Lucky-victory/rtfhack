import { configureChains, WagmiConfig, createConfig } from "wagmi";
//import { mainnet, bscTestnet } from "wagmi/chains";
//import { BNBTestnet } from '@wagmi/core/chains'
import "@rainbow-me/rainbowkit/styles.css";
import { fonts } from "@/fonts";
import { AppChakraProvider } from "@/providers/chakra";
import { HuddleClient, HuddleProvider } from "@huddle01/react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "swiper/css";
import { SessionProvider } from "next-auth/react";
import AppProviders from "@/providers";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { pego } from "@/utils/constants";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
const huddleClient = new HuddleClient({
  projectId: process.env.NEXT_PUBLIC_HUDDLE_PROJECT_ID!,
  options: {
    // `activeSpeakers` will be most active `n` number of peers, by default it's 8
    activeSpeakers: {
      size: 8,
    },
  },
});

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string;

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [pego],
  [
    jsonRpcProvider({
      rpc: (chain) => ({
        http: `https://pegorpc.com`,
      }),
    }),
    //publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: "GreenspaceDAO",
  projectId: projectId,
  chains,
});

// const config = createConfig({
//   connectors: [new InjectedConnector({ chains })],
//   publicClient,
//   webSocketPublicClient,
// });

const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  // const network = WalletAdapterNetwork.Devnet;
  // const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  // const wallets = useMemo(
  //   () => [new PhantomWalletAdapter(), new SolflareWalletAdapter({ network })],
  //   [network]
  // );
  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-poppins: ${fonts.poppins.style.fontFamily};
          }
        `}
      </style>{" "}
      {/*  TODO: Add the appropriate types */}
      {/* @ts-ignore */}
      <WagmiConfig config={config}>
        <SessionProvider session={pageProps.session}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider chains={chains}>
              <AppProviders>
                {/* <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider> */}
                <HuddleProvider client={huddleClient}>
                  <AppChakraProvider>
                    <Component {...pageProps} />
                  </AppChakraProvider>
                </HuddleProvider>
                {/* </WalletModalProvider>
            </WalletProvider>
          </ConnectionProvider> */}
              </AppProviders>
            </RainbowKitProvider>
          </QueryClientProvider>
        </SessionProvider>
      </WagmiConfig>
    </>
  );
}
// const session = await auth();
// if (session?.user) {
//   // filter out sensitive data before passing to client.
//   session.user = {
//     name: session.user.name,
//     email: session.user.email,
//     image: session.user.image,
//   };
// }

// return (
//   <SessionProvider session={session}>
//     <ClientExample />
//   </SessionProvider>
// );

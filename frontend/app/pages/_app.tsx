import { fonts } from "@/fonts";
import { AppChakraProvider } from "@/providers/chakra";
import { PrivyProvider } from "@privy-io/react-auth";
import { HuddleClient, HuddleProvider } from "@huddle01/react";
import "@/styles/globals.css";
import {
  DynamicContextProvider,
  DynamicWidget,
} from "@dynamic-labs/sdk-react-core";
import type { AppProps } from "next/app";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { SolanaWalletConnectors } from "@dynamic-labs/solana";
import { Provider } from "react-redux";
import store from "@/state/store";

const huddleClient = new HuddleClient({
  projectId: process.env.NEXT_PUBLIC_HUDDLE_PROJECT_ID!,
  options: {
    // `activeSpeakers` will be most active `n` number of peers, by default it's 8
    activeSpeakers: {
      size: 8,
    },
  },
});
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-poppins: ${fonts.poppins.style.fontFamily};
          }
        `}
      </style>{" "}
      <PrivyProvider
        appId="clu26bnos0pnpfk84x65mc71z"
        config={{
          // Customize Privy's appearance in your app
          appearance: {
            showWalletLoginFirst: true,
            theme: "light",
            accentColor: "#008080",
          },
          // Create embedded wallets for users who don't have a wallet
          embeddedWallets: {
            createOnLogin: "users-without-wallets",
          },
        }}
      >
        <Provider store={store}>
          <HuddleProvider client={huddleClient}>
            <AppChakraProvider>
              <Component {...pageProps} />
            </AppChakraProvider>
          </HuddleProvider>
        </Provider>
      </PrivyProvider>
    </>
  );
}

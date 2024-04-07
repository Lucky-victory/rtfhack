import { fonts } from "@/fonts";
import { AppChakraProvider } from "@/providers/chakra";
import { PrivyProvider } from "@privy-io/react-auth";
import { HuddleClient, HuddleProvider } from "@huddle01/react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "@/state/store";
import { auth } from "@/auth";
import ProviderWrapper from "@/providers/dynamic";
import { SessionProvider } from "next-auth/react";

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
      <ProviderWrapper>
        {/* <SessionProvider session={pageProps?.session}> */}
        <Provider store={store}>
          <HuddleProvider client={huddleClient}>
            <AppChakraProvider>
              <Component {...pageProps} />
            </AppChakraProvider>
          </HuddleProvider>
        </Provider>
        {/* </SessionProvider> */}
      </ProviderWrapper>
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

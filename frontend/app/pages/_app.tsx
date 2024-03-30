import { fonts } from "@/fonts";
import { AppChakraProvider } from "@/providers/chakra";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-poppins: ${fonts.poppins.style.fontFamily};
          }
        `}
      </style>
      <AppChakraProvider>
        <Component {...pageProps} />;
      </AppChakraProvider>
    </>
  );
}

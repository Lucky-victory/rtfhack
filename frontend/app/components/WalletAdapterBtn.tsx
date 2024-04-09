import {
  CSSProperties,
  MouseEvent,
  PropsWithChildren,
  ReactElement,
  useEffect,
  useState,
} from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import * as w from "@solana/wallet-adapter-react-ui";

import "@solana/wallet-adapter-react-ui/styles.css";
import base58 from "bs58";
import { apiPost } from "@/utils";
import { signIn } from "next-auth/react";

type ButtonProps = PropsWithChildren<{
  className?: string;
  disabled?: boolean;
  endIcon?: ReactElement;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  startIcon?: ReactElement;
  style?: CSSProperties;
  tabIndex?: number;
}>;
export default function WalletAdaptor(props: ButtonProps) {
  // const { publicKey, signMessage } = useWallet();
  // const [signed, setSigned] = useState(false);

  // const signCustomMessage = async () => {
  //   const address = publicKey?.toBase58();
  //   const chain = "solana";
  //   const account = {
  //     address: address,
  //     chain: chain,
  //     network: "devnet",
  //   };
  //   // const message = "Sign to provide access to app";
  //   const { message } = await apiPost("api/auth/request-message", account);
  //   const encodedMessage = new TextEncoder().encode(message);
  //   const signedMessage = (await signMessage?.(encodedMessage)) as Uint8Array;
  //   setSigned(true);
  //   const signature = base58.encode(signedMessage);
  //   try {
  //     await signIn("credentials", {
  //       message,
  //       signature,
  //       redirect: false,
  //     });
  //   } catch (e) {
  //     console.log(e);
  //     return;
  //   }
  // };

  // useEffect(() => {
  //   publicKey ? !signed && signCustomMessage() : setSigned(false);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [publicKey]);

  return (
    <>
      <w.WalletMultiButton {...props} />
    </>
  );
}

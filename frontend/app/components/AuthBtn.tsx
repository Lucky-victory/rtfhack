import { WalletDisconnectButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import LogoutBtn from "./LogoutBtn";
import { Box } from "@chakra-ui/react";
import { useEffect, useTransition } from "react";
import { getSession, GetSessionParams, signOut } from "next-auth/react";
import { USER_SESSION } from "@/state/types";
import "@solana/wallet-adapter-react-ui/styles.css";
import { useRouter } from "next/router";

export default function Home({ userSession }: { userSession: USER_SESSION }) {
  const { publicKey, disconnecting } = useWallet();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  useEffect(() => {
    startTransition(() => {
      publicKey && console.log(publicKey.toBase58());
    });
  }, [publicKey]);

  useEffect(() => {
    startTransition(() => {
      if (disconnecting) {
        signOut({ redirect: false });
        router.push("/");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disconnecting]);

  useEffect(() => {
    startTransition(() => {
      console.log({ disconnecting });
    });
  }, [disconnecting]);

  if (userSession) {
    return (
      <Box>
        {!isPending && (
          <div>
            <>{publicKey ? <WalletDisconnectButton /> : <></>}</>
          </div>
        )}
      </Box>
    );
  }
}

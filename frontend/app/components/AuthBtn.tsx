import WalletDisconnectButton from "./WalletAdapterBtn";
import { useWallet } from "@solana/wallet-adapter-react";
import LogoutBtn from "./LogoutBtn";
import { Box } from "@chakra-ui/react";
import { useEffect, useTransition } from "react";
import { getSession, GetSessionParams, signOut } from "next-auth/react";
import { USER_SESSION } from "@/state/types";
// import "@solana/wallet-adapter-react-ui/styles.css";
import { useRouter } from "next/router";
import { useAccount, useConnect, useDisconnect } from "wagmi";

export default function AuthBtn({
  userSession,
}: {
  userSession: USER_SESSION;
}) {
  // const { publicKey, disconnecting } = useWallet();
  const { isLoading} = useDisconnect();

  const { isConnected, isConnecting, isReconnecting, address, } = useAccount();
  
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  useEffect(() => {
    startTransition(() => {
      //publicKey && console.log(publicKey.toBase58());
      address && console.log(address);
    });
  }, [address]);

  useEffect(() => {
    startTransition(() => {
      if (isLoading) {
        signOut({ redirect: false });
        router.push("/");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  useEffect(() => {
    startTransition(() => {
      console.log({ isLoading });
    });
  }, [isLoading]);

  if (userSession) {
    return (
      <Box>
        {!isPending && (
          <div>
            <>{address ? <WalletDisconnectButton /> : <></>}</>
          </div>
        )}
      </Box>
    );
  }
}

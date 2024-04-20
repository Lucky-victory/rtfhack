import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import { USER_SESSION } from "@/state/types";
import base58 from "bs58";
import { useWallet } from "@solana/wallet-adapter-react";
import { apiPost } from "@/utils";
type UpdateSession = (data?: any) => Promise<USER_SESSION | null>;

export const useWalletAccount = () => {
  const [_address, setAddress] = useState<string | null>(null);

  const { publicKey } = useWallet();
  const address = publicKey?.toBase58();
  useEffect(() => {
    if (address) {
      setAddress(address);
    } else {
      setAddress(null);
    }
  }, [address]);

  return { address: _address };
};
export function useCustomSign() {
  const { publicKey, signMessage } = useWallet();
  const [signed, setSigned] = useState(false);

  const signCustomMessage = async () => {
    const address = publicKey?.toBase58();
    const chain = "solana";
    const account = {
      address: address,
      chain: chain,
      network: "devnet",
    };
    // const message = "Sign to provide access to app";
    const { message } = await apiPost("api/auth/request-message", account);
    const encodedMessage = new TextEncoder().encode(message);
    const signedMessage = (await signMessage?.(encodedMessage)) as Uint8Array;
    setSigned(true);
    const signature = base58.encode(signedMessage);
    try {
      await signIn("credentials", {
        message,
        signature,
        redirect: false,
      });
    } catch (e) {
      console.log(e);
      return;
    }
  };

  // useEffect(() => {
  //   publicKey ? !signed && signCustomMessage() : setSigned(false);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [publicKey]);
  return { signed, setSigned, signCustomMessage };
}
export function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
export const useAuth = () => {
  const { data: session, status } = useSession() as {
    status: "authenticated" | "loading" | "unauthenticated";
    data: USER_SESSION;
    update: UpdateSession;
  };
  const [user, setUser] = useState<USER_SESSION["user"] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated" && session) {
      setUser(session.user);
    } else {
      setUser(null);
    }
    setIsLoading(false);
  }, [session, status]);

  return {
    user,
    session,
    isAuthenticated: status === "authenticated",
    isLoading,
  };
};

export const useActiveTab = (
  paramName: string = "tab"
): [string, (tabName: string) => void] => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    const { query } = router;
    const activeTabParam = query[paramName] as string;
    setActiveTab(activeTabParam || ""); // Set active tab from URL query params
  }, [router, paramName]);

  const setActiveTabAndUpdateUrl = (tabName: string) => {
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, [paramName]: tabName },
      },
      undefined,
      { shallow: true }
    );
    setActiveTab(tabName);
  };

  return [activeTab, setActiveTabAndUpdateUrl];
};

export const useResize = () => {
  const [windowSize, setWindowSize] = useState<{
    width: number;
    height: number;
  }>({
    //@ts-ignore
    width: undefined,
    //@ts-ignore
    height: undefined,
  });
  const isMobileSize = windowSize?.width < 560;
  const isTabletSize = windowSize?.width > 560 && windowSize?.width <= 960;

  useEffect(() => {
    // Function to update window size
    const updateWindowSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Initial window size update
    updateWindowSize();

    // Event listener to update window size on resize
    window.addEventListener("resize", updateWindowSize);

    // Clean-up function to remove event listener
    return () => {
      window.removeEventListener("resize", updateWindowSize);
    };
  }, []); // Run only once on component mount

  return { ...windowSize, isMobileSize, isTabletSize };
};

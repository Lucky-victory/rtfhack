import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { USER_SESSION } from "@/state/types";
type UpdateSession = (data?: any) => Promise<USER_SESSION | null>;

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
  paramName: string
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

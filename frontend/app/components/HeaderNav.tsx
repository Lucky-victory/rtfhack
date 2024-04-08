import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Heading,
  IconButton,
  Image,
  List,
  ListItem,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import isMobile from "is-mobile";

import { useAddUserMutation, useGetUserQuery } from "@/state/services";
import { maskWalletAddress } from "@/utils";
import { useResize, useAuth } from "@/hooks";
import { LuMenu } from "react-icons/lu";
import { useEffect, useTransition } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import WalletAdaptor from "./WalletAdapterBtn";

import LogoutBtn from "./LogoutBtn";
import AuthBtn from "./AuthBtn";

export function HeaderNav() {
  const { isMobileSize, isTabletSize } = useResize();
  const { isOpen, onClose, onToggle } = useDisclosure();

  const linkStyles = {
    display: isMobileSize || isTabletSize ? "block" : "inline-block",
    fontSize: "16px",
    textTransform: "capitalize" as any,
    pos: "relative" as any,
    pb: "2px",
    _before: {
      content: `''`,
      pos: "absolute",
      bottom: 0,
      left: 0,
      w: 0,
      h: "3px",
      bg: "gs-yellow.400",
      transition: "0.4s ease-in-out",
    },
    _hover: {
      textDecoration: "none",
      color: "gs-yellow.400",
      _before: { w: "full" },
    },
  };

  const router = useRouter();
  const { data: session, status } = useSession();
  const [isPending, startTransition] = useTransition();
  const { user, isAuthenticated, isLoading, session: userSession } = useAuth();
  console.log({ session, status, user, isAuthenticated, isLoading });
  useEffect(() => {
    if (isAuthenticated) {
      startTransition(() => {
        router.push("/member/dashboard");
      });
    }
  }),
    [isAuthenticated];
  const links = [
    <>
      <ListItem>
        <Link {...linkStyles} href={"/blog"}>
          Blog
        </Link>
      </ListItem>
      <ListItem>
        <Link {...linkStyles} href={"/communities"}>
          Communities
        </Link>
      </ListItem>
      <ListItem>
        <Link {...linkStyles} href={"/our-mission"}>
          Our mission
        </Link>
      </ListItem>
    </>,
  ];
  return (
    <>
      <HStack
        minH={"50px"}
        pl={5}
        bg={"blackAlpha.300"}
        justify={"space-between"}
        backdropFilter={"blur(5px)"}
      >
        <Heading>
          <Image
            src={"/logo-with-text.png"}
            alt={"Greenspace Logo"}
            width={"200px"}
            //   height={"100px"}
          />
        </Heading>

        <List
          display={"flex"}
          gap={4}
          fontWeight={500}
          hidden={isMobileSize || isTabletSize}
        >
          {[links]}
        </List>

        <HStack
          clipPath={"polygon(14% 0, 100% 0%, 100% 100%, 0% 100%);"}
          bg={"gs-yellow.400"}
          minW={{ base: 150, lg: 350 }}
          px={4}
          pr={8}
          py={2}
          justify={"flex-end"}
        >
          <HStack>
            {/* {" "}
            {ready && !authenticated && (
              <Button
                shadow={"md"}
                rounded={"lg"}
                onClick={() => handleLogin()}
              >
                Connect wallet
              </Button>
            )}
            <Box>
              {authenticated && walletReady && (
                <Button
                  gap={2}
                  // onClick={() => onOpen()}
                  variant={"outline"}
                  rounded={"lg"}
                  shadow={"md"}
                  colorScheme={"gray"}
                  fontWeight={700}
                >
                  <BoringAvatars variant="beam" size={24} />
                  {maskWalletAddress(wallets[0]?.address, 5)}
                  <LuChevronDown size={24} />{" "}
                </Button>
              )}
            </Box> */}
          </HStack>
          {!(isMobileSize || isTabletSize) && (
            <>
              {/* <LogoutBtn /> */}
              {userSession ? (
                <AuthBtn userSession={userSession} />
              ) : (
                <WalletAdaptor />
              )}
            </>
          )}

          {(isMobileSize || isTabletSize) && (
            <IconButton
              ml={3}
              onClick={onToggle}
              fontSize={24}
              aria-label="toggle mobile menu"
            >
              <LuMenu />
            </IconButton>
          )}
        </HStack>
      </HStack>
      {(isMobileSize || isTabletSize) && (
        <Drawer isOpen={isOpen} onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader />
            <DrawerBody>
              <List
                my={10}
                display={"flex"}
                flexDir={"column"}
                gap={4}
                fontWeight={500}
              >
                {[links]}
              </List>
              <HStack
                // clipPath={"polygon(14% 0, 100% 0%, 100% 100%, 0% 100%);"}
                bg={"gs-yellow.400"}
                minW={{ base: 150, lg: 350 }}
                p={2}
                // justify={"center"}
              >
                {/* <Button
                  display={"block"}
                  w={"full"}
                  layerStyle={"with-shadow"}
                  onClick={handleLogin}
                >
                  Connect Wallet
                </Button> */}

                <>
                  {/* <LogoutBtn /> */}
                  {userSession ? (
                    <AuthBtn userSession={userSession} />
                  ) : (
                    <WalletAdaptor />
                  )}
                </>
              </HStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
}

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
import {
  DynamicWidget,
  useDynamicContext,
  useUserWallets,
} from "@dynamic-labs/sdk-react-core";
import { useAddUserMutation, useGetUserQuery } from "@/state/services";
import { maskWalletAddress } from "@/utils";
import { useResize } from "@/hooks";
import { LuMenu } from "react-icons/lu";
import { useEffect } from "react";

export function HeaderNav() {
  const { isMobileSize, isTabletSize } = useResize();
  const { isOpen, onClose, onToggle } = useDisclosure();
  const { user, isAuthenticated } = useDynamicContext();

  const wallets = useUserWallets();
  const [createUser, { data: createdUser }] = useAddUserMutation();
  const { data: savedUserResponse } = useGetUserQuery({
    usernameOrAuthId: user?.userId as string,
  });
  const savedUser = savedUserResponse?.data;

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

  console.log({ user, wallets, savedUser, isAuthenticated });
  async function handleLogin() {
    // login();
    if (!savedUser && user) {
      createUser({
        address: wallets?.[0]?.address,
        chainId: wallets?.[0]?.chain,
        authId: user?.userId,
        email: user?.email!,
        fullName: user?.firstName + " " + user?.lastName,
      });
      console.log({ createdUser });
    }
  }
  useEffect(() => {
    if (!savedUser && user && user?.newUser) {
      createUser({
        address: wallets?.[0]?.address,
        chainId: user?.chain,
        authId: user?.userId,
        email: user?.email!,
        fullName: user?.firstName + " " + user?.lastName,
      });
      console.log({ createdUser });
    }
  }, [user, savedUser]);
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
            <DynamicWidget
              buttonClassName="sign-up-btn"
              buttonContainerClassName="sign-up-btn-container"
            />
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
                <DynamicWidget />
              </HStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
}

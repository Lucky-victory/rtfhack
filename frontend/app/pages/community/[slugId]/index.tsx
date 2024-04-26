import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Image,
  List,
  ListItem,
  Stack,
  Text,
  useBreakpoint,
} from "@chakra-ui/react";
import PageWrapper from "@/components/PageWrapper";
import { useActiveTab } from "@/hooks";
import { Link } from "@chakra-ui/next-js";
import { FiGlobe, FiLock } from "react-icons/fi";
import { useEffect, useState } from "react";
import TabPanels from "@/components/community-page/TabPanels";
import { useRouter } from "next/router";
import Head from "next/head";
import PageLoader from "@/components/PageLoader";
import { useGetCommunityQuery } from "@/state/services";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

const tabsObj = [
  {
    name: "About",
    url: "",
  },
  {
    name: "Challenges",
    url: "challenges",
  },
  {
    name: "Events",
    url: "events",
  },
  {
    name: "Chats",
    url: "chats",
  },
];
export default function CommunityViewPage({
  slugId: slugIdFromServer,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // TODO: Add a 404 redirect when no community is found.
  const router = useRouter();

  const slugId = slugIdFromServer || (router.query.slugId as string);

  const [activeTab, setActiveTab] = useActiveTab("tab");
  const breakpoint = useBreakpoint();
  const [tabs, setTabs] = useState(tabsObj);
  const smallerBreakPoints = ["md", "base", "sm"];
  // TODO: Replace the community object with the communityData from useGetCommunityQuery
  const {
    data: communityData,
    isLoading,
    isFetching,
  } = useGetCommunityQuery({ spaceIdOrId: slugId });
  const community = communityData?.data;
  // console.log({ community, communityData, slugIdFromServer, slugId });
  useEffect(() => {
    if (smallerBreakPoints.includes(breakpoint)) {
      setTabs((prev) => tabs.filter((tab) => tab.name !== "Members"));

      setTabs((prev) => [...prev, { name: "Members", url: "members" }]);
    } else {
      setTabs((prev) => tabs.filter((tab) => tab.name !== "Members"));
      if (activeTab === "members") setActiveTab("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [breakpoint]);

  // const community = {
  //   name: "Health Focus Community",
  //   spaceId: "",
  //   coverImage: "",
  //   displayImage: "",
  //   slug: "",
  //   visibility: "public",
  //   userId: "",
  //   description:
  //     "Health Focus Community is a community of people who are passionate about health and wellness. We are a community of people who are passionate about improving the health of their lives.",
  // };
  const tabBtnStyles = {
    textDecor: "none!important",
    py: 2,
    px: 5,
    rounded: "full",
    fontWeight: "normal",
    _hover: {
      bg: "gray.700",
    },
  };
  const members = [
    {
      fullName: "Mike Uche",
      avatar: "https://randomuser.me/api/portraits/men/53.jpg",
      username: "GH_1341331684",
    },
    {
      fullName: "Olivia Dan",
      avatar: "https://randomuser.me/api/portraits/women/36.jpg",
      username: "GH_1931331334",
    },
    {
      fullName: "Chinenye Johnson",
      avatar: "https://randomuser.me/api/portraits/women/30.jpg",
      username: "GH_1931331684",
    },
  ];

  const tabButtons = tabs.map((tab) => {
    // if (activeTab === "") setActiveTab("about");
    const isActive = tab.url === activeTab;
    return (
      <ListItem fontSize={"18px"} key={tab.name}>
        <Button
          onClick={() => setActiveTab(tab.url)}
          variant={"unstyled"}
          {...tabBtnStyles}
          {...(isActive && {
            fontWeight: 500,

            color: "gs-yellow.300",
            bg: "gs-gray.800",
          })}
        >
          {tab.name}
        </Button>
      </ListItem>
    );
  });
  return (
    <PageLoader isLoading={isLoading || isFetching} text="fetching data...">
      {community && (
        <PageWrapper props={{ minH: "var(--chakra-vh,100vh)" }}>
          <Head>
            <title>{community?.name}</title>
            <meta name="description" content={community?.description} />
            <meta property="og:title" content={community?.name} />
            <meta property="og:description" content={community?.description} />
            <meta property="og:type" content="website" />
            <meta property="og:image" content={community?.coverImage} />
            <meta property="og:url" content="https://greenspacedao.xyz" />
            <meta property="og:site_name" content="GreenspaceDAO" />
            <meta property="og:locale" content="en_US" />
            <meta property="og:locale:alternate" content="en" />
            <meta property="og:locale:alternate" content="en_US" />
            <meta property="og:locale:alternate" content="en_GB" />
          </Head>

          <Box>
            {/* BANNER AREA */}
            <Box>
              <Box
                h={{ lg: 250, base: 180 }}
                pos={"relative"}
                bg={"gs-gray.600"}
              >
                <Image
                  alt="cover background"
                  src={
                    community?.coverImage || "/assets/community-default-bg.png"
                  }
                  h={"full"}
                  w={"full"}
                  objectFit={"cover"}
                  opacity={0.75}
                />
                <Box pos={"absolute"} right={0} bottom={0} p={3}>
                  <HStack
                    rounded={"full"}
                    bg={"rgba(0,0,0,0.45)"}
                    px={3}
                    py={1}
                  >
                    <>
                      {community?.visibility === "private" ? (
                        <FiLock />
                      ) : (
                        <FiGlobe />
                      )}
                    </>
                    <Text
                      fontSize={"10px"}
                      textTransform={"uppercase"}
                      as={"span"}
                    >
                      {community?.visibility}
                    </Text>
                  </HStack>
                </Box>
              </Box>
              <Flex
                mb={10}
                flexDir={{ lg: "row", base: "column" }}
                gap={5}
                justify={{ lg: "flex-start", base: "center" }}
                align={"center"}
                pl={5}
                mt={{ lg: -20, base: "-75px" }}
                pos={"relative"}
              >
                <Box
                  rounded={"full"}
                  w={{ lg: 150, base: 130 }}
                  h={{ lg: 150, base: 130 }}
                  boxShadow={"0 0 0 4px #8a8f91"}
                  bg={"gray.700 m,"}
                  overflow={"hidden"}
                >
                  <Image
                    alt=""
                    src={community?.displayImage || "/assets/community-dp.png"}
                    h={"full"}
                    w={"full"}
                    objectFit={"cover"}
                  />
                </Box>
                <Heading
                  as={"h1"}
                  textAlign={"center"}
                  mt={{ lg: 14, base: 0 }}
                >
                  {community?.name}
                </Heading>
              </Flex>
            </Box>
            <Flex direction={{ lg: "row", base: "column" }} gap={3}>
              <Stack>
                <Flex
                  borderBottom={{ base: "2px", lg: "none" }}
                  borderBottomColor={"gray.600"}
                  pb={2}
                  as={List}
                  direction={{ lg: "column", base: "row" }}
                  overflowX={"auto"}
                  px={{ base: 2, lg: 4 }}
                  gap={{ base: 3, lg: 4 }}
                  pos={"sticky"}
                  top={0}
                >
                  {[tabButtons]}
                </Flex>
              </Stack>
              <Box
                flex={1}
                px={4}
                borderX={{ lg: "1px" }}
                borderColor={{ lg: "gray.600" }}
              >
                <TabPanels
                  activeTab={activeTab}
                  spaceIdOrId={slugId}
                  description={community?.description}
                />
              </Box>
              <Box px={4} hideBelow={"lg"} pos={"sticky"} top={0}>
                <Box borderRadius={"10px"} minW={250}>
                  <Heading
                    size={"md"}
                    fontWeight={500}
                    borderBottom={"1px"}
                    p={2}
                    borderBottomColor={"gray.600"}
                  >
                    Members
                  </Heading>
                  <Stack py={4} as={List} divider={<Divider />}>
                    {members?.length > 0 &&
                      members.map((member, i) => {
                        return (
                          <ListItem key={"member" + i}>
                            <HStack gap={4}>
                              <Avatar size={"sm"} src={member?.avatar} />{" "}
                              <Stack>
                                <Link
                                  href={"/user/" + member?.username}
                                  textDecor={"none!important"}
                                >
                                  <Text fontWeight={500}>
                                    {member?.fullName}
                                  </Text>
                                </Link>
                              </Stack>
                            </HStack>
                          </ListItem>
                        );
                      })}
                  </Stack>
                </Box>
              </Box>
            </Flex>
          </Box>
        </PageWrapper>
      )}
    </PageLoader>
  );
}

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  const { slugId } = query;

  // Pass the pathname as props
  return {
    props: {
      slugId: slugId as string,
    },
  };
}

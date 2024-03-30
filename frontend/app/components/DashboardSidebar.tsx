import { Link } from "@chakra-ui/next-js";
import {
  Box,
  Flex,
  Icon,
  Image,
  List,
  ListItem,
  Stack,
  Text,
} from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons";
export default function DashboardSideNav(props: {
  entryPath?: string;
  links: Array<{
    title: string;
    url: string;
    icon: IconType;
    child?: string[];
  }>;
}) {
  const isMobile = false;
  const pathname = usePathname();

  const parts = pathname.split("/");
  const beforeLastPart = parts[parts.length - 2];
  const lastPart = parts[parts.length - 1];
  const _links = props.links.map((link, i) => {
    const isActive =
      lastPart === link?.url ||
      (beforeLastPart == link.url && link?.child?.includes(lastPart)) ||
      (link?.url === "overview" && lastPart === "dashboard");

    const buildLink = (entry: string, url: string) =>
      url.toLowerCase() === "overview" ? entry + "" : entry + url;
    const activeStyles = {
      bg: "gs-green.900",
      fontWeight: 500,
      borderLeftColor: "gs-green.400",
      color: "gs-green.400",
    };
    return (
      <ListItem
        pos={"relative"}
        px={3}
        key={"navlink" + i}
        fontSize={"16"}
        className={""}
      >
        <Link
          _hover={{ ...activeStyles, fontWeight: "normal" }}
          rounded={"lg"}
          borderLeft={"4px solid"}
          borderLeftColor={"transparent"}
          bg={"transparent"}
          py={3}
          px={3}
          {...(isActive && activeStyles)}
          textDecor={"none!important"}
          href={buildLink(props?.entryPath as string, link?.url)}
          alignItems={"center"}
          display={"flex"}
          gap={5}
        >
          <Icon as={link?.icon} size={24} />
          {!isMobile && <Text as={"span"}>{link?.title}</Text>}
        </Link>
      </ListItem>
    );
  });
  return (
    <Box
      borderRight={"2px"}
      borderRightColor={"gray.500"}
      bg={"gray.700"}
      w={isMobile ? 70 + "px" : 260}
      h={"full"}
    >
      <Box pl={4} mb={5}>
        <Link href="/">
          <Image alt="" src="/white-logo.svg" width={170} height={60 + "px"} />
        </Link>
      </Box>
      <Flex direction={"column"} as={List} gap={4}>
        {[_links]}
      </Flex>
    </Box>
  );
}

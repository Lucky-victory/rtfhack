import { Box, Heading } from "@chakra-ui/react";

export default function Chats({ spaceIdOrId }: { spaceIdOrId: string }) {
  return (
    <>
      <Heading size={"md"} fontWeight={600} mb={4}>
        Chats
      </Heading>
      <Box>Chats here</Box>
    </>
  );
}

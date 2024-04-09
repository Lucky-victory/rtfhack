import { Box, Heading } from "@chakra-ui/react";

export default function Events({ spaceIdOrId }: { spaceIdOrId: string }) {
  return (
    <>
      <Heading size={"md"} fontWeight={600} mb={4}>
        Events
      </Heading>
      <Box>Events here</Box>
    </>
  );
}

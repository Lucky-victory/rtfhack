import { Box, Heading } from "@chakra-ui/react";

export default function Challenges({ spaceIdOrId }: { spaceIdOrId: string }) {
  return (
    <>
      <Heading size={"md"} fontWeight={600} mb={4}>
        Challenges
      </Heading>
      <Box>Challenges here</Box>
    </>
  );
}

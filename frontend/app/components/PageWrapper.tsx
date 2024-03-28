import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

export default function PageWrapper({
  children,

  header,
  maxW = 1400,
}: {
  children?: ReactNode;
  maxW?: number;
  header?: ReactNode;
}) {
  return (
    <>
      <Box maxW={"1300px"} mx={"auto"}>
        {header}
      </Box>
      <Box as="main" maxW={maxW} mx={"auto"}>
        {children}
      </Box>
    </>
  );
}

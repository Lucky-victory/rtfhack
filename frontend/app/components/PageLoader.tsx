import { Flex, Spinner, Stack, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  text?: string;
  isLoading?: boolean;
  children?: ReactNode;
}
export default function PageLoader({
  isLoading = true,
  text = "Loading...",
  children,
}: Props) {
  return (
    <>
      {isLoading && (
        <Flex
          pos={"fixed"}
          h={"full"}
          w={"full"}
          top={0}
          left={0}
          zIndex={99999}
          bg={"black"}
          align={"center"}
          justify={"center"}
        >
          <Stack>
            <Spinner
              mb={4}
              borderWidth={4}
              color="gs-yellow.700"
              speed="0.65s"
              emptyColor="gray.900"
              w={{ md: "80px", base: "60px" }}
              h={{ md: "80px", base: "60px" }}
            ></Spinner>
            {text && (
              <Text
                as={"span"}
                fontWeight={500}
                fontSize={"18px"}
                color={"gs-yellow.500"}
              >
                {text}
              </Text>
            )}
          </Stack>
        </Flex>
      )}
      {!isLoading && children ? children : <></>}
    </>
  );
}

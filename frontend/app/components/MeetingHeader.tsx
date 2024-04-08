import {
  Badge,
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
  VStack,
  useClipboard,
  useToast,
} from "@chakra-ui/react";
import { FiUserPlus, FiUsers } from "react-icons/fi";
import NewPeerRequest from "./NewPeerRequest";
import { Room } from "@huddle01/web-core";
import { useLobby } from "@huddle01/react/hooks";
import { useAppDispatch } from "@/state/store";
import { useFormik } from "formik";
import { LuCheck, LuCopy } from "react-icons/lu";
import { useEffect } from "react";
import axios from "axios";

export default function MeetingHeader({
  room,
  meetingTitle,
}: {
  room: Room;
  meetingTitle?: string;
}) {
  const { onCopy, hasCopied, value, setValue } = useClipboard("");
  const dispatch = useAppDispatch();
  const toast = useToast({
    duration: 3000,
    position: "top",
    title: "Invitation sent successfully",
    status: "success",
  });
  const lobbyPeers = useLobby({
    onLobbyPeersUpdated: (lobbyPeers) => {},
  });
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post("/api/email", {
          email: values.email,
          link: window.location.href,
        });
        toast();
        formik.resetForm();
      } catch (error) {
        toast({
          title: "Something went wrong, please try again",
          status: "error",
        });
      }
    },
  });

  const handleCopy = () => {
    onCopy();
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      setValue(window.location.href);
    }
  });
  return (
    <HStack
      justify={"space-between"}
      gap={5}
      bg={"black"}
      rounded={"40px"}
      py={3}
      px={4}
    >
      <Box>
        <Heading size={{ base: "sm", md: "md" }}>{meetingTitle}</Heading>
      </Box>
      <HStack px={4} gap={5}>
        <Box>
          <Popover>
            <PopoverTrigger>
              <Button
                mr={3}
                colorScheme="teal"
                variant={"ghost"}
                bg={"gs-yellow-dark.50"}
                pos={"relative"}
                // rounded={"full"}
                gap={3}
                size={"sm"}
                aria-label="active peers"
              >
                <FiUserPlus />
                <Text hideBelow={"md"}>Invite people</Text>
              </Button>
            </PopoverTrigger>

            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />

              <PopoverBody py={4} mt={4}>
                <VStack divider={<Divider />} gap={2}>
                  <Button
                    size={"md"}
                    w={"full"}
                    gap={3}
                    // colorScheme=""
                    variant={"ghost"}
                    bg={"gs-green.50"}
                    onClick={() => handleCopy()}
                  >
                    {hasCopied ? <LuCheck /> : <LuCopy />}{" "}
                    {hasCopied ? "Copied" : "Copy Link"}
                  </Button>
                  <Stack bg={"gray.50"} p={2} w={"full"}>
                    {/* This code works fine, the ts-ignore is because of the types of Stack(which is a div) and a div doesn't have an onSubmit, but in reality the code renders a form*/}
                    {/* @ts-ignore */}
                    <Stack as={"form"} onSubmit={formik.handleSubmit}>
                      <FormControl>
                        <FormLabel>Invite by email:</FormLabel>

                        <Input
                          type="email"
                          name="email"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          colorScheme="teal"
                          _focus={{
                            boxShadow: "0 0 0 1px teal",
                            borderColor: "teal",
                          }}
                          placeholder="Enter email"
                        />
                      </FormControl>
                      <Button
                        isLoading={formik.isSubmitting}
                        loadingText={"Sending..."}
                        type="submit"
                        colorScheme="teal"
                      >
                        {" "}
                        Send Invite
                      </Button>
                    </Stack>
                  </Stack>
                </VStack>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Box>
        <HStack gap={4}>
          <HStack>
            <FiUsers />
            <Text hideBelow={"md"} fontSize={"13px"} as={"span"}>
              Pending Invites
            </Text>
          </HStack>

          <Badge colorScheme="orange">{lobbyPeers.lobbyPeersIds.length}</Badge>
        </HStack>

        {lobbyPeers.lobbyPeersIds.length > 0 && <NewPeerRequest room={room} />}
      </HStack>
    </HStack>
  );
}

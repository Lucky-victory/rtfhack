import {
  Avatar,
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { pusherClient } from "@/lib/pusher/client";
import { FormEvent, FormEventHandler, useEffect, useRef } from "react";
import { Channel } from "pusher-js";
import { useFormik } from "formik";
import { useAuth } from "@/hooks";
import { FiSend } from "react-icons/fi";
import { useGetCommunityMessagesQuery } from "@/state/services";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/state/store";
import { addMessage } from "@/state/slices";

export default function Chats({ spaceIdOrId }: { spaceIdOrId: string }) {
  const { user } = useAuth();
  const {
    data: messagesRes,
    isFetching,
    isLoading,
  } = useGetCommunityMessagesQuery({ spaceIdOrId });

  const dispatch = useAppDispatch();
  const messages = useSelector(
    (state: RootState) => state.communityMessagesState.data
  );

  const channelRef = useRef<Channel>();
  const messageForm = useFormik({
    initialValues: {
      message: "",
    },
    onSubmit: async (values, formikHelpers) => {
      const { message } = values;

      formikHelpers.setFieldValue("message", "");
      await sendMessage(message);
    },
  });
  async function sendMessage(message: string) {
    try {
      await fetch(`/api/pusher/chat?communityId=${spaceIdOrId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, userId: user?.authId }),
      });
    } catch (error) {}
  }
  useEffect(() => {
    channelRef.current = pusherClient
      .subscribe(spaceIdOrId)
      .bind("evt::message", (data: any) => {
        console.log("test", data);
        dispatch(addMessage(data));
      });

    return () => {
      if (channelRef.current) channelRef.current.unbind();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages, spaceIdOrId]);

  /**
   * The function was used in other to stop typescript types warning for chakra
   * @param event
   */
  const handleSubmit: FormEventHandler<HTMLDivElement | HTMLFormElement> = (
    event
  ) => {
    messageForm.handleSubmit(event as FormEvent<HTMLFormElement>);
  };

  return (
    <>
      <Heading
        size={"lg"}
        fontWeight={600}
        mb={4}
        borderBottom={"2px"}
        borderColor={"gray.800"}
        pb={2}
      >
        Chats
      </Heading>
      <Box pos={"relative"}>
        <Stack divider={<Divider />} pb={24}>
          {messages?.length > 0 &&
            messages.map((message: any, index: number) => (
              <HStack
                py={3}
                px={3}
                rounded={"md"}
                // bg={"gs-gray.900"}
                gap={3}
                key={message?.id + "" + index}
                align={"flex-start"}
              >
                <Avatar
                  mt={1}
                  size={"sm"}
                  name={message?.author?.fullName}
                  src={message?.author?.avatar}
                />
                <Stack>
                  <HStack align={"flex-start"}>
                    <Text fontWeight={600}>{message?.author?.fullName}</Text>
                  </HStack>
                  <Text fontSize={"15px"} fontWeight={300}>
                    {message?.message}
                  </Text>
                </Stack>
              </HStack>
            ))}
        </Stack>
        <HStack
          bg={"black"}
          px={2}
          py={3}
          as={"form"}
          onSubmit={handleSubmit}
          pos={"sticky"}
          bottom={"0"}
          // left={0}
          w={"full"}
        >
          <Input
            // rounded={"full"}
            _focus={{
              boxShadow: "0 0 0 1px transparent",
              borderColor: "gs-yellow.400",
            }}
            autoComplete="off"
            name="message"
            value={messageForm.values.message}
            placeholder="Type a message..."
            onChange={messageForm.handleChange}
          />
          <Button
            colorScheme="gs-yellow"
            isDisabled={messageForm.values.message === ""}
          >
            <FiSend />
          </Button>
        </HStack>
      </Box>
    </>
  );
}

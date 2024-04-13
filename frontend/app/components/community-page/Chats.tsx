import {
  Avatar,
  Box,
  Button,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { pusherClient } from "@/lib/pusher/client";
import {
  FormEvent,
  FormEventHandler,
  ReactComponentElement,
  useEffect,
  useRef,
  useState,
} from "react";
import { Channel } from "pusher-js";
import { useFormik } from "formik";
import { LuPlane } from "react-icons/lu";
import { HiPaperAirplane } from "react-icons/hi";
import { useAuth } from "@/hooks";
import { FiSend } from "react-icons/fi";
import { useGetCommunityMessagesQuery } from "@/state/services";

export default function Chats({ spaceIdOrId }: { spaceIdOrId: string }) {
  // const [message, setMessage] = useState<string>("");
  const { user } = useAuth();
  const {
    data: messagesRes,
    isFetching,
    isLoading,
  } = useGetCommunityMessagesQuery({ spaceIdOrId });
  const prevMessages = messagesRes?.data;
  const [messages, setMessages] = useState<any[]>(prevMessages!);
  console.log({ messages });
  const channelRef = useRef<Channel>();
  const messageForm = useFormik({
    initialValues: {
      message: "",
    },
    onSubmit: async (values, formikHelpers) => {
      const { message } = values;

      await sendMessage(message);

      formikHelpers.setFieldValue("message", "");
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
        setMessages([...messages, data]);
      });

    return () => {
      if (channelRef.current) channelRef.current.unbind();
    };
  }, [messages]);

  /**
   * The function was used in other to stop typescript types warning for chakra
   * @param event
   */
  const handleSubmit: FormEventHandler<HTMLDivElement | HTMLFormElement> = (
    event
  ) => {
    messageForm.handleSubmit(event as FormEvent<HTMLFormElement>);
  };

  async function handleInputKeyUp(
    event: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (event.key === "Enter" && !event.shiftKey) {
      await sendMessage(messageForm.values.message);
    }
  }
  return (
    <>
      <Heading
        size={"md"}
        fontWeight={600}
        mb={4}
        borderBottom={"2px"}
        borderColor={"gray.800"}
        pb={2}
      >
        Chats
      </Heading>
      <Stack gap={5}>
        {messages?.length > 0 &&
          messages.map((message: any, index: number) => (
            <HStack gap={3} key={message?.id} align={"flex-start"}>
              <Avatar size={"sm"} src={message?.author?.avatar} />
              <Stack>
                <HStack align={"flex-start"}>
                  <Text fontWeight={600}>{message?.author?.fullName}</Text>
                </HStack>
                <Text fontWeight={300}>{message?.message}</Text>
                {/* {message.message} */}
              </Stack>
            </HStack>
          ))}
      </Stack>
      <HStack
        as={"form"}
        onSubmit={handleSubmit}
        pos={"fixed"}
        bottom={"0"}
        w={"full"}
      >
        <Input
          // rounded={"full"}
          _focus={{
            boxShadow: "0 0 0 1px transparent",
            borderColor: "gs-yellow.400",
          }}
          onKeyUp={handleInputKeyUp}
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
    </>
  );
}

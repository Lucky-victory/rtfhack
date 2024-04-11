import { Box, Button, Heading, HStack, Input, Stack } from "@chakra-ui/react";
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

export default function Chats({ spaceIdOrId }: { spaceIdOrId: string }) {
  const [message, setMessage] = useState<string>("");
  const { user } = useAuth();

  const [messages, setMessages] = useState<any[]>([]);
  const channelRef = useRef<Channel>();
  const messageForm = useFormik({
    initialValues: {
      message: "",
    },
    onSubmit: async (values, formikHelpers) => {
      const { message } = values;
      await fetch(`/api/pusher/chat?communityId=${spaceIdOrId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, authId: user?.authId }),
      });
      formikHelpers.setFieldValue("message", "");
    },
  });
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
  return (
    <>
      <Heading size={"md"} fontWeight={600} mb={4}>
        Chats
      </Heading>
      <Stack>
        {messages?.length > 0 &&
          messages.map((message: any, index: number) => (
            <Box key={index}>{message.message}</Box>
          ))}
      </Stack>
      <HStack as={"form"} onSubmit={handleSubmit}>
        <Input
          autoComplete="off"
          name="message"
          value={messageForm.values.message}
          placeholder="Type a message..."
          onChange={messageForm.handleChange}
        />
        <Button isDisabled={messageForm.values.message === ""}>
          <HiPaperAirplane />
        </Button>
      </HStack>
    </>
  );
}

import { Box, HStack, IconButton, Input } from "@chakra-ui/react";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { FiSend } from "react-icons/fi";

export default function ChatInput({
  sendData,
}: {
  sendData: (data: {
    to: string[] | "*";
    payload: string;
    label?: string;
  }) => Promise<void>;
}) {
  const [text, setText] = useState<string>("");
  function handleInputChange(evt: ChangeEvent<HTMLInputElement>) {
    setText(evt.target.value);
  }
  const sendMessage = () => {
    sendData({
      to: "*",
      payload: text,
      label: "chat",
    });
    setText("");
  };
  function handleInputKeyUp(evt: KeyboardEvent<HTMLInputElement>): void {
    if (evt.key === "Enter" && !evt.shiftKey) {
      sendMessage();
    }
  }
  return (
    <Box px={1} py={3}>
      <HStack p={2} bg={"white"} rounded={"full"}>
        <Input
          name="message"
          value={text}
          autoComplete="off"
          onKeyUp={handleInputKeyUp}
          onChange={handleInputChange}
          _focus={{ boxShadow: "0 0 0 1px teal", borderColor: "teal" }}
          placeholder="Type a message..."
          fontWeight={500}
          colorScheme="teal"
          rounded={"full"}
        />
        <IconButton
          isDisabled={text === ""}
          onClick={sendMessage}
          rounded={"full"}
          colorScheme="teal"
          aria-label="send message"
        >
          <FiSend />
        </IconButton>
      </HStack>
    </Box>
  );
}

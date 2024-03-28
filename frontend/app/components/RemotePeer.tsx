import { RootState } from "@/state/store";
import {
  Avatar,
  Box,
  Flex,
  GridItem,
  HStack,
  IconButton,
  ResponsiveValue,
  Text,
} from "@chakra-ui/react";
import {
  useRemoteAudio,
  useRemotePeer,
  useRemoteScreenShare,
  useRemoteVideo,
} from "@huddle01/react/hooks";
import { Audio, Video } from "@huddle01/react/components";
import React, { useEffect, useRef, useState } from "react";
import { FiMic, FiMicOff, FiUser } from "react-icons/fi";
import { useSelector } from "react-redux";
import { TPeerMetadata } from "@/pages/meet/[roomId]";

type Props = {
  peerId: string;
  activePeers: {
    activePeerIds: string[];
    dominantSpeakerId: string;
    updateSize: (size: number) => void;
  };
};

const RemotePeer = ({ peerId, activePeers }: Props) => {
  const remotePeer = useRemotePeer<TPeerMetadata>({ peerId });
  const { stream: videoStream, state } = useRemoteVideo({ peerId });
  const { stream: audioStream, state: audioState } = useRemoteAudio({ peerId });

  const { videoStream: screenShareVideo, audioStream: screenAudio } =
    useRemoteScreenShare({ peerId });
  // const vidRef = useRef<HTMLVideoElement>(null);
  // const audioRef = useRef<HTMLAudioElement>(null);
  // const screenVideoRef = useRef<HTMLVideoElement>(null);
  // const screenAudioRef = useRef<HTMLAudioElement>(null);
  const { activePeerIds = [], dominantSpeakerId = "" } = activePeers;
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const participantsCardStyle = {
    // overflow: "hidden",
    minW: 200,
    flex: 1,
    h: "full",
    // flexShrink: 0,
    maxH: 350,
    bg: "gray.100",
    rounded: "20px",
    pos: "relative" as ResponsiveValue<"relative">,
    maxW: 300,
    transition: "ease-in-out",
    transitionProperty: "boxShadow",
  };
  useEffect(() => {
    if (
      (activePeerIds?.includes(peerId) || dominantSpeakerId == peerId) &&
      audioStream
    ) {
      setIsSpeaking(true);
    } else {
      setIsSpeaking(false);
    }
    // console.log("from remote", { isSpeaking, activePeers });
  }, [dominantSpeakerId, activePeerIds, peerId, audioStream]);

  // useEffect(() => {
  //   if (videoStream && vidRef.current && state === "playable") {
  //     vidRef.current.srcObject = videoStream;

  //     vidRef.current.onloadedmetadata = async () => {
  //       try {
  //         vidRef.current?.play();
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     };

  //     vidRef.current.onerror = () => {
  //       console.error("videoCard() | Error is happening...");
  //     };
  //   }
  // }, [state, videoStream]);

  // useEffect(() => {
  //   if (audioStream && audioRef.current && audioState === "playable") {
  //     audioRef.current.srcObject = audioStream;

  //     audioRef.current.onloadedmetadata = async () => {
  //       try {
  //         audioRef.current?.play();
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     };

  //     audioRef.current.onerror = () => {
  //       console.error("videoCard() | Error is happening...");
  //     };
  //   }
  // }, [audioState, audioStream]);

  // useEffect(() => {
  //   if (screenShareVideo && screenVideoRef.current) {
  //     screenVideoRef.current.srcObject = screenShareVideo;

  //     screenVideoRef.current.onloadedmetadata = async () => {
  //       try {
  //         screenVideoRef.current?.play();
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     };

  //     screenVideoRef.current.onerror = () => {
  //       console.error("videoCard() | Error is happening...");
  //     };
  //   }
  // }, [screenShareVideo]);

  // useEffect(() => {
  //   if (screenAudio && screenAudioRef.current) {
  //     screenAudioRef.current.srcObject = screenAudio;

  //     screenAudioRef.current.onloadedmetadata = async () => {
  //       try {
  //         screenAudioRef.current?.play();
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     };

  //     screenAudioRef.current.onerror = () => {
  //       console.error("videoCard() | Error is happening...");
  //     };
  //   }
  // }, [screenAudio]);

  return (
    <Box
      {...participantsCardStyle}
      boxShadow={isSpeaking ? "0 0 0 2px blue" : "none"}
    >
      <HStack
        top={1}
        // right={2}
        justify={"space-between"}
        zIndex={10}
        px={2}
        pos={"absolute"}
        w={"full"}
      >
        {remotePeer.metadata && (
          <Text
            as={"span"}
            fontSize={"14px"}
            px={2}
            rounded={"full"}
            color={"white"}
            bg={"rgba(0,0,0,0.4)"}
            backdropFilter={"auto"}
            backdropBlur={"10px"}
          >
            {remotePeer.metadata.displayName}
          </Text>
        )}
        <IconButton
          aria-label={audioStream ? "mic is on" : "mic is off"}
          bg={"rgba(0,0,0,0.4)"}
          _hover={{
            bg: "rgba(0,0,0,0.71)",
          }}
          backdropBlur={"10px"}
          rounded={"full"}
          color={"white"}
          pointerEvents={"none"}
          fontSize={"14px"}
          p={1}
          w={"auto"}
          h={"auto"}
        >
          {audioStream ? <FiMic /> : <FiMicOff />}
        </IconButton>
      </HStack>
      {!videoStream && !screenShareVideo && (
        <Flex h={"full"} justify={"center"} align={"center"}>
          <Avatar
            name={remotePeer.metadata?.displayName}
            icon={<FiUser />}
            fontSize={"40px"}
            size={"lg"}
            // src={remotePeer.metadata?.avatarUrl}
            bg={!remotePeer.metadata?.displayName ? "gray.400" : undefined}
          />
        </Flex>
      )}
      {videoStream && (
        <Box
          // border={"5px solid green"}
          // boxShadow={isSpeaking ? "0 0 0 2px blue" : "none"}
          stream={videoStream}
          as={Video}
          muted
          autoPlay
          // ref={vidRef}
          h={"full"}
          w={"full"}
          left={0}
          rounded={"inherit"}
          // aspectRatio={"16:9"}
          objectFit={"cover"}
          top={0}
          pos={"absolute"}
        ></Box>
      )}
      {screenShareVideo && (
        <Box
          muted
          autoPlay
          stream={screenShareVideo}
          as={Video}
          // ref={screenVideoRef}
          h={"full"}
          w={"full"}
          left={0}
          // aspectRatio={"16:9"}
          objectFit={"contain"}
          top={0}
          pos={"absolute"}
        ></Box>
      )}
      <Audio stream={audioStream as MediaStream} autoPlay></Audio>
      {screenAudio && (
        <Audio stream={audioStream as MediaStream} autoPlay></Audio>
      )}
    </Box>
  );
};

export default React.memo(RemotePeer);

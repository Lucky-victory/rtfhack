// import Icon from "@/components/Icon";

// import DashboardSideBar from "@/components/DashboardSideBar";
import {
  Td,
  Box,
  Button,
  Flex,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  Avatar,
} from "@chakra-ui/react";
import { format } from "date-fns";
import NutritionistDashBoardLayout from "@/components/NutritionistDashBoardLayout";
import Head from "next/head";
// import { useRouter } from "next/router";
import axios from "axios";
import { AccessToken, Role } from "@huddle01/server-sdk/auth";
import { useDevices, useRoom } from "@huddle01/react/hooks";
import { useRouter } from "next/router";
import { useState } from "react";

export default function DashBoard() {
  const [isLoading, setIsLoading] = useState(false);
  const today = new Date().getTime();
  const router = useRouter();

  const getServerData = async () => {
    try {
      const createRoomFromServer = await axios.post<{ roomId: string }>(
        "/api/create-room"
      );

      const roomId = createRoomFromServer.data?.roomId;
      const createAccessTokenResponse = await axios.post<{
        roomId: string;
        token: string;
      }>(`/api/get-access-token?roomId=${roomId}`);
      console.log({ createRoomFromServer, createAccessTokenResponse });

      const token = createAccessTokenResponse.data?.token;
      return { token, roomId: roomId };
    } catch (error) {}
  };

  const createRoom = async () => {
    try {
      setIsLoading(true);

      const props = (await getServerData()) as {
        roomId: string;
        token: string;
      };
      // Use roomId to create and navigate to the dynamic route
      router.push(`/meeting/${props?.roomId}?token=${props?.token}`); // Or redirect using `res.redirect` for server-side rendering
      setIsLoading(false);
    } catch (error) {
      console.error("Room creation failed:", error);
      // Handle errors gracefully
    }
  };

  return (
    <>
      <Head>
        <title>Dashboard | Appointments</title>
      </Head>
      <NutritionistDashBoardLayout>
        <Box className="h-full px-4 mt-6 pb-10">
          <Flex align={"center"} justify={"space-between"}>
            <Flex align={"center"} gap={6}>
              <Heading size={"lg"} className="text-primaryGreen">
                Today&apos;s Appointments
              </Heading>{" "}
              <Text
                className="bg-primaryGreen text-white rounded-full py-1 px-4 "
                fontSize={"sm"}
                fontWeight={"semibold"}
              >
                {format(today, "E, d MMM yyyy")}
              </Text>
            </Flex>
            {/* <Button className="bg-primaryGreen text-primaryBeige hover:bg-primaryYellowTrans hover:text-primaryGreen">Create Meal Plan</Button> */}
          </Flex>

          <TableContainer my={6}>
            <Table>
              <Thead bg={"white"} className="mb-4">
                <Tr>
                  <Th>Name</Th>
                  <Th>Time</Th>
                  <Th>Duration</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr bg={"white"} rounded={"md"} my={4}>
                  <Td>
                    {" "}
                    <Flex align={"center"} gap={3}>
                      <Avatar
                        size={"sm"}
                        rounded={"md"}
                        src="/images/user-59.jpg"
                      />{" "}
                      <Text as={"span"} fontWeight={"semibold"}>
                        Lilian James
                      </Text>
                    </Flex>
                  </Td>
                  <Td>7:45 - 8:30 AM GMT+1</Td>
                  <Td>45 MINS</Td>
                  <Td>
                    <Flex gap={4}>
                      <Button
                        size={"sm"}
                        variant={"outline"}
                        rounded={"full"}
                        className="text-primaryGreen"
                      >
                        View Details
                      </Button>
                    </Flex>
                  </Td>
                </Tr>
                <Tr bg={"white"} rounded={"md"} my={4}>
                  <Td>
                    <Flex align={"center"} gap={3}>
                      <Avatar
                        size={"sm"}
                        rounded={"md"}
                        src="/images/user-53.jpg"
                      />
                      <Text as={"span"} fontWeight={"semibold"}>
                        Chris Eze
                      </Text>
                    </Flex>{" "}
                  </Td>
                  <Td>12:30 - 1:00 PM GMT+1</Td>
                  <Td>30 MINS</Td>
                  <Td>
                    <Flex gap={4}>
                      <Button
                        size={"sm"}
                        rounded={"full"}
                        isLoading={isLoading}
                        onClick={() => createRoom()}
                        gap={2}
                        className="hover:bg-primaryYellowTrans hover:text-primaryGreen text-primaryBeige bg-primaryGreen"
                      >
                        <Icon size={20} name="phone" /> Start Call
                      </Button>
                      <Button
                        size={"sm"}
                        variant={"outline"}
                        rounded={"full"}
                        className="text-primaryGreen"
                      >
                        View Details
                      </Button>
                    </Flex>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>

          <Box my={6}>
            <Heading size={"lg"} className="text-primaryGreen">
              Upcoming Appointments
            </Heading>
            <Flex
              bg={"white"}
              minH={220}
              align={"center"}
              justify={"center"}
              mt={4}
            >
              <Text
                fontSize={18}
                className="text-secondaryGray"
                fontWeight={"semibold"}
              >
                No upcoming appointments
              </Text>
            </Flex>
          </Box>

          <Box>
            <Heading size={"lg"} className="text-primaryGreen">
              Pending Appointments
            </Heading>

            <TableContainer my={6}>
              <Table>
                <Thead bg={"white"} className="mb-4">
                  <Tr>
                    <Th>Name</Th>
                    <Th>Time</Th>
                    <Th>Duration</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr bg={"white"} rounded={"md"} my={4}>
                    <Td>
                      {" "}
                      <Flex align={"center"} gap={3}>
                        <Avatar
                          size={"sm"}
                          rounded={"md"}
                          src="/images/user-59.jpg"
                        />{" "}
                        <Text as={"span"} fontWeight={"semibold"}>
                          Lilian James
                        </Text>
                      </Flex>
                    </Td>
                    <Td>7:45 - 8:30 AM GMT+1</Td>
                    <Td>45 MINS</Td>
                    <Td>
                      <Flex gap={4}>
                        <Button
                          px={4}
                          size={"sm"}
                          rounded={"full"}
                          gap={2}
                          isLoading={isLoading}
                          className="hover:bg-primaryYellowTrans hover:text-[#403CEA] text-primaryBeige bg-[#403CEA]"
                          onClick={() => createRoom()}
                        >
                          Accept
                        </Button>
                        <Button
                          px={4}
                          size={"sm"}
                          variant={"outline"}
                          rounded={"full"}
                          className="text-[#BF0628] border-[#BF0628]"
                        >
                          Decline
                        </Button>
                      </Flex>
                    </Td>
                  </Tr>
                  <Tr bg={"white"} rounded={"md"} my={4}>
                    <Td>
                      <Flex align={"center"} gap={3}>
                        <Avatar
                          size={"sm"}
                          rounded={"md"}
                          src="/images/user-53.jpg"
                        />
                        <Text as={"span"} fontWeight={"semibold"}>
                          Chris Eze
                        </Text>
                      </Flex>{" "}
                    </Td>
                    <Td>12:30 - 1:00 PM GMT+1</Td>
                    <Td>30 MINS</Td>
                    <Td>
                      <Flex gap={4}>
                        <Button
                          px={4}
                          size={"sm"}
                          rounded={"full"}
                          gap={2}
                          className="hover:bg-primaryYellowTrans hover:text-[#403CEA] text-primaryBeige bg-[#403CEA]"
                        >
                          Accept
                        </Button>
                        <Button
                          px={4}
                          size={"sm"}
                          variant={"outline"}
                          rounded={"full"}
                          className="text-[#BF0628] border-[#BF0628]"
                        >
                          Decline
                        </Button>
                      </Flex>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </NutritionistDashBoardLayout>
    </>
  );
}

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
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Stack,
  FormControl,
  Input,
  Select,
  Textarea,
  FormLabel,
  FormHelperText,
  HStack,
  useToast,
  ResponsiveValue,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { format } from "date-fns";
import NutritionistDashBoardLayout from "@/components/NutritionistDashboardLayout";
import { useState } from "react";
import { MealPlan } from "@/types/shared";
import { v4 as uuid } from "uuid";
import { useAppContext } from "@/context/state";
import { shortenText } from "@/utils";
import { Link } from "@chakra-ui/next-js";
import Head from "next/head";
import { useGetMealPlansQuery } from "@/state/services";
import TableItems from "@/components/TableItems";
import { removeKeyFromObject, selectObjectKeys } from "@/utils";
import DashboardEmptyArea from "@/components/DashboardEmptyArea";

export default function DashBoard() {
  const { data, isLoading, isFetching } = useGetMealPlansQuery({
    status: "all",
  });

  const mealPlans = removeKeyFromObject(data?.data || ([] as MealPlan[]), [
    "author",
  ]);

  const tableHeadStyles = {
    // pb: 4,
    fontSize: "15px",
    fontWeight: "medium",
    textTransform: "uppercase" as ResponsiveValue<"capitalize">,
    // color: '#9CA4AB',
  };
  const today = new Date().getTime();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, setMealPlans } = useAppContext();
  const toast = useToast({
    duration: 3000,
    position: "top",
    status: "success",
    title: "Meal Plan added successfully",
  });
  // // form validation rules
  // const validationSchema = Yup.object().shape({
  //   title: Yup.string().required('Field is required'),
  //   time: Yup.string().required('Field is required'),
  //   content: Yup.string().required('Field is required'),
  // });
  // const formOptions = { resolver: yupResolver(validationSchema) };

  // // get functions to build form with useForm() hook
  // const { register, handleSubmit, formState, reset, setValue } =
  //   useForm(formOptions);
  // const { errors, isValid } = formState;
  // const onValidSubmit = (data: any) => {
  //   if (isValid) {
  //     const dataObject = {
  //       id: uuid(),
  //       title: data?.title,
  //       time: data?.time,
  //       content: data?.content,
  //       createdAt: new Date().getTime(),
  //       userAddress: user?.userAddress,
  //     };
  //     console.log('meal plan', { dataObject });
  //     setIsSubmitting(true);
  //     setTimeout(() => {
  //       setIsSubmitting(false);

  //       const prevPlans = mealPlans || [];
  //       setMealPlans([...prevPlans, dataObject]);
  //       toast();
  //       reset();
  //       onClose();
  //     }, 3000);
  //   }
  // };

  // function editMealPlan(plan: MealPlan) {
  //   onOpen();
  //   setValue('time', plan.time);
  //   setValue('title', plan.title);
  //   setValue('content', plan.content);
  // }
  return (
    <>
      <Head>
        <title>Dashboard | Meal Plans</title>
      </Head>
      <NutritionistDashBoardLayout>
        {/* <Modal
          isOpen={isOpen}
          onClose={() => {
            onClose();
            reset();
          }}
          size={'xl'}
          closeOnOverlayClick={false}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <Heading as='h3' size='lg'>
                {' '}
                Add a New Plan
              </Heading>
            </ModalHeader>
            <ModalCloseButton />

            <ModalBody mb={5}>
              <FormControl as={'form'} onSubmit={handleSubmit(onValidSubmit)}>
                <Stack spacing='2'>
                  <Box>
                    <FormLabel htmlFor='meal-title'>Meal Title</FormLabel>
                    <Input
                      id={'meal-title'}
                      placeholder='Meal Title'
                      {...register('title')}
                    />
                    <Text my={2} color='red.600'>
                      {errors.title?.message}
                    </Text>
                  </Box>
                  <Box>
                    <FormLabel htmlFor='meal-time'>Choose Meal Time</FormLabel>
                    <Select
                      id='meal-time'
                      defaultValue={''}
                      {...register('time')}
                    >
                      <option value='' disabled></option>
                      <option value='breakfast'>Breakfast</option>
                      <option value='lunch'>Lunch</option>
                      <option value='dinner'>Dinner</option>
                      <option value='snack'>Snack</option>
                    </Select>
                    <Text my={2} color='red.600'>
                      {errors.time?.message}
                    </Text>
                  </Box>

                  <Box>
                    <HStack justify={'space-between'} mb={2}>
                      <FormLabel htmlFor='meal-content'>
                        Content for this Meal plan:
                      </FormLabel>
                      <Text color={'gray.500'} as={'em'} fontSize={'small'}>
                        *markdown supported*
                      </Text>
                    </HStack>
                    <Textarea
                      minH={150}
                      maxH={450}
                      id='meal-content'
                      {...register('content')}
                      placeholder='Write a well detailed information about this meal...'
                    ></Textarea>
                    <Text my={2} color='red.600'>
                      {errors.content?.message}
                    </Text>
                  </Box>
                  <Button type='submit' mt={3} isLoading={isSubmitting}>
                    Create Plan
                  </Button>
                </Stack>
              </FormControl>
            </ModalBody>
          </ModalContent>
        </Modal> */}
        <Box className="min-h-full h-full px-4 mt-6">
          <Flex align={"center"} justify={"space-between"}>
            <Flex align={"center"} gap={6}>
              <Heading size={"lg"}>Meal Plans</Heading>{" "}
              <Text
                className="bg-primaryGreen text-white rounded-full py-1 px-4 "
                fontSize={"sm"}
                fontWeight={"semibold"}
              >
                {format(today, "E, d MMM yyyy")}
              </Text>
            </Flex>
            <Button
              as={Link}
              href={"meal-plans/new"}
              // onClick={onOpen}
              //   className="bg-primaryGreen text-primaryBeige hover:bg-primaryYellowTrans hover:text-primaryGreen"
            >
              Create Meal Plan
            </Button>
          </Flex>

          {(!isLoading || isFetching) && !mealPlans?.length && (
            <DashboardEmptyArea
              text="   You don't any meal plan yet."
              isEmpty={true}
              isLoading={false}
            ></DashboardEmptyArea>
          )}
          {mealPlans?.length > 0 && (
            <Box
              my={8}
              maxW={"full"}
              minW={{ xl: "350px", base: "100%" }}
              px={5}
              py={4}
              w={{ base: "full" }}
              flex={1}
              alignSelf={"flex-start"}
              // h={"442px"}
              border={"1px"}
              borderColor={"gray.300"}
              // rounded={'14px'}
              bg={"gray.800"}
              //   pos={"relative/"}
            >
              <TableContainer>
                <Table>
                  <Thead>
                    <Tr
                      h={"auto"}
                      borderBottom={"2px"}
                      borderBottomColor={"gray.100"}
                    >
                      {mealPlans?.length > 0 &&
                        selectObjectKeys(mealPlans[0]).map((key, i) => {
                          return (
                            <Th key={"mealplans-th" + key} {...tableHeadStyles}>
                              {key}
                            </Th>
                          );
                        })}
                      <Th {...tableHeadStyles} key={"mealplans-th-actions"}>
                        Actions
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody className="files-table-body">
                    {mealPlans?.length > 0 &&
                      mealPlans.map((d, i) => (
                        <Tr key={"mealplans-data" + i}>
                          <TableItems keyPrefix={"mealplans"} dataItem={d} />
                          <Td>
                            <HStack>
                              <Button
                                href={"/meal-plans/" + d.slug}
                                variant={"outline"}
                                as={Link}
                                size={"sm"}
                                textDecor={"none"}
                                rounded={"full"}
                              >
                                View
                              </Button>
                              <Button
                                size={"sm"}
                                href={"./articles/edit?pid=" + d.id}
                                variant={"outline"}
                                as={Link}
                                textDecor={"none"}
                                rounded={"full"}
                              >
                                Edit
                              </Button>
                            </HStack>
                          </Td>
                        </Tr>
                      ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </Box>
      </NutritionistDashBoardLayout>
    </>
  );
}

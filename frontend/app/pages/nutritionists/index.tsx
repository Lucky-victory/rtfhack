'use client';

import Icon from '@/components/Icon';
import Header from '@/components/header';
import {
  useToast,
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tag,
  TagLabel,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
//@ts-ignore
import DatePicker from 'react-datepicker';
type Nutritionist = {
  firstName: string;
  location: string;
  lastName: string;
  bio: string;
  id: number;
  avatar: string;
};
const data: Nutritionist[] = [
  {
    id: 1,
    firstName: 'Michelle',
    lastName: 'Sanchez',
    bio: `Michelle is a passionate nutritionist dedicated to helping individuals achieve their health and wellness goals through proper nutrition. With a Bachelor's degree in Nutrition and years of experience in the field, she possesses a deep understanding of the vital role that food plays in our lives.
    `,
    avatar: '/images/f-user-47.jpg',
    location: 'Mexico',
  },
  {
    id: 2,
    firstName: 'Chris',
    lastName: 'Eze',
    bio: ` Chris is a seasoned nutritionist with a strong commitment to improving lives through the power of nutrition. Armed with a Master's degree in Nutritional Science and a wealth of expertise, he brings a holistic perspective to the table.`,
    avatar: '/images/m-user-30.jpg',
    location: 'Nigeria',
  },
  {
    id: 3,
    firstName: 'Rachel',
    lastName: 'Brooke',
    bio: `Rachel is a dedicated nutritionist on a mission to inspire healthier living through balanced eating. Armed with a Bachelor's degree in Nutrition and years of practical experience, she possesses a deep-rooted passion for helping individuals unlock their full wellness potential. `,
    avatar: '/images/f-user-53.jpg',
    location: 'United States',
  },
  {
    id: 4,
    firstName: 'Anna',
    lastName: 'Will',
    bio: ` Anna is a highly skilled nutritionist with a strong commitment to promoting wellness through informed dietary choices. Holding a Master's degree in Nutritional Science and a wealth of experience, she brings a comprehensive understanding of the intricate relationship between nutrition and health. 
    `,
    avatar: '/images/f-user-26.jpg',
    location: 'United States',
  },
];

const sectionTimes = [30, 45, 60, 90, 120];
export default function NutritionistPage() {

  const toast = useToast({
    duration: 3000,
    position: 'top',
    status: 'success',
    title: 'Your appointment was booked successfully',
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedNutritionist, setSelectedNutritionist] =
    useState<Nutritionist | null>(null);
  const [bookingDate, setBookingDate] = useState(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showBookingDetails, setShowBookingDetails] = useState(false);
  const [sectionDuration, setSectionDuration] = useState(30);

  const minsToMillisec = (mins: number) => +mins * 1000 * 60;

  const handleClick = (nutritionist: Nutritionist) => {
    onOpen();
    setSelectedNutritionist(nutritionist);
  };
  const handleDateSelect = (date: Date) => {
    setBookingDate(date);
    setShowBookingDetails(true);
  };
  const handleDateChange = (date: Date) => {
    setBookingDate(date);
  };
  const handleSectionDuration = (dur: number) => {
    setSectionDuration(dur);
    setShowBookingDetails(true);
  };

  function handleBookingSubmit() {
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      toast();
    }, 3000);
  }
  return (
    <Box
      className='bg-primaryYellowTrans'
      // h={'100vh'}
      px={6}
      overflowY={'auto'}
      pb={12}
    >
      <Header bg='white' />
      <Box maxW={'1300'} mx={'auto'}>
        <Heading size={'lg'} my={4} bg={'white'} py={4} px={3} rounded={'md'}>
          Find Nutritionists from around the world
        </Heading>
        <Flex gap={6} wrap={'wrap'}>
          {data.map((p, i) => {
            return (
              <Box
                key={'nutri' + i}
                bg={'white'}
                rounded={'md'}
                px={4}
                py={5}
                flex={1}
                minW={500}
              >
                <Flex align={'start'} gap={4} mb={5}>
                  <Avatar size={'lg'} src={p.avatar} />
                  <Box>
                    <Heading
                      className='text-primaryGreen'
                      as={'h3'}
                      mb={2}
                      size={'md'}
                    >
                      {p.firstName} {p.lastName}
                    </Heading>
                    <Text as={Flex} gap={1} className='text-secondaryGray'>
                      <Icon name='location_on' size={20} /> {p.location}
                    </Text>
                  </Box>
                  <Button
                    onClick={() => handleClick(p)}
                    ml={'auto'}
                    className='bg-primaryYellow text-primaryGreen'
                    gap={2}
                    rounded={'full'}
                    size={'md'}
                  >
                    <Icon size={24} name='book' /> Book an Appointment
                  </Button>
                </Flex>
                <Box>
                  <Heading
                    mb={3}
                    as={'h4'}
                    size={'md'}
                    className='text-primaryGreen'
                  >
                    About {p.firstName}
                  </Heading>
                  <Text pb={4} className='text-primaryGray'>
                    {p.bio}{' '}
                  </Text>
                </Box>
              </Box>
            );
          })}
        </Flex>
      </Box>

      <Modal size={'3xl'} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className='text-primaryGreen'>
            Booking appointment
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text className='text-secondaryGray' mb={5}>
              You&apos;re booking{' '}
              <span className='text-primaryGreen'>
                {selectedNutritionist?.firstName}{' '}
                {selectedNutritionist?.lastName}
              </span>
            </Text>
            {showBookingDetails && (
              <Box>
                <Text
                  fontWeight={'semibold'}
                  mb={2}
                  className='text-primaryGreen'
                >
                  {' '}
                  Appointment Details:
                </Text>
                <Text>
                  {' '}
                  <span className='text-secondaryGray'> Date: </span>
                  {format(bookingDate, 'E, d MMM yyyy hh:mm aaa')}
                </Text>
                <Text>
                  {' '}
                  <span className='text-secondaryGray'>Duration:</span>{' '}
                  {sectionDuration} Mins{' '}
                </Text>
              </Box>
            )}
            <Flex wrap={'wrap'} gap={6}>
              <Box>
                <Heading size={'md'} className='text-primaryGreen' my={4}>
                  Choose appointment date
                </Heading>

                <DatePicker
                  minDate={new Date()}
                  showTimeSelect
                  inline
                  selectsStart
                  selected={bookingDate}
                  onSelect={handleDateSelect} //when day is clicked
                  onChange={handleDateChange} //only when value has changed
                />
              </Box>
              <Box>
                <Heading size={'md'} className='text-primaryGreen' my={4}>
                  Section Duration
                </Heading>

                <Flex gap={4} wrap={'wrap'} maxW={350}>
                  {sectionTimes.map((dur, i) => {
                    return (
                      <Button
                        onClick={() => handleSectionDuration(dur)}
                        key={'dur' + i} variant={'ghost'}
                        className={`text-primaryGreen rounded-full px-4 py-2 border ${
                          sectionDuration === dur ? 'bg-primaryYellow' : ''
                        }`}
                      >
                        {dur} Mins
                      </Button>
                    );
                  })}
                </Flex>
              </Box>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button variant={'outline'} mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={handleBookingSubmit}
              variant='solid'
              isDisabled={isSubmitting}
              isLoading={isSubmitting}
              className='disabled:opacity-60 bg-primaryYellow text-primaryGreen'
            >
              Complete Booking
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

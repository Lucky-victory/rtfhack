import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
//import { useRouter } from 'next/router'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { uploadPromptToIpfs } from "@/helpers";
import { toast } from "react-toastify";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { countries } from "@/utils/countries";
import { Link } from "@chakra-ui/next-js";

const NutritionistForm = ({ showModal = true }: { showModal?: boolean }) => {
  //const auth = useAuth()
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [cid, setCid] = useState("");
  const [Image, setImage] = useState<File | null>(null);
  const [ImageUrl, setImageUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  // form validation rules
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Field is required"),
    sex: Yup.string().required("Field is required"),
    country: Yup.string().required("Field is required"),
    birthDate: Yup.string().required("Field is required"),
    credentials: Yup.mixed().required("Field is required"),
    // .test(
    //   'fileSize',
    //   'File size is too large',
    //   (value) =>  Array.isArray(value) && value[0]?.size <= 2048 * 2048 // 1 MB
    // )
    // .test(
    //   'fileType',
    //   'Unsupported file type',
    //   (value) =>
    //   Array.isArray(value) && ['image/jpeg', 'image/png'].includes(value[0]?.type)
    // ),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = async (data: any) => {
    //    const cid = await uploadPromptToIpfs(data);
    setIsSubmitting(true);

    setTimeout(() => {
      // router.push('/nutritionist/dashboard');
      onOpen();
      setIsSubmitting(false);
    }, 2000);
    //const {file} = data;
  };

  const handleFileChange = (e: any) => {
    setImage(e.target.files[0]);
    toast.success("Successfully added!");
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };
  const elem = [
    <>
      <h2 className="text-[45px]">Register as a Nutritionist</h2>
      <form
        className="w-full flex flex-col gap-7"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <Input
            className="w-full max-w-[100%]"
            {...register("fullName")}
            placeholder="Full name"
          />
          <div className="text-red-200">{errors.fullName?.message}</div>
        </div>
        <div>
          <Select
            className="Select w-full max-w-[100%]"
            {...register("country")}
            // placeholder="What's your biological sex?"
            defaultValue=""
          >
            <option value="" disabled>
              Select your country
            </option>

            {countries.map((country, i) => (
              <option key={"country" + i} value={country.name}>
                {country.name}
              </option>
            ))}
          </Select>
          <div className="text-red-500">{errors.country?.message}</div>
        </div>
        <div>
          <Input
            type="date"
            id="start"
            {...register("birthDate")}
            className=" w-full max-w-[100%]"
          />
          <div className="text-red-200">{errors.birthDate?.message}</div>
        </div>
        <div>
          <Select
            className="select w-full max-w-[100%]"
            {...register("sex")}
            placeholder="What's your biological sex?"
            defaultValue=""
          >
            <option value="" disabled>
              What&apos;s your biological sex?
            </option>
            <option value="name">Male</option>
            <option value="female">Female</option>
          </Select>
          <div className="text-red-200">{errors.sex?.message}</div>
        </div>
        <div>
          <Input
            type="file"
            {...register("credentials")}
            className="Input w-full max-w-[100%]"
            placeholder="Upload your credentials"
            onChange={handleFileChange}
          ></Input>
          <div className="text-red-200">{errors.credentials?.message}</div>
        </div>
        <div className="flex">
          <Button type="submit" isLoading={isSubmitting}>
            Register as a Nutritionist
          </Button>
        </div>
      </form>
    </>,
  ];
  return (
    <>
      {showModal ? (
        <div className="modal">
          <label className="modal-overlay" htmlFor="modal-3"></label>
          <div className="modal-content flex flex-col gap-5 max-w-[90%] lg:max-w-[60%] w-full">
            <label
              htmlFor="modal-3"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </label>
            {...elem}
          </div>
        </div>
      ) : (
        <form
          className="w-full flex flex-col gap-7"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <Input
              className="w-full max-w-[100%]"
              {...register("fullName")}
              placeholder="Full name"
            />
            <div className="text-red-200">{errors.fullName?.message}</div>
          </div>
          <div>
            <Input
              type="date"
              id="start"
              {...register("birthDate")}
              className=" w-full max-w-[100%]"
            />
            <div className="text-red-200">{errors.birthDate?.message}</div>
          </div>
          <div>
            <Select
              className="select w-full max-w-[100%]"
              {...register("sex")}
              placeholder="What's your biological sex?"
              defaultValue=""
            >
              <option value="" disabled>
                What&apos;s your biological sex?
              </option>
              <option value="name">Male</option>
              <option value="female">Female</option>
            </Select>
            <div className="text-red-200">{errors.sex?.message}</div>
          </div>
          <div>
            <Input
              type="file"
              {...register("credentials")}
              className="Input w-full max-w-[100%]"
              placeholder="Upload your credentials"
              onChange={handleFileChange}
            ></Input>
            <div className="text-red-200">{errors.credentials?.message}</div>
          </div>
          <div className="flex">
            <Button type="submit" isLoading={isSubmitting}>
              Register as a Nutritionist
            </Button>
          </div>
        </form>
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Application success</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight={"bold"}>
              Your application has been successfully submitted. We will contact
              you shortly.
            </Text>
            <Text>
              You can also visit the{" "}
              <Link href={"/nutritionist/check-status"}>status page</Link> to
              check your application status{" "}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            {/* <Button variant="ghost">Ch</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NutritionistForm;

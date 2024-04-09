import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  Stack,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import NutritionistDashboardLayout from "@/components/NutritionistDashboardLayout";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import ReactMde from "react-mde";

import "react-mde/lib/styles/css/react-mde-all.css";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import DragAndDropImage from "@/components/DragAndDropImage";

import { generateSlug } from "@/utils";

import { useRouter } from "next/router";
import { NewArticle, PostStatus } from "@/types/shared";
import { useAddArticleMutation } from "@/state/services";
import { shortenText } from "@/utils";
import { useAppContext } from "@/context/state";

export default function NewPostPage() {
  const [addArticle, { isLoading, status, isSuccess, isError, data }] =
    useAddArticleMutation();

  const router = useRouter();
  const toast = useToast({
    duration: 3000,
    position: "top",
    status: "success",
    title: " Successful",
  });
  const { user } = useAppContext();
  const [imageFile, setImageFile] = useState<string>();
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [contentValue, setContentValue] = useState("");
  const [post, setPost] = useState<NewArticle>({
    title: "",
    slug: "",
    content: "",
    intro: "",
    image: "",
    status: "draft",
    authId: user?.userAddress || "0xed65da3exd8fe888dce89834ae",
  });

  const [selectedTab, setSelectedTab] = useState<"write" | "preview">("write");
  const onImageChangeHandler = useCallback(
    (hasImage: boolean, files: File[], image: string) => {
      if (hasImage) {
        // setPost((prev) => ({ ...prev, image: image }));
        setImageFile(image);
        // const reader = new FileReader();

        //         reader.onload = function (e) {
        //           const base64String = e.target?.result as string;

        //           setPost((prev) => ({ ...prev, image: base64String }));
        //         };
        //         reader.readAsDataURL(files[0]);
      }
    },
    []
  );
  function saveAsDraft() {
    try {
      const postToSave = {
        ...post,
        slug: generateSlug(post.title),
        image: imageFile,
      };

      addArticle(postToSave);
    } catch (error) {
      toast({ title: "An error occurred, please try again", status: "error" });
    }
  }
  function saveAsPublished() {
    try {
      const postToSave = {
        ...post,
        status: "published" as PostStatus,
        slug: generateSlug(post.title),
        image: imageFile,
      };

      addArticle(postToSave);
    } catch (error) {
      toast({ title: "An error occurred, please try again", status: "error" });
    }
  }
  function handleEditorChange(value: string): void {
    setContentValue(value);
    setPost((prev) => ({ ...prev, content: value }));
  }

  function handleInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    const { name, value } = event.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  }
  function resetFields(): void {
    setPost({
      title: "",
      slug: "",
      content: "",
      intro: "",
      image: "",
      status: "draft",
      authId: user?.userAddress || "0xed65da3exd8fe888dce89834ae",
    });
    setContentValue("");
    setImageFile(undefined);
  }

  useEffect(() => {
    let timeoutId: string | number | NodeJS.Timeout;
    if (isSuccess) {
      resetFields();
      toast({ title: data?.message });
      timeoutId = setTimeout(() => {
        router.replace("/nutritionist/dashboard/articles");
      }, 2000);
    }
    return () => clearTimeout(timeoutId);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.message, isSuccess]);
  return (
    <>
      <NutritionistDashboardLayout>
        <Box px={4} my={5}>
          <Box bg={"gray.800"} rounded={"14px"}>
            <Flex
              pos={"sticky"}
              top={0}
              zIndex={10}
              bg={"gray.800"}
              justifyContent={"flex-end"}
              py={3}
              my={4}
              px={4}
              borderBottom={"1px"}
              borderColor={"blackTrans-15"}
            >
              {" "}
              <HStack gap={4}>
                <Button
                  isLoading={isLoading}
                  onClick={saveAsPublished}
                  rounded={"full"}
                  px={6}
                  size="md"
                >
                  Publish{" "}
                </Button>{" "}
                <Button
                  isLoading={isLoading}
                  onClick={saveAsDraft}
                  rounded={"full"}
                  variant={"outline"}
                >
                  Save as draft
                </Button>
              </HStack>
            </Flex>
            <Stack px={4} py={6} gap={3}>
              <DragAndDropImage
                onUploadChange={(hasImage, files, image) =>
                  onImageChangeHandler(hasImage, files, image)
                }
              />{" "}
              <Input
                name="title"
                value={post.title}
                onChange={handleInputChange}
                h={"auto"}
                py={2}
                placeholder="Post Title..."
                fontSize={"x-large"}
                fontWeight={"medium"}
              />
              <Textarea
                name="intro"
                value={post.intro}
                onChange={handleInputChange}
                my={4}
                maxH={"200px"}
                placeholder="A short introduction for the post..."
              ></Textarea>
              <Box py={4}>
                <ReactMde
                  value={contentValue}
                  onChange={(value: string) => handleEditorChange(value)}
                  selectedTab={selectedTab}
                  onTabChange={setSelectedTab}
                  generateMarkdownPreview={(markdown: string) =>
                    Promise.resolve(<MarkdownRenderer markdown={markdown} />)
                  }
                />
              </Box>
              <Box></Box>
            </Stack>
          </Box>
        </Box>
      </NutritionistDashboardLayout>
    </>
  );
}

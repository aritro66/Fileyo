import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { MdDriveFolderUpload } from "react-icons/md";
import { RxCopy } from "react-icons/rx";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Text,
  Stack,
  Button,
  useDisclosure,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalFooter,
  HStack,
} from "@chakra-ui/react";
import copy from "copy-to-clipboard";

export default function Home() {
  const [form, setForm] = useState({});
  const [copyURL, setCopyURL] = useState(
    "http://localhost:3000/download/rweweewteerrter"
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form.file_upload.name);
    const form_data = new FormData();

    for (let key in form) {
      form_data.append(key, form[key]);
    }

    await fetch("http://localhost:4004/form", {
      method: "POST",
      body: form_data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        toast.success("Success!!!");
      })
      .catch((err) => {
        console.log(err);
        toast.error("failed!!!, try again");
      });
    onClose();
  };
  return (
    <>
      <Box
        width={[
          "100%", // 0-30em
          "70%", // 30em-48em
          "70%", // 48em-62em
          "70%", // 62em+
        ]}
        padding="10px"
        fontFamily="'Space Mono', monospace"
      >
        <Stack spacing={5} alignItems="center">
          <Text fontSize={["28px", "28px", "30px", "32px"]} textAlign="center">
            Transfer and have your files travel for free.
          </Text>
          <Text fontSize={["14px", "14px", "16px", "18px"]} textAlign="center">
            Send files securely via a share link from a smartphone, tablet, or
            computer using any common internet browser.
          </Text>
          <Button
            leftIcon={<MdDriveFolderUpload />}
            color="white"
            bgColor="transparent"
            borderColor="white"
            borderRadius="10px"
            variant="outline"
            width="150px"
            height="55px"
            py="5px"
            px="25px"
            fontSize="25px"
            cursor="pointer"
            onClick={onOpen}
          >
            Start
          </Button>
          {copyURL.length > 0 && (
            <HStack
              backgroundColor="rgba(0, 0, 0, 0.6)"
              backdropBlur="16px"
              px="10px"
              py="5px"
              borderRadius="8px"
            >
              <Box
                maxWidth="240px"
                overflow="hidden"
                whiteSpace="nowrap"
                textOverflow="ellipsis"
              >
                {copyURL}
              </Box>

              <RxCopy
                cursor="pointer"
                onClick={() => {
                  copy(copyURL);
                  toast.success("URL coppied!!!");
                }}
              />
            </HStack>
          )}
        </Stack>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          h="210px"
          w="300px"
          fontSize="16px"
          position="fixed"
          top="calc(50% - 105px)"
          left="calc(50% - 125px)"
          p="13px 18px"
          color="white"
          backgroundColor="rgba(0, 0, 0, 0.8)"
          backdropBlur="10px"
        >
          <ModalHeader>
            <Text fontSize="24px">Fill Form</Text>
          </ModalHeader>
          <form onSubmit={handleSubmit}>
            <ModalBody py={10}>
              <Stack spacing={10}>
                <FormControl required>
                  <FormLabel>Upload File:</FormLabel>
                  <Input
                    type="file"
                    name="file_upload"
                    onChange={(e) => {
                      setForm({ ...form, [e.target.name]: e.target.files[0] });
                    }}
                    required
                  />
                </FormControl>
                <FormControl required>
                  <FormLabel>Enter password</FormLabel>
                  <Input
                    type="text"
                    name="te"
                    w="100%"
                    onChange={(e) => {
                      setForm({ ...form, [e.target.name]: e.target.value });
                    }}
                    required
                  />
                </FormControl>
              </Stack>
            </ModalBody>

            <ModalFooter>
              <Button
                type="submit"
                mr={4}
                variant="outline"
                color="#5efc03"
                bgColor="transparent"
                borderColor="#5efc03"
                borderRadius="8px"
                cursor="pointer"
                py="5px"
                px="10px"
              >
                Save
              </Button>
              <Button
                onClick={onClose}
                variant="outline"
                color="red"
                bgColor="transparent"
                borderColor="red"
                borderRadius="8px"
                cursor="pointer"
                py="5px"
                px="10px"
              >
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

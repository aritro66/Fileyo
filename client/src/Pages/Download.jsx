import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { Box, Button, FormControl, HStack, Input } from "@chakra-ui/react";
import { FaDownload } from "react-icons/fa";

export default function Download() {
  const { id } = useParams();
  console.log(id);
  const [form, setForm] = useState({});
  const [fileURL, setFileURL] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:4004/download", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ ...form, fileId: id }),
    })
      .then((res) => res.blob())
      .then((data) => {
        const objURL = URL.createObjectURL(data);
        console.log(objURL);
        setFileURL(objURL);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err);
      });
  };
  return (
    <>
      <Box h="50px" w={["260px, 290px, 310px, 340px"]}>
        <form onSubmit={handleSubmit}>
          <HStack spacing={0}>
            <FormControl required>
              <Input
                type="password"
                name="password"
                color="white"
                bgColor="transparent"
                borderColor="white"
                // borderRadius="10px"
                borderTopLeftRadius="10px"
                borderBottomLeftRadius="10px"
                h="50px"
                w={["140px, 170px, 210px, 240px"]}
                py="5px"
                px="5px"
                fontSize="15px"
                placeholder="Enter password"
                onChange={(e) => {
                  setForm({ ...form, [e.target.name]: e.target.files[0] });
                }}
                required
              />
            </FormControl>
            <Button
              leftIcon={<FaDownload />}
              type="submit"
              color="white"
              bgColor="transparent"
              borderColor="white"
              //   borderRadius="10px"
              borderTopRightRadius="10px"
              borderBottomRightRadius="10px"
              variant="outline"
              width="120px"
              height="50px"
              py="4px"
              px="4px"
              fontSize="15px"
              cursor="pointer"
            >
              Download
            </Button>
          </HStack>
        </form>
      </Box>
      {/* <button onClick={handletest}>Test</button>
      <a href={fileURL} download>
        download
      </a> */}
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

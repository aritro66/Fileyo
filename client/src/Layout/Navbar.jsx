import React from "react";
import { Box, Text, Image } from "@chakra-ui/react";
import logo from "../images/file.png";

export default function Navbar() {
  return (
    <>
      <Box
        w="100%"
        h="60px"
        px="20px"
        py="8px"
        display="flex"
        alignItems="center"
        position="fixed"
        top="0px"
        backgroundColor="rgba(0, 0, 0, 0.6)"
        backdropBlur="16px"
      >
        <Image src={logo} h="35px" w="35px" mr="10px" />
        <Text fontSize="35px" fontFamily="'Open Sans', sans-serif">
          Fileyo
        </Text>
      </Box>
    </>
  );
}

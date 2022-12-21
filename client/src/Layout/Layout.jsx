import React from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Text,
  Stack,
} from "@chakra-ui/react";
import Navbar from "./Navbar";
import logo from "../images/filebg.jpg";

export default function Layout({ children }) {
  return (
    <>
      <Box
        backgroundImage={`linear-gradient(180deg, rgba(0,0,0,0.8), rgba(0,0,0,0.8)),url(${logo})`}
        bgPos="center"
        bgSize="100% 100%"
        h="100%"
        w="100%"
        minH="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        color="#fff"
        px="15px"
        pt="60px"
        pb="20px"
      >
        <Navbar />
        {children}
      </Box>
    </>
  );
}

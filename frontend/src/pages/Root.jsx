import { Box, Divider } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Footer from "../components/sections/Footer";
import Nav from "../components/sections/Nav";

const Root = () => {
  return (
    <>
      <Nav />
      <Box maxW="92%" mx="auto">
        <Divider />
        <Outlet />
      </Box>
      <Footer />
    </>
  );
};

export default Root;

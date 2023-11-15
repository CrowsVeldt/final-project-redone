import { Outlet } from "react-router-dom";
import Nav from "../components/sections/Nav";
import { Box, Divider } from "@chakra-ui/react";

const Root = () => {
  return (
    <>
      <Nav />
      <Box maxW="92%" mx="auto">
        <Divider />
        <Outlet />
        {/* <Footer /> */}
      </Box>
    </>
  );
};

export default Root;

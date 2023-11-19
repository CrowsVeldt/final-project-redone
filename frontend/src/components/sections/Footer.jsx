import { Box, Button, ButtonGroup, Link as Chlink } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const navButtonStyles = {
  _hover: {
    cursor: "pointer",
    border: "2px",
    borderColor: "black",
  },

  fontSize: ["16px", "16px", "20px"],
  border: "2px transparent solid",
};

const Footer = () => {
  return (
    <Box bottom="0" left="0" width="100%" bg="twitter.200">
      <ButtonGroup w={"35%"}>
        <Link to="/about">
          <Button
            sx={navButtonStyles}
            variant="outline"
            onClick={() => console.log("about")}
          >
            About
          </Button>
        </Link>

        <Link to="/contact">
          <Button sx={navButtonStyles} variant="outline">
            Contact
          </Button>
        </Link>

        <Link to="/blog">
          <Button sx={navButtonStyles} variant="outline">
            Blog
          </Button>
        </Link>

        <Link to="/support">
          <Button sx={navButtonStyles} variant="outline">
            Tech support
          </Button>
        </Link>
      </ButtonGroup>
    </Box>
  );
};

export default Footer;

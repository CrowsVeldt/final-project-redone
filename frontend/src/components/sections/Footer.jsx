import { Box, Button, ButtonGroup, Link, Text } from "@chakra-ui/react";

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
    <Box>
      <ButtonGroup w={"35%"}>
        <Link to="/about">
          <Button sx={navButtonStyles} variant="outline">
            About
          </Button>
        </Link>

        <Link to="/contact">
          <Button sx={navButtonStyles} variant="outline">
            Contact
          </Button>
        </Link>
      </ButtonGroup>
    </Box>
  );
};

export default Footer;

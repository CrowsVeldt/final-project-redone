import { Box, Button, ButtonGroup, Flex, Icon, Text } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HowToRegIconOutlined from "@mui/icons-material/HowToRegOutlined";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AuthContext from "../../context/AuthContext";
import useLogout from "../../hooks/useLogout";

const Nav = () => {
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const logout = useLogout();

  const navStyles = {
    display: [isOpen ? "flex" : "none", "flex"],
    gap: 5,
    p: [2, 5, 7],
  };

  const navButtonStyles = {
    _hover: {
      cursor: "pointer",
      border: "2px",
      borderColor: "black",
    },

    fontSize: ["16px", "16px", "20px"],
    border: "2px transparent solid",
  };

  const hamburgerStyles = {
    _hover: {
      cursor: "pointer",
      border: 0,
      borderColor: "none",
    },
    left: 0,
    border: "none",
    display: ["inherit", "none"],
  };

  const handleMenuClick = () => {
    setIsOpen(!isOpen);
  };

  const NavButton = ({ children }) => {
    return (
      <Button sx={navButtonStyles} variant="outline">
        {children}
      </Button>
    );
  };

  return (
    <Box position="sticky" w="100%" top="0" zIndex="2" bg="twitter.200" py={3}>
      <Button
        onClick={handleMenuClick}
        sx={hamburgerStyles}
        size="lg"
        variant="outline"
      >
        <Icon as={MenuOutlinedIcon} />
      </Button>
      <Flex
        justifyContent="space-between"
        alignItems={["baseline", "center"]}
        direction={["column", "row"]}
        sx={navStyles}
      >
        <ButtonGroup w="35%">
          <Link to="/">
            <NavButton>
              <Icon as={HomeOutlinedIcon} />
            </NavButton>
          </Link>
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
        <ButtonGroup w="35%" justifyContent={["start", "end"]}>
          {
            <Button
              sx={navButtonStyles}
              variant={"outline"}
              onClick={null /* open shopping cart */}
            >
              <Icon as={ShoppingCartOutlinedIcon} />
              Cart
            </Button>
          }
          {!user && (
            <Link to="/login">
              <Button sx={navButtonStyles} variant="outline">
                <Icon as={LoginIcon} />
                Login
              </Button>
            </Link>
          )}
          {!user && (
            <Link to="/register">
              <Button sx={navButtonStyles} variant="outline">
                <Icon as={HowToRegIconOutlined} />
                Register
              </Button>
            </Link>
          )}
          {user && (
            <Button sx={navButtonStyles} variant="outline" onClick={logout}>
              <Icon as={LogoutIcon} />
              Logout
            </Button>
          )}
          {user && (
            <Link to="/profile">
              <Button sx={navButtonStyles} variant="outline">
                <Icon as={PersonOutlinedIcon} />
                <Text ml={1}>{user?.user?.user_name}</Text>
              </Button>
            </Link>
          )}
        </ButtonGroup>
      </Flex>
    </Box>
  );
};

export default Nav;

import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  Link as Chlink,
  Icon,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
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
import { AuthContext } from "../../context/AuthContext";
import useLogout from "../../hooks/useLogout";
import ShoppingCartModal from "./ShoppingCart";

export default function Nav() {
  const { user } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const logout = useLogout();

  const navStyles = {
    display: [menuOpen ? "flex" : "none", "flex"],
    gap: 5,
    p: [2, 5, 7],
  };

  const navButtonStyles = {
    _hover: {
      cursor: "pointer",
      border: "2px",
      borderColor: "black",
    },

    width: "100%",
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
    setMenuOpen(!menuOpen);
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
        alignItems={["center"]}
        direction={["column", "row"]}
        sx={navStyles}
      >
        <ButtonGroup w="35%">
          <Chlink as={Link} to="/">
            <NavButton>
              <Icon as={HomeOutlinedIcon} boxSize={[null, "2em"]} />
            </NavButton>
          </Chlink>
        </ButtonGroup>
        <ButtonGroup w="40%" flexDirection={["column", "row"]}>
          {}
          <FormControl id="shopping-cart-modal-control">
            <Button sx={navButtonStyles} variant={"outline"} onClick={onOpen}>
              <Icon as={ShoppingCartOutlinedIcon} />
              Cart
            </Button>
          </FormControl>
          {!user && (
            <Chlink as={Link} to="/login">
              <Button sx={navButtonStyles} variant="outline">
                <Icon as={LoginIcon} />
                Login
              </Button>
            </Chlink>
          )}
          {!user && (
            <Chlink as={Link} to="/register">
              <Button sx={navButtonStyles} variant="outline">
                <Icon as={HowToRegIconOutlined} />
                Register
              </Button>
            </Chlink>
          )}
          {user && (
            <Button sx={navButtonStyles} variant="outline" onClick={logout}>
              <Icon as={LogoutIcon} />
              Logout
            </Button>
          )}
          {user && (
            <Chlink as={Link} to="/profile">
              <Button sx={navButtonStyles} variant="outline">
                <Icon as={PersonOutlinedIcon} />
                <Text ml={1}>{user?.user?.user_name}</Text>
              </Button>
            </Chlink>
          )}
        </ButtonGroup>
      </Flex>
      {isOpen && (
        <ShoppingCartModal id="shopping-cart-modal" fun={{ isOpen, onClose }} />
      )}
    </Box>
  );
}

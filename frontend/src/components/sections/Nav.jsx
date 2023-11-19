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
  Badge,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HowToRegIconOutlined from "@mui/icons-material/HowToRegOutlined";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { AuthContext } from "../../context/AuthContext";
import useLogout from "../../hooks/useLogout";
import ShoppingCartModal from "./ShoppingCart";
import { hamburgerStyles, navButtonStyles, navStyles } from "../styles";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const logout = useLogout();

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
        sx={navStyles(menuOpen)}
      >
        <ButtonGroup w="35%">
          <Chlink as={Link} to="/">
            <NavButton>
              <Icon as={HomeOutlinedIcon} boxSize={[null, "2em"]} />
            </NavButton>
          </Chlink>
        </ButtonGroup>
        <ButtonGroup w="40%" flexDirection={["column", "row"]}>
          <FormControl id="shopping-cart-modal-control">
            <ShoppingCartModal id="shopping-cart-modal" />
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
    </Box>
  );
}

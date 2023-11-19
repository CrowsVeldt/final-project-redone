import {
  Badge,
  Box,
  Button,
  Divider,
  Icon,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { CartContext } from "../../context/CartContext";
import CartItem from "../product/CartItem";
import { navButtonStyles } from "../styles";

export default function ShoppingCartModal() {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalProducts, setTotalProducts] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { cartItems } = useContext(CartContext);
  const nav = useNavigate();

  useEffect(() => {
    const price = cartItems.reduce((a, b) => {
      return (a += b.product_price * b.quantity);
    }, 0);
    setTotalPrice(price);
  }, [cartItems]);

  useEffect(() => {
    const productNumber = cartItems.reduce((a, b) => {
      return (a += b.quantity);
    }, 0);
    setTotalProducts(productNumber);
  }, [cartItems]);

  return (
    <>
      <Button sx={navButtonStyles} variant={"outline"} onClick={onOpen}>
        {cartItems.length > 0 && (
          <Badge
            fontSize={"2xs"}
            colorScheme="purple"
            position={"relative"}
            left={"1.6rem"}
            bottom={"0.35rem"}
            borderRadius={"full"}
          >
            {totalProducts}
          </Badge>
        )}
        <Icon as={ShoppingCartIcon} fontSize={"4xl"} />
        Cart
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Shopping cart</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              {cartItems.map((item, index) => {
                return (
                  <Box key={index}>
                    <CartItem product={item} />
                    <Divider />
                  </Box>
                );
              })}
              {cartItems ? `Total: $${totalPrice}` : ""}
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              onClick={() => {
                onClose();
                nav("/checkout", {
                  state: {
                    items: cartItems,
                  },
                });
              }}
            >
              Checkout
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

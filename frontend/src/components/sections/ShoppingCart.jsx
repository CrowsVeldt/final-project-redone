import {
  Box,
  Button,
  Divider,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import CartItem from "../product/CartItem";

export default function ShoppingCartModal(props) {
  const { isOpen, onClose } = props.fun;
  const { cartItems } = useContext(CartContext);
  const nav = useNavigate();

  return (
    <>
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
              {cartItems
                ? `Total: $${cartItems.reduce((a, b) => {
                    return (a += b.product_price * b.quantity);
                  }, 0)}`
                : ""}
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              onClick={() => {
                onClose();
                nav("/checkout");
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

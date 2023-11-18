import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Divider,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import CartItem from "../product/cartItem";

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
                  <Box>
                    <CartItem product={item} key={index} />
                    <Divider />
                  </Box>
                );
              })}
              {cartItems
                ? `Total: $${cartItems.reduce((a, b) => {
                    return (a += b.product_price);
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
                nav("/");
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

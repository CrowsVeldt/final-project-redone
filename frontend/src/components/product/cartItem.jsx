import { Button, CloseButton, Flex, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

export default function CartItem(props) {
  const { addToCart, removeFromCart } = useContext(CartContext);
  const { product } = props;

  return (
    <Flex justifyContent={"space-between"}>
      <Flex direction={"column"}>
        <Flex>
          <Text>{product.product_name}</Text>
          <Flex ms={"10"}>
            <Button
              variant={"ghost"}
              h={"1.5em"}
              onClick={() => {
                removeFromCart(product);
              }}
            >
              {"-"}
            </Button>
            <Text>{`(${product.quantity})`}</Text>
            <Button
              variant={"ghost"}
              h={"1.5em"}
              onClick={() => {
                addToCart(product);
              }}
            >
              {"+"}
            </Button>
          </Flex>
        </Flex>
        <Text>{`$${product.product_price * product.quantity}`}</Text>
      </Flex>
      <CloseButton onClick={() => removeFromCart(product, true)} />
    </Flex>
  );
}

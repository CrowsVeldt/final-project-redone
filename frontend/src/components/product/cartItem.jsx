import { Button, CloseButton, Td, Tr } from "@chakra-ui/react";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

export default function CartItem(props) {
  const { addToCart, removeFromCart } = useContext(CartContext);
  const { product } = props;

  return (
    <Tr>
      <Td>{product.product_name}</Td>
      <Td>{product.product_image}</Td>
      <Td>{`$${product.product_price}`}</Td>
      <Td>
        <Button
          variant={"ghost"}
          h={"1.5em"}
          onClick={() => {
            removeFromCart(product);
          }}
        >
          {"-"}
        </Button>
      </Td>
      <Td>{product.quantity}</Td>
      <Td>
        <Button
          variant={"ghost"}
          h={"1.5em"}
          onClick={() => {
            addToCart(product);
          }}
        >
          {"+"}
        </Button>
      </Td>
      <CloseButton onClick={() => removeFromCart(product, true)} />
    </Tr>
  );
}

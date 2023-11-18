import { Box, CloseButton, Flex, Text } from "@chakra-ui/react";

export default function CartItem(props) {
  return (
    <Flex key={props.key}>
      <Flex direction={"column"}>
        <Flex direction={"row"}>
          <Text>{props.product.product_name}</Text>
          <Text ms={"1"}>{`(${props.product.quantity})`}</Text>
        </Flex>
        <Text>{`$${props.product.product_price}`}</Text>
      </Flex>
      <CloseButton justifySelf={"end"} onClick={(e) => console.log(e.target)} />
    </Flex>
  );
}

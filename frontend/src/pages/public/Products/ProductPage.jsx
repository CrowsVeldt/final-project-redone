import axios from "../../../api/axios";
import { Box, Heading, Image, Text } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";

export const loader = async ({ request, params }) => {
  try {
    const product = await axios.post(
      "/products/by-id",
      { data: params.productId },
      { withCredentials: true }
    );

    const data = product.data;

    //const categories = await axios.get("categories/all");

    return data;
    // category: categories.data.find((i) => i._id === data.category).name,
  } catch (err) {
    return err.response;
  }
};

export default function SingleProductPage() {
  const data = useLoaderData();
  console.log(data);

  return (
    <Box>
      <Image
        src={data.product_image}
        fallbackSrc={"https://placehold.co/400"}
        alt={`${data} image`}
      />
      {data && <Heading>{data.product_name}</Heading>}
      <Text>Price: {`$${data.product_price}`}</Text>
      <Text>Description: {data.product_description}</Text>
      <Text>Category: {data.product_category}</Text>
      <Text>Brand: {data.product_brand}</Text>
    </Box>
  );
}

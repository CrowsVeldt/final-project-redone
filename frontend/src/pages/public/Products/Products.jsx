import { useState, useContext, useEffect } from "react";
import axios from "../../../api/axios";
import { useLoaderData } from "react-router-dom";
import { Box, Flex, Text, Heading, Divider } from "@chakra-ui/react";
import localforage from "localforage";
import ProductCard from "../../../components/product/ProductCard";
import { CartContext } from "../../../context/CartContext";
import Pagination from "./Pagination";

export const getAllProducts = async () => {
  try {
    const {
      data: { products },
    } = await axios.get("/products/customers/all");
    return products;
  } catch (error) {
    return error;
  }
};

const Products = () => {
  const initialProducts = useLoaderData();
  const [products, setProducts] = useState([...initialProducts]);
  const { cartItems, setCartItems } = useContext(CartContext);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    localforage.getItem(`main page`, (err, val) => {
      if (!err && val) {
        setCurrentPage(val);
      } else {
        console.log(err);
      }
    });
  });

  const productPerPage = 4;
  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const addToCart = (item) => {
    // does item exist on cart?
    const isItemExist = cartItems.find((cartItem) => cartItem._id === item._id);
    // if it does, update quantity by 1+
    if (isItemExist) {
      const updatedCartItems = cartItems.map((cartItem) => {
        if (cartItem._id === item._id) {
          return { ...cartItem, quantity: cartItem.quantity + 1 };
        }
        return cartItem;
      });

      setCartItems(updatedCartItems);
    } else {
      // if not add new item to cart
      setCartItems((prev) => [...prev, { ...item, quantity: 1 }]);
    }
  };

  const handlePageChange = (page) => {
    localforage.setItem(`main page`, page, (err, val) => {
      if (!err) {
        setCurrentPage(val);
      } else {
        console.log(err);
      }
    });
  };

  return (
    <Box minH="65vh" py={10} px={4}>
      <Heading>Home</Heading>

      <Text my={5}>
        Welcomt to our online store for furniture, Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Aliquid incidunt cupiditate ipsam dolorem
        consequuntur, quasi quidem illo fugiat aliquam, eveniet, suscipit
        pariatur? Fugiat eius commodi, nemo aut incidunt sint dolorem. Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Laborum
        exercitationem eveniet consequatur
      </Text>
      <Heading my={5}>Products</Heading>
      <Pagination
        currentPage={currentPage}
        productsPerPage={productPerPage}
        totalProducts={products.length}
        onPageChange={handlePageChange}
      />
      <Divider />
      <Flex
        direction={["column", "column", "row", "row"]}
        flexWrap="wrap"
        my={6}
        justifyContent="space-between"
      >
        {currentProducts.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            addToCart={addToCart}
          >
            {product.product_name}
          </ProductCard>
        ))}
      </Flex>
      <Pagination
        currentPage={currentPage}
        productsPerPage={productPerPage}
        totalProducts={products.length}
        onPageChange={handlePageChange}
      />
    </Box>
  );
};

export default Products;

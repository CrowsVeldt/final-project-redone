import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "../../api/axios";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../../components/inputs/PasswordInput";

const Login = () => {
  const { user, setUser } = useContext(AuthContext);
  const [values, setValues] = useState({
    user_email: "",
    user_password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user_email, user_password } = values;

      const response = await axios.post(
        "/users/customers/login",
        {
          user_email,
          user_password,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      toast.success(response?.data?.message, { position: "bottom-right" });
      setUser({
        user: response?.data.user,
        accessToken: response?.data.customerToken,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data.message, { position: "bottom-right" });
    }
  };
  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      minH="65vh"
      maxW="600px"
      mx="auto"
      py={10}
      px={4}
    >
      <Heading as="h1" size="xl" mb={5}>
        Login
      </Heading>
      <FormControl isRequired mb={4}>
        <FormLabel>Email Address</FormLabel>
        <Input
          name="user_email"
          type="text"
          placeholder="Type in your Email"
          value={values.user_email}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl isRequired mb={4}>
        <PasswordInput
          name="user_password"
          placeholder="Password"
          value={values.user_password}
          state={handleChange}
        />
      </FormControl>

      <Button type="submit" colorScheme="teal" size="lg" mb={4}>
        Login
      </Button>
      {/* text for "have account? -> link to login" */}
    </Box>
  );
};

export default Login;

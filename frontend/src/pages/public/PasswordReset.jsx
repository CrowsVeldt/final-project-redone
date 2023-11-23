import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "../../api/axios";

export default function PasswordReset() {
  const [email, setEmail] = useState("");

  const handlePasswordReset = async () => {
    try {
      const response = await axios.post("/mailer/send-password-reset-link", {
        user_email: email,
      });

      toast.success(`Please check your email for a reset link`);
    } catch (error) {
      toast.error(
        `Something went wrong! Please check the email address. If it is correct, try again later.`
      );
    }
  };
  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <Box
      as="form"
      onSubmit={handlePasswordReset}
      minH="65vh"
      maxW="600px"
      mx="auto"
      py={10}
      px={4}
    >
      <FormControl isRequired mb={4}>
        <FormLabel>Email Address</FormLabel>
        <Input
          name="user_email"
          type="text"
          placeholder="Type in your Email"
          value={email}
          onChange={handleChange}
        />
      </FormControl>
      <Button onClick={handlePasswordReset}>Reset</Button>
    </Box>
  );
}

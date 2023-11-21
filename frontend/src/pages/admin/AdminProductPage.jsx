import { Box, Heading, Input } from "@chakra-ui/react";
import { convertToBase64 } from "../../utils/fileFuncs";
import { privateAxios } from "../../api/axios";
import { useState } from "react";

export default function AdminProductPage() {
  const [value, setValue] = useState(null);
  const axiosPrivateRoute = privateAxios();

  const handleFilePicker = async () => {
    try {
      const response = await axiosPrivateRoute.put(
        null /* route to update product */,
        value
      );

      toast.success(response?.data?.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e?.target?.files[0];
    const base64image = await convertToBase64(file);
    setValue(base64image(value));
  };

  return (
    <Box>
      <Heading>Product</Heading>

      <Input
        name="product_image"
        type="file"
        onChange={handleFileUpload}
        accept=".jpeg, .png, .jpg"
      />
    </Box>
  );
}

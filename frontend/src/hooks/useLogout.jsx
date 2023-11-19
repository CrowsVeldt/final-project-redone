import { useContext } from "react";
import { toast } from "react-toastify";
import useAxiosPrivate from "./useAxiosPrivate";
import { AuthContext } from "../context/AuthContext";

const useLogout = () => {
  const { setUser } = useContext(AuthContext);
  const axiosPrivateRoutes = useAxiosPrivate();

  const logout = async () => {
    setUser(null);
    try {
      await axiosPrivateRoutes.post("/users/customers/logout");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data.message);
    }
  };

  return logout;
};

export default useLogout;

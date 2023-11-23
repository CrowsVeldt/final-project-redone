import { Box, Button } from "@chakra-ui/react";
import PasswordInput from "../../components/inputs/PasswordInput";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "../../api/axios";

export default function ForgotPassword() {
  const [data, setData] = useState(false);
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [message, setMessage] = useState("");

  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const emailToken = location.search.split("=")[1];

  const isUserValid = async () => {
    try {
      const { data } = await axios.get(`/mailer/forgot-password/${id}`, {
        headers: {
          email_verify_token: emailToken,
        },
      });

      if (data.status === 201) {
        console.log("User Valid");
      } else {
        navigate("/");
        toast.error("Invalid link");
      }
    } catch (error) {
      navigate("/");
      toast.error("Invalid link");
    }
  };

  const setPasswordValue = (e) => {
    setPassword(e.target.value);
  };

  const setRepeatPasswordValue = (e) => {
    setRepeatPassword(e.target.value);
  };

  const updatePassword = async (e) => {
    e.preventDefault();

    if (password === "" || repeatPassword === "") {
      toast.error("Password is required");
    } else if (password.length < 2) {
      toast.error("Password must be more than 2 characters");
    } else {
      const { data } = await axios.post(`/mailer/update-password/${id}`, {
        user_password: password,
        email_verify_token: emailToken,
      });
    }
  };

  useEffect(() => {
    isUserValid();
    setTimeout(() => {
      setData(true);
    }, 1000);
  }, []);

  if (user) {
    return navigate("/");
  }

  return (
    <>
      {data ? (
        <Box onSubmit={updatePassword}>
          <PasswordInput
            id="password-reset-input"
            placeholder="Password"
            name="password"
            value={password}
            state={setPasswordValue}
          />
          <PasswordInput
            id="repeat-password-reset-input"
            placeholder="Repeat password"
            name="password-repeat"
            value={repeatPassword}
            state={setRepeatPasswordValue}
          />
          <Button type="submit" colorScheme="teal">
            Reset
          </Button>
        </Box>
      ) : (
        <Box>
          <PasswordInput
            id="password-reset-input"
            placeholder="Password"
            name="password"
            value={password}
            state={setPasswordValue}
          />
          <PasswordInput
            id="repeat-password-reset-input"
            placeholder="Repeat password"
            name="password-repeat"
            value={repeatPassword}
            state={setRepeatPasswordValue}
          />
          <Button type="submit" colorScheme="teal">
            Reset
          </Button>
        </Box>
      )}
    </>
  );
}

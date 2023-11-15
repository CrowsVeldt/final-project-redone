import { useState } from "react";
import {
  InputGroup,
  Input,
  Button,
  InputRightElement,
  FormLabel,
  FormControl,
} from "@chakra-ui/react";

export default function PasswordInput(props) {
  const [show, setShow] = useState(false);
  const setPassword = props.state;
  const handleClick = () => setShow(!show);
  // set id in parent element
  // parent element should have state [password, setPassword]
  // PasswordInput receives {setPassword} as a prop

  return (
    <FormControl isRequired>
      <FormLabel htmlFor={`${props.id}-password-input`}>
        {props.placeholder}
      </FormLabel>
      <InputGroup size="md">
        <Input
          pr="4.5rem"
          type={show ? "text" : "password"}
          placeholder={props.placeholder}
          id={`${props.id}-password-input`}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <InputRightElement width="4.5rem">
          <Button
            h="1.75rem"
            id={`${props.id}-button`}
            size="sm"
            onClick={handleClick}
          >
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );
}

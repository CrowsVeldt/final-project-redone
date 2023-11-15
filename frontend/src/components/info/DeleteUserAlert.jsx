import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function DeleteUserAlert(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, deleteUser } = useContext(UserContext);
  const cancelRef = React.useRef();

  return (
    <>
      <Button id={props.id} colorScheme="red" onClick={onOpen}>
        Delete Account
      </Button>

      {isOpen && (
        <AlertDialog
          id="delete-account-alert"
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay id="delete-account-alert-overlay">
            <AlertDialogContent id="delete-account-alert-content">
              <AlertDialogHeader
                fontSize="lg"
                fontWeight="bold"
                id="delete-account-alert-header"
              >
                Delete Account
              </AlertDialogHeader>

              <AlertDialogBody id="delete-account-alert-body">
                Are you sure? You can't undo this action afterwards.
              </AlertDialogBody>

              <AlertDialogFooter id="delete-account-alert-footer">
                <Button
                  ref={cancelRef}
                  onClick={onClose}
                  id="delete-account-alert-cancel"
                >
                  Cancel
                </Button>
                <Button
                  id="delete-account-alert-action"
                  colorScheme="red"
                  onClick={() => {
                    deleteUser(user.email);
                    onClose();
                  }}
                  ml={3}
                >
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      )}
    </>
  );
}

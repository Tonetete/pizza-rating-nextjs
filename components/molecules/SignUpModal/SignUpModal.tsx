import { useState } from "react";
import { AddToast, useToasts } from "react-toast-notifications";
import { useForm } from "react-hook-form";
import Modal from "../Modal";
import Button from "../../atoms/Button";
import { registerUser } from "../../../pages/api/register";

interface SignUpModalProps {
  setShowModal: (flag: boolean) => void;
  showModal: boolean;
}

interface RegisterData {
  username: string;
  name: string;
  password: string;
  addToast: AddToast;
  setErrorMessage: (message: string) => void;
  setShowModal: (flag: boolean) => void;
}

const signUp = async ({
  username,
  name,
  password,
  addToast,
  setErrorMessage,
  setShowModal,
}: RegisterData) => {
  setErrorMessage("");
  const response = await registerUser({
    username,
    name,
    password,
  });
  const parseResponse = await response.json();
  if (response.status !== 200) {
    setErrorMessage(parseResponse.response);
  } else {
    setShowModal(false);
    addToast("User registered succesfully!", {
      appearance: "success",
    });
  }
};

const SignUpModal = ({ setShowModal, showModal }: SignUpModalProps) => {
  const [errorMessage, setErrorMessage] = useState("");
  const { addToast } = useToasts();
  const { register, handleSubmit, errors } = useForm();
  return (
    <Modal
      title="Register Form User"
      onCloseCb={() => setShowModal(false)}
      show={showModal}
      submitText="Register Form User"
    >
      <div>
        <form
          onSubmit={handleSubmit((params: RegisterData) => {
            signUp({ ...params, addToast, setShowModal, setErrorMessage });
          })}
        >
          <label className="modal-label">Name:</label>
          <input
            ref={register({
              required: "Name required",
            })}
            name="name"
            className="modal-input"
            type="text"
          />
          {errors.name && (
            <span className="error-message">{errors.name.message}</span>
          )}
          <label className="modal-label">Username:</label>
          <input
            ref={register({
              required: "Username required",
            })}
            name="username"
            className="modal-input"
            type="text"
          />
          {errors.username && (
            <span className="error-message">{errors.username.message}</span>
          )}

          <label className="modal-label">Password:</label>
          <input
            ref={register({
              required: "Password required",
            })}
            name="password"
            className="modal-input"
            type="password"
          />
          {errors.username && (
            <span className="error-message">{errors.password.message}</span>
          )}

          {errorMessage && (
            <span className="error-message">{errorMessage}</span>
          )}

          <Button type="submit">Register</Button>
        </form>
      </div>
    </Modal>
  );
};

export default SignUpModal;

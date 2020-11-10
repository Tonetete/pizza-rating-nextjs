import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { CLIENT_URL } from "../../../config/config";
import Modal from "../Modal";
import Button from "../../atoms/Button";
import { useContext, useState } from "react";
import { MainContext } from "../../../pages";

interface LoginModalProps {
  setLoggedUsername: (username: string) => void;
  setShowModal: (flag: boolean) => void;
  showModal: boolean;
}

interface LoginData {
  username: string;
  password: string;
  actions: any;
  setErrorUser: (flag: boolean) => void;
  setLoggedUsername: (username: string) => void;
  setShowModal: (flag: boolean) => void;
}

const loginUser = async ({
  username,
  password,
  actions,
  setErrorUser,
  setLoggedUsername,
  setShowModal,
}: LoginData) => {
  setErrorUser(false);
  const response = await fetch(
    `${CLIENT_URL}/api/login?username=${username}&password=${password}`
  );

  if (response.status === 200) {
    const user = await response.json();
    Cookies.set("userId", user.response[0].id);
    Cookies.set("username", user.response[0].username);
    Cookies.set("name", user.response[0].name);
    setLoggedUsername(user.response[0].name);
    actions.setUserId(user.response[0].id);
    setShowModal(false);
  } else {
    setErrorUser(true);
  }
};

const LoginModal = ({
  setShowModal,
  showModal,
  setLoggedUsername,
}: LoginModalProps) => {
  const actions = useContext(MainContext);
  const [errorUser, setErrorUser] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  return (
    <Modal
      title="Login"
      onCloseCb={() => setShowModal(false)}
      show={showModal}
      submitText="Login"
    >
      <div>
        <form
          id="form"
          onSubmit={handleSubmit((params: LoginData) => {
            loginUser({
              ...params,
              actions,
              setLoggedUsername,
              setShowModal,
              setErrorUser,
            });
          })}
        >
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

          {errorUser && <span className="error-message">No user found.</span>}

          <Button type="submit">Login</Button>
        </form>
      </div>
    </Modal>
  );
};

export default LoginModal;

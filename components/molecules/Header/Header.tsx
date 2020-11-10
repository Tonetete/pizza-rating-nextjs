import { useContext, useState } from "react";
import styled from "styled-components";
import Cookies from "js-cookie";
import Button from "../../atoms/Button";
import SignUpModal from "../SignUpModal";
import LoginModal from "../LoginModal";
import { MainContext } from "../../../pages";

const HeaderStyled = styled.div`
  background-color: #f5f5f5;
  height: 100px;
  width: auto;

  input[type="text"],
  input[type="password"] {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    box-sizing: border-box;
  }

  .error-message {
    color: red;
    display: block;
  }

  .login-user {
    float: right;
  }
`;

const logoutUser = async ({ actions }: any) => {
  Cookies.remove("userId");
  Cookies.remove("username");
  Cookies.remove("name");
  actions.setUserId(null);
};

const Header = () => {
  const username = Cookies.get("username");
  const [showModalSignUp, setShowModalSignUp] = useState(false);
  const [showModalLogin, setShowModalLogin] = useState(false);
  const [loggedUsername, setLoggedUsername] = useState(username || null);
  const actions = useContext(MainContext);

  const HeaderContent = !loggedUsername ? (
    <div className="login-user">
      <Button onClick={() => setShowModalSignUp(true)}>Sign Up</Button>
      <Button onClick={() => setShowModalLogin(true)}>Login</Button>
    </div>
  ) : (
    <div className="login-user">
      <p>
        Logged as {loggedUsername}{" "}
        <a onClick={() => logoutUser({ actions })} href="">
          Log Out
        </a>
      </p>
    </div>
  );

  return (
    <HeaderStyled>
      {HeaderContent}
      <SignUpModal
        setShowModal={setShowModalSignUp}
        showModal={showModalSignUp}
      />
      <LoginModal
        setShowModal={setShowModalLogin}
        showModal={showModalLogin}
        setLoggedUsername={setLoggedUsername}
      />
    </HeaderStyled>
  );
};

export default Header;

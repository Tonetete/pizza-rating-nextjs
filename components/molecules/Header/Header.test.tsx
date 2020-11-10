import { act, create } from "react-test-renderer";
import Cookies from "js-cookie";
import Header from "./Header";

jest.mock("../SignUpModal", () => ({ showModal }) =>
  showModal ? <div>SignUpModal</div> : null
);
jest.mock("../LoginModal", () => ({ showModal }) =>
  showModal ? <div>LoginModal</div> : null
);

const renderComponent = (props = {}) => create(<Header />);

describe("Header Unit Test", () => {
  it("WHEN render component THEN should be defined", () => {
    const Component = renderComponent();
    expect(Component).toBeDefined();
  });

  it("WHEN click Sign Up button THEN should be modal rendered", () => {
    const Component = renderComponent();
    const SignUpButton = Component.root.findAllByType("button")[0];
    act(() => {
      SignUpButton.props.onClick();
    });

    const SignUpModal = Component.root.findAllByProps({
      children: "SignUpModal",
    });

    expect(SignUpModal[0]).toBeDefined();
  });

  it("WHEN click Login button THEN should be modal rendered", () => {
    const Component = renderComponent();
    const LoginButton = Component.root.findAllByType("button")[1];

    act(() => {
      LoginButton.props.onClick();
    });

    const LoginModal = Component.root.findAllByProps({
      children: "LoginModal",
    });

    expect(LoginModal[0]).toBeDefined();
  });

  it("WHEN username is defined in the cookies THEN should render username and logout", () => {
    // @ts-ignore
    jest.spyOn(Cookies, "get").mockReturnValue("username");
    jest.spyOn(Cookies, "remove");
    const Component = renderComponent();

    const LogoutInfo = Component.root.findAllByProps({
      className: "login-user",
    })[0];

    const anchorLogout = LogoutInfo.findByType("a");

    anchorLogout.props.onClick();

    expect(LogoutInfo.children[0].props.children[0]).toBe("Logged as ");
    expect(LogoutInfo.children[0].props.children[1]).toBe("username");
    expect(Cookies.remove).toHaveBeenCalledWith("username");
  });
});

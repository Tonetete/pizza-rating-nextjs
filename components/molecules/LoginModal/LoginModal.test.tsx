import Cookies from "js-cookie";
import * as React from "react";
import { act, create } from "react-test-renderer";
import LoginModal from "./LoginModal";

jest.mock("js-cookie", () => ({
  set: jest.fn((value) => value),
}));

const defaultProps = () => ({
  setShowModal: (flag: boolean) => {},
  showModal: true,
  setLoggedUsername: (username: string) => {},
});

const renderComponent = (props = {}) =>
  create(<LoginModal {...defaultProps()} {...props} />);

describe("LoginModal Unit Test", () => {
  it("WHEN render component THEN should be defined", () => {
    const Component = renderComponent();

    expect(Component).toBeDefined();
  });

  it("WHEN submit form THEN must set cookies and close modal", async () => {
    jest
      // @ts-ignore
      .spyOn(React, "useContext")
      .mockReturnValue({ setUserId: (param) => {} });
    global.fetch = jest.fn((url) =>
      Promise.resolve({
        status: 200,
        json: () =>
          Promise.resolve({
            response: [{ id: 1, username: "username", name: "name" }],
          }),
      })
    ) as any;
    const Component = renderComponent();
    const Form = Component.root.findByType("form");

    await act(async () => {
      await Form.props.onSubmit();
    });

    expect(Component).toBeDefined();
    expect(Cookies.set).toHaveBeenCalled();
  });

  it("WHEN submit form and there's an error THEN must set error", async () => {
    const setUserError = jest.fn((flag: boolean) => {});
    jest
      // @ts-ignore
      .spyOn(React, "useState")
      .mockReturnValue([false, setUserError]);
    global.fetch = jest.fn((url) =>
      Promise.resolve({
        status: 400,
      })
    ) as any;
    const Component = renderComponent();
    const Form = Component.root.findByType("form");

    await act(async () => {
      await Form.props.onSubmit();
    });

    expect(Component).toBeDefined();
    expect(setUserError).toHaveBeenCalledWith(true);
  });

  it("WHEN close modal THEN must call onCloseCb", async () => {
    const Component = renderComponent();
    const Modal = Component.root.findByProps({ title: "Login" });

    Modal.props.onCloseCb();

    expect(Component).toBeDefined();
    expect(Component.root.props.showModal).toBe(true);
  });
});

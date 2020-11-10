import * as React from "react";
import { act, create } from "react-test-renderer";
import { registerUser } from "../../../pages/api/register";
import SignUpModal from "./SignUpModal";

jest.mock("react-toast-notifications", () => ({
  useToasts: () => ({
    addToast: jest.fn((message, params) => {}),
  }),
}));

jest.mock("../../../pages/api/register", () => ({
  registerUser: jest.fn(async ({ username, name, password }) =>
    Promise.resolve({
      status: 400,
      json: async () => Promise.resolve({ response: "error" }),
    })
  ),
}));

const defaultProps = () => ({
  setShowModal: (flag: boolean) => {},
  showModal: true,
});

const renderComponent = (props = {}) =>
  create(<SignUpModal {...defaultProps()} {...props} />);

describe("SignUpModal Unit Test", () => {
  it("WHEN render component THEN should be defined", () => {
    const Component = renderComponent();

    expect(Component).toBeDefined();
  });

  it("WHEN submit form and there's an error response THEN must set error message", async () => {
    const setErrorMessage = jest.fn((message: string) => {});
    jest
      // @ts-ignore
      .spyOn(React, "useState")
      .mockReturnValue(["", setErrorMessage]);
    const Component = renderComponent();
    const Form = Component.root.findByType("form");

    await act(async () => {
      await Form.props.onSubmit();
    });

    expect(Component).toBeDefined();
    expect(setErrorMessage).toHaveBeenCalledWith("error");
  });

  it("WHEN submit form and there's a success response THEN must call addToast with success message", async () => {
    // @ts-ignore
    registerUser.mockImplementation(async ({ username, name, password }) =>
      Promise.resolve({
        status: 200,
        json: async () => Promise.resolve({ response: "success" }),
      })
    );
    const Component = renderComponent();
    const Form = Component.root.findByType("form");

    await act(async () => {
      await Form.props.onSubmit();
    });

    expect(Component).toBeDefined();
    expect(registerUser).toHaveBeenCalled();
  });

  it("WHEN close modal THEN must call onCloseCb", async () => {
    const Component = renderComponent();
    const Modal = Component.root.findByProps({ title: "Register Form User" });

    Modal.props.onCloseCb();

    expect(Component).toBeDefined();
    expect(Component.root.props.showModal).toBe(true);
  });
});

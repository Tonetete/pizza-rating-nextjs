import * as React from "react";
import { act, create } from "react-test-renderer";
import Modal from "./Modal";

const defaultProps = () => ({
  onCloseCb: (evt: React.SyntheticEvent) => {},
  show: true,
  title: "Modal",
  submitText: "Modal",
  children: <div>This is a Modal</div>,
});

const renderComponent = (props = {}) =>
  create(<Modal {...defaultProps()} {...props} />);

describe("Modal Unit Test", () => {
  it("WHEN render component THEN should be defined", () => {
    const Component = renderComponent();

    expect(Component).toBeDefined();
  });

  it("WHEN show is false THEN must not render modal", async () => {
    const Component = renderComponent({ show: false });

    const Modal = Component.root.findByProps({ title: "Modal" });
    expect(Modal.children.length).toBe(0);
  });

  it("WHEN show is false THEN must not render modal", async () => {
    const onCloseCb = jest.fn((evt: React.SyntheticEvent) => {});
    const Component = renderComponent({ onCloseCb });

    const Button = Component.root.findByType("button");
    Button.props.onClick();

    expect(onCloseCb).toHaveBeenCalled();
  });
});

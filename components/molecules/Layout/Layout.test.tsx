import { act, create } from "react-test-renderer";
import Layout from "./Layout";

jest.mock("../Header", () => () => <div>Header</div>);

const defaultProps = () => ({
  children: <div className="main">This is a Content</div>,
});

const renderComponent = (props = {}) =>
  create(<Layout {...defaultProps()} {...props} />);

describe("Layout Unit Test", () => {
  it("WHEN render component THEN should be defined", () => {
    const Component = renderComponent();

    expect(Component).toBeDefined();
    expect(Component.root.findByProps({ className: "main" }).children[0]).toBe(
      "This is a Content"
    );
  });
});

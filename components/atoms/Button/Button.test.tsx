import { create } from "react-test-renderer";
import Button from "./Button";

const renderComponent = () => create(<Button />);

describe("Button Unit Test", () => {
  it("WHEN render component THEN should be defined", () => {
    const Component = renderComponent();

    expect(Component).toBeDefined();
  });
});

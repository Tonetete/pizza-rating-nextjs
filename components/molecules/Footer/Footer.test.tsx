import { create } from "react-test-renderer";
import Footer from "./Footer";

const defaultProps = (): any => ({
  githubParams: {
    avatar_url: "http://example.jpg",
    html_url: "http://example.profile.com",
  },
});

const renderComponent = (props = {}) =>
  create(<Footer {...defaultProps()} {...props} />);

describe("Footer Unit Test", () => {
  it("WHEN render component THEN should be defined", () => {
    const props = defaultProps();
    const Component = renderComponent();
    const avatar = Component.root.findByType("img");
    const profileUrl = Component.root.findAllByType("a")[0];

    expect(Component).toBeDefined();
    expect(avatar.props.src).toBe(props.githubParams.avatar_url);
    expect(profileUrl.props.href).toBe(props.githubParams.html_url);
  });
});

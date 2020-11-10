import { create } from "react-test-renderer";
import ChartBar from "./ChartBar";

const data = () => ({
  labels: ["Bar 1", "Bar 2", "Bar 3", "Bar 4"],
  values: [3, 2, 5, 9],
});

const defaultProps = (): any => ({
  data: data(),
  titleChart: "Title Bar Chart",
});

const renderComponent = (props = {}) =>
  create(<ChartBar {...defaultProps()} {...props} />);

describe("ChartBar Unit Test", () => {
  it("WHEN render component THEN should be defined", () => {
    const props = defaultProps();
    const Component = renderComponent();

    const Bars = Component.root.findAll((n) => n.props.type === "bar")[0];

    expect(Component).toBeDefined();
    expect(Bars.props.data.labels).toEqual(props.data.labels);
    expect(Bars.props.data.datasets[0].data).toEqual(props.data.values);
  });
});

import Footer from "../components/Footer";
import renderer from "react-test-renderer";

it("testing footer component", () => {
  let tree = renderer.create(<Footer />).toJSON();
  expect(tree).toMatchSnapshot();
});

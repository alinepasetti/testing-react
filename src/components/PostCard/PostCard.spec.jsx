import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import { PostCard } from ".";

const MOCK_PROPS = {
  title: "title 1",
  id: 1,
  body: "banana",
  image: {
    url: "url.com",
    title: "image title",
  },
};

describe("<PostCard />", () => {
  it("displays the title correctly", () => {
    render(<PostCard post={MOCK_PROPS} />);
    const title = screen.getByRole("heading", { name: "1 title 1" });
    expect(title).toBeInTheDocument();
  });

  it("displays the content correctly", () => {
    render(<PostCard post={MOCK_PROPS} />);
    const image = screen.getByRole("img", { name: "image title" });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "url.com");
  });

  it("displays the image correctly", () => {
    render(<PostCard post={MOCK_PROPS} />);
    const content = screen.getByText("banana");
    expect(content).toBeInTheDocument();
  });

  it("should match snapshot", () => {
    const postCardElement = renderer
      .create(<PostCard post={MOCK_PROPS} />)
      .toJSON();
    expect(postCardElement).toMatchSnapshot();
  });
});

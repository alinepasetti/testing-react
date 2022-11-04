import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import { Posts } from ".";

const MOCK_PROPS = [
  {
    title: "title 1",
    id: 1,
    body: "body",
    image: {
      url: "url.com",
      title: "image title",
    },
  },
  {
    title: "title 2",
    id: 2,
    body: "body",
    image: {
      url: "url.com",
      title: "image title",
    },
  },
];

describe("<Posts />", () => {
  it("render the button with the text", () => {
    render(<Posts posts={MOCK_PROPS} />);
    const headings = screen.getAllByRole("heading", { name: /title/i });
    expect(headings).toHaveLength(2);
    const images = screen.getAllByRole("img", { name: "image title" });
    expect(images).toHaveLength(2);
    const bodies = screen.getAllByText("body");
    expect(bodies).toHaveLength(2);
  });

  it("should not render posts", () => {
    render(<Posts posts={[]} />);
    const headings = screen.queryByRole("heading", { name: /title/i });
    expect(headings).not.toBeInTheDocument();
  });

  it("should match snapshot", () => {
    const postsElement = renderer.create(<Posts posts={MOCK_PROPS} />).toJSON();
    expect(postsElement).toMatchSnapshot();
  });
});

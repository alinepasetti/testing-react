import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Search } from ".";
import renderer from "react-test-renderer";

describe("<Search />", () => {
  it("should call the handler on each key pressed", () => {
    const onChangeHandler = jest.fn();
    render(<Search onChangeHandler={onChangeHandler} searchValue="" />);
    const input = screen.getByRole("searchbox");
    expect(input).toBeInTheDocument();

    userEvent.type(input, "banana");
    expect(onChangeHandler).toBeCalledTimes(6);
  });

  it("should display the received searchValue", () => {
    const onChangeHandler = jest.fn();
    render(<Search onChangeHandler={onChangeHandler} searchValue="banana" />);
    const input = screen.getByRole("searchbox");
    expect(input.value).toBe("banana");
  });

  it("should match snapshot", () => {
    const onChangeHandler = jest.fn();
    const postsElement = renderer
      .create(<Search onChangeHandler={onChangeHandler} searchValue="banana" />)
      .toJSON();
    expect(postsElement).toMatchSnapshot();
  });
});

import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { Button } from '.';

describe('<Button />', () => {
  it('render the button with the text', () => {
    render(<Button />);
    const button = screen.getByRole('button', { name: /load more/i });
    expect(button).toBeInTheDocument();
  });

  it('should call function on button click', () => {
    const onClickHandler = jest.fn();
    render(<Button onClickHandler={onClickHandler} disabled={false} />);
    const button = screen.getByRole('button');
    button.click();
    expect(onClickHandler).toHaveBeenCalledTimes(1);
    expect(button).toBeEnabled();
  });

  it('should not call function when button is disabled', () => {
    const onClickHandler = jest.fn();
    render(<Button onClickHandler={onClickHandler} disabled={true} />);
    const button = screen.getByRole('button');
    button.click();
    expect(onClickHandler).toHaveBeenCalledTimes(0);
    expect(button).toBeDisabled();
  });

  it('should be disabled when disabled is true', () => {
    render(<Button disabled={true} />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('should be enabled when disabled is false', () => {
    render(<Button disabled={false} />);
    const button = screen.getByRole('button');
    expect(button).toBeEnabled();
  });

  it('should match snapshot', () => {
    const buttonElement = renderer.create(<Button onClickHandler={jest.fn()} disabled={false} />).toJSON();
    expect(buttonElement).toMatchSnapshot();
  });
});

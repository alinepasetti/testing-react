import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { Home } from '.';
import userEvent from '@testing-library/user-event';

const handlers = [
  rest.get('*jsonplaceholder.typicode.com*', async (_, res, ctx) => {
    return res(
      ctx.json([
        {
          userId: 1,
          id: 1,
          title: 'title1',
          body: 'body1',
          url: 'img1.jpg',
        },
        {
          userId: 2,
          id: 2,
          title: 'title2',
          body: 'body2',
          url: 'img1.jpg',
        },
        {
          userId: 3,
          id: 3,
          title: 'title3',
          body: 'body3',
          url: 'img3.jpg',
        },
      ]),
    );
  }),
];

const server = setupServer(...handlers);

describe('<Home />', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => server.resetHandlers());

  afterAll(() => {
    server.close();
  });

  it('should render search, posts and load more', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('Não existem posts =(');
    expect.assertions(3);
    await waitForElementToBeRemoved(noMorePosts);

    const input = screen.getByRole('searchbox');
    expect(input).toBeInTheDocument();
    const image = screen.getAllByRole('img');
    expect(image).toHaveLength(2);
    const button = screen.getByRole('button', { name: /load more posts/i });
    expect(button).toBeInTheDocument();
  });

  it('should render the first 2 posts correctly', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('Não existem posts =(');
    expect.assertions(3);
    await waitForElementToBeRemoved(noMorePosts);

    const title1 = screen.getByRole('heading', { name: /title1/i });
    expect(title1).toBeInTheDocument();
    const title2 = screen.getByRole('heading', { name: /title2/i });
    expect(title2).toBeInTheDocument();
    const title3 = screen.queryByRole('heading', { name: /title3/i });
    expect(title3).not.toBeInTheDocument();
  });

  it('should search for posts', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('Não existem posts =(');
    expect.assertions(7);
    await waitForElementToBeRemoved(noMorePosts);

    const input = screen.getByRole('searchbox');

    // user types title3
    userEvent.type(input, 'title3');

    expect(screen.queryByRole('heading', { name: '1 title1' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: '2 title2' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: '3 title3' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Search value: title3' })).toBeInTheDocument();

    // user deletes the whole value of the input field
    userEvent.clear(input);

    expect(screen.queryByRole('heading', { name: '1 title1' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: '2 title2' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: '3 title3' })).not.toBeInTheDocument();
  });

  it('displays no posts message when the search result is empty', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('Não existem posts =(');
    expect.assertions(4);
    await waitForElementToBeRemoved(noMorePosts);

    const input = screen.getByRole('searchbox');

    // user types a non existing post title
    userEvent.type(input, 'banana');

    expect(screen.queryByRole('heading', { name: '1 title1' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: '2 title2' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: '3 title3' })).not.toBeInTheDocument();
    expect(screen.getByText('Não existem posts =(')).toBeInTheDocument();
  });

  it('should hide the button while searching', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('Não existem posts =(');
    expect.assertions(2);
    await waitForElementToBeRemoved(noMorePosts);

    const button = screen.getByRole('button', { name: /load more posts/i });
    expect(button).toBeInTheDocument();

    const input = screen.getByRole('searchbox');
    userEvent.type(input, 'banana');
    expect(button).not.toBeInTheDocument();
  });

  it('should load more posts when user clicks the button', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('Não existem posts =(');
    expect.assertions(4);
    await waitForElementToBeRemoved(noMorePosts);

    expect(screen.queryByRole('heading', { name: '1 title1' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: '2 title2' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: '3 title3' })).not.toBeInTheDocument();
    const button = screen.getByRole('button', { name: /load more posts/i });
    userEvent.click(button);

    expect(screen.queryByRole('heading', { name: '3 title3' })).toBeInTheDocument();
  });

  it('should disable button when posts end', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('Não existem posts =(');
    expect.assertions(1);
    await waitForElementToBeRemoved(noMorePosts);
    const button = screen.getByRole('button', { name: /load more posts/i });
    userEvent.click(button);

    expect(button).toBeDisabled();
  });
});

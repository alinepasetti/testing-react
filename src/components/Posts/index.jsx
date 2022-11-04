import P from 'prop-types';
import React from 'react';
import './styles.css';
import { PostCard } from '../PostCard';

export const Posts = ({ posts = [] }) => {
  return <div className="posts">{posts.length && posts.map((post) => <PostCard post={post} key={post.id} />)}</div>;
};

Posts.defaultProps = {
  posts: [],
};

Posts.propTypes = {
  posts: P.arrayOf(
    P.shape({
      title: P.string.isRequired,
      body: P.string.isRequired,
      id: P.number.isRequired,
      image: P.shape({
        title: P.string.isRequired,
        url: P.string.isRequired,
      }),
    }),
  ),
};

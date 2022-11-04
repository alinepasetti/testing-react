import P from 'prop-types';
import React from 'react';
import './styles.css';
import { PostCard } from '../PostCard';

export const Posts = ({ posts }) => {
  return <div className="posts">{posts.length && posts.map((post) => <PostCard post={post} key={post.id} />)}</div>;
};

Posts.propTypes = {
  posts: P.array.isRequired,
};

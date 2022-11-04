import P from 'prop-types';
import React from 'react';
import './styles.css';

export const PostCard = ({ post }) => {
  return (
    <div className="post">
      <img alt={post.image.title} className="post-image" src={post.image.url} />
      <div className="post-content">
        <h2>
          {post.id} {post.title}
        </h2>
        <p>{post.body}</p>
      </div>
    </div>
  );
};

PostCard.propTypes = {
  post: P.shape({
    title: P.string.isRequired,
    body: P.string.isRequired,
    id: P.number.isRequired,
    image: P.shape({
      title: P.string.isRequired,
      url: P.string.isRequired,
    }),
  }),
};

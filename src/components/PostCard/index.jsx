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

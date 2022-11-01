export const loadPosts = async () => {
  const postsResponse = fetch("https://jsonplaceholder.typicode.com/posts");
  const photosResponse = fetch("https://jsonplaceholder.typicode.com/photos");
  const [postsRaw, photosRaw] = await Promise.all([
    postsResponse,
    photosResponse,
  ]);
  const posts = await postsRaw.json();
  const photos = await photosRaw.json();

  posts.forEach((post, i) => (post.image = photos[i]));
  return posts;
};

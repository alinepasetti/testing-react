import { Component } from "react";
import "./App.css";
import { PostCard } from "./components/PostCard";

class App extends Component {
  state = {
    posts: [],
  };

  componentDidMount() {
    this.loadPosts();
  }

  loadPosts = async () => {
    const postsResponse = fetch("https://jsonplaceholder.typicode.com/posts");
    const photosResponse = fetch("https://jsonplaceholder.typicode.com/photos");
    const [postsRaw, photosRaw] = await Promise.all([
      postsResponse,
      photosResponse,
    ]);
    const posts = await postsRaw.json();
    const photos = await photosRaw.json();

    posts.forEach((post, i) => (post.image = photos[i]));
    this.setState({ posts });
  };

  render() {
    const { posts } = this.state;
    return (
      <section className="container">
        <div className="posts">
          {posts.length &&
            posts.map((post) => (
                <PostCard post={post} key={post.id} />
            ))}
        </div>
      </section>
    );
  }
}

export default App;

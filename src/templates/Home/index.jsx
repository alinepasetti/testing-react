import { Component } from "react";
import { LoadMoreButton } from "../../components/LoadMoreButton";
import { Posts } from "../../components/Posts";
import { loadPosts } from "../../utils/load-posts";

import "./styles.css";

class Home extends Component {
  state = {
    posts: [],
    filteredPosts: [],
  };

  async componentDidMount() {
    await this.loadPosts();
  }

  async loadPosts() {
    const posts = await loadPosts();
    this.setState({ posts, filteredPosts: posts.splice(0, 5) });
  }

  loadMorePosts = () => {
    this.setState((prevState) => ({
      filteredPosts: prevState.posts.splice(
        0,
        prevState.filteredPosts.length + 5
      ),
    }));
  };

  render() {
    const { filteredPosts } = this.state;
    return (
      <section className="container">
        <Posts posts={filteredPosts} />
        <LoadMoreButton onClickHandler={this.loadMorePosts} />
      </section>
    );
  }
}

export default Home;

import { Component } from "react";
import { LoadMoreButton } from "../../components/LoadMoreButton";
import { Posts } from "../../components/Posts";
import { Search } from "../../components/Search";
import { loadPosts } from "../../utils/load-posts";

import "./styles.css";

class Home extends Component {
  state = {
    allPosts: [],
    posts: [],
    page: 0,
    postsPerPage: 5,
    searchInput: "",
  };

  async componentDidMount() {
    await this.loadPosts();
  }

  async loadPosts() {
    const { postsPerPage, page } = this.state;
    const allPosts = await loadPosts();
    this.setState({ allPosts, posts: allPosts.slice(page, postsPerPage) });
  }

  loadMorePosts = () => {
    const { postsPerPage, page, allPosts } = this.state;
    const nextPage = page + postsPerPage;
    this.setState({
      posts: allPosts.slice(0, nextPage + postsPerPage),
      page: nextPage,
    });
  };

  handleInputChange = (event) => {
    const searchInput = event.target.value;
    const { allPosts } = this.state;
    const filteredPosts = allPosts.filter(
      (post) => post.title.indexOf(searchInput) >= 0
    );
    this.setState({ searchInput, posts: filteredPosts });
  };

  render() {
    const { posts, allPosts, searchInput } = this.state;
    const noMorePosts = posts.length >= allPosts.length;
    return (
      <section className="container">
        <Search
          onChangeHandler={this.handleInputChange}
          searchInput={searchInput}
        />
        <Posts posts={posts} />
        <LoadMoreButton
          onClickHandler={this.loadMorePosts}
          disabled={noMorePosts}
        />
      </section>
    );
  }
}

export default Home;

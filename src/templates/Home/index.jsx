import { Component } from 'react';
import { Button } from '../../components/Button';
import { Posts } from '../../components/Posts';
import { Search } from '../../components/Search';
import { loadPosts } from '../../utils/load-posts';

import './styles.css';

class Home extends Component {
  state = {
    allPosts: [],
    posts: [],
    page: 0,
    postsPerPage: 5,
    searchValue: '',
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
    const searchValue = event.target.value;
    this.setState({ searchValue });
  };

  render() {
    const { posts, allPosts, searchValue } = this.state;
    const noMorePosts = posts.length >= allPosts.length;
    const filteredPosts = searchValue
      ? allPosts.filter((post) => post.title.toLowerCase().includes(searchValue.toLowerCase()))
      : posts;

    return (
      <section className="container">
        <Search onChangeHandler={this.handleInputChange} searchValue={searchValue} />
        {filteredPosts.length > 0 && <Posts posts={filteredPosts} />}
        {filteredPosts.length === 0 && <p>No hay posteles</p>}

        {!searchValue && <Button onClickHandler={this.loadMorePosts} disabled={noMorePosts} />}
      </section>
    );
  }
}

export default Home;

import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import React, { Component } from 'react';
import { PixabayApi } from 'helpers/pixabayApi';

export class App extends Component {
  state = {
    items: [],
    isLoading: false,
    error: null,
    query: '',
  };

  pixabayApi = new PixabayApi();

  handleImageClick = event => {
    event.preventDefault();
    console.log('Image clicked');
  }
  handleSubmit = event => {
    event.preventDefault();

    const query = event.target.elements.query.value;

    this.setState({
      isLoading: true,
      query,
    });

    this.pixabayApi.resetPageCount();
    this.fetchImages(query, false);
  };

  handleSearchChange = event => {
    console.log('Searchbar value changed');
  };

  handleLoadMore = () => {
    this.setState({ isLoading: true });
    this.pixabayApi.increasePageCount();
    this.fetchImages(this.state.query, true);
  };

  fetchImages = (query, isAdditional = false) => {
    this.pixabayApi
      .fetchImages(query)
      .then(response =>
        this.setState(prevState => {
          return {
            items: isAdditional
              ? [
                  ...prevState.items,
                  ...response.hits.filter(
                    hit => !prevState.items.some(item => item.id === hit.id)
                  ),
                ]
              : response.hits,
            isLoading: false,
          };
        })
      )
      .catch(error => this.setState({ error, isLoading: false }));
  };

  render = () => {
    const { items, isLoading } = this.state;

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16px',
          paddingBottom: '24px',
        }}
      >
        <Searchbar
          onChange={this.handleSearchChange}
          onSubmit={this.handleSubmit}
        />
        {items.length > 0 && <ImageGallery items={items} />}
        {items.length > 0 && (
          <Button onClick={this.handleLoadMore} disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Load More'}
          </Button>
        )}
      </div>
    );
  };
}

import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import React, { Component } from 'react';
import { PixabayApi } from 'helpers/pixabayApi';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';

export class App extends Component {
  state = {
    items: [],
    isLoading: false,
    error: null,
    query: '',
    page: 1,
    modalIsOpen: false,
    hasMorePhotos: false,
    imageSetting: {
      largeImageURL: 'images/default-image.jpg',
      alt: 'default alt text',
    },
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.fetchImages();
    }
  };

  pixabayApi = new PixabayApi();

  handleClickOnLink = (href, alt) => {
    console.log('click on link');
    this.setState({
      modalIsOpen: true,
      imageSetting: {
        largeImageURL: href,
        alt,
      },
    });
  };
  handleSubmit = event => {
    event.preventDefault();

    const query = event.target.elements.query.value;

    this.setState({
      query,
      page: 1,
    });
  };

  handleSearchChange = event => {
    console.log('Searchbar value changed');
  };

  handleLoadMore = () => {
    this.setState({ page: this.state.page + 1 });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  fetchImages = async () => {
    this.setState({ isLoading: true });
    await this.pixabayApi
      .fetchImages(this.state.query, this.state.page)
      .then(response => {
        this.setState(prevState => {
          return {
            items: [...prevState.items, ...response.hits],
            hasMorePhotos: this.state.page < Math.ceil(response.totalHits / 12),
          };
        });
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  render = () => {
    const { items, isLoading, modalIsOpen, hasMorePhotos } = this.state;
    const { largeImageURL, alt } = this.state.imageSetting;

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          paddingBottom: '24px',
        }}
      >
        <Searchbar
          onChange={this.handleSearchChange}
          onSubmit={this.handleSubmit}
        />
        {items.length > 0 && (
          <React.Fragment>
            <ImageGallery items={items} onImageClick={this.handleClickOnLink} />
            {hasMorePhotos && (
              <Button onClick={this.handleLoadMore} disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Load More'}
              </Button>
            )}
          </React.Fragment>
        )}
        {isLoading && <Loader />}
        {modalIsOpen && (
          <Modal
            largeImageURL={largeImageURL}
            alt={alt}
            onClose={this.closeModal}
          />
        )}
      </div>
    );
  };
}

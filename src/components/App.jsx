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
    modalIsOpen: false,
    imageSetting: {
      largeImageURL: 'images/default-image.jpg',
      alt: 'default alt text',
    },
  };

  pixabayApi = new PixabayApi();

  handleClickOnLink = event => {
    event.preventDefault();
    let href = event.target.dataset.source;
    this.setState({
      modalIsOpen: true,
      imageSetting: {
        largeImageURL: href,
        alt: event.target.alt,
      },
    });
  };
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

  closeModal = () => {
    this.setState({ modalIsOpen: false });
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
    const { items, isLoading, modalIsOpen } = this.state;
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
        {this.isLoading ? (
          <Loader />
        ) : (
          items.length > 0 && (
            <React.Fragment>
              <ImageGallery
                items={items}
                onImageClick={this.handleClickOnLink}
              />
              <Button onClick={this.handleLoadMore} disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Load More'}
              </Button>
            </React.Fragment>
          )
        )}
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

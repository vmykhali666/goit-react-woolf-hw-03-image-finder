import React, { Component } from 'react';
import css from 'styles/Modal.module.css';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  render() {
    const { largeImageURL, alt, onClose } = this.props;
    return (
      <div className={css.Overlay} onClick={(e) => {
        e.target === e.currentTarget && onClose();
      }}>
        <div className={css.Modal}>
          <img src={largeImageURL} alt={alt} />
        </div>
      </div>
    );
  }
}

import React from 'react';

import css from 'styles/ImageGalleryItem.module.css';

export const ImageGalleryItem = ({
    webformatURL,
    largeImageURL,
    alt,
    onImageClick,
}) => {
    return (
        <li className={css.ImageGalleryItem}>
            <img
                onClick={() => onImageClick(largeImageURL, alt)}
                className={css.ImageGalleryItemImage}
                src={webformatURL}
                data-source={largeImageURL}
                alt={alt}
                title={alt}
            />
        </li>
    );
};

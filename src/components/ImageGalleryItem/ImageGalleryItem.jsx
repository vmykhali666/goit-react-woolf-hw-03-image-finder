import css from 'styles/ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ webformatURL, largeImageURL, alt, onImageClick }) => {
    return (
        <li className={css.ImageGalleryItem}>
            <a className={css.GalleryLink} href={largeImageURL} onClick={onImageClick}>
                <img
                    className={css.ImageGalleryItemImage}
                    src={webformatURL}
                    data-source={largeImageURL}
                    alt={alt}
                    title={alt}
                />
            </a>
        </li>
    );
}
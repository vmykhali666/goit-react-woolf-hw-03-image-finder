import css from 'styles/ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ webformatURL, largeImageURL, alt }) => {
    return (
        <li className={css.ImageGalleryItem}>
            <a className={css.GalleryLink} href={largeImageURL}>
                <img
                    className={css.ImageGalleryItemImage}
                    src={webformatURL}
                    data-source={webformatURL}
                    alt={alt}
                    title={alt}
                />
            </a>
        </li>
    );
}
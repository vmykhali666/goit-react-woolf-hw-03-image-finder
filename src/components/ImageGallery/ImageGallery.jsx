import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from 'styles/ImageGallery.module.css';

export const ImageGallery = ({ items }) => {
  return (
    
    <ul className={css.ImageGallery}>
      {items.map(item => (
        <ImageGalleryItem
          key={item.id}
          webformatURL={item.webformatURL}
          largeImageURL={item.largeImageURL}
          alt={item.tags}
        />
      ))}
    </ul>
  );
};

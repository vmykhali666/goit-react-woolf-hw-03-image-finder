import { SearchForm } from 'components/SearchForm/SearchForm';
import css from 'styles/Searchbar.module.css';

export const Searchbar = ({ onChange, onSubmit }) => {
  return (
    <header className={css.Searchbar}>
      <SearchForm onChange={onChange} onSubmit={onSubmit} />
    </header>
  );
};

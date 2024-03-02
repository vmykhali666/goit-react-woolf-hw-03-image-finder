import css from 'styles/SearchForm.module.css';

export const SearchForm = ({ onSubmit, onChange }) => {

  return (
    <form className={css.SearchForm} onSubmit={onSubmit}>
      <button type="submit" className={css.SearchFormButton}>
        <span className={css.SearchFormButtonLabel}>Search</span>
      </button>

      <input
        className={css.SearchFormInput}
        type="text"
        autoComplete="off"
        autoFocus
        name="query"
        placeholder="Search images and photos"
        onChange={onChange}
      />
    </form>
  );
};

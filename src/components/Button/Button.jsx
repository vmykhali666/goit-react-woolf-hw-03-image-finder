import css from "styles/Button.module.css";

export const Button = ({ children, onClick }) => {
    return (
        <button className={css.Button} onClick={onClick}>
        {children}
        </button>
    );
}
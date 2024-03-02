import css from 'styles/Modal.module.css';

export const Modal = ({ imageSetting }) => {
    return (
        <div className={css.Overlay} onClick={imageSetting.onClose}>
            <div className={css.Modal}>
                <img src={imageSetting.Url} alt={imageSetting.Alt} />
            </div>
        </div>
    );
};
    
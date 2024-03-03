import css from 'styles/Loader.module.css';
import { Hourglass } from 'react-loader-spinner';

export const Loader = () => {
  console.log('Loader');
  return (
    <div className={css.Overlay}>
      <Hourglass
        visible={true}
        height="80"
        width="80"
        ariaLabel="hourglass-loading"
        wrapperStyle={{}}
        wrapperClass=""
        colors={['#306cce', '#72a1ed']}
      />
    </div>
  );
};

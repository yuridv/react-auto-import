import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const Load = (props) => {
  const [ Page, setPage ] = useState();

  useEffect(() => {
    (async() => {
      let element, style;

      if (props.element) element = await props.element();
      if (props.style) style = await props.style();

      if (element) return setPage(<element.default { ...props } style={ style } />);
      setPage();
    })();
  }, [ props ]);

  return (
    <>
      { Page ? Page : (<a>CARREGANDO...</a>) }
    </>
  );
};

Load.propTypes = {
  element: PropTypes.func.isRequired,
  style: PropTypes.func
};

export default Load;
import { useEffect, useState } from "react";

const Load = (props) => {
  const [ Page, setPage ] = useState(false);

  useEffect(() => {
    (async () => {
      let Element = (await props.element()).default;
      let Style = {};

      if (props.style) Style = await props.style();
      if (!Style) console.warn('[Load]=> Style not found for element:', props.element);

      setPage(<Element { ...props } style={ Style } />);
    })();
  }, [ props ]);

  return (
    <>
      { Page ? Page : (<a>CARREGANDO...</a>) }
    </>
  )
}

export default Load;
import { useEffect, useState } from "react";

const Import = (props) => {
  const [ Page, setPage ] = useState(false);

  useEffect(() => {
    (async () => {
      let Component = (await props.element()).default;
      let Style = {};

      if (props.style) Style = await props.style();
      if (!Style) console.warn('[Style]=> Not found:', props.element);

      setPage(<Component { ...props } style={ Style } />);
    })();
  }, [ props ]);

  return (
    <>
      { Page ? Page : (<a>CARREGANDO...</a>) }
    </>
  )
}

export default Import;
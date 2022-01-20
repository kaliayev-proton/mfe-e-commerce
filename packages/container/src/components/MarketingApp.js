import { mount } from "marketing/MarketingApp";
import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default () => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      onNavigate: ({ pathname: nextPathname }) => {
        // with nextPathname we are destructuring and renaming the field pathname
        const { pathname } = history.location;

        if (pathname !== nextPathname) {
          history.push(nextPathname);
        }
      },
    }); // de este modo cargamos cualquier micro construido con el framework que sea, de forma transparente, en nuestro div
    history.listen(onParentNavigate);
  }, []);

  return <div ref={ref} />;
};

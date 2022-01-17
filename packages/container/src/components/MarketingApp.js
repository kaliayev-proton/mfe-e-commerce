import { mount } from "marketing/MarketingApp";
import React, { useRef, useEffect } from "react";

export default () => {
  const ref = useRef(null);

  useEffect(() => {
    console.log(ref);
    mount(ref.current); // de este modo cargamos cualquier micro construido con el framework que sea, de forma transparente, en nuestro div
  }, []);

  return <div ref={ref} />;
};

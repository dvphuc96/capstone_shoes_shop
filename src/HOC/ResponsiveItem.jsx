import React, { memo } from "react";
import { useEffect, useState } from "react";

const ResponsiveItem = (props) => {
  const [screen, setScreen] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const handleOnload = () => {
    setScreen({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };
  useEffect(() => {
    window.onload = handleOnload;
    window.onresize = handleOnload;
    return () => {
      window.removeEventListener("load", handleOnload);
      window.removeEventListener("resize", handleOnload);
    };
  }, []);
  let Component = props.component;
  if (screen.width < 768 && props.mobileComponent) {
    Component = props.mobileComponent;
  }
  return (
    <>
      <Component />
    </>
  );
};

export default memo(ResponsiveItem);

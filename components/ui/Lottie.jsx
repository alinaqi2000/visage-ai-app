import React, { useEffect } from 'react';
import lottie from 'lottie-web';
import { useRef } from 'react';
export default function Lottie({ data, path, style, className }) {
  const container = useRef(null);
  useEffect(() => {
    const instance = lottie.loadAnimation({
      container: container.current, // the dom element that will contain the animation
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: data ?? null, // the path to the animation json
      path: path ?? null, // the path to the animation json
    });
    return () => instance.destroy();
  }, []);
  return <div style={style} className={className} ref={container}></div>;
}

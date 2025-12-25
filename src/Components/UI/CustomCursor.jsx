/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });

  const [clicked, setClicked] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [ripples, setRipples] = useState([]);

  useEffect(() => {
    const move = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      // dot follows instantly
      dotRef.current.style.left = `${e.clientX}px`;
      dotRef.current.style.top = `${e.clientY}px`;
    };

    const click = (e) => {
      setClicked(true);

      setRipples((prev) => [
        ...prev,
        { x: e.clientX, y: e.clientY, id: Date.now() },
      ]);

      setTimeout(() => setClicked(false), 150);
      setTimeout(() => setRipples((prev) => prev.slice(1)), 600);
    };

    const addHover = () => setHovering(true);
    const removeHover = () => setHovering(false);

    window.addEventListener('mousemove', move);
    window.addEventListener('mousedown', click);

    document.querySelectorAll('a, button').forEach((el) => {
      el.addEventListener('mouseenter', addHover);
      el.addEventListener('mouseleave', removeHover);
    });

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousedown', click);
    };
  }, []);

  // 🔥 Smooth follower with physics
  useEffect(() => {
    const animate = () => {
      const dx = mouse.current.x - ring.current.x;
      const dy = mouse.current.y - ring.current.y;

      // spring force
      velocity.current.x += dx * 0.12;
      velocity.current.y += dy * 0.12;

      // damping
      velocity.current.x *= 0.72;
      velocity.current.y *= 0.72;

      ring.current.x += velocity.current.x;
      ring.current.y += velocity.current.y;

      ringRef.current.style.left = `${ring.current.x}px`;
      ringRef.current.style.top = `${ring.current.y}px`;

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <>
      {/* Cursor Dot */}
      <div
        ref={dotRef}
        className={`cursor-dot ${clicked ? 'scale' : ''}  ${
          hovering ? 'hover' : ''
        }`}
      />

      {/* Cursor Ring */}
      <div ref={ringRef} className={`cursor-ring ${hovering ? 'hover' : ''}`} />

      {/* Ripples */}
      {ripples.map((r) => (
        <span
          key={r.id}
          className="cursor-ripple"
          style={{ left: r.x, top: r.y }}
        />
      ))}
    </>
  );
};

export default CustomCursor;

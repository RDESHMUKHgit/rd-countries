import React from 'react';

const Loader = () => {
  return (
    <>
      {/* Scoped CSS */}
      <style>
        {`
          .loader {
            width: 120px;
            height: 22px;
            border-radius: 20px;
            color: #514b82;
            border: 2px solid;
            position: relative;
          }

          .loader::before {
            content: "";
            position: absolute;
            margin: 2px;
            inset: 0 100% 0 0;
            border-radius: inherit;
            background: currentColor;
            animation: l6 2s infinite;
          }

          @keyframes l6 {
            100% {
              inset: 0;
            }
          }
        `}
      </style>

      {/* Loader */}
      <div className="loader"></div>
    </>
  );
};

export default Loader;

import React from "react";

const Loading = () => {
  return (
    <div className=" w-screen h-screen bg-black flex items-center justify-center">
      <iframe
        src="https://giphy.com/embed/3o7bu3XilJ5BOiSGic"
        width="180"
        height="180"
        frameBorder="0"
        className="giphy-embed"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Loading;

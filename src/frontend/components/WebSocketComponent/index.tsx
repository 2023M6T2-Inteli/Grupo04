// ws://10.128.64.51:3001/analyze/video_feed
import React, { useEffect, useRef } from "react";

const VideoFeed = () => {
  const videoFeedRef = useRef();

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3001/analyze/video_feed');

    socket.onmessage = function (event) {
      const url = URL.createObjectURL(new Blob(([event.data]), { type: 'image/jpeg' }));
      videoFeedRef.current.src = url;
    };

    socket.onerror = function (error) {
      console.log(`WebSocket Error: ${error}`);
    };

    // Limpar a conexão WebSocket ao desmontar o componente
    return () => {
      socket.close();
    };
  }, []);

  return <img id="videoFeed" src="" alt="Video Feed" ref={videoFeedRef} />;
};

export default VideoFeed;
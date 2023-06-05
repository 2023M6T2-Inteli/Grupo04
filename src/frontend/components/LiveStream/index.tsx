import React, { useEffect, useRef } from "react";
import { HiOutlineEmojiSad } from "react-icons/hi";
import { Icon } from "@chakra-ui/react";

interface Props {}

const LiveStream: React.FC<Props> = (props) => {
  const [videoAvaiability, setVideoAvaiability] =
    React.useState<boolean>(false);

  const videoFeedRef = useRef() as any;

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3001/analyze/video_feed");

    socket.onmessage = function (event) {
      setVideoAvaiability(true);
      const url = URL.createObjectURL(
        new Blob([event.data], { type: "image/jpeg" })
      );
      if (videoFeedRef.current) {
        videoFeedRef.current.src = url;
      }
    };

    socket.onerror = function (error) {
      console.log(`WebSocket Error: ${error}`);
      setVideoAvaiability(false);
    };

    // Limpar a conexão WebSocket ao desmontar o componente
    return () => {
      setVideoAvaiability(false);
      socket.close();
    };
  }, []);

  return (
    <div className="flex flex-grow pb-3 justify-center">
      <div className="flex flex-col gap-5 relative justify-center items-center h-[65vh] w-[65vw] rounded-2xl shadow-2xl">
        {videoAvaiability ? (
          <img
            width={"auto"}
            height={"auto"}
            id="videoFeed"
            src=""
            alt="Video Feed"
            ref={videoFeedRef}
          />
        ) : (
          <>
            <Icon as={HiOutlineEmojiSad} color={"blue.700"} w={59} h={59} />
            <p className="text-2xl text-blue-gerdau-mid select-none">
              No live stream available
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default LiveStream;

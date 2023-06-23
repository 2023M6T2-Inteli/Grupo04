import React, { useEffect, useRef } from "react";
import { HiOutlineEmojiSad } from "react-icons/hi";
import { Icon } from "@chakra-ui/react";
import Button, { ButtonType } from "../Button";

interface Props {}

const LiveStream: React.FC<Props> = (props) => {
  const [videoAvaiability, setVideoAvaiability] =
    React.useState<boolean>(false);

  const videoFeedRef = useRef() as any;

  useEffect(() => {
    const id = 1;
    console.log("INICIANDO CONEXÃO COM WEBSOCKET!!!!");
    const socket = new WebSocket(
      `ws://localhost:3001/analyze/video_feed/${id}`
    );

    socket.onmessage = function (event) {
      console.log("MESSAGE RECEIVED! ", event.data);
      if (event.data === "VIDEO ENDED!") {
        setVideoAvaiability(false);
      } else {
        setVideoAvaiability(true);
        const url = URL.createObjectURL(
          new Blob([event.data], { type: "image/jpeg" })
        );
        if (videoFeedRef.current) {
          videoFeedRef.current.src = url;
        }
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
    <div className="">
      <div className="ml-auto mr-auto h-full w-[65vw]">
        <div className="border-2 border-gray-600-50 rounded-2xl shadow-md mb-8 flex-none">
          <div className="mx-6 my-4 flex flex-row">
            <div className="text-gray-700 text-xl basis-1/4 text-left">
              <b>Name:</b> Analyze Xxx
            </div>
            <div className="text-gray-700 text-xl basis-1/4 text-left">
              <b>Start:</b> 10/02/2023 - 10:02:45
            </div>
            <div className="text-gray-700 text-xl basis-1/4 text-left">
              <b>End:</b> 10/02/2023 - 15:04:22
            </div>
            <div className="text-gray-700 text-xl basis-1/4 text-right">
              <b>Delete</b>{" "}
            </div>
          </div>
        </div>
        <div className="flex flex-row flex-nowrap">
          <div className="ml-auto mr-auto w-2/4 border-2 rounded-2xl relative">
            <div className="flex flex-col gap-5 rounded-2xl h-11/12 shadow-2xl">
              <div className="text-gray-700 text-xl text-left font-bold text-left mt-2 ml-2">
                First Analyze
              </div>
              <div className="w-96 h-72 flex flex-col gap-5 relative justify-center items-center ml-auto mr-auto rounded-xl border-2">
                {videoAvaiability ? (
                  <img
                    // width={"384"}
                    // height={"384"}
                    className="w-auto h-auto"
                    id="videoFeed"
                    src=""
                    alt="Video Feed"
                    ref={videoFeedRef}
                  />
                ) : (
                  <>
                    <Icon
                      as={HiOutlineEmojiSad}
                      color={"blue.700"}
                      w={59}
                      h={59}
                    />
                    <p className="text-2xl text-blue-gerdau-mid select-none">
                      No live stream available
                    </p>
                  </>
                )}
              </div>
              <div className="mx-6 my-4 flex flex-row">
                <div className="text-gray-700 text-lg basis-2/4 text-center">
                  <b>Gas:</b> 100%
                </div>
                <div className="text-gray-700 text-lg basis-2/4 text-center">
                  <b>Oxygen:</b> 100%
                </div>
              </div>
              <div className="w-11/12 mr-auto ml-auto mb-4">
                <Button text="Start" type={ButtonType.Home} link="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveStream;

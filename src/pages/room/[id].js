import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import io from "socket.io-client";

function Room({ roomId }) {
  const router = useRouter();
  const socketRef = useRef();
  const userVideo = useRef();

  useEffect(() => {
    socketRef.current = io();
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: false,
      })
      .then((stream) => {
        // userVideo.current.srcObject = stream;
        socketRef.current.emit("join", roomId);
      })
      .catch((err) => console.log(err));
  }, []);

  return <>{JSON.stringify(roomId)}</>;
}

export function getServerSideProps({ params }) {
  return {
    props: {
      roomId: params.id,
    },
  };
}

export default Room;

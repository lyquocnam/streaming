import { Button, Col, Row } from "react-bootstrap";
import Peer from "simple-peer";
import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

function Room() {
  const socket = io();
  const [visibleVideo, setVisibleVideo] = useState(false);
  const videoRef = useRef();
  const hostTokenRef = useRef();
  const guestTokenRef = useRef();

  socket.on("connect", function () {
    console.log("connected");
  });
  socket.on("event", function (data) {
    console.log(data);
  });
  socket.on("disconnect", function () {
    console.log("disconnected");
  });

  useEffect(() => {}, []);

  function createLiveStream() {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then(gotMedia)
      .catch((err) => console.log(err));
  }

  function gotMedia(stream) {
    const peer = new Peer({ initiator: true, stream });
    peer.on("signal", (data) => {
      console.log(data);
      //setToken(JSON.stringify(data));
      hostTokenRef.current.value = JSON.stringify(data);
    });

    peer.on("connect", () => peer.send("i'm peer"));
    peer.on("stream", (stream) => {
      console.log("streaming...");
      setVisibleVideo(true);
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    });
  }

  function joinLiveStream() {
    const token = guestTokenRef.current.value;
    if (!token) return;

    peer.signal(token);
  }

  return (
    <>
      <Row>
        <Col>
          <Button onClick={createLiveStream}>Create live stream</Button>
          {visibleVideo && <video ref={videoRef} height={200} width={200} />}
          <h6>Invite token:</h6>
          <textarea
            rows={5}
            type={"text"}
            ref={hostTokenRef}
            style={{ width: "100%" }}
          />
        </Col>
        <Col>
          <Button onClick={createLiveStream} variant={"dark"}>
            Join live stream
          </Button>
          {visibleVideo && <video ref={videoRef} height={200} width={200} />}
          <h6>Join token:</h6>
          <textarea
            rows={5}
            type={"text"}
            ref={guestTokenRef}
            style={{ width: "100%" }}
          />
        </Col>
      </Row>
    </>
  );
}

export default Room;

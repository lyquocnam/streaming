import { useRef } from "react";
import { useRouter } from "next/router";
import { v1 } from "uuid";

function Home() {
  const tokenRef = useRef();
  const router = useRouter();

  function createLivestream() {
    const roomId = v1();
    router.push(`/room/${roomId}`);
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <button onClick={createLivestream}>Create livestream</button>
        <hr />
        <div>
          <input
            type="text"
            ref={tokenRef}
            placeholder={"invitation code"}
            style={{ width: 500 }}
          />
          <button>join a livestream</button>
        </div>

        <br />
      </div>
    </>
  );
}

export default Home;

import dynamic from "next/dynamic";
import Home from "components/home";

// const Room = dynamic(() => import("components/room"), {
//   ssr: false,
// });

export default function HomeIndex() {
  return (
    <>
      <Home />
    </>
  );
}

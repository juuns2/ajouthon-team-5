import trpc from "./utils/trpc";
import { Map } from "react-kakao-maps-sdk";

const App = () => {
  const { isLoading } = trpc.example.useQuery();

  return (
    <main className="flex h-[100dvh] w-screen flex-col items-center justify-center">
      <Map // 지도를 표시할 Container
        id="map"
        center={{
          // 지도의 중심좌표
          lat: 33.450701,
          lng: 126.570667,
        }}
        style={{
          // 지도의 크기
          width: "100%",
          height: "100%",
        }}
        level={3} // 지도의 확대 레벨
      />
    </main>
  );
};

export default App;

import { useEffect, useState } from "react";
import { topic } from "../Constant";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

// connection 설정
const sockJS = new SockJS(topic); // ①
const stompClient = Stomp.over(sockJS);

function Websocket() {
  const [cafes, setCafes] = useState([]); // 전체 카페 리스트

  const request_cafes = async () => {
    const resp = await get_cafes();
    setCafes(resp.data);
  };

  const connect = () => {
    stompClient.connect({}, onConnected, onError); // ②
  };

  useEffect(() => {
    // 초기 카페 리스트 가져오기
    request_cafes();
    connect();
  }, []);

  // When socket connection connect
  const onConnected = () => {
    stompClient.subscribe("/topic/cafe", (payload) => {
      const data = JSON.parse(payload.body);
      // 이전 상태 값을 가져온 다음 업데이트를 수행
      setCafes((prevCafes) => {
        return prevCafes.map((cafe) => {
          if (cafe.id === data.id) {
            return { ...cafe, count: data.count };
          }
          return cafe;
        });
      });
    });
  };

  // when socket connection disconnect
  const onError = () => {
    console.log(">>> DISCONNECT");
  };

  return (
    <div>
      {cafes.map((cafe) => (
        <div key={cafe.id}>
          카페 ID: {cafe.id}, 이름: {cafe.name}, 인원수: {cafe.count}
        </div>
      ))}
    </div>
  );
}

export default Websocket;

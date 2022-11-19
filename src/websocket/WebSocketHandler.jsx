import { useEffect } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";

export default function useWebSocket(setCommands) {
  const WS_URL = 'ws://localhost:8080'
  useEffect(() => {
    const ws = new W3CWebSocket(WS_URL);
    ws.onopen = () => {
      console.log('WebSocket Client Connected');
    };
    ws.onmessage = (message) => {
      const content = JSON.parse(message.data) ? JSON.parse(message.data) : ""
      if (content.type === "commands"){
        setCommands(content.data)
      }
    };

    return () => {
      ws.close();
    };
  },[]);
}

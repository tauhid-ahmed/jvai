import ChatEditor from "../../components/chat-editor";
import { useAppDispatch } from "../../app/hooks";
import { setChatId } from "../../features/chat/chatSlice";
import { useEffect } from "react";

export default function ChatPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setChatId(""));
  }, []);
  return <ChatEditor />;
}

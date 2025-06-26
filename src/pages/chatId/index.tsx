import { useParams } from "react-router";
import ChatEditor from "../../components/chat-editor";

export default function SingleChat() {
  const params = useParams();
  return (
    <>
      {/* SingleChat {params.chatId} */}
      <ChatEditor />
    </>
  );
}

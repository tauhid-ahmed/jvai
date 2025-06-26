import { Button } from "./button";
import { useAppDispatch } from "../app/hooks";
import { setChatId } from "../features/chat/chatSlice";
import { useEffect, useState, type FormEvent } from "react";
import { useCreateChatMutation } from "../services/api";

type ChatEditorProps = {
  chatId?: string;
};

export default function ChatEditor({ chatId }: ChatEditorProps) {
  const [formData, setFormData] = useState({ message: "" });
  const [isExistingChat, setIsExistingChat] = useState(false);
  const dispatch = useAppDispatch();
  const [createChat] = useCreateChatMutation();
  useEffect(() => {
    if (chatId) {
      dispatch(setChatId(chatId));
      setIsExistingChat(Boolean(chatId));
    }
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!isExistingChat) {
        const response = await createChat(formData).unwrap();
        console.log(response);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-scroll"></div>
      <form
        className="py-10 px-2 flex gap-4 items-center"
        onSubmit={handleSubmit}
      >
        <input
          className="w-full mt-1 block border border-grey-800 dark:border-grey-500 rounded px-6 py-4"
          type="text"
          name="text"
          placeholder="Type your message (Shift + Enter for new line)"
          onChange={(e) => setFormData({ message: e.target.value })}
        />
        <Button size="lg" variant="ghost">
          Send
        </Button>
      </form>
    </div>
  );
}

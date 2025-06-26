import { useState } from "react";
import { Button } from "../../components/button";
import { useSendSupportRequestMutation } from "../../services/api";

type FormData = {
  email: string;
  query: string;
};

export default function HelpAndSupportPage() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    query: "",
  });

  const [sendQuery] = useSendSupportRequestMutation();

  const handleInputChange =
    (name: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFormData((prev) => ({ ...prev, [name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await sendQuery(formData).unwrap();
    } catch (err) {
      console.error("Failed to login:", err);
    }
  };
  return (
    <div className="px-gutter lg:px-14 py-4">
      <h2 className="text-2xl">Help And Support</h2>

      <form onSubmit={handleSubmit} className="text-white mt-10 space-y-4">
        <label className="block">
          <span>Your Email</span>
          <input
            className="w-full mt-1 block border border-grey-800 dark:border-grey-500 rounded px-2 py-1.5"
            type="text"
            name="email"
            onChange={handleInputChange("email")}
          />
        </label>
        <label className="block">
          <span>Description</span>
          <textarea
            className="w-full mt-1 border border-grey-800 dark:border-grey-500 rounded min-h-44 px-2 py-1.5"
            placeholder="Enter your query or feedback"
            name="query"
            onChange={handleInputChange("query")}
          />
        </label>
        <div className="flex justify-end">
          <Button>Send</Button>
        </div>
      </form>
    </div>
  );
}

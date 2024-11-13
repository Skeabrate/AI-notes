import { Input } from "@/components/ui/input";
import { FormEvent, useState, useTransition } from "react";
import { Button } from "./ui/button";

type DocumentProps = {
  id: string;
};

const Document: React.FC<DocumentProps> = ({ id }) => {
  const [input, setInput] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleChangeTitle = (e: FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      await updateDocument(id, { title: input });
    });
  };

  return (
    <div>
      <form onSubmit={handleChangeTitle}>
        <Input value={input} onChange={(e) => setInput(e.target.value)} />
        <Button disabled={isPending}>
          {isPending ? "Updating..." : "Update"}
        </Button>
      </form>
    </div>
  );
};

export default Document;

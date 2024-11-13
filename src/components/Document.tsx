import { Input } from "@/components/ui/input";
import { db } from "@/lib/firebaseClient";
import { doc, updateDoc } from "firebase/firestore";
import { FormEvent, useEffect, useState, useTransition } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { Button } from "./ui/button";

type DocumentProps = {
  id: string;
};

const Document: React.FC<DocumentProps> = ({ id }) => {
  const [data, loading, error] = useDocumentData(doc(db, "documents", id));
  const [input, setInput] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleChangeTitle = (e: FormEvent) => {
    e.preventDefault();

    if (input.trim()) return;

    startTransition(async () => {
      await updateDoc(doc(db, "documents", id), {
        title: input,
      });
    });
  };

  useEffect(() => {
    if (data) {
      setInput(data.title);
    }
  }, []);

  return (
    <div>
      <form onSubmit={handleChangeTitle}>
        <Input value={input} onChange={(e) => setInput(e.target.value)} />
        {/* <Button disabled={isPending}>
          {isPending ? "Updating..." : "Update"}
        </Button> */}
      </form>
    </div>
  );
};

export default Document;

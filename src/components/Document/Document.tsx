import { doc, updateDoc } from "firebase/firestore";
import { FormEvent, useEffect, useState, useTransition } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import DeleteDocument from "./DeleteDocument";
import Editor from "../Editor/Editor";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { useOwner } from "@/hooks/useOwner";
import { db } from "@/lib/firebaseClient";

type DocumentProps = {
  id: string;
};

const Document: React.FC<DocumentProps> = ({ id }) => {
  const [data, loading, error] = useDocumentData(doc(db, "documents", id));
  const [input, setInput] = useState("");
  const [isPending, startTransition] = useTransition();
  const { isOwner } = useOwner();

  const handleChangeTitle = (e: FormEvent) => {
    e.preventDefault();

    if (!input.trim()) return;

    startTransition(async () => {
      await updateDoc(doc(db, "documents", id), {
        title: input,
      });
    });
  };

  useEffect(() => {
    if (!data) return;
    setInput(data.title);
  }, [data]);

  return (
    <div className="mx-auto max-w-6xl">
      <form onSubmit={handleChangeTitle} className="flex gap-3">
        <Input value={input} onChange={(e) => setInput(e.target.value)} />
        <Button type="submit" disabled={isPending}>
          {isPending ? "Updating..." : "Update"}
        </Button>

        {isOwner && (
          <>
            <DeleteDocument />
          </>
        )}
      </form>

      <div>
        {/* ManageUsers */}

        {/* Avatars */}
      </div>

      <hr className="mt-6 pb-10" />

      <Editor />
    </div>
  );
};

export default Document;

"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Button } from "../ui/button";
import { createDocument } from "@/actions/document.actions";

const CreateDocument = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleCreateDocument = () => {
    startTransition(async () => {
      const res = await createDocument();
      router.push(`/doc/${res.docId}`);
    });
  };

  return (
    <Button onClick={handleCreateDocument} disabled={isPending}>
      {isPending ? "Creating" : "New Document"}
    </Button>
  );
};

export default CreateDocument;

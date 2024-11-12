"use client";

import { createNewDocument } from "@/actions/actions";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Button } from "./ui/button";

const NewDocumentButton = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleCreateNewDocument = () => {
    startTransition(async () => {
      const res = await createNewDocument();

      if (!res) {
        // toast error
        return;
      }

      router.push(`/doc/${res.docId}`);
    });
  };

  return (
    <Button onClick={handleCreateNewDocument} disabled={isPending}>
      {isPending ? "Creating" : "New Document"}
    </Button>
  );
};

export default NewDocumentButton;

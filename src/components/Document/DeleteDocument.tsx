import { useRoom } from "@liveblocks/react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Button } from "../ui/button";
import { deleteDocument } from "@/actions/document.actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const DeleteDocument = () => {
  const [isPending, startTransition] = useTransition();
  const { id } = useRoom();
  const router = useRouter();

  const handleDelete = () => {
    startTransition(async () => {
      await deleteDocument(id);
      router.push("/");
    });
  };

  return (
    <AlertDialog>
      <Button asChild variant="destructive">
        <AlertDialogTrigger>Delete</AlertDialogTrigger>
      </Button>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            document and you {`won't`} be able to restore it.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={isPending}>
            {isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDocument;

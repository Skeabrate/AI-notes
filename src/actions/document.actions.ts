"use server";

import { auth } from "@clerk/nextjs/server";
import { adminDb } from "@/lib/firebaseServer";
import liveblocks from "@/lib/liveblocks";

export async function createDocument() {
  auth.protect();

  const { sessionClaims } = await auth();

  const docCollectionRef = adminDb.collection("documents");
  const docRef = await docCollectionRef.add({
    title: "New Doc",
  });

  if (!sessionClaims?.email) {
    throw new Error("No email found in session claims");
  }

  await adminDb
    .collection("users")
    .doc(sessionClaims!.email)
    .collection("rooms")
    .doc(docRef.id)
    .set({
      userId: sessionClaims.email,
      role: "owner",
      roomId: docRef.id,
      createdAt: new Date(),
    });

  return { docId: docRef.id };
}

export async function deleteDocument(roomId: string) {
  auth.protect();

  if (!roomId) return { success: false };

  // TODO: Make sure the user is the owner of the room

  await adminDb.collection("documents").doc(roomId).delete();
  const query = await adminDb
    .collectionGroup("rooms")
    .where("roomId", "==", roomId)
    .get();

  const batch = adminDb.batch();

  query.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });

  await batch.commit();

  await liveblocks.deleteRoom(roomId);

  return { success: true };
}

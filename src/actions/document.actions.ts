"use server";

import { auth } from "@clerk/nextjs/server";
import { adminDb } from "@/lib/firebaseServer";

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

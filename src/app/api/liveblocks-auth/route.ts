import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseServer";
import liveblocks from "@/lib/liveblocks";

export async function POST(req: NextRequest) {
  auth.protect();

  const { sessionClaims } = await auth();
  const { room } = await req.json();
  const { email = "", fullName = "", image = "" } = sessionClaims || {};

  const session = liveblocks.prepareSession(email, {
    userInfo: {
      name: fullName,
      email: email,
      avatar: image,
    },
  });

  const usersInRoom = await adminDb
    .collectionGroup("rooms")
    .where("userId", "==", sessionClaims?.email)
    .get();

  const userInRoom = usersInRoom.docs.find((doc) => doc.id === room);

  if (userInRoom?.exists) {
    session.allow(room, session.FULL_ACCESS);
    const { body, status } = await session.authorize();

    return new Response(body, { status });
  } else {
    return NextResponse.json(
      { message: "You are not in this room" },
      { status: 403 },
    );
  }
}

"use client";

import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
  useMyPresence,
  useOthers,
} from "@liveblocks/react/suspense";
import { use, PointerEvent } from "react";
import FollowPointer from "@/components/FollowPointer";
import LoadingSpinner from "@/components/LoadingSpinner";

type LiveBlocksWrapperProps = {
  params: Promise<{
    id: string;
  }>;
  children: React.ReactNode;
};

const LiveBlocksWrapper: React.FC<LiveBlocksWrapperProps> = ({
  params,
  children,
}) => {
  if (!process.env.NEXT_PUBLIC_LIVEBLOCKS_API_KEY) {
    throw new Error(
      "Please provide your Liveblocks API key in the .env.local file",
    );
  }

  const { id } = use(params);

  return (
    <LiveblocksProvider throttle={16} authEndpoint={"/api/liveblocks-auth"}>
      <RoomProvider
        id={id}
        initialPresence={{
          cursor: null,
        }}
      >
        <ClientSideSuspense
          fallback={
            <div className="flex min-h-[calc(100vh-96px)] items-center justify-center">
              <LoadingSpinner />
            </div>
          }
        >
          <Others>{children}</Others>
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
};

type OthersProps = {
  children: React.ReactNode;
};

const Others: React.FC<OthersProps> = ({ children }) => {
  const [_, updateMyPresence] = useMyPresence();
  const others = useOthers();

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    updateMyPresence({
      cursor: { x: Math.floor(event.pageX), y: Math.floor(event.pageY) },
    });
  };

  const handlePointerLeave = () => {
    updateMyPresence({ cursor: null });
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="h-full w-full"
    >
      {others
        .filter((other) => other.presence.cursor !== null)
        .map(({ connectionId, presence, info }) => (
          <FollowPointer
            key={connectionId}
            info={info}
            x={presence.cursor!.x}
            y={presence.cursor!.y}
          />
        ))}
      {children}
    </div>
  );
};

export default LiveBlocksWrapper;

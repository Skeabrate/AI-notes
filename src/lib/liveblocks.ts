import { Liveblocks } from "@liveblocks/node";

const key = process.env.LIVEBLOCKS_PRIVATE_API_KEY;

if (!key) {
  throw new Error("Please provide your Liveblocks API key");
}

const liveblocks = new Liveblocks({
  secret: key,
});

export default liveblocks;

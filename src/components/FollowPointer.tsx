import { motion } from "framer-motion";
import { UserMetaInfo } from "../../liveblocks.config";
import { stringToColor } from "@/utils/stringToColor";

type FollowPointerProps = {
  info: UserMetaInfo;
  x: number;
  y: number;
};

const FollowPointer: React.FC<FollowPointerProps> = ({ info, x, y }) => {
  const color = stringToColor(info.email || "1");

  return (
    <motion.div
      className="absolute z-50 h-4 w-4 rounded-full"
      style={{
        top: y,
        left: x,
        pointerEvents: "none",
      }}
      initial={{ scale: 1, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
    >
      <div className="h-4 w-4 rounded-full" style={{ background: color }} />
      <motion.div
        className="min-w-max whitespace-nowrap rounded-full bg-neutral-200 p-2 text-xs font-bold text-black"
        style={{ background: color }}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
      >
        {info?.name || info.email}
      </motion.div>
    </motion.div>
  );
};

export default FollowPointer;

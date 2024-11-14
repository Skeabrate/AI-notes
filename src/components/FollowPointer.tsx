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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill={color}
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-mouse-pointer-2"
      >
        <path
          fill={color}
          d="M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z"
        />
      </svg>
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

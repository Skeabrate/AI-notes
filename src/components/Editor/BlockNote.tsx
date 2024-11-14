import { BlockNoteEditor } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import { useSelf } from "@liveblocks/react/suspense";
import "@blocknote/shadcn/style.css";
import "@blocknote/core/fonts/inter.css";
import * as Y from "yjs";
import { stringToColor } from "@/utils/stringToColor";

type BlockNoteProps = {
  doc: Y.Doc;
  provider: any;
  darkMode: boolean;
};

const BlockNote: React.FC<BlockNoteProps> = ({ doc, provider, darkMode }) => {
  const userInfo = useSelf((me) => me.info);

  const editor: BlockNoteEditor = useCreateBlockNote({
    collaboration: {
      provider,
      fragment: doc.getXmlFragment("document-store"),
      user: {
        name: userInfo?.name,
        color: stringToColor(userInfo?.email),
      },
    },
  });

  return <BlockNoteView editor={editor} theme={darkMode ? "dark" : "light"} />;
};

export default BlockNote;

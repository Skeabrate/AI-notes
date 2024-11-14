"use client";

import { useRoom } from "@liveblocks/react/suspense";
import { LiveblocksYjsProvider } from "@liveblocks/yjs";
import clsx from "clsx";
import { MoonIcon, SunIcon } from "lucide-react";
import { useEffect, useState } from "react";
import * as Y from "yjs";
import BlockNote from "./BlockNote";
import { Button } from "../ui/button";

const Editor = () => {
  const room = useRoom();
  const [doc, setDoc] = useState<Y.Doc>();
  const [provider, setProvider] = useState<LiveblocksYjsProvider>();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const yDoc = new Y.Doc();
    const yProvider = new LiveblocksYjsProvider(room, yDoc);

    setDoc(yDoc);
    setProvider(yProvider);

    return () => {
      yDoc?.destroy();
      yProvider?.destroy();
    };
  }, [room]);

  if (!doc || !provider) return null;

  return (
    <div>
      <div className="mb-10 flex items-center justify-end gap-2">
        {/* TranslateDocument */}
        {/* ChatToDocument */}

        <Button
          className={clsx(
            "!p-3 hover:text-white",
            darkMode
              ? "bg-gray-700 text-gray-300 hover:bg-gray-100 hover:text-gray-700"
              : "bg-gray-100 text-gray-700 hover:bg-gray-700 hover:text-gray-300",
          )}
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? <SunIcon size={16} /> : <MoonIcon size={16} />}
        </Button>
      </div>

      <BlockNote doc={doc} provider={provider} darkMode={darkMode} />
    </div>
  );
};

export default Editor;

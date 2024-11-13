import clsx from "clsx";
import { doc } from "firebase/firestore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { db } from "@/lib/firebaseClient";

type SidebarOptionProps = {
  href: string;
  id: string;
};

const SidebarOption: React.FC<SidebarOptionProps> = ({ href, id }) => {
  const [data, loading, error] = useDocumentData(doc(db, "documents", id));
  const pathname = usePathname();
  const isActive = href.includes(pathname) && pathname !== "/";

  if (!data) return null;

  return (
    <Link
      href={href}
      className={clsx(
        "rounded-md border p-2",
        isActive ? "border-black bg-gray-300 font-bold" : "border-gray-400",
      )}
    >
      <p className="truncate">{data?.title}</p>
    </Link>
  );
};

export default SidebarOption;

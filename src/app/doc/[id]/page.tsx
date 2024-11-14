"use client";

import { use } from "react";
import Document from "@/components/Document/Document";

type DocumentPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const DocumentPage: React.FC<DocumentPageProps> = ({ params }) => {
  const { id } = use(params);
  return <Document id={id} />;
};

export default DocumentPage;

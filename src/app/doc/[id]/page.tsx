"use client";

import Document from "@/components/Document";

type DocumentPageProps = {
  params: {
    id: string;
  };
};

const DocumentPage: React.FC<DocumentPageProps> = ({ params }) => {
  return (
    <div className="">
      <Document id={params.id} />
    </div>
  );
};

export default DocumentPage;

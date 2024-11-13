import { ArrowLeftCircle } from "lucide-react";

export default function Home() {
  return (
    <div className="flex animate-pulse items-center space-x-2">
      <ArrowLeftCircle className="h-10 w-10" />
      <h1>Get started with creating a New Document</h1>
    </div>
  );
}

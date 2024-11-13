import { auth } from "@clerk/nextjs/server";
import LiveBlocksWrapper from "@/components/doc/LiveBlocksWrapper";

type PageLayoutProps = {
  children: React.ReactNode;
  params: Promise<{
    id: string;
  }>;
};

const PageLayout = async ({ children, params }: PageLayoutProps) => {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) redirectToSignIn();

  return <LiveBlocksWrapper params={params}>{children}</LiveBlocksWrapper>;
};

export default PageLayout;

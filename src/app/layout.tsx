import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Header />
          <Sidebar />
          <main className="ml-[50px] min-h-[calc(100vh-64px)] bg-gray-100 p-4 md:ml-[167px]">
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}

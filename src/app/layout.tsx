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
          <div className="flex h-[calc(100vh-64px)] overflow-y-auto">
            <Sidebar />
            <main className="flex-1 p-4">{children}</main>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}

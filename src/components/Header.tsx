"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Breadcrumbs from "./Breadcrumbs";

const Header = () => {
  const { user } = useUser();

  return (
    <header className="flex h-16 items-center justify-between p-4">
      {user && <h1 className="text-xl">{user.fullName + "'s"} space</h1>}

      <Breadcrumbs />

      <div>
        <SignedOut>
          <SignInButton />
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
};

export default Header;

import React from "react";
import { ModeToggle } from "./ModeToggle";
import Link from "next/link";
import { CodeIcon } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import DashboardBtn from "./DashboardBtn";

const Navbar = () => {
  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-2xl mr-6 font-mono hover:opacity-80 transition-opacity"
        >
          <CodeIcon className="size-8 text-emerald-500" />
          <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
            CodeSync
          </span>
        </Link>
        <SignedOut>
          <div className="flex items-center space-x-4 ml-auto">
            <Link
              href="/sign-in"
              className="px-4 py-2 rounded bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="px-4 py-2 rounded bg-teal-500 text-white font-semibold hover:bg-teal-600 transition-colors"
            >
              Sign Up
            </Link>
            <ModeToggle />
          </div>
        </SignedOut>
        <SignedIn>
          <div className="flex items-center space-x-4 ml-auto">
            <DashboardBtn />
            <ModeToggle />
            <UserButton />
          </div>
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;

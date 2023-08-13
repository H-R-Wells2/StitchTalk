import React from "react";
import Link from "next/link";
import Image from "next/image";
import { OrganizationSwitcher, SignOutButton, SignedIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const Topbar = () => {
  return (
    <nav className="topbar">
      <Link href={"/"} className="flex items-center max-xs:gap-1 gap-4">
        <Image src={"/assets/temp.svg"} alt="logo" width={35} height={34} />
        <p className="text-heading3-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-primary-500 to-pink-400 animate-text">
          StitchTalk
        </p>
      </Link>
      <div className="flex items-center gap-1">
        <div className="block md:hidden">
          <SignedIn>
            <SignOutButton>
              <div className="flex cursor-pointer">
                <Image
                  src={"/assets/logout.svg"}
                  alt="logout"
                  width={24}
                  height={24}
                />
              </div>
            </SignOutButton>
          </SignedIn>
        </div>
        <OrganizationSwitcher
          appearance={{
            baseTheme: dark,
            elements: {
              organizationSwitcherTrigger: "py-1 px-2",
            },
          }}
        />
      </div>
    </nav>
  );
};

export default Topbar;

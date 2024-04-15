import React from "react";
import { MainNav } from "./main-nav";
import { ProfileHeader } from "./profile-header";
import PeerlistBanner from "./PeerlistBanner";

export const SiteHeader = async () => {
  return (
    <header className="fixed  top-0 left-0  z-40 w-full  bg-transparent backdrop-blur-[18px] border-b">
      {/* <PeerlistBanner /> */}
      <div className="flex px-4 md:px-8 h-14 items-center justify-between">
        <MainNav></MainNav>
        <div className="flex items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <ProfileHeader />
          </nav>
        </div>
      </div>
    </header>
  );
};

"use client";
import React, { useMemo } from "react";
import { GlowingButton } from "@repo/ui/components/buttons";
import { WalletIcon, useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useWalletMultiButton } from "@solana/wallet-adapter-base-ui";
import { Button } from "@repo/ui/components";
import { useWallet } from "@solana/wallet-adapter-react";
import { signOut } from "@repo/auth";

export const ProfileHeader = () => {
  const { setVisible: setModalVisible } = useWalletModal();
  const { connected, connecting, disconnecting, disconnect } = useWallet();
  const { publicKey, walletIcon, walletName } = useWalletMultiButton({
    onSelectWallet() {
      setModalVisible(true);
    },
  });
  const walletAddress = publicKey?.toBase58();
  const pubKey = useMemo(() => {
    return walletAddress?.slice(0, 4) + ".." + walletAddress?.slice(-4);
  }, [publicKey]);
  return (
    <>
      {connected ? (
        <>
          <GlowingButton
            animationType="none"
            buttonIcon={
              walletIcon &&
              walletName && (
                <WalletIcon
                  className="size-5"
                  wallet={{ adapter: { icon: walletIcon, name: walletName } }}
                />
              )
            }
          >
            <span className="hidden md:block">{pubKey}</span>{" "}
          </GlowingButton>
          <Button
            animationType="none"
            variant="outline"
            isLoading={disconnecting}
            className="hidden sm:block"
            onClick={async () => {
              disconnect();
              signOut({ redirect: false });
            }}
          >
            Disconnect
          </Button>
          <Button
            animationType="none"
            variant="outline"
            isLoading={disconnecting}
            className="sm:hidden w-12"
            onClick={async () => {
              disconnect();
              await signOut({ redirect: false });
            }}
          >
            <svg
              fill="#ffffff"
              width="28px"
              height="28px"
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
              className="icon"
              stroke="#ffffff"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0" />

              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              />

              <g id="SVGRepo_iconCarrier">
                {" "}
                <path d="M832.6 191.4c-84.6-84.6-221.5-84.6-306 0l-96.9 96.9 51 51 96.9-96.9c53.8-53.8 144.6-59.5 204 0 59.5 59.5 53.8 150.2 0 204l-96.9 96.9 51.1 51.1 96.9-96.9c84.4-84.6 84.4-221.5-.1-306.1zM446.5 781.6c-53.8 53.8-144.6 59.5-204 0-59.5-59.5-53.8-150.2 0-204l96.9-96.9-51.1-51.1-96.9 96.9c-84.6 84.6-84.6 221.5 0 306s221.5 84.6 306 0l96.9-96.9-51-51-96.8 97zM260.3 209.4a8.03 8.03 0 0 0-11.3 0L209.4 249a8.03 8.03 0 0 0 0 11.3l554.4 554.4c3.1 3.1 8.2 3.1 11.3 0l39.6-39.6c3.1-3.1 3.1-8.2 0-11.3L260.3 209.4z" />{" "}
              </g>
            </svg>
          </Button>
        </>
      ) : (
        <GlowingButton
          tap="in"
          animationType="none"
          isLoading={connecting}
          onClick={() => {
            setModalVisible(true);
          }}
        >
          Connect Wallet
        </GlowingButton>
      )}
    </>
  );
};

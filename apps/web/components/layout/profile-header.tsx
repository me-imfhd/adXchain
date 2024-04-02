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
            {pubKey}
          </GlowingButton>
          <Button
            animationType="none"
            variant="outline"
            isLoading={disconnecting}
            onClick={async () => {
              disconnect();
              signOut({redirect:false});
            }}
          >
            Disconnect
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

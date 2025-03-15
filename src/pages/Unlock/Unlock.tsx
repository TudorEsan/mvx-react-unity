import {
  ExtensionLoginButton,
  LedgerLoginButton,
  WalletConnectLoginButton,
  WebWalletLoginButton,
} from "@/components";
import { useMemo } from "react";

export const Unlock = () => {
  const buttons = useMemo(() => {
    const defaultButtons = [
      {
        title: "xPortal",
        icon: "/images/login-icons/x-mint.svg",

        component: WalletConnectLoginButton,
      },
      {
        title: "Web Wallet",
        icon: "/images/login-icons/x-mint.svg",
        component: WebWalletLoginButton,
      },
      {
        title: "DeFi Wallet",
        icon: "/images/login-icons/defiWallet.svg",
        component: ExtensionLoginButton,
      },
      {
        title: "Ledger",
        icon: "/images/login-icons/ledger.svg",
        component: LedgerLoginButton,
      },
    ];

    return defaultButtons;
  }, []);

  return (
    <div className="flex justify-center items-center">
      <div
        className="flex flex-col p-6 items-center justify-center gap-4 rounded-xl bg-[#f6f8fa]"
        data-testid="unlockPage"
      >
        <div className="flex flex-col items-center gap-1">
          <h2 className="text-2xl">Login</h2>

          <p className="text-center text-gray-400">Choose a login method</p>
        </div>

        <div className="flex flex-col md:flex-row">
          {buttons.map((button) => (
            <button.component
              key={button.title}
              className="w-full"
              nativeAuth
              callbackRoute={"/"}
            >
              {button.title}
            </button.component>
          ))}
        </div>
      </div>
    </div>
  );
};

import React from "react";
import {
  AxiosInterceptorContext, // using this is optional
  DappProvider,
  TransactionsToastList,
  NotificationModal,
  SignTransactionsModals,
  // uncomment this to use the custom transaction tracker
  // TransactionsTracker
} from "@/components";

import { apiTimeout, walletConnectV2ProjectId, environment } from "@/config";
import { RouteNamesEnum } from "@/localConstants";
import { AxiosInterceptorContextProvider } from "@multiversx/sdk-dapp/wrappers/AxiosInterceptorContext/components";

interface IMultiversxProviderProps {
  children: React.ReactNode;
}

export const MultiversxProvider = ({ children }: IMultiversxProviderProps) => {
  return (
    <DappProvider
      environment={environment}
      customNetworkConfig={{
        name: "customConfig",
        apiTimeout,
        walletConnectV2ProjectId,
      }}
      dappConfig={{
        shouldUseWebViewProvider: true,
      }}
      customComponents={{
        transactionTracker: {
          // uncomment this to use the custom transaction tracker
          // component: TransactionsTracker,
          props: {
            onSuccess: (sessionId: string) => {
              console.log(`Session ${sessionId} successfully completed`);
            },
            onFail: (sessionId: string, errorMessage: string) => {
              console.log(`Session ${sessionId} failed. ${errorMessage ?? ""}`);
            },
          },
        },
      }}
    >
      <AxiosInterceptorContextProvider>
        <AxiosInterceptorContext.Listener>
          <TransactionsToastList />
          <NotificationModal />
          <SignTransactionsModals />
          {children}
        </AxiosInterceptorContext.Listener>
      </AxiosInterceptorContextProvider>
    </DappProvider>
  );
};

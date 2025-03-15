import { MultiversxProvider } from "./multiversx-provider";

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return <MultiversxProvider>{children}</MultiversxProvider>;
};

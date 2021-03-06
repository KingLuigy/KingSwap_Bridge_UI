export interface Props {
  logo: string | null;
  address: string;
  providerChainId?: number;
  isConnected: boolean;
  onClick(): void;
}

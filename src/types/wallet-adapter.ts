export type WalletAdapter = {
  connect: () => Promise<string>;
  isConnected: () => Promise<boolean>;
  getAddress: () => Promise<string>;
};

export type TxBase = { _hex: string; isBigNumber: boolean; hash: string };
export type TxResult = { success: boolean };

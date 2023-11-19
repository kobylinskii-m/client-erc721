import { TransactionReceipt } from "@ethersproject/providers";
import { MetamaskAdapter } from "../wallets/metamask-adapter";

export class ProviderService {
  private readonly _metamask = new MetamaskAdapter();

  /**
   * getTransactionReceipt Waits for the hash Transaction information to appear in the blockchain
   */
  public getTransactionReceipt(
    hash: string,
    maxTimeout = 60000
  ): Promise<TransactionReceipt> {
    return new Promise((resolve, reject) => {
      const id = setInterval(async () => {
        const provider = await this._getProvider();
        const tx = await provider.getTransactionReceipt(hash);
        if (tx) {
          clearInterval(id);
          clearTimeout(tId);
          resolve(tx);
        }
      }, 1000);
      const tId = setTimeout(() => {
        clearInterval(id);
        reject(new Error("Error timeout"));
      }, maxTimeout);
    });
  }

  private async _getProvider() {
    const provider = await this._metamask.getProvider();
    if (!provider) throw new Error("Provider not fount");
    return provider;
  }
}

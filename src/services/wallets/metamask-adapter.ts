import { JsonRpcSigner } from "@ethersproject/providers";
import { AsyncFunc } from "@type/async-func";
import { WalletAdapter } from "@type/wallet-adapter";
import { ethers } from "ethers";
import { MetamaskCore } from "../metamask/metamask-core";

const metamask = new MetamaskCore();

const openMetaMaskUrl = (url: string): void => {
  const a = document.createElement("a");

  a.href = url;
  a.target = "_blank";
  a.click();
  a.remove();
};

export class MetamaskAdapter implements WalletAdapter {
  getAddress: AsyncFunc<void, string> = async () => {
    try {
      const walletAddress: string[] = await metamask.ethereum?.request({
        method: "eth_requestAccounts",
      });

      if (!walletAddress) return "";

      return walletAddress[0];
    } catch (e: any) {
      if (e.code === 4001) {
        console.warn("Please connect to MetaMask.");

        return "";
      }
      console.error(e);

      return "";
    }
  };

  isConnected = async () => {
    return ((await metamask.ethereum?.isConnected?.()) as boolean) ?? false;
  };

  connect = async () => {
    if (metamask.isMetamask) {
      return await metamask.connectWallet();
    } else {
      openMetaMaskUrl(`https://metamask.app.link/dapp/metaislands.ldtc.space/`);
      return "";
    }
  };

  getSigner: AsyncFunc<void, JsonRpcSigner | null> = async () => {
    try {
      const signer: JsonRpcSigner = await new ethers.providers.Web3Provider(
        (window as any).ethereum
      ).getSigner();

      return signer;
    } catch (e) {
      console.warn(e);

      return null;
    }
  };

  getProvider = async () => {
    try {
      return await new ethers.providers.Web3Provider((window as any).ethereum);
    } catch (e) {
      console.warn(e);

      return null;
    }
  };
}

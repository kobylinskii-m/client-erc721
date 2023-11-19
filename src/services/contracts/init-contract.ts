import { AbiItem } from "@type/abi-type";
import { ethers } from "ethers";
import { MetamaskAdapter } from "../wallets/metamask-adapter";

export const initContract = async (address: string, abi: AbiItem[]) => {
  const metamaskWallet = new MetamaskAdapter();
  const signer = await metamaskWallet.getSigner();
  if (!signer) return null;
  return new ethers.Contract(address, abi as any, signer);
};

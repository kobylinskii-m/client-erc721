import { ButtonWrapperLoading } from "@ui/button/button-wrapper-loading";
import { Text } from "@ui/text/text";
import { Title } from "@ui/title/title";
import * as React from "react";
import { MetamaskAdapter } from "src/services/wallets/metamask-adapter";

export type HeaderPropsTypes = {} & Partial<React.ReactPortal>;

export const Header: React.FC<HeaderPropsTypes> = () => {
  const metamaskWallet = new MetamaskAdapter();
  const [walletAddress, setWalletAddress] = React.useState<string>("");

  const getWalletAddress = async () => {
    const address = await metamaskWallet.getAddress();
    setWalletAddress(address);
  };

  const connectMetamask = async () => {
    await metamaskWallet.connect();
    await getWalletAddress();
  };

  return (
    <div className="flex justify-between w-full px-20 py-6 min-w-[728px] shadow-md border-b rounded-2xl">
      <a className="flex space-x-2" href="https://kobylinskii-m.ru/">
        <Title level={1} className="!text-3xl">
          Maxim
        </Title>
        <Title level={1} className="text-primary !text-3xl">
          Kobylinskii
        </Title>
      </a>
      <div className="flex flex-col">
        {walletAddress ? (
          <Text>{`Wallet ${walletAddress}`}</Text>
        ) : (
          <ButtonWrapperLoading
            size="sm"
            onClick={connectMetamask}
            color="info"
          >
            Connect wallet
          </ButtonWrapperLoading>
        )}
        <Text className="text-error">Only the blockchain mumbai</Text>
      </div>
    </div>
  );
};

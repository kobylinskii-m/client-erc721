import { ButtonWrapperLoading } from "@ui/button/button-wrapper-loading";
import { BaseInput } from "@ui/input/base-input";
import { Text } from "@ui/text/text";
import { Title } from "@ui/title/title";
import * as React from "react";
import { CollectionContractService } from "src/services/contracts/collection-contract.service";
import { ipfsServiceInstance } from "src/services/ipfs/ipfs.instance";
import { NotificationsMessages } from "src/services/notifications/notifications-constant";
import NotifyService from "src/services/notifications/notify-service";
import { MetamaskAdapter } from "src/services/wallets/metamask-adapter";

export type TokenMetadataPropsTypes = {
  collectionAddress: string;
} & Partial<React.ReactPortal>;

export const TokenMetadata: React.FC<TokenMetadataPropsTypes> = ({
  collectionAddress,
}) => {
  const [file, setFile] = React.useState<File | undefined>();
  const [name, setName] = React.useState<string>();
  const [description, setDescription] = React.useState<string>();
  const collection = new CollectionContractService(collectionAddress);
  const metamaskWallet = new MetamaskAdapter();

  async function mintToken(name: string, description: string, file: File) {
    const uploadFile = await ipfsServiceInstance.uploadFile(file);

    const uploadJson = await ipfsServiceInstance.uploadJson({
      description: description,
      external_url: process.env.REACT_APP_MY_SITE,
      image: uploadFile.gatewayUrl,
      name: name,
    });

    const myWallet = await metamaskWallet.getAddress();
    await collection.mint(myWallet, uploadJson.gatewayUrl);
    NotifyService.message(
      NotificationsMessages.SUCCESS_MINT_COLLECTION,
      NotificationsMessages.VIEW_LAST_TOKEN_MINT
    );
  }

  return (
    <>
      <div className="flex flex-col space-y-5 w-full shadow-md border rounded-2xl px-5 py-8">
        <Title level={1}>Token mint to collection</Title>
        <div className="grid grid-cols-2 gap-4 items-center">
          <div className="flex flex-col">
            <Text className="text-xl font-semibold  whitespace-nowrap">
              Image token
            </Text>
            <Text>
              Can be just about any type of image (including SVGs, which will be
              cached into PNGs), and can be IPFS URLs or paths. We recommend
              using a 350 x 350 image.
            </Text>
          </div>
          <input
            type="file"
            className="file-input file-input-bordered file-input-primary max-w-xs"
            accept="image/png, image/gif, image/jpeg"
            onChange={(e) => setFile(e.target.files?.[0])}
          />
          <div className="flex flex-col">
            <Text className="text-xl font-semibold  whitespace-nowrap">
              Name token
            </Text>
            <Text>Name of the item.</Text>
          </div>
          <BaseInput
            isBordered
            placeholder="Name token: Example: Token 1"
            onChange={(e) => setName(e.target.value)}
          />
          <div className="flex flex-col">
            <Text className="text-xl font-semibold  whitespace-nowrap">
              Description token
            </Text>
            <Text>
              A human readable description of the item. Markdown is supported.
            </Text>
          </div>
          <BaseInput
            isBordered
            placeholder="Description token"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <ButtonWrapperLoading
          color="info"
          onClick={async () => {
            try {
              if (!name || !description) {
                return NotifyService.message(
                  NotificationsMessages.NOT_NAME_AND_DESCRIPTION_TITLE,
                  NotificationsMessages.FILL_ALL
                );
              }

              if (!file) {
                return NotifyService.message(
                  NotificationsMessages.NOT_PHOTO,
                  NotificationsMessages.FILL_ALL
                );
              }

              return await mintToken(name, description, file);
            } catch (error) {
              console.error(error);
              return NotifyService.message(
                NotificationsMessages.ERROR_MINT_TOKEN,
                NotificationsMessages.DEV_PANEL
              );
            }
          }}
        >
          Mint
        </ButtonWrapperLoading>
      </div>
    </>
  );
};

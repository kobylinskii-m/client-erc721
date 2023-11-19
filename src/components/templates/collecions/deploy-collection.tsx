import { ButtonWrapperLoading } from "@ui/button/button-wrapper-loading";
import { Checkbox } from "@ui/checkbox/checkbox";
import { BaseInput } from "@ui/input/base-input";
import { Text } from "@ui/text/text";
import { Title } from "@ui/title/title";
import * as React from "react";
import { collectionFactoryContractService } from "src/services/contracts/contracts.instance";
import { NotificationsMessages } from "src/services/notifications/notifications-constant";
import NotifyService from "src/services/notifications/notify-service";

export type DeployCollectionPropsTypes = {
  collectionAddress: string;
  setCollectionAddress: (address: string) => void;
} & Partial<React.ReactPortal>;

export const DeployCollection: React.FC<DeployCollectionPropsTypes> = ({
  collectionAddress,
  setCollectionAddress,
}) => {
  const [isDeployCollection, setIsDeployCollection] =
    React.useState<boolean>(false);

  const [name, setName] = React.useState<string | null>(null);
  const [symbol, setSymbol] = React.useState<string | null>(null);

  return (
    <div className="flex flex-col space-y-5 w-full shadow-md border rounded-2xl px-5 py-8">
      <Title level={1}>Deploy collection</Title>
      <div className="flex justify-between">
        <div className="flex items-center space-x-3">
          <Text className="font-black text-xl">
            Has the collection been created?
          </Text>
          <Checkbox onChange={(e) => setIsDeployCollection(e.target.checked)} />
        </div>
      </div>
      <BaseInput
        isBordered
        color={!isDeployCollection ? "info" : "base"}
        disabled={!isDeployCollection}
        placeholder="Collection address"
        value={!isDeployCollection ? collectionAddress : undefined}
        onChange={(e) =>
          isDeployCollection && setCollectionAddress(e.target.value)
        }
      />
      <BaseInput
        isBordered
        color={!isDeployCollection ? "info" : "base"}
        disabled={isDeployCollection}
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />
      <div className="flex justify-between">
        <BaseInput
          isBordered
          color={!isDeployCollection ? "info" : "base"}
          disabled={isDeployCollection}
          placeholder="Symbol"
          onChange={(e) => setSymbol(e.target.value)}
        />
        <ButtonWrapperLoading
          color={!isDeployCollection ? "info" : "base"}
          disabled={isDeployCollection}
          className="self-end"
          onClick={async () => {
            if (!name || !symbol)
              return NotifyService.message(
                NotificationsMessages.NOT_NAME_AND_SYMBOL_TITLE,
                NotificationsMessages.FILL_ALL
              );
            try {
              const result = await collectionFactoryContractService.deployNew(
                name,
                symbol
              );
              const events =
                await collectionFactoryContractService.getEventsByHash(
                  result.hash
                );
              const event = events?.[0];
              if (event?.args?.collection) {
                setCollectionAddress(event?.args?.collection);
                NotifyService.message(
                  NotificationsMessages.SUCCESS_CREATED_COLLECTION,
                  NotificationsMessages.COPY_ADDRESS
                );
              }
            } catch (error) {
              console.error(error);
              return NotifyService.message(
                NotificationsMessages.ERROR_CREATED_COLLECTION,
                NotificationsMessages.DEV_PANEL
              );
            }
          }}
        >
          To create
        </ButtonWrapperLoading>
      </div>
    </div>
  );
};

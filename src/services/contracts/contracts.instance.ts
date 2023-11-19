import { CollectionFactoryContractService } from "./collection-factory-contract.service";

export const collectionFactoryContractService =
  new CollectionFactoryContractService(
    process.env.REACT_APP_COLLECTION_FACTORY_ADDRESS_MUMBAI as string
  );

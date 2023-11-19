import { IpfsService } from "./ipfs.service";

export const ipfsServiceInstance = new IpfsService(
  process.env.REACT_APP_IPFS_INFURA_URL as string,
  process.env.REACT_APP_IPFS_INFURA_KEY as string,
  process.env.REACT_APP_IPFS_INFURA_SECRET as string,
  process.env.REACT_APP_IPFS_INFURA_GATEWAY as string
);

import { AbiItem } from "@type/abi-type";

export const ERC721FactoryABI: AbiItem[] = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "collection",
        type: "address",
      },
    ],
    name: "CollectionCreated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol",
        type: "string",
      },
    ],
    name: "createCollection",
    outputs: [
      {
        internalType: "address",
        name: "collection",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

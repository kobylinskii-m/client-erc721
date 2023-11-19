import { TransactionResponse } from "@ethersproject/providers";
import { Contract } from "ethers";
import { ERC721FactoryABI } from "../web3/abi/erc721-factory-abi";
import { ProviderService } from "../web3/provider.service";
import { initContract } from "./init-contract";

export class CollectionFactoryContractService {
  private _contract!: Contract;
  private readonly _provider = new ProviderService();

  constructor(private readonly _address: string) {}

  public async deployNew(
    name: string,
    symbol: string
  ): Promise<TransactionResponse> {
    const contract = await this._getContract();
    return await contract.createCollection(name, symbol);
  }

  public async getEventsByHash(hash: string) {
    const contract = await this._getContract();
    const tx = await this._provider.getTransactionReceipt(hash);
    return tx.logs
      .map((log) => {
        try {
          return contract.interface.parseLog(log);
        } catch {
          return undefined;
        }
      })
      .filter((e) => !!e);
  }

  private async _getContract(): Promise<Contract> {
    if (this._contract) return this._contract;
    this._contract = (await initContract(
      this._address,
      ERC721FactoryABI
    )) as Contract;
    return this._contract;
  }

  public set contract(value: Contract) {
    this._contract = value;
  }
}

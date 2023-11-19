import { Contract } from "ethers";
import { ERC721ABI } from "../web3/abi/erc721-abi";
import { initContract } from "./init-contract";

export class CollectionContractService {
  private _contract!: Contract;

  constructor(private readonly _address: string) {}

  public async mint(to: string, tokenURI: string) {
    const contract = await this.getContract();
    return await contract.mint(to, tokenURI);
  }

  public async getContract(): Promise<Contract> {
    if (this._contract) return this._contract;
    this._contract = (await initContract(this._address, ERC721ABI)) as Contract;
    return this._contract;
  }

  public async interface() {
    const contract = await this.getContract();
    return contract.interface;
  }
}

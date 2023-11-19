import axios, { AxiosInstance } from "axios";
import { BasicAuthService } from "../auth/basic-auth.service";

export class IpfsService {
  private readonly _instance: AxiosInstance;
  constructor(
    private readonly _url: string,
    private readonly _key: string,
    private readonly _secret: string,
    private readonly _gatewayDomain: string = "infura-ipfs.io"
  ) {
    this._instance = axios.create({
      baseURL: this._url,
      headers: {
        Authorization: this._getAuthHeader(),
        "Content-Type": "multipart/form-data",
      },
    });
  }

  /**
   * uploadFile File Upload
   */
  public async uploadFile(file: File) {
    return await this._uploadData(file);
  }

  /**
   * uploadJson Loading json
   */
  public async uploadJson(data: Record<string, any>) {
    return await this._uploadData(JSON.stringify(data));
  }

  private async _uploadData(_data: string | Blob) {
    // Create FormData object to append the file
    const formData = new FormData();
    formData.append("file", _data);

    const { data } = await this._wrapper(async () => {
      return await this._instance.post("/add", formData);
    });
    return {
      hash: data.Hash,
      gatewayUrl: this._generateGatewayUrlByHash(data.Hash),
    };
  }

  /**
   *
   * @param hash of the uploaded object.
   * @returns Url for viewing the file
   */
  private _generateGatewayUrlByHash(hash: string) {
    return "https://" + this._gatewayDomain + `/ipfs/${hash}`;
  }

  /**
   *
   * @returns Authorization header Basic
   */
  private _getAuthHeader() {
    return BasicAuthService.getBasicToken(this._key, this._secret);
  }

  /**
   *
   * @param fc function
   * @returns Wraps the function. In case of an error, adds information to the developer console
   */
  private async _wrapper<T>(fc: () => Promise<T>): Promise<T> {
    try {
      return await fc();
    } catch (error) {
      console.error("Error uploading to IPFS:", error);
      throw error;
    }
  }
}

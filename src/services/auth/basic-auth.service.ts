import { Buffer } from "buffer";

export class BasicAuthService {
  public static getBasicToken(username: string, password: string) {
    return `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`;
  }
}

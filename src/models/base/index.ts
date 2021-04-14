import newLogger from "core/logger";
import * as httpClient from "core/http";

export default class Model {
  protected logger = newLogger(this.constructor.name);
  protected endpoint: string;
  protected http = httpClient;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  protected getSearchUrl(): string {
    return `${this.endpoint}/search`;
  }

  protected getAddUrl(): string {
    return this.endpoint;
  }

  protected getUpdateUrl(): string {
    return this.endpoint;
  }

  protected getDetailUrl(): string {
    return this.endpoint;
  }

  protected getDeleteUrl(): string {
    return this.endpoint;
  }

  public async search(params: any): Promise<any> {
    try {
      return await this.http.get(this.getSearchUrl(), params);
    } catch (error) {
      this.logger.error("search error:", error);
      return null;
    }
  }

  public async add(params: any): Promise<any> {
    try {
      return await this.http.post(this.getAddUrl(), params);
    } catch (error) {
      this.logger.error("search error:", error);
      return null;
    }
  }

  public async update(params: any): Promise<any> {
    try {
      return await this.http.put(this.getUpdateUrl(), params);
    } catch (error) {
      this.logger.error("search error:", error);
      return null;
    }
  }

  public async detail(params: any): Promise<any> {
    try {
      return await this.http.get(this.getDetailUrl(), params);
    } catch (error) {
      this.logger.error("search error:", error);
      return null;
    }
  }

  public async delete(params: any): Promise<any> {
    try {
      return await this.http.del(this.getDeleteUrl(), params);
    } catch (error) {
      this.logger.error("search error:", error);
      return null;
    }
  }
}

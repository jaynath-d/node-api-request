const request = require("request");

const METHODS_WITH_NO_BODY = ['GET', 'HEAD', 'DELETE'];

export interface RequestOptions {
  url: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  headers?: { [key: string]: string };
  body?: any;
}

export interface ApiResponse<T = any> {
  status: number;
  body: T;
}

export default class NodeApiRequest {
  static sendRequest<T = any>(options: RequestOptions): Promise<ApiResponse<T>> {
    return new Promise((resolve, reject) => {
      request(
        {
          url: options.url,
          method: options.method || "GET",
          headers: options.headers,
          body: options.body,
          json: true,
        },
        (error: any, response: any, body: any) => {
          if (error) {
            reject(error);
          } else {
            const apiResponse: ApiResponse<any> = {
              status: response.statusCode,
              body: body,
            };
            resolve(apiResponse);
          }
        }
      );
    });
  }

  static methodHasNoBody(method:string){
    return METHODS_WITH_NO_BODY.indexOf(method) !== -1;
  }
}

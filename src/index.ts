const request = require("request");

const METHODS_WITH_NO_BODY = ['GET', 'HEAD', 'DELETE'];

export interface RequestOptions {
  url: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  headers?: { [key: string]: string };
  body?: any;
  params?: any;  
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
          body: NodeApiRequest.methodHasNoBody(options.method || 'GET') ?  undefined : options.body,
          params: NodeApiRequest.getQueryParams(options),
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

  protected static methodHasNoBody(method:string){
    return METHODS_WITH_NO_BODY.indexOf(method) !== -1;
  }

  protected static getQueryParams(req:RequestOptions){
    let queryParams = undefined;
    const shouldUseDataAsParams = req.body && (typeof req.body === 'object') && NodeApiRequest.methodHasNoBody(req.method || 'GET');
    if (shouldUseDataAsParams) {
      queryParams = req.body
    }
    return queryParams
  }
}

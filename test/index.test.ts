import NodeApiRequest, { ApiResponse } from '../src/index';

describe('NodeApiRequest', () => {

    // Tests that the sendRequest method successfully sends a GET request
    it('should successfully send a GET request', () => {
      // Mock the request function
      const mockRequest = jest.fn((options, callback) => {
        callback(null, { statusCode: 200 }, { data: "response body" });
      });

      // Replace the original request function with the mock
      jest.mock("request", () => mockRequest);

      // Call the sendRequest method with GET options
      const options: RequestOptions = {
        url: "http://example.com",
        method: "GET",
      };
      return NodeApiRequest.sendRequest(options).then((response) => {
        // Assert that the mock request function was called with the correct options
        expect(mockRequest).toHaveBeenCalledWith(
          {
            url: "http://example.com",
            method: "GET",
            headers: undefined,
            body: undefined,
            json: true,
          },
          expect.any(Function)
        );

        // Assert that the response status and body are correct
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ data: "response body" });
      });
    });
});

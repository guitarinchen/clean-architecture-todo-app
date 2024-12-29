export class BaseController {
  protected createResponse(status: number, body: string | null) {
    const init: ResponseInit = {
      status,
    };
    if (body) {
      init.headers = { "Content-Type": "application/json" };
    }
    return new Response(body, init);
  }

  protected createSuccessResponse(status: number, body: object | null = null) {
    return this.createResponse(status, body ? JSON.stringify(body) : null);
  }

  protected createErrorResponse(status: number, message: string) {
    return this.createResponse(
      status,
      JSON.stringify({
        error: {
          code: status,
          message,
        },
      }),
    );
  }

  protected getPathParams(request: Request, target: string) {
    const url = new URL(request.url);
    const path = url.pathname;
    const parts = path.split("/");
    const targetIndex = parts.indexOf(target);
    if (targetIndex === -1) {
      return null;
    }
    return parts[targetIndex + 1];
  }
}

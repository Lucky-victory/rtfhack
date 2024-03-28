import { NextApiRequest, NextApiResponse } from "next";
export function objectToSearchParams(obj: Record<string, string>) {
  const params = new URLSearchParams();

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      params.append(key, obj[key]);
    }
  }

  return params;
}

export async function successHandlerCallback<T>(
  req: NextApiRequest,
  res: NextApiResponse,
  data: T,
  status = 200
): Promise<void> {
  return res.status(status).json(data);
}
export async function errorHandlerCallback<T>(
  req: NextApiRequest,
  res: NextApiResponse,
  data: T,
  status = 500
): Promise<void> {
  return res.status(status).json(data);
}
export function maskWalletAddress(
  walletAddress: string,
  visibleChars: number = 4
): string {
  if (!walletAddress || walletAddress.length < visibleChars * 2) {
    return walletAddress;
  }

  const visiblePart = walletAddress.slice(0, visibleChars);
  const hiddenPart = "...";
  const lastVisiblePart = walletAddress.slice(-visibleChars);

  return `${visiblePart}${hiddenPart}${lastVisiblePart}`;
}

export type HTTP_METHOD = "GET" | "PUT" | "POST" | "DELETE";
export type HTTP_METHOD_CB = (
  req: NextApiRequest,
  res: NextApiResponse
) => Promise<void>;
export async function mainHandler(
  req: NextApiRequest,
  res: NextApiResponse,
  {
    GET,
    PUT,
    POST,
    DELETE,
  }: {
    GET?: HTTP_METHOD_CB;
    POST?: HTTP_METHOD_CB;
    PUT?: HTTP_METHOD_CB;
    DELETE?: HTTP_METHOD_CB;
  }
) {
  const method = req.method as HTTP_METHOD;
  switch (method) {
    case "GET":
      return await GET?.(req, res);
    case "POST":
      return await POST?.(req, res);
    case "PUT":
      return PUT?.(req, res);
    case "DELETE":
      return DELETE?.(req, res);

    default:
      return res.status(405).end();
  }
}

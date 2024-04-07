import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import generateUniqueId from "generate-unique-id";
import { nanoid } from "nanoid";
export const env = process.env.NODE_ENV || "development";
export const IS_DEV = env === "development";

export const generateCommunityId = (prefix = "GS") => {
  return generateNumId(prefix, 14, "-");
};
/**
 *
 * @param prefix  prefix f0r the ID
 * @param len length of the ID
 * @param sep separator fop the ID
 * @returns
 */
export const generateNumId = (prefix = "", len = 10, sep = "") => {
  return `${prefix}${sep}${generateUniqueId({
    useLetters: false,
    useNumbers: true,
    length: len,
  })}`;
};
export const generateUsername = (prefix = "GH", len = 10) => {
  return generateNumId(prefix, len, "_");
};
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
export function generateUrlSafeId(len = 21, prefix = ""): string {
  return prefix + nanoid(len);
}
interface NestedObject {
  [key: string]: any;
}

export function flattenArray<T extends NestedObject, U>(
  array: T[],
  callback: (item: T) => U | null
): U[] {
  const flattenedArray: U[] = [];

  array.forEach((item) => {
    const flattenedItem = callback(item);
    if (flattenedItem !== null) {
      flattenedArray.push(flattenedItem);
    }
  });

  return flattenedArray;
}
export function isDuplicate<T>(array: T[], property: keyof T, value: string) {
  return array.some((item) => item[property] === value);
}

export const apiPost = async (
  endpoint: string,
  params: Record<string, any>
) => {
  const result = await axios.post(`${endpoint}`, params, {
    headers: {
      "content-type": "application/json",
    },
  });
  return result.data;
};

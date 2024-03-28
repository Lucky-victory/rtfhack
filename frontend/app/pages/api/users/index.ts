import { db } from "@/db";
import { meetings, users } from "@/db/schema";
import {
  HTTP_METHOD_CB,
  errorHandlerCallback,
  mainHandler,
  successHandlerCallback,
} from "@/utils";
import { and, eq } from "drizzle-orm";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return mainHandler(req, res, {
    GET,
    POST,
  });
}

export const GET: HTTP_METHOD_CB = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { authId, chainId, address } = req.query;
    let where = authId
      ? { where: eq(users.authId, authId as string) }
      : {
          where: and(
            eq(users.chainId, chainId as string),
            eq(users.address, address as string)
          ),
        };
    const user = await db.query.users.findFirst({
      ...where,
    });
    return successHandlerCallback(req, res, {
      message: "user received successfully",
      data: user || null,
    });
  } catch (error) {
    return errorHandlerCallback(req, res, {
      message: "Something went wrong...",
      data: null,
    });
  }
};
export const POST: HTTP_METHOD_CB = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const data = req.body;
    const user = await db.transaction(async (tx) => {
      const [insertRes] = await tx.insert(users).values(data);

      const createdUser = await tx.query.users.findFirst({
        where: eq(users.id, insertRes.insertId),
      });
      return createdUser;
    });
    return successHandlerCallback(req, res, {
      message: "user created successfully",
      data: user,
    });
  } catch (error) {
    return errorHandlerCallback(req, res, {
      message: "Something went wrong...",
      data: null,
      error,
    });
  }
};

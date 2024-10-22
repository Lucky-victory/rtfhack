import { db } from "@/db";
import { users } from "@/db/schema";
import {
  HTTP_METHOD_CB,
  errorHandlerCallback,
  mainHandler,
  successHandlerCallback,
} from "@/utils";
import { and, eq, or } from "drizzle-orm";
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
    const user = await db.query.users.findMany({
      columns: {
        email: false,
        password: false,
      },
    });
    return successHandlerCallback(req, res, {
      message: "users retrieved successfully",
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
    const { authId, email, address, ...data } = req.body;
    const existingUser = await db.query.users.findFirst({
      columns: {
        password: false,
      },
      where: or(
        eq(users.email, email as string),
        eq(users.authId, authId as string),
        eq(users.address, address as string)
      ),
    });
    if (existingUser) {
      return successHandlerCallback(req, res, {
        message: "user already exists",
        data: existingUser,
      });
    }
    const user = await db.transaction(async (tx) => {
      const [insertRes] = await tx
        .insert(users)
        .values({ ...data, address, email, authId });

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

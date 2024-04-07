export type APIResponse<T = null> = {
  data: T;
  message?: string;
  error?: any;
};
export type USER = {
  id: number;
  address: string;
  chainId?: string;
  fullName?: string | null;
  role?: "admin" | "user";
  avatar?: string;
  authId?: string;
  email: string;
  userType?: "member" | "nutritionist";
};
export type NEW_USER = Pick<
  USER,
  "address" | "chainId" | "fullName" | "avatar" | "authId" | "email"
>;
export type MEETING = {
  id: number;
  roomId: string;
  title: string;
  authId?: string;
  participants?: number;
  creator?: {
    id: number;
    address: string;
    chainId?: number;
    authId: string;
  };
};
export type MEETING_RECORD = {
  id: number;
  meetingId?: number;
  roomId: string;
  recordDuration: number;
  authId?: string;
  recordUri: string;
};
export type NEW_MEETING_RECORD = Pick<
  MEETING_RECORD,
  "meetingId" | "recordDuration" | "recordUri" | "roomId" | "authId"
>;
export type NEW_MEETING = Pick<MEETING, "roomId" | "authId" | "title">;
// export type UserSession = DefaultSession & {
//   address: string;
//   chainId?: number;
//   user: {
//     id: number;
//     avatarUrl?: string;
//     fullName?: string;
//     address?: string;
//   };
// };

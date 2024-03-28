import { objectToSearchParams } from "@/utils";
import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import {
  APIResponse,
  MEETINGS,
  MEETING_RECORDS,
  NEW_MEETING,
  NEW_MEETING_RECORDS,
  NEW_USER,
  USERS,
} from "../types/index.";

export const AghotaApi = createApi({
  reducerPath: "AghotaApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/",
  }),
  tagTypes: ["MeetingRecords", "Meetings", "Users", "Rooms", "Tokens"],

  endpoints: (builder) => ({
    getUser: builder.query<Partial<APIResponse<USERS>>, Record<string, any>>({
      query: (params) => {
        return {
          url: `users?${objectToSearchParams(params)}`,
        };
      },
      providesTags: (result, error, { id }) => {
        return [{ type: "Users" as const, id }];
      },
    }),
    getMeeting: builder.query<
      Partial<APIResponse<MEETINGS>>,
      Record<string, any> & { roomId: string }
    >({
      query: ({ roomId, ...params }) => {
        return {
          url: `meetings/${roomId}?${objectToSearchParams(params)}`,
        };
      },
      providesTags: (result, error, { id }) => {
        return [{ type: "Users" as const, id }];
      },
    }),
    getMeetings: builder.query<
      Partial<APIResponse<MEETINGS[]>>,
      Record<string, string>
    >({
      query: (params) => {
        return {
          url: `meetings?${objectToSearchParams(params)}`,
        };
      },
      providesTags: (result) =>
        // is result available?
        result?.data
          ? // successful query
            [
              ...result?.data.map(({ id }) => ({
                type: "Meetings" as const,
                id,
              })),
              { type: "Meetings", id: "LIST" },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Meetings', id: 'LIST' }` is invalidated
            [{ type: "Meetings", id: "LIST" }],
    }),
    getMeetingRecords: builder.query<
      Partial<APIResponse<MEETING_RECORDS[]>>,
      Record<string, string>
    >({
      query: (params) => {
        return {
          url: `meetings?${objectToSearchParams(params)}`,
        };
      },
      providesTags: (result) =>
        // is result available?
        result?.data
          ? // successful query
            [
              ...result?.data.map(({ id }) => ({
                type: "MeetingRecords" as const,
                id,
              })),
              { type: "MeetingRecords", id: "LIST" },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'MeetingRecords', id: 'LIST' }` is invalidated
            [{ type: "MeetingRecords", id: "LIST" }],
    }),
    createRoom: builder.mutation<
      APIResponse<{ roomId: string; token?: string }>,
      {
        title: string;
        hostWallets?: string[];
        roomLocked?: boolean;
        params?: Record<string, string>;
      }
    >({
      query: ({ params, ...data }) => ({
        url: `create-room/?${objectToSearchParams(params!)}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Rooms" as const, id: "LIST" }],
    }),
    createToken: builder.mutation<
      APIResponse<{
        metadata: { displayName: string; address?: string };
        token: string;
        roomId?: string;
      }>,
      {
        metadata: Record<string, string>;
        params: { isCreator: boolean; roomId: string } & Record<string, any>;
      }
    >({
      query: ({ params, ...data }) => ({
        url: `create-token?${objectToSearchParams(params)}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Tokens" as const, id: "LIST" }],
    }),
    addUser: builder.mutation<APIResponse<USERS>, NEW_USER>({
      query: (data) => ({
        url: `users`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Users" as const, id: "LIST" }],
    }),
    addMeeting: builder.mutation<APIResponse<MEETINGS>, NEW_MEETING>({
      query: (data) => ({
        url: `meetings`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Meetings" as const, id: "LIST" }],
    }),
    addMeetingRecord: builder.mutation<
      APIResponse<MEETING_RECORDS>,
      NEW_MEETING_RECORDS
    >({
      query: (data) => ({
        url: `meeting-records`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "MeetingRecords" as const, id: "LIST" }],
    }),
  }),
});
export const {
  useAddMeetingMutation,
  useAddMeetingRecordMutation,
  useAddUserMutation,
  useCreateRoomMutation,
  useCreateTokenMutation,
  useGetMeetingRecordsQuery,
  useGetMeetingsQuery,
  useGetUserQuery,
  useLazyGetMeetingQuery,
  useLazyGetMeetingRecordsQuery,
  useLazyGetMeetingsQuery,
  useLazyGetUserQuery,
  useGetMeetingQuery,
} = AghotaApi;

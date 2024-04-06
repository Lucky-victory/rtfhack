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
} from "../types";
import { FitnessPlan, Article, MealPlan } from "@/types/shared";

export const GreenSpaceDAOApi = createApi({
  reducerPath: "GreenSpaceDAOApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/",
  }),
  tagTypes: [
    "MeetingRecords",
    "Meetings",
    "Users",
    "Rooms",
    "Tokens",
    "Articles",
    "FitnessPlans",
    "MealPlans",
    "Communities",
    "CommunityEvents",
    "CommunityMembers",
    "CommunityMessages",
    "CommunityChallenges",
    "Appointments",
  ],

  endpoints: (builder) => ({
    getArticles: builder.query<
      Partial<APIResponse<Article[]>>,
      { status?: "all" | "published" | "draft"; authId?: string }
    >({
      query: (params) => {
        return {
          url: `articles?${objectToSearchParams(params)}`,
        };
      },
      providesTags: (result) =>
        // is result available?
        result?.data
          ? // successful query
            [
              ...result?.data.map(({ slug }) => ({
                type: "Articles" as const,
                id: slug,
              })),
              { type: "Articles", id: "LIST" },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Articles', id: 'LIST' }` is invalidated
            [{ type: "Articles", id: "LIST" }],
    }),
    getMealPlans: builder.query<
      Partial<APIResponse<MealPlan[]>>,
      { status?: "all" | "published" | "draft"; authId?: string }
    >({
      query: (params) => {
        return {
          url: `meal-plans?${objectToSearchParams(params)}`,
        };
      },
      providesTags: (result) =>
        // is result available?
        result?.data
          ? // successful query
            [
              ...result?.data.map(({ slug }) => ({
                type: "MealPlans" as const,
                id: slug,
              })),
              { type: "MealPlans", id: "LIST" },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'MealPlans', id: 'LIST' }` is invalidated
            [{ type: "MealPlans", id: "LIST" }],
    }),
    getFitnessPlans: builder.query<
      Partial<APIResponse<FitnessPlan[]>>,
      { status?: "all" | "published" | "draft"; authId?: string }
    >({
      query: (params) => {
        return {
          url: `fitness-plans?${objectToSearchParams(params)}`,
        };
      },
      providesTags: (result) =>
        // is result available?
        result?.data
          ? // successful query
            [
              ...result?.data.map(({ slug }) => ({
                type: "FitnessPlans" as const,
                id: slug,
              })),
              { type: "FitnessPlans", id: "LIST" },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'FitnessPlans', id: 'LIST' }` is invalidated
            [{ type: "FitnessPlans", id: "LIST" }],
    }),
    getArticle: builder.query<
      Partial<APIResponse<Article>>,
      { slug: string; use_id?: boolean }
    >({
      query: ({ slug, use_id = false }) => `articles/${slug}?use_id=${use_id}`,
      providesTags: (result, error, { slug }) => {
        return [{ type: "Articles" as const, id: slug }];
      },
    }),
    getMealPlan: builder.query<
      Partial<APIResponse<MealPlan>>,
      { slug: string; use_id?: boolean }
    >({
      query: ({ slug, use_id = false }) =>
        `meal-plans/${slug}?use_id=${use_id}`,
      providesTags: (result, error, { slug }) => {
        return [{ type: "MealPlans" as const, id: slug }];
      },
    }),
    getFitnessPlan: builder.query<
      Partial<APIResponse<FitnessPlan>>,
      { slug: string; use_id?: boolean }
    >({
      query: ({ slug, use_id = false }) =>
        `fitness-plans/${slug}?use_id=${use_id}`,
      providesTags: (result, error, { slug }) => {
        return [{ type: "FitnessPlans" as const, id: slug }];
      },
    }),
    updateArticle: builder.mutation<APIResponse<Article>, Partial<Article>>({
      query(data) {
        const { slug, ...body } = data;
        return {
          url: `articles/${slug}`,
          method: "PUT",
          body,
        };
      },

      invalidatesTags: (result, error, { slug }) => [
        { type: "Articles", id: slug },
      ],
    }),
    updateFitnessPlan: builder.mutation<
      APIResponse<FitnessPlan>,
      Partial<FitnessPlan>
    >({
      query(data) {
        const { slug, ...body } = data;
        return {
          url: `fitness-plans/${slug}`,
          method: "PUT",
          body,
        };
      },

      invalidatesTags: (result, error, { slug }) => [
        { type: "FitnessPlans", id: slug },
      ],
    }),
    updateMealPlan: builder.mutation<APIResponse<MealPlan>, Partial<MealPlan>>({
      query(data) {
        const { slug, ...body } = data;
        return {
          url: `meal-plans/${slug}`,
          method: "PUT",
          body,
        };
      },

      invalidatesTags: (result, error, { slug }) => [
        { type: "MealPlans", id: slug },
      ],
    }),

    getUser: builder.query<
      Partial<APIResponse<USERS>>,
      { username: string; params: Record<string, any> }
    >({
      query: ({ username, params }) => {
        return {
          url: `users/${username}?${objectToSearchParams(params)}`,
        };
      },
      providesTags: (result, error, { username }) => {
        return [{ type: "Users" as const, id: username }];
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
        return [{ type: "Meetings" as const, id }];
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
    // TODO: Add return types
    getCommunities: builder.query<
      Partial<APIResponse<any[]>>,
      { status?: string } & Record<string, any>
    >({
      query: (params) => {
        return {
          url: `communities?${objectToSearchParams(params)}`,
        };
      },
      providesTags: (result) =>
        // is result available?
        result?.data
          ? // successful query
            [
              ...result?.data.map(({ id }) => ({
                type: "Communities" as const,
                id,
              })),
              { type: "Communities", id: "LIST" },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Communities', id: 'LIST' }` is invalidated
            [{ type: "Communities", id: "LIST" }],
    }), // TODO: Add return types
    getCommunity: builder.query<
      Partial<APIResponse<any>>,
      { params?: Record<string, any>; spaceIdOrId: string }
    >({
      query: ({ spaceIdOrId, params }) => {
        return {
          url: `community/${spaceIdOrId}?${objectToSearchParams(params!)}`,
        };
      },
      providesTags: (result, error, { spaceIdOrId }) => {
        return [{ type: "Communities" as const, id: spaceIdOrId }];
      },
    }),
    getCommunityEvent: builder.query<
      Partial<APIResponse<any>>,
      { params?: Record<string, any>; slugId: string }
    >({
      query: ({ slugId, params }) => {
        return {
          url: `community/events/${slugId}?${objectToSearchParams(params!)}`,
        };
      },
      providesTags: (result, error, { slugId }) => {
        return [{ type: "CommunityEvents" as const, id: slugId }];
      },
    }),
    getCommunityChallenge: builder.query<
      Partial<APIResponse<any>>,
      { params?: Record<string, any>; slugId: string }
    >({
      query: ({ slugId, params }) => {
        return {
          url: `community/challenges/${slugId}?${objectToSearchParams(
            params!
          )}`,
        };
      },
      providesTags: (result, error, { slugId }) => {
        return [{ type: "CommunityChallenges" as const, id: slugId }];
      },
    }),
    // TODO: Add return types
    getCommunityEvents: builder.query<
      Partial<APIResponse<any[]>>,
      { spaceIdOrId: string } & Record<string, any>
    >({
      query: ({ spaceIdOrId, ...params }) => {
        return {
          url: `communities/${spaceIdOrId}/events?${objectToSearchParams(
            params
          )}`,
        };
      },
      providesTags: (result) =>
        // is result available?
        result?.data
          ? // successful query
            [
              ...result?.data.map(({ id }) => ({
                type: "CommunityEvents" as const,
                id,
              })),
              { type: "CommunityEvents", id: "LIST" },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'CommunityEvents', id: 'LIST' }` is invalidated
            [{ type: "CommunityEvents", id: "LIST" }],
    }),
    // TODO: Add return types
    getCommunityMessages: builder.query<
      Partial<APIResponse<any[]>>,
      { spaceIdOrId: string } & Record<string, any>
    >({
      query: ({ spaceIdOrId, ...params }) => {
        return {
          url: `communities/${spaceIdOrId}/messages?${objectToSearchParams(
            params
          )}`,
        };
      },
      providesTags: (result) =>
        // is result available?
        result?.data
          ? // successful query
            [
              ...result?.data.map(({ id }) => ({
                type: "CommunityMessages" as const,
                id,
              })),
              { type: "CommunityMessages", id: "LIST" },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'CommunityMessages', id: 'LIST' }` is invalidated
            [{ type: "CommunityMessages", id: "LIST" }],
    }),
    // TODO: Add return types
    getCommunityMembers: builder.query<
      Partial<APIResponse<any[]>>,
      { spaceIdOrId: string } & Record<string, any>
    >({
      query: ({ spaceIdOrId, ...params }) => {
        return {
          url: `communities/${spaceIdOrId}/members?${objectToSearchParams(
            params
          )}`,
        };
      },
      providesTags: (result) =>
        // is result available?
        result?.data
          ? // successful query
            [
              ...result?.data.map(({ id }) => ({
                type: "CommunityMembers" as const,
                id,
              })),
              { type: "CommunityMembers", id: "LIST" },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'CommunityMembers', id: 'LIST' }` is invalidated
            [{ type: "CommunityMembers", id: "LIST" }],
    }),
    // TODO: Add return types
    getCommunityChallenges: builder.query<
      Partial<APIResponse<any[]>>,
      { spaceIdOrId: string } & Record<string, any>
    >({
      query: ({ spaceIdOrId, ...params }) => {
        return {
          url: `communities/${spaceIdOrId}/challenges?${objectToSearchParams(
            params
          )}`,
        };
      },
      providesTags: (result) =>
        // is result available?
        result?.data
          ? // successful query
            [
              ...result?.data.map(({ id }) => ({
                type: "CommunityChallenges" as const,
                id,
              })),
              { type: "CommunityChallenges", id: "LIST" },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'CommunityChallenges', id: 'LIST' }` is invalidated
            [{ type: "CommunityChallenges", id: "LIST" }],
    }),
    // TODO: Add return types
    getAppointments: builder.query<
      Partial<APIResponse<any[]>>,
      { status?: string } & Record<string, any>
    >({
      query: (params) => {
        return {
          url: `appointments?${objectToSearchParams(params)}`,
        };
      },
      providesTags: (result) =>
        // is result available?
        result?.data
          ? // successful query
            [
              ...result?.data.map(({ id }) => ({
                type: "Appointments" as const,
                id,
              })),
              { type: "Appointments", id: "LIST" },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Appointments', id: 'LIST' }` is invalidated
            [{ type: "Appointments", id: "LIST" }],
    }),
    // TODO: Add return types
    getAppointment: builder.query<
      Partial<APIResponse<any>>,
      { params: Record<string, any>; appointmentId: string }
    >({
      query: ({ appointmentId, params }) => {
        return {
          url: `appointments/${appointmentId}?${objectToSearchParams(params)}`,
        };
      },
      providesTags: (result, error, { appointmentId }) => {
        return [{ type: "Appointments" as const, id: appointmentId }];
      },
    }),

    getMeetingRecords: builder.query<
      Partial<APIResponse<MEETING_RECORDS[]>>,
      Record<string, string>
    >({
      query: (params) => {
        return {
          url: `meeting-records?${objectToSearchParams(params)}`,
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
        metadata: {
          displayName: string;
          address?: string;
          username?: string;
          authId: string;
        };
        token: string;
        roomId?: string;
      }>,
      {
        metadata: {
          displayName: string;
          address?: string;
          username?: string;
          authId: string;
        };
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

    // TODO: Add return types
    createAppointment: builder.mutation<APIResponse<any>, any>({
      query: (data) => ({
        url: `appointments`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Appointments" as const, id: "LIST" }],
    }),
    // TODO: Add return types
    createCommunity: builder.mutation<APIResponse<any>, any>({
      query: (data) => ({
        url: `communties`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Communities" as const, id: "LIST" }],
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
  useCreateAppointmentMutation,
  useCreateCommunityMutation,
  useGetAppointmentQuery,
  useGetAppointmentsQuery,
  useGetCommunitiesQuery,
  useGetCommunityChallengeQuery,
  useGetCommunityChallengesQuery,
  useGetCommunityEventQuery,
  useGetCommunityEventsQuery,
  useGetCommunityMembersQuery,
  useGetCommunityMessagesQuery,
  useGetCommunityQuery,
  useLazyGetAppointmentQuery,
  useLazyGetAppointmentsQuery,
  useLazyGetCommunitiesQuery,
  useLazyGetCommunityChallengeQuery,
  useLazyGetCommunityChallengesQuery,
  useLazyGetCommunityEventQuery,
  useLazyGetCommunityEventsQuery,
  useLazyGetCommunityMembersQuery,
  useLazyGetCommunityMessagesQuery,
  useLazyGetCommunityQuery,
  usePrefetch,
} = GreenSpaceDAOApi;

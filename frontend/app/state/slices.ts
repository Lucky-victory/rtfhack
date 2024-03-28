import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type PeerState = {
  peerId: string;
  metadata: {
    displayName: string;
    avatarUrl?: string;
  };
};

export const meetingCreator = createSlice({
  name: "meeting-creator",
  initialState: {
    isCreator: false,
    token: "",
  },
  reducers: {
    update: (
      state,
      action: PayloadAction<{ isCreator: boolean; token?: string }>
    ) => {
      state.isCreator = action.payload?.isCreator;
    },
  },
});

export const { update } = meetingCreator.actions;
